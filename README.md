
Проект «Obout-us» / Project «Obout-us»

Назначение проекта:
(Русский) Obout-us – адаптивный многостраничный личный сайт-портфолио системного администратора. Он демонстрирует навыки автора, описывает его опыт и учебные проекты, а также предоставляет контактную информацию и форму обратной связи. Сайт содержит разделы «Обо мне», «Проекты», «Контакты», а также FAQ и форму заявки для посетителей.
(English) Obout-us is a responsive multi-page personal portfolio site for a system administrator. It showcases the author’s skills, background and educational projects, and provides contact info and a feedback form. The site includes sections “About Me”, “Projects”, “Contacts”, plus an FAQ and a contact form for visitors.

Структура проекта / Project Structure
(Русский) Проект организован в виде статических HTML-страниц и сопутствующих папок:
- Корень: файлы HTML (index.html, about.html, portfolio.html, contact.html) и вспомогательные (header.html, footer.html).
- css/: стили. Здесь находятся base.css, style.css, index.css, about.css, portfolio.css, contact.css, header.css, footer.css, animations.css. Каждый файл отвечает за набор CSS для разных страниц или общие стили.
- js/: сценарии. Файлы header.js и footer.js динамически вставляют шапку и подвал на каждую страницу. about.js, contact.js, index.js, portfolio.js, details-slider.js реализуют интерактивность и логику каждой страницы.
- images/: графика. Содержит фотографии и иллюстрации (например, портрет автора, изображения проектов) в подкаталогах (например, images/portfolio с картинками проектов).
- fonts/ (необязательно): внешние шрифты подключаются через Google Fonts.
В целом файлы сгруппированы по назначению: HTML-контент в корне, стили в css/, скрипты в js/, изображения в images/.

(English) The project is organized as static HTML pages with accompanying folders:
- Root: HTML files (index.html, about.html, portfolio.html, contact.html) and helper files (header.html, footer.html).
- css/: styles. Contains base.css, style.css, index.css, about.css, portfolio.css, contact.css, header.css, footer.css, animations.css. Each file handles CSS for different pages or general styles.
- js/: scripts. header.js and footer.js dynamically insert the header and footer into each page. about.js, contact.js, index.js, portfolio.js, details-slider.js implement interactivity and logic for each page.
- images/: graphics. Contains photos and illustrations (e.g. author’s portrait, project images) in subfolders (like images/portfolio for project images).
- fonts/ (optional): external fonts loaded via Google Fonts.
Overall, files are grouped by purpose: HTML content at the root, styles in css/, scripts in js/, images in images/.

HTML-страницы / HTML Pages

about.html (Обо мне)
(Русский) Эта страница представляет автора:
- Hero (герой-раздел): крупный приветственный заголовок («Привет, я Bobur»), краткий слоган о специализации (Linux, автоматизация, мониторинг) и кнопка «Посмотреть портфолио». Рядом – иллюстрация или фото автора (images/punpun.jpg). Блок сверстан как грид из текста и картинки.
- Обо мне – «Моя история»: после горизонтальной разделительной линии идёт секция с заголовком «Моя история». Слева – иллюстрация жизни администратора, справа – текстовая колонка. Текст рассказывает, как автор пришёл в IT (учёба в TUIT, интерес к сетям, пентестинг, настройка инфраструктуры). Внутри текста есть выделения (<strong>Bob</strong>) и техническая деталь (отмечено как примечание .story-note).
- Подход к работе: секция с заголовком «Подход к работе» и тремя карточками (минимально рабочее решение → автоматизация, документирование, мониторинг). Каждая карточка – иконка (Font Awesome), заголовок (h4) и описание (параграф в замутнённом цвете). Карточки уложены в flex/grid.
- Учебные проекты: секция «Учебные проекты». Содержит сетку карточек проектов (.projects-grid). У каждого проекта есть заголовок, описание, теги и ссылка на GitHub. Проекты описывают выполненные учебные задачи (например, VPN-сеть, мониторинг), с кнопкой «GitHub». Карточки помечены классом .project-card. Скрипт (about.js) добавляет карточкам псевдо-кнопки «Ещё» при необходимости.
Страница завершается подключением скриптов: header.js, footer.js, about.js (см. разделы ниже).

