/**
 * Schema.org JSON-LD builders shared by the pages and the build-time prerender,
 * so search engines and answer engines read the same structured data either way.
 */
const CONTEXT = 'https://schema.org';

export function breadcrumbSchema(trail, siteUrl) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${siteUrl}${step.path}`,
    })),
  };
}

export function faqSchema(items) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function zoneSchema(zone, siteUrl) {
  return {
    '@context': CONTEXT,
    '@type': 'TouristAttraction',
    name: zone.name,
    description: zone.metaDescription || zone.description,
    url: `${siteUrl}/${zone.slug}`,
    ...(zone.heroImage ? { image: zone.heroImage } : {}),
    isAccessibleForFree: false,
    touristType: ['Wildlife enthusiasts', 'Birdwatchers', 'Photographers', 'Families'],
    containedInPlace: { '@id': `${siteUrl}/#park` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: zone.entryGate,
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
  };
}

export function blogPostingSchema(post, siteUrl) {
  return {
    '@context': CONTEXT,
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    ...(post.image ? { image: post.image } : {}),
    ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}

// ── Markup derived from the CMS page content ─────────────────────────────────
// Used by the <SEO> component and by the build-time prerender, so a page carries
// the same markup with or without JavaScript.

const WILDLIFE_HUB = '/wildlife-biodiversity-rajaji-tiger-reserve';

const plain = (text) =>
  String(text ?? '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\s][^*]*)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** The client document shown on a page: a safari zone's, the wildlife hub's, or its section's. */
export function pageDocBlocks(path, section, content) {
  const zone = content?.safari?.zones?.find((z) => `/${z.slug}` === path);
  if (zone) return zone.docBlocks || [];
  if (path === WILDLIFE_HUB) return content?.fauna?.hubDocBlocks || [];
  return (section && content?.[section]?.docBlocks) || [];
}

/**
 * Questions a client document asks and answers itself: a heading ending in "?"
 * and the text under it, up to the next heading. Closing calls to action
 * ("Ready to explore Chilla?") are not questions and are skipped.
 */
export function docFaqItems(blocks = []) {
  const items = [];
  blocks.forEach((block, index) => {
    const question = plain(block.text);
    if (!['h2', 'h3'].includes(block.t) || !question.endsWith('?') || /^ready to\b/i.test(question)) return;
    const answer = [];
    for (const next of blocks.slice(index + 1)) {
      if (['h2', 'h3'].includes(next.t)) break;
      if (next.text) answer.push(plain(next.text));
      if (Array.isArray(next.items)) answer.push(...next.items.filter((item) => typeof item === 'string').map(plain));
    }
    if (answer.length) items.push({ q: question, a: answer.join(' ') });
  });
  return items;
}

/** The first rupee amount in a price line ("₹3,500 per Gypsy …" → "3500"). */
const rupees = (text) => String(text ?? '').replace(/,/g, '').match(/₹\s*(\d+(?:\.\d+)?)/)?.[1] || null;

function safariTrip({ name, url, priceText, note, siteUrl }) {
  const price = rupees(priceText);
  if (!price) return null;
  return {
    '@context': CONTEXT,
    '@type': 'TouristTrip',
    name,
    url,
    provider: { '@id': `${siteUrl}/#organization` },
    touristType: 'Wildlife safari',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      description: plain([priceText, note].filter(Boolean).join(' – ')),
      url,
    },
  };
}

/**
 * Markup a page gets from its CMS content: FAQ markup for the questions its
 * document answers, and safari prices (per zone on the tickets page, the zone's
 * own price on a zone page).
 */
export function contentSchemas({ path, section, content, siteUrl }) {
  if (!content) return [];
  const schemas = [];

  const faq = section === 'faqs' ? [] : docFaqItems(pageDocBlocks(path, section, content));
  if (faq.length) schemas.push(faqSchema(faq));

  const zone = content.safari?.zones?.find((z) => `/${z.slug}` === path);
  if (zone) {
    const trip = safariTrip({
      name: `${zone.name} Jeep Safari`,
      url: `${siteUrl}${path}`,
      priceText: zone.gypsyCost,
      siteUrl,
    });
    if (trip) schemas.push(trip);
  }

  if (section === 'tickets') {
    const trips = (content.tickets?.gypsyRates || [])
      .map((rate) =>
        safariTrip({
          name: `Rajaji Jeep Safari – ${plain(rate.zone)}`,
          url: `${siteUrl}${path}`,
          priceText: `${rate.rate} per Gypsy`,
          note: rate.capacity,
          siteUrl,
        })
      )
      .filter(Boolean);
    if (trips.length) {
      schemas.push({
        '@context': CONTEXT,
        '@type': 'ItemList',
        name: 'Rajaji Jeep Safari charges by zone',
        itemListElement: trips.map((trip, index) => {
          const { '@context': _context, ...item } = trip;
          return { '@type': 'ListItem', position: index + 1, item };
        }),
      });
    }
  }

  return schemas;
}
