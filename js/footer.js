// footer.js: динамический год и (опционально) анимация
window.addEventListener('DOMContentLoaded', function () {
    var yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// footer.js — вставка футера на всех страницах
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer').innerHTML = html;
      });
});
