// Blogs page — public list + admin panel
// Paste your Google Apps Script Web App URL below (see SETUP_GUIDE.md).
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzoTMyzkUWxJnRWPji-wyuRm6paGofZNy7-_eBERJjVqDvBCJgXLgtxGheS6Po-yxpdGQ/exec';

// Simple SHA-256 hash helper
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const h = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function apiCall(action, payload = {}) {
  if (!SHEET_ENDPOINT) {
    return { ok: false, message: 'Sheet endpoint not configured. See SETUP_GUIDE.md.' };
  }
  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload })
    });
    return await res.json();
  } catch (err) {
    return { ok: false, message: err.message || 'Network error.' };
  }
}

// Local fallback using localStorage when no endpoint
const LOCAL_KEY = 'keptron_blog_posts_v1';
function localList(publishedOnly = true) {
  const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  const filtered = publishedOnly ? all.filter(p => p.published) : all;
  return filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
function localSave(post) {
  const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  const idx = all.findIndex(p => p.id === post.id);
  if (idx > -1) all[idx] = post; else all.push(post);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
}
function localDelete(id) {
  const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]').filter(p => p.id !== id);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
}

// Render public blog grid
async function renderBlogList() {
  const grid = document.getElementById('blog-grid');
  const noPosts = document.getElementById('no-posts');
  grid.innerHTML = '';
  let posts;
  if (SHEET_ENDPOINT) {
    const res = await apiCall('listPublished');
    posts = res.ok ? res.posts : [];
  } else {
    posts = localList(true);
  }
  if (!posts.length) {
    noPosts.style.display = 'block';
    return;
  }
  noPosts.style.display = 'none';
  posts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-cat">${p.category || 'General'}</div>
      <div class="blog-date">${p.date || ''}</div>
      <h3 class="blog-title">${p.title}</h3>
      <div class="blog-excerpt">${stripHtml(p.content).substring(0, 140)}…</div>
      <div class="blog-read-more">Read more →</div>
    `;
    card.addEventListener('click', () => openPost(p));
    grid.appendChild(card);
  });
}

function stripHtml(s) {
  const tmp = document.createElement('div');
  tmp.innerHTML = s || '';
  return tmp.textContent || tmp.innerText || '';
}

function renderContent(raw) {
  if (!raw) return '';
  if (/<(h[1-6]|p|ul|ol|li|blockquote|div)\b/i.test(raw)) return raw;
  return raw
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function openPost(p) {
  document.getElementById('post-modal-cat').textContent = p.category || 'General';
  document.getElementById('post-modal-title').textContent = p.title;
  document.getElementById('post-modal-meta').textContent = p.date || '';
  const content = renderContent(p.content || '');
  document.getElementById('post-modal-content').innerHTML = content.startsWith('<') ? content : `<p>${content}</p>`;
  document.getElementById('post-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePost() {
  document.getElementById('post-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Admin ──
let adminHash = null;
let adminEmail = null;

function showAdmin() {
  document.getElementById('admin-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAdmin() {
  document.getElementById('admin-overlay').classList.remove('open');
  document.body.style.overflow = '';
  adminHash = null; adminEmail = null;
  document.getElementById('admin-login').style.display = 'block';
  document.getElementById('admin-editor').style.display = 'none';
  setMsg('');
}

function setMsg(text, type = 'success') {
  const el = document.getElementById('admin-msg');
  if (!text) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="admin-msg ${type}">${text}</div>`;
}

async function handleSetup() {
  const email = document.getElementById('admin-email').value.trim().toLowerCase();
  const password = document.getElementById('admin-password').value;
  if (!email || !password) { setMsg('Email and password required.', 'error'); return; }
  const hash = await sha256(email + ':' + password);
  const res = await apiCall('setupAdmin', { adminEmail: email, adminHash: hash });
  if (res.ok) { setMsg('Admin created. You can sign in now.', 'success'); }
  else { setMsg(res.message || 'Setup failed.', 'error'); }
}

async function handleLogin() {
  const email = document.getElementById('admin-email').value.trim().toLowerCase();
  const password = document.getElementById('admin-password').value;
  if (!email || !password) { setMsg('Email and password required.', 'error'); return; }
  const hash = await sha256(email + ':' + password);
  const res = await apiCall('verifyAdmin', { adminEmail: email, adminHash: hash });
  if (res.ok) {
    adminHash = hash; adminEmail = email;
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-editor').style.display = 'block';
    setMsg('Signed in.', 'success');
    loadAdminPosts();
    resetEditor();
  } else {
    setMsg(res.message || 'Sign-in failed.', 'error');
  }
}

