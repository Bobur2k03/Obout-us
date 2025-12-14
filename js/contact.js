// js/contact.js — исправленная версия

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactAnimations();
    initContactFAQ();
    initContactValidation();
});

// -------------------------------
// Инициализация формы контактов
// -------------------------------
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const subject = document.getElementById('subject');
    const contactMethod = Array.from(document.querySelectorAll('input[name="contactMethod"]'));
    const contactInfo = document.getElementById('contactInfo');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Проверка валидности формы
    function checkFormValidity() {
        const isSubjectValid = subject && subject.value.trim() !== '';
        const isContactMethodValid = contactMethod.length && contactMethod.some(radio => radio.checked);
        const isContactInfoValid = contactInfo && contactInfo.value.trim() !== '';
        const isMessageValid = message && message.value.trim() !== '';

        const isValid = isSubjectValid && isContactMethodValid && isContactInfoValid && isMessageValid;

        if (submitBtn) {
            submitBtn.disabled = !isValid;
            submitBtn.classList.toggle('btn-primary', isValid);
            submitBtn.classList.toggle('btn-secondary', !isValid);
        }

        return isValid;
    }

    // Слушатели событий
    if (subject) {
        subject.addEventListener('input', checkFormValidity);
        subject.addEventListener('change', checkFormValidity);
    }

    if (contactInfo) {
        contactInfo.addEventListener('input', checkFormValidity);
    }

    if (message) {
        message.addEventListener('input', checkFormValidity);
    }

    contactMethod.forEach(radio => {
        radio.addEventListener('change', checkFormValidity);
    });

    // Очистка формы
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            form.reset();
            checkFormValidity();
            clearErrorMessages();
            showFormStatus('Форма очищена', 'info');
        });
    }

    // Отправка формы
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();

            if (validateForm()) {
                submitForm();
            } else {
                showFormStatus('Пожалуйста, заполните все поля корректно', 'error');
                shakeForm();
            }
        });
    }

    // -------------------------------
    // Валидация формы
    // -------------------------------
    function validateForm() {
        let isValid = true;
        clearErrorMessages();

        // Валидация темы
        if (!subject || subject.value.trim() === '') {
            showError('subjectError', 'Выберите тему письма');
            isValid = false;
        }

        // Валидация способа связи
        const selectedMethod = contactMethod.find(radio => radio.checked);
        if (!selectedMethod) {
            showError('contactMethodError', 'Выберите способ связи');
            isValid = false;
        }

        // Валидация контактных данных
        if (!contactInfo || contactInfo.value.trim() === '') {
            showError('contactInfoError', 'Введите контактные данные');
            isValid = false;
        } else {
            // Дополнительная валидация в зависимости от выбранного способа
            const contactValue = contactInfo.value.trim();
            if (selectedMethod) {
                const method = selectedMethod.value;
                if (method === 'email' && !isValidEmail(contactValue)) {
                    showError('contactInfoError', 'Введите корректный email адрес');
                    isValid = false;
                } else if (method === 'telegram' && !isValidTelegram(contactValue)) {
                    showError('contactInfoError', 'Введите корректный Telegram (например: @username)');
                    isValid = false;
                } else if (method === 'instagram' && !isValidInstagram(contactValue)) {
                    showError('contactInfoError', 'Введите корректный Instagram (например: @username)');
                    isValid = false;
                }
            }
        }

        // Валидация сообщения
        if (!message || message.value.trim() === '') {
            showError('messageError', 'Введите сообщение');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        return isValid;
    }

    // -------------------------------
    // Вспомогательные валидаторы
    // -------------------------------
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidTelegram(telegram) {
        const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;
        return telegramRegex.test(telegram);
    }

    function isValidInstagram(instagram) {
        const instagramRegex = /^@[a-zA-Z0-9._]{1,30}$/;
        return instagramRegex.test(instagram);
    }

    // -------------------------------
    // UI: ошибки / статус / анимация
    // -------------------------------
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
    }

    function showFormStatus(message, type) {
        const statusElement = document.getElementById('formStatus');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';

            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    function shakeForm() {
        form.classList.add('form-shake');
        setTimeout(() => {
            form.classList.remove('form-shake');
        }, 500);
    }

    // -------------------------------
    // Отправка формы (заглушка)
    // -------------------------------
    function submitForm() {
        showFormStatus('Отправка сообщения...', 'info');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
        }

        const formData = {
            subject: subject ? subject.value : '',
            contactMethod: contactMethod.find(radio => radio.checked)?.value || '',
            contactInfo: contactInfo ? contactInfo.value : '',
            message: message ? message.value : '',
            timestamp: new Date().toISOString()
        };

        simulateFormSubmission(formData)
            .then(() => {
                showFormStatus('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
                form.reset();
                checkFormValidity();
            })
            .catch((error) => {
                showFormStatus('Ошибка при отправке сообщения. Попробуйте еще раз или свяжитесь со мной напрямую.', 'error');
                console.error('Ошибка отправки формы:', error);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить';
                }
            });
    }

    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Данные формы:', data);
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Ошибка сети'));
                }
            }, 2000);
        });
    }
}

// ---------------------------------
// Анимации для контактов
// ---------------------------------
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    if (!contactCards.length) return;

    if (!('IntersectionObserver' in window)) {
        // Простейший fallback — показываем карточки без анимации
        contactCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('contact-card-float');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ---------------------------------
// FAQ аккордеон (contact page)
// ---------------------------------
function initContactFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        // Делаем вопрос фокусируемым для доступности, если нужно
        if (!question.getAttribute('tabindex')) question.setAttribute('tabindex', '0');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active', !isActive);
        });

        // Клавиши Enter / Space для открытия вопроса
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ---------------------------------
// Дополнительная валидация контактов
// ---------------------------------
function initContactValidation() {
    const contactInfo = document.getElementById('contactInfo');
    const contactMethod = Array.from(document.querySelectorAll('input[name="contactMethod"]'));

    if (!contactInfo) return;
    if (contactMethod.length) {
        contactMethod.forEach(radio => {
            radio.addEventListener('change', function() {
                const method = this.value;
                const placeholders = {
                    email: 'Введите ваш email адрес',
                    telegram: 'Введите ваш Telegram (например: @username)',
                    instagram: 'Введите ваш Instagram (например: @username)'
                };

                contactInfo.placeholder = placeholders[method] || 'Введите ваши контактные данные';
            });
        });
    }

    contactInfo.addEventListener('input', function() {
        const selectedMethod = contactMethod.find(radio => radio.checked);
        if (!selectedMethod) return;

        const method = selectedMethod.value;
        const value = this.value.trim();

        this.style.borderColor = '';
        this.style.backgroundColor = '';

        if (value) {
            let isValid = false;
            switch (method) {
                case 'email':
                    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    break;
                case 'telegram':
                    isValid = /^@[a-zA-Z0-9_]{5,32}$/.test(value);
                    break;
                case 'instagram':
                    isValid = /^@[a-zA-Z0-9._]{1,30}$/.test(value);
                    break;
            }

            if (isValid) {
                this.style.borderColor = '#10b981';
                this.style.backgroundColor = '#f0fdf4';
            } else {
                this.style.borderColor = '#ef4444';
                this.style.backgroundColor = '#fef2f2';
            }
        }
    });
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице контактов:', e && e.error ? e.error : e);
});