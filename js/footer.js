document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('footer');

  const paths = [
    'footer.html',
    './footer.html',
    '/footer.html',
    '../footer.html'
  ];

  (async function loadFooter() {
    for (const path of paths) {
      try {
        const res = await fetch(path + '?t=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) throw new Error(res.status);
        const html = await res.text();
        target.innerHTML = html;
        initFooter();
        return;
      } catch (_) {}
    }

    console.error('Footer не загружен — проверь путь');
  })();

  function initFooter() {
    const year = document.getElementById('footer-year');
    if (year) year.textContent = new Date().getFullYear();
  }
});
