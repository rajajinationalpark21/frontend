import React, { useState, useEffect } from 'react';
import { Download, Compass, Eye } from 'lucide-react';
import { safariImages, galleryPhotos } from '../data/safariData';
import { fetchGallery } from '../api/client';
import LightboxModal from '../components/LightboxModal';
import SEO from '../components/SEO';

export default function GalleryPage({ onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState('All Photos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [photos, setPhotos] = useState(galleryPhotos);

  useEffect(() => {
    fetchGallery()
      .then((data) => {
        const images = data?.data?.images || data?.images;
        if (Array.isArray(images) && images.length > 0) {
          setPhotos(images.map((img, i) => ({
            id: img._id || i,
            title: img.title || img.name || 'Untitled',
            category: img.category || 'Wildlife',
            src: img.url || img.src,
            desc: img.description || img.desc || '',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Captured in the Wild - Jungle Safari Gallery",
    "description": "High-resolution wildlife photography featuring Royal Bengal tigers, leopards, Asian elephants, and flora.",
    "url": "https://junglesafari.org/gallery"
  };

  const filterTabs = ['All Photos', 'Wildlife', 'Nature', 'Vehicles', 'Visitors'];

  const filteredPhotos = photos.filter((photo) => {
    if (selectedFilter === 'All Photos') return true;
    return photo.category === selectedFilter;
  });

  const handlePrev = () => {
    if (activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    } else {
      setActivePhotoIndex(filteredPhotos.length - 1);
    }
  };

  const handleNext = () => {
    if (activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    } else {
      setActivePhotoIndex(0);
    }
  };

  const handleDownloadBrochure = () => {
    alert("Downloading official Jungle Safari Wildlife Expedition Guide & Flora/Fauna Catalog (PDF)...");
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Wild Gallery - High-Res Wildlife & Nature Photography | Jungle Safari"
        description="Explore stunning photographs of Royal Bengal tigers, leopards, Asian elephants, exotic birds, and safari expeditions captured in the wild."
        keywords="wildlife photography, tiger photos, safari photos, jungle images, wildlife gallery"
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
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 gap-1.5 overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-5 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition duration-200 ${
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
      </section>

      {/* 2. 3x3 IMAGE GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="relative aspect-square rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 group cursor-pointer bg-gray-100"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-safari-400 mb-1">
                  {photo.category}
                </span>
                <h4 className="text-lg font-bold">{photo.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-2">
                  <Eye className="w-3.5 h-3.5 text-safari-400" /> Click to view full preview
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. READY TO EXPERIENCE IT YOURSELF CTA BANNER */}
      <section className="bg-safari-darker text-white py-24 px-4 sm:px-6 text-center border-t border-gray-900">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to experience it yourself?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            These photos are just a glimpse. Book your adventure today and witness the wild in person.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-semibold text-sm transition duration-200 shadow-lg active:scale-95"
            >
              Book Your Safari
            </button>
            <button
              onClick={handleDownloadBrochure}
              className="px-8 py-3.5 rounded-full border border-gray-700 hover:border-gray-500 text-white font-semibold text-sm hover:bg-white/5 transition duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Brochure
            </button>
          </div>
        </div>
      </section>

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
