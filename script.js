// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDropdowns();
    initContactForm();
    initScrollEffects();
    initSmoothScroll();
    initParticleEffect();
    initCardGlow();
});

// ========================================
// NAVIGATION - No scroll activation
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
// DROPDOWNS
// ========================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    
    dropdowns.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.closest('.dropdown-wrapper').nextElementSibling;
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            
            document.querySelectorAll('.dropdown-toggle').forEach(b => {
                if (b !== button) {
                    b.setAttribute('aria-expanded', 'false');
                    const otherContent = b.closest('.dropdown-wrapper').nextElementSibling;
                    if (otherContent) otherContent.hidden = true;
                }
            });
            
            button.setAttribute('aria-expanded', !isOpen);
            if (content) {
                if (isOpen) {
                    content.style.animation = 'dropdownClose 0.3s ease forwards';
                    setTimeout(() => {
                        content.hidden = true;
                        content.style.animation = '';
                    }, 300);
                } else {
                    content.hidden = false;
                    content.style.animation = 'dropdownReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                }
            }
        });
    });
}

const styleDropdown = document.createElement('style');
styleDropdown.textContent = `
    @keyframes dropdownClose {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(-12px) scale(0.96); }
    }
`;
document.head.appendChild(styleDropdown);

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        [name, email, message].forEach(field => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        });
        
        if (!name.value.trim()) {
            isValid = false;
            name.style.borderColor = '#00e5ff';
            name.style.boxShadow = '0 0 0 4px rgba(0, 229, 255, 0.1)';
            name.focus();
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            isValid = false;
            email.style.borderColor = '#00e5ff';
            email.style.boxShadow = '0 0 0 4px rgba(0, 229, 255, 0.1)';
            if (isValid) email.focus();
        }
        
        if (!message.value.trim()) {
            isValid = false;
            message.style.borderColor = '#00e5ff';
            message.style.boxShadow = '0 0 0 4px rgba(0, 229, 255, 0.1)';
            if (isValid) message.focus();
        }
        
        if (!isValid) {
            form.style.animation = 'shake 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => form.style.animation = '', 500);
            return;
        }
        
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Sent Successfully!
        `;
        btn.style.background = '#00e5ff';
        btn.style.borderColor = '#00e5ff';
        btn.style.color = '#0a0c10';
        btn.disabled = true;
        btn.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
            btn.disabled = false;
            btn.style.transform = '';
            form.reset();
        }, 3000);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// PARTICLE EFFECT
// ========================================
function initParticleEffect() {
    if (window.innerWidth < 768) return;
    
    const hero = document.querySelector('.home-section');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        const rect = hero.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    const particleCount = Math.min(60, Math.floor(canvas.width * canvas.height / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.04 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        animationId = requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    const cleanup = () => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
    };
    
    window._particleCleanup = cleanup;
}

// ========================================
// CARD GLOW ON MOUSE MOVE
// ========================================
function initCardGlow() {
    const cards = document.querySelectorAll('.stat-card, .skill-card, .project-card, .cert-card, .profile-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// KEYBOARD SUPPORT
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-toggle').forEach(button => {
            button.setAttribute('aria-expanded', 'false');
            const content = button.closest('.dropdown-wrapper').nextElementSibling;
            if (content) {
                content.hidden = true;
                content.style.animation = '';
            }
        });
        
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.setAttribute('aria-expanded', 'false');
            links.classList.remove('open');
        }
    }
});

// ========================================
// SHAKE ANIMATION
// ========================================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        15% { transform: translateX(-10px) rotate(-1deg); }
        30% { transform: translateX(10px) rotate(1deg); }
        45% { transform: translateX(-6px); }
        60% { transform: translateX(6px); }
        80% { transform: translateX(-3px); }
    }
`;
document.head.appendChild(shakeStyle);

// ========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ========================================
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px) scale(0.98)';
    observer.observe(section);
});