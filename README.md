# Fluid Design

### Digital experiences, shaped to flow.

Fluid Design is a responsive, multi-page web concept exploring liquid-inspired imagery, glass surfaces, visual identity, and restrained motion. It is a self-contained static site built with HTML, CSS, and vanilla JavaScript; there is no build step, package installation, or server-side code.

The four projects are illustrative concept studies, not commissioned client work or claims of measured outcomes.

## Explore the site

| Page | What it contains |
| --- | --- |
| [`index.html`](index.html) | Landing page, featured Glass UI concept, capabilities, and Playground entry point |
| [`about.html`](about.html) | Design principles, skills, and a four-step process |
| [`work.html`](work.html) | Filterable Interface, Brand, Motion, and Web concept cards |
| [`work/interface-concept.html`](work/interface-concept.html) | Glass UI interface case study |
| [`work/brand-concept.html`](work/brand-concept.html) | Minimal Brand identity case study |
| [`work/motion-concept.html`](work/motion-concept.html) | Fluid Motion interaction case study |
| [`work/web-concept.html`](work/web-concept.html) | Open Space editorial web case study |
| [`playground.html`](playground.html) | Interactive glass panel customizer with CSS copy and reset |
| [`contact.html`](contact.html) | Static email contact example with copy action and enquiry prompts |
| [`404.html`](404.html) | Custom not-found page for static hosting |
| [`fluid-index.html`](fluid-index.html) | Legacy redirect to `index.html` |

## Features

- Responsive page layouts and a shared navigation menu
- Keyboard-accessible menu with Escape-to-close, outside-click close, focus return, hidden-state handling, and mobile scroll lock
- Work filters that enhance the page when JavaScript is available; all case studies remain visible without it
- Case studies describing project type, year, role, tools, goals, constraints, design exploration, decisions, and learning
- Fluid Playground controls for color, gradient direction, blur, opacity, border radius, background, and motion
- Generated CSS with clipboard copy and reset controls; uses embedded presets and local assets without `fetch()`
- A subtle pointer-responsive ambient gradient, limited to fine pointer devices and paused for reduced-motion preferences and hidden tabs
- Explicitly sized, lazy-loaded concept thumbnails and compressed WebP image variants with JPEG/PNG CSS fallbacks
- Page-specific titles and descriptions, Open Graph metadata, and a local SVG favicon
- Reduced-motion styles and usable page content when JavaScript is disabled

## Project structure

```text
.
├── index.html
├── about.html
├── work.html
├── work/
│   ├── interface-concept.html
│   ├── brand-concept.html
│   ├── motion-concept.html
│   └── web-concept.html
├── playground.html
├── contact.html
├── 404.html
├── fluid-index.html
├── favicon.svg
├── css/
│   └── flui-skin.css
├── js/
│   ├── site.js
│   ├── work.js
│   ├── playground.js
│   └── contact.js
├── img/
│   ├── bg*.jpg
│   ├── bg*.webp
│   ├── bubble.png
│   └── bubble.webp
└── fontawesome-free-5.15.4-web/
```

`css/flui-skin.css` contains shared styles and theme variables. `js/site.js` handles navigation and the ambient pointer effect; individual scripts enhance work filtering, the Playground, and the copy-email action. The bundled Font Awesome files are local; the site does not load third-party scripts, fonts, or icons at runtime.

## Run locally

Open `index.html` directly, or run a static server from the project directory:

```bash
python3 -m http.server 8000
```

Visit [http://localhost:8000](http://localhost:8000). The Playground uses no `fetch()` calls, so its presets and assets also work when opening the page via `file://`.

## Customize

1. Replace the sample `hello@example.com` address in `contact.html` and its matching `data-email` value.
2. Edit the case study copy and replace the illustrative concepts and moodboard images with your own work, if desired.
3. Update theme variables near the top of `css/flui-skin.css`.
4. Add real profile links only if you want social links in the shared navigation.

The Playground’s color presets are defined directly in `js/playground.js`; its background options use local image files listed in the HTML select.

## Licenses

The project is distributed under the GNU General Public License v3.0; see [`LICENSE`](LICENSE).

Font Awesome Free 5.15.4 is bundled under its own licenses: icons are CC BY 4.0, web fonts are SIL OFL 1.1, and code is MIT. See [`fontawesome-free-5.15.4-web/LICENSE.txt`](fontawesome-free-5.15.4-web/LICENSE.txt) and included attribution notices. Font Awesome brand icons are trademarks of their respective owners.

---

Made to feel clear, calm, and a little fluid.
