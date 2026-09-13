(function applyThemeEarly() {
    try {
        var saved = localStorage.getItem('theme');
        var theme = (saved === 'dark') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0c10' : '#ffffff');
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    var ANIM_MS = 750;
    var locked = false;

    function updateAria() {
        var isDark = html.getAttribute('data-theme') === 'dark';
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    function setTheme(theme, animate) {
        if (animate) {
            toggle.classList.add('switching');
            setTimeout(function () { toggle.classList.remove('switching'); }, ANIM_MS);
        }
        html.setAttribute('data-theme', theme);

        try { localStorage.setItem('theme', theme); } catch (e) {}

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0c10' : '#ffffff');

        updateAria();
    }

    toggle.addEventListener('click', function () {
        if (locked) return;
        locked = true;

        var current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';

        setTheme(next, true);

        setTimeout(function () { locked = false; }, ANIM_MS);
    });

    window.addEventListener('storage', function (e) {
        if (e.key === 'theme') {
            var t = e.newValue === 'dark' ? 'dark' : 'light';
            html.setAttribute('data-theme', t);
            updateAria();
        }
    });

    updateAria();
});