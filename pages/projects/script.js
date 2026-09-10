// ========================================
// INTRO ANIMATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initIntro();
});

function initIntro() {
    const introScreen = document.getElementById('introScreen');
    const introCrack = document.getElementById('introCrack');
    const introText = document.getElementById('introText');
    const introParticles = document.getElementById('introParticles');
    
    // Make the crack visible
    introCrack.style.opacity = '1';
    
    // Phase 1: Show crack drawing (0.1s - 0.9s)
    // Phase 2: Show "Projects" text (1s)
    setTimeout(() => {
        introText.classList.add('show');
        
        // Spark particles burst
        createParticles(introParticles);
    }, 900);
    
    // Phase 3: Shatter text and open crack (2s)
    setTimeout(() => {
        introText.classList.add('shatter');
        introScreen.classList.add('cracking');
    }, 2000);
    
    // Phase 4: Open the halves (2.3s)
    setTimeout(() => {
        introScreen.classList.add('opening');
        // Big particle burst
        createParticles(introParticles, 30);
    }, 2300);
    
    // Phase 5: Remove intro, reveal page (4.2s)
    setTimeout(() => {
        document.body.classList.remove('intro-active');
        introScreen.style.opacity = '0';
        introScreen.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000);
    }, 4200);
}

function createParticles(container, count = 15) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'intro-particle';
        
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 150 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = (Math.random() * 0.3) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// ========================================
// MAIN APP
// ========================================
window.addEventListener('load', () => {
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
                const delay = entry.target.classList.contains('reveal-project') ? 200 : 0;
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

// ========================================
// 3D TILT - SLOW AND SMOOTH
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
            // Smooth interpolation (slower = smoother)
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            
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
            
            // Reduced tilt for smoother feel
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

// ========================================
// TYPING RETRIGGER
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
