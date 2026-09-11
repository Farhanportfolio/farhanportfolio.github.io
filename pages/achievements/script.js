// ========================================
// MAIN APP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initScrollReveal();
    initAchievementModal();
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

// ========================================
// ACHIEVEMENT MODAL
// ========================================
function initAchievementModal() {
    const modal = document.getElementById('achModal');
    const modalImage = document.getElementById('achModalImage');
    const modalTitle = document.getElementById('achModalTitle');
    const modalEvent = document.getElementById('achModalEvent');
    const closeBtn = document.getElementById('achModalClose');
    const overlay = modal.querySelector('.ach-modal-overlay');
    
    const viewBtns = document.querySelectorAll('.image-view-btn');
    const imageWraps = document.querySelectorAll('.achievement-image-wrap');
    
    function openModal(cert, title, event) {
        modalImage.src = cert;
        modalImage.alt = title || 'Certificate';
        modalTitle.textContent = title || 'Certificate';
        modalEvent.textContent = event || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cert = btn.dataset.cert;
            const title = btn.dataset.title || 'Certificate';
            const event = btn.dataset.event || '';
            if (cert) openModal(cert, title, event);
        });
    });
    
    imageWraps.forEach(wrap => {
        wrap.addEventListener('click', () => {
            const btn = wrap.querySelector('.image-view-btn');
            if (btn) btn.click();
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
