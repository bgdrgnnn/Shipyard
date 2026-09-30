(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  // Solid header once the hero is scrolled past
  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile navigation
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }
  toggle.addEventListener('click', function () {
    setNav(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setNav(false);
  });

  // Highlight the nav link of the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) spy.observe(s);
    });

    // Fade sections in as they enter the viewport
    var targets = document.querySelectorAll('.section-head, .split, .service, .why, .vm, .gold, .facility, .spec-card, .gallery, .legal-grid, .contact');
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) {
      el.classList.add('reveal');
      reveal.observe(el);
    });
  }

  // Gallery lightbox
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  document.querySelectorAll('.gallery a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      boxImg.src = a.getAttribute('href');
      boxImg.alt = a.querySelector('img').alt;
      box.hidden = false;
    });
  });
  function closeBox() { box.hidden = true; boxImg.removeAttribute('src'); }
  box.addEventListener('click', function (e) { if (e.target !== boxImg) closeBox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) closeBox(); });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
