import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// "How to Reach" lines from the client's Chilla Range document.
const LINES = [
  'Chilla Gate is on the Haridwar–Rishikesh bypass road, about 10 km from Haridwar and 20 km from Rishikesh.',
  'By Train: The nearest major railway station is Haridwar Railway Station.',
  'By Air: The nearest airport is Jolly Grant Airport, Dehradun (DED), approximately 35 km away.',
  'By Road: Delhi to Chilla is approximately 224 km via NH 334.',
];
const LINE_MS = 4000;
const SEEN_KEY = 'map-nudge-seen';

function seenThisVisit() {
  try {
    return Boolean(sessionStorage.getItem(SEEN_KEY));
  } catch {
    return false; // Storage blocked: show the nudge anyway.
  }
}

/**
 * A speech bubble under the Map button, once per visit: it fades in, shows the
 * How to Reach lines one after another, then fades out by itself.
 * `boxClass` aligns the bubble with its button and `arrowClass` puts the arrow under it.
 */
export default function MapNudge({ boxClass = 'right-0', arrowClass = 'right-8' }) {
  // Decided after the first draw: the build that prerenders the page has no visit to remember.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(!seenThisVisit()), []);
  const [shown, setShown] = useState(false);
  const [line, setLine] = useState(0);
  const [lineShown, setLineShown] = useState(true);

  useEffect(() => {
    if (!mounted) return undefined;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Not remembered; it shows again on the next page load.
    }
    const timer = setTimeout(() => setShown(true), 1200);
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    if (!shown) return undefined;
    const fade = setTimeout(() => setLineShown(false), LINE_MS - 500);
    const next = setTimeout(() => {
      if (line === LINES.length - 1) {
        setShown(false);
        return;
      }
      setLine(line + 1);
      setLineShown(true);
    }, LINE_MS);
    return () => {
      clearTimeout(fade);
      clearTimeout(next);
    };
  }, [shown, line]);

  if (!mounted) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`absolute ${boxClass} top-full mt-3 w-[17rem] sm:w-80 z-50 transition-all duration-500 ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-1.5 h-3 w-3 rotate-45 bg-emerald-900 dark:bg-emerald-800 ${arrowClass}`}
      />
      <div className="relative rounded-2xl bg-emerald-900 dark:bg-emerald-800 p-3.5 pr-8 shadow-xl shadow-emerald-950/30 text-left">
        <button
          type="button"
          onClick={() => setShown(false)}
          aria-label="Close"
          className="absolute top-2 right-2 p-1 rounded-full text-emerald-200/80 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <p className="text-xs font-bold text-white">How to Reach Rajaji National Park</p>
        <p
          className={`mt-1 min-h-[3.75rem] text-[13px] leading-5 text-emerald-50/90 transition-opacity duration-500 ${
            lineShown ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {LINES[line]}
        </p>
      </div>
    </div>
  );
}
