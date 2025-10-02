document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. ЛОГИКА ВАЛИДАЦИИ КОНТАКТНОЙ ФОРМЫ (contact.html)
    // Активация кнопки "Отправить" только при заполнении всех 3 полей.
    // ==========================================================
    
    const requiredInputs = document.querySelectorAll('.required');
    const submitButton = document.getElementById('submitBtn');

    /**
     * Проверяет, заполнены ли все обязательные поля с классом 'required'.
     */
    function checkInputs() {
        if (!submitButton) return; // Проверка, что мы на странице с формой

        let isValid = true;
        
        requiredInputs.forEach(input => {
            // Проверяем, что поле не пустое после удаления пробелов
            if (input.value.trim() === "") {
                isValid = false;
            }
        });
        
        // Устанавливаем состояние 'disabled'
        submitButton.disabled =!isValid; 
        
        // Визуальное обновление кнопки с помощью классов Tailwind
        if (isValid) {
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
            submitButton.classList.add('hover:bg-primary-blue/80');
        } else {
            submitButton.classList.add('opacity-50', 'cursor-not-allowed');
            submitButton.classList.remove('hover:bg-primary-blue/80');
        }
    }

    // Добавляем слушатель событий 'input' на каждое обязательное поле.
    // Это запускает проверку при любом изменении текста (ввод, вставка и т.д.)
    requiredInputs.forEach(input => {
        input.addEventListener('input', checkInputs);
    });

    // Вызываем проверку при загрузке страницы, чтобы учесть автозаполнение браузером
    if (requiredInputs.length > 0) {
        checkInputs();
        
    }
    function main() {
    
    /**
     * Initializes GSAP animations for the minion character.
     * Only runs on screens wider than 768px.
     */
    function initMinionAnimations() {
        const minionContainer = document.querySelector(".minion-container");
        const fallingTrigger = document.getElementById('falling-trigger');

        if (!minionContainer || window.innerWidth < 768) return;

        gsap.registerPlugin(ScrollTrigger);

        // Entrance Animation
        gsap.from(minionContainer, {
            duration: 1.5,
            x: 150,
            y: -150,
            rotation: 180,
            opacity: 0,
            ease: "power2.out"
        });

        // Falling Animation
        if (fallingTrigger) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: fallingTrigger,
                    start: "top bottom-=100px",
                    scrub: 1.5,
                }
            }).to(minionContainer, {
                y: "100vh",
                x: "-50vw",
                rotation: -1080,
                scale: 0.1,
                opacity: 0,
                ease: "power1.in",
            });
        }
    }

    /**
     * Initializes contact form validation and AJAX submission.
     */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const submitButton = form.querySelector('#submitBtn');
        const requiredInputs = form.querySelectorAll('.required');
        const formActionUrl = "https://formspree.io/f/[YOUR_FORM_ID]"; // Replace with your Formspree ID

        const validateForm = () => {
            const allValid = [...requiredInputs].every(input => input.value.trim() !== "");
            submitButton.disabled = !allValid;
            submitButton.classList.toggle('opacity-50', !allValid);
            submitButton.classList.toggle('cursor-not-allowed', !allValid);
        };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';

            try {
                const response = await fetch(formActionUrl, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    displayStatusMessage('success', 'Спасибо! Ваше сообщение отправлено.');
                } else {
                    displayStatusMessage('error', 'Ошибка. Пожалуйста, попробуйте снова.');
                }
            } catch (error) {
                displayStatusMessage('error', 'Сетевая ошибка. Проверьте подключение.');
            } finally {
                submitButton.textContent = 'Отправить';
                validateForm();
            }
        };

        const displayStatusMessage = (type, message) => {
            document.getElementById('form-status-message')?.remove();
            const messageDiv = document.createElement('div');
            messageDiv.id = 'form-status-message';
            messageDiv.textContent = message;
            messageDiv.className = `p-4 mt-4 rounded-md text-center animate-fade-in ${
                type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`;
            form.prepend(messageDiv);
        };

        requiredInputs.forEach(input => input.addEventListener('input', validateForm));
        form.addEventListener('submit', handleFormSubmit);
        validateForm(); // Initial check
    }

    // Initialize all modules
    initMinionAnimations();
    initContactForm();
}

document.addEventListener('DOMContentLoaded', main);

    // ==========================================================
    // 2. ЛОГИКА АНИМАЦИИ ПЕРСОНАЖА (GSAP ScrollTrigger)
    // ==========================================================

    const minion = document.querySelector(".minion-character");
    const fallingTrigger = document.getElementById('falling-trigger');

    if (minion && window.innerWidth >= 768) { // Активируем анимацию только на десктопе

        gsap.registerPlugin(ScrollTrigger);

        // Анимация Входа (Появление из угла при загрузке)
        gsap.from(".minion-container", {
            duration: 1.5,
            x: 100, // Сдвигаем влево (за пределы экрана)
            y: -100, // Сдвигаем вверх (за пределы экрана)
            rotation: 90,
            ease: "power2.out"
        });

        // Анимация Падения (Триггер в конце страницы)
        if (fallingTrigger) {
            
            // Создаем Timeline, привязанный к прокрутке
            let fallingTL = gsap.timeline({
                scrollTrigger: {
                    trigger: fallingTrigger, // Элемент перед футером
                    start: "top bottom", // Анимация начинается, когда верх триггера касается низа вьюпорта
                    end: "+=1500", // Анимация длится 1500px прокрутки
                    scrub: 1, // Плавное "скраббирование" (привязка к скроллу)
                    // markers: true, // Раскомментируйте для отладки
                }
            });
            
            // Определяем фазы падения
            fallingTL.to(minion, {
                y: "300vh", // Перемещаем далеко вниз
                x: 100, // Небольшой сдвиг по горизонтали для эффекта полета
                rotation: 1080, // 3 полных оборота
                scale: 0.1, // Уменьшение размера, чтобы создать ощущение удаленности
                ease: "power1.in", // Ускоряющееся падение
                duration: 2, 
            });
        }
    }
});