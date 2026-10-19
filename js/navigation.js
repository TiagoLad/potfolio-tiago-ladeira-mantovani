(() => {
    const button = document.querySelector('.site-menu-button');
    const menu = document.getElementById('site-navigation');
    const header = document.querySelector('.site-header');
    if (!button || !menu || !header) return;

    const mobile = window.matchMedia('(max-width: 900px)');
    const setOpen = (open, restoreFocus = false) => {
        menu.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
        button.querySelector('[data-menu-label]').textContent = open ? 'Fechar' : 'Menu';
        button.querySelector('[data-menu-icon]').textContent = open ? '×' : '☰';
        if (restoreFocus) button.focus();
    };

    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) setOpen(false);
    });
    header.addEventListener('focusout', (event) => {
        if (event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
    });
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a') && mobile.matches) setOpen(false);
    });
    mobile.addEventListener('change', () => {
        const focused = document.activeElement;
        setOpen(false);
        if (mobile.matches && menu.contains(focused)) button.focus();
        else if (!mobile.matches && focused === button) menu.querySelector('[aria-current="page"]').focus();
    });
    document.body.classList.add('navigation-ready');
})();