let editingId = null;
function resetEditor() {
  editingId = null;
  document.getElementById('post-title').value = '';
  document.getElementById('post-category').value = '';
  document.getElementById('post-date').value = new Date().toISOString().slice(0, 10);
  document.getElementById('post-content').value = '';
  document.getElementById('post-published').checked = true;
}

async function savePost() {
  const title = document.getElementById('post-title').value.trim();
  const category = document.getElementById('post-category').value.trim();
  const date = document.getElementById('post-date').value;
  const content = document.getElementById('post-content').value.trim();
  const published = document.getElementById('post-published').checked;
  if (!title || !content) { setMsg('Title and content are required.', 'error'); return; }
  const id = editingId || ('post_' + Date.now());
  const post = { id, title, category, date, content, published };
  if (SHEET_ENDPOINT) {
    const res = await apiCall('upsertPost', { adminHash, adminEmail, post });
    if (!res.ok) { setMsg(res.message || 'Save failed.', 'error'); return; }
  } else {
    localSave(post);
  }
  setMsg('Post saved.', 'success');
  resetEditor();
  loadAdminPosts();
  renderBlogList();
}

async function loadAdminPosts() {
  const list = document.getElementById('admin-post-list');
  list.innerHTML = 'Loading…';
  let posts;
  if (SHEET_ENDPOINT) {
    const res = await apiCall('listAll', { adminHash, adminEmail });
    posts = res.ok ? res.posts : [];
  } else {
    posts = localList(false);
  }
  if (!posts.length) { list.innerHTML = '<p style="color:var(--text-muted);">No posts yet.</p>'; return; }
  list.innerHTML = posts.map(p => `
    <div style="padding:10px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;gap:10px;align-items:center;">
      <div>
        <strong>${p.title}</strong>
        <div style="font-size:0.78rem;color:var(--text-muted);">${p.date || ''} · ${p.published ? 'Published' : 'Draft'}</div>
      </div>
      <div>
        <button data-edit="${p.id}" style="padding:6px 12px;margin-right:6px;border-radius:var(--r-pill);border:1px solid var(--border);background:var(--bg);cursor:pointer;">Edit</button>
        <button data-del="${p.id}" style="padding:6px 12px;border-radius:var(--r-pill);border:none;background:#dc2626;color:#fff;cursor:pointer;">Delete</button>
      </div>
    </div>
  `).join('');
  list.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => editPost(b.dataset.edit, posts)));
  list.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => deletePost(b.dataset.del)));
}

function editPost(id, posts) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('post-title').value = p.title || '';
  document.getElementById('post-category').value = p.category || '';
  document.getElementById('post-date').value = p.date || '';
  document.getElementById('post-content').value = p.content || '';
  document.getElementById('post-published').checked = !!p.published;
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  if (SHEET_ENDPOINT) {
    const res = await apiCall('deletePost', { adminHash, adminEmail, postId: id });
    if (!res.ok) { setMsg(res.message || 'Delete failed.', 'error'); return; }
  } else {
    localDelete(id);
  }
  setMsg('Post deleted.', 'success');
  loadAdminPosts();
  renderBlogList();
}

// ── Wiring ──
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');
  if (hamburger) hamburger.addEventListener('click', () => { navList.classList.add('open'); navOverlay.classList.add('open'); });
  if (navOverlay) navOverlay.addEventListener('click', () => { navList.classList.remove('open'); navOverlay.classList.remove('open'); });
  if (navClose) navClose.addEventListener('click', () => { navList.classList.remove('open'); navOverlay.classList.remove('open'); });

  renderBlogList();

  document.getElementById('post-modal-close').addEventListener('click', closePost);
  document.getElementById('post-modal').addEventListener('click', (e) => {
    if (e.target.id === 'post-modal') closePost();
  });

  document.getElementById('admin-open').addEventListener('click', showAdmin);
  document.getElementById('admin-close').addEventListener('click', closeAdmin);
  document.getElementById('admin-login-btn').addEventListener('click', handleLogin);
  document.getElementById('admin-setup-btn').addEventListener('click', handleSetup);
  document.getElementById('admin-logout').addEventListener('click', closeAdmin);
  document.getElementById('post-save').addEventListener('click', savePost);
  document.getElementById('post-new').addEventListener('click', resetEditor);
});
