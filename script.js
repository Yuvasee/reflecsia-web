(function () {
  'use strict';

  var page = document.querySelector('.rf-page');

  // ─── Sticky-nav border on scroll ─────────────────────────────────────────
  var onScroll = function () {
    if (window.scrollY > 4) page.classList.add('is-scrolled');
    else page.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── FAQ accordion ───────────────────────────────────────────────────────
  var faqItems = document.querySelectorAll('.rf-faq-item');
  faqItems.forEach(function (item, idx) {
    var btn = item.querySelector('.rf-faq-q');
    var icon = item.querySelector('.rf-faq-icon');
    if (!btn) return;
    if (idx === 0) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '−';
    } else {
      btn.setAttribute('aria-expanded', 'false');
      if (icon) icon.textContent = '+';
    }
    btn.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (icon) icon.textContent = isOpen ? '−' : '+';
    });
  });

  // ─── Smooth-scroll to anchors with offset ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // ─── Language persistence ────────────────────────────────────────────────
  // Only auto-redirect from default "/" → "/ru.html" if user previously chose RU.
  // Never auto-redirect away from an explicit /ru.html or other pages — those
  // are intentional. Any click on the EN/RU toggle persists the choice.
  var pageLang = document.documentElement.lang || 'en';
  try {
    var stored = localStorage.getItem('rf-lang');
    var path = window.location.pathname;
    var isDefaultRoot = path === '/' || /\/index\.html$/.test(path);
    var landed = sessionStorage.getItem('rf-landed');
    if (!landed && isDefaultRoot && stored === 'ru') {
      sessionStorage.setItem('rf-landed', '1');
      window.location.replace('/ru.html' + window.location.hash);
      return;
    }
    sessionStorage.setItem('rf-landed', '1');
    localStorage.setItem('rf-lang', pageLang);
  } catch (e) { /* private mode / disabled storage — ignore */ }

  // ─── Persist lang on toggle clicks ───────────────────────────────────────
  document.querySelectorAll('.rf-lang').forEach(function (a) {
    a.addEventListener('click', function () {
      try {
        var label = (a.textContent || '').toLowerCase().trim();
        if (label === 'ru' || label === 'en') {
          localStorage.setItem('rf-lang', label);
        }
      } catch (e) {}
    });
  });

  // ─── Hero waveform — render once on load ─────────────────────────────────
  var waveSvg = document.getElementById('rf-wave');
  if (waveSvg) {
    var bars = 72;
    var seed = function (i) {
      var x = i / bars;
      var env = Math.pow(Math.sin(Math.PI * x), 0.6);
      var noise = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) + Math.cos(i * 2.3));
      return Math.max(0.08, env * noise);
    };
    var ns = 'http://www.w3.org/2000/svg';
    waveSvg.setAttribute('viewBox', '0 0 ' + bars + ' 100');
    waveSvg.setAttribute('preserveAspectRatio', 'none');
    waveSvg.setAttribute('width', '100%');
    waveSvg.setAttribute('height', '100%');
    for (var i = 0; i < bars; i++) {
      var h = seed(i) * 96;
      var rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('class', 'rf-wave-bar');
      rect.setAttribute('x', String(i + 0.15));
      rect.setAttribute('y', String(50 - h / 2));
      rect.setAttribute('width', '0.7');
      rect.setAttribute('height', String(h));
      rect.setAttribute('rx', '0.35');
      rect.setAttribute('fill', '#56e0ff');
      rect.setAttribute('style', 'animation-delay:' + (i * 14) + 'ms');
      waveSvg.appendChild(rect);
    }
  }
})();
