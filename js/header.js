// header.js — логика для header.html (бургер-меню, активная ссылка)
document.addEventListener('DOMContentLoaded', function() {
    // Вставка header
    fetch('header.html')
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
        initHeader();
      });

    function initHeader() {
      // Бургер-меню
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
          navMenu.classList.toggle('active');
        });
      }
      // Подсветка активной ссылки
      const links = document.querySelectorAll('.nav-link');
      const path = location.pathname.split('/').pop();
      links.forEach(link => {
        if (link.getAttribute('href') === path) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
});
