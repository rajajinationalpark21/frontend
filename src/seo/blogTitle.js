/**
 * A blog post's title in search results: the Google title set in the admin, else
 * the headline. Long headlines go without the blog suffix so they stay readable.
 * Shared by the post page and the prerender (scripts/seo-build.mjs).
 */
export const blogSeoTitle = ({ title = '', seoTitle = '' }) =>
  seoTitle.trim() || (title.length > 42 ? title : `${title} | Rajaji Safari Blog`);
