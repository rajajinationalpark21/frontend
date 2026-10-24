/** CMS text with the admin's **bold**, *italic* and [link](/path) marks removed, for titles, meta tags and alt text. */
export const plainText = (text) =>
  String(text ?? '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\s][^*]*)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1');
