// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAchievementModal();
    initViewButtons();
    initBackToTop();
    initAOS();
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
// ACHIEVEMENT MODAL
// ========================================
function initAchievementModal() {
    const modal = document.getElementById('achModal');
    const modalImage = document.getElementById('achModalImage');
    const modalTitle = document.getElementById('achModalTitle');
    const modalEvent = document.getElementById('achModalEvent');
    const closeBtn = document.getElementById('achModalClose');
    const overlay = modal.querySelector('.ach-modal-overlay');
    
    const openBtns = document.querySelectorAll('.open-cert-btn');
    const viewBtns = document.querySelectorAll('.ach-view-btn');
    
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
        modalImage.style.animation = 'none';
        setTimeout(() => { modalImage.style.animation = ''; }, 10);
    }
    
    // Open buttons
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cert = btn.dataset.cert;
            const title = btn.dataset.title || 'Certificate';
            const event = btn.dataset.event || '';
            if (cert) openModal(cert, title, event);
        });
    });
    
    // View buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cert = btn.dataset.cert;
            const card = btn.closest('.achievement-card');
            const title = card ? card.querySelector('.ach-content h3')?.textContent : 'Certificate';
            const event = card ? card.querySelector('.ach-event')?.textContent : '';
            if (cert) openModal(cert, title, event);
        });
    });
    
    // Click on image
    document.querySelectorAll('.ach-image-wrap').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const btn = wrap.querySelector('.ach-view-btn');
            if (btn) btn.click();
        });
    });
    
    // Close
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// ========================================
// VIEW BUTTONS
// ========================================
function initViewButtons() {
    document.querySelectorAll('.ach-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    const button = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        const top = document.getElementById('achievementsTop');
        if (top) {
            top.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// SIMPLE AOS - Animate on scroll
// ========================================
function initAOS() {
    const cards = document.querySelectorAll('.achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.97)';
        card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(card);
    });
}
