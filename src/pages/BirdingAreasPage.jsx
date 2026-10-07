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
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = birdingAreas || {};
  const areas = data.areas || [];

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Major Birding Areas & Trails | Rajaji National Park Bird Watching"
        description="Top bird watching trails and circuits in Rajaji National Park. Gohari Range circuit, Chila 26km forest drive, Phanduwala-Kansrao trail, and Ganga barrage backwaters."
        keywords="birding areas rajaji national park, bird watching trails haridwar rishikesh, gohari range birding circuit, chilla forest drive bird species"
        ogImage={safariImages.kingfisher}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.kingfisher} alt="Birding trail along river" className="w-full h-full object-cover opacity-25 scale-105" />
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
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ornithological Circuits</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Major Birding Areas <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">& Forest Trails</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Birding Transects List */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((trail, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white dark:bg-[#0c1f13] rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50">
                    {trail.badge}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-emerald-400/80 font-medium">{trail.distance}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50">{trail.name}</h2>
                <p className="text-sm text-gray-600 dark:text-emerald-100/75 leading-relaxed font-light">{trail.description}</p>
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
                    Key Bird Sightings:
                  </span>
                  <div className="space-y-1.5">
                    {(trail.highlights || []).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-emerald-100/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-emerald-900/10 dark:border-emerald-800/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 dark:text-emerald-400/60 block">Operating Season:</span>
                  <span className="font-semibold text-gray-800 dark:text-emerald-200">{trail.season}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 dark:text-emerald-400/60 block">Trail Tariff:</span>
                  <span className="font-serif font-bold text-emerald-700 dark:text-emerald-400 text-sm">{trail.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Access Points Card with Deep Forest & Tiger Stencil */}
        <div className="relative overflow-hidden bg-[#07150c] text-white p-8 sm:p-10 rounded-3xl border border-emerald-800/40 shadow-2xl">
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
            style={{
              backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h3 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-400" />
              Birding Route Access Points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-800/30">
                <span className="font-serif font-bold text-white text-base block mb-2">Asarori Gate Route</span>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                  Located opposite Karvapani gate on the Saharanpur-Dehradun highway. Enters Phanduwala (approx. 10 km) along lush Suswa river corridors.
                </p>
              </div>
              <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-800/30">
                <span className="font-serif font-bold text-white text-base block mb-2">Ramgarh Gate Route</span>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                  Approached near Clement Town, Dehradun. Passes through the Mathurawala swamps along the Suswa river before joining Phanduwala trails.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center sm:text-right">
              <button 
                onClick={onOpenBooking} 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 w-full sm:w-auto"
              >
                Book Birding Expedition
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
