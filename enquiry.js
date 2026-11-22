// Business enquiry form -> same Google Apps Script endpoint used by the homepage quote form.
// Extra fields (company, capacity, city/state) are folded into "requirements" so the existing sheet keeps working.
document.addEventListener('DOMContentLoaded', function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbwT5Do9tJWpSXEUw-MwkZLo8V_GiyJ_oqLszdG69psMlZeEzia2hfshR3BgjDbkcMSf8g/exec';
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var pre = new URLSearchParams(location.search).get('product');
  if (pre && form.elements.product) form.elements.product.value = pre;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var f = form.elements;
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    var data = {
      name: f.name.value,
      email: f.email.value,
      phone: f.phone.value,
      product: f.product.value,
      requirements: 'Company: ' + f.company.value +
        '\nRequired capacity: ' + (f.capacity.value || '-') +
        '\nCity/State: ' + f.location.value +
        '\nPage: ' + location.pathname +
        '\nMessage: ' + (f.message.value || '-')
    };
    try {
      await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      form.innerHTML = '<div style="text-align:center;padding:28px;"><div style="font-size:2.5rem;margin-bottom:12px;">✅</div>' +
        '<h3>Enquiry Sent!</h3><p style="color:var(--text-muted);">Thank you. Our team will contact you within 24 hours.</p></div>';
    } catch (err) {
      btn.textContent = label;
      btn.disabled = false;
      alert('Something went wrong. Please call +91 9987400719 or email info@keptronelectronics.com.');
    }
  });
});
