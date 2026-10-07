import React, { useState, useEffect } from 'react';
import { Trees, Compass, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Flora & Forest Types | Sal Forest Ecology of Rajaji National Park"
        description="Botanical diversity of Rajaji National Park. Shorea robusta (Sal) forests, riverine Khair-Sissoo woodlands, medicinal trees, and altitudinal forest bands."
        keywords="flora of rajaji national park, sal forest shorea robusta uttarakhand, tree species shivalik hills, medicinal plants rajaji"
        ogImage={safariImages.tropicalLeafDew}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.mistyDarkPines} alt="Dense Sal forest canopy" className="w-full h-full object-cover opacity-25 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07150c] via-[#07150c]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07150c] via-transparent to-[#07150c]/70" />
        </div>

        {/* Tiger Watermark in forest shadow */}
        <div
          className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 pointer-events-none z-[1] bg-no-repeat bg-right-bottom bg-contain opacity-[0.14]"
          style={{
            backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />

        {/* Corner Leaf Foliage Overlay */}
        <div
          className="absolute -top-16 -left-16 w-80 h-80 pointer-events-none z-[1] bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: `url('${safariImages.leafCta}')`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Botanical Legacy & Canopy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Flora & Forest Types <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">of Rajaji</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

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

        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1e13]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-emerald-900/20 dark:border-emerald-800/40 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border-b border-emerald-900/15">
                <tr>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Botanical / Scientific Name</th>
                  <th className="px-6 py-4">Botanical Family</th>
                  <th className="px-6 py-4">Ecological Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/10 dark:divide-emerald-900/30">
                {dominantTrees.map((tree, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-emerald-100">{tree.common}</td>
                    <td className="px-6 py-4 italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">{tree.scientific}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-emerald-300/70">{tree.family}</td>
                    <td className="px-6 py-4 text-xs text-gray-600 dark:text-emerald-100/80 leading-relaxed">{tree.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Experience Box with Forest Tone & Tiger Stencil Watermark */}
        <div className="relative overflow-hidden bg-[#07150c] text-white p-8 sm:p-10 rounded-3xl border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
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
              Witness ancient Shorea robusta trees towering over 100 feet tall on an open-top gypsy safari drive through Chila and Motichur ranges.
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
