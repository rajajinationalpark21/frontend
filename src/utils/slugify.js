/**
 * Convert a blog post or page title into a clean, URL-safe slug.
 * Example: "Spotting the Elusive Leopard: A Guide" -> "spotting-the-elusive-leopard-a-guide"
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
