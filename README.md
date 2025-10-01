# 🚀 Портфолио Системного Администратора

Современный портфолио сайт для системного администратора с анимацией миньона и адаптивным дизайном.

## 📋 Описание

Этот проект представляет собой полнофункциональный портфолио сайт, созданный специально для системного администратора. Сайт включает в себя:

- **4 основные страницы**: Главная, Обо мне, Портфолио, Контакты
- **Анимация миньона**: Появляется в углу, падает вниз в конце
- **Адаптивный дизайн**: Работает на всех устройствах
- **Интерактивная форма**: С валидацией и анимациями
- **Фильтрация проектов**: По категориям (Инфраструктура, Безопасность, Автоматизация)

## 🛠 Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили и анимации
- **JavaScript (ES6+)** - интерактивность
- **Font Awesome** - иконки
- **Google Fonts** - типографика

## 📁 Структура проекта

```
portfolio-website/
├── index.html              # Главная страница
├── about.html              # Обо мне
├── portfolio.html          # Портфолио проектов
├── contact.html            # Контакты и форма
├── css/
│   ├── style.css          # Основные стили
│   └── animations.css     # Анимации
├── js/
│   ├── main.js            # Основная логика
│   ├── minion.js          # Анимация миньона
│   ├── portfolio.js       # Логика портфолио
│   └── contact.js         # Логика контактов
├── images/
│   ├── profile.jpg        # Фото профиля
│   ├── profile-large.jpg  # Большое фото
│   ├── minion.png         # Изображение миньона
│   └── projects/          # Скриншоты проектов
└── README.md              # Документация
```

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Настройка

1. Замените изображения в папке `images/` на свои
2. Обновите контактную информацию в HTML файлах
3. Настройте ссылки на ваши проекты и социальные сети

### 3. Локальный запуск

Просто откройте `index.html` в браузере или используйте локальный сервер:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 📝 Настройка контента

### Персональная информация

Обновите следующие файлы с вашими данными:

- `index.html` - главная информация
- `about.html` - подробная информация о себе
- `contact.html` - контактные данные

### Проекты

Добавьте свои проекты в `portfolio.html`:

```html
<div class="portfolio-item" data-category="infrastructure">
    <div class="portfolio-image">
        <img src="images/projects/your-project.jpg" alt="Название проекта">
        <div class="portfolio-overlay">
            <div class="portfolio-links">
                <a href="#" class="portfolio-link" title="Посмотреть">
                    <i class="fas fa-eye"></i>
                </a>
                <a href="https://github.com/yourusername/project" class="portfolio-link" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="portfolio-content">
        <h3>Название проекта</h3>
        <p>Описание проекта</p>
        <div class="portfolio-tech">
            <span class="tech-tag">Linux</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">Ansible</span>
        </div>
    </div>
</div>
```

### Контактная форма

Настройте отправку формы в `js/contact.js`:

```javascript
// Замените на реальный сервис отправки
function submitForm() {
    // EmailJS, Formspree, или другой сервис
    // Пример с EmailJS:
    emailjs.send('service_id', 'template_id', formData)
        .then(() => {
            showFormStatus('Сообщение отправлено!', 'success');
        })
        .catch(() => {
            showFormStatus('Ошибка отправки', 'error');
        });
}
```

## 🎨 Кастомизация

### Цветовая схема

Измените CSS переменные в `css/style.css`:

```css
:root {
    --primary-color: #2563eb;    /* Основной цвет */
    --secondary-color: #1e40af;  /* Вторичный цвет */
    --accent-color: #3b82f6;     /* Акцентный цвет */
    --text-color: #1f2937;       /* Цвет текста */
    --bg-color: #ffffff;         /* Цвет фона */
}
```

### Анимации

Настройте анимации в `css/animations.css`:

```css
/* Изменить скорость анимации миньона */
@keyframes minionAppear {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: scale(1); }
}
```

### Шрифты

Замените шрифты в HTML файлах:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📱 Адаптивность

Сайт полностью адаптивен и работает на:

- 📱 Мобильные устройства (320px+)
- 📱 Планшеты (768px+)
- 💻 Десктопы (1024px+)
- 🖥 Большие экраны (1200px+)

## 🌐 Деплой на GitHub Pages

### 1. Создание репозитория

1. Создайте новый репозиторий на GitHub
2. Назовите его `yourusername.github.io` для основного сайта
3. Или любое другое имя для проекта

### 2. Загрузка файлов

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 3. Настройка GitHub Pages

1. Перейдите в Settings репозитория
2. Найдите раздел "Pages"
3. Выберите источник "Deploy from a branch"
4. Выберите ветку "main" и папку "/ (root)"
5. Нажмите "Save"

### 4. Доступ к сайту

- Если репозиторий называется `username.github.io` → `https://username.github.io`
- Если другое имя → `https://username.github.io/repository-name`

## 🔧 Настройка формы обратной связи

### Вариант 1: EmailJS (рекомендуется)

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте сервис и шаблон
3. Обновите `js/contact.js`:

```javascript
// Инициализация EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// Отправка формы
emailjs.send('service_id', 'template_id', {
    subject: formData.subject,
    contact: formData.contactInfo,
    message: formData.message
});
```

### Вариант 2: Formspree

1. Зарегистрируйтесь на [Formspree](https://formspree.io/)
2. Создайте форму
3. Обновите `js/contact.js`:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## 🎯 Особенности

### Анимация миньона

- Появляется через 1 секунду после загрузки
- Реагирует на наведение и клики
- Падает вниз при нажатии кнопки "Финал"
- Скрывается на мобильных устройствах

### Интерактивность

- Плавные анимации при скролле
- Hover эффекты на карточках
- Валидация формы в реальном времени
- Адаптивное меню на мобильных

### Производительность

- Оптимизированные изображения
- Минимальный JavaScript
- CSS анимации вместо JS где возможно
- Lazy loading для изображений

## 🐛 Устранение неполадок

### Проблема: Миньон не появляется

**Решение**: Проверьте путь к изображению `images/minion.png`

### Проблема: Форма не отправляется

**Решение**: Настройте сервис отправки (EmailJS, Formspree)

### Проблема: Анимации не работают

**Решение**: Проверьте подключение `animations.css`

### Проблема: Сайт не адаптивный

**Решение**: Убедитесь, что viewport meta тег присутствует

## 📞 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [Issues](https://github.com/yourusername/portfolio-website/issues)
2. Создайте новый Issue с описанием проблемы
3. Свяжитесь со мной через контактную форму на сайте

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- [Font Awesome](https://fontawesome.com/) за иконки
- [Google Fonts](https://fonts.google.com/) за шрифты
- [Unsplash](https://unsplash.com/) за изображения
- Сообществу разработчиков за вдохновение

---

**Создано с ❤️ для системных администраторов**

*Удачи в создании вашего портфолио! 🚀*
