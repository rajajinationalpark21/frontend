import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Leaf, Users, Building, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function EcoTourismPage({ onOpenBooking }) {
  const [ecoTourism, setEcoTourism] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setEcoTourism(res.data.ecoTourism))
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

  const data = ecoTourism || {};
  const pillars = data.pillars || [];

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Eco-Tourism & Conservation | Sustainable Travel at Rajaji"
        description="Learn about sustainable eco-tourism, community empowerment, and eco-friendly construction practices at Rajaji National Park and Wild Brook Retreat."
        keywords="eco tourism rajaji national park, sustainable wildlife travel uttarakhand, green resort construction, elephant corridor conservation"
        ogImage={safariImages.hikersCanopy}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.hikersCanopy} alt="Eco tourists in lush canopy" className="w-full h-full object-cover opacity-25 scale-105" />
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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conservation & Community</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Eco-Tourism & <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">Sustainability</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.philosophy}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Core Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 dark:text-emerald-50 mb-4">
            Our Four Eco-Tourism Pillars
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-emerald-100/75 max-w-3xl mb-10 leading-relaxed font-light">
            Every safari tour booked directly finances anti-poaching forest checkpoints, waterhole replenishment during peak summer heat, and compensation programs for surrounding agrarian villages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-serif font-black text-xl mb-6">
                  0{idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/75 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-friendly Construction Section with Tiger Stencil Watermark */}
        <div className="relative overflow-hidden bg-[#07150c] text-white p-8 sm:p-12 rounded-3xl border border-emerald-800/40 shadow-2xl">
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
            style={{
              backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
              Indigenous Green Building
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Eco-Friendly Architecture in Forest Buffer Zones
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              In fragile wilderness zones like Nalani Valley and Kaudia, architecture strictly forbids massive concrete or multi-story structures. Accommodations like Wild Brook Retreat prioritize locally sourced river stones, reclaimed timber, ventilated thatch, and non-intrusive earthen pathways to ensure wildlife corridors remain unfragmented.
            </p>
            <div className="pt-4">
              <button 
                onClick={onOpenBooking} 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25"
              >
                Support Sustainable Safaris
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