(English) This page introduces the author:
- Hero section: A large welcome heading (“Hello, I’m Bobur”), a short tagline about the author’s specialty (Linux, automation, monitoring) and a “View Portfolio” button. Next to the text is an illustration or photo of the author (images/punpun.jpg). This block is laid out as a grid with text and image.
- About – “My Story”: After a decorative divider, a section with title “My Story”. On the left an illustration (sysadmin’s life), on the right a text column. The text describes how the author entered IT (studied at TUIT, interest in networks, pentesting, infrastructure setup). The text includes highlights (e.g. <strong>Bob</strong>) and a technical note styled as .story-note.
- Work Approach: A section titled “Work Approach” with three cards (minimal viable → automation, documentation, monitoring). Each card has an icon (Font Awesome), a heading (h4) and a muted description. The cards use flex/grid layout.
- Educational Projects: A section “Educational Projects” with a grid of project cards (.projects-grid). Each project includes a title, description, tech-tags and a GitHub link button. These represent sample projects (e.g. site-to-site VPN, monitoring setup). Buttons labelled “GitHub” open the repository. Cards have class .project-card. JavaScript (about.js) enables toggling long descriptions.
The page ends by loading scripts: header.js, footer.js, about.js.

contact.html (Контакты)
(Русский) Страница для связи:
- Заголовок страницы: секция с заголовком «Контакты» и подзаголовком «Свяжитесь со мной…». Стили Центрированы.
- Контактная информация: раздел с четырьмя карточками контактов (Email, Telegram, LinkedIn, GitHub). Используется CSS Grid (.contact-grid) для адаптивного расположения (на широких экранах 4 колонки). Каждая карточка (.contact-card) содержит иконку (Font Awesome), заголовок (например, “Email”), и соответствующую информацию (email-адрес, ник или ссылка). Кнопка «Написать» ведёт по соответствующему протоколу/ссылке. Карточки при наведении слегка «прыгают» (CSS hover, JS-анимация).
- Форма обратной связи: секция с формой (<form id="contactForm">). Включает выпадающий список «Тема письма», радио-кнопки для выбора канала связи (Telegram, Instagram, Email), поля для ввода контакта и сообщения. Кнопки «Очистить» и «Отправить» (последняя по умолчанию отключена). Под формой – элемент для статуса отправки/ошибок. Скрипт contact.js обрабатывает валидацию: он показывает сообщения об ошибках, включает/выключает кнопку, анимирует смещение при ошибке (shake).
- FAQ: после формы идёт раздел “Часто задаваемые вопросы”. Несколько элементов-аккордеонов. Каждый пункт (.faq-item) – кнопка с вопросом (снизу Font Awesome стрелка), и скрытый блок с ответом (.faq-answer). JS (contact.js) по клику разворачивает пункт, меняет aria-expanded и поворачивает стрелку. Открытие одного пункта закрывает остальные. CSS анимацией (@keyframes faqExpand) плавно разворачивает высоту ответа.
Страница завершается подключением скриптов header.js, footer.js, contact.js.

(English) Contact page:
- Page header: A section with title “Contacts” and subtitle “Get in touch to discuss your project”. Centered styling.
- Contact Info: A section with four contact cards (Email, Telegram, LinkedIn, GitHub). Uses a CSS Grid (.contact-grid) to adapt (4 columns on wide screens). Each card (.contact-card) has an icon (Font Awesome), a heading (e.g. “Email”), and the corresponding info (email address, username or link). A “Write” link/button leads to the appropriate protocol or link. The cards slightly “jump” on hover (CSS hover and JS animation).
- Feedback Form: A section with a contact form (<form id="contactForm">). It includes a dropdown “Subject”, radio buttons for contact method (Telegram, Instagram, Email), input for contact info, and a message textarea. There are “Clear” and “Submit” buttons (submit is disabled initially). Below is a status element for messages. Script contact.js handles validation: it shows error messages, toggles the submit button, and shakes the form on invalid submission.
- FAQ: After the form is an FAQ section. Several accordion items. Each item (.faq-item) has a button with a question (and a Font Awesome chevron) and a hidden answer block (.faq-answer). JS (contact.js) toggles the answer on click, updates aria-expanded, and rotates the chevron. Opening one closes others. CSS animation (@keyframes faqExpand) smoothly expands the answer.
The page ends by including header.js, footer.js, contact.js.

