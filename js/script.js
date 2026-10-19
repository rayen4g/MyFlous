(() => {
  'use strict';

  /* ---------- Theme toggle (mirrors the app's own light/dark modes) ---------- */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'myflous-site-theme';

  function applyTheme(theme){
    body.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ }
  }

  (function initTheme(){
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
    if (saved === 'light' || saved === 'dark') { applyTheme(saved); return; }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  })();

  themeToggle.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------- Nav scrolled state ---------- */
  const nav = document.getElementById('nav');
  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMenu(){
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  }
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Count-up balance number ---------- */
  const bcNumber = document.getElementById('bcNumber');
  const balanceCard = document.getElementById('balanceCard');
  let counted = false;

  function formatAmount(n){
    return n.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  }

  function countUp(el, target, duration){
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatAmount(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Scroll reveal (feature cards + count-up trigger) ---------- */
  const revealTargets = document.querySelectorAll('.feature-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting){
        const delay = prefersReducedMotion ? 0 : (i % 4) * 70;
        setTimeout(() => entry.target.classList.add('reveal'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));

  if (balanceCard && bcNumber){
    const bio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted){
          counted = true;
          countUp(bcNumber, 3482.750, prefersReducedMotion ? 1 : 1400);
          bio.disconnect();
        }
      });
    }, { threshold: 0.4 });
    bio.observe(balanceCard);
  }
})();
