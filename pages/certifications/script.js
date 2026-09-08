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
    const modalIssuer = document.getElementById('certModalIssuer');
    const closeBtn = document.getElementById('certModalClose');
    const overlay = modal.querySelector('.cert-modal-overlay');
    
    // Get all certificate cards and buttons
    const certCards = document.querySelectorAll('.cert-card-large');
    const openBtns = document.querySelectorAll('.open-cert-btn');
    const viewBtns = document.querySelectorAll('.cert-view-btn');
    
    // Function to open modal
    function openModal(certData) {
        const imgSrc = certData.dataset.cert;
        const title = certData.querySelector('.cert-card-content h3').textContent;
        const issuer = certData.querySelector('.cert-issuer').textContent;
        
        modalImage.src = imgSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalIssuer.textContent = issuer;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset image animation
        modalImage.style.animation = 'none';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 10);
    }
    
    // Click on card image area (image wrapper)
    certCards.forEach(card => {
        const wrapper = card.querySelector('.cert-image-wrapper');
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(card);
        });
    });
    
    // Click on "View Full Certificate" buttons
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.cert-card-large');
            if (card) openModal(card);
        });
    });
    
    // Click on "View Certificate" overlay buttons
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.cert-card-large');
            if (card) openModal(card);
        });
    });
    
    // Close modal on close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on overlay click
    overlay.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
