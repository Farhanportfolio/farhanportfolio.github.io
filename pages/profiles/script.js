// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initCardGlow();
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
// CARD GLOW ON MOUSE MOVE
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
            
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
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