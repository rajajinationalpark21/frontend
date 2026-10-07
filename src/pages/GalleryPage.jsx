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
  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        title="Wild Gallery - High-Res Wildlife & Nature Photography | Rajaji National Park"
        description="Explore stunning photographs of Royal Bengal tigers, leopards, Asian elephants, exotic birds, and safari expeditions captured in Rajaji National Park."
        keywords="rajaji wildlife photography, tiger photos, chilla safari photos, elephant reserve images, uttarakhand wildlife gallery"
        ogImage={safariImages.tigerStalking}
        schemaJson={gallerySchema}
      />

      {/* 1. HERO SECTION - Deep Jungle Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative min-h-[480px] lg:min-h-[520px] flex items-center justify-center text-center overflow-hidden bg-[#07150c] text-white">
        {/* Real photo background with deep organic gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url("${safariImages.galleryHero}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/90 via-[#07150c]/80 to-[#07150c]" />

        {/* Botanical leaf vein texture */}
        <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

        {/* Tiger watermark silhouette emerging from shadows */}
        <div 
          className="absolute right-0 bottom-0 top-0 w-2/3 max-w-2xl bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Corner foliage flourish */}
        <div 
          className="absolute -top-10 -left-10 w-64 h-64 bg-contain bg-no-repeat pointer-events-none opacity-20 filter invert"
          style={{
            backgroundImage: `url("/images/leaf for cta.jpg")`,
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-6">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Visual Expedition Archive
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Captured in the Wild
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore the untouched beauty of the jungle through our lens. From elusive predators to breathtaking landscapes.
          </p>

          {/* Filter Bar in Hero - Pill Capsule */}
          <div className="mt-10 max-w-full overflow-x-auto scrollbar-none px-2 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 gap-1.5 min-w-max shadow-xl">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedFilter(tab);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap transition duration-200 active:scale-95 ${
                    selectedFilter === tab
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
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
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="break-inside-avoid mb-6 relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 group cursor-pointer bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md border border-emerald-950/10 dark:border-emerald-500/20 hover:border-emerald-500/30"
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

              {/* Hover Overlay with Editorial Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040b06]/95 via-[#07150c]/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mb-1">
                  {photo.category}
                </span>
                <h4 className="font-serif text-xl font-bold tracking-tight text-white">{photo.title}</h4>
                {photo.desc && (
                  <p className="text-xs text-emerald-100/80 mt-1 line-clamp-2 leading-relaxed">
                    {photo.desc}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 mt-2 font-medium">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> Click to view full preview
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
