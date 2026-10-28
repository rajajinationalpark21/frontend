/**
 * The description of a gallery photo: the one written for it in the admin
 * (`galleryAlts`, same order as `galleryImages`), else the page's own wording.
 */
export const galleryAlt = (alts, index, fallback) =>
  (Array.isArray(alts) && typeof alts[index] === 'string' && alts[index].trim()) || fallback;
