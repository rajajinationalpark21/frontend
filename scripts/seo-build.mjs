/**
 * Post-build SEO step (runs after `vite build`).
 *
 * The site is a client-rendered SPA, so without this every URL ships the same
 * empty <div id="root">. Search engines that render JavaScript cope; most AI
 * answer engines and social link previews do not. For each indexable URL this
 * writes a static HTML file into dist/ carrying that page's own title, meta
 * tags, canonical, JSON-LD and readable text content, taken from the same CMS
 * content the React page renders. The text is visually hidden (it would flash
 * as unstyled text before React mounts) but stays readable to crawlers, and is
 * shown when JavaScript is off. React replaces it when it mounts.
 *
 * Also writes sitemap.xml, robots.txt and llms.txt for the resolved site URL.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTE_SEO, SITE_NAME, ZONE_SLUGS, breadcrumbTrail, sectionSeo } from '../src/seo/routes.js';
import { blogPostingSchema, breadcrumbSchema, faqSchema, zoneSchema } from '../src/seo/schema.js';
import { resolveSiteUrl } from '../vite.config.js';
import { HERO_SIZES, firstHeroImage, heroSrc, heroSrcSet } from '../src/utils/heroImage.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

// ── Environment ─────────────────────────────────────────────────────────────
function readEnvFiles() {
  const values = {};
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    const full = path.join(ROOT, file);
    if (!existsSync(full)) continue;
    for (const line of readFileSync(full, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (match) values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return values;
}

const env = { ...readEnvFiles(), ...process.env };
const SITE_URL = resolveSiteUrl(env);
const API_BASE = (
  env.VITE_API_BASE ||
  env.VITE_BASE_URL_API ||
  env.VITE_API_URL ||
  'https://backend-hbkg.onrender.com/api'
).replace(/\/+$/, '');

async function fetchJson(endpoint) {
  // The API host sleeps when idle, so the first request can take close to a minute.
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, { signal: AbortSignal.timeout(75_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[seo] ${endpoint} attempt ${attempt} failed: ${err.message}`);
    }
  }
  return null;
}

// ── HTML helpers ────────────────────────────────────────────────────────────
const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (text) => (text ? `<p>${rich(text)}</p>` : '');
const h2 = (text) => `<h2>${esc(text)}</h2>`;
const ul = (items) =>
  items?.length ? `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>` : '';
const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const table = (headers, rows) =>
  rows?.length
    ? `<table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table>`
    : '';
const section = (title, body) => (body ? h2(title) + body : '');

// A client page document (CMS `docBlocks`) as plain HTML. `**bold**` and
// `[text](/path)` are kept; gallery markers are dropped.
// Admin marks: **bold**, *italic*, [label](/path).
function rich(text) {
  return esc(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\s][^*]*)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');
}

/** Text without the admin marks, for titles and meta tags. */
const plain = (text) =>
  String(text ?? '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\s][^*]*)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1');

function docHtml(blocks = []) {
  return blocks
    .map((block) => {
      switch (block.t) {
        case 'h2': return `<h2>${rich(block.text)}</h2>`;
        case 'h3': return `<h3>${rich(block.text)}</h3>`;
        case 'p': return `<p>${rich(block.text)}</p>`;
        case 'note': case 'fact': return `<p><strong>${esc(block.label)}:</strong> ${rich(block.text)}</p>`;
        case 'ul': case 'chips': return `<ul>${(block.items || []).map((item) => `<li>${rich(item)}</li>`).join('')}</ul>`;
        case 'ol': return `<ol>${(block.items || []).map((item) => `<li>${rich(item)}</li>`).join('')}</ol>`;
        case 'table': {
          const [head = [], ...rows] = block.rows || [];
          return table(head, rows);
        }
        case 'links': return ul((block.items || []).map((item) => link(item.to, item.label)));
        case 'contact': return p([`Call / WhatsApp: ${(block.phones || []).join(' | ')}`, block.email && `Email: ${block.email}`].filter(Boolean).join(' · '));
        case 'cta': return (block.items || []).some((item) => item.kind === 'booking') ? `<p>${link('/booking', 'Book your Rajaji Jeep Safari online')}</p>` : '';
        default: return '';
      }
    })
    .join('');
}