portfolio.html (Проекты)
(Русский) Страница портфолио содержит:
- Заголовок страницы: секция с названием «Мои работы» и подзаголовком «Проекты, которыми я горжусь».
- Фильтры проектов: ряд кнопок (.filter-buttons) для фильтрации по категориям («Все», «Инфраструктура», «Безопасность», «Автоматизация»). Реализованно с учётом ARIA (role=tablist/tabpanel) и взаимодействием: при клике показываются карточки лишь выбранной категории. Скрипт portfolio.js управляет этим фильтром (добавляет/удаляет aria-hidden).
- Сетка проектов: основная секция .portfolio. Содержит несколько статичных карточек проектов (.portfolio-item). У каждого проекта: заголовок, изображение (<img>), краткое описание, теги технологий и кнопки (иконка «глаз» для деталей, и ссылка на GitHub). Если нажать на кнопку «Посмотреть», открывается детальный слайдер (см. ниже). Кнопка GitHub сразу ведёт на репозиторий.
- Детальный слайдер («Details Slider»): секция с каруселью (.details-slider, id detailsSlider) – прокручиваемый слайдер с четырьмя карточками (Clean Code, Адаптивность, Производительность, Безопасность). Каждый слайд – иконка и текст. Карусель включает «prev/next» кнопки и индикаторы (точки). Скрипт details-slider.js делает его бесшовным (клонирует крайние слайды, автопрокрутка, drag/swipe, доступность).
- Подключение скриптов: header.js, footer.js, portfolio.js, details-slider.js.

(English) Portfolio (Projects) page includes:
- Page header: A section titled “My Work” with subtitle “Projects I’m proud of”.
- Project filters: A row of buttons (.filter-buttons) to filter by category (“All”, “Infrastructure”, “Security”, “Automation”). Implemented with ARIA roles (tablist/tab) and filtering logic: clicking shows only the projects of the chosen category. The script portfolio.js handles this (setting aria-hidden on items).
- Project grid: The main .portfolio section with static project cards (.portfolio-item). Each project has a title, an image (<img>), a short description, tech-tag spans, and buttons (an “eye” icon button to view details, and a GitHub link). The “View” button opens a detailed slider (see below). The GitHub button opens the repo.
- Details Slider: A carousel section (.details-slider, id detailsSlider) with four slides (Clean Code, Responsive Design, Performance, Security). Each slide has an icon and text. The slider has prev/next buttons and dots. Script details-slider.js makes it infinite (cloning edge slides), with autoplay, dragging, ARIA accessibility, etc.
- Scripts: The page includes header.js, footer.js, portfolio.js, details-slider.js.

index.html (Главная)
(Русский) Главная страница коротко приветствует посетителя:
- Hero: крупное приветствие («Привет! Я») и описание специализации (Linux, сети, безопасность). Кнопки перехода к портфолио и форме связи. Рядом – карточка с фотографией и ролью «Системный администратор».
- Навыки: секция «Мои навыки» с карточками (Linux, Серверы, Сети, Безопасность, Контейнеризация, Мониторинг). Каждая карточка с иконкой, заголовком и перечнем технологий. CSS Grid или Flex обеспечивает адаптивное расположение.

(English) The home page provides a brief welcome:
- Hero: A large greeting (“Hello! I am”) and description of specialization (Linux, networking, security). Buttons link to the portfolio and contact sections. Beside the text is a profile card with photo and role “System Administrator”.
- Skills: A “My Skills” section with skill cards (Linux, Servers, Networking, Security, Containerization, Monitoring). Each has an icon, a title, and a list of related technologies. CSS Grid/Flex layout ensures responsiveness.

