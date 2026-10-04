const btn = document.getElementById('menu-btn');
const nav = document.getElementById('mobile-nav');
btn.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  btn.setAttribute('aria-expanded', 'false');
}));
const dock = document.getElementById('dock');
const hero = document.querySelector('.hero');
new IntersectionObserver(([e]) => {
  dock.classList.toggle('show', !e.isIntersecting);
}, { threshold: 0.15 }).observe(hero);
