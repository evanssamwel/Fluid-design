const menuToggle = document.querySelector('.menu-toggle');
const sidePanel = document.querySelector('.side-panel');

document.documentElement.classList.add('js-enabled');

if (menuToggle && sidePanel) {
    const mobileViewport = window.matchMedia('(max-width: 600px)');
    sidePanel.inert = true;
    sidePanel.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-controls', sidePanel.id);

    const closeMenu = () => {
        sidePanel.classList.remove('open');
        menuToggle.classList.remove('change');
        menuToggle.setAttribute('aria-expanded', 'false');
        sidePanel.setAttribute('aria-hidden', 'true');
        sidePanel.inert = true;
        document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = sidePanel.classList.toggle('open');
        menuToggle.classList.toggle('change', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        sidePanel.setAttribute('aria-hidden', String(!isOpen));
        sidePanel.inert = !isOpen;
        document.body.classList.toggle('menu-open', isOpen && mobileViewport.matches);
    });

    sidePanel.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('pointerdown', (event) => {
        if (!sidePanel.classList.contains('open')) {
            return;
        }

        if (!sidePanel.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidePanel.classList.contains('open')) {
            closeMenu();
            menuToggle.focus();
        }
    });

    mobileViewport.addEventListener('change', () => {
        if (sidePanel.classList.contains('open')) {
            document.body.classList.toggle('menu-open', mobileViewport.matches);
        }
    });
}

const ambientLayer = document.querySelector('.home-section.ambient');
const pointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (ambientLayer && pointerDevice.matches && !reducedMotion.matches) {
    let animationFrame = 0;

    ambientLayer.addEventListener('pointermove', (event) => {
        if (document.hidden || animationFrame || reducedMotion.matches || !pointerDevice.matches) {
            return;
        }

        animationFrame = window.requestAnimationFrame(() => {
            const bounds = ambientLayer.getBoundingClientRect();
            const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
            const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
            ambientLayer.style.setProperty('--pointer-x', `${x}%`);
            ambientLayer.style.setProperty('--pointer-y', `${y}%`);
            animationFrame = 0;
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        }
    });

    const resetAmbient = () => {
        if (reducedMotion.matches || !pointerDevice.matches) {
            ambientLayer.style.setProperty('--pointer-x', '52%');
            ambientLayer.style.setProperty('--pointer-y', '34%');
        }
    };

    reducedMotion.addEventListener('change', resetAmbient);
    pointerDevice.addEventListener('change', resetAmbient);
}
