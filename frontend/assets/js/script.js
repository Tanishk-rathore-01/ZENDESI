// Enhanced JavaScript for ZENDESI - Interactions, Animations & Effects

'use strict';

// Configuration
const config = {
    observerThreshold: 0.1,
    observerMargin: '0px 0px -50px 0px',
    scaleAnimationDuration: 150,
    carouselAutoplay: true,
    carouselInterval: 5000
};

let carouselTimer = null;

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: config.observerThreshold,
        rootMargin: config.observerMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe place cards
    document.querySelectorAll('.place-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe review cards
    document.querySelectorAll('.review-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Initialize Reviews Carousel
 */
function initReviewsCarousel() {
    const container = document.querySelector('.reviews-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!container || !prevBtn || !nextBtn) return;

    const cards = Array.from(container.querySelectorAll('.review-card'));
    if (!cards.length) return;

    // Enable CSS scroll-snap carousel styles
    container.classList.add('reviews-carousel');

    function getGapPx() {
        const styles = window.getComputedStyle(container);
        const gap = parseFloat(styles.gap || styles.columnGap || '0');
        return Number.isFinite(gap) ? gap : 0;
    }

    function getStepPx() {
        const firstVisible = cards.find(c => c.offsetParent !== null) || cards[0];
        const width = firstVisible.getBoundingClientRect().width;
        return Math.max(1, Math.round(width + getGapPx()));
    }

    function updateNavVisibility() {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const showNav = maxScrollLeft > 10;
        prevBtn.style.display = showNav ? '' : 'none';
        nextBtn.style.display = showNav ? '' : 'none';
    }

    function scrollByOne(direction) {
        const step = getStepPx();
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (direction > 0 && container.scrollLeft >= maxScrollLeft - 2) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (direction < 0 && container.scrollLeft <= 2) {
            container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: direction * step, behavior: 'smooth' });
        }

        resetAutoplay();
    }

    prevBtn.addEventListener('click', () => scrollByOne(-1));
    nextBtn.addEventListener('click', () => scrollByOne(1));

    // Autoplay functionality
    function resetAutoplay() {
        clearTimeout(carouselTimer);
        if (!config.carouselAutoplay) return;
        carouselTimer = setTimeout(() => {
            scrollByOne(1);
        }, config.carouselInterval);
    }

    container.addEventListener('scroll', () => {
        updateNavVisibility();
    }, { passive: true });

    window.addEventListener('resize', () => {
        updateNavVisibility();
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft > maxScrollLeft) container.scrollLeft = maxScrollLeft;
    });

    updateNavVisibility();
    resetAutoplay();
}

/**
 * Add click and keyboard interactions to place cards
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.place-card, .review-card');
    
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
        // Don't override native keyboard behavior for links
        if (card.tagName.toLowerCase() !== 'a') {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick.call(card);
                }
            });
        }
    });
}

/**
 * Handle card click animation
 */
function handleCardClick() {
    const originalTransform = this.style.transform || 'scale(1)';
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = originalTransform;
    }, config.scaleAnimationDuration);
}

/**
 * Initialize smooth scroll for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initNavActiveState() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const mapped = currentFile === 'destination.html' ? 'explore.html' : currentFile;

    navLinks.forEach(link => {
        const raw = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
        const hrefFile = (raw.split('/').pop() || '').toLowerCase();
        const isHome = (mapped === 'index.html' || mapped === '') && (hrefFile === 'index.html' || hrefFile === '');
        const isActive = isHome || (hrefFile && hrefFile === mapped);
        link.classList.toggle('active', isActive);
    });
}

/**
 * Initialize header interactions
 */
function initHeaderInteraction() {
    const logoLink = document.querySelector('.logo-section');
    if (!logoLink) return;

    logoLink.addEventListener('click', (e) => {
        const href = (logoLink.getAttribute('href') || '').split('#')[0].split('?')[0];
        const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

        if ((href === '' || href === 'index.html') && (currentFile === '' || currentFile === 'index.html')) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

/**
 * Initialize CTA buttons
 */
function initCTAButtons() {
    const buttons = document.querySelectorAll('.primary-button, .cta-primary-button, .secondary-button, [data-href]');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);

            // Optional navigation for buttons
            const href = this.dataset?.href;
            if (href) {
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = href;
                }, 180);
            }
        });
    });
}

/**
 * Lazy load images with fallback
 */
