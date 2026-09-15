import { readFile, mkdir, writeFile, cp, rm } from "node:fs/promises";
const site = JSON.parse(await readFile("src/data/site.json"));
const books = JSON.parse(await readFile("src/data/books.json"));
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const base = (site.url || process.env.URL || "").replace(/\/$/, "");
const amazon = (b) =>
  b.amazon ||
  "https://www.amazon.com/s?k=" + encodeURIComponent(b.title + " W.T. Brooks");
const external = (url, label, cls = "") =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true"> ↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
const logo = `<span class="brand-icon" aria-hidden="true">❧</span><span>Basilrun<span class="brand-small">B O O K S</span></span>`;
function layout(
  title,
  body,
  path = "/",
  description = site.description,
  schema = {},
) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · Basilrun Books</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#f7f3e8">${base ? `<link rel="canonical" href="${base + path}"><meta property="og:url" content="${base + path}">` : ""}<meta property="og:title" content="${esc(title)} · Basilrun Books"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website">${base ? `<meta property="og:image" content="${base}/assets/world/basilrun.jpg">` : ""}<meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer></script><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...schema }).replace(/</g, "\\u003c")}</script></head><body><a class="skip" href="#main">Skip to content</a><header><a class="brand" href="/" aria-label="Basilrun Books home">${logo}</a><nav aria-label="Main navigation"><a href="/#books">The books</a><a href="/#worlds">Explore Basilrun</a><a href="/author/">Meet the author</a></nav>${external(site.amazon, "Find a book", "nav-buy")}</header>${body}<footer><a class="brand" href="/">${logo}</a><p>A little wonder. A new adventure. One more chapter.</p><div><a href="/#books">The books</a><a href="/author/">W.T. Brooks</a><a href="/privacy/">Privacy</a>${external(site.amazon, "Amazon")}</div><small>© ${new Date().getFullYear()} Basilrun Books · Stories by W.T. Brooks</small><span class="footer-leaf" aria-hidden="true">❧</span></footer></body></html>`;
}
function cover(b) {
  return b.cover
    ? `<img class="real-cover" src="${esc(b.cover)}" alt="${esc(b.title)} book cover" width="300" height="450" loading="lazy">`
    : `<div class="book-cover ${b.world}" aria-label="${esc(b.title)} — temporary typographic cover"><span class="cover-series">${esc(b.series)}</span><span class="cover-symbol" aria-hidden="true">${b.symbol}</span><span class="cover-title">${esc(b.title)}</span><span class="cover-author">W.T. BROOKS</span></div>`;
}
const card = (b) =>
  `<article class="book-item" data-world="${b.world}"><a class="book-object" href="/books/${b.slug}/">${cover(b)}</a><p class="eyebrow">${esc(b.series)}${b.number ? ` · ${b.number}` : ""}</p><h3><a href="/books/${b.slug}/">${esc(b.title)}</a></h3><a class="text-link" href="/books/${b.slug}/">Discover the story <span aria-hidden="true">↗</span></a></article>`;
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
await cp("src/styles/styles.css", "dist/styles.css");
await cp("src/scripts/app.js", "dist/app.js");
async function page(path, html) {
  const file = path.endsWith(".html")
    ? "dist" + path
    : "dist" + path + "index.html";
  await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(file, html);
}
const home = `<main id="main"><section class="hero" aria-labelledby="welcome"><img class="landscape" src="/assets/world/basilrun.jpg" alt="An illustrated path winds through wildflower meadows to a warmly lit library cottage, with a castle and a distant city beyond." width="1536" height="1024" fetchpriority="high"><div class="hero-copy"><p class="eyebrow"><span aria-hidden="true">✦</span> STORIES BY W.T. BROOKS</p><h1 id="welcome">There’s a whole world<br>between the <em>pages.</em></h1><p>For curious minds, brave hearts,<br>and anyone who’s ever said “one more chapter.”</p><a class="button" href="#books">Find your next adventure <span aria-hidden="true">→</span></a></div><a class="scene-sign library-sign" href="#books"><span aria-hidden="true">▤</span> The library <span aria-hidden="true">↗</span></a><button class="firefly" aria-label="Discover a little magic" aria-expanded="false">✦</button><p class="magic-note" hidden>Some paths begin with a single page.</p><span class="mote mote-one" aria-hidden="true"></span><span class="mote mote-two" aria-hidden="true"></span><div class="hero-caption">A LITTLE CURIOSITY GOES A LONG WAY <span aria-hidden="true">↓</span></div></section><section class="intro section" id="worlds"><p class="eyebrow">WELCOME TO BASILRUN</p><h2>Not all adventures<br>start far from home.</h2><p>Some start with a secret. Some with a little magic.<br>Some with a peculiar town. Others with a scientific puzzle.</p><div class="world-paths"><a href="#books" data-filter-link="golden"><span class="world-icon golden">✧</span><span><strong>A taste of mystery</strong><small>The Golden Ladle Chronicles</small></span><span>↗</span></a><a href="#books" data-filter-link="highwind"><span class="world-icon highwind">♜</span><span><strong>A world of magic</strong><small>Apprentices &amp; The Highwind Network</small></span><span>↗</span></a><a href="#books" data-filter-link="westvale"><span class="world-icon westvale">☾</span><span><strong>The wonderfully weird</strong><small>Westvale Tales</small></span><span>↗</span></a><a href="#books" data-filter-link="mobius"><span class="world-icon mobius">∞</span><span><strong>Science meets adventure</strong><small>The Möbius Unit</small></span><span>↗</span></a></div></section><section class="library section" id="books"><div class="section-heading"><div><p class="eyebrow">THE BASILRUN LIBRARY</p><h2>Your next chapter awaits.</h2></div><p>Pick a book.<br>See where it takes you.</p></div><div class="filters" aria-label="Filter books by story world" hidden><button data-filter="all" aria-pressed="true">All stories</button><button data-filter="golden" aria-pressed="false">The Golden Ladle</button><button data-filter="highwind" aria-pressed="false">Highwind</button><button data-filter="westvale" aria-pressed="false">Westvale</button><button data-filter="mobius" aria-pressed="false">The Möbius Unit</button></div><p class="art-note">Temporary cover designs shown. Explore each title for more.</p><div class="book-grid">${books.map(card).join("")}</div><p class="sr-only" id="filter-status" aria-live="polite"></p></section><section class="author-teaser section"><div class="desk-art" aria-hidden="true"><div class="paper"><span>A little invitation<br>to imagine</span><i>Every story starts<br>with a little<br>“what if?”</i><b>Welcome to Basilrun</b></div><span class="ink">✒</span><span class="leaf">❧</span></div><div><p class="eyebrow">BEHIND THE STORIES</p><h2>A curious mind.<br>A world of possibilities.</h2><p>Meet W.T. Brooks, the author behind the mysteries, magic, and peculiar places on these shelves.</p><a class="text-link" href="/author/">Pull up a chair <span aria-hidden="true">→</span></a></div></section><section class="closing"><span aria-hidden="true">✧</span><h2>Leave a little room for wonder.</h2><p>There’s always another story waiting.</p>${external(site.amazon, "Explore W.T. Brooks on Amazon", "button")}</section></main>`;
await page(
  "/",
  layout("A world between the pages", home, "/", site.description, {
    "@type": "WebSite",
    name: site.name,
    ...(base ? { url: base } : {}),
  }),
);
for (const b of books) {
  const related = books.filter(
    (x) => x.world === b.world && x.slug !== b.slug,
  );
  const suggestions = related.length ? related : books.filter((x) => x.slug !== b.slug).filter((x) => x.number === 1).slice(0, 3);
  await page(
    "/books/" + b.slug + "/",
    layout(
      b.title,
      `<main id="main" class="book-page"><div class="breadcrumb"><a href="/#books">← Back to the library</a></div><section class="book-detail section ${b.world}"><div class="detail-cover">${cover(b)}${!b.cover ? '<p class="art-note">Temporary typographic cover · final artwork to come</p>' : ""}</div><div><p class="eyebrow">${esc(b.series)}${b.number ? ` · BOOK ${b.number}` : " · STORY COLLECTION"}</p><h1>${esc(b.title)}</h1><p class="genre">${esc(b.genre)}</p><p class="synopsis">${esc(b.description)}</p>${external(amazon(b), b.amazon ? "See the book on Amazon" : "Find this title on Amazon", "button")}<p class="purchase-note">${b.amazon ? "View available editions and purchase on Amazon." : "Opens an Amazon search for this title and W.T. Brooks."}</p><details><summary>Choosing a book for a reader?</summary><p>Check the Amazon listing for the current description, reading age, available formats, and any sample supplied by the author.</p></details></div></section><section class="section"><p class="eyebrow">KEEP EXPLORING</p><h2>${related.length ? (b.world === "highwind" ? "More from the world of Highwind" : `More from ${esc(b.series)}`) : "Another adventure awaits"}</h2><div class="book-grid related">${suggestions.map(card).join("")}</div></section></main>`,
      "/books/" + b.slug + "/",
      b.description,
      {
        "@type": "Book",
        name: b.title,
        author: { "@type": "Person", name: site.author },
        isPartOf: { "@type": "BookSeries", name: b.series },
      },
    ),
  );
}
await page(
  "/author/",
  layout(
    "Meet W.T. Brooks",
    `<main id="main"><section class="author-page section"><p class="eyebrow">THE AUTHOR’S CORNER</p><h1>A little curiosity.<br>A lot of possibility.</h1><p class="large-copy">Meet W.T. Brooks.</p><p>Travel, science, and a love of storytelling help inspire W.T. Brooks’s imaginative books for middle grade readers. His adventures on the page range from culinary mysteries to medieval magic and the wonderfully odd.</p><p>His real-world companion is Basil, a St. Bernard.</p><p>Here in Basilrun, every shelf is an invitation to explore.</p>${external(site.amazon, "Visit W.T. Brooks on Amazon", "button")}<p class="source-note">Author information adapted from the <a href="https://www.abebooks.com/author/b0fhgf8syt/w-t-brooks" target="_blank" rel="noopener noreferrer">published author profile ↗</a>.</p></section><img class="author-landscape" src="/assets/world/basilrun.jpg" width="1536" height="1024" alt="The warm, imagined landscape of Basilrun" loading="lazy"></main>`,
    "/author/",
    "Meet W.T. Brooks, author of imaginative mysteries, fantasy adventures, and strange tales.",
    { "@type": "Person", name: "W.T. Brooks" },
  ),
);
await page(
  "/privacy/",
  layout(
    "Privacy",
    `<main id="main" class="prose section"><p class="eyebrow">A QUIET CORNER</p><h1>Privacy, simply.</h1><p>This website does not use analytics, advertising trackers, accounts, or sign-up forms. It does not ask children or adults to submit personal information.</p><h2>Following a book to Amazon</h2><p>Amazon and other external websites have their own privacy policies. They apply when you follow a link away from Basilrun Books.</p><h2>Website hosting</h2><p>The hosting provider may process standard request information, such as IP addresses, to deliver and secure this website.</p><h2>Little discoveries</h2><p>Interactive features work in your browser. Your selections are not sent to us or saved between visits.</p><a class="text-link" href="/">Back to Basilrun →</a></main>`,
    "/privacy/",
  ),
);
await page(
  "/404.html",
  layout(
    "A path less traveled",
    `<main id="main" class="lost section"><p class="eyebrow">404 · A LITTLE LOST</p><span aria-hidden="true">❧</span><h1>This path wandered<br>out of the story.</h1><p>Let’s find our way back to the books.</p><a class="button" href="/">Back to Basilrun →</a></main>`,
  ),
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${base ? "Sitemap: " + base + "/sitemap.xml\n" : ""}`,
);
if (base)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/author/", "/privacy/", ...books.map((b) => "/books/" + b.slug + "/")].map((p) => `<url><loc>${esc(base + p)}</loc></url>`).join("")}</urlset>`,
  );
console.log(
  `Built ${books.length} book pages plus home, author, privacy and 404.${base ? "" : " Set site.url or URL for canonical metadata and sitemap."}`,
);
