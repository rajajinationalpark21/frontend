import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { primeSnapshot } from './api/client';
import { createContentReads } from './contentReads';
import { startEverythingNear } from './utils/useNearViewport';

async function draw(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
    // Every part of the page inline. By default React sends a large section hidden,
    // with a script that reveals it on the next frame, which never comes in a
    // background tab and which crawlers that skip scripts never run.
    { progressiveChunkSize: Infinity }
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}

/**
 * Draws one page at build time (scripts/prerender-app.mjs) from the CMS snapshot.
 * Returns its markup and the part of the snapshot it read, which the browser loads
 * before attaching to the markup (main.jsx), so both draw the same.
 * prerender waits for the page's code, which most pages load on demand.
 */
export async function render(url, snapshot) {
  const reads = createContentReads();
  primeSnapshot(reads.watch(snapshot));
  const html = await draw(url);
  // Drawn again with the sections further down already showing, so the content they
  // read once scrolled to is in the page's part too.
  startEverythingNear(true);
  try {
    await draw(url);
  } finally {
    startEverythingNear(false);
  }
  return { html, part: reads.part(snapshot) };
}
