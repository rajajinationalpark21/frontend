import { useEffect, useState } from 'react';

/**
 * `[ref, near]`: `near` turns true once the element comes within `margin` of the
 * screen, and stays true. Photos, background images and API calls below the fold
 * wait for it, so the first screen downloads only what it shows.
 * `ref` is a callback ref, so it also works on elements rendered later.
 */
export default function useNearViewport(margin = '400px') {
  const [element, setElement] = useState(null);
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (near || !element) return undefined;
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
