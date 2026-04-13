const welcomeText = `Established in 1991, Keptron Electronics is a Manufacturer, Exporter and Supplier of Industrial Online UPS systems. Product coverage includes 1kVA to 20kVA single-phase and 1kVA to 300kVA three-phase configurations, catering to a wide range of industrial power protection needs.`;

const glimpse = [
  ["Nature of Business", "Manufacturer, Exporter & Supplier"],
  ["Year of Establishment", "1991"],
  ["Market Covered", "Worldwide"],
  ["Offices", "Kerala | Delhi | Mumbai"],
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
    name: "National Informatics Centre (NIC)",
    role: "Government IT Infrastructure",
    stars: 5
  },
  {
    quote: "Keptron offers an affordable product range without compromising on quality. Their staff is highly efficient and responsive. We sourced 5kVA units for our facility and the entire experience — from order placement to installation — has been excellent.",
    name: "Punjab National Bank",
    role: "Banking & Financial Services",
    stars: 5
  },
  {
    quote: "Delighted with the innovation and user-friendly design of Keptron's UPS systems. The units are compact, energy-efficient, and have been running continuously in our setup for over two years without a single issue. Great value for money.",
    name: "Bharat Electronics Limited",
    role: "Defence & Electronics",
    stars: 5
  },
  {
    quote: "The product's design is not only aesthetically pleasing but also highly functional. We installed multiple units across our office floors and they integrate seamlessly with our existing electrical setup. Keptron's team was very professional throughout.",
    name: "Indian Oil Corporation",
    role: "Energy & Petroleum",
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
  
  // Accordion (About section)
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });
      // Open this one if it wasn't already
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');

  function openMenu() {
    navList.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    navList.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked (except the dropdown toggle)
  document.querySelectorAll('.nav-list .nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Quote form submission — POST to Google Sheets (also sends email via Apps Script)
  // NOTE: Paste your Apps Script Web App deployment URL below.
  // See google-sheets-quote-apps-script.gs + SETUP_GUIDE.md for setup steps.
  const QUOTE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwT5Do9tJWpSXEUw-MwkZLo8V_GiyJ_oqLszdG69psMlZeEzia2hfshR3BgjDbkcMSf8g/exec';

  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      const data = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        phone: this.querySelector('input[type="tel"]').value,
        product: this.querySelector('select').value,
        requirements: this.querySelector('textarea').value
      };

      if (!QUOTE_ENDPOINT) {
        // Fallback: download CSV locally if endpoint not yet configured
        const date = new Date().toLocaleDateString();
        const csv = "data:text/csv;charset=utf-8,"
          + "Date,Name,Email,Phone,Product Type,Requirements\n"
          + `"${date}","${data.name}","${data.email}","${data.phone}","${data.product}","${data.requirements.replace(/"/g, '""')}"`;
        const link = document.createElement('a');
        link.href = encodeURI(csv);
        link.download = `Keptron_Quote_${data.name.replace(/\s+/g, '_')}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Thank you! (Endpoint not yet configured — details downloaded locally.)');
        btn.textContent = originalText;
        btn.disabled = false;
        this.reset();
        return;
      }

      try {
        await fetch(QUOTE_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        this.innerHTML = `
          <div style="text-align:center;padding:28px;">
            <div style="font-size:2.5rem;margin-bottom:12px;">✅</div>
            <h3 style="color:var(--brand-dark);margin-bottom:8px;">Quote Request Sent!</h3>
            <p style="color:var(--text-muted);">Thank you for reaching out. Our team will contact you within 24 hours.</p>
          </div>
        `;
      } catch (err) {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Something went wrong. Please try again or contact us directly at info@keptronelectronics.com.');
      }
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
