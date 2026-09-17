import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Clock, Navigation, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function BirdingAreasPage({ onOpenBooking }) {
  const [birdingAreas, setBirdingAreas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setBirdingAreas(res.data.birdingAreas))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = birdingAreas || {};
  const areas = data.areas || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Major Birding Areas & Trails | Rajaji National Park Bird Watching"
        description="Top bird watching trails and circuits in Rajaji National Park. Gohari Range circuit, Chila 26km forest drive, Phanduwala-Kansrao trail, and Ganga barrage backwaters."
        keywords="birding areas rajaji national park, bird watching trails haridwar rishikesh, gohari range birding circuit, chilla forest drive bird species"
        ogImage={safariImages.kingfisher}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.kingfisher} alt="Birding trail along river" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5" />
              Trail Guide
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">Major Birding Areas & Trails</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.overview}</p>
          </div>
        </div>
      </section>

      {/* Birding Transects List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((trail, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-safari-500/40 transition">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-safari-500/10 text-safari-600 dark:text-safari-400 text-xs font-bold uppercase tracking-wider">{trail.badge}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{trail.distance}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trail.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{trail.description}</p>
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Key Bird Sightings:</span>
                  <div className="space-y-1.5">
                    {(trail.highlights || []).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <div><span className="text-gray-400 block">Operating Season:</span><span className="font-semibold text-gray-800 dark:text-gray-200">{trail.season}</span></div>
                <div className="text-right"><span className="text-gray-400 block">Trail Tariff:</span><span className="font-bold text-safari-600 dark:text-safari-400">{trail.fee}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Access Points Card */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Navigation className="w-5 h-5 text-safari-600" />Birding Route Access Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Asarori Gate Route</span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Located opposite Karvapani gate on the Saharanpur-Dehradun highway. Enters Phanduwala (approx. 10 km) along lush Suswa river corridors.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Ramgarh Gate Route</span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Approached near Clement Town, Dehradun. Passes through the Mathurawala swamps along the Suswa river before joining Phanduwala trails.</p>
            </div>
          </div>
          <div className="mt-8 text-center sm:text-right">
            <button onClick={onOpenBooking} className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm w-full sm:w-auto">Book Birding Expedition</button>
          </div>
        </div>
      </section>
    </div>
  );
}
