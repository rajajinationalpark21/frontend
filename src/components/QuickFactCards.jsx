import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Compass, Shield } from 'lucide-react';
import { quickLinkPaths } from '../utils/quickLinkPaths';

// "Jhilmil Jheel Safari & Conservation Reserve" → "Jhilmil Jheel", "Haridwar Zone / Ranipur Gate" → "Haridwar Zone".
const shortName = (name) => name.split(/ Safari| & | – | \/ /)[0];

// "15 Nov – 15 Feb: Morning 6:30 AM – 8:00 AM | Evening 1:30 PM – 3:00 PM"
// → "15 Nov – 15 Feb · 6:30 AM & 1:30 PM". A text in any other shape is shown as it is.
function seasonLine(text) {
  const colon = text.indexOf(': ');
  if (colon < 0) return text;
  const starts = text
    .slice(colon + 2)
    .split('|')
    .map((slot) => slot.match(/\d{1,2}:\d{2}\s*[AP]M/i)?.[0])
    .filter(Boolean);
  return starts.length ? `${text.slice(0, colon)} · ${starts.join(' & ')}` : text;
}

/**
 * The three cards under the home page's header: the safari timings, the zones and the
 * park rules, each a single tap through to its page. The one line under each title
 * comes from that page's content (admin panel → Tickets, Safari Zones, Terms & Rules);
 * a note set on the home page in the admin panel takes its place.
 */
export default function QuickFactCards({ home, site }) {
  const timings = site?.tickets?.timings || {};
  const zones = (site?.safari?.zones || []).filter((zone) => zone.slug && zone.name);
  const rules = site?.parkRules || {};
  const firstDo = (rules.dos || []).find((rule) => rule.title)?.title;
  const firstDont = (rules.donts || []).find((rule) => rule.title)?.title;
  const paths = quickLinkPaths(site);

  const season = timings.winter || timings.summer;
  const cards = [
    {
      key: 'timings',
      title: 'Timings',
      Icon: Clock,
      to: paths.timings,
      detail: home.timingsNote || (season ? seasonLine(season) : home.timings || 'Morning & Evening Safaris'),
    },
    {
      key: 'zones',
      title: 'Zones',
      Icon: Compass,
      to: paths.zones,
      detail:
        home.zonesNote ||
        (zones.length
          ? `${zones.length} zones · ${zones.map((zone) => shortName(zone.name)).join(', ')}`
          : home.zones || 'Chilla, Motichur, Ranipur & more'),
    },
    {
      key: 'rules',
      title: 'Rules',
      Icon: Shield,
      to: paths.rules,
      detail: home.rulesNote || firstDo || firstDont || home.rules || "Do's & Don'ts Guide",
    },
  ];

  return (
    <div className="relative z-20 -mt-8 sm:-mt-10 max-w-6xl mx-auto px-4 sm:px-6">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
        {cards.map(({ key, title, Icon, to, detail }) => (
          <li key={key}>
            <Link
              to={to}
              title={detail}
              className="group flex h-full min-h-[4rem] items-center gap-3 rounded-2xl border border-emerald-900/10 dark:border-emerald-500/20 bg-white/95 dark:bg-[#0c1610]/95 backdrop-blur-md px-3.5 py-3 lg:px-4 shadow-lg shadow-emerald-950/10 hover:border-emerald-600/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition"
            >
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
                <Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold leading-tight text-gray-900 dark:text-white">{title}</h2>
                <p className="mt-0.5 line-clamp-1 sm:line-clamp-2 lg:line-clamp-1 text-xs leading-snug text-gray-600 dark:text-gray-400">{detail}</p>
              </div>
              <ChevronRight className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
