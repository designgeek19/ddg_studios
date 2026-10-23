/* Shared behaviour for secondary pages (privacy, case studies): theme, menu, progress bar, back-to-top. */
(() => {
  const $ = s => document.querySelector(s);
  const root = document.documentElement;

  $('#theme')?.addEventListener('click', () => {
    root.classList.toggle('dark');
    try { localStorage.setItem('ddg-theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
  });

  const burger = $('#burger'), nav = $('#mobile-nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('hidden') === false;
    burger.setAttribute('aria-expanded', open);
  });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.add('hidden'); burger.setAttribute('aria-expanded', 'false'); } });

  const bar = $('#progress'), top = $('#top-btn');
  const onScroll = () => {
    const h = root, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + '%';
    if (top) { const show = h.scrollTop > 600; top.classList.toggle('hidden', !show); top.classList.toggle('grid', show); }
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  top?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
