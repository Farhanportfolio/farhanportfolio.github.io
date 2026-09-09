// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAchievementModal();
    initViewButtons();
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
