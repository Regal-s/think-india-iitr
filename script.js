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
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

  // ──────────────  Scroll-reveal  ──────────────
  const revealTargets = [
    '.section-head',
    '.about-text',
    '.about-stats',
    '.pillar',
    '.ev-card',
    '.events-cta',
    '.magazine-cover-wrap',
    '.magazine-text',
    '.voice',
    '.team-block',
    '.connect-text',
    '.connect-form',
  ];
  const reveals = document.querySelectorAll(revealTargets.join(','));
  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 5) * 70 + 'ms';
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
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ──────────────  Form handling  ──────────────
  // Netlify Forms is wired up via the data-netlify attribute, so a normal
  // POST works once the site is live on Netlify. If you later switch to a
  // Formspree-style endpoint, this submits via fetch and shows a status.
  const form   = document.getElementById('connect-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action') || '';

      // If a placeholder endpoint is still in place, warn instead of breaking.
      if (action.includes('your-form-id')) {
        e.preventDefault();
        status.classList.add('is-error');
        status.textContent =
          'Form endpoint not configured yet — replace the placeholder action in index.html.';
        return;
      }

      // Only intercept JSON-style endpoints (Formspree etc.). Otherwise let
      // the browser do its normal POST — this is what Netlify Forms uses.
      if (!/formspree\.io|formsubmit|getform\.io/.test(action)) {
        return; // native submit (Netlify Forms path)
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
