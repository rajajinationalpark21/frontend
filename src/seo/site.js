// Set at build time from VITE_SITE_URL (or the Vercel production domain). Falls
// back to wherever the site is actually being served, so canonicals never point
// at a domain the site does not live on.
export const SITE_URL = (__SITE_URL__ || window.location.origin).replace(/\/+$/, '');
