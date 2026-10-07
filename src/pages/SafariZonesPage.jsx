import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Clock, Calendar, Check, ArrowRight, ShieldCheck, Sparkles, Filter, Loader2, Ticket } from 'lucide-react';
import { safariImages, safariZonesList } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function SafariZonesPage({ onOpenBooking }) {
  const [safariZonesData, setSafariZonesData] = useState(safariZonesList);
  const [selectedZone, setSelectedZone] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => {
        const safari = res.data?.safari || {};
        if (safari.zones && safari.zones.length > 0) {
          // If DB zones have full info, use them
          const merged = safari.zones.map((z, i) => {
            const fallback = safariZonesList.find(fz => fz.slug === z.slug) || safariZonesList[i] || {};
            return {
              id: z.slug || `zone-${i}`,
              slug: z.slug || fallback.slug,
              name: z.name,
              tag: z.tag || fallback.tag || 'Official Safari Zone',
              description: z.description,
              timings: z.timings || fallback.timings,
              openSeason: z.openSeason || fallback.openSeason || '15th November to 15th June',
              entryGate: z.entryGate || fallback.entryGate || 'Main Gate',
              gypsyCost: z.gypsyCost || fallback.gypsyCost || '₹3,500 per gypsy',
              highlights: (z.highlights && z.highlights.length > 0) ? z.highlights : (fallback.highlights || []),
              wildlife: (z.wildlife && z.wildlife.length > 0) ? z.wildlife : (fallback.wildlife || []),
            };
          });
          setSafariZonesData(merged);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredZones = selectedZone === 'all'
    ? safariZonesData
    : safariZonesData.filter(z => (z.id === selectedZone || z.slug === selectedZone));

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors relative overflow-hidden">
      <SEO
        title="Rajaji Jungle Safari Zones | Chilla, Ranipur, Motichur, Jhilmil, Mohand"
        description="Explore all official safari zones of Rajaji Tiger Reserve. Check entry gates, gypsy tariffs, elephant habitats, and wetland reserves near Haridwar and Rishikesh."
        keywords="chilla safari zone, ranipur leopard safari, motichur gate permits, jhilmil jheel barasingha, gohri buffer zone, rajaji national park safari zones"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-24 bg-[#07120a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepSavannah} alt="Safari zone in Rajaji" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/85 via-[#07120a]/70 to-[#040b06]/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30 backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5" />
              Exploration Zones
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 font-serif">
              Safari Zones of Rajaji National Park
            </h1>
            <p className="text-lg text-gray-200/90 leading-relaxed font-normal">
              Explore 7 distinct safari ranges and historical reserves across the Shivalik foothills and Ganges riverbanks. Each zone features unique landscapes, specific entry gates, and prime wildlife sightings.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-[#f7f5ed]/95 dark:bg-[#07120a]/95 backdrop-blur-md border-b border-emerald-950/10 dark:border-emerald-900/40 sticky top-16 sm:top-18 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedZone('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap ${selectedZone === 'all' ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-sm' : 'bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-emerald-900/15 dark:border-emerald-800/40'}`}
            >
              All Zones ({safariZonesData.length})
            </button>
            {safariZonesData.map(zone => (
              <button
                key={zone.id || zone.slug}
                onClick={() => setSelectedZone(zone.id || zone.slug)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap ${selectedZone === (zone.id || zone.slug) ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-sm' : 'bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-emerald-900/15 dark:border-emerald-800/40'}`}
              >
                {zone.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Zones List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {filteredZones.map((zone, idx) => (
          <div 
            key={zone.id || zone.slug} 
            id={zone.slug} 
            className="bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-safari-500/40 transition flex flex-col lg:flex-row gap-8 items-start justify-between"
          >
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-100 dark:border-emerald-900/40">
                  {zone.tag}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-safari-500" />
                  {zone.entryGate}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white font-serif">
                  {zone.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {zone.description}
                </p>
              </div>

              {zone.highlights && zone.highlights.length > 0 && (
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
              )}

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

              {/* Sub-page Link */}
              <div className="pt-2">
                <Link
                  to={`/${zone.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-safari-600 dark:text-safari-400 hover:text-safari-700 dark:hover:text-safari-300 transition group"
                >
                  <span>Explore Full {zone.name} Itinerary & Photos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>

            {/* Right Booking Block */}
            <div className="w-full lg:w-72 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shrink-0 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Gypsy Vehicle Tariff</span>
                <div className="text-3xl font-black text-safari-600 dark:text-safari-400 my-1">
                  {zone.gypsyCost?.split('(')[0] || '₹3,500'}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Up to 6 guests per Gypsy</span>
              </div>
              <div className="mt-8 space-y-3">
                <button 
                  onClick={onOpenBooking} 
                  className="w-full py-3 rounded-xl bg-safari-600 hover:bg-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Book This Zone
                </button>
                <Link
                  to={`/${zone.slug}`}
                  className="w-full py-2.5 rounded-xl bg-[#fdfcf8] dark:bg-[#0f1d14] hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-800 dark:text-gray-200 font-bold text-xs uppercase tracking-wider transition border border-emerald-900/20 dark:border-emerald-700/40 text-center block"
                >
                  Detailed Page
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
