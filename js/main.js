/* ============================================
   PROSPERA — main.js
   Core: nav, reveal animations, counters,
   chart animations, FAQ accordion, forms
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 0. Scroll Progress Bar ─────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
  }, { passive: true });

  /* ─── 1. Reveal on scroll (slide-up + fade) ──── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible', 'revealed'), delay);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .fade-in').forEach(el => revealObs.observe(el));

  /* ─── 2. Staggered children ──────────────────── */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.dataset.delay = i * 90;
      if (!child.classList.contains('reveal') && !child.classList.contains('fade-in')) {
        child.classList.add('reveal');
        revealObs.observe(child);
      }
    });
  });

  /* ─── 3. Number counters ─────────────────────── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target || '0');
    const prefix  = el.dataset.prefix  || '';
    const suffix  = el.dataset.suffix  || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = eased * target;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) + suffix;
      if (t < 1) requestAnimationFrame(update);
      else el.textContent = prefix + (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
    }
    requestAnimationFrame(update);
  }

  /* ─── 4. Chart bar animation (hero dashboard) ── */
  const chartBars = document.querySelectorAll('.hero-v2__chart-bars div');
  if (chartBars.length) {
    const heights = Array.from(chartBars).map(b => b.style.height || '50%');
    chartBars.forEach(b => { b.style.height = '2px'; b.style.transition = 'none'; });
    setTimeout(() => {
      chartBars.forEach((bar, i) => {
        bar.style.transition = `height 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 55}ms`;
        bar.style.height = heights[i];
      });
    }, 350);
  }

  /* ─── 5. Sector fill animation ───────────────── */
  const fills = document.querySelectorAll('.hero-v2__sector-fill');
  if (fills.length) {
    const widths = Array.from(fills).map(f => f.style.width || '0%');
    fills.forEach(f => { f.style.width = '0%'; f.style.transition = 'none'; });
    setTimeout(() => {
      fills.forEach((fill, i) => {
        fill.style.transition = `width 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms`;
        fill.style.width = widths[i];
      });
    }, 600);
  }

  /* ─── 6. Card hover micro-lift ───────────────── */
  document.querySelectorAll('.insights-card, .how-v3__card, .pc, .f-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.willChange = 'transform');
    card.addEventListener('mouseleave', () => card.style.willChange = '');
  });

  /* ─── 7. Nav scroll shadow ───────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08)';
    }, { passive: true });
  }

  /* ─── 8. Mobile hamburger ────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('nav__hamburger--open');
      mobileNav.classList.toggle('nav__mobile--open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('nav__hamburger--open');
        mobileNav.classList.remove('nav__mobile--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── 9. FAQ Accordion ───────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item').forEach(o => {
        o.classList.remove('faq-item--open');
        const oa = o.querySelector('.faq-a');
        if (oa) oa.style.maxHeight = null;
      });
      if (!open) { item.classList.add('faq-item--open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ─── 10. Sign Up Form ───────────────────────── */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const success = document.getElementById('signupSuccess');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      signupForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('form-group--error'));
      signupForm.querySelectorAll('.form-input,.form-select').forEach(i => i.classList.remove('form-input--error'));
      signupForm.querySelectorAll('[required]').forEach(f => {
        if (!f.value.trim()) { formErr(f, 'This field is required.'); ok = false; }
      });
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      signupForm.querySelectorAll('input[type="email"]').forEach(f => {
        if (f.value.trim() && !emailRe.test(f.value)) { formErr(f, 'Enter a valid email.'); ok = false; }
      });
      const pw = signupForm.querySelector('#password');
      if (pw && pw.value.length > 0 && pw.value.length < 8) { formErr(pw, 'Min 8 characters.'); ok = false; }
      const cpw = signupForm.querySelector('#confirmPassword');
      if (pw && cpw && pw.value !== cpw.value) { formErr(cpw, "Passwords don't match."); ok = false; }
      if (ok) { signupForm.style.display = 'none'; if (success) success.classList.add('form-success--show'); }
    });
    signupForm.querySelectorAll('.form-input,.form-select').forEach(f => {
      f.addEventListener('blur', () => {
        if (f.value.trim()) {
          const g = f.closest('.form-group');
          if (g) { g.classList.remove('form-group--error'); f.classList.remove('form-input--error'); }
        }
      });
    });
  }

  /* ─── 11. Waitlist Form ──────────────────────── */
  const wlForm = document.getElementById('waitlistForm');
  if (wlForm) {
    const wlSuccess = document.getElementById('waitlistSuccess');
    wlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = wlForm.querySelector('input[type="email"]');
      if (email && email.value.trim()) {
        wlForm.style.display = 'none';
        if (wlSuccess) wlSuccess.classList.add('form-success--show');
      }
    });
  }

  /* ─── 12. Login Modal ────────────────────────── */
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    document.querySelectorAll('[data-open-login]').forEach(b => {
      b.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add('modal-overlay--show'); });
    });
    const close = loginModal.querySelector('.modal__close');
    if (close) close.addEventListener('click', () => loginModal.classList.remove('modal-overlay--show'));
    loginModal.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.classList.remove('modal-overlay--show'); });
  }

  /* ─── 13. Smooth scroll for hash anchors ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  function formErr(field, msg) {
    const g = field.closest('.form-group');
    if (g) {
      g.classList.add('form-group--error');
      field.classList.add('form-input--error');
      const e = g.querySelector('.form-error');
      if (e) e.textContent = msg;
    }
  }

});
