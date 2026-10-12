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
