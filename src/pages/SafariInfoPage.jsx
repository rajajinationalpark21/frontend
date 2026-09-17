import React, { useState, useEffect } from 'react';
import { Compass, Clock, MapPin, ShieldAlert, ShieldCheck, Check, X, Car, Eye, Sparkles, ArrowRight, Info, Ticket, Phone, Loader2 } from 'lucide-react';
import { safariImages, ticketPrices, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function SafariInfoPage({ onOpenBooking }) {
  const [safari, setSafari] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setSafari(res.data.safari))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const safariSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Rajaji National Park Safari Permit & Expedition",
    "description": "Official guided 4x4 open gypsy safari exploring protected wildlife zones in Rajaji National Park & Tiger Reserve.",
    "brand": { "@type": "Brand", "name": "Rajaji National Park" },
    "offers": { "@type": "AggregateOffer", "priceCurrency": "USD", "lowPrice": "45", "highPrice": "150", "offerCount": "4" }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = safari || {};
  const zones = data.zones || [];
  const vehicles = data.vehicles || [];
  const rules = data.rules || [];
  const animals = data.animals || [];

  const parkDos = [
    'Wear muted colors: Khaki, olive green, beige, or grey to blend into the habitat.',
    'Maintain absolute silence during the drive so animals are not alarmed.',
    'Keep a minimum 20-metre distance from all wildlife at all times.',
    'Remain inside the vehicle at all times unless at designated watchtowers.',
    'Follow every instruction given by your registered eco-guide and driver.'
  ];

  const parkDonts = [
    'Strictly NO entry before sunrise or after sunset (night driving prohibited).',
    'Do not carry or leave plastic, polythene bags, or litter anywhere in the reserve.',
    'No blowing of vehicle horns, playing music, or loud shouting.',
    'Strictly prohibited to feed, provoke, or throw stones at wild animals.',
    'No smoking, matchsticks, or open flames (High Forest Fire Hazard).',
    'Drones, firearms, and unauthorized fishing equipment are strictly banned.'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Safari Zones, Timings & Entry Permits | Rajaji National Park"
        description="Explore 5 safari ranges: Chila Core, Motichur Elephant Corridor, Gohari birding, and Jhilmil wetlands. View open timings, 4x4 gypsy vehicles, and conservation rules."
        keywords="rajaji safari zones, safari timings, chilla range, motichur, safari rules, 4x4 gypsy booking, rajaji national park permit"
        ogImage={safariImages.walkingTiger}
        schemaJson={safariSchema}
      />

      {/* HERO SECTION */}
      <section className="relative h-[55vh] min-h-[440px] max-h-[580px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${safariImages.aboutHero}")` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold tracking-widest text-safari-400 uppercase mb-3">EXPLORATION GUIDE</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">{data.title || 'Safari Zones & Guidelines'}</h1>
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">{data.subtitle || 'Discover the five distinct ecological ranges, open timings, custom expedition vehicles, and conservation rules.'}</p>
        </div>
      </section>

      {/* OVERVIEW INFO BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-colors">
          <div><span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Season</span><p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">Oct 15 – Jun 30</p><span className="text-[11px] text-gray-500 dark:text-gray-400">Monsoon closure Jul–Sep</span></div>
          <div><span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Daily Safaris</span><p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">2 Shifts Daily</p><span className="text-[11px] text-gray-500 dark:text-gray-400">Morning & Afternoon</span></div>
          <div><span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Permit Limit</span><p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">Capped Daily</p><span className="text-[11px] text-gray-500 dark:text-gray-400">30 vehicles / zone shift</span></div>
          <div><span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Guide Protocol</span><p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1">Mandatory</p><span className="text-[11px] text-gray-500 dark:text-gray-400">Forest dept. certified</span></div>
        </div>
      </section>

      {/* SAFARI ZONES DETAIL CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">RESERVE RANGES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">Explore the Safari Zones</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Each zone encompasses distinct elevations, rivers, and wildlife sightings.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {zones.map((zone, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group">
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">{zone.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{zone.description}</p>
                  <div className="mt-5 space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Clock className="w-4 h-4 text-safari-500 shrink-0" /><span className="font-semibold text-gray-900 dark:text-white">Timings:</span> {zone.timings}</div>
                  </div>
                </div>
                <div className="pt-2">
                  <button onClick={onOpenBooking} className="w-full py-2.5 px-4 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5">
                    Check Permits for {zone.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPEDITION VEHICLES */}
      {vehicles.length > 0 && (
        <section className="py-20 bg-gray-50/60 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">FLEET & EQUIPMENT</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">Expedition Vehicles</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Custom-built safari rigs optimized for zero acoustic disturbance and maximum passenger safety.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vehicles.map((v, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition duration-300 flex flex-col">
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{v.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PARK RULES (DO'S & DON'TS) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">RESPONSIBLE TOURISM</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">Park Rules & Conservation Ethics</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Please strictly respect these guidelines to preserve the forest ecosystem and ensure visitor safety.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-safari-card/70 dark:bg-gray-900 border border-safari-200/60 dark:border-safari-800/60 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-safari-100 dark:bg-safari-900/60 flex items-center justify-center text-safari-600 dark:text-safari-400"><ShieldCheck className="w-5 h-5" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Mandatory Do's</h3></div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {parkDos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-safari-500 text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5" /></div><span className="leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50/40 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400"><ShieldAlert className="w-5 h-5" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Strict Prohibitions (Don'ts)</h3></div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {parkDonts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5"><X className="w-3.5 h-3.5" /></div><span className="leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-black/40 transition-colors">
        <div className="max-w-6xl mx-auto rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#05160d] via-[#072012] to-[#020b06] text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-safari-500/20 text-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: `url("${safariImages.homeHero || safariImages.mistyDarkPines}")` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/75 pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">Ready to Plan Your Safari?</h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">Reserve your zone permit online in advance. Our expedition naturalists handle entry gates, gypsies, and eco-guidance.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button onClick={onOpenBooking} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-400 text-white font-bold text-sm shadow-xl shadow-safari-500/25 hover:shadow-safari-400/40 active:scale-95 transition-all duration-200 cursor-pointer group">
                <Ticket className="w-4 h-4" /><span>Reserve Safari Permit</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm active:scale-95 transition duration-200">
                <Phone className="w-4 h-4 text-safari-400" /><span>Call Helpdesk ({contactInfo.phone})</span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 mt-6 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-300 font-medium"><ShieldCheck className="w-4 h-4 text-safari-400 shrink-0" /><span>Govt Authorized Tariffs</span></div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-300 font-medium"><Compass className="w-4 h-4 text-safari-400 shrink-0" /><span>Chilla, Motichur & Ranipur</span></div>
              <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-gray-300 font-medium"><Check className="w-4 h-4 text-safari-400 shrink-0" /><span>Instant Confirmation</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