function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    images.forEach(img => {
        img.addEventListener('error', () => {
            console.warn(`Failed to load image: ${img.src}`);
            img.style.opacity = '0.5';
        });
    });
}

/**
 * Add floating animation effect to decorative elements
 */
function initFloatingElements() {
    const decorElements = document.querySelectorAll('.hero-decoration');
    decorElements.forEach(el => {
        el.style.animation = 'rotate 20s linear infinite';
    });
}

/**
 * Initialize page scroll animations
 */
function safeJsonParse(raw) {
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function initAuthHeader() {
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');

    if (!loginBtn || !userMenu || !userName || !logoutBtn) return;

    const token = localStorage.getItem('zendesi_token');
    const user = safeJsonParse(localStorage.getItem('zendesi_user'));

    if (token && user && user.name) {
        loginBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        userName.textContent = `Hi, ${String(user.name).split(' ')[0]}`;

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('zendesi_token');
            localStorage.removeItem('zendesi_user');
            window.location.href = 'index.html';
        });
    } else {
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

/**
 * Scroll-to-top button visibility and behavior
 */
function initScrollTopButton() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Create animated floating stars and particles background
 */
function initBackgroundAnimation() {
    const starContainer = document.createElement('div');
    starContainer.id = 'animated-stars';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.insertBefore(starContainer, document.body.firstChild);

    // Create stars with different sizes and animations
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(150, 150, 255, 0.5), transparent);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            box-shadow: 0 0 ${size}px rgba(255, 255, 255, 0.8);
            animation: floatStar ${duration}s infinite ease-in-out ${delay}s;
            opacity: ${Math.random() * 0.7 + 0.3};
        `;

        starContainer.appendChild(star);
    }

    // Create larger glowing orbs
    const orbCount = 5;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        const size = Math.random() * 80 + 40;
        const duration = Math.random() * 30 + 20;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const orbColors = [
            '255, 56, 92',
            '0, 166, 153',
            '255, 164, 28'
        ];
        const color = orbColors[Math.floor(Math.random() * orbColors.length)];

        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(${color}, 0.4), rgba(${color}, 0.1));
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            filter: blur(40px);
            animation: floatOrb ${duration}s infinite ease-in-out;
            opacity: 0.15;
            box-shadow: 0 0 60px rgba(${color}, 0.3);
        `;

        starContainer.appendChild(orb);
    }

    // Add dynamic style for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatStar {
            0% {
                transform: translate(0, 0);
                opacity: 0.3;
            }
            25% {
                opacity: 0.8;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, -100px);
                opacity: 1;
            }
            75% {
                opacity: 0.8;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, 0);
                opacity: 0.3;
            }
        }

        @keyframes floatOrb {
            0% {
                transform: translate(0, 0) scale(0.8);
            }
            50% {
                transform: translate(100px, -100px) scale(1.2);
                opacity: 0.25;
            }
            100% {
                transform: translate(0, 0) scale(0.8);
                opacity: 0.15;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Background starfield animation initialized!');
}

/**
 * Create floating particles that follow mouse (optional elegant touch)
 */
function initMouseFollowParticles() {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Optional: create subtle glow effect at mouse position
    const glowElement = document.createElement('div');
    glowElement.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255, 56, 92, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        filter: blur(40px);
        display: none;
    `;
    document.body.appendChild(glowElement);

    // Show glow on desktop only (not on mobile)
    if (window.innerWidth > 768) {
        glowElement.style.display = 'block';
        
        let animationId;
        const updateGlow = () => {
            glowElement.style.left = (mouseX - 150) + 'px';
            glowElement.style.top = (mouseY - 150) + 'px';
            animationId = requestAnimationFrame(updateGlow);
        };
        updateGlow();
    }
}

/**
 * Initialize all features
 */
function initializeApp() {
    // Initialize background animations first (they run behind everything)
    initBackgroundAnimation();
    initMouseFollowParticles();

    initAuthHeader();
    initNavActiveState();
    initCTAButtons();

    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
    } else {
        console.warn('IntersectionObserver not supported');
        document.querySelectorAll('.place-card, .review-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    initCardInteractions();
    initHeaderInteraction();
    initImageLoading();
    initReviewsCarousel();
    initSmoothScroll();
    initFloatingElements();
    initScrollTopButton();

    console.log('✨ ZENDESI app initialized successfully!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    clearTimeout(carouselTimer);
});
