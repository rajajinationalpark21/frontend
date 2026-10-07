import React, { useState, useEffect } from 'react';
import { Plane, Train, Car, MapPin, Clock, ArrowRight, Navigation, Compass, ShieldCheck, Loader2 } from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function HowToReachPage({ onOpenBooking }) {
  const [howToReach, setHowToReach] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setHowToReach(res.data.howToReach))
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

  const data = howToReach || {};
  const air = data.air || {};
  const rail = data.rail || {};
  const road = data.road || {};
  const coordinates = data.coordinates || {};

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="How to Reach Rajaji National Park | Flights, Trains & Road Routes"
        description="Complete travel and transit guide to Rajaji National Park. Nearest airport Jolly Grant Dehradun, train stations at Haridwar & Rishikesh, and road directions from Delhi."
        keywords="how to reach rajaji national park, jolly grant airport dehradun to rajaji, haridwar to chilla safari, delhi to rajaji distance road route"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepRiver} alt="Transit to Rajaji" className="w-full h-full object-cover opacity-25 scale-105" />
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
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visitor Transit Guide</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              How to Reach <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">Rajaji National Park</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Three Modes Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* By Air */}
          <div className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Plane className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-2">By Air</h2>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-4">{air.airport}</div>
              <p className="text-gray-600 dark:text-emerald-100/75 text-sm mb-6 leading-relaxed font-light">{air.details}</p>
              <div className="space-y-3 border-t border-emerald-900/10 dark:border-emerald-800/30 pt-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-emerald-300/70">Distance to Park</span>
                  <span className="font-bold text-gray-900 dark:text-emerald-100">{air.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-emerald-300/70">Flight from Delhi</span>
                  <span className="font-bold text-gray-900 dark:text-emerald-100">{air.flightTime}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-emerald-900/10 dark:border-emerald-800/30">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                Pre-booked airport taxis available 24/7
              </span>
            </div>
          </div>

          {/* By Rail */}
          <div className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Train className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-2">By Rail</h2>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-4">{rail.nearestRailhead}</div>
              <p className="text-gray-600 dark:text-emerald-100/75 text-sm mb-4 leading-relaxed font-light">
                Haridwar Junction is one of the busiest railheads in Northern India, with direct high-speed links to all major metros.
              </p>
              <div className="space-y-2 mb-4">
                {(rail.stations || []).map((st, idx) => (
                  <div key={idx} className="bg-emerald-50/60 dark:bg-[#07150c]/60 p-3 rounded-xl text-xs border border-emerald-900/10 dark:border-emerald-800/30">
                    <div className="font-bold text-gray-900 dark:text-emerald-100">{st.name}</div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-medium">{st.distance}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-emerald-900/10 dark:border-emerald-800/30 pt-4 text-xs">
              <div className="text-gray-500 dark:text-emerald-300/70 font-semibold mb-1">Key Trains:</div>
              <div className="text-gray-700 dark:text-emerald-200 font-medium">Shatabdi Express, Vande Bharat, Jan Shatabdi</div>
            </div>
          </div>

          {/* By Road */}
          <div className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Car className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-2">By Road</h2>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-4">{road.delhiDistance}</div>
              <p className="text-gray-600 dark:text-emerald-100/75 text-sm mb-4 leading-relaxed font-light">
                Smooth 4-lane highway drive from Delhi via the Meerut Expressway & NH-334 right to Haridwar and Chilla.
              </p>
              <div className="bg-emerald-50/60 dark:bg-[#07150c]/60 p-3.5 rounded-xl text-xs border border-emerald-900/10 dark:border-emerald-800/30 mb-4">
                <div className="font-bold text-gray-900 dark:text-emerald-100 mb-2">Driving Itinerary:</div>
                <div className="flex flex-wrap items-center gap-1.5 text-gray-600 dark:text-emerald-100/70">
                  {(road.routeSteps || []).map((step, sIdx) => (
                    <span key={sIdx} className="inline-flex items-center gap-1">
                      <span className="font-semibold text-gray-800 dark:text-emerald-100">{step}</span>
                      {sIdx < (road.routeSteps || []).length - 1 && <ArrowRight className="w-3 h-3 text-emerald-500 shrink-0" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-emerald-900/10 dark:border-emerald-800/30 pt-4 text-xs flex justify-between">
              <span className="text-gray-500 dark:text-emerald-300/70">Road Quality</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">4-Lane Express Highway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Distance Table & Regional Attractions */}
      <section className="relative z-10 py-16 bg-[#fdfcf8]/80 dark:bg-[#0a1a0f]/80 backdrop-blur-md border-t border-emerald-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-emerald-500"></span>
                <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Transit Milestones</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-6">
                Distance to Rajaji National Park
              </h3>
              <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border-b border-emerald-900/15">
                    <tr>
                      <th className="px-5 py-3.5">Starting City / Hub</th>
                      <th className="px-5 py-3.5 text-right">Distance to Park</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/10 dark:divide-emerald-900/30">
                    {(road.distances || []).map((item, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-emerald-100">{item.from}</td>
                        <td className="px-5 py-3 text-right font-serif font-bold text-emerald-700 dark:text-emerald-400">{item.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-7 rounded-3xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm">
                <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-emerald-50 mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Park Geographic Coordinates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-emerald-50/60 dark:bg-[#07150c]/60 p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/30">
                    <span className="block text-gray-500 dark:text-emerald-400/80 text-xs mb-1">Latitude Range</span>
                    <span className="font-serif font-semibold text-gray-900 dark:text-emerald-100 text-base">{coordinates.latitude}</span>
                  </div>
                  <div className="bg-emerald-50/60 dark:bg-[#07150c]/60 p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/30">
                    <span className="block text-gray-500 dark:text-emerald-400/80 text-xs mb-1">Longitude Range</span>
                    <span className="font-serif font-semibold text-gray-900 dark:text-emerald-100 text-base">{coordinates.longitude}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-emerald-100/70 mt-4 leading-relaxed">
                  The park represents the Shivalik-Himalayan ecotone extending across Dehradun, Haridwar, and Pauri Garhwal districts.
                </p>
              </div>

              {/* Assist Card with Deep Forest & Tiger Stencil */}
              <div className="relative overflow-hidden bg-[#07150c] p-8 rounded-3xl text-white border border-emerald-800/40 shadow-2xl">
                <div
                  className="absolute right-0 bottom-0 top-0 w-3/4 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-20"
                  style={{
                    backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
                    filter: 'invert(1)',
                    mixBlendMode: 'screen',
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">Safari Helpdesk</span>
                  <h4 className="text-2xl font-serif font-bold text-white">Need Help Planning Your Route?</h4>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                    Call our safari booking desk at <strong className="text-white font-semibold">{contactInfo.safari.phone}</strong> for transport transfers and entry gate guidance.
                  </p>
                  <button 
                    onClick={onOpenBooking} 
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25"
                  >
                    Reserve Safari Permit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
