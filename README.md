# Basilrun Books

An illustrated static website for W.T. Brooks. Eight book pages across three series, a filterable library, author and privacy pages, and a custom 404. A small keyboard-accessible firefly discovery adds quiet atmosphere.

## Run locally

Requires Node.js 22 or newer. No package dependencies or installation needed.

```sh
npm run dev
```

Open http://localhost:4321. After editing source files, rebuild and refresh. `npm run build` generates `dist/`; `npm run preview` serves it; `npm run check` checks generated internal links, assets, unique book slugs, headings and descriptions.

## Netlify

Connect this GitHub repository in Netlify. The included netlify.toml sets `npm run build` and publish directory `dist`. Netlify's URL environment variable supplies the canonical origin, sitemap and social image URLs. For a custom domain set `url` in `src/data/site.json` which takes precedence over the Netlify URL. No SPA fallback: Netlify uses the generated 404.html for missing routes.

## Content and artwork

- `src/data/books.json`: book metadata. Add a unique slug, title, series, number, genre, short verified description, world palette (`golden`, `highwind`, `westvale`), symbol, optional cover URL, and optional direct Amazon URL. Every entry automatically gets a page and library listing. Add another palette to styles for a new world; update the home filters in build.mjs for a new series.
- `src/data/site.json`: author, brand, description, Amazon author page and canonical domain.
- `public/assets/`: copied directly into the output. Put approved covers in `public/assets/books/`, then set `cover` to `/assets/books/filename.jpg`. Current cloth-like typographic covers are explicitly temporary, not reproductions of published artwork.
- `scripts/build.mjs`: page layouts, reusable cover/card helpers and SEO. All user-editable strings are HTML-escaped.
- `src/styles/styles.css`: global design tokens, responsive layouts, world palettes, and atmospheric animation. All motion honors prefers-reduced-motion.
- `src/scripts/app.js`: progressively enhanced filters and firefly toggle. Content and navigation remain usable without JavaScript. Nothing is stored or sent.

Direct Amazon destinations are not verified yet. Null `amazon` values deliberately produce labeled title-and-author Amazon searches. Replace with confirmed product URLs when available. No prices, ratings or reviews are asserted.

## Future additions

Add characters only with verified descriptions and approved portraits, preferably in a separate `src/data/characters.json`; render them through a helper in the build script. Excerpts, activity sheets and downloads can use the same data-plus-page pattern. No preview text or character art has been copied from Amazon. There are no invented future releases, signup forms, or inactive controls.

The original landscape is a visual metaphor for the website, not canonical book artwork. Its generated provenance and research sources are in CONTENT-SOURCES.md. Seasonal variants can replace the world image and palette without changing content.

## Before a public launch

Supply approved final book covers, verify current catalog and direct Amazon product links, and confirm the author bio. Set the production URL and rebuild. Test the production Netlify domain after connecting it. Browser checks and any remaining limitations are recorded in QA.md.