/** A page that is only its CMS section: heading and client document. */
const docPage = (key) => (c) =>
  `<h1>${esc(c[key]?.title || c[key]?.docTitle)}</h1>${p(c[key]?.subtitle)}` +
  (c[key]?.mapImage ? `<p><img src="${esc(c[key].mapImage)}" alt="${esc(c[key].mapImageAlt)}" loading="lazy"></p>` : '') +
  docHtml(c[key]?.docBlocks);

// ── Page bodies ─────────────────────────────────────────────────────────────
function contactBlock(settings) {
  const contact = settings?.contact ?? {};
  const phones = [contact.phone, contact.secondaryPhone, contact.tertiaryPhone].filter(Boolean);
  return section(
    'Safari Booking & Enquiries',
    p(`Call / WhatsApp: ${phones.join(' | ')}`) +
      p(contact.email && `Email: ${contact.email}`) +
      p(contact.address && `Address: ${contact.address}`) +
      `<p>${link('/booking', 'Book your Rajaji Jeep Safari online')}</p>`
  );
}

function zoneFacts(zone) {
  return table(
    ['Detail', 'Information'],
    [
      ['Entry gate', zone.entryGate],
      ['Cost', zone.gypsyCost],
      ['Duration', zone.duration],
      ['Route', zone.routeKm],
      ['Open season', zone.openSeason],
      ['Timings', zone.timings],
    ].filter(([, value]) => value)
  );
}

