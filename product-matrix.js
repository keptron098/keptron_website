// Product Matrix Data and Functionality
const matrixProducts = {
  "1ph-1ph": [
    { id: "1kva", name: "1 kVA Single Phase", page: "single-phase-ups.html#1kva" },
    { id: "2kva", name: "2 kVA Single Phase", page: "single-phase-ups.html#2kva" },
    { id: "3kva", name: "3 kVA Single Phase", page: "single-phase-ups.html#3kva" },
    { id: "5kva", name: "5 kVA Single Phase", page: "single-phase-ups.html#5kva" },
    { id: "7p5kva", name: "7.5 kVA Single Phase", page: "single-phase-ups.html#7p5kva" },
    { id: "10kva", name: "10 kVA Single Phase", page: "single-phase-ups.html#10kva" },
    { id: "15kva-sp", name: "15 kVA Single Phase", page: "single-phase-ups.html#15kva-sp" },
    { id: "20kva", name: "20 kVA Single Phase", page: "single-phase-ups.html#20kva" }
  ],
  "3ph-1ph": [
    { id: "10kva", name: "10 kVA (3ph-1ph)", page: "single-phase-ups.html#10kva" },
    { id: "15kva", name: "15 kVA (3ph-1ph)", page: "three-phase-ups.html#15kva-3ph" },
    { id: "40kva", name: "40 kVA (3ph-1ph)", page: "three-phase-ups.html#40kva" }
  ],
  "3ph-3ph": [
    { id: "1kva-3ph", name: "1 kVA Three Phase", page: "three-phase-ups.html#1kva-3ph" },
    { id: "15kva", name: "15 kVA Three Phase", page: "three-phase-ups.html#15kva-3ph" },
    { id: "40kva", name: "40 kVA Three Phase", page: "three-phase-ups.html#40kva" },
    { id: "60kva", name: "60 kVA Three Phase", page: "three-phase-ups.html#60kva" }
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

// Initialize matrix dropdowns
document.addEventListener('DOMContentLoaded', function() {
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
