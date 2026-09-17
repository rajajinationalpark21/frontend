import React, { useState, useEffect } from 'react';
import { Download, Compass, Eye } from 'lucide-react';
import { safariImages, galleryPhotos } from '../data/safariData';
import { fetchGallery } from '../api/client';
import LightboxModal from '../components/LightboxModal';
import SEO from '../components/SEO';
import CallToAction from '../components/CallToAction';

/**
 * Smart image optimizer (Option A + Option C hybrid)
 * Automatically injects Cloudinary WebP/AVIF auto-formatting, compression, and width limits.
 * Gracefully preserves third-party or local static URLs if Cloudinary is not used.
 */
function getOptimizedImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    if (url.includes('/upload/c_') || url.includes('/upload/f_') || url.includes('/upload/w_') || url.includes('/upload/q_')) {
      return url;
    }
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_1400,c_limit/');
  }
  return url;
}

export default function GalleryPage({ onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState('All Photos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [photos, setPhotos] = useState(galleryPhotos);

  useEffect(() => {
    let isMounted = true;
    fetchGallery()
      .then((data) => {
        if (!isMounted) return;
        const images = data?.data?.images || data?.images;
        if (Array.isArray(images) && images.length > 0) {
          const apiPhotos = images
            .filter((img) => img && (img.url || img.src))
            .map((img, i) => ({
              id: img._id || `api-img-${i}`,
              title: img.title?.trim() || 'Wilderness Capture',
              category: img.category?.trim() || 'Wildlife',
              src: img.url || img.src,
              desc: img.description?.trim() || img.desc?.trim() || 'Captured inside Rajaji Tiger Reserve habitat.',
            }));
          // As soon as the backend sends live data, dynamic items fully take over and static fallbacks vanish
          setPhotos(apiPhotos);
        }
      })
      .catch((err) => {
        console.warn('Gallery live API unavailable, using offline gallery cache:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Captured in the Wild - Rajaji National Park Gallery",
    "description": "High-resolution wildlife photography featuring Royal Bengal tigers, leopards, Asian elephants, and Himalayan birds in Rajaji National Park.",
    "url": "https://rajajinationalpark.org/gallery"
  };

  const filterTabs = ['All Photos', 'Wildlife', 'Nature', 'Vehicles', 'Visitors'];

  const filteredPhotos = photos.filter((photo) => {
    if (!photo || !photo.src) return false;
    if (selectedFilter === 'All Photos') return true;
    return photo.category?.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handlePrev = () => {
    if (filteredPhotos.length === 0) return;
    if (activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    } else {
      setActivePhotoIndex(filteredPhotos.length - 1);
    }
  };

  const handleNext = () => {
    if (filteredPhotos.length === 0) return;
    if (activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    } else {
      setActivePhotoIndex(0);
    }
  };

  const handleDownloadBrochure = () => {
    alert("Downloading official Rajaji National Park Wildlife Expedition Guide & Flora/Fauna Catalog (PDF)...");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Wild Gallery - High-Res Wildlife & Nature Photography | Rajaji National Park"
        description="Explore stunning photographs of Royal Bengal tigers, leopards, Asian elephants, exotic birds, and safari expeditions captured in Rajaji National Park."
        keywords="rajaji wildlife photography, tiger photos, chilla safari photos, elephant reserve images, uttarakhand wildlife gallery"
        ogImage={safariImages.tigerStalking}
        schemaJson={gallerySchema}
      />
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] min-h-[460px] max-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${safariImages.galleryHero}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Captured in the Wild
          </h1>
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore the untouched beauty of the jungle through our lens. From elusive predators to breathtaking landscapes.
          </p>

          {/* Filter Bar in Hero */}
          <div className="mt-8 max-w-full overflow-x-auto scrollbar-none px-2 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 gap-1.5 min-w-max shadow-lg">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedFilter(tab);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition duration-200 active:scale-95 ${
                    selectedFilter === tab
                      ? 'bg-safari-500 text-white shadow-md'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC MASONRY GALLERY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="break-inside-avoid mb-6 relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 group cursor-pointer bg-gray-100 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80"
            >
              <img
                src={getOptimizedImageUrl(photo.src)}
                alt={photo.title}
                loading="lazy"
                className="w-full h-auto block object-cover group-hover:scale-[1.03] transition duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = safariImages.tigerStalking;
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-safari-400 mb-1">
                  {photo.category}
                </span>
                <h4 className="text-lg font-bold">{photo.title}</h4>
                {photo.desc && (
                  <p className="text-xs text-gray-200 mt-1 line-clamp-2 leading-relaxed">
                    {photo.desc}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-2">
                  <Eye className="w-3.5 h-3.5 text-safari-400" /> Click to view full preview
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. READY TO EXPERIENCE IT YOURSELF CTA BANNER */}
      <CallToAction
        title="Ready to Experience It Yourself?"
        subtitle="These photos are just a glimpse. Book your adventure today and witness the wild in person."
        primaryText="Book Your Safari"
        onPrimaryClick={onOpenBooking}
        secondaryText="Download Brochure"
        onSecondaryClick={handleDownloadBrochure}
        secondaryIcon={Download}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <LightboxModal
          activePhoto={filteredPhotos[activePhotoIndex]}
          onClose={() => setActivePhotoIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
