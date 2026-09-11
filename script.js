// ========================================
// SHIELD INTRO
// ========================================
(function initShieldIntro() {
    const intro = document.getElementById('shieldIntro');
    const title = document.getElementById('introTitle');
    if (!intro || !title) {
        document.body.classList.remove('intro-active');
        return;
    }

    // Phase 1 (0.6s): Shield is stable — begin cracking
    setTimeout(() => {
        intro.classList.add('breaking');
    }, 600);

    // Phase 2 (1.5s): Full explosion — shield tears apart
    setTimeout(() => {
        intro.classList.add('exploding');
    }, 1500);

    // Phase 3 (2.0s): Name fades in over the wreckage
    setTimeout(() => {
        title.classList.add('show');
    }, 2000);

    // Phase 4 (3.2s): Complete vanish — no trace
    setTimeout(() => {
        intro.classList.add('done');
        document.body.classList.remove('intro-active');
    }, 3200);

    // Phase 5 (3.9s): Remove from DOM entirely
    setTimeout(() => {
        intro.style.display = 'none';
        intro.remove();
    }, 3900);
})();

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
    initDropdowns();
    initContactForm();
    initScrollEffects();
    initSmoothScroll();
    initCardGlow();
    initHeroReveal();
    initScrollReveal();
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
// CONTACT FORM (EmailJS)
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const message = document.getElementById('contactMessage');

        let isValid = true;

        [name, email, message].forEach(field => {
            if (!field) return;
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
// CARD GLOW
// ========================================
function initCardGlow() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card, .profile-card, .achievement-card, .stat-block');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
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

    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('revealed'));
    }, 2700);
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
}

// ========================================
// TYPED TEXT
// ========================================
function initTypedText() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const phrases = [
        'whoami --verbose',
        'nmap -sV target',
        'echo "stay curious"',
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

    setTimeout(type, 3400);
}

// ========================================
// COUNT-UP
// ========================================
function initCountUp() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    setTimeout(() => {
        nums.forEach(n => animateCount(n));
    }, 3200);
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
