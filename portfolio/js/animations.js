/* ANIMATIONS.JS: reveal on scroll, progress bar, back-to-top, active nav link */
document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Reveal elements when they enter the screen (IntersectionObserver)
  const items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { threshold: .12 });
    items.forEach(el => io.observe(el));
  }

  // 2) Scroll progress bar + back-to-top button
  const bar = document.getElementById('progress'), top = document.getElementById('to-top');
  function onScroll() {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    top.classList.toggle('show', h.scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  // 3) Highlight the nav link of the section currently on screen
  const links = [...document.querySelectorAll('.nav-menu a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + en.target.id;
      a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
    });
  }), { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && spy.observe(s));

  // 4) Typing effect on the hero title line. Edit the ROLES list to change the words.
  const typed = document.getElementById('typed');
  if (typed && !reduce) {
    const ROLES = ['Aspiring Web Developer', 'Python Programmer', 'Curious Learner'];
    let r = 0, i = 0, deleting = false;
    (function tick() {
      const word = ROLES[r];
      i += deleting ? -1 : 1;
      typed.textContent = word.slice(0, i);
      let wait = deleting ? 40 : 80;
      if (!deleting && i === word.length) { deleting = true; wait = 1500; }      // pause on full word
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % ROLES.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }
});
