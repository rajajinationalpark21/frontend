import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { primeSnapshot } from './api/client';

/**
 * Draws one page at build time (scripts/prerender-app.mjs) from the CMS snapshot,
 * the same one the browser loads before attaching to the markup (main.jsx).
 */
export function render(url, snapshot) {
  primeSnapshot(snapshot);
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>
  );
}
