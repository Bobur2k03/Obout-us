// JavaScript для страницы портфолио

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilter();
    initPortfolioAnimations();
    initPortfolioModal();
});

// Фильтр портфолио
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновить активную кнопку
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Анимация фильтрации
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('portfolio-item-appear');
                        item.style.animationDelay = `${index * 0.1}s`;
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('portfolio-item-appear');
                    }
                }, index * 50);
            });
        });
    });
}

// Анимации портфолио
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Анимация появления при скролле
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('portfolio-item-appear');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
    
    // Hover эффекты
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image');
        const overlay = item.querySelector('.portfolio-overlay');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Модальное окно для проектов
function initPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const viewLink = item.querySelector('.portfolio-link[title="Посмотреть"]');
        const githubLink = item.querySelector('.portfolio-link[title="GitHub"]');
        
        if (viewLink) {
            viewLink.addEventListener('click', function(e) {
                e.preventDefault();
                showProjectModal(item);
            });
        }
        
        if (githubLink) {
            githubLink.addEventListener('click', function(e) {
                e.preventDefault();
                const projectTitle = item.querySelector('h3').textContent;
                openGitHub(projectTitle);
            });
        }
    });
}

// Показать модальное окно проекта
function showProjectModal(item) {
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    const techTags = Array.from(item.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const image = item.querySelector('img').src;
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="modal-header" style="
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h2 style="margin: 0; color: #1f2937;">${title}</h2>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
            <div class="modal-body" style="padding: 20px;">
                <div class="modal-image" style="
                    width: 100%;
                    height: 200px;
                    background: #f3f4f6;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    background-image: url('${image}');
                    background-size: cover;
                    background-position: center;
                "></div>
                <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">${description}</p>
                <div class="modal-tech" style="margin-bottom: 20px;">
                    <h4 style="margin-bottom: 10px; color: #1f2937;">Технологии:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${techTags.map(tag => `
                            <span style="
                                background: #f3f4f6;
                                color: #2563eb;
                                padding: 4px 12px;
                                border-radius: 15px;
                                font-size: 14px;
                                font-weight: 500;
                            ">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-actions" style="
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                ">
                    <button class="btn btn-primary" style="
                        background: #2563eb;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Посмотреть проект</button>
                    <button class="btn btn-secondary" style="
                        background: #f3f4f6;
                        color: #374151;
                        border: 1px solid #d1d5db;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                    ">GitHub</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Закрытие модального окна
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Открыть GitHub
function openGitHub(projectTitle) {
    // Здесь можно добавить логику для открытия конкретного репозитория
    // Пока что открываем общий профиль GitHub
    const githubUrl = 'https://github.com/username'; // Замените на ваш GitHub
    window.open(githubUrl, '_blank');
}

// Анимация счетчиков статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Запускаем анимацию при появлении в viewport
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Инициализация анимации счетчиков
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
});

// Плавная прокрутка к секциям
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Изображение не загружено:', this.src);
        });
    });
});

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPortfolioFilter,
        initPortfolioAnimations,
        initPortfolioModal,
        showProjectModal,
        openGitHub,
        animateCounters
    };
}
