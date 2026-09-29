'use strict';

/**
 * Responsive main navigation: toggles the mobile menu and keeps
 * aria-expanded / aria-label on the hamburger button in sync.
 */
function initNavigation() {
  const toggle = document.querySelector('.site-nav__toggle');
  const list = document.querySelector('.site-nav__list');

  if (!toggle || !list) {
    return;
  }

  const OPEN_CLASS = 'site-nav__list--open';
  const desktopQuery = window.matchMedia('(min-width: 768px)');

  function isMenuOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close main menu');
    list.classList.add(OPEN_CLASS);
  }

  function closeMenu({ returnFocus = false } = {}) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open main menu');
    list.classList.remove(OPEN_CLASS);

    if (returnFocus) {
      toggle.focus();
    }
  }

  function handleToggleClick() {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleLinkClick(event) {
    if (event.target.closest('.site-nav__link')) {
      closeMenu();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && isMenuOpen()) {
      closeMenu({ returnFocus: true });
    }
  }

  function handleOutsideClick(event) {
    if (isMenuOpen() && !toggle.contains(event.target) && !list.contains(event.target)) {
      closeMenu();
    }
  }

  function handleViewportChange(event) {
    if (event.matches) {
      closeMenu();
    }
  }

  toggle.addEventListener('click', handleToggleClick);
  list.addEventListener('click', handleLinkClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleOutsideClick);
  desktopQuery.addEventListener('change', handleViewportChange);
}

initNavigation();
