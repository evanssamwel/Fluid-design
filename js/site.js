const menuToggle = document.querySelector('.menu-toggle');
const sidePanel = document.querySelector('.side-panel');

if (menuToggle && sidePanel) {
    const closeMenu = () => {
        sidePanel.classList.remove('open');
        menuToggle.classList.remove('change');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.setAttribute('aria-controls', 'site-navigation');
    menuToggle.addEventListener('click', () => {
        const isOpen = sidePanel.classList.toggle('open');
        menuToggle.classList.toggle('change', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    sidePanel.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            menuToggle.focus();
        }
    });
}
