// Shared mobile menu + dropdown behaviour for pages that don't load app.js
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        var menu = this.parentElement.querySelector('.dropdown-menu');
        var open = menu.style.display === 'block';
        document.querySelectorAll('.dropdown-menu').forEach(function (m) { m.style.display = 'none'; });
        menu.style.display = open ? 'none' : 'block';
      }
    });
  });

  var hamburger = document.getElementById('hamburger');
  var navList = document.getElementById('nav-list');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');
  function openMenu() { navList.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { navList.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-list .nav-link:not(.dropdown-toggle)').forEach(function (l) { l.addEventListener('click', closeMenu); });
});
