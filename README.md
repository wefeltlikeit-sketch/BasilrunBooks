# Basilrun Books

Author website for W.T. Brooks — middle-grade mysteries, fantasy, and wonderfully
strange tales. Live at **https://basilrunbooks.com** via Netlify.

## Architecture

Plain static HTML/CSS. **No build step.** Netlify publishes the repository root
(`netlify.toml` → `publish = "."`), so whatever is committed here is what ships.

```
index.html          Home — hero, series grid, author section
westvale.html       Westvale Tales series page
golden-ladle.html   The Golden Ladle Chronicles series page
privacy.html        Privacy notice
404.html            Not-found page (Netlify serves this automatically)
css/styles.css      All site styles — dark v3 art direction
assets/*.webp       Cover art and brand mark
assets/favicon.svg  Favicon
assets/og-basilrun.jpg  Open Graph / social share image
_redirects          301s from the pre-redesign URL structure
robots.txt          Crawl policy + sitemap pointer
sitemap.xml         Static sitemap — update when adding a page
```

## Working on the site

There is nothing to install and nothing to compile. Edit the HTML and CSS
directly, then preview:

```bash
python3 -m http.server 8080
# http://localhost:8080/
```

## When you add a page

1. Copy the `<head>` block from an existing page and update `title`,
   `description`, `canonical`, `og:url`, `og:title`, `og:description`, and the
   JSON-LD `<script>`.
2. Keep the `google-site-verification` meta tag — removing it un-verifies the
   property in Google Search Console.
3. Add the new URL to `sitemap.xml`.
4. Add a nav link in the header and footer of every other page.

## History

Before the dark v3 redesign this repo was a Node static-site generator
(`scripts/build.mjs` reading `src/data/books.json`, publishing to `dist/`). It
produced a cream-toned catalog with a detail page for each of the ten titles.

That version is preserved in full:

- branch `archive/pre-dark-redesign`
- tag `archive/pre-dark-redesign-tag`

`_redirects` maps every URL that version published to its closest equivalent
here, so nothing that was indexed returns a 404.
