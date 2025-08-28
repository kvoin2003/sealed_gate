// Sealed Gate Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.98)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Pack opening animation
    const openingBtn = document.querySelector('.opening-btn');
    const packSealed = document.querySelector('.pack-sealed');
    const revealedCards = document.getElementById('revealed-cards');
    
    const cardTypes = [
        { name: 'Огненный дракон', rarity: 'legendary', color: '#ef4444' },
        { name: 'Ледяной маг', rarity: 'rare', color: '#06b6d4' },
        { name: 'Лесной страж', rarity: 'common', color: '#22c55e' },
        { name: 'Темный рыцарь', rarity: 'epic', color: '#8b5cf6' },
        { name: 'Световой клирик', rarity: 'rare', color: '#f59e0b' },
        { name: 'Механический голем', rarity: 'legendary', color: '#6366f1' },
        { name: 'Водяной элементаль', rarity: 'common', color: '#06b6d4' },
        { name: 'Громовой варвар', rarity: 'epic', color: '#ef4444' }
    ];
    
    function getRandomCards(count = 5) {
        const shuffled = [...cardTypes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    function createCardElement(card) {
        const cardEl = document.createElement('div');
        cardEl.className = 'revealed-card';
        cardEl.style.borderColor = card.color;
        cardEl.style.boxShadow = `0 4px 12px ${card.color}33`;
        cardEl.innerHTML = `
            <div>
                <div style="width: 100%; height: 60px; background: ${card.color}; border-radius: 6px; margin-bottom: 8px; opacity: 0.8;"></div>
                <div style="font-weight: 600; margin-bottom: 4px; font-size: 11px;">${card.name}</div>
                <div style="font-size: 10px; color: ${card.color}; text-transform: uppercase;">${card.rarity}</div>
            </div>
        `;
        return cardEl;
    }
    
    function animatePackOpening() {
        openingBtn.disabled = true;
        openingBtn.textContent = 'Открываем...';
        
        // Pack opening animation
        packSealed.style.transform = 'scale(1.1) rotateY(180deg)';
        packSealed.style.opacity = '0.5';
        
        setTimeout(() => {
            // Reset pack
            packSealed.style.transform = 'scale(1)';
            packSealed.style.opacity = '1';
            
            // Show revealed cards
            const cards = getRandomCards();
            revealedCards.innerHTML = '';
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    const cardEl = createCardElement(card);
                    cardEl.style.opacity = '0';
                    cardEl.style.transform = 'translateY(20px)';
                    revealedCards.appendChild(cardEl);
                    
                    requestAnimationFrame(() => {
                        cardEl.style.transition = 'all 0.5s ease';
                        cardEl.style.opacity = '1';
                        cardEl.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
            
            revealedCards.classList.add('show');
            openingBtn.disabled = false;
            openingBtn.textContent = 'Вскрыть еще набор';
        }, 1000);
    }
    
    if (openingBtn) {
        openingBtn.addEventListener('click', animatePackOpening);
    }
    
    // Pack cards hover effects
    document.querySelectorAll('.pack-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button click effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.disabled) {
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Card stack animation on scroll
    const cardStack = document.querySelector('.card-stack');
    if (cardStack) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'cardStackFloat 6s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(cardStack);
    }
    
    // Number animation for stats
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text.includes('250K+')) {
                    animateNumber(statNumber, 250000);
                } else if (text.includes('50K+')) {
                    animateNumber(statNumber, 50000);
                } else if (text.includes('1000+')) {
                    animateNumber(statNumber, 1000);
                } else if (text.includes('24/7')) {
                    statNumber.textContent = '24/7';
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            document.querySelectorAll('.modal, .overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Initialize tooltips for pack cards
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--background-tertiary);
                color: var(--text-primary);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                border: 1px solid var(--border-color);
                box-shadow: var(--shadow-md);
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            document.querySelectorAll('.tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes cardStackFloat {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);