import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CoverImage from './CoverImage';
import ThumbImage from './ThumbImage';

/**
 * A family / group card that shows only the group name; its members open as a
 * dropdown on hover (desktop) or on tap (touch screens).
 *
 *   items: [{ name, info?, image? }]  — `thumbs` shows each member's photo.
 */
export default function GroupDropdownCard({ title, image, icon, desc, items = [], unit = 'species', thumbs = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`group relative hover:z-30 focus-within:z-30 ${open ? 'z-30' : 'z-0'}`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full text-left bg-[#fdfcf8]/95 dark:bg-[#0c1f13]/95 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm group-hover:border-emerald-500/40 group-hover:shadow-2xl transition duration-300 overflow-hidden"
      >
        <CoverImage src={image} alt={title} icon={icon} rounded="rounded-none" />
        <div className="flex items-center justify-between gap-3 px-6 py-5">
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {items.length} {unit}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 [@media(hover:hover)]:group-hover:rotate-180 ${open ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </button>

      {/* The dropdown overlays the cards below instead of pushing them down. Hover opens it only
          where there is a mouse; touch screens open it with a tap. */}
      <div
        className={`absolute inset-x-0 top-full pt-2 transition duration-200 ${
          open
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-1 [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0'
        }`}
      >
        <div className="max-h-[26rem] overflow-y-auto rounded-2xl border border-emerald-900/15 dark:border-emerald-500/25 bg-[#fdfcf8] dark:bg-[#0c1610] p-4 shadow-2xl">
          {desc && <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>}
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={`${item.name}-${index}`} className="flex items-center gap-3">
                {thumbs && <ThumbImage src={item.image} alt={item.name} icon={icon} size={40} />}
                <div className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">{item.name}</span>
                  {item.info && <span className="block text-xs text-gray-500 dark:text-gray-400">{item.info}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
