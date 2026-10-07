import React, { useState, useEffect } from 'react';
import { Feather, Compass, Check, AlertCircle, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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
  const stats = data.stats || {};
  const families = data.families || [];
  const restrictedRange = data.restrictedRange || [];

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        title="Birds of Rajaji National Park | 400+ Avian Species & Bird Watching"
        description="Discover over 400 species of resident and migratory birds in Rajaji National Park. Great Hornbill, 11 species of Woodpeckers, Barbets, Kingfishers, and winter waterfowl."
        keywords="birds of rajaji national park, bird watching uttarakhand, great hornbill sighting chilla, birding tours gohari range haridwar"
        ogImage={safariImages.macawParrot}
      />

      {/* Hero Header - Deep Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative py-24 lg:py-28 bg-[#07150c] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.kingfisher} alt="Crested Kingfisher at Rajaji" className="w-full h-full object-cover opacity-35 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/95 via-[#07150c]/85 to-[#07150c]" />
        </div>

        {/* Botanical leaf vein texture */}
        <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

        {/* Tiger watermark stencil */}
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
          className="absolute -top-10 -left-10 w-60 h-60 bg-contain bg-no-repeat pointer-events-none opacity-20 filter invert"
          style={{
            backgroundImage: `url("/images/leaf for cta.jpg")`,
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              <Feather className="w-3.5 h-3.5 text-cyan-400" />
              Avian Heritage of the Shivaliks
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Birds of Rajaji National Park
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">
              {data.overview || 'Situated in the Sino-Himalayan subtropical and temperate ecotone, Rajaji harbors over 400 recorded species of resident, passage, and altitudinal migratory birds.'}
            </p>
          </div>
        </div>
      </section>

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
            <div key={idx} className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 hover:shadow-2xl transition duration-500 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/50 dark:border-emerald-800/40">
                  <Feather className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">{fam.group}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{fam.desc}</p>
                <div className="space-y-2">
                  {(fam.species || []).map((sp, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
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
                <div key={rIdx} className="bg-[#f5f2e8]/90 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/40">
                  <span className="font-bold text-gray-900 dark:text-white text-sm block mb-1">{rr.name}</span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{rr.status}</span>
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
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">Guided sessions in Gohari and Suswa river trails starting at ₹1,500/session with expert ornithologists.</p>
          </div>
          <button onClick={onOpenBooking} className="relative z-10 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shrink-0">
            Reserve Birding Safari
          </button>
        </div>
      </section>
    </div>
  );
}
