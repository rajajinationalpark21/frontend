import React from 'react';

/**
 * Masonry grid of a page's photos (backend `galleryImages`, edited in the admin panel).
 * `embedded` drops the outer page padding when it sits inside a page section.
 */
export default function PhotoGallery({ title, images = [], altPrefix = title, embedded = false }) {
  const photos = images.filter(Boolean);
  if (photos.length === 0) return null;
  return (
    <section className={embedded ? 'relative' : 'relative z-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight font-serif mb-8">
          {title}
        </h2>
      )}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {photos.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="mb-5 break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group bg-gray-200 dark:bg-gray-800 border border-gray-100 dark:border-gray-800"
          >
            <img
              src={src}
              alt={`${altPrefix} photo ${index + 1}`}
              loading="lazy"
              className="w-full h-auto block group-hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