CSS-структура / CSS Structure
(Русский) Стили организованы по файлам:
- base.css: общий сброс и базовые переменные :root (цвета фона, текстов, размеры контейнеров, радиусы, тени). Здесь определены глобальные селекторы (универсальный сброс, шрифты, контейнеры), и основные классы (например, .container, .sr-only, и т.д.).
- animations.css: отдельный файл для CSS-анимаций. Содержит @keyframes (например, для аккордеона FAQ, подъёма футера) и классы для переходов (.animate-on-scroll, задержки .delay-100 и т.д.). Также здесь правила для мобильных (на маленьких экранах упрощение анимаций) и для печати.
- header.css / footer.css: стили для шапки и подвала. Оформляют навигацию (.navbar, меню, бургер-иконку) и футер (фон, выравнивание, соцссылки, копирайт).
- style.css: общий файл для главной страницы. Здесь могут быть стили, не принадлежащие конкретной странице, например утилиты или глобальные кнопки. (В данном проекте он подключён на index.html.)
- index.css: специфичные стили для страницы «Главная». Описывает отступы hero, расположение и стили элементов в hero, сетку навыков (.skills-grid), и анимацию появления карточек навыков (задаёт начальное состояние для скрипта index.js).
- about.css: стили страницы «Обо мне». Включает цветовые переменные, стили для hero (отступы, размер заголовка), для секции «Обо мне» (.about-content, .about-text), для карточек подхода (.approach-card), проектов (.project-card), разделителей (.section-divider), и т.д. Есть адаптивные правила для уменьшения ширины изображений на маленьких экранах.
- portfolio.css: стили страницы «Портфолио». Определяет сетку .portfolio-grid, карточки проектов (.portfolio-item), фильтры (.filter-buttons), а также стили для слайдера (например, .details-slider, .slide, кнопки). Использует CSS-переменные и градиенты, делает элементы центрированными.
- contact.css: стили страницы «Контакты». Определяет фоновые переменные, цвета для карточек и формы. Оформляет сетку контактов (.contact-grid), карточки .contact-card (фон, тень, переходы), форму обратной связи (.form-container, .contact-form, .form-group), анимацию «shake» для ошибок. Включает медиа-запросы для адаптивности (например, меньшие размеры карточек и формы на узких экранах).
Адаптивность: Во всех страницах используются макеты с гибкими сетками (CSS Grid или Flexbox) и медиа-запросы. Например, в contact-grid указано grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)), что позволяет карточкам плавно переноситься на новую строку. В footer и header учтены паддинги, чтобы контент не скрывался под фиксированной шапкой (main { padding-top: var(--nav-height); }). Также есть специально адаптивные правила (@media (max-width: 768px)) для отключения сложных анимаций или изменения размеров элементов при малых экранах.
Переменные: Почти во всех CSS-файлах используются :root CSS-переменные (например, --bg-dark, --accent, --text, --radius). Это задаёт единый цветовой стиль (фон, акцент, текст), отступы и прочие константы. Переменные упрощают смену темы и поддерживают согласованность оформления.

