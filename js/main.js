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

/**
 * Dark/light theme switch. Initial theme priority:
 * saved choice in localStorage → system preference → light.
 * An inline script in <head> applies it before first paint; this syncs the button.
 */
function initThemeToggle() {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const STORAGE_KEY = 'flowly-theme';
  const TRANSITION_CLASS = 'theme-transition';
  const TRANSITION_MS = 300;
  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Storage unavailable (e.g. private mode) — theme still works for this visit
    }
  }

  function getInitialTheme() {
    return getSavedTheme() || (systemDarkQuery.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  function animateThemeChange() {
    root.classList.add(TRANSITION_CLASS);
    window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
  }

  function handleButtonClick() {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    animateThemeChange();
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  }

  function handleSystemChange(event) {
    // Follow the OS setting only if the user hasn't picked a theme themselves
    if (!getSavedTheme()) {
      animateThemeChange();
      applyTheme(event.matches ? 'dark' : 'light');
    }
  }

  applyTheme(getInitialTheme());
  systemDarkQuery.addEventListener('change', handleSystemChange);

  if (button) {
    button.addEventListener('click', handleButtonClick);
  }
}

initNavigation();
initThemeToggle();
