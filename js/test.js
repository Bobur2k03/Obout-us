// Модульный JS только для test.html
// Пример: автоматическая подстановка года в футер
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Для второй и третьей страницы (если есть)
const year2 = document.getElementById('year2');
if (year2) year2.textContent = new Date().getFullYear();
const year3 = document.getElementById('year3');
if (year3) year3.textContent = new Date().getFullYear();

// Пример: обработка кнопки "Финал"
const finalBtn = document.getElementById('finalBtn');
if (finalBtn) {
  finalBtn.addEventListener('click', () => {
    alert('Финал!');
  });
}
