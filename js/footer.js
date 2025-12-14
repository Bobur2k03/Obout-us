// js/footer.js — надежная загрузка footer и динамический год (исправленный)
document.addEventListener('DOMContentLoaded', function () {
  const target = document.getElementById('footer');

  const candidates = [
    'footer.html',
    './footer.html',
    '/footer.html',
    '../footer.html'
  ];

  (async function tryLoad() {
    let loaded = false;
    for (const p of candidates) {
      try {
        const res = await fetch(p + '?t=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const html = await res.text();
        if (target) target.innerHTML = html;
        else document.body.insertAdjacentHTML('beforeend', html);
        initFooter();
        loaded = true;
        break;
      } catch (e) {
        console.debug('footer fetch failed for', p, e.message || e);
      }
    }

    if (!loaded) {
      console.error('Не удалось загрузить footer (проверьте путь и Network в DevTools).');
      // minimal fallback footer (показываем навигацию, чтобы сайт был работоспособен)
      if (target) {
        target.innerHTML = `
          <footer class="footer">
            <div class="footer-content">
              <div class="footer-section">
                <h3>Навигация</h3>
                <ul>
                  <li><a href="index.html">Главная</a></li>
                  <li><a href="about.html">Обо мне</a></li>
                </ul>
              </div>
            </div>
            <div class="footer-bottom">
              &copy; <span id="footer-year"></span> Портфолио
            </div>
          </footer>
        `;
        initFooter();
      }
    }
  })();

  function initFooter() {
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }
});
