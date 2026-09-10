// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initScrollReveal();
    init3DTilt();
    initParallax();
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
                const el = entry.target;
                const delay = el.classList.contains('reveal-project') ? 200 : 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// ========================================
// 3D TILT EFFECT
// ========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        let rect = null;
        
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            rect = null;
        });
    });
}

// ========================================
// PARALLAX BACKGROUND
// ========================================
function initParallax() {
    const gridLayers = document.querySelectorAll('.grid-layer');
    const cubes = document.querySelectorAll('.cube');
    const orbits = document.querySelectorAll('.orbit');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                gridLayers.forEach((layer, i) => {
                    const speed = (i + 1) * 0.05;
                    layer.style.transform = `translate(${scrollY * speed}px, ${scrollY * speed}px)`;
                });
                
                cubes.forEach((cube, i) => {
                    const speed = (i + 1) * 0.08;
                    const currentRotate = scrollY * speed;
                    cube.style.marginTop = `${currentRotate}px`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// TYPING EFFECT - RETRIGGER ON HOVER
// ========================================
document.querySelectorAll('.project-card-3d').forEach(card => {
    const typingEl = card.querySelector('.typing-text');
    if (!typingEl) return;
    
    card.addEventListener('mouseenter', () => {
        typingEl.style.animation = 'none';
        void typingEl.offsetWidth;
        typingEl.style.animation = '';
    });
});
