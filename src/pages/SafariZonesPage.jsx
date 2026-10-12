import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Check, ArrowRight } from 'lucide-react';
import { safariImages, safariZonesList } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';

export default function SafariZonesPage({ onOpenBooking }) {
  const [safariZonesData, setSafariZonesData] = useState(safariZonesList);
  const [safariContent, setSafariContent] = useState(null);
  const [selectedZone, setSelectedZone] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => {
        const safari = res.data?.safari || {};
        setSafariContent(safari);
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

  const selectedZoneName = selectedZone === 'all'
    ? `All ${safariZonesData.length} safari zones`
    : safariZonesData.find(zone => (zone.id === selectedZone || zone.slug === selectedZone))?.name || 'Selected safari zone';

  if (loading) {
    return <PageLoader />;
  }

  const heroTitle = safariContent?.title || "Safari Zones of Rajaji National Park";
  const heroSubtitle = safariContent?.subtitle || "Explore the six jeep safari zones of Rajaji Tiger Reserve: Chilla, Ranipur, Chillawali–Mohand, Motichur, Jhilmil Jheel and Gohri.";
  const heroBanner = safariContent?.heroBanner || safariImages.safariJeepSavannah;

  return (
    <div className="min-h-screen bg-transparent transition-colors relative overflow-hidden">
      <SEO
        ogImage={heroBanner}
      />

      {/* Hero Header */}
      <section className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-no-repeat transition-transform duration-700"
            style={{ 
              backgroundImage: `url("${heroBanner}")`,
              backgroundPosition: 'center 35%'
            }}
          >
            {/* Soft neutral vignette keeping photo bright & vibrant */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-gray-200/95 leading-relaxed font-normal max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Zone selector */}
      <section className="sticky top-16 sm:top-[72px] z-30 border-b border-emerald-950/10 bg-[#f7f5ed]/95 py-4 shadow-[0_8px_20px_rgba(7,18,10,0.05)] backdrop-blur-md transition-colors dark:border-emerald-900/40 dark:bg-[#07120a]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-950 dark:text-white">Choose a safari zone</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Safari zone filter">
            <button
              onClick={() => setSelectedZone('all')}
              aria-pressed={selectedZone === 'all'}
              aria-controls="safari-zone-results"
              className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07120a] ${selectedZone === 'all' ? 'border-safari-600 bg-safari-600 text-white shadow-[0_5px_14px_rgba(22,163,74,0.22)]' : 'border-emerald-900/15 bg-[#fdfcf8] text-gray-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:border-emerald-800/40 dark:bg-[#0c1610] dark:text-gray-100 dark:hover:bg-emerald-950/50'}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span>All zones</span>
                <span className={`text-xs font-semibold ${selectedZone === 'all' ? 'text-emerald-50' : 'text-gray-500 dark:text-gray-400'}`}>{safariZonesData.length}</span>
              </span>
            </button>
            {safariZonesData.map(zone => {
              const zoneId = zone.id || zone.slug;
              const isSelected = selectedZone === zoneId;

              return (
                <button
                  key={zoneId}
                  onClick={() => setSelectedZone(zoneId)}
                  aria-pressed={isSelected}
                  aria-controls="safari-zone-results"
                  className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07120a] ${isSelected ? 'border-safari-600 bg-safari-600 text-white shadow-[0_5px_14px_rgba(22,163,74,0.22)]' : 'border-emerald-900/15 bg-[#fdfcf8] text-gray-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:border-emerald-800/40 dark:bg-[#0c1610] dark:text-gray-100 dark:hover:bg-emerald-950/50'}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{zone.name.split('(')[0].trim()}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zones List */}
      <section id="safari-zone-results" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {filteredZones.map(zone => (
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
                <div className="text-3xl font-black font-sans text-safari-600 dark:text-safari-400 my-1 tabular-nums tracking-tight">
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

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title="Ready to Explore Rajaji's Wildlife Ranges?"
        subtitle="Permits and open-top 4x4 Gypsy slots are allocated on a strictly regulated first-come quota basis across all core and buffer gates. Secure your official permit in advance."
        primaryText="Book Safari Zone"
        onPrimaryClick={onOpenBooking}
        secondaryText="View Tickets & Tariffs"
        secondaryLink="/safari/tickets"
        secondaryIcon={ArrowRight}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
