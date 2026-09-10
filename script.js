// ========================================
// LIGHTNING CRACK INTRO
// ========================================
(function initCrackIntro() {
    const intro = document.getElementById('crackIntro');
    const title = document.getElementById('crackTitle');
    if (!intro || !title) {
        document.body.classList.remove('intro-active');
        return;
    }

    // Phase 1 (0ms): Start drawing the crack
    requestAnimationFrame(() => {
        intro.classList.add('lit', 'drawing');
    });

    // Phase 2 (400ms): Flash burst + start pulse
    setTimeout(() => {
        intro.classList.add('flash', 'pulsing');
    }, 400);

    // Phase 3 (600ms): Title enters
    setTimeout(() => {
        title.classList.add('show');
    }, 600);

    // Phase 4 (1100ms): Title shatters
    setTimeout(() => {
        title.classList.add('shatter');
    }, 1100);

    // Phase 5 (1250ms): Halves split
    setTimeout(() => {
        intro.classList.add('splitting');
    }, 1250);

    // Phase 6 (1700ms): Reveal main page
    setTimeout(() => {
        document.body.classList.remove('intro-active');
    }, 1700);

    // Phase 7 (2200ms): Remove intro entirely
    setTimeout(() => {
        intro.style.display = 'none';
    }, 2200);
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
