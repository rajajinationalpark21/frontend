import { useEffect, useState } from 'react';

/**
 * `[ref, near]`: `near` turns true once the element comes within `margin` of the
 * screen, and stays true. Photos, background images and API calls below the fold
 * wait for it, so the first screen downloads only what it shows.
 * `ref` is a callback ref, so it also works on elements rendered later.
 */
export default function useNearViewport(margin = '400px') {
  const [element, setElement] = useState(null);
  // Always false at first, also in the build that prerenders pages, so both draw the same.
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near || !element) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, near, margin]);

  return [setElement, near];
}
