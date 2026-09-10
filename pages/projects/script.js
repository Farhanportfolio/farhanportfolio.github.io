// ========================================
// MAIN APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initScrollReveal();
    init3DTilt();
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
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-project');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.classList.contains('reveal-project') ? 100 : 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// ========================================
// SMOOTH 3D TILT
// ========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        let rafId = null;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let rect = null;
        
        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            
            card.style.transform = `perspective(2000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateY(-6px)`;
            
            if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        }
        
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            targetX = ((y - centerY) / centerY) * -2;
            targetY = ((x - centerX) / centerX) * 2;
            
            if (!rafId) rafId = requestAnimationFrame(animate);
        });
        
        card.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
            if (!rafId) rafId = requestAnimationFrame(animate);
            rect = null;
        });
    });
}
