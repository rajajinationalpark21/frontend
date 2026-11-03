import React, { useEffect, useState } from 'react';
import { fetchContent, primedContent } from '../api/client';
import SEO from './SEO';
import PageHero from './PageHero';
import Breadcrumb from './Breadcrumb';
import PageLoader from './PageLoader';
import DocContent, { DOC_WIDTH } from './DocContent';
import PhotoGallery from './PhotoGallery';
import ZoomableImage from './ZoomableImage';
import NotFoundPage from '../pages/NotFoundPage';
import PageFaqs from './PageFaqs';

// The safari zones side by side, from each zone's facts (admin panel → Safari Zones).
// Jeep zones only: the walking visits have no Gypsy fare to compare.
function zonesAtAGlance(zones = []) {
  const rows = zones
    .filter((zone) => zone.slug && /gypsy/i.test(zone.gypsyCost || ''))
    .map((zone) => [`[${zone.name}](/${zone.slug})`, zone.entryGate, zone.routeKm, zone.duration, zone.openSeason, zone.gypsyCost].map((cell) => cell || '–'));
  if (!rows.length) return [];
  return [
    { t: 'h2', text: 'Rajaji Safari Zones at a Glance' },
    { t: 'table', rows: [['Zone', 'Entry gate', 'Route', 'Duration', 'Season', 'Jeep cost'], ...rows] },
  ];
}

/**
 * A page made entirely of its CMS section: header photos and heading, the
 * client's document, and the photo gallery. Everything on it is edited in the
 * admin panel's Page Documents editor. `faqTopic` adds the FAQ page's questions
 * on the page's subject, and `zoneTable` the safari zones side by side.
 */
export default function CmsDocPage({ section, parent, onOpenBooking, faqTopic, zoneTable = false }) {
  // A prerendered page starts from the build-time content (see primedContent).
  const [content, setContent] = useState(primedContent);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchContent()
      .then((res) => setContent(res.data))
      .catch(() => setFailed(true));
  }, []);

  if (!content && !failed) return <PageLoader />;
  const page = content?.[section];
  if (!page || (!page.docBlocks?.length && !page.title)) return <NotFoundPage />;

  const contact = content.settings?.contact || {};
  const phones = [contact.phone, contact.tertiaryPhone, contact.secondaryPhone].filter(Boolean);
  const title = page.title || page.docTitle;
  const images = page.heroImages?.length ? page.heroImages : page.heroBanner;

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />
      <SEO title={page.seoTitle || title} description={page.metaDescription} ogImage={page.heroBanner || page.heroImages?.[0]} />

      <PageHero title={title} subtitle={page.subtitle} image={images} alt={page.heroImageAlt || title} />

      {parent && <Breadcrumb parent={parent} current={title} />}

      {page.mapImage && (
        <section className={`relative z-10 pt-8 ${DOC_WIDTH}`}>
          <figure className="mx-auto max-w-5xl bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 rounded-3xl p-3 sm:p-5 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm">
            <ZoomableImage src={page.mapImage} alt={page.mapImageAlt || `${title} – route map`} />
            <figcaption className="mt-3 text-center text-xs text-gray-500 dark:text-emerald-200/60">
              Map not to scale · Double-tap to zoom, drag to move
            </figcaption>
          </figure>
        </section>
      )}

      <section className={`relative z-10 pt-8 pb-16 ${DOC_WIDTH}`}>
        <DocContent
          blocks={page.docBlocks || []}
          onBooking={onOpenBooking}
          phones={phones}
          message={content.settings?.ctaCopy?.whatsappMessage || ''}
        />
        {zoneTable && (
          <DocContent blocks={zonesAtAGlance(content.safari?.zones)} onBooking={onOpenBooking} phones={phones} className="mt-8" />
        )}
      </section>

      {faqTopic && <PageFaqs siteFaqs={content.faqs} topic={faqTopic} idPrefix={`${section}-faq`} />}

      <PhotoGallery title={page.galleryTitle} images={page.galleryImages || []} alts={page.galleryAlts} altPrefix={title} />
    </div>
  );
}
