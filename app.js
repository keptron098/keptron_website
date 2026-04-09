const welcomeText = `Established in 1991, Keptron Electronics is a Manufacturer, Exporter and Supplier of Industrial Online UPS systems. Product coverage includes 1kVA, 2kVA, 3kVA, 5kVA, 7.5kVA, 10kVA, 15kVA, 20kVA, 40kVA and 60kVA models under single-phase and three-phase configurations.`;

const glimpse = [
  ["Nature of Business", "Manufacturer, Exporter & Supplier"],
  ["Year of Establishment", "1991"],
  ["Market Covered", "Worldwide"],
  ["Founder", "Mr. Anil Kumar"],
  ["GST No", "07AANPK1007A1ZD"]
];

/**
 * Images pulled from keptron.in homepage (bc-full catalogue).
 * Source site does not publish MRP — use enquiry for pricing.
 *
 * matrix: which product-matrix column this belongs to (for dropdown navigation).
 * matrixKey: value used in <select> options to scroll to this card.
 */
function slugId(name) {
  return (
    "product-" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

const offerings = [
  {
    name: "1kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "1kva",
    image: "assets/products/03_1kva-single-phase-industrial-online-ups-1749530508-8124110.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 1 KVA", "Model: KEM4401", "Warranty: 2 Years"]
  },
  {
    name: "1kVA Three Phase Industrial Online UPS",
    matrix: "3ph-3ph",
    matrixKey: "1kva",
    image: "assets/products/04_1kva-three-phase-industrial-online-ups-1749530587-8124116.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Three Phase", "Capacity: 1 kVA", "Configuration: 3 Phase in & 3 Phase Out", "Topology: Online"]
  },
  {
    name: "2kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "2kva",
    image: "assets/products/06_2kva-single-phase-industrial-online-ups-1749529166-2926365.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 2 KVA", "Model: KE4402", "Efficiency: 85%"]
  },
  {
    name: "3kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "3kva",
    image: "assets/products/07_3kva-single-phase-industrial-online-ups-1749529705-8124052.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 3 KVA", "Model: KE4403"]
  },
  {
    name: "5kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "5kva",
    image: "assets/products/09_5kva-single-phase-industrial-online-ups-1749530253-8124091.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 5 KVA", "Backup Time: 30 mins"]
  },
  {
    name: "7.5kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "7p5kva",
    image: "assets/products/11_7-5kva-single-phase-industrial-online-ups-1749529325-2924337.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Model: KE4407P5", "Warranty: 1 Year"]
  },
  {
    name: "10kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "10kva",
    alsoMatrix: "3ph-1ph",
    alsoMatrixKey: "10kva",
    image: "assets/products/00_10kva-single-phase-industrial-online-ups-1749529507-8124040.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 10 KVA", "Model: KE44010"]
  },
  {
    name: "15kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "15kva-sp",
    image: "assets/products/01_15kva-single-phase-industrial-online-ups-1749529825-8124060.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 15 KVA", "Configuration: 1 Phase in & 1 Phase Out"]
  },
  {
    name: "20kVA Single Phase Industrial Online UPS",
    matrix: "1ph-1ph",
    matrixKey: "20kva",
    image: "assets/products/05_20kva-single-phase-industrial-online-ups-1749529605-8124045.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Single Phase", "Capacity: 20 KVA", "Model: KE44020"]
  },
  {
    name: "15kVA Three Phase Industrial Online UPS",
    matrix: "3ph-1ph",
    matrixKey: "15kva",
    alsoMatrix: "3ph-3ph",
    alsoMatrixKey: "15kva",
    image: "assets/products/02_15kva-three-phase-industrial-online-ups-1749530414-8124106.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: 3 Phase", "Capacity: 15 KVA", "Model: KE44015", "Warranty: 3 Years"]
  },
  {
    name: "40kVA Three Phase Industrial Online UPS",
    matrix: "3ph-1ph",
    matrixKey: "40kva",
    alsoMatrix: "3ph-3ph",
    alsoMatrixKey: "40kva",
    image: "assets/products/08_40kva-three-phase-industrial-online-ups-1749530047-8124075.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Three Phase", "Capacity: 40 kVA", "Warranty: 1 Year"]
  },
  {
    name: "60kVA Three Phase Industrial Online UPS",
    matrix: "3ph-3ph",
    matrixKey: "60kva",
    image: "assets/products/10_60kva-three-phase-industrial-online-ups-1749530152-8124084.jpeg",
    price: "On request",
    details: ["Country of Origin: India", "Phase: Three Phase", "Capacity: 60 kVA", "Warranty: 2 Years"]
  }
];

const testimonials = [
  {
    quote: "We have been in association with Keptron Electronics for several years now. Their industrial UPS systems have never let us down — zero downtime in our production line since installation. Their after-sales support is equally commendable and prompt.",
    name: "Saidalavi",
    role: "Operations Manager",
    stars: 5
  },
  {
    quote: "Keptron offers an affordable product range without compromising on quality. Their staff is highly efficient and responsive. We sourced 5kVA units for our facility and the entire experience — from order placement to installation — has been excellent.",
    name: "Mohan B",
    role: "Procurement Head",
    stars: 5
  },
  {
    quote: "Delighted with the innovation and user-friendly design of Keptron's UPS systems. The units are compact, energy-efficient, and have been running continuously in our setup for over two years without a single issue. Great value for money.",
    name: "Sunny Bansal",
    role: "IT Infrastructure Lead",
    stars: 5
  },
  {
    quote: "The product's design is not only aesthetically pleasing but also highly functional. We installed multiple units across our office floors and they integrate seamlessly with our existing electrical setup. Keptron's team was very professional throughout.",
    name: "Yatendra Singh Kushwah",
    role: "Facility Manager",
    stars: 5
  }
];

document.getElementById("welcome-text").textContent = welcomeText;

const glimpseEl = document.getElementById("glimpse");
glimpse.forEach(([k, v]) => {
  const block = document.createElement("div");
  block.className = "kv";
  block.innerHTML = `<strong>${k}</strong><br>${v}`;
  glimpseEl.appendChild(block);
});

const testimonialsList = document.getElementById("testimonials-list");
if (testimonialsList) {
  testimonials.forEach(t => {
    const stars = "★".repeat(t.stars) + "☆".repeat(5 - t.stars);
    const li = document.createElement("li");
    li.className = "testimonial-card";
    li.innerHTML = `
      <div class="testimonial-quote-mark">"</div>
      <p class="testimonial-text">${t.quote}</p>
      <div class="testimonial-stars" aria-label="${t.stars} out of 5 stars">${stars}</div>
      <div class="testimonial-author">
        <div class="testimonial-name">${t.name}</div>
        <div class="testimonial-role">${t.role}</div>
      </div>
    `;
    testimonialsList.appendChild(li);
  });
}

// Dropdown functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdown = this.parentElement;
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu.style.display === 'block') {
          menu.style.display = 'none';
        } else {
          // Close other dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.style.display = 'none';
          });
          menu.style.display = 'block';
        }
      }
    });
  });
  
  // Quote form submission
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your quote request! We will contact you soon.');
      this.reset();
    });
  }
  
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
