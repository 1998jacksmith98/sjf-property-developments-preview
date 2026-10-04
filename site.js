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

const scrub = document.getElementById('scrub');
const canvas = document.getElementById('scrub-canvas');
const ctx = canvas.getContext('2d');
const video = document.createElement('video');
video.src = 'videos/scroll-scrub.mp4';
video.muted = true;
video.playsInline = true;
video.preload = 'auto';
function draw() {
  if (video.readyState < 2) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
video.addEventListener('loadeddata', () => {
  canvas.width = video.videoWidth || 1080;
  canvas.height = video.videoHeight || 1920;
  draw();
});
video.addEventListener('seeked', draw);
function onScroll() {
  const rect = scrub.getBoundingClientRect();
  const total = scrub.offsetHeight - window.innerHeight;
  const passed = Math.min(Math.max(-rect.top, 0), total);
  const p = total > 0 ? passed / total : 0;
  if (!video.duration) return;
  const t = Math.min(video.duration - 0.05, p * video.duration);
  if (Math.abs(video.currentTime - t) > 0.03) video.currentTime = t;
}
window.addEventListener('scroll', onScroll, { passive: true });
video.load();
