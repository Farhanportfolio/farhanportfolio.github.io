// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initCardGlow();
    initScrollReveal();
    initSmoothScroll();
    initTypedText();
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
// CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('profileContactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
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
// CARD GLOW (3D tilt on hover)
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
// SCROLL REVEAL (IntersectionObserver)
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-card, .reveal-left, .reveal-right'
    );
    
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
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    const scrollBtns = document.querySelectorAll('.scroll-btn');
    
    scrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = 74;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

// ========================================
// TYPED TEXT EFFECT
// ========================================
function initTypedText() {
    const el = document.getElementById('typedText');
    if (!el) return;
    
    const phrases = [
        'whoami --verbose',
        'nmap -sV target',
        'echo "stay curious"',
        'cat /etc/passwd',
        'exploit responsibly',
        'learning every day'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    
    function type() {
        const current = phrases[phraseIndex];
        
        if (!deleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
            setTimeout(type, 60);
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 30);
        }
    }
    
    setTimeout(type, 1200);
}

// ========================================
// COUNT-UP NUMBER ANIMATION
// ========================================
function initCountUp() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    nums.forEach(n => observer.observe(n));
}

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start = performance.now();
    
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    
    requestAnimationFrame(update);
}

// ========================================
// BACK TO TOP BUTTON + PROGRESS RING
// ========================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const progress = btn.querySelector('.btt-ring-progress');
    const circumference = 2 * Math.PI * 46; // r=46
    
    if (progress) {
        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset = circumference;
    }
    
    let ticking = false;
    
    function updateButton() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        
        // Show after scrolling 400px
        if (scrollTop > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
        
        // Update ring progress
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
    
    // Initial state
    updateButton();
}

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
