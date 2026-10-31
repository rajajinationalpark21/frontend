/**
 * Draws each page's real markup into its dist/<path>/index.html at build time, so phones
 * paint it as soon as the HTML and CSS arrive instead of after the app's code runs.
 * The browser then attaches to that markup (src/main.jsx), using the same CMS
 * snapshot the page was drawn from.
 *
 * Runs after scripts/seo-build.mjs, which writes the snapshot file and each page's
 * hidden search-engine text; on prerendered pages the real markup replaces that text.
 *
 *   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr
 *   node scripts/seo-build.mjs && node scripts/prerender-app.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SERVER_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

// Every page seo-build wrote is drawn at build time, except these, which still draw in
// the browser: the booking form fills in today's date and the ?zone= choice there.
const SKIP = new Set(['/booking']);

/** [route, file] for each page seo-build wrote (dist/index.html and dist/<path>/index.html). */
async function pageFiles(dir = DIST, route = '') {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'assets') {
      pages.push(...(await pageFiles(path.join(dir, entry.name), `${route}/${entry.name}`)));
    } else if (entry.name === 'index.html') {
      pages.push([route || '/', path.relative(DIST, path.join(dir, entry.name))]);
    }
  }
  return pages.filter(([page]) => !SKIP.has(page));
}

/** The `<div id="root">…</div>` element of a page, found by counting nested divs. */
function rootElement(html) {
  const start = html.indexOf('<div id="root"');
  if (start === -1) return null;
  const tags = /<div\b|<\/div>/g;
  tags.lastIndex = start;
  let depth = 0;
  for (let match; (match = tags.exec(html)); ) {
    depth += match[0] === '</div>' ? -1 : 1;
    if (depth === 0) return { start, end: match.index + match[0].length };
  }
  return null;
}

/**
 * A drawn page needs no code for its first paint, so its code (and the CMS file the
 * code reads) starts downloading only after that paint. Otherwise phones fetch and
 * run the app before painting, which is exactly the wait the prerender removes.
 * A tab opened in the background draws no frames, so the page's load event starts
 * the code there instead, whichever comes first.
 */
function deferAppCode(html) {
  const entry = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>\s*/);
  if (!entry) return html;
  const loader =
    '<script>(function(){var started;function start(){if(started)return;started=1;' +
    'var s=document.createElement("script");s.type="module";s.crossOrigin="";' +
    `s.src=${JSON.stringify(entry[1])};document.head.appendChild(s)}` +
    'requestAnimationFrame(function(){setTimeout(start,0)});addEventListener("load",start,{once:true})})()</script>';
  return html
    .replace(entry[0], '')
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
    .replace(/\s*<link rel="preload" href="\/assets\/cms-[^"]+" as="fetch"[^>]*>/, '')
    .replace('</body>', () => `  ${loader}
  </body>`);
}

async function main() {
  const { render } = await import(pathToFileURL(SERVER_ENTRY).href);

  const snapshots = new Map();
  let drawn = 0;
  for (const [route, file] of await pageFiles()) {
    const target = path.join(DIST, file);
    const html = await readFile(target, 'utf8');
    const snapshotFile = html.match(/<meta name="cms-snapshot" content="\/([^"]+)"/)?.[1];
    const root = rootElement(html);
    if (!snapshotFile || !root) {
      console.warn(`[prerender] ${route}: no CMS snapshot or root element, left to draw in the browser.`);
      continue;
    }
    if (!snapshots.has(snapshotFile)) {
      snapshots.set(snapshotFile, JSON.parse(await readFile(path.join(DIST, snapshotFile), 'utf8')));
    }
    const snapshot = snapshots.get(snapshotFile);
    const markup = await render(route, snapshot);
    const page =
      html.slice(0, root.start) +
      `<div id="root" data-prerendered="${route}">${markup}</div>` +
      html.slice(root.end);
    await writeFile(target, deferAppCode(page));
    drawn += 1;
  }
  console.log(`[prerender] ${drawn} pages drawn at build time.`);
}

main().catch((error) => {
  // A failed prerender leaves the page as seo-build wrote it, which still works.
  console.error('[prerender] Failed, pages will draw in the browser:', error);
});
