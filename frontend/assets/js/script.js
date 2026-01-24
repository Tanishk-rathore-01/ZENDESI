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

let carouselIndex = 0;
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

    const cards = container.querySelectorAll('.review-card');
    const cardsPerView = getCardsPerView();

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateCarousel() {
        const cardWidth = container.offsetWidth / cardsPerView;
        const offset = -carouselIndex * cardWidth;
        container.style.transform = `translateX(${offset}px)`;
    }

    function moveCarousel(direction) {
        carouselIndex += direction;
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        carouselIndex = Math.min(Math.max(0, carouselIndex), maxIndex);
        updateCarousel();
        resetAutoplay();
    }

    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));

    // Initialize carousel styles
    container.style.display = 'flex';
    container.style.gap = '24px';
    container.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.overflowX = 'hidden';

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Autoplay functionality
    function resetAutoplay() {
        clearTimeout(carouselTimer);
        if (config.carouselAutoplay) {
            carouselTimer = setTimeout(() => {
                moveCarousel(1);
            }, config.carouselInterval);
        }
    }

    resetAutoplay();
}

/**
 * Add click and keyboard interactions to place cards
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.place-card, .review-card');
    
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick.call(card);
            }
        });
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
 * Initialize header interactions
 */
function initHeaderInteraction() {
    const logo = document.querySelector('.logo');
    const cta = document.querySelector('.cta-button');

    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (cta) {
        cta.addEventListener('click', () => {
            alert('🎉 Booking functionality coming soon! Ready to explore India?');
        });
    }
}

/**
 * Initialize CTA buttons
 */
function initCTAButtons() {
    const buttons = document.querySelectorAll('.primary-button, .cta-primary-button, .secondary-button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.7)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
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
function initPageScrollEffects() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        document.body.style.scrollBehavior = 'smooth';
        
        // Add subtle parallax effect to hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollY = window.scrollY;
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
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
        const color = ['rgba(255, 56, 92', 'rgba(0, 166, 153', 'rgba(255, 164, 28'][Math.floor(Math.random() * 3)];

        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, ${color}, 0.4), ${color}, 0.1));
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            filter: blur(40px);
            animation: floatOrb ${duration}s infinite ease-in-out;
            opacity: 0.15;
            box-shadow: 0 0 60px ${color}, 0.3);
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
    initCTAButtons();
    initFloatingElements();
    initPageScrollEffects();

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
// Backend connection test
const BACKEND_URL = "http://localhost:5000";

fetch(`${BACKEND_URL}/`)
  .then(res => res.text())
  .then(data => console.log("✅ BACKEND CONNECTED:", data))
  .catch(err => console.error("❌ BACKEND CONNECTION ERROR:", err));
