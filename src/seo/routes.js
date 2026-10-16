/**
 * Single source of truth for per-page search metadata. Read by the <SEO>
 * component at runtime and by `scripts/seo-build.mjs` at build time (sitemap,
 * prerendered HTML), so a title edited here changes everywhere at once.
 *
 * Keys are canonical paths. Titles, descriptions and slugs follow the SEO
 * sheets in the client's page documents wherever one was supplied.
 */
export const SITE_NAME = 'Rajaji National Park – Safari Booking';

export const ROUTE_SEO = {
  '/': {
    name: 'Home',
    section: 'home',
    title: 'Rajaji National Park Jeep Safari Booking | Rajaji Tiger Reserve, Uttarakhand',
    description:
      'Book a Rajaji National Park jeep safari in the Chilla, Motichur, Ranipur, Jhilmil Jheel, Mohand and Gohri zones. Entry fees, safari timings, zones and booking help near Haridwar and Rishikesh.',
    keywords:
      'Rajaji National Park, Rajaji National Park Jeep Safari, Rajaji Tiger Reserve safari booking, Rajaji jungle safari, Chilla jeep safari, safari near Haridwar, safari near Rishikesh',
    priority: 1.0,
    changefreq: 'weekly',
  },
  '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges': {
    name: 'Tickets, Entry Fees & Charges',
    section: 'tickets',
    title: 'Rajaji National Park Jeep Safari – Tickets, Entry Fees & Charges',
    description:
      'Book Rajaji National Park Jeep Safari online. Check entry fees, safari charges, Jeep permit fees, timings and booking information for Rajaji Tiger Reserve.',
    keywords:
      'Rajaji National Park Jeep Safari, Rajaji National Park safari booking, Rajaji National Park entry fee, Rajaji National Park safari charges, Rajaji Jeep Safari price, Rajaji safari permit, Rajaji safari timings',
    priority: 0.9,
    changefreq: 'weekly',
  },
  '/rajaji-jeep-safari-terms-conditions-cancellation-refund': {
    name: 'Terms & Conditions',
    section: 'parkRules',
    title: 'Rajaji Jeep Safari Terms & Conditions, Cancellation & Refund Policy',
    description:
      'Read Rajaji Jeep Safari terms and conditions, cancellation and refund policy, safari rules, permits, arrival timings, nature guide requirements and booking guidelines.',
    keywords:
      'Rajaji Jeep Safari Terms & Conditions, Rajaji National Park safari rules, Rajaji safari cancellation policy, Rajaji Jeep Safari refund policy, Rajaji safari permit rules',
    priority: 0.5,
    changefreq: 'monthly',
  },
  '/zones': {
    name: 'Safari Zones',
    section: 'safari',
    title: 'Rajaji Jeep Safari Zones | Chilla, Motichur, Ranipur, Jhilmil, Mohand & Gohri',
    description:
      'Compare the jeep safari zones of Rajaji Tiger Reserve: Chilla, Ranipur, Motichur, Chillawali (Mohand), Jhilmil Jheel and Gohri. Entry gates, gypsy cost, timings and wildlife near Haridwar and Rishikesh.',
    keywords:
      'Rajaji safari zones, Chilla Jeep Safari, Motichur Jeep Safari, Ranipur Gate Jeep Safari, Jhilmil Jeep Safari, Gohri Jeep Safari, Mohand Chillawali Jeep Safari',
    priority: 0.9,
    changefreq: 'weekly',
  },
  '/activities': {
    name: 'Activities',
    section: 'activities',
    title: 'Activities at Rajaji National Park | Jeep Safari, Stay & Rafting',
    description:
      'Things to do at Rajaji National Park: jeep safari, forest stays and river rafting on the Ganga near Rishikesh and Haridwar.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/rajaji-jeep-safari': {
    name: 'Jungle Safari / Jeep Safari',
    parent: '/activities',
    section: 'jeepSafari',
    title: 'Jeep Safari in Rajaji National Park, Uttarakhand',
    description:
      'Plan a Rajaji National Park Jeep Safari: choose your date, zone and shift, share guest details, confirm availability and arrive at the safari gate on time.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/rajaji-national-park-bird-watching-jungle-safari': {
    name: 'Bird Watching',
    parent: '/activities',
    section: 'birdWatching',
    title: 'Rajaji National Park Bird Watching & Jungle Safari',
    description:
      'Book a half-day bird-watching experience or jungle safari in Rajaji National Park, Uttarakhand. Check safari timings, charges and booking requirements.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/trekking-in-rajaji': {
    name: 'Trekking in Rajaji',
    parent: '/activities',
    section: 'trekking',
    title: 'Trekking Trails in Rajaji National Park, Uttarakhand',
    description:
      'Trekking areas around Rajaji National Park: Chilla to Kunao, Phanduwala, Ranipur Range, Kansrao and Motichur Range, subject to Forest Department permission.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/river-rafting-rishikesh': {
    name: 'River Rafting',
    parent: '/activities',
    section: 'rafting',
    title: 'River Rafting in Rishikesh near Rajaji National Park',
    description:
      'White water rafting on the Ganga in Rishikesh, next to Rajaji Tiger Reserve. Rafting stretches, grades, duration and safety guidelines.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/stay-near-rajaji-national-park': {
    name: 'Stay in Rajaji',
    parent: '/activities',
    section: 'stay',
    title: 'Stay in Rajaji National Park | Forest Rest Houses & Eco Cottages',
    description:
      'Where to stay in and around Rajaji National Park: Forest Rest Houses and eco cottages near the Chilla, Motichur, Ranipur and Gohri safari zones.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/wildlife-biodiversity-rajaji-tiger-reserve': {
    name: 'Wildlife & Biodiversity',
    section: 'fauna',
    seoPrefix: 'hub',
    title: 'Wildlife & Biodiversity of Rajaji Tiger Reserve | Mammals, Birds, Reptiles & Flora',
    description:
      'Explore the wildlife and biodiversity of Rajaji Tiger Reserve in Uttarakhand: Asian elephants, Bengal tigers, leopards, around 400 bird species, reptiles, butterflies and flora.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/mammals-of-rajaji-tiger-reserve': {
    name: 'Mammals of Rajaji',
    section: 'fauna',
    parent: '/wildlife-biodiversity-rajaji-tiger-reserve',
    title: 'Mammals of Rajaji Tiger Reserve | Wildlife & Safari',
    description:
      'Explore the mammals of Rajaji Tiger Reserve, including Asian Elephant, Bengal Tiger, Leopard, Chital, Sambar, Wild Boar and other wildlife. Book a Rajaji Jeep Safari.',
    keywords: 'Mammals of Rajaji Tiger Reserve, Rajaji wildlife, Asian Elephant Rajaji, Bengal Tiger Rajaji',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/birds-of-rajaji-national-park': {
    name: 'Birds of Rajaji',
    section: 'birds',
    parent: '/wildlife-biodiversity-rajaji-tiger-reserve',
    title: 'Birds of Rajaji National Park | Bird Watching in Rajaji Tiger Reserve',
    description:
      'Rajaji National Park supports approximately 400 species of birds across Sal forests, grasslands and riverine habitats. Plan a birdwatching safari in Rajaji Tiger Reserve.',
    keywords: 'Birds of Rajaji National Park, bird watching in Rajaji, Rajaji birding, Great Hornbill Rajaji',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/butterflies-of-rajaji-national-park': {
    name: 'Butterflies of Rajaji',
    section: 'butterflies',
    parent: '/wildlife-biodiversity-rajaji-tiger-reserve',
    title: 'Butterflies of Rajaji National Park | Butterfly Species & Checklist',
    description:
      'Butterfly species of Rajaji Tiger Reserve, including Blue Pansy, Common Mormon, Great Eggfly, Peacock Pansy and Plain Tiger, with the best time for butterfly watching.',
    keywords:
      'Butterflies of Rajaji National Park, Rajaji butterfly species, Butterflies of Rajaji Tiger Reserve, butterfly watching in Rajaji',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/reptiles-of-rajaji-tiger-reserve': {
    name: 'Reptiles of Rajaji',
    section: 'reptiles',
    parent: '/wildlife-biodiversity-rajaji-tiger-reserve',
    title: 'Reptiles of Rajaji Tiger Reserve | Snakes, Lizards & Wildlife',
    description:
      'Explore reptiles of Rajaji Tiger Reserve, including Indian Cobra, King Cobra, Indian Rock Python, Common Krait and Indian Monitor Lizard. Discover Rajaji wildlife.',
    keywords: 'Reptiles of Rajaji Tiger Reserve, snakes of Rajaji, King Cobra Rajaji',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/flora-of-rajaji-national-park': {
    name: 'Flora of Rajaji',
    section: 'flora',
    parent: '/wildlife-biodiversity-rajaji-tiger-reserve',
    title: 'Flora of Rajaji National Park | Trees and Plants of Rajaji Tiger Reserve',
    description:
      'Explore the flora of Rajaji National Park, including Sal forests, Amaltas, Palash, Shisham, riverine vegetation and other native trees and plants.',
    keywords: 'Flora of Rajaji National Park, trees of Rajaji Tiger Reserve, Sal forest Rajaji',
    priority: 0.6,
    changefreq: 'monthly',
  },
  '/how-to-reach': {
    name: 'How to Reach',
    section: 'howToReach',
    title: 'How to Reach Rajaji National Park | Chilla, Ranipur, Motichur, Jhilmil & Gohri',
    description:
      'How to reach the Rajaji National Park safari zones by road, train and air from Haridwar, Rishikesh, Dehradun and Delhi.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/booking': {
    name: 'Book Safari',
    section: 'booking',
    title: 'Book Rajaji Jeep Safari Online | Rajaji National Park Safari Booking',
    description:
      'Send your Rajaji jeep safari booking request online. Choose your date, slot and safari zone, and our team confirms availability, charges and permit details by WhatsApp or email.',
    keywords: 'Rajaji National Park safari booking, Rajaji Jeep Safari booking, book Rajaji safari online',
    priority: 0.9,
    changefreq: 'monthly',
  },
  '/contact': {
    name: 'Contact',
    title: 'Contact Rajaji Safari Booking Desk | Call & WhatsApp',
    description:
      'Call or WhatsApp the Rajaji safari booking desk for jeep safari availability, zone selection and booking help. Chilla Jungle Safari Gate, Haridwar and Rishikesh, Uttarakhand.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  '/blog': {
    name: 'Blog',
    title: 'Rajaji Safari Blog | Wildlife Stories, Zone Guides & Travel Tips',
    description:
      'Wildlife stories, safari zone guides, birding notes and travel tips from Rajaji National Park and Rajaji Tiger Reserve.',
    priority: 0.7,
    changefreq: 'weekly',
  },
  '/faq': {
    name: 'FAQ',
    section: 'faqs',
    title: 'Rajaji Jeep Safari FAQ | Cost, Entry Fee, Timings & Booking',
    description:
      'Answers to common questions about Rajaji National Park Jeep Safari: cost, entry fee, jeep permit fee, timings, zones from Haridwar and Rishikesh, and advance booking.',
    keywords:
      'How much is the Rajaji National Park Jeep Safari, Rajaji National Park entry fee, Rajaji safari timings, book Rajaji Jeep Safari online',
    priority: 0.8,
    changefreq: 'monthly',
  },
};

/**
 * The SEO title, description and keywords the admin panel stores on a page's
 * CMS section. They win over the defaults above; empty fields fall back to them.
 */
export function sectionSeo(content, page) {
  const section = page?.section && content?.[page.section];
  if (!section) return {};
  const field = (name) => (page.seoPrefix ? `${page.seoPrefix}${name[0].toUpperCase()}${name.slice(1)}` : name);
  const keywords = section[field('keywords')];
  return {
    title: section[field('seoTitle')] || '',
    description: section[field('metaDescription')] || '',
    keywords: Array.isArray(keywords) ? keywords.filter(Boolean).join(', ') : '',
  };
}

/** Safari zone detail pages, served at `/<slug>`. Metadata comes from the CMS. */
export const ZONE_SLUGS = [
  'chilla-jeep-safari',
  'ranipur-gate-jeep-safari',
  'chillawali-jeep-safari-mohand-gate',
  'motichur-jeep-safari',
  'jhilmil-jheel-safari',
  'gohri-range-safari',
  'chaurasi-kutiya-beatles-ashram',
];

/** Alternative URLs that render the same page. Each resolves to one canonical path. */
export const ALIASES = {
  '/tickets': '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges',
  '/safari/tickets': '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges',
  '/terms': '/rajaji-jeep-safari-terms-conditions-cancellation-refund',
  '/terms-and-conditions': '/rajaji-jeep-safari-terms-conditions-cancellation-refund',
  '/safari/rules': '/rajaji-jeep-safari-terms-conditions-cancellation-refund',
  '/park-rules': '/rajaji-jeep-safari-terms-conditions-cancellation-refund',
  '/cancellation-policy': '/rajaji-jeep-safari-terms-conditions-cancellation-refund',
  '/safari/zones': '/zones',
  '/safari': '/zones',
  '/tours': '/zones',
  '/activities/rafting': '/river-rafting-rishikesh',
  '/rafting': '/river-rafting-rishikesh',
  '/stay': '/stay-near-rajaji-national-park',
  '/wildlife': '/wildlife-biodiversity-rajaji-tiger-reserve',
  '/flora-fauna-rajaji-national-park': '/wildlife-biodiversity-rajaji-tiger-reserve',
  '/booking-form': '/booking',
  '/safari-zones': '/zones',
  '/tickets-entries': '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges',
  '/safari-timings': '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges',
  '/fauna': '/mammals-of-rajaji-tiger-reserve',
  '/wildlife/fauna': '/mammals-of-rajaji-tiger-reserve',
  '/birds': '/birds-of-rajaji-national-park',
  '/wildlife/birds': '/birds-of-rajaji-national-park',
  '/birding-areas': '/birds-of-rajaji-national-park',
  '/wildlife/birding-areas': '/birds-of-rajaji-national-park',
  '/butterflies': '/butterflies-of-rajaji-national-park',
  '/wildlife/butterflies': '/butterflies-of-rajaji-national-park',
  '/reptiles': '/reptiles-of-rajaji-tiger-reserve',
  '/wildlife/reptiles': '/reptiles-of-rajaji-tiger-reserve',
  '/flora': '/flora-of-rajaji-national-park',
  '/wildlife/flora': '/flora-of-rajaji-national-park',
  '/book': '/booking',
  '/safari/book': '/booking',
  '/journal': '/blog',
  '/about': '/',
  '/gallery': '/wildlife-biodiversity-rajaji-tiger-reserve',
  '/chillawali-jeep-safari': '/chillawali-jeep-safari-mohand-gate',
  '/eco-tourism': '/activities',
};

const PREFIX_ALIASES = [
  ['/safari/zones/', '/'],
  ['/journal/', '/blog/'],
];

/** The one URL search engines should index for whatever path is being viewed. */
export function canonicalPath(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (ALIASES[path]) return ALIASES[path];
  for (const [from, to] of PREFIX_ALIASES) {
    if (path.startsWith(from)) return to + path.slice(from.length);
  }
  return path;
}

/** Home > parent > page, as `{ name, path }` steps. Empty for the home page. */
export function breadcrumbTrail(path, leafName) {
  if (path === '/') return [];
  const page = ROUTE_SEO[path];
  const zoneSlug = ZONE_SLUGS.includes(path.slice(1));
  const parentPath = page?.parent ?? (zoneSlug ? '/zones' : path.startsWith('/blog/') ? '/blog' : null);
  const name = page?.name ?? leafName;
  if (!name) return [];
  return [
    { name: 'Home', path: '/' },
    ...(parentPath ? [{ name: ROUTE_SEO[parentPath].name, path: parentPath }] : []),
    { name, path },
  ];
}
