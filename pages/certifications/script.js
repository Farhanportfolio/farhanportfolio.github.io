// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initCertModal();
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
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// CERTIFICATE MODAL
// ========================================
function initCertModal() {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    const modalTitle = document.getElementById('certModalTitle');
    const modalOrg = document.getElementById('certModalOrg');
    const closeBtn = document.getElementById('certModalClose');
    const overlay = modal.querySelector('.cert-modal-overlay');
    
    const certItems = document.querySelectorAll('.cert-item');
    const openBtns = document.querySelectorAll('.open-cert-btn');
    const viewBtns = document.querySelectorAll('.cert-view-btn');
    
    function openModal(certItem) {
        const imgSrc = certItem.dataset.cert || certItem.querySelector('.cert-img').src;
        const title = certItem.querySelector('.cert-info h3').textContent;
        const org = certItem.querySelector('.cert-org').textContent;
        
        modalImage.src = imgSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalOrg.textContent = org;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.style.animation = 'none';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 10);
    }
    
    // Click on image wrap
    certItems.forEach(item => {
        const wrap = item.querySelector('.cert-image-wrap');
        wrap.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(item);
        });
    });
    
    // Click on "Show Credential" buttons
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.cert-item');
            if (item) openModal(item);
        });
    });
    
    // Click on "View" overlay buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.cert-item');
            if (item) openModal(item);
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
        if (e.target === modal) {
            closeModal();
        }
    });
}
