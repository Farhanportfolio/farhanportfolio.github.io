// ========================================
// MAIN APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initScrollReveal();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isOpen);
            links.classList.toggle('open');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (links) links.classList.remove('open');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (links && links.classList.contains('open')) {
            const nav = document.querySelector('.navbar');
            if (nav && !nav.contains(e.target)) {
                links.classList.remove('open');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// SCROLL REVEAL
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-achievement');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const allAchievements = Array.from(document.querySelectorAll('.reveal-achievement'));
                const index = allAchievements.indexOf(entry.target);
                const delay = index >= 0 ? index * 120 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}
