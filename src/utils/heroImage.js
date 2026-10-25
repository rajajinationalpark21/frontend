// Header photo URLs, shared by the header, the background preloader and the
// prerender (scripts/seo-build.mjs), so all three ask for exactly the same
// files and a preloaded photo is reused instead of downloaded twice.

// Cloudinary serves resized copies when a transformation follows "/upload/".
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;
const WIDTHS = [768, 1280, 1920];

const cloudinary = (src, transform) => {
  const match = typeof src === 'string' ? src.match(CLOUDINARY_UPLOAD) : null;
  return match ? `${match[1]}${transform}/${match[2]}` : null;
};

/** The largest copy; also what browsers without srcset load. */
export const heroSrc = (src) => cloudinary(src, 'f_auto,q_auto,w_1920') || src;

/** Copies sized for phones, laptops and large screens; undefined for non-Cloudinary photos. */
export const heroSrcSet = (src) =>
  cloudinary(src, 'x') ? WIDTHS.map((width) => `${cloudinary(src, `f_auto,q_auto,w_${width}`)} ${width}w`).join(', ') : undefined;

export const HERO_SIZES = '100vw';

/** The photo a page shows first in its header: the rotating list's first, else the single banner. */
export const firstHeroImage = (section, { list = 'heroImages', single = 'heroBanner' } = {}) =>
  (Array.isArray(section?.[list]) && section[list].find(Boolean)) || section?.[single] || '';

/**
 * A copy of a CMS photo at most `width` pixels wide, in the browser's best format.
 * Photos are stored at full camera size; cards and galleries show them far smaller.
 * Non-Cloudinary photos come back unchanged.
 */
export const sizedImage = (src, width) => cloudinary(src, `f_auto,q_auto,w_${width}`) || src;
