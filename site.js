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

const box = document.getElementById('compare-box');
const before = document.getElementById('compare-before');
const handle = document.getElementById('compare-handle');
function setSplit(clientX) {
  const rect = box.getBoundingClientRect();
  const p = Math.min(0.92, Math.max(0.08, (clientX - rect.left) / rect.width));
  const pct = (p * 100) + '%';
  before.style.width = pct;
  handle.style.left = pct;
}
function pointer(e) {
  setSplit(e.clientX);
}
handle.addEventListener('pointerdown', (e) => {
  handle.setPointerCapture(e.pointerId);
  pointer(e);
});
handle.addEventListener('pointermove', (e) => {
  if (handle.hasPointerCapture(e.pointerId)) pointer(e);
});
box.addEventListener('pointerdown', (e) => {
  if (e.target === handle) return;
  setSplit(e.clientX);
});
