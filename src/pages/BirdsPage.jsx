import React, { useState, useEffect } from 'react';
import { Feather, Compass, Check, AlertCircle, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import ThumbImage from '../components/ThumbImage';
import PageHero from '../components/PageHero';

export default function BirdsPage({ onOpenBooking }) {
  const [birds, setBirds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setBirds(res.data.birds))
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

  const data = birds || {};
  const heroTitle = data.title || "Birds of Rajaji National Park";
  const heroSubtitle = data.subtitle || data.overview || 'Situated in the Sino-Himalayan subtropical and temperate ecotone, Rajaji harbors over 400 recorded species of resident, passage, and altitudinal migratory birds.';
  const heroBanner = data.heroBanner || safariImages.kingfisher;
  const stats = data.stats || {};
  const families = data.families || [];
  const restrictedRange = data.restrictedRange || [];

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.kingfisher}
        alt="Crested Kingfisher at Rajaji"
      />

      {/* Birding Stats Ribbon */}
      <section className="relative z-10 py-8 bg-[#fdfcf8]/85 dark:bg-[#0c1f13]/85 backdrop-blur-md border-b border-emerald-950/10 dark:border-emerald-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSpecies || '400+'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Recorded Species</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.residentSpecies || '151'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Resident Species</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-blue-600 dark:text-cyan-400">{stats.winterMigrants || '87'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Winter Migrants</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.woodpeckers || '11'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Woodpecker Species</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bird Families Catalog */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
            AVIAN DIVERSITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Notable Avian Families</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Explore the flagship bird groups inhabiting the canopy, waterways, and grasslands of Rajaji.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {families.map((fam, idx) => (
            <div key={idx} className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 hover:shadow-2xl transition duration-500 flex flex-col justify-between">
              <div>
                <CoverImage src={fam.image} alt={fam.group} icon={Feather} className="-mx-7 -mt-7 mb-5" />
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">{fam.group}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{fam.desc}</p>
                <div className="space-y-2">
                  {(fam.species || []).map((sp, sIdx) => (
                    <div key={sIdx} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-900/10 dark:border-emerald-800/40 text-[11px] text-gray-400 dark:text-emerald-200/60">
                Sighted across Sal canopy & riparian zones
              </div>
            </div>
          ))}
        </div>

        {/* Endemic & Restricted Range Species */}
        {restrictedRange.length > 0 && (
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Western Himalayas Endemic Bird Area (EBA) Species
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl">
              Rajaji is an internationally recognized Important Bird Area (IBA) due to its protection of critical restricted-range passerines during winter altitudinal migration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {restrictedRange.map((rr, rIdx) => (
                <div key={rIdx} className="bg-[#f5f2e8]/90 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/40 flex items-center gap-3">
                  <ThumbImage src={rr.image} alt={rr.name} icon={Feather} />
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 dark:text-white text-sm block mb-1">{rr.name}</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{rr.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking CTA - Deep Forest with Tiger Watermark */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-[#07150c] text-white border border-emerald-900/40 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="absolute right-0 bottom-0 top-0 w-2/3 max-w-sm bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
            style={{
              backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
          />
          <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold mb-1">Book a Specialist Birding Guide</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">Guided sessions in Gohri and Suswa river trails starting at ₹1,500/session with expert ornithologists.</p>
          </div>
          <button onClick={onOpenBooking} className="relative z-10 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shrink-0">
            Reserve Birding Safari
          </button>
        </div>
      </section>
    </div>
  );
}
