/* =========================================================
   PORTFOLIO SCRIPT
   Handles: theme toggle, mobile navigation, active link
   highlighting on scroll, navbar scroll state, and a light
   scroll-reveal animation for section content.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. THEME TOGGLE (dark / light)
       Note: the initial theme is already set in index.html's
       <head> (before paint) to avoid a flash of wrong theme.
       This just handles the button + keeps it in sync.
       ===================================================== */

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeIcon.classList.toggle('fa-moon', !isDark);
        themeIcon.classList.toggle('fa-sun', isDark);
    }

    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon();
    });


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    function closeMenu() {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars', !isOpen);
        menuIcon.classList.toggle('fa-xmark', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Close the mobile menu if the viewport is resized back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });


    /* =====================================================
       3. NAVBAR SCROLLED STATE
       Adds a subtle stronger shadow/border once the user
       scrolls past the hero, for a bit more depth.
       ===================================================== */

    const header = document.querySelector('.header');

    function updateHeaderState() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });


    /* =====================================================
       4. ACTIVE NAV LINK ON SCROLL
       Highlights the nav link for whichever section is
       currently in view.
       ===================================================== */

    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute('id');

                navAnchors.forEach((anchor) => {
                    anchor.classList.toggle(
                        'active-link',
                        anchor.getAttribute('href') === `#${id}`
                    );
                });
            });
        },
        {
            rootMargin: '-45% 0px -50% 0px',
            threshold: 0,
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));


    /* =====================================================
       5. SCROLL-REVEAL FOR SECTION CONTENT
       Lightweight fade-up reveal the first time each card
       or block scrolls into view. Skips entirely if the
       user prefers reduced motion.
       ===================================================== */

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
        const revealTargets = document.querySelectorAll(
            [
                '.about-container',
                '.skill-category',
                '.project-card',
                '.timeline-item',
                '.education-card',
                '.certificate-card',
                '.achievement-card',
                '.coding-card',
                '.research-project',
                '.research-interests',
                '.contact-intro',
                '.contact-item',
            ].join(', ')
        );

        revealTargets.forEach((el) => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealTargets.forEach((el) => revealObserver.observe(el));
    }

});
