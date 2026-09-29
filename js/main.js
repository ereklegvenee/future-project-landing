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

/**
 * Client-side validation for the contact form (no backend).
 * Errors are shown inline and linked to each field via aria-describedby.
 */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const status = form ? form.querySelector('.contact-form__status') : null;

  if (!form || !status) {
    return;
  }

  // Single place to change validation rules and messages
  const VALIDATION_RULES = {
    name: {
      minLength: 2,
      messages: {
        empty: 'Please enter your name.',
        tooShort: 'Your name must be at least 2 characters.',
      },
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      messages: {
        empty: 'Please enter your email address.',
        invalid: 'Please enter a valid email address, e.g. name@example.com.',
      },
    },
    message: {
      minLength: 10,
      messages: {
        empty: 'Please enter a message.',
        tooShort: 'Your message must be at least 10 characters.',
      },
    },
  };

  const INVALID_CLASS = 'is-invalid';
  const fieldNames = Object.keys(VALIDATION_RULES);

  function getField(name) {
    return form.elements.namedItem(name);
  }

  function getErrorElement(field) {
    return document.getElementById(field.getAttribute('aria-describedby'));
  }

  function getErrorMessage(name, value) {
    const rule = VALIDATION_RULES[name];

    if (!value) {
      return rule.messages.empty;
    }
    if (rule.minLength && value.length < rule.minLength) {
      return rule.messages.tooShort;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.messages.invalid;
    }
    return '';
  }

  function showError(field, message) {
    const errorElement = getErrorElement(field);
    field.classList.add(INVALID_CLASS);
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearError(field) {
    const errorElement = getErrorElement(field);
    field.classList.remove(INVALID_CLASS);
    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  function validateField(field) {
    const message = getErrorMessage(field.name, field.value.trim());

    if (message) {
      showError(field, message);
      return false;
    }
    clearError(field);
    return true;
  }

  function announce(message) {
    // Clear first so screen readers re-announce identical messages
    status.textContent = '';
    window.setTimeout(() => {
      status.textContent = message;
    }, 100);
  }

  function handleSubmit(event) {
    event.preventDefault();
    status.textContent = '';

    const fields = fieldNames.map(getField).filter(Boolean);
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      return;
    }

    const name = getField('name').value.trim();
    form.reset();
    fields.forEach(clearError);
    announce(`Thanks, ${name}! Your message has been sent. We'll reply within one business day.`);
  }

  // Once a field has been marked invalid, re-check it live as the user fixes it
  function handleFieldUpdate(event) {
    const field = event.target;

    if (fieldNames.includes(field.name) && field.classList.contains(INVALID_CLASS)) {
      validateField(field);
    }
  }

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', handleFieldUpdate);
  form.addEventListener('focusout', handleFieldUpdate); // focusout bubbles, blur does not
}

initNavigation();
initThemeToggle();
initContactForm();
