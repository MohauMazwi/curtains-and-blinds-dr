# Curtains & Blinds Dr — Project Configuration

## Overview
Premium Shopify-style e-commerce website for **Curtains & Blinds Dr**, a luxury custom curtains and blinds company. Scandinavian minimal editorial design with warm neutral tones.

## Tech Stack
- **HTML5** — Semantic, accessible markup
- **CSS3** — Vanilla CSS with custom properties (design tokens), no frameworks
- **JavaScript** — Vanilla ES6+, no dependencies
- **Fonts** — Google Fonts: Playfair Display (serif headings), Inter (sans-serif body)

## Project Structure
```
├── index.html              Homepage (hero slideshow, categories, editorial, Instagram, CTA)
├── collection.html         Collection page (filter bar, product grid, sorting)
├── product.html            Product page (gallery, swatches, accordion, sticky cart)
├── css/
│   ├── tokens.css          Design tokens (colors, typography, spacing, shadows)
│   ├── base.css            CSS reset, typography scale, animation classes
│   ├── components.css      All reusable components (buttons, cards, accordion, etc.)
│   ├── layout.css          Header, footer, mobile menu, grid utilities
│   ├── homepage.css        Homepage-specific styles
│   ├── collection.css      Collection page styles (filter bar, product grid)
│   └── product.css         Product page styles (gallery, options, sticky cart)
├── js/
│   └── main.js             All interactions (slideshow, sticky header, accordion, etc.)
└── images/                 AI-generated lifestyle imagery (PNG)
```

## Design Tokens
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F6F3EE` | Primary background |
| `--bg-section` | `#EDE7DE` | Alternate section background |
| `--text-primary` | `#1A1A1A` | Headings and body text |
| `--accent` | `#8F7D6A` | Buttons, links, active states |
| `--radius` | `6px` | Border radius for cards and buttons |

## Key Design Patterns

### Glassmorphism Header
All sticky bars (header, filter bar, sticky cart) use:
```css
background: rgba(246, 243, 238, 0.55);
backdrop-filter: blur(20px) saturate(1.6);
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
```

### Hero Timelapse Slideshow
5-slide crossfade with Ken Burns zoom effect. Auto-advances every 5 seconds with labeled progress indicator bars. Manual click-to-jump supported.

### Fade-in Animations
Elements with `.fade-in`, `.fade-in-left`, or `.fade-in-right` classes trigger on scroll via IntersectionObserver.

## Component Library
| Component | CSS Class | Description |
|---|---|---|
| Primary Button | `.btn .btn--primary` | Warm brown background, white text |
| Secondary Button | `.btn .btn--secondary` | Outlined accent border |
| Product Card | `.product-card` | Image with hover zoom/reveal |
| Collection Tile | `.collection-tile` | Full-bleed image with overlay title |
| Swatch Selector | `.swatch-selector` | Circular color swatches with active ring |
| Accordion | `.accordion` | Smooth expand/collapse with `+`/`−` icon |
| Testimonial | `.testimonial` | Large centered quote block |
| CTA Section | `.cta-section` | Warm background with centered CTA |
| Instagram Grid | `.insta-grid` | 6-column responsive image grid |

## Running Locally
```powershell
# PowerShell HTTP server (no dependencies required)
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:3000/')
$listener.Start()
# Serves all files from the project root
```

Or use any static file server:
```bash
npx http-server -p 3000
# or
python -m http.server 3000
```

## Coding Conventions
- **BEM naming**: `.block__element--modifier` for all CSS classes
- **CSS custom properties** for all design tokens — never hardcode values
- **Mobile-first responsive**: Breakpoints at 768px and 1024px
- **Semantic HTML**: Use `<section>`, `<nav>`, `<main>`, `<article>`, `<footer>`
- **ARIA attributes**: All interactive elements include proper labels
- **Lazy loading**: All below-fold images use `loading="lazy"`
- **No dependencies**: Pure vanilla HTML/CSS/JS, Shopify-compatible structure
