// Product Matrix Data and Functionality
const matrixProducts = {
  "1ph-1ph": [
    { id: "1kva", name: "1 kVA Single Phase", page: "/single-phase-online-ups/#1kva" },
    { id: "2kva", name: "2 kVA Single Phase", page: "/single-phase-online-ups/#2kva" },
    { id: "3kva", name: "3 kVA Single Phase", page: "/single-phase-online-ups/#3kva" },
    { id: "5kva", name: "5 kVA Single Phase", page: "/single-phase-online-ups/#5kva" },
    { id: "7p5kva", name: "7.5 kVA Single Phase", page: "/single-phase-online-ups/#7p5kva" },
    { id: "10kva", name: "10 kVA Single Phase", page: "/single-phase-online-ups/#10kva" },
    { id: "15kva-sp", name: "15 kVA Single Phase", page: "/single-phase-online-ups/#15kva-sp" },
    { id: "20kva", name: "20 kVA Single Phase", page: "/single-phase-online-ups/#20kva" }
  ],
  "3ph-1ph": [
    { id: "10kva", name: "10 kVA (3ph-1ph)", page: "/single-phase-online-ups/#10kva" },
    { id: "15kva", name: "15 kVA (3ph-1ph)", page: "/three-phase-online-ups/#15kva-3ph" },
    { id: "40kva", name: "40 kVA (3ph-1ph)", page: "/three-phase-online-ups/#40kva" },
    { id: "60kva", name: "60 kVA (3ph-1ph)", page: "/three-phase-online-ups/#60kva" },
    { id: "80kva", name: "80 kVA (3ph-1ph)", page: "/contact-us/" },
    { id: "100kva", name: "100 kVA (3ph-1ph)", page: "/contact-us/" },
    { id: "120kva", name: "120 kVA (3ph-1ph)", page: "/contact-us/" },
    { id: "150kva", name: "150 kVA (3ph-1ph)", page: "/contact-us/" },
    { id: "200kva", name: "200 kVA (3ph-1ph)", page: "/contact-us/" },
    { id: "300kva", name: "300 kVA (3ph-1ph)", page: "/contact-us/" }
  ],
  "3ph-3ph": [
    { id: "1kva-3ph", name: "1 kVA Three Phase", page: "/three-phase-online-ups/#1kva-3ph" },
    { id: "15kva", name: "15 kVA Three Phase", page: "/three-phase-online-ups/#15kva-3ph" },
    { id: "40kva", name: "40 kVA Three Phase", page: "/three-phase-online-ups/#40kva" },
    { id: "60kva", name: "60 kVA Three Phase", page: "/three-phase-online-ups/#60kva" },
    { id: "80kva", name: "80 kVA Three Phase", page: "/contact-us/" },
    { id: "100kva", name: "100 kVA Three Phase", page: "/contact-us/" },
    { id: "120kva", name: "120 kVA Three Phase", page: "/contact-us/" },
    { id: "150kva", name: "150 kVA Three Phase", page: "/contact-us/" },
    { id: "200kva", name: "200 kVA Three Phase", page: "/contact-us/" },
    { id: "300kva", name: "300 kVA Three Phase", page: "/contact-us/" }
  ]
};

function fillMatrixSelect(selectId, bucketKey) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  
  const bucket = matrixProducts[bucketKey];
  bucket.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item.page;
    opt.textContent = item.name;
    sel.appendChild(opt);
  });
  
  sel.addEventListener("change", () => {
    const selectedPage = sel.value;
    if (selectedPage) {
      window.location.href = selectedPage;
    }
  });
}

// Initialize matrix dropdowns and hamburger menu
document.addEventListener('DOMContentLoaded', function() {
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

  fillMatrixSelect("dd-1ph-1ph", "1ph-1ph");
  fillMatrixSelect("dd-3ph-1ph", "3ph-1ph");
  fillMatrixSelect("dd-3ph-3ph", "3ph-3ph");

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
