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
new IntersectionObserver(([e]) => dock.classList.toggle('show', !e.isIntersecting), { threshold: 0.2 })
  .observe(document.querySelector('.hero'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    e.target.style.animationDelay = (i * 0.06) + 's';
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.rise').forEach(el => io.observe(el));
