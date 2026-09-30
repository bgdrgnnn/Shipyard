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
    var targets = document.querySelectorAll('.section-head, .about-content, .service, .why, .vm, .gold-head, .gold-card, .facility, .spec-card, .location, .gallery, .about-legal, .contact');
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

  // Gallery: category filter, "show all", and lightbox
  var PREVIEW = 12;
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
  var filterBtns = document.querySelectorAll('.gallery-filter button');
  var more = document.querySelector('.gallery-more');
  var current = 'all', expanded = false;

  function visibleTiles() {
    return tiles.filter(function (t) { return !t.classList.contains('is-hidden'); });
  }
  function applyFilter() {
    var matches = tiles.filter(function (t) { return current === 'all' || t.dataset.cat === current; });
    tiles.forEach(function (t) { t.classList.add('is-hidden'); });
    matches.forEach(function (t, i) {
      if (expanded || current !== 'all' || i < PREVIEW) t.classList.remove('is-hidden');
    });
    more.hidden = expanded || current !== 'all' || matches.length <= PREVIEW;
    // Bento rhythm: every group of six opens with one large tile, alternating sides
    visibleTiles().forEach(function (t, i) {
      var lead = i % 6 === 0;
      t.classList.toggle('g-big', lead);
      t.classList.toggle('g-right', lead && Math.floor(i / 6) % 2 === 1);
    });
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      current = btn.dataset.filter;
      applyFilter();
    });
  });
  document.getElementById('gallery-more').addEventListener('click', function () {
    expanded = true;
    applyFilter();
  });
  applyFilter();

  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.lightbox-cap');
  var shown = [], idx = 0;
  function show(i) {
    idx = (i + shown.length) % shown.length;
    var a = shown[idx], alt = a.querySelector('img').alt;
    boxImg.src = a.getAttribute('href');
    boxImg.alt = alt;
    boxCap.textContent = alt + '  ·  ' + (idx + 1) + ' / ' + shown.length;
  }
  tiles.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      shown = visibleTiles();
      show(shown.indexOf(a));
      box.hidden = false;
    });
  });
  function closeBox() { box.hidden = true; boxImg.removeAttribute('src'); }
  box.querySelector('.lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
  box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox-close')) closeBox(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') closeBox();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
