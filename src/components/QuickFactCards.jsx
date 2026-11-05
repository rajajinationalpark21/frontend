import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Compass, Shield, Sun, X } from 'lucide-react';
import { quickLinkPaths } from '../utils/quickLinkPaths';

const CARD =
  'bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-emerald-900/15 dark:border-emerald-500/25 flex items-start gap-4 text-left transition hover:-translate-y-1 duration-200';
const ICON =
  'w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30';
const MORE = 'inline-block mt-1 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline';

// "Jhilmil Jheel Safari & Conservation Reserve" → "Jhilmil Jheel", for a list of names.
const shortName = (name) => name.split(/ Safari| & | – /)[0];

const HEADING_LINK = 'hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline';

/**
 * The three cards under the home page's header: the safari timings, every zone and
 * the main park rules, each from its own page's content (admin panel → Tickets,
 * Safari Zones, Terms & Rules) and linking to that page. `home` holds the headings.
 */
export default function QuickFactCards({ home, site }) {
  const timings = site?.tickets?.timings || {};
  const seasons = [timings.winter, timings.summer].filter(Boolean);
  const zones = (site?.safari?.zones || []).filter((zone) => zone.slug && zone.name);
  const rules = site?.parkRules || {};
  const dos = (rules.dos || []).filter((rule) => rule.title).slice(0, 2);
  const donts = (rules.donts || []).filter((rule) => rule.title).slice(0, 2);
  const paths = quickLinkPaths(site);

  return (
    <div className="relative z-20 -mt-8 sm:-mt-10 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={CARD}>
          <div className={ICON}>
            <Sun className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">
              <Link to={paths.timings} className={HEADING_LINK}>Timings</Link>
            </h2>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{home.timings || 'Morning & Evening Safaris'}</p>
            {home.timingsNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">{home.timingsNote}</p>}
            {seasons.length > 0 ? (
              <ul className="mt-2 space-y-1.5 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
                {seasons.map((season) => (
                  <li key={season}>{season}</li>
                ))}
              </ul>
            ) : (
              !home.timingsNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">Timings change with the season</p>
            )}
            <Link to={paths.timings} className={MORE}>All timings & fees →</Link>
          </div>
        </div>

        <div className={CARD}>
          <div className={ICON}>
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">
              <Link to={paths.zones} className={HEADING_LINK}>Zones</Link>
            </h2>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{home.zones || 'Chilla, Motichur, Ranipur & more'}</p>
            {home.zonesNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">{home.zonesNote}</p>}
            {zones.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {zones.map((zone) => (
                  <li key={zone.slug}>
                    <Link
                      to={`/${zone.slug}`}
                      className="inline-block rounded-full border border-emerald-900/15 dark:border-emerald-500/25 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                    >
                      {shortName(zone.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              !home.zonesNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">6 safari zones plus Beatles Ashram</p>
            )}
            <Link to={paths.zones} className={MORE}>Compare all zones →</Link>
          </div>
        </div>

        <div className={CARD}>
          <div className={ICON}>
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">
              <Link to={paths.rules} className={HEADING_LINK}>Rules</Link>
            </h2>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{home.rules || "Do's & Don'ts Guide"}</p>
            {home.rulesNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">{home.rulesNote}</p>}
            {dos.length + donts.length > 0 ? (
              <ul className="mt-2 space-y-1.5 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
                {dos.map((rule) => (
                  <li key={rule.title} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 mt-px shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {rule.title}
                  </li>
                ))}
                {donts.map((rule) => (
                  <li key={rule.title} className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 mt-px shrink-0 text-red-600 dark:text-red-400" />
                    {rule.title}
                  </li>
                ))}
              </ul>
            ) : (
              !home.rulesNote && <p className="text-[11px] text-gray-600 dark:text-gray-400">Strict conservation policies</p>
            )}
            <Link to={paths.rules} className={MORE}>All park rules →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
