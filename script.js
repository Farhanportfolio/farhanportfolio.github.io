// ========================================
// EmailJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = 'service_px36p6n';
const EMAILJS_TEMPLATE_ID = 'template_g0hgzbm';
const EMAILJS_PUBLIC_KEY = 'LqmXJ6msgFytUh1E-';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initCardGlow();
    initHeroReveal();
    initScrollReveal();
    initSmoothScroll();
    initCountUp();
    initBackToTop();
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
// CONTACT FORM (EmailJS) — with subject
// ========================================
function initContactForm() {
    const form = document.getElementById('profileContactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('profileName');
        const email = document.getElementById('profileEmail');
        const subject = document.getElementById('profileSubject');
        const message = document.getElementById('profileMessage');
        
        let isValid = true;
        
        [name, email, subject, message].forEach(field => {
            if (field) {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="15 10" stroke-linecap="round"/>
            </svg>
            Sending...
        `;
        btn.disabled = true;
        btn.style.transform = 'scale(0.98)';
        
        try {
            const templateParams = {
                name: name.value.trim(),
                email: email.value.trim(),
                subject: subject.value.trim() || 'New message from Profiles page',
                message: message.value.trim(),
                to_name: 'Farhan Khan',
            };
            
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            } else {
                await new Promise(r => setTimeout(r, 800));
            }
            
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Sent Successfully!
            `;
            btn.style.background = '#00e5ff';
            btn.style.borderColor = '#00e5ff';
            btn.style.color = '#0a0c10';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.disabled = false;
                btn.style.transform = '';
                form.reset();
            }, 3000);
            
        } catch (error) {
            console.error('EmailJS error:', error);
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="M10 6V11M10 14H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Failed. Try Again
            `;
            btn.style.background = '#ff5f57';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                btn.style.transform = '';
            }, 3000);
        }
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
// CARD GLOW (3D tilt)
// ========================================
function initCardGlow() {
    const cards = document.querySelectorAll('.profile-card-large');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// HERO REVEAL
// ========================================
function initHeroReveal() {
    const heroElements = document.querySelectorAll(
        '.hero-split .reveal-left, .hero-split .reveal-right'
    );
    
    requestAnimationFrame(() => {
        heroElements.forEach(el => {
            setTimeout(() => el.classList.add('revealed'), 80);
        });
    });
}

// ========================================
// SCROLL REVEAL
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section .reveal-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
    
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => el.classList.add('revealed'), 100);
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
                const navHeight = 74;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// COUNT-UP
// ========================================
function initCountUp() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;
    
    setTimeout(() => {
        nums.forEach(n => animateCount(n));
    }, 500);
}

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start = performance.now();
    
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    
    requestAnimationFrame(update);
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const progress = btn.querySelector('.btt-ring-progress');
    const circumference = 2 * Math.PI * 46;
    
    if (progress) {
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;
    }
    
    let ticking = false;
    
    function updateButton() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        
        if (scrollTop > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
        
        if (progress) {
            const offset = circumference * (1 - scrollPercent);
            progress.style.strokeDashoffset = offset;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateButton);
            ticking = true;
        }
    }, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    updateButton();
}

// ========================================
// SHAKE + SPIN
// ========================================
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        15% { transform: translateX(-10px) rotate(-1deg); }
        30% { transform: translateX(10px) rotate(1deg); }
        45% { transform: translateX(-6px); }
        60% { transform: translateX(6px); }
        80% { transform: translateX(-3px); }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(additionalStyles);