const BODY = {
  '/': (c, blogs) =>
    `<h1>${esc(c.home.heroTitle)}</h1>` +
    p(c.home.heroSubtitle) +
    section(c.home.aboutTitle || 'About Rajaji National Park', p(c.home.aboutDescription)) +
    section(
      'Rajaji Jeep Safari Zones',
      ul(c.safari.zones.map((z) => `${link(`/${z.slug}`, z.name)} – ${esc(z.tag)}`))
    ) +
    section(
      'Plan Your Safari',
      ul([
        link('/rajaji-national-park-jeep-safari-tickets-entry-fees-charges', 'Tickets, entry fees and safari charges'),
        link('/wildlife-biodiversity-rajaji-tiger-reserve', 'Wildlife and biodiversity of Rajaji Tiger Reserve'),
        link('/faq', 'Rajaji Jeep Safari FAQ'),
        link('/booking', 'Book a Rajaji Jeep Safari online'),
      ])
    ) +
    section('From the Blog', ul(blogs.slice(0, 6).map((b) => link(`/blog/${b.slug}`, b.title)))) +
    contactBlock(c.settings),

  '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges': (c) => {
    const t = c.tickets;
    return (
      `<h1>${esc(t.title)}</h1>` +
      p(t.subtitle) +
      section(
        'Rajaji Jeep Safari Timings',
        ul([t.timings?.winter, t.timings?.summer, t.timings?.openDates && `Open season: ${t.timings.openDates}`].filter(Boolean).map(esc))
      ) +
      section(
        'Rajaji National Park Entry Fees & Jeep Permit Charges',
        table(['Fee head', 'Indian visitors', 'Foreign visitors', 'Note'], t.entranceFees.map((f) => [f.category, f.indian, f.foreigner, f.note]))
      ) +
      section(
        'Rajaji Jeep Safari Charges by Zone',
        table(['Zone', 'Gypsy cost', 'Capacity'], t.gypsyRates.map((g) => [g.zone, g.rate, g.capacity]))
      ) +
      section('Rajaji Safari Guide Charges', table(['Guide', 'Fee', 'Note'], t.guideFees.map((g) => [g.type, g.fee, g.note]))) +
      section(
        'Photography & Filming Fees',
        table(['Type', 'Indian', 'Foreigner', 'Security', 'Note'], t.filmingFees.map((f) => [f.type, f.indian, f.foreigner, f.security, f.note]))
      ) +
      section('Important Safari Booking Information', ul(t.importantNotes.map(esc))) +
      contactBlock(c.settings)
    );
  },

  '/rajaji-jeep-safari-terms-conditions-cancellation-refund': (c) =>
    `<h1>${esc(c.parkRules.title)}</h1>` +
    p(c.parkRules.subtitle) +
    section('Cancellation & Refund Policy', ul(c.tickets.cancellationPolicy.map(esc))) +
    section("Do's", ul(c.parkRules.dos.map((r) => `<strong>${esc(r.title)}</strong>: ${esc(r.desc)}`))) +
    section("Don'ts", ul(c.parkRules.donts.map((r) => `<strong>${esc(r.title)}</strong>: ${esc(r.desc)}`))),

  '/zones': (c) =>
    '<h1>Rajaji Jeep Safari Zones</h1>' +
    p(c.safari.subtitle) +
    c.safari.zones
      .map((z) => `<h2>${link(`/${z.slug}`, z.name)}</h2>${p(z.tag)}${p(z.description)}${zoneFacts(z)}`)
      .join('') +
    contactBlock(c.settings),

  '/activities': (c) =>
    `<h1>${esc(c.activities.title)}</h1>` +
    p(c.activities.subtitle) +
    c.activities.items.map((a) => `<h2>${link(a.slug, a.title)}</h2>${p(a.tagline)}${p(a.desc)}`).join(''),

  '/about': (c) =>
    `<h1>${esc(c.about?.title)}</h1>` +
    [c.about?.overviewIntro, ...(c.about?.overviewParagraphs ?? [])].map(p).join('') +
    docHtml(c.about?.docBlocks),
  '/rajaji-jeep-safari': docPage('jeepSafari'),
  '/rajaji-national-park-bird-watching-jungle-safari': docPage('birdWatching'),
  '/trekking-in-rajaji': docPage('trekking'),
  '/how-to-reach': docPage('howToReach'),

  '/river-rafting-rishikesh': (c) =>
    `<h1>${esc(c.rafting.title)}</h1>` +
    (c.rafting.docBlocks?.length ? docHtml(c.rafting.docBlocks) : p(c.rafting.overview)) +
    section(
      'Rafting Stretches',
      table(
        ['Stretch', 'Distance', 'Duration', 'Level', 'Rapids', 'Price'],
        c.rafting.stretches.map((s) => [s.name, s.distance, s.duration, s.level, s.rapids, s.price])
      )
    ) +
    section('Safety Guidelines', ul(c.rafting.safetyGuidelines.map(esc))),

  '/stay-near-rajaji-national-park': (c) =>
    `<h1>${esc(c.stay.title)}</h1>` +
    (c.stay.docBlocks?.length ? docHtml(c.stay.docBlocks) : p(c.stay.overview)) +
    section(
      c.stay.wildBrook?.name || 'Eco Cottages',
      p(c.stay.wildBrook?.tagline) + p(c.stay.wildBrook?.location) + ul((c.stay.wildBrook?.features ?? []).map(esc))
    ) +
    section(
      'Forest Rest Houses',
      table(['Rest house', 'Suites', 'Gate', 'Setting'], c.stay.forestRestHouses.map((f) => [f.name, f.suites, f.gate, f.setting])) +
        p(c.stay.frhBookingInfo?.bookingRule)
    ),

  '/wildlife-biodiversity-rajaji-tiger-reserve': (c) =>
    `<h1>${esc(c.fauna.hubDocTitle || 'Wildlife & Biodiversity of Rajaji Tiger Reserve')}</h1>` +
    docHtml(c.fauna.hubDocBlocks) +
    [
      ['/mammals-of-rajaji-tiger-reserve', 'Mammals of Rajaji', c.fauna.overview],
      ['/birds-of-rajaji-national-park', 'Birds of Rajaji', c.birds.overview],
      ['/reptiles-of-rajaji-tiger-reserve', 'Reptiles of Rajaji', c.reptiles.overview],
      ['/butterflies-of-rajaji-national-park', 'Butterflies of Rajaji', c.butterflies.overview],
      ['/flora-of-rajaji-national-park', 'Flora of Rajaji', c.flora.overview],
    ]
      .map(([href, title, text]) => `<h2>${link(href, title)}</h2>${p(text)}`)
      .join(''),

  '/mammals-of-rajaji-tiger-reserve': (c) =>
    `<h1>${esc(c.fauna.title)}</h1>` +
    p(c.fauna.overview) +
    section('Prime Attractions', ul(c.fauna.primeAttractions.map((a) => `<strong>${esc(a.name)}</strong> (${esc(a.count)}): ${esc(a.details)}`))) +
    section('Herbivores', ul(c.fauna.herbivores.map((a) => `<strong>${esc(a.name)}</strong>: ${esc(a.info)}`))) +
    section('Carnivores', ul(c.fauna.carnivores.map((a) => `<strong>${esc(a.name)}</strong>: ${esc(a.info)}`))),

  '/birds-of-rajaji-national-park': (c) =>
    `<h1>${esc(c.birds.title)}</h1>` +
    p(c.birds.overview) +
    c.birds.families.map((f) => h2(f.group) + p(f.desc) + ul(f.species.map(esc))).join(''),

  '/butterflies-of-rajaji-national-park': (c) =>
    `<h1>${esc(c.butterflies.title)}</h1>` +
    p(c.butterflies.overview) +
    section('Butterfly Species of Rajaji', ul(c.butterflies.species.map((s) => `<strong>${esc(s.name)}</strong> (${esc(s.family)}): ${esc(s.habitat)}`))) +
    section('Mud-Puddling', p(c.butterflies.mudPuddling)),

  '/reptiles-of-rajaji-tiger-reserve': (c) =>
    `<h1>${esc(c.reptiles.title)}</h1>` +
    p(c.reptiles.overview) +
    c.reptiles.species.map((s) => `<h2>${esc(s.name)} (<em>${esc(s.scientific)}</em>)</h2>${p(s.habitat && `Habitat: ${s.habitat}`)}${p(s.description)}`).join(''),

  '/flora-of-rajaji-national-park': (c) =>
    `<h1>${esc(c.flora.title)}</h1>` +
    p(c.flora.overview) +
    section('Forest Types by Altitude', ul(c.flora.altitudinalBands.map((b) => `<strong>${esc(b.band)}</strong>: ${esc(b.trees)}`))) +
    section(
      'Common Trees and Plants of Rajaji Tiger Reserve',
      ul(c.flora.dominantTrees.map((t) => `<strong>${esc(t.common)}</strong> (<em>${esc(t.scientific)}</em>): ${esc(t.desc)}`))
    ),

  '/booking': (c) =>
    '<h1>Book Rajaji Jeep Safari Online</h1>' +
    p('Choose your safari date, morning or afternoon slot and safari zone, share the visitor details needed for the permit, and our team will confirm availability, applicable charges and reporting details by WhatsApp or email.') +
    section('Safari Zones', ul(c.safari.zones.map((z) => link(`/${z.slug}`, z.name)))) +
    contactBlock(c.settings),

  '/contact': (c) => '<h1>Contact the Rajaji Safari Booking Desk</h1>' + contactBlock(c.settings),

  '/blog': (c, blogs) =>
    '<h1>Rajaji Safari Blog</h1>' +
    blogs.map((b) => `<h2>${link(`/blog/${b.slug}`, b.title)}</h2>${p(b.summary)}`).join(''),

  '/faq': (c) =>
    `<h1>${esc(c.faqs.title)}</h1>` +
    p(c.faqs.overview) +
    c.faqs.items.map((item) => h2(item.q) + p(item.a)).join('') +
    contactBlock(c.settings),
};

