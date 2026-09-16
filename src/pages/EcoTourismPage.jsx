import React from 'react';
import { ShieldCheck, Heart, Leaf, Users, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { ecoTourismData } from '../data/parkContent';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function EcoTourismPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Eco-Tourism & Conservation | Sustainable Travel at Rajaji"
        description="Learn about sustainable eco-tourism, community empowerment, and eco-friendly construction practices at Rajaji National Park and Wild Brook Retreat."
        keywords="eco tourism rajaji national park, sustainable wildlife travel uttarakhand, green resort construction, elephant corridor conservation"
        ogImage={safariImages.hikersCanopy}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={safariImages.hikersCanopy}
            alt="Eco tourists in lush canopy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Leaf className="w-3.5 h-3.5" />
              Conservation Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Eco-Tourism & Sustainability
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {ecoTourismData.philosophy}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Four Eco-Tourism Pillars
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl mb-10 leading-relaxed">
            Every safari tour booked directly finances anti-poaching forest checkpoints, waterhole replenishment during peak summer heat, and compensation programs for surrounding agrarian villages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecoTourismData.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center font-black text-lg mb-6">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-friendly Construction Section */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400 block">
              Indigenous Green Building
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Eco-Friendly Architecture in Forest Buffer Zones
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              In fragile wilderness zones like Nalani Valley and Kaudia, architecture strictly forbids massive concrete or multi-story structures. Accommodations like Wild Brook Retreat prioritize locally sourced river stones, reclaimed timber, ventilated thatch, and non-intrusive earthen pathways to ensure wildlife corridors remain unfragmented.
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
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
