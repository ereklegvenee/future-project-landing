# Flowly — Landing Page

A responsive landing page for **Flowly**, a fictional workflow automation tool for small teams. Built with plain HTML, CSS and JavaScript — no frameworks and no build step.

## Features

- **Semantic, accessible HTML5** — landmarks, one `<h1>`, labelled sections, skip link, ARIA only where needed
- **Four sections** — Hero, About (with key stats), Features (3 cards) and Contact
- **Mobile-first responsive layout** — CSS Grid/Flexbox with breakpoints at 768px and 1024px, fluid typography with `clamp()`
- **Mobile navigation** — hamburger menu with animated icon; closes on link click, `Esc`, outside click or resize to desktop
- **Dark / light theme** — follows the system setting by default, remembers the user's choice in `localStorage`, no flash on load
- **Contact form validation** — inline, accessible error messages; success message announced to screen readers (no backend)
- **Respects `prefers-reduced-motion`** and meets WCAG AA color contrast in both themes

## File structure

```
.
├── index.html        # Page markup
├── css/
│   └── styles.css    # Design tokens, layout, components, dark theme, media queries
├── js/
│   └── main.js       # Navigation, theme toggle, contact form validation
└── README.md
```

## How to run

No installation needed — open `index.html` in any modern browser.

Optionally, serve it locally (e.g. with the VS Code **Live Server** extension, or `npx serve .`).

## Built with AI assistance

This project was built step by step with an AI coding agent (Claude Code) using structured prompts (Role → Context → Task → Requirements → Constraints → Output format). Each prompt produced one commit:

1. `feat: scaffold project and add semantic HTML structure`
2. `style: add design tokens, base styles and mobile-first layout`
3. `feat: add responsive navigation with mobile hamburger menu`
4. `feat: add dark/light theme toggle with saved preference`
5. `feat: add accessible contact form validation and final polish`

All generated code was reviewed and tested in the browser before committing.
