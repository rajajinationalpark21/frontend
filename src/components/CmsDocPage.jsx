import React, { useEffect, useState } from 'react';
import { fetchContent } from '../api/client';
import SEO from './SEO';
import PageHero from './PageHero';
import Breadcrumb from './Breadcrumb';
import PageLoader from './PageLoader';
import DocContent from './DocContent';
import PhotoGallery from './PhotoGallery';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * A page made entirely of its CMS section: header photos and heading, the
 * client's document, and the photo gallery. Everything on it is edited in the
 * admin panel's Page Documents editor.
 */
export default function CmsDocPage({ section, parent, onOpenBooking }) {
  const [content, setContent] = useState(null);
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
        <section className="relative z-10 pt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 rounded-3xl p-3 sm:p-5 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm">
            <a href={page.mapImage} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl bg-white">
              <img
                src={page.mapImage}
                alt={page.mapImageAlt || `${title} – route map`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </a>
            <figcaption className="mt-3 text-center text-xs text-gray-500 dark:text-emerald-200/60">
              Map not to scale · Tap the map to open it full size
            </figcaption>
          </figure>
        </section>
      )}

      <section className="relative z-10 pt-8 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DocContent
          blocks={page.docBlocks || []}
          onBooking={onOpenBooking}
          phones={phones}
          message={content.settings?.ctaCopy?.whatsappMessage || ''}
        />
      </section>

      <PhotoGallery title={page.galleryTitle} images={page.galleryImages || []} altPrefix={page.heroImageAlt || title} />
    </div>
  );
}
