/**
 * Build-time only (src/entry-server.jsx): notes which parts of the CMS snapshot a page
 * reads while it is drawn, so its prerendered HTML can name a small file holding just
 * those parts (scripts/prerender-app.mjs) instead of the whole site's content.
 */
// Unread texts up to this length stay in a page's part (labels, answers, captions).
const SHORT_TEXT = 300;

export function createContentReads() {
  // Per object: the keys the page read, or `all` once it listed the keys (spread,
  // Object.entries, JSON.stringify), after which the object is kept whole.
  const reads = new WeakMap();
  const proxies = new WeakMap();

  const readsOf = (target) => {
    if (!reads.has(target)) reads.set(target, { keys: new Set(), all: false });
    return reads.get(target);
  };

  const watch = (value) => {
    if (value === null || typeof value !== 'object') return value;
    if (!proxies.has(value)) {
      const read = readsOf(value);
      proxies.set(
        value,
        new Proxy(value, {
          get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            if (typeof key === 'symbol' || !Object.hasOwn(target, key)) return result;
            read.keys.add(key);
            return watch(result);
          },
          has(target, key) {
            if (typeof key !== 'symbol') read.keys.add(key);
            return Reflect.has(target, key);
          },
          ownKeys(target) {
            read.all = true;
            return Reflect.ownKeys(target);
          },
          getOwnPropertyDescriptor(target, key) {
            read.all = true;
            return Reflect.getOwnPropertyDescriptor(target, key);
          },
        })
      );
    }
    return proxies.get(value);
  };

  /**
   * The part of `value` the page read. Lists the page read keep every entry, and every
   * object keeps its numbers, short texts and nested objects even where unread, so the
   * page's other states (an opened answer, the next photo) still have them. Lists and
   * long texts it never read are left out: page sections, photo lists, articles, which
   * are what make the whole file large. The whole file brings them once it loads.
   */
  const part = (value) => {
    const read = reads.get(value);
    if (read?.all) return value;
    if (Array.isArray(value)) return value.map((item) => (item && typeof item === 'object' ? part(item) : item));
    const kept = {};
    for (const [key, item] of Object.entries(value)) {
      const wasRead = read?.keys.has(key);
      if (Array.isArray(item)) kept[key] = wasRead ? part(item) : [];
      else if (item && typeof item === 'object') kept[key] = part(item);
      else if (wasRead || typeof item !== 'string' || item.length <= SHORT_TEXT) kept[key] = item;
    }
    return kept;
  };

  return {
    /** The snapshot to draw from, with each of its responses watched. */
    watch: (snapshot) => Object.fromEntries(Object.entries(snapshot).map(([key, value]) => [key, watch(value)])),
    /** The responses the page read, each cut to the part it read. */
    part: (snapshot) =>
      Object.fromEntries(
        Object.entries(snapshot)
          .filter(([, value]) => reads.get(value)?.keys.size || reads.get(value)?.all)
          .map(([key, value]) => [key, part(value)])
      ),
  };
}
