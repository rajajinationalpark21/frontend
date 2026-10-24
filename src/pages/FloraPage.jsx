import React, { useState, useEffect } from 'react';
import { Trees, Compass, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import { DocSection } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import RichText from '../components/RichText';

export default function FloraPage({ onOpenBooking }) {
  const [flora, setFlora] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setFlora(res.data.flora))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = flora || {};
  const altitudinalBands = data.altitudinalBands || [];
  const dominantTrees = data.dominantTrees || [];
  const heroTitle = data.title;
  const heroSubtitle = data.subtitle || data.overview;
  const heroBanner = data.heroBanner || safariImages.mistyDarkPines;

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle || "Flora & Forest Types of Rajaji"}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.mistyDarkPines}
        alt={data.heroImageAlt || "Dense Sal forest canopy"}
      />

      {/* Link back to the Wildlife & Biodiversity main page (hub doc) */}
      <Breadcrumb parent={{ label: 'Wildlife & Biodiversity', path: '/wildlife-biodiversity-rajaji-tiger-reserve' }} current="Flora of Rajaji" />

      {/* The client's page document: intro and sections not shown below */}
      <DocSection blocks={data.docBlocks} onBooking={onOpenBooking} />

      {/* Altitudinal Bands */}
      <section className="relative z-10 py-16 bg-[#fdfcf8]/80 dark:bg-[#0a1a0f]/80 backdrop-blur-md border-b border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Stratification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-8">
            Altitudinal Vegetation Bands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {altitudinalBands.map((band, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#fbfdfa] dark:bg-[#0c1f13] p-7 rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
                <span className="font-serif font-bold text-emerald-800 dark:text-emerald-400 text-base block mb-2">
                  {band.band}
                </span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">
                  {band.trees}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dominant Trees Catalog */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Dendrological Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 dark:text-emerald-50">
            Major Forest Tree Species
          </h2>
          <p className="text-sm text-gray-600 dark:text-emerald-100/70 mt-2">
            The foundational trees and flowering hardwoods forming Rajaji's multi-tiered forest canopy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dominantTrees.map((tree, idx) => (
            <div
              key={idx}
              className="group relative bg-[#fdfcf8]/90 dark:bg-[#0c1e13]/90 backdrop-blur-md p-7 rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
              <CoverImage src={tree.image} alt={tree.common} icon={Trees} rounded="rounded-t-2xl" className="-mx-7 -mt-7 mb-5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  {tree.family}
                </span>
                <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-emerald-50">
                  {tree.common}
                </h4>
                <p className="text-xs italic font-serif text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                  {tree.scientific}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">
                  <RichText text={tree.desc} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Photo gallery: photos added in the admin panel */}
        <PhotoGallery title={data.galleryTitle || 'Flora of Rajaji – Photo Gallery'} images={data.galleryImages} embedded />

        {/* Experience Box with Forest Tone, Leaf Watermark & Tiger Stencil */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#07150c] via-[#091b10] to-[#040b06] text-white p-8 sm:p-10 rounded-3xl border border-safari-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Corner Botanical Foliage Watermark */}
          <div 
            className="absolute -top-10 -left-10 w-56 h-56 opacity-[0.16] pointer-events-none bg-contain bg-no-repeat rotate-180"
            style={{ 
              backgroundImage: `url("/images/leaf%20for%20cta.jpg")`, 
              filter: 'invert(1) hue-rotate(90deg) brightness(1.2)', 
              mixBlendMode: 'screen' 
            }}
          />
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-20"
            style={{
              backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">Canopy Expedition</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Experience the Pristine Sal Canopy</h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
              Witness ancient Shorea robusta trees towering over 100 feet tall on an open-top gypsy safari drive through Chilla and Motichur ranges.
            </p>
          </div>
          <button 
            onClick={onOpenBooking} 
            className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 shrink-0"
          >
            Plan Jungle Tour
          </button>
        </div>
      </section>

    </div>
  );
}
