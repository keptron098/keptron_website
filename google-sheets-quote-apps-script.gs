/**
 * Keptron Electronics — Quote Request backend
 * Google Apps Script + Google Sheets + Email notification.
 *
 * Setup:
 * 1) Create a new Google Sheet named "Keptron Quote Requests".
 * 2) Open Extensions → Apps Script and paste this file's content.
 * 3) Update NOTIFY_EMAIL below to your preferred notification inbox.
 * 4) Run initSheet() once and authorize when prompted.
 * 5) Deploy → New deployment:
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6) Copy the deployment Web App URL.
 * 7) Paste that URL into app.js as QUOTE_ENDPOINT.
 */

const SHEET_NAME = 'quotes';
const NOTIFY_EMAIL = 'info@keptronelectronics.com';

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const body = JSON.parse(raw);

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const product = String(body.product || '').trim();
    const requirements = String(body.requirements || '').trim();
    const date = new Date();

    const sh = getSheet_();
    sh.appendRow([
      date,
      name,
      email,
      phone,
      product,
      requirements
    ]);

    // Send email notification
    const subject = 'New Quote Request — Keptron Electronics';
    const htmlBody =
      '<h2>New Quote Request Received</h2>' +
      '<p><strong>Date:</strong> ' + date.toLocaleString() + '</p>' +
      '<table style="border-collapse:collapse;">' +
      row_('Name', name) +
      row_('Email', email) +
      row_('Phone', phone) +
      row_('Product Type', product) +
      row_('Requirements', requirements) +
      '</table>' +
      '<p style="color:#666;font-size:12px;">This email was automatically generated from the Keptron website quote form.</p>';

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });

    return jsonResponse({ ok: true, message: 'Quote saved and notification sent.' });
  } catch (err) {
    return jsonResponse({ ok: false, message: (err && err.message) ? err.message : 'Server error.' });
  }
}

function row_(label, value) {
  return '<tr>' +
    '<td style="border:1px solid #ddd;padding:8px;background:#f5f5f5;font-weight:bold;">' + label + '</td>' +
    '<td style="border:1px solid #ddd;padding:8px;">' + (value || '-') + '</td>' +
    '</tr>';
}

function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Date', 'Name', 'Email', 'Phone', 'Product Type', 'Requirements']);
    sh.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#012a4a').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return 'Sheet initialised.';
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Date', 'Name', 'Email', 'Phone', 'Product Type', 'Requirements']);
  }
  return sh;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
