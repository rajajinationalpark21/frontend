import { HERO_SIZES, firstHeroImage, heroSrc, heroSrcSet } from './heroImage';
import { afterPageSettles } from './afterPageSettles';

/** Every page's first header photo in the CMS content, without repeats. */
function headerPhotos(content) {
  const photos = new Set();
  for (const section of Object.values(content || {})) {
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
    photos.add(firstHeroImage(section));
    photos.add(section.hubHeroBanner);
  }
  photos.add(firstHeroImage(content?.home, { list: 'aboutImages', single: 'aboutImage' }));
  for (const zone of content?.safari?.zones || []) photos.add(firstHeroImage(zone, { single: 'heroImage' }));
  return [...photos].filter((src) => typeof src === 'string' && /^https?:\/\//.test(src));
}

// Data savers and slow connections keep their data for the page in front of them.
const shouldSkip = () => {
  const connection = navigator.connection;
  return Boolean(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || ''));
};

const load = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    // Same srcset and sizes as the header, so the browser caches the very copy it will show.
    img.sizes = HERO_SIZES;
    const srcset = heroSrcSet(src);
    if (srcset) img.srcset = srcset;
    img.fetchPriority = 'low';
    img.onload = img.onerror = resolve;
    img.src = heroSrc(src);
  });

/**
 * After the first page has loaded, fetch the other pages' header photos one or
 * two at a time while the browser is idle, so moving to another page shows its
 * header photo straight away instead of an empty header.
 */
export function warmHeaderPhotos(content) {
  if (typeof window === 'undefined' || shouldSkip()) return;
  const queue = headerPhotos(content).slice(0, 40);
  const next = () => {
    const src = queue.shift();
    if (src) load(src).then(next);
  };
  // Only once the page in front of the visitor has settled; an earlier start
  // competed with the first page's own photos and rendering.
  afterPageSettles(() => { next(); next(); });
}
