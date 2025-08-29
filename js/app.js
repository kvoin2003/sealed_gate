// ===== MAIN SCRIPT FOR SEALED GATE STYLE =====

document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initNavbarScroll();
    initSmoothScrolling();
    initScreenshotModal();
    initVideoModal();
    initAnimationsOnScroll();
    initParallaxEffect();
    initImagePlaceholders();
    initEnhancedMobileMenu();
});

// ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll(
        '.screenshot-item, .feature-item, .req-column, .accordion-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// ===== ИЗМЕНЕНИЕ НАВБАРА ПРИ СКРОЛЛЕ =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Apply scrolled class when any scrolling happens
        if (currentScrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем активный пункт
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Закрываем мобильное меню
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }
                }
            }
        });
    });
}

// ===== МОДАЛЬНОЕ ОКНО СКРИНШОТОВ =====
function initScreenshotModal() {
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    const modalImg = document.querySelector('#modalScreenshot');
    
    screenshotItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.screenshot-img');
            const title = this.querySelector('h3');
            
            if (img && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = title ? title.textContent : 'Screenshot';
                
                const modalTitle = document.querySelector('#screenshotModal .modal-title');
                if (modalTitle && title) {
                    modalTitle.textContent = title.textContent;
                }
            }
        });
    });
}

// ===== МОДАЛЬНОЕ ОКНО ВИДЕО =====
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const iframe = videoModal.querySelector('iframe');
    
    videoModal.addEventListener('hidden.bs.modal', function() {
        // Останавливаем видео при закрытии модального окна
        const currentSrc = iframe.src;
        iframe.src = '';
        iframe.src = currentSrc;
    });
}

// ===== АНИМАЦИИ ПРИ ПОЯВЛЕНИИ =====
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, index * 100);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.loading');
    elements.forEach(el => observer.observe(el));
}

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Параллакс для орбов
        floatingOrbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = scrolled * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== PLACEHOLDER ИЗОБРАЖЕНИЯ =====
function initImagePlaceholders() {
    const placeholders = [
        { selector: '.logo', content: 'SG', style: 'logo' },
        { selector: '.character-image', content: '🎮', style: 'character' },
        { selector: '.screenshot-img', content: '🖼️', style: 'screenshot' },
        { selector: '.video-thumbnail', content: '▶️', style: 'video' }
    ];
    
    placeholders.forEach(({ selector, content, style }) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            if (element.tagName === 'IMG') {
                createImagePlaceholder(element, content, style, index);
            } else if (style === 'logo') {
                element.textContent = content;
            }
        });
    });
}

function createImagePlaceholder(imgElement, content, style, index) {
    const placeholder = document.createElement('div');
    placeholder.className = `placeholder placeholder-${style}`;
    
    const baseStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        fontSize: '2rem',
        fontWeight: 'bold'
    };
    
    const styleVariants = {
        logo: {
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'var(--gradient-primary)',
            color: 'white',
            fontSize: '1rem'
        },
        character: {
            width: '100%',
            height: '400px',
            fontSize: '6rem',
            background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))'
        },
        screenshot: {
            width: '100%',
            height: '250px',
            fontSize: '3rem',
            background: `linear-gradient(135deg, 
                hsl(${220 + index * 30}, 20%, 15%), 
                hsl(${220 + index * 30}, 20%, 25%))`
        },
        video: {
            width: '100%',
            height: '300px',
            fontSize: '4rem',
            background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))'
        }
    };
    
    const styles = { ...baseStyles, ...styleVariants[style] };
    
    Object.assign(placeholder.style, styles);
    placeholder.textContent = content;
    
    // Заменяем изображение на placeholder
    imgElement.style.display = 'none';
    imgElement.parentNode.insertBefore(placeholder, imgElement);
}

// ===== АКТИВНЫЙ ПУНКТ НАВИГАЦИИ =====
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== ЭФФЕКТЫ ДЛЯ КНОПОК =====
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            
            // Add glow effect based on button type
            if (this.classList.contains('btn-brown') || this.classList.contains('btn-primary')) {
                this.style.boxShadow = 'var(--shadow-xl), 0 0 20px rgba(139, 115, 85, 0.4)';
            } else if (this.classList.contains('btn-white')) {
                this.style.boxShadow = 'var(--shadow-xl), 0 0 25px rgba(255, 255, 255, 0.8)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Enhanced click effects
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
            this.style.transition = 'all 0.1s ease';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Focus effects for accessibility
        button.addEventListener('focus', function() {
            if (!this.matches(':hover')) {
                this.style.transform = 'translateY(-2px) scale(1.01)';
                this.style.outline = '2px solid rgba(139, 115, 85, 0.5)';
                this.style.outlineOffset = '2px';
            }
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            if (!this.matches(':hover')) {
                this.style.transform = '';
            }
        });
    });
}

// ===== АНИМАЦИЯ СЧЕТЧИКОВ =====
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current).toLocaleString();
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== LAZY LOADING ДЛЯ ИЗОБРАЖЕНИЙ =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// ===== ОБРАБОТКА ФОРМ =====
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Показываем индикатор загрузки
            const submitBtn = this.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Симуляция отправки
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Показываем уведомление об успехе
                showNotification('Форма успешно отправлена!', 'success');
            }, 2000);
        });
    });
}

// ===== СИСТЕМА УВЕДОМЛЕНИЙ =====
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        info: 'var(--primary-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--danger-color)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid ${colors[type]};
        border-left: 4px solid ${colors[type]};
        color: var(--text-primary);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="color: ${colors[type]};">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}
            </div>
            <div>${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: var(--text-secondary); cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (duration > 0) {
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// ===== ГОРЯЧИЕ КЛАВИШИ =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Escape - закрытие модальных окон
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                bootstrap.Modal.getInstance(modal)?.hide();
            });
        }
        
        // Ctrl/Cmd + K - фокус на поиск (если есть)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ДОПОЛНИТЕЛЬНЫХ ФУНКЦИЙ =====
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavItem();
    initButtonEffects();
    animateCounters();
    initLazyLoading();
    initFormHandling();
    initKeyboardShortcuts();
});

// ===== CSS СТИЛИ ДЛЯ АНИМАЦИЙ =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .placeholder {
        transition: all 0.3s ease;
    }
    
    .placeholder:hover {
        transform: scale(1.02);
        filter: brightness(1.1);
    }
    
    .loading {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);

// ===== УЛУЧШЕННОЕ МОБИЛЬНОЕ МЕНЮ =====
function initEnhancedMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Создаем backdrop для закрытия меню
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
    
    // Обработчик переключения меню
    navbarToggler.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            // Открываем меню
            this.setAttribute('aria-expanded', 'true');
            navbarCollapse.classList.add('show');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Добавляем звуковой эффект (опционально)
            playMenuSound('open');
        } else {
            // Закрываем меню
            closeMenu();
        }
    });
    
    // Закрытие меню при клике на backdrop
    backdrop.addEventListener('click', closeMenu);
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 300); // Небольшая задержка для плавности
        });
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarCollapse.classList.remove('show');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // Добавляем звуковой эффект (опционально)
        playMenuSound('close');
    }
    
    // Опциональные звуковые эффекты
    function playMenuSound(type) {
        // Можно добавить звуковые эффекты позже
        // const audio = new Audio(`sounds/menu-${type}.mp3`);
        // audio.volume = 0.3;
        // audio.play().catch(() => {}); // Игнорируем ошибки
    }
    
    // Добавляем визуальные эффекты при наведении
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Адаптивное поведение при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}