(English) CSS is organized into files:
- base.css: Global reset and base variables in :root (colors for background, text, container sizes, radii, shadows). It contains global selectors (reset, fonts, container class, etc) and base classes (like .container, .sr-only, etc).
- animations.css: Contains CSS animations. It defines @keyframes (e.g. for FAQ accordion, footer slide-up) and utility classes (.animate-on-scroll, delay classes .delay-100, etc). Also rules for mobile (simplify or disable animations on small screens) and print media.
- header.css / footer.css: Styles for the header and footer. They style the navigation bar (.navbar, menu items, hamburger icon) and the footer (background, layout, social links, copyright).
- style.css: A general stylesheet used on the home page. It holds styles not specific to one component, like utility classes or default button styles.
- index.css: Styles for the “Home” page. It sets hero padding, title sizes, layout of hero elements, and the grid of skills. It also initializes skill cards (opacity/transform) for the intro animation managed by index.js.
- about.css: Styles for “About” page. It defines color variables, hero section (padding, heading size), the about section (.about-content, .about-text), work approach cards (.approach-card), project cards (.project-card), divider line (.section-divider), etc. Includes responsive tweaks to shrink images on small screens.
- portfolio.css: Styles for “Portfolio” page. Sets up the .portfolio-grid, project cards (.portfolio-item), filter buttons (.filter-buttons), and the slider layout (.details-slider, .slide, buttons). Uses CSS variables and gradients, centers content.
- contact.css: Styles for “Contact” page. Defines background and panel colors, card backgrounds. Styles the contact grid (.contact-grid), contact cards (.contact-card`) with shadow and hover effects, the form container (.form-container, .contact-form, .form-group), and the shake animation for form errors. Includes media queries to adapt sizes on narrower screens. Also includes FAQ styles (question/answer formatting, transition for open/close).
Responsive Design: All pages use flexible layouts (CSS Grid or Flexbox) and media queries. For example, `.contact-grid` uses `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` so cards wrap automatically. The header/footer have fixed heights, and `main { padding-top: var(--nav-height); }` ensures content isn’t hidden under the nav. There are media rules (`@media (max-width: 768px)`) to disable complex animations or adjust layout on small screens.
Variables: Most CSS files use `:root` CSS variables (e.g. `--bg-dark`, `--accent`, `--text`, `--radius`). These provide a consistent color scheme (background, accent, text), spacing and dimensions. Using variables makes it easy to tweak the theme and maintain consistency.

Анимации и интерактивность / Animations and Interactivity
(Русский) Сайт активно использует CSS-переходы и JS для динамики:
- Прокрутка и появление элементов: элементы с классом .reveal или .animate-on-scroll плавно появляются при скролле (IntersectionObserver в about.js/index.js добавляет класс is-visible или animated). Например, заголовки секций, карточки проектов и подхода анимируются при входе в экран. CSS задаёт исходное состояние (opacity:0, transform: translateY) и плавный переход.
- Прогресс-бары навыков: на главной странице у каждого навыка .skill-progress есть атрибут data-width с процентом. JS наблюдателем (IntersectionObserver) растягивает полосу до нужной ширины при появлении. CSS transition делает это плавно.
- Форма и контактные карточки: контактные карточки .contact-card при загрузке постепенно «всплывают» снизу (JS-обсервер задаёт opacity и transform с задержками) и реагируют на hover (увеличение, тень). Форма при невалидной отправке трясётся («shake» анимация в CSS).
- FAQ-аккордеон: при клике на вопрос .faq-question JS (в contact.js) переключает класс .active у элемента. CSS анимацией (faqExpand) плавно разворачивает блок ответа; иконка-стрелка поворачивается через transform. Так же реализована клавиатурная навигация (Enter/Space).
- Слайдер карусели: на странице «Портфолио» кнопки «предыдущий/следующий» и точки управляют видимым слайдом. details-slider.js клонирует элементы для бесшовного цикла, автоматически листает слайд по таймеру и поддерживает drag/swipe. Переходы между слайдами плавные (CSS transition).
- Навигация: бургер-меню на мобильных (header.js) переключает видимость .nav-menu. Также при скролле по странице JS меняет фон навбара (делает его более непрозрачным). Кнопки «smooth scroll» (если есть якоря) могут обеспечиваться JS (например, плавный переход к секциям).

(English) The site uses CSS transitions and JavaScript for dynamic effects:
- Scroll-triggered reveal: Elements with .reveal or .animate-on-scroll fade in on scroll. An IntersectionObserver in about.js/index.js adds classes is-visible or animated when elements enter the viewport. For example, section titles, project cards and approach cards animate into view. CSS provides initial state (opacity 0, translateY) and transitions.
- Skill progress bars: On the home page each skill bar .skill-progress has a data-width percentage. JS uses IntersectionObserver to expand the bar to that width when it appears. A CSS transition smooths the change.
- Form and contact card animations: Contact cards .contact-card float up with fade-in on page load (JS observer sets opacity/transform with delays), and respond to hover (slight lift and shadow). The form shakes on invalid submission (CSS @keyframes shake).
- FAQ accordion: When a question .faq-question is clicked, JS toggles the .active class. CSS animation (faqExpand) smoothly expands the answer panel; the chevron icon rotates via CSS transform. Keyboard support is added (Enter/Space toggles).
- Carousel slider: On the Portfolio page the prev/next buttons and dots navigate slides. details-slider.js clones slides for infinite looping, auto-plays, and supports drag/swipe. Slide transitions are CSS-based and animate smoothly.
- Navigation interactions: The hamburger menu on mobile (header.js) toggles the .nav-menu visibility. JS also changes the navbar background/shadow on scroll (making it opaque after scrolling). Smooth scroll to anchors (e.g. via portfolio.js) enables nice scrolling between sections.

Внешние ресурсы / External Resources
(Русский) Проект подключает внешние библиотеки:
- Font Awesome: используется для иконок (социальные сети, навыки, стрелки в FAQ, иконки подхода). В <head> есть <link> на Font Awesome CDN.
- Google Fonts: шрифт Inter загружается через Google Fonts (<link href="https://fonts.googleapis.com/css2?family=Inter:...">).

(English) External libraries are used:
- Font Awesome: for icons (social links, skill icons, FAQ chevrons, approach icons). The <head> includes a CDN <link> to Font Awesome.
- Google Fonts: The Inter font is loaded via Google Fonts (<link href="https://fonts.googleapis.com/css2?family=Inter:...">).

JavaScript-файлы / JavaScript Files
(Русский) В js/ содержатся следующие модули:
- header.js: надежно загружает HTML-шаблон шапки (header.html) на страницу. После вставки инициализирует UI шапки: бургер-меню (переключение класса .active, установка aria-expanded), выделение активного пункта меню по URL, закрытие мобильного меню при клике. Если загрузка не удалась, вставляет упрощённый HTML как fallback.
- footer.js: аналогично вставляет шаблон футера (footer.html) и устанавливает год (по запросу всегда 2025). Применяет анимацию подъёма футера (.footer-slide-up).
- about.js: отвечает за страницу «Обо мне». Функции: проверка картинок и замена на заглушку при ошибке (initImageFallback()), анимация появления (initRevealAnimations(): добавляет .reveal класс элементам и отслеживает появление), настройка клавиатуры для кнопок «Посмотреть проект» (initProjectButtons()), и подсветка карточек проектов по опциям (initProjectHighlighting()). Учитывает prefers-reduced-motion (отключает анимации).
- portfolio.js: для страницы «Портфолио». Реализует: сворачивание/раскрытие длинных описаний («Ещё/Скрыть») в проектных карточках (сохранение HTML), фильтрацию проектов по категориям (ARIA-friendly фильтры). Обеспечивает клавиатурную доступность (навешивает обработчики keydown).
- contact.js: для страницы «Контакты». Модуль ContactModule инициализирует: проверку и отправку формы (initForm(): валидация полей, показ ошибок, отправка/симуляция, статус), анимацию карточек контактов (initCardAnimations(): IntersectionObserver для плавного появления и эффекты при hover), и FAQ-аккордеон (initFAQ(): toggling ответов, управление ARIA).
- index.js: для главной страницы. Настраивает адаптацию hero-блока (adjustHeroPadding()), размещение кнопок (ensureButtonsLayout()), анимацию карточек навыков (animateSkillCards() через IntersectionObserver), улучшение видимости фокуса (enableKeyboardFocus()), и изменение размера профиля под небольшой экран (adjustProfileForViewport()). Вызывается на загрузке и при ресайзе.
- details-slider.js: реализует карусель на странице «Портфолио». Автоматически создаёт клоны слайдов для бесшовного цикла, управляет автопрокруткой, кнопками «prev/next», точками навигации, свайпом и изменениями размеров. Скрипт учитывает доступность (ARIA-атрибуты) и корректно сбрасывает клоны при ресайзе.

(English) The js/ folder includes:
- header.js: Loads the header HTML (header.html) into the page reliably. After inserting, it initializes header UI: hamburger toggle (adds .active, sets aria-expanded), highlights the current menu link based on URL, and closes the mobile menu on link click. If loading fails, it injects a simple fallback navbar.
- footer.js: Similarly inserts the footer (footer.html) and sets the year (fixed to 2025). It applies a slide-up animation (.footer-slide-up).
- about.js: For the “About” page. It provides: image fallback (initImageFallback() replaces broken images with a placeholder), reveal animations (initRevealAnimations(): adds .reveal classes and observes elements), keyboard support for “view project” buttons (initProjectButtons()), and highlighting project cards (initProjectHighlighting()). It respects prefers-reduced-motion (disables animations).
- portfolio.js: For the “Portfolio” page. Implements: toggling “read more” in project descriptions (preserving HTML), and filtering projects by category with ARIA support. Also adds keyboard handlers (enter/space activates).
- contact.js: For the “Contacts” page. The ContactModule initializes form behavior (initForm(): validation, error messages, submission simulation), contact card animations (initCardAnimations(): IntersectionObserver fade-in and hover effects), and the FAQ accordion (initFAQ(): toggles answers, manages ARIA).
- index.js: For the home page. Adjusts hero padding (adjustHeroPadding()), button layout (ensureButtonsLayout()), animates skill cards into view (animateSkillCards() via IntersectionObserver), adds focus outline class on Tab (enableKeyboardFocus()), and resizes the profile image on small screens (adjustProfileForViewport()). It runs on load and window resize.
- details-slider.js: Implements the carousel on the Portfolio page. It clones slides for infinite looping, handles autoplay, prev/next buttons, dot navigation, swipe/drag, and responsive resizing. It ensures ARIA accessibility and resets clones correctly on resize.

Общая структура (файлы и папки) / Overall Structure (Files and Folders)
(Русский) Проект собран по стандартной модели статического сайта:
- Корневая папка: HTML-файлы (index.html, about.html, portfolio.html, contact.html), а также header.html и footer.html как шаблоны. Иконка сайта (favicon) и, возможно, файл robots.txt.
- css/: стили (описаны выше).
- js/: скрипты (описаны выше).
- images/: изображения и иллюстрации. Подпапки могут содержать, например, images/portfolio/ с картинками проектов, images с фото автора (punpun.jpg, admins-life.jpeg и т.д.).
- fonts/ (если есть): локальные шрифты или дополнительные. Здесь также подключены Google Fonts.
- icons/ (опционально): если хранятся кастомные SVG иконки. В данном проекте используется Font Awesome через CDN, поэтому обычно этой папки нет.
- vendor/ (опционально): сторонние библиотеки. В проекте библиотеки подключены через CDN, так что нет.
Внутри css/ каждый файл служит своей цели, внутри js/ – модульная логика страницы. Файлы header.html и footer.html – фрагменты с одинаковым содержимым на всех страницах (навигация и футер). Изображения используются в разделах “Обо мне”, “Портфолио” и в карточках контактов.

(English) The project is structured as a standard static site:
- Root folder: HTML files (index.html, about.html, portfolio.html, contact.html) plus header.html and footer.html as templates. The site icon (favicon) and possibly robots.txt might be here.
- css/: all stylesheet files (as described above).
- js/: all scripts (described above).
- images/: images and illustrations. Subfolders may include images/portfolio/ for project images, images/ for author’s photo (punpun.jpg, admins-life.jpeg, etc.).
- fonts/: local fonts or others. Google Fonts are used via link.
- icons/: any custom SVG icons. In this project, Font Awesome is via CDN, so no local icon folder.
- vendor/: third-party libraries. Not needed here since we use CDNs.
Inside css/ each file has a dedicated purpose, inside js/ are page-specific modules. The files header.html and footer.html contain the shared header (navigation) and footer content across pages. Images are used in “About”, “Portfolio” sections and contact cards.

---

Содержимое файла сохранено как plain text. Файл создан для удобного скачивания и дальнейшего добавления в репозиторий.