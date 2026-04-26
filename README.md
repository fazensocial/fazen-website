# fazen-website

Personal branding website for **FazenSocial**, the portfolio and landing page for Hafaz Sofyan, Graphic Designer.

## Tech Stack

- **Next.js 16.2.4** with the App Router
- **React 19.2.4**
- **Tailwind CSS v4** using CSS-first theme tokens in `app/globals.css`
- **Framer Motion 12** for interaction and page motion
- **Lucide React** for UI icons

## Getting Started

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Before opening a pull request or handing off changes, run:

```bash
npm run lint
npm run build
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint with the Next.js core web vitals config |

## Project Structure

```text
app/
  globals.css                  # Tailwind import, theme tokens, base styles, shared utilities
  layout.js                    # Root HTML shell, metadata, local fonts, global navbar
  page.js                      # Homepage section composition
  soon/page.js                 # Shared placeholder page for unfinished nav destinations
  components/
    ui/Navbar.jsx              # Fixed responsive navbar and primary nav links
    sections/*.jsx             # Homepage sections rendered in app/page.js
public/
  fonts/                       # Local brand fonts loaded with next/font/local
  images/                      # Homepage, resource, and future page imagery
  images/IMAGE-GUIDE.md        # Asset naming, sizing, and folder guide
```

The root route is built by importing each section in `app/page.js`. To add, remove, or reorder homepage content, update that file first, then edit or create the matching file in `app/components/sections/`.

## Contributor Notes

- Global brand tokens live in `app/globals.css` under `@theme`: `void`, `fazen`, `white-soft`, and the font-family aliases.
- Use `page-container` for section-level horizontal spacing so new sections align with the existing layout.
- The navbar is a client component because it owns mobile menu state and Framer Motion transitions. Keep static layout work in server components unless interactivity is needed.
- Internal links currently route most unfinished destinations to `/soon`. Update `NAV_LINKS` in `app/components/ui/Navbar.jsx` when real pages are added.
- The `@/*` path alias points to the repository root via `jsconfig.json`, so imports such as `@/app/components/...` are available if a file gets deeply nested.

## Assets And Content

Use files under `public/` for static assets. Existing important assets include:

- `public/fonts/Sharone.woff2`
- `public/fonts/ClashGrotesk-Medium.woff2`
- `public/fonts/ClashGrotesk-Semibold.woff2`
- `public/images/homepage/hafaz.jpg`
- `public/images/resources/featured-products/*.webp`
- `public/og-image.png`
- `public/favicon.png`

For new imagery, follow `public/images/IMAGE-GUIDE.md` so file names, dimensions, and folders stay predictable across future Works, Services, Resources, and Pricing pages.

## Adding A New Page

1. Create a route folder under `app/`, for example `app/services/page.js`.
2. Build reusable page sections in `app/components/sections/` when the section may appear on more than one page.
3. Add or update static assets under `public/images/` using the image guide.
4. Point the relevant navbar item away from `/soon` in `app/components/ui/Navbar.jsx`.
5. Run `npm run lint` and `npm run build`.
