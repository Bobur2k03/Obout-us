// JavaScript для страницы контактов

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactAnimations();
    initFAQ();
    initContactValidation();
});

// Инициализация формы контактов
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const subject = document.getElementById('subject');
    const contactMethod = document.querySelectorAll('input[name="contactMethod"]');
    const contactInfo = document.getElementById('contactInfo');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Проверка валидности формы
    function checkFormValidity() {
        const isSubjectValid = subject && subject.value.trim() !== '';
        const isContactMethodValid = Array.from(contactMethod).some(radio => radio.checked);
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
    
    // Валидация формы
    function validateForm() {
        let isValid = true;
        clearErrorMessages();
        
        // Валидация темы
        if (!subject || subject.value.trim() === '') {
            showError('subjectError', 'Выберите тему письма');
            isValid = false;
        }
        
        // Валидация способа связи
        const selectedMethod = Array.from(contactMethod).find(radio => radio.checked);
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
    
    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Валидация Telegram
    function isValidTelegram(telegram) {
        const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;
        return telegramRegex.test(telegram);
    }
    
    // Валидация Instagram
    function isValidInstagram(instagram) {
        const instagramRegex = /^@[a-zA-Z0-9._]{1,30}$/;
        return instagramRegex.test(instagram);
    }
    
    // Показать ошибку
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Очистить ошибки
    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
    }
    
    // Показать статус формы
    function showFormStatus(message, type) {
        const statusElement = document.getElementById('formStatus');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';
            
            // Автоматически скрыть через 5 секунд
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }
    
    // Анимация тряски формы
    function shakeForm() {
        form.classList.add('form-shake');
        setTimeout(() => {
            form.classList.remove('form-shake');
        }, 500);
    }
    
    // Отправка формы
    function submitForm() {
        showFormStatus('Отправка сообщения...', 'info');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Собираем данные формы
        const formData = {
            subject: subject.value,
            contactMethod: Array.from(contactMethod).find(radio => radio.checked)?.value,
            contactInfo: contactInfo.value,
            message: message.value,
            timestamp: new Date().toISOString()
        };
        
        // Здесь должна быть реальная отправка формы
        // Например, через EmailJS, Formspree или другой сервис
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
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            });
    }
    
    // Симуляция отправки формы (заглушка)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // Имитируем задержку сети
            setTimeout(() => {
                // В реальном приложении здесь будет отправка на сервер
                console.log('Данные формы:', data);
                
                // 90% успешных отправок для демонстрации
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Ошибка сети'));
                }
            }, 2000);
        });
    }
}

// Анимации для контактов
function initContactAnimations() {
    // Анимация появления карточек контактов
    const contactCards = document.querySelectorAll('.contact-card');
    
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
    });
    
    // Анимация при наведении на карточки
    contactCards.forEach(card => {
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

// FAQ аккордеон
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Закрыть все другие элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключить текущий элемент
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Дополнительная валидация контактов
function initContactValidation() {
    const contactInfo = document.getElementById('contactInfo');
    const contactMethod = document.querySelectorAll('input[name="contactMethod"]');
    
    if (contactInfo) {
        // Обновление placeholder в зависимости от выбранного способа связи
        contactMethod.forEach(radio => {
            radio.addEventListener('change', function() {
                const method = this.value;
                const placeholders = {
                    email: 'Введите ваш email адрес',
                    telegram: 'Введите ваш Telegram (например: @username)',
                    instagram: 'Введите ваш Instagram (например: @username)'
                };
                
                if (contactInfo) {
                    contactInfo.placeholder = placeholders[method] || 'Введите ваши контактные данные';
                }
            });
        });
        
        // Валидация в реальном времени
        contactInfo.addEventListener('input', function() {
            const selectedMethod = Array.from(contactMethod).find(radio => radio.checked);
            if (selectedMethod) {
                const method = selectedMethod.value;
                const value = this.value.trim();
                
                // Убираем предыдущие стили
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
            }
        });
    }
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице контактов:', e.error);
});

// Экспорт функций
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initContactForm,
        initContactAnimations,
        initFAQ,
        initContactValidation
    };
}