function zoneBody(zone, content) {
  return (
    `<h1>${esc(zone.name)}</h1>` +
    p(zone.tag) +
    p(zone.description) +
    zoneFacts(zone) +
    section('Landscape', p(zone.landscape)) +
    section('Highlights', ul((zone.highlights ?? []).map(esc))) +
    section('Wildlife You May See', ul((zone.wildlife ?? []).map(esc))) +
    p('Wildlife sightings are not guaranteed and depend on animal movement, season, weather and other natural factors.') +
    `<p>${link('/rajaji-national-park-jeep-safari-tickets-entry-fees-charges', 'Rajaji safari tickets, entry fees and charges')} · ${link('/zones', 'All Rajaji safari zones')}</p>` +
    contactBlock(content.settings)
  );
}

function blogBody(post) {
  const paragraphs = String(post.content ?? '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\n{2,}/)
    .map((text) => text.trim())
    .filter(Boolean);
  return `<article><h1>${esc(post.title)}</h1>${p(post.summary)}${paragraphs.map(p).join('')}</article>`;
}

// ── Document assembly ───────────────────────────────────────────────────────
const NAV = [
  ['/', 'Home'],
  ['/about', 'About Rajaji'],
  ['/zones', 'Safari Zones'],
  ['/rajaji-national-park-jeep-safari-tickets-entry-fees-charges', 'Tickets & Fees'],
  ['/wildlife-biodiversity-rajaji-tiger-reserve', 'Wildlife'],
  ['/activities', 'Activities'],
  ['/how-to-reach', 'How to Reach'],
  ['/blog', 'Blog'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
  ['/booking', 'Book Safari'],
];

const absolute = (value) => (/^https?:\/\//.test(value) ? value : `${SITE_URL}${value}`);

function renderPage(template, page) {
  page = { ...page, description: plain(page.description) };
  const url = `${SITE_URL}${page.path}`;
  // A title set in the admin panel is used exactly as written.
  const title = plain((page.cmsTitle || page.title.includes('Rajaji')) ? page.title : `${page.title} | Rajaji National Park`);
  const image = absolute(page.image || '/og-image.png');
  const trail = breadcrumbTrail(page.path, page.name);
  const schemas = [...(page.schemas ?? []), ...(trail.length ? [breadcrumbSchema(trail, SITE_URL)] : [])];

  const setMeta = (html, attr, key, value) =>
    html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), (_, open, close) => open + esc(value) + close);

  let html = template.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  if (page.keywords) html = setMeta(html, 'name', 'keywords', page.keywords);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:type', page.type || 'website');
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, open, close) => open + esc(url) + close);

  // Start downloading the header photo with the HTML, before the app's code
  // runs, so the header shows its photo instead of an empty dark box.
  if (page.image && page.preloadHeader !== false) {
    const srcset = heroSrcSet(page.image);
    const preload =
      `<link rel="preload" as="image" href="${esc(heroSrc(page.image))}"` +
      (srcset ? ` imagesrcset="${esc(srcset)}" imagesizes="${HERO_SIZES}"` : '') +
      ' fetchpriority="high" />';
    html = html.replace('</head>', () => `  ${preload}
  </head>`);
  }

  if (schemas.length) {
    // Same id the <SEO> component manages, so React swaps it instead of duplicating it.
    const json = JSON.stringify(schemas).replace(/</g, '\\u003c');
    html = html.replace('</head>', () => `  <script id="page-json-ld" type="application/ld+json">${json}</script>\n  </head>`);
  }

  const nav = `<nav>${NAV.map(([href, text]) => link(href, text)).join(' · ')}</nav>`;
  const hidden = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
  const body = `<div id="seo-snapshot" style="${hidden}">${nav}<main>${page.body}</main></div>`;
  const noscript =
    '<noscript><style>#seo-snapshot{position:static!important;width:auto!important;height:auto!important;margin:0 auto!important;' +
    'padding:24px 16px!important;overflow:visible!important;clip:auto!important;white-space:normal!important;max-width:880px;' +
    'font-family:system-ui,sans-serif;line-height:1.6}</style></noscript>';
  html = html.replace('</head>', () => `  ${noscript}
  </head>`);
  return html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

