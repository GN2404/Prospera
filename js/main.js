/* ============================================
   PROSPERA — main.js
   Core: nav, fade-in, FAQ accordion,
   forms, modal, smooth scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Fade-In on Scroll --- */
  const fades = document.querySelectorAll('.fade-in');
  if (fades.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    fades.forEach(el => obs.observe(el));
  }

  /* --- 2. Nav scroll shadow --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08)';
    }, { passive: true });
  }

  /* --- 3. Mobile hamburger --- */
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

  /* --- 4. FAQ Accordion --- */
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

  /* --- 5. Sign Up Form Validation --- */
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

  /* --- 6. Waitlist Form --- */
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

  /* --- 7. Login Modal --- */
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    document.querySelectorAll('[data-open-login]').forEach(b => {
      b.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add('modal-overlay--show'); });
    });
    const close = loginModal.querySelector('.modal__close');
    if (close) close.addEventListener('click', () => loginModal.classList.remove('modal-overlay--show'));
    loginModal.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.classList.remove('modal-overlay--show'); });
  }

  /* --- 8. Smooth scroll for hash anchors --- */
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
