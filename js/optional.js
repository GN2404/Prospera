/* ============================================
   PROSPERA — optional.js
   Non-critical enhancements: dashboard
   carousel, tab switching, typewriter
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Dashboard Carousel --- */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = carousel.querySelector('.carousel__slides');
    const dots = carousel.querySelectorAll('.carousel__dot');
    const prev = carousel.querySelector('.carousel__btn--prev');
    const next = carousel.querySelector('.carousel__btn--next');
    const total = carousel.querySelectorAll('.carousel__slide').length;
    let cur = 0, timer;

    function go(i) {
      if (i >= total) i = 0;
      if (i < 0) i = total - 1;
      cur = i;
      slides.style.transform = `translateX(-${cur * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('carousel__dot--active', idx === cur));
    }
    if (next) next.addEventListener('click', () => { go(cur + 1); reset(); });
    if (prev) prev.addEventListener('click', () => { go(cur - 1); reset(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));

    function start() { timer = setInterval(() => go(cur + 1), 4000); }
    function reset() { clearInterval(timer); start(); }
    start();
  }

  /* --- Dashboard Tab Switching --- */
  const dashTabs = document.querySelectorAll('.dash-mock__tab[data-tab]');
  if (dashTabs.length) {
    dashTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dashTabs.forEach(t => t.classList.remove('dash-mock__tab--active'));
        tab.classList.add('dash-mock__tab--active');
        document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('dash-panel--active'));
        const panel = document.getElementById('panel-' + tab.dataset.tab);
        if (panel) panel.classList.add('dash-panel--active');
      });
    });
  }

  /* --- Typewriter Animation --- */
  const twEl = document.getElementById('typewriterText');
  const twSub = document.getElementById('typewriterSub');
  if (twEl && twSub) {
    const fullText = 'Prospera';
    const lastVisit = localStorage.getItem('prospera_visited');
    const now = Date.now();
    if (!lastVisit || (now - parseInt(lastVisit)) > 7 * 24 * 60 * 60 * 1000) {
      runTypewriter(twEl, twSub, fullText);
      localStorage.setItem('prospera_visited', now.toString());
    } else {
      twEl.textContent = fullText;
      twEl.style.width = 'auto';
      twEl.classList.add('done');
      twSub.style.opacity = '1';
      twSub.classList.add('show');
    }
  }

  function runTypewriter(el, sub, text) {
    let i = 0;
    el.textContent = text;
    const fullWidth = el.scrollWidth;
    el.textContent = '';
    el.style.width = '0';
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        el.style.width = ((i / text.length) * fullWidth) + 'px';
        setTimeout(type, 120);
      } else {
        el.style.width = 'auto';
        el.classList.add('done');
        sub.classList.add('show');
      }
    }
    setTimeout(type, 600);
  }
});
