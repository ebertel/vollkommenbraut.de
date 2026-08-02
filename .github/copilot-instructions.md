# Copilot Instructions for `vollkommenbraut.de`

## Build, test, and lint commands

This repository is a static site with a Tailwind build step. There is currently **no automated test runner** and **no lint script** configured in `package.json`.

| Purpose | Command | Notes |
|---|---|---|
| Install dependencies | `npm ci` | Required before Tailwind commands |
| Build CSS | `npm run tailwind:build` | Compiles `site/templates/styles/tailwind.input.css` to `site/templates/styles/tailwind.css` (minified) |
| Watch CSS during editing | `npm run tailwind:watch` | Rebuilds Tailwind output on file changes |
| Local site preview | `python server.py` | Runs on `http://localhost:8082` with custom 404 handling |
| Single-page smoke check | `python server.py` then open one route (example: `http://localhost:8082/kontakt/`) | Use this as the “single test” equivalent in this repo |

## High-level architecture

- **Static multi-page site**: each route is a directory with its own `index.html` (`/`, `/kontakt/`, `/brautkleider/…`, etc.).
- **Shared legacy theme layer**: common layout/nav/footer styles and behavior come from:
  - `site/templates/styles/main.css`
  - `site/templates/scripts/main.js`
  - jQuery plugins in `site/templates/scripts/` (ResponsiveSlides, Fancybox).
- **Tailwind layer on top**:
  - Source: `site/templates/styles/tailwind.input.css`
  - Config: `tailwind.config.js`
  - Built artifact committed to repo: `site/templates/styles/tailwind.css`
  - Pages include both `main.css` and `tailwind.css`; many components use a hybrid of legacy classes + Tailwind utilities.
- **Global behavior scripts**:
  - `fixed-cta.js` injects mobile bottom CTA and supports per-page delay via `data-cta-delay`.
  - `cookie-consent.js` controls consent state and conditionally loads Google Ads/gtag.
- **Deployment model**:
  - GitHub Pages deploys the repository root as static artifact (`.github/workflows/static.yml`).
  - Netlify is used for PR/branch previews (`netlify.toml`, PR preview workflows).

## Key conventions (repo-specific)

- **Preserve dual CSS system**: do not remove `main.css` includes when editing pages; Tailwind is additive, not a full replacement.
- **Rebuild Tailwind on utility/class/config changes**: when editing Tailwind classes/config/input CSS, run `npm run tailwind:build` and commit updated `site/templates/styles/tailwind.css`.
- **Keep path style consistent by page depth**:
  - Root page uses root-relative references.
  - Nested pages use `../` prefixes for shared assets.
- **Booking conversion pattern is standardized**:
  - Booking URL points to Shore (`connect.shore.com/...`).
  - Conversion click tracking uses `gtag('event', 'conversion', {'send_to': 'AW-867464507/fnGdCK3GxpIDELvq0Z0D'})`.
- **SEO metadata is treated as required page content**:
  - Every page should keep/update unique `<title>`, meta description, canonical URL, and OpenGraph fields.
  - Follow `.github/SEO.md`: strong topic focus per page, meaningful text depth, internal linking, and explicit image `alt` text.
- **Design/copy direction for landing content** (from `.github/copilot-landingpage.md` and `.github/techstack.md`):
  - Mobile-first, emotional tone, short scannable blocks.
  - Soft rounded shapes (`rounded-full`, `rounded-xl`, `rounded-2xl`) and calm motion (`animate-hero-reveal`, `animate-fade-in-up`).
  - Prefer one primary CTA voice (“Deine Anprobe erleben” style).
- **Cache-busting query strings are intentional** on shared CSS includes (for example `main.css?v=...`); keep them coherent when rolling out global styling updates.
