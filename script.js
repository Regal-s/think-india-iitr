/* ============================================================
   Think India · IIT Roorkee — Interactions
   Lightweight, dependency-free. Progressive enhancement only.
   ============================================================ */

(function () {
  'use strict';

  // ──────────────  Year in footer  ──────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ──────────────  Sticky-nav shadow on scroll  ──────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ──────────────  Mobile menu toggle  ──────────────
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (links.classList.contains('is-open')) {
          links.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ──────────────  Scroll-reveal — tag elements & observe  ──────────────
  // We add .reveal to a sensible set of elements, then observe them.
  const revealTargets = [
    '.section-head',
    '.about-text',
    '.about-stats',
    '.pillar',
    '.card',
    '.magazine-cover',
    '.magazine-text',
    '.voice',
    '.team-block',
    '.connect-text',
    '.connect-form',
  ];
  const reveals = document.querySelectorAll(revealTargets.join(','));
  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    // small stagger for siblings inside a grid
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: just show them
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ──────────────  Form handling  ──────────────
  // If a Formspree (or compatible) endpoint is set, we submit via fetch
  // and show a friendly status. Otherwise we fall through to native submit.
  const form   = document.getElementById('connect-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action') || '';
      // If the endpoint is still the placeholder, just show a helpful note
      // instead of submitting to a broken URL.
      if (action.includes('your-form-id')) {
        e.preventDefault();
        status.classList.add('is-error');
        status.textContent =
          'Form endpoint not configured yet — replace the placeholder action in index.html.';
        return;
      }

      // Only handle JSON-style endpoints (Formspree). For anything else,
      // let the browser do its normal POST.
      if (!/formspree\.io|netlify|formsubmit|getform\.io/.test(action)) {
        return; // native submit
      }

      e.preventDefault();
      status.classList.remove('is-error');
      status.textContent = 'Sending…';

      try {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          form.reset();
          status.textContent =
            'Thank you — your message is with the chapter. We will write back soon.';
        } else {
          status.classList.add('is-error');
          status.textContent =
            'Something went wrong. Please email us at thinkindia@iitr.ac.in instead.';
        }
      } catch (err) {
        status.classList.add('is-error');
        status.textContent =
          'Network error. Please email us at thinkindia@iitr.ac.in instead.';
      }
    });
  }

})();
