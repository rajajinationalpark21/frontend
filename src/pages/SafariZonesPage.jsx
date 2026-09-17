import React, { useState } from 'react';
import { MapPin, Compass, Clock, Calendar, Check, ArrowRight, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { safariZonesData } from '../data/parkContent';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function SafariZonesPage({ onOpenBooking }) {
  const [selectedZone, setSelectedZone] = useState('all');

  const filteredZones = selectedZone === 'all' 
    ? safariZonesData 
    : safariZonesData.filter(z => z.id === selectedZone);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Safari Zones & Ranges | Chila, Gohari, Jhilmil, Motichur"
        description="Explore all safari zones in Rajaji National Park. Chila core range, Gohari twilight safari, Jhilmil Swamp Deer reserve, Motichur sal forests, and Ranipur Shivaliks."
        keywords="chila safari zone, gohari range birding, jhilmil jheel safari, motichur gate permits, rajaji national park safari zones"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={safariImages.safariJeepSavannah}
            alt="Safari zone in Rajaji"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5" />
              Exploration Zones
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Safari Zones of Rajaji National Park
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Spanning 820 sq km across the Shivalik foothills and Ganges riverbed, each safari zone possesses a distinct landscape, unique wildlife sightings, and specific entry gates.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedZone('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                selectedZone === 'all'
                  ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              All Zones ({safariZonesData.length})
            </button>
            {safariZonesData.map(zone => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  selectedZone === zone.id
                    ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {zone.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Zones List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredZones.map((zone, idx) => (
          <div
            key={zone.id}
            id={zone.id}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 transition flex flex-col lg:flex-row gap-8 items-start justify-between"
          >
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-safari-500/10 text-safari-700 dark:text-safari-300 text-xs font-bold uppercase tracking-wider">
                  {zone.tag}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-safari-500" />
                  {zone.entryGate}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {zone.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {zone.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Zone Highlights & Key Sightings
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {zone.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Safari Timing:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{zone.timings}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Operating Season:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{zone.openSeason}</span>
                </div>
              </div>
            </div>

            {/* Price Card & CTA */}
            <div className="w-full lg:w-72 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shrink-0 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Gypsy Vehicle Rate</span>
                <div className="text-3xl font-black text-safari-600 dark:text-safari-400 my-1">
                  {zone.gypsyCost.split('(')[0]}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Up to 6 guests per vehicle</span>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Book This Zone
                </button>
                <div className="text-center">
                  <span className="text-[11px] text-gray-400">Capped daily vehicle permits</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
