# Flowly — Landing Page

A responsive landing page for **Flowly**, a fictional workflow automation tool for small teams. Built with plain HTML, CSS and JavaScript — no frameworks and no build step.

## Design

The page uses an **"Aurora Glass"** style: a dark-first SaaS look with glowing gradient light, frosted-glass surfaces, bold typography and tasteful motion. The light theme uses the same accents on a soft off-white background.

- **Typography** — [Sora](https://fonts.google.com/specimen/Sora) for headings, [Inter](https://fonts.google.com/specimen/Inter) for body text
- **Palette** — deep navy / off-white base with indigo, violet and cyan accents, all defined as role-based CSS custom properties
- **Hero** — drifting aurora glows, a faded grid pattern, animated gradient headline and an animated workflow diagram showing data moving between steps
- **Glass UI** — floating frosted navbar, glass cards and form panel with gradient borders (with a solid fallback where `backdrop-filter` isn't supported)

## Features

- **Semantic, accessible HTML5** — landmarks, one `<h1>`, labelled sections, skip link, ARIA only where needed
- **Four sections** — Hero, About (with key stats), Features (3 cards) and Contact
- **Mobile-first responsive layout** — CSS Grid/Flexbox with breakpoints at 768px and 1024px, fluid typography with `clamp()`
- **Mobile navigation** — hamburger menu with animated icon; closes on link click, `Esc`, outside click or resize to desktop
- **Dark / light theme** — follows the system setting by default, remembers the user's choice in `localStorage`, no flash on load
- **Contact form validation** — inline, accessible error messages; success message announced to screen readers (no backend)
- **Motion** — scroll-reveal animations, stats that count up when scrolled into view, and a cursor-following spotlight on feature cards
- **Respects `prefers-reduced-motion`** (all animations disabled) and meets WCAG AA color contrast in both themes
- **Works without JavaScript** — all content stays visible; animations only apply when JS is running

## File structure

```
.
├── index.html        # Page markup
├── css/
│   └── styles.css    # Design tokens, glass/gradient utilities, components, themes, media queries
├── js/
│   └── main.js       # Navigation, theme toggle, form validation, scroll reveal, count-up, card spotlight
└── README.md
```

## How to run

No installation needed — open `index.html` in any modern browser.

Optionally, serve it locally (e.g. with the VS Code **Live Server** extension, or `npx serve .`).

Fonts are loaded from Google Fonts, so an internet connection is needed for the intended typography; offline, the page falls back to system fonts.

## Built with AI assistance

This project was built step by step with an AI coding agent (Antigravity) using structured prompts (Role → Context → Task → Requirements → Constraints → Output format). Each prompt produced one commit:

1. `feat: scaffold project and add semantic HTML structure`
2. `style: add design tokens, base styles and mobile-first layout`
3. `feat: add responsive navigation with mobile hamburger menu`
4. `feat: add dark/light theme toggle with saved preference`
5. `feat: add accessible contact form validation`
6. `style: redesign UI with aurora theme, animated hero and glass cards`

All generated code was reviewed and tested in the browser before committing.
