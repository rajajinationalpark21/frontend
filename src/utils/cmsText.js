/**
 * The CMS value whenever the CMS sent one, an empty string included (an admin
 * may clear a line on purpose); the built-in wording only when it sent nothing.
 */
export const cmsText = (value, fallback) => (typeof value === 'string' ? value : fallback);
