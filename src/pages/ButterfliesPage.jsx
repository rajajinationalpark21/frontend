import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import PageHero from '../components/PageHero';

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
            Prominent Butterfly Species
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#fdfcf8]/90 dark:bg-[#0c1e13]/90 backdrop-blur-md p-7 rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
                <CoverImage src={item.image} alt={item.name} icon={Sparkles} rounded="rounded-t-2xl" className="-mx-7 -mt-7 mb-5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-2">
                    Family: {item.family}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-3">
                    {item.name}
                  </h4>
                  {item.habitat && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">
                      <strong className="text-emerald-800 dark:text-emerald-300 font-semibold">Habitat:</strong> {item.habitat}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
