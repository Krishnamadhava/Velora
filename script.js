// Velora storefront interactions
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.product-card, .about-grid > div, .section-title')
    .forEach(el => { el.classList.add('reveal'); io.observe(el); });

  // Comic gallery
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const imgs = [...gallery.querySelectorAll('img')];
    const dots = gallery.querySelector('.gallery-dots');
    let i = 0, timer;
    imgs.forEach((_, n) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Page ' + (n + 1));
      if (n === 0) b.classList.add('on');
      b.addEventListener('click', () => { show(n); restart(); });
      dots.appendChild(b);
    });
    const btns = [...dots.querySelectorAll('button')];
    function show(n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach((im, k) => im.classList.toggle('active', k === i));
      btns.forEach((b, k) => b.classList.toggle('on', k === i));
    }
    function restart() { clearInterval(timer); timer = setInterval(() => show(i + 1), 4000); }
    restart();
  }

  // Gumroad placeholders — wire these up once product links exist
  document.querySelectorAll('[data-product]').forEach(a => {
    if (a.getAttribute('href') === '#') {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Gumroad link coming soon — follow @veloradigital94 on Instagram for the launch.');
      });
    }
  });
});
