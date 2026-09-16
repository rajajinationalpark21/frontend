import React from 'react';
import { Feather, Compass, Check, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { birdsData } from '../data/parkContent';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function BirdsPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Birds of Rajaji National Park | 400+ Avian Species & Bird Watching"
        description="Discover over 400 species of resident and migratory birds in Rajaji National Park. Great Hornbill, 11 species of Woodpeckers, Barbets, Kingfishers, and winter waterfowl."
        keywords="birds of rajaji national park, bird watching uttarakhand, great hornbill sighting chilla, birding tours gohari range haridwar"
        ogImage={safariImages.macawParrot}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-safari-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={safariImages.kingfisher}
            alt="Crested Kingfisher at Rajaji"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider mb-4 border border-safari-500/30">
              <Feather className="w-3.5 h-3.5" />
              Avian Sanctuary
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Birds of Rajaji National Park
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Situated in the Sino-Himalayan subtropical and temperate ecotone, Rajaji harbors over 400 recorded species of resident, passage, and altitudinal migratory birds.
            </p>
          </div>
        </div>
      </section>

      {/* Birding Stats Ribbon */}
      <section className="py-8 bg-safari-800/20 dark:bg-safari-900/30 border-b border-safari-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">400+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Recorded Species</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-safari-600 dark:text-safari-400">151</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Resident Species</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">87</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Winter Migrants</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">11</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Woodpecker Species</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bird Families Catalog */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Notable Avian Families
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Explore the flagship bird groups inhabiting the canopy, waterways, and grasslands of Rajaji.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {birdsData.families.map((fam, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center mb-4">
                  <Feather className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {fam.group}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {fam.desc}
                </p>

                <div className="space-y-2">
                  {fam.species.map((sp, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-safari-500 shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
                Sighted across Sal canopy & riparian zones
              </div>
            </div>
          ))}
        </div>

        {/* Endemic & Restricted Range Species */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Western Himalayas Endemic Bird Area (EBA) Species
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl">
            Rajaji is an internationally recognized Important Bird Area (IBA) due to its protection of critical restricted-range passerines during winter altitudinal migration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {birdsData.restrictedRange.map((rr, rIdx) => (
              <div key={rIdx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="font-bold text-gray-900 dark:text-white text-sm block mb-1">{rr.name}</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{rr.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <div className="p-8 rounded-3xl bg-gray-900 text-white border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Book a Specialist Birding Guide</h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Guided sessions in Gohari and Suswa river trails starting at ₹1,500/session with expert ornithologists.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
          >
            Reserve Birding Safari
          </button>
        </div>

      </section>
    </div>
  );
}
