import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import GroupDropdownCard from '../components/GroupDropdownCard';
import PageHero from '../components/PageHero';
import { DocSection } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';

export default function ButterfliesPage({ onOpenBooking }) {
  const [butterflies, setButterflies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setButterflies(res.data.butterflies))
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

  const data = butterflies || {};
  const species = data.species || [];
  // Species grouped by family, largest family first.
  const families = Object.values(
    species.reduce((groups, item) => {
      const name = item.family || 'Other';
      groups[name] = groups[name] || { name, items: [] };
      groups[name].items.push({ name: item.name, info: item.habitat, image: item.image });
      return groups;
    }, {})
  ).sort((a, b) => b.items.length - a.items.length);
  const heroTitle = data.title;
  const heroSubtitle = data.subtitle || data.overview;
  const heroBanner = data.heroBanner || safariImages.pinkFlower;

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle || "Butterflies & Insects of Rajaji"}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.pinkFlower}
        alt="Butterfly on forest flower"
      />

      {/* The client's page document: intro and sections not shown below */}
      <DocSection blocks={data.docBlocks} onBooking={onOpenBooking} />

      {/* Overview & Mud Puddling */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 p-8 sm:p-10 rounded-3xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm backdrop-blur-md">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Butterfly Watching</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-4">
              Best Time for Butterfly Watching in Rajaji
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-emerald-100/80 font-light leading-relaxed">
              {data.mudPuddling}
            </p>
          </div>
        </div>

        {/* Species Cards */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Entomological Registry</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-8">
            Prominent Butterfly Families
          </h3>
          {/* One card per family; its species open as a dropdown on hover or tap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {families.map((family) => (
              <GroupDropdownCard
                key={family.name}
                title={family.name}
                image={family.items.find((item) => item.image)?.image}
                icon={Sparkles}
                items={family.items}
                thumbs
              />
            ))}
          </div>
        </div>

        {/* Photo gallery: photos added in the admin panel */}
        <PhotoGallery title={data.galleryTitle || 'Butterflies of Rajaji – Photo Gallery'} images={data.galleryImages} embedded />

        {/* CTA with Deep Forest & Tiger Stencil */}
        <div className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-[#07150c] text-white border border-emerald-800/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
            style={{
              backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">Guided Naturalist Treks</span>
            <h4 className="text-2xl font-serif font-bold text-white">Experience Rajaji's Natural Wonders</h4>
            <p className="text-xs sm:text-sm text-emerald-100/75 max-w-xl">
              Macro-photography and botanical walks available with expert naturalists.
            </p>
          </div>
          <button 
            onClick={onOpenBooking} 
            className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 shrink-0"
          >
            Book Nature Tour
          </button>
        </div>
      </section>

    </div>
  );
}
