# reflecsia.app — marketing site

Static HTML/CSS/JS for `https://reflecsia.app`. No build step.

## Files

```
web/
├── index.html          EN landing
├── ru.html             RU landing
├── style.css           shared styles (~22 KB)
├── script.js           FAQ accordion + scroll detect + lang persistence + waveform render
├── privacy.html        Privacy Policy (restyled, copy unchanged)
├── terms.html          Terms of Service (restyled, copy unchanged)
├── delete.html         Account Deletion (restyled, copy unchanged)
├── press.html          Press Kit
├── icon.png            App icon (512×512, ~200 KB)
├── og-image-en.png     OG / Twitter card EN (1024×500 — feature graphic v2)
├── og-image-ru.png     OG / Twitter card RU
└── assets/
    ├── en/screen-*.png  8 Play Console screenshots, English
    └── ru/screen-*.png  8 Play Console screenshots, Russian
```

## Conventions

- **No framework.** Plain HTML, vanilla JS. The orb glyph and waveform are inline SVGs.
- **Inter font** loaded from Google Fonts with cyrillic + latin subsets. System-stack fallback is fine.
- **Lang switching:** `index.html` is EN, `ru.html` is RU. Toggle in nav swaps URL. `localStorage['rf-lang']` persists choice; on revisits to the default `/`, returning RU users get auto-redirected to `/ru.html` once per session.
- **Anchors with smooth scroll:** internal `#privacy`, `#faq` etc. handled by `script.js` with an 80px sticky-nav offset.
- **A11y:** every decorative SVG `aria-hidden`. FAQ is keyboard-operable buttons with `aria-expanded`. `prefers-reduced-motion` disables the hero waveform animation.

## Deploying

The site is fully static. Drop these options:

- **Vercel / Netlify / Cloudflare Pages** — connect the repo, set publish dir to `web/`, no build command.
- **GitHub Pages** — push `web/` contents to `gh-pages` branch root.
- **Any S3/CloudFront** — upload `web/` recursively.

DNS for `reflecsia.app` is managed externally — point to whatever target the chosen host wants.

## Editing copy

Both EN and RU landing pages are independent HTML files — change the copy in place. The wedge / privacy / FAQ blocks are pulled verbatim from `_sessions/26-04-06-marketing-april-2026/05-03-aso-deliverables.md` (the canonical voice). Don't drift; if anything changes, change the canonical file too.

## Updating screenshots

Replace the relevant file in `assets/en/` or `assets/ru/`. Filenames are fixed (`screen-home.png`, `screen-recording.png`, `screen-insights.png`, `screen-entry.png`, `screen-week.png`, `screen-themes.png`, `screen-calendar.png`, `screen-export.png`). Recapture script: see app repo `scripts/adb-screenshot.sh`.
