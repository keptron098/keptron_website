// Single Phase UPS Products Data
const singlePhaseProducts = [
  {
    name: "1kVA Single Phase Industrial Online UPS",
    id: "1kva",
    image: "assets/products/03_1kva-single-phase-industrial-online-ups-1749530508-8124110.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Capacity: 1 KVA", "Configuration: 1 Phase IN & 1 Phase OUT", "Model Name: KEM4401", "Warranty: 2 Years"]
  },
  {
    name: "2kVA Single Phase Industrial Online UPS",
    id: "2kva",
    image: "assets/products/06_2kva-single-phase-industrial-online-ups-1749529166-2926365.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Capacity: 2 KVA", "Configuration: 1 Phase in & 1 Phase Out", "Model Name: KE4402", "Efficiency: 85%"]
  },
  {
    name: "3kVA Single Phase Industrial Online UPS",
    id: "3kva",
    image: "assets/products/07_3kva-single-phase-industrial-online-ups-1749529705-8124052.jpeg",
    price: "On request",
    details: ["Phase: Single Phase", "Country of Origin: India", "Capacity: 3 KVA", "Configuration: 1 Phase in & 1 Phase Out", "Model Name: KE4403"]
  },
  {
    name: "5kVA Single Phase Industrial Online UPS",
    id: "5kva",
    image: "assets/products/09_5kva-single-phase-industrial-online-ups-1749530253-8124091.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Capacity: 5 KVA", "Configuration: 1 Phase in & 1 Phase Out", "Back Up Time: 30 Mins", "Application: Continuous Power Backup"]
  },
  {
    name: "7.5kVA Single Phase Industrial Online UPS",
    id: "7p5kva",
    image: "assets/products/11_7-5kva-single-phase-industrial-online-ups-1749529325-2924337.jpeg",
    price: "On request",
    details: ["Phase: Single Phase", "Country of Origin: India", "Configuration: 1 Phase in & 1 Phase Out", "Model Name: KE4407P5", "Warranty: 1 Year"]
  },
  {
    name: "10kVA Single Phase Industrial Online UPS",
    id: "10kva",
    image: "assets/products/00_10kva-single-phase-industrial-online-ups-1749529507-8124040.jpeg",
    price: "On request",
    details: ["Phase: Single Phase", "Country of Origin: India", "Capacity: 10 KVA", "Configuration: 1 Phase IN & 1 Phase OUT", "Model Name: KE44010"]
  },
  {
    name: "15kVA Single Phase Industrial Online UPS",
    id: "15kva-sp",
    image: "assets/products/01_15kva-single-phase-industrial-online-ups-1749529825-8124060.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 15 KVA", "Configuration: 1 Phase in & 1 Phase Out", "Application: Continuous Power Backup"]
  },
  {
    name: "20kVA Single Phase Industrial Online UPS",
    id: "20kva",
    image: "assets/products/05_20kva-single-phase-industrial-online-ups-1749529605-8124045.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Capacity: 20 KVA", "Configuration: 1 Phase in & 1 Phase Out", "Model Name: KE44020", "Phase: Single Phase"]
  }
];

// ── Modal ──────────────────────────────────────────────────
function initModal() {
  if (document.getElementById('product-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'product-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button class="modal-close" id="modal-close" aria-label="Close">&#10005;</button>
      <div class="modal-inner">
        <div class="modal-img-wrap">
          <img id="modal-img" src="" alt="">
        </div>
        <div class="modal-body">
          <div class="modal-badge" id="modal-badge">Industrial UPS</div>
          <h2 id="modal-title"></h2>
          <div class="modal-price">
            <span>Price:</span> <strong>On Request</strong> <em>(enquiry-based)</em>
          </div>
          <ul id="modal-specs" class="modal-specs"></ul>
          <a href="index.html#contact" class="btn-primary modal-cta">Request a Quote</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(product) {
  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-img').alt = product.name;
  document.getElementById('modal-title').textContent = product.name;

  const phaseDetail = product.details.find(d => /phase/i.test(d));
  document.getElementById('modal-badge').textContent =
    phaseDetail ? phaseDetail.replace(/^phase:\s*/i, '') : 'Single Phase';

  document.getElementById('modal-specs').innerHTML =
    product.details.map(d => `<li>${d}</li>`).join('');

  document.getElementById('product-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ── Card template ──────────────────────────────────────────
function createProductCard(product) {
  const specPills = product.details
    .map(d => `<span class="spec-pill">${d}</span>`)
    .join('');
  return `
    <article class="card card-product" id="${product.id}">
      <div class="card-product-media">
        <img src="${product.image}" alt="${product.name.replace(/"/g, '&quot;')}" loading="lazy">
      </div>
      <div class="card-product-body">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-specs">${specPills}</div>
        <p class="product-price">
          <span class="price-label">Price</span>
          <strong>${product.price}</strong>
          <span class="price-hint">(enquiry-based)</span>
        </p>
        <div class="product-actions">
          <button class="btn-details" data-product-id="${product.id}">View Details</button>
          <a href="index.html#contact" class="btn-primary">Get Quote</a>
        </div>
      </div>
    </article>
  `;
}

// ── Main ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');
  function openMenu() { navList.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { navList.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-list .nav-link:not(.dropdown-toggle)').forEach(l => l.addEventListener('click', closeMenu));

  const container = document.getElementById('single-phase-products');
  const tabButtons = document.querySelectorAll('.tab-btn');

  initModal();

  function showAllProducts() {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    const allBtn = document.querySelector('.tab-btn[data-tab="all"]');
    if (allBtn) allBtn.classList.add('active');
    container.innerHTML = singlePhaseProducts.map(createProductCard).join('');
  }

  function showFiltered(tab) {
    let list = singlePhaseProducts;
    if (tab === 'low-capacity')    list = singlePhaseProducts.filter(p => ['1kva','2kva','3kva'].includes(p.id));
    if (tab === 'medium-capacity') list = singlePhaseProducts.filter(p => ['5kva','7p5kva','10kva'].includes(p.id));
    if (tab === 'high-capacity')   list = singlePhaseProducts.filter(p => ['15kva-sp','20kva'].includes(p.id));
    container.innerHTML = list.map(createProductCard).join('');
  }

  if (container) {
    showAllProducts();

    // Scroll to anchor after JS renders cards
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }

  // Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      showFiltered(this.dataset.tab);
    });
  });

  // View Details delegation
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-details');
    if (!btn) return;
    const product = singlePhaseProducts.find(p => p.id === btn.dataset.productId);
    if (product) openModal(product);
  });

  // Nav anchor clicks — reset to All tab so target element exists
  const productIds = new Set(singlePhaseProducts.map(p => '#' + p.id));
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (productIds.has(href)) showAllProducts();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  });
});
