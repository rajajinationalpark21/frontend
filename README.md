# Jungle Safari — Public Website

React 19 + Vite + Tailwind site for Rajaji National Park jeep-safari booking assistance. Page content comes from the CMS (`../backend`, edited in `../admin`). The build prerenders every page as static HTML for search engines and AI crawlers.

- Live: `https://rajajinationalparkdemo.vercel.app` (Vercel). The main domain `rajajiinationalpark.com` is being connected.
- API: `https://backend-hbkg.onrender.com/api`

## Run locally

```bash
npm install
cp .env.example .env    # VITE_API_BASE=http://localhost:4000/api for a local backend
npm run dev             # http://localhost:5173
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_API_BASE` | Backend API base URL. If unset, the code falls back to the production API, so set it for local work |
| `VITE_SITE_URL` | Public site address, used for canonical URLs, the sitemap and link previews. On Vercel it defaults to the project's production domain |
| `VITE_GOOGLE_SITE_VERIFICATION` | Optional. Google Search Console's HTML-tag code (the `content` value; comma-separate several). Added to every page |
| `VITE_GOOGLE_VERIFICATION_FILE` | Optional. Google's HTML-file method: the file name it gives you, e.g. `google1a2b3c.html`. The build writes the file |
| `VITE_BING_SITE_VERIFICATION` | Optional. Bing Webmaster Tools' meta-tag code |

Search engines: the build writes `sitemap.xml` (with each page's header photo), `robots.txt` and `llms.txt` for `VITE_SITE_URL`. The verification codes are only needed for a URL-prefix property; a Search Console **Domain** property is verified with a DNS TXT record instead. `vercel.json` sends `rajajinationalparkdemo.vercel.app` to `www.rajajiinationalpark.com` so search engines see one site.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `vite build`, then `scripts/seo-build.mjs`. That script fetches the CMS and writes one HTML file per page plus `sitemap.xml`, `robots.txt` and `llms.txt` |
| `npm run lint` | oxlint |
| `npm run preview` | Serve the build |

## How pages get their content

- `src/api/client.js` fetches `content/get` once per page load and shares the result between components.
- **Pages from client documents.** Each one renders its section's `docBlocks` with `components/DocContent.jsx`. `components/CmsDocPage.jsx` renders the pages that are only a document: Jeep Safari, Bird Watching, Trekking and How to Reach.
- **The menu** comes from `settings.navigation`. The booking wording comes from `settings.ctaCopy`.
- **SEO.**
  - `src/seo/routes.js` holds the default title and description for each URL and maps it to its CMS section. SEO fields saved in the admin take precedence.
  - `ALIASES` lists old URLs that redirect.
  - `vercel.json` holds the matching 308 redirects.
- **URLs changed in the admin.** `components/CmsSlugRoute.jsx` resolves them.
- **Spam trap.** The booking, contact and feedback forms include a hidden spam-trap field (`components/HoneypotField.jsx`), which the server checks.

## Layout

```
src/
  pages/        one component per route
  components/   shared UI (Navbar, Footer, PageHero, DocContent, CmsDocPage, ZoomableImage…)
  seo/          route metadata, JSON-LD builders
  api/          API client
  data/         fallback data used only when the CMS can't be reached
scripts/        seo-build.mjs (prerender)
public/         static images, logo, favicons
```

## Deploy

Vercel builds `npm run build` from `main`. Set `VITE_API_BASE` (and `VITE_SITE_URL` once the main domain is primary) in the Vercel project settings.
