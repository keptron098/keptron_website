/**
 * Keptron Electronics — Blog backend (Google Apps Script + Google Sheets)
 *
 * Setup:
 * 1) Create a new Google Sheet (e.g. "Keptron Blog CMS").
 * 2) Extensions → Apps Script, paste this file.
 * 3) Run initSheet() once (authorize when prompted).
 * 4) Deploy → New deployment → Web app:
 *    Execute as: Me | Who has access: Anyone
 * 5) Copy deployment URL, paste into blogs.html as SHEET_ENDPOINT.
 * 6) Open blogs.html → click Admin → set admin password for info@keptronelectronics.com.
 */

const SHEET_NAME = 'blogs';

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const body = JSON.parse(raw);
    const action = body.action || '';
    const payload = body.payload || {};

    switch (action) {
      case 'adminStatus':       return jsonResponse(adminStatus_());
      case 'setupAdmin':        return jsonResponse(setupAdmin_(payload));
      case 'verifyAdmin':       return jsonResponse(verifyAdmin_(payload));
      case 'changeAdminPassword': return jsonResponse(changeAdminPassword_(payload));
      case 'upsertPost':        return jsonResponse(upsertPost_(payload));
      case 'deletePost':        return jsonResponse(deletePost_(payload));
      case 'listPublished':     return jsonResponse(listPosts_(false, payload));
      case 'listAll':           return jsonResponse(listPosts_(true, payload));
      default:                  return jsonResponse({ ok: false, message: 'Invalid action.' });
    }
  } catch (err) {
    return jsonResponse({ ok: false, message: err && err.message ? err.message : 'Server error.' });
  }
}

function adminStatus_() {
  const props = PropertiesService.getScriptProperties();
  return {
    ok: true,
    adminConfigured: !!(props.getProperty('ADMIN_HASH') && props.getProperty('ADMIN_EMAIL'))
  };
}

function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['id', 'title', 'category', 'date', 'contentHtml', 'published', 'updatedAt']);
    sh.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#012a4a').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return 'Sheet ready.';
}

function setupAdmin_(payload) {
  const props = PropertiesService.getScriptProperties();
  const existingHash = props.getProperty('ADMIN_HASH');
  const incomingHash = String(payload.adminHash || '').trim();
  const incomingEmail = String(payload.adminEmail || '').trim().toLowerCase();
  if (!incomingHash) return { ok: false, message: 'Missing admin hash.' };
  if (!incomingEmail) return { ok: false, message: 'Missing admin email.' };
  if (existingHash) return { ok: false, code: 'ADMIN_EXISTS', message: 'Admin already configured.' };
  props.setProperty('ADMIN_HASH', incomingHash);
  props.setProperty('ADMIN_EMAIL', incomingEmail);
  return { ok: true, message: 'Admin configured.' };
}

function verifyAdmin_(payload) {
  const props = PropertiesService.getScriptProperties();
  const adminHash = props.getProperty('ADMIN_HASH');
  const adminEmail = props.getProperty('ADMIN_EMAIL');
  if (!adminHash || !adminEmail) return { ok: false, message: 'Admin is not configured.' };
  const incomingHash = String(payload.adminHash || '').trim();
  const incomingEmail = String(payload.adminEmail || '').trim().toLowerCase();
  if (incomingHash !== adminHash || incomingEmail !== adminEmail) {
    return { ok: false, message: 'Admin verification failed.' };
  }
  return { ok: true };
}

function changeAdminPassword_(payload) {
  const props = PropertiesService.getScriptProperties();
  const adminHash = props.getProperty('ADMIN_HASH');
  const adminEmail = props.getProperty('ADMIN_EMAIL');
  const oldHash = String(payload.oldHash || '').trim();
  const newHash = String(payload.newHash || '').trim();
  const incomingEmail = String(payload.adminEmail || '').trim().toLowerCase();
  if (!adminHash || !adminEmail) return { ok: false, message: 'Admin is not configured.' };
  if (!newHash) return { ok: false, message: 'Missing new hash.' };
  if (oldHash !== adminHash || incomingEmail !== adminEmail) {
    return { ok: false, message: 'Current password mismatch.' };
  }
  props.setProperty('ADMIN_HASH', newHash);
  return { ok: true, message: 'Password updated.' };
}

function upsertPost_(payload) {
  const auth = verifyAdmin_(payload);
  if (!auth.ok) return auth;
  const post = payload.post || {};
  const id = String(post.id || '').trim();
  const title = String(post.title || '').trim();
  const category = String(post.category || '').trim();
  const date = String(post.date || '').trim();
  const content = String(post.content || '').trim();
  const published = !!post.published;
  if (!id || !title || !content) return { ok: false, message: 'Missing required post fields.' };
  const sh = getSheet_();
  const last = sh.getLastRow();
  const now = new Date().toISOString();
  if (last >= 2) {
    const ids = sh.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0]));
    const idx = ids.indexOf(id);
    if (idx > -1) {
      sh.getRange(idx + 2, 1, 1, 7).setValues([[id, title, category, date, content, published ? 'TRUE' : 'FALSE', now]]);
      return { ok: true, message: 'Post updated.', id: id };
    }
  }
  sh.appendRow([id, title, category, date, content, published ? 'TRUE' : 'FALSE', now]);
  return { ok: true, message: 'Post created.', id: id };
}

function deletePost_(payload) {
  const auth = verifyAdmin_(payload);
  if (!auth.ok) return auth;
  const id = String(payload.postId || '').trim();
  if (!id) return { ok: false, message: 'Missing postId.' };
  const sh = getSheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, message: 'Nothing to delete.' };
  const ids = sh.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0]));
  const idx = ids.indexOf(id);
  if (idx === -1) return { ok: true, message: 'Post already removed.' };
  sh.deleteRow(idx + 2);
  return { ok: true, message: 'Post deleted.' };
}

function listPosts_(includeDrafts, payload) {
  const sh = getSheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, posts: [] };
  if (includeDrafts) {
    const auth = verifyAdmin_(payload);
    if (!auth.ok) return auth;
  }
  const rows = sh.getRange(2, 1, last - 1, 7).getValues();
  const posts = rows.map(r => ({
    id: String(r[0] || ''),
    title: String(r[1] || ''),
    category: String(r[2] || ''),
    date: String(r[3] || ''),
    content: String(r[4] || ''),
    published: String(r[5] || '').toUpperCase() === 'TRUE',
    updatedAt: String(r[6] || '')
  })).filter(p => includeDrafts ? true : p.published);
  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return { ok: true, posts: posts };
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'title', 'category', 'date', 'contentHtml', 'published', 'updatedAt']);
  }
  return sh;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
