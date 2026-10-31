import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { primeSnapshot } from './api/client';

/**
 * Draws one page at build time (scripts/prerender-app.mjs) from the CMS snapshot,
 * the same one the browser loads before attaching to the markup (main.jsx).
 * prerender waits for the page's code, which most pages load on demand.
 */
export async function render(url, snapshot) {
  primeSnapshot(snapshot);
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
