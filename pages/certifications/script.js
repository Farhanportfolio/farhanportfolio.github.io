document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initCertModal();
    initViewButtons();
    initBackToTop();
});

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

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
}

function initCertModal() {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    const modalTitle = document.getElementById('certModalTitle');
    const modalOrg = document.getElementById('certModalOrg');
    const closeBtn = document.getElementById('certModalClose');
    const overlay = modal.querySelector('.cert-modal-overlay');

    const openBtns = document.querySelectorAll('.open-cert-btn');
    const viewBtns = document.querySelectorAll('.cert-view-btn');

    function openModal(cert, title, org) {
        modalImage.src = cert;
        modalImage.alt = title || 'Certificate';
        modalTitle.textContent = title || 'Certificate';
        modalOrg.textContent = org || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.style.animation = 'none';
        setTimeout(() => { modalImage.style.animation = ''; }, 10);
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cert = btn.dataset.cert;
            const title = btn.dataset.title || 'Certificate';
            const org = btn.dataset.org || '';
            if (cert) openModal(cert, title, org);
        });
    });

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cert = btn.dataset.cert;
            const row = btn.closest('.cert-row');
            const title = row ? row.querySelector('.cert-row-info h3')?.textContent : 'Certificate';
            const org = row ? row.querySelector('.cert-org')?.textContent : '';
            if (cert) openModal(cert, title, org);
        });
    });

    document.querySelectorAll('.cert-row-image').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const btn = wrap.querySelector('.cert-view-btn');
            if (btn) btn.click();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function initViewButtons() {
    document.querySelectorAll('.cert-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

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
