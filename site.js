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

const rises = document.querySelectorAll('.rise');
rises.forEach((el, i) => {
  el.style.transitionDelay = ((i % 4) * 0.08) + 's';
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting));
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
rises.forEach(el => io.observe(el));

const box = document.getElementById('compare-box');
const before = document.getElementById('compare-before');
const beforeImg = before.querySelector('img');
const handle = document.getElementById('compare-handle');
function fit() { beforeImg.style.width = box.offsetWidth + 'px'; }
function setSplit(clientX) {
  const rect = box.getBoundingClientRect();
  const p = Math.min(0.96, Math.max(0.04, (clientX - rect.left) / rect.width));
  const pct = (p * 100) + '%';
  before.style.width = pct;
  handle.style.left = pct;
}
fit();
window.addEventListener('resize', fit);
handle.addEventListener('pointerdown', (e) => {
  handle.setPointerCapture(e.pointerId);
  setSplit(e.clientX);
});
handle.addEventListener('pointermove', (e) => {
  if (handle.hasPointerCapture(e.pointerId)) setSplit(e.clientX);
});
box.addEventListener('pointerdown', (e) => {
  if (e.target === handle) return;
  box.setPointerCapture(e.pointerId);
  setSplit(e.clientX);
});
box.addEventListener('pointermove', (e) => {
  if (box.hasPointerCapture(e.pointerId)) setSplit(e.clientX);
});
