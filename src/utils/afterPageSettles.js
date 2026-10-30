// Work the first screen does not need (refreshing content from the API, counting
// the visit, fetching other pages' photos) waits until the page has loaded and a
// few seconds have passed, so it never competes with the first screen's downloads.
const SETTLE_MS = 3000;

export function afterPageSettles(callback, delay = SETTLE_MS) {
  if (typeof window === 'undefined') return;
  const idle = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(callback, { timeout: 2000 }) : callback();
  const wait = () => window.setTimeout(idle, delay);
  if (document.readyState === 'complete') wait();
  else window.addEventListener('load', wait, { once: true });
}
