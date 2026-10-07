# Decision log

## 2026-10-07 — Ship Color Ritual as a static site

**Context:** The repo held three lo-fi homepage directions inside a Claude-style browser mock. Direction 02 (Color Ritual) was chosen as the real site, to be deployed on Railway.

**Decision:** Build a single static homepage (`index.html`, `css/studio.css`, `js/studio.js`) from Color Ritual. Drop the concept tabs, browser chrome, and the other two directions. Keep booking, silk gallery, and nail-care flows as client-side dialogs. Serve with Railpack’s static file server.

**Alternatives:**
- Keep a single self-contained HTML file (simpler file count, harder to test and edit).
- Add a Node/Express server (more control, extra moving parts for a brochure site).
- Start a framework (Next, Astro) — too much for a first public page.

**Why this:** Matches the “simple HTML/CSS/JS” brief, preserves the watercolor layout, and deploys cleanly on Railway without a build step.

## 2026-10-07 — Light-only Color Ritual palette

**Context:** The mock included `prefers-color-scheme: dark` tokens.

**Decision:** Keep the cream watercolor canvas in light mode only.

**Why this:** The still life, silk studies, and cream footer are designed as a paper surface. Auto dark mode would invert the ritual palette without art direction.