async function writePage(routePath, html) {
  const file = routePath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, routePath, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

// ── Main ────────────────────────────────────────────────────────────────────
/**
 * Search engine ownership checks, set in the build environment (Vercel → Settings
 * → Environment Variables) with the codes Google Search Console and Bing
 * Webmaster Tools give you:
 *   VITE_GOOGLE_SITE_VERIFICATION  the content="…" code of the HTML-tag method
 *                                  (several, comma-separated, for several properties)
 *   VITE_GOOGLE_VERIFICATION_FILE  or the file name of the HTML-file method, e.g. google1a2b3c.html
 *   VITE_BING_SITE_VERIFICATION    the content="…" code of Bing's meta-tag method
 * Not needed when the site is verified with a DNS TXT record (Search Console's
 * "Domain" property), which is the recommended way.
 */
function verificationTags() {
  const list = (value) => String(value || '').split(',').map((code) => code.trim()).filter(Boolean);
  return [
    ...list(env.VITE_GOOGLE_SITE_VERIFICATION).map((code) => `<meta name="google-site-verification" content="${esc(code)}" />`),
    ...list(env.VITE_BING_SITE_VERIFICATION).map((code) => `<meta name="msvalidate.01" content="${esc(code)}" />`),
  ];
}

async function writeVerificationFile() {
  const file = String(env.VITE_GOOGLE_VERIFICATION_FILE || '').trim();
  if (!file) return '';
  if (!/^google[a-z0-9]+\.html$/i.test(file)) {
    console.warn(`[seo] VITE_GOOGLE_VERIFICATION_FILE "${file}" is not a Google verification file name; skipped.`);
    return '';
  }
  await writeFile(path.join(DIST, file), `google-site-verification: ${file}`);
  return file;
}

async function main() {
  let template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const tags = verificationTags();
  if (tags.length) template = template.replace('</head>', () => `  ${tags.join('\n    ')}\n  </head>`);
  const verificationFile = await writeVerificationFile();

  // Fallback document for URLs with no prerendered file (aliases, 404s, posts
  // published since the last build). It must not claim the home page's canonical.
  await writeFile(path.join(DIST, 'spa.html'), template.replace(/\s*<link rel="canonical"[^>]*>/, ''));

  if (!SITE_URL) {
    console.warn(
      '[seo] VITE_SITE_URL is not set, so sitemap.xml, robots.txt and prerendered pages were skipped.\n' +
        '      Set VITE_SITE_URL=https://your-domain in the build environment.'
    );
    return;
  }

  const [contentRes, blogsRes] = await Promise.all([fetchJson('content/get'), fetchJson('blogs/get')]);

  // The CMS responses are saved as one cached file that every page names and
  // preloads, so the app renders its first screen without waiting for the API
  // (src/api/client.js reads it, then refreshes from the API after the page loads).
  // A file rather than inline JSON: parsing it inside each page's HTML cost seconds
  // of main-thread time on phones, while the file downloads once per visit.
  const snapshot = {};
  if (contentRes) snapshot.content = contentRes;
  if (blogsRes) snapshot.blogs = blogsRes;
  let snapshotTags = '';
  if (Object.keys(snapshot).length) {
    const json = JSON.stringify(snapshot);
    const file = `assets/cms-${createHash('sha1').update(json).digest('hex').slice(0, 10)}.json`;
    await writeFile(path.join(DIST, file), json);
    snapshotTags =
      `<meta name="cms-snapshot" content="/${file}" />\n` +
      `    <link rel="preload" href="/${file}" as="fetch" crossorigin="anonymous" />`;
  }
  const withSnapshot = (html) => (snapshotTags ? html.replace('</head>', () => `  ${snapshotTags}\n  </head>`) : html);
  await writeFile(path.join(DIST, 'spa.html'), withSnapshot(template.replace(/\s*<link rel="canonical"[^>]*>/, '')));
  const content = contentRes?.data;
  const blogs = (blogsRes?.data?.blogs || blogsRes?.blogs || []).filter((b) => b.slug && b.published !== false);
  const today = new Date().toISOString().slice(0, 10);
  const pages = [];

  for (const [routePath, seo] of Object.entries(ROUTE_SEO)) {
    // SEO settings saved in the admin panel win over the defaults in seo/routes.js.
    const cms = sectionSeo(content, seo);
    // The page's header photo (the one its page component shows first): preloaded
    // with the HTML, and used for link previews and the image sitemap.
    const section = seo.section ? content?.[seo.section] : null;
    const image =
      routePath === '/wildlife-biodiversity-rajaji-tiger-reserve'
        ? section?.hubHeroBanner || firstHeroImage(section)
        : routePath === '/about'
          ? firstHeroImage(content?.home, { list: 'aboutImages', single: 'aboutImage' })
          : firstHeroImage(section);
    pages.push({
      path: routePath,
      ...(image ? { image } : {}),
      ...seo,
      ...(cms.title ? { title: cms.title, cmsTitle: true } : {}),
      ...(cms.description ? { description: cms.description } : {}),
      ...(cms.keywords ? { keywords: cms.keywords } : {}),
      lastmod: content?.updatedAt?.slice(0, 10) ?? today,
      body: content && BODY[routePath] ? BODY[routePath](content, blogs) : '',
      schemas: content && routePath === '/faq' ? [faqSchema(content.faqs.items)] : [],
    });
  }

  for (const zone of content?.safari?.zones ?? []) {
    if (!ZONE_SLUGS.includes(zone.slug)) continue;
    pages.push({
      path: `/${zone.slug}`,
      name: zone.name,
      title: zone.seoTitle || `${zone.name} | Rajaji National Park Jeep Safari`,
      description: zone.metaDescription || zone.description?.slice(0, 160),
      image: firstHeroImage(zone, { single: 'heroImage' }),
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: content.updatedAt?.slice(0, 10) ?? today,
      body: zoneBody(zone, content),
      schemas: [zoneSchema(zone, SITE_URL)],
    });
  }

  for (const post of blogs) {
    pages.push({
      path: `/blog/${post.slug}`,
      name: post.title,
      // Long post titles go without the blog suffix so they stay readable in search results.
      title: post.title.length > 42 ? post.title : `${post.title} | Rajaji Safari Blog`,
      description: post.summary,
      image: post.image,
      preloadHeader: false, // the post page shows its photo in its own layout
      type: 'article',
      priority: 0.6,
      changefreq: 'monthly',
      lastmod: (post.updatedAt || post.createdAt)?.slice(0, 10) ?? today,
      body: blogBody(post),
      schemas: [blogPostingSchema(post, SITE_URL)],
    });
  }

  for (const page of pages) {
    await writePage(page.path, withSnapshot(renderPage(template, page)));
  }

  // Each page's header photo is listed too, so it can appear in Google Images.
  const imageTag = (page) =>
    page.image && /^https?:\/\//.test(page.image) ? `\n    <image:image><image:loc>${esc(page.image)}</image:loc></image:image>` : '';
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    pages
      .map(
        (page) =>
          `  <url>\n    <loc>${esc(SITE_URL + page.path)}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n` +
          `    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>${imageTag(page)}\n  </url>`
      )
      .join('\n') +
    '\n</urlset>\n';
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

  await writeFile(
    path.join(DIST, 'robots.txt'),
    '# Rajaji National Park safari booking site. Every public page may be crawled.\n' +
      'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n' +
      // Booking links carry ?zone=…; the canonical page is /booking.
      'Disallow: /booking?\n\n' +
      `Sitemap: ${SITE_URL}/sitemap.xml\n`
  );

  const zones = content?.safari?.zones ?? [];
  const contact = content?.settings?.contact ?? {};
  const llms =
    `# ${SITE_NAME}\n\n` +
    `> ${ROUTE_SEO['/'].description}\n\n` +
    'Rajaji National Park (Rajaji Tiger Reserve) is in the Shivalik foothills of Uttarakhand, India, near Haridwar, Rishikesh and Dehradun. ' +
    'This site is run by a safari booking desk that arranges jeep safaris in the reserve. Fees and timings are indicative and can be changed by the Forest Department.\n\n' +
    (contact.phone ? `Booking: call or WhatsApp ${contact.phone}${contact.email ? `, email ${contact.email}` : ''}.\n\n` : '') +
    '## Key pages\n\n' +
    Object.entries(ROUTE_SEO)
      .map(([routePath, seo]) => `- [${seo.name}](${SITE_URL}${routePath}): ${seo.description}`)
      .join('\n') +
    '\n\n## Safari zones\n\n' +
    zones.map((z) => `- [${z.name}](${SITE_URL}/${z.slug}): ${z.metaDescription || z.tag}`).join('\n') +
    (blogs.length ? '\n\n## Blog\n\n' + blogs.map((b) => `- [${b.title}](${SITE_URL}/blog/${b.slug}): ${b.summary}`).join('\n') : '') +
    '\n';
  await writeFile(path.join(DIST, 'llms.txt'), llms);

  console.log(
    `[seo] ${SITE_URL}: ${pages.length} pages prerendered${content ? '' : ' (metadata only - API unreachable)'}, sitemap.xml, robots.txt, llms.txt written.` +
      (tags.length ? ` ${tags.length} verification tag(s).` : '') +
      (verificationFile ? ` ${verificationFile} written.` : '')
  );
}

main().catch((err) => {
  console.error('[seo] failed:', err);
  process.exit(1);
});
