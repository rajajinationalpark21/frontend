import React from 'react';
import { Plane, Train, Car, MapPin, Clock, ArrowRight, Navigation, Compass, ShieldCheck } from 'lucide-react';
import { howToReachData } from '../data/parkContent';
import { safariImages, contactInfo } from '../data/safariData';
import SEO from '../components/SEO';

export default function HowToReachPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="How to Reach Rajaji National Park | Flights, Trains & Road Routes"
        description="Complete travel and transit guide to Rajaji National Park. Nearest airport Jolly Grant Dehradun, train stations at Haridwar & Rishikesh, and road directions from Delhi."
        keywords="how to reach rajaji national park, jolly grant airport dehradun to rajaji, haridwar to chilla safari, delhi to rajaji distance road route"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={safariImages.safariJeepRiver}
            alt="Transit to Rajaji"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Navigation className="w-3.5 h-3.5" />
              Visitor Transit Guide
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              How to Reach Rajaji National Park
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Conveniently situated in Uttarakhand along the Himalayan foothills, Rajaji is accessible within hours from New Delhi by high-speed trains, expressways, and direct flights.
            </p>
          </div>
        </div>
      </section>

      {/* Three Modes Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* By Air */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-safari-500/50 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Plane className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">By Air</h2>
              <div className="text-sm font-semibold text-safari-600 dark:text-safari-400 mb-4">
                {howToReachData.air.airport}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                {howToReachData.air.details}
              </p>
              <div className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Distance to Park</span>
                  <span className="font-bold text-gray-900 dark:text-white">{howToReachData.air.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Flight from Delhi</span>
                  <span className="font-bold text-gray-900 dark:text-white">{howToReachData.air.flightTime}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                Pre-booked airport taxis available 24/7
              </span>
            </div>
          </div>

          {/* By Rail */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-safari-500/50 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Train className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">By Rail</h2>
              <div className="text-sm font-semibold text-safari-600 dark:text-safari-400 mb-4">
                {howToReachData.rail.nearestRailhead}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                Haridwar Junction is one of the busiest railheads in Northern India, with direct high-speed links to all major metros.
              </p>
              
              <div className="space-y-2 mb-4">
                {howToReachData.rail.stations.map((st, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800/80 p-3 rounded-lg text-xs border border-gray-100 dark:border-gray-700">
                    <div className="font-bold text-gray-900 dark:text-white">{st.name}</div>
                    <div className="text-safari-600 dark:text-safari-400 font-medium">{st.distance}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-xs">
              <div className="text-gray-500 dark:text-gray-400 font-semibold mb-1">Key Trains:</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Shatabdi Express, Vande Bharat, Jan Shatabdi
              </div>
            </div>
          </div>

          {/* By Road */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-safari-500/50 transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Car className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">By Road</h2>
              <div className="text-sm font-semibold text-safari-600 dark:text-safari-400 mb-4">
                {howToReachData.road.delhiDistance}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                Smooth 4-lane highway drive from Delhi via the Meerut Expressway & NH-334 right to Haridwar and Chilla.
              </p>

              <div className="bg-white dark:bg-gray-800/80 p-3.5 rounded-lg text-xs border border-gray-100 dark:border-gray-700 mb-4">
                <div className="font-bold text-gray-900 dark:text-white mb-2">Driving Itinerary:</div>
                <div className="flex flex-wrap items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  {howToReachData.road.routeSteps.map((step, sIdx) => (
                    <span key={sIdx} className="inline-flex items-center gap-1">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{step}</span>
                      {sIdx < howToReachData.road.routeSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-safari-500 shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-xs flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Road Quality</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">4-Lane Express Highway</span>
            </div>
          </div>

        </div>
      </section>

      {/* Distance Table & Regional Attractions */}
      <section className="py-12 bg-gray-50/60 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Distance to Rajaji National Park
              </h3>
              <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase">
                    <tr>
                      <th className="px-5 py-3.5">Starting City / Hub</th>
                      <th className="px-5 py-3.5 text-right">Distance to Park</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {howToReachData.road.distances.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{item.from}</td>
                        <td className="px-5 py-3 text-right font-bold text-safari-600 dark:text-safari-400">{item.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geographic Coordinates & Advisory */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-safari-600" />
                  Park Geographic Coordinates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                    <span className="block text-gray-500 dark:text-gray-400 text-xs">Latitude Range</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{howToReachData.coordinates.latitude}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                    <span className="block text-gray-500 dark:text-gray-400 text-xs">Longitude Range</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{howToReachData.coordinates.longitude}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                  The park represents the Shivalik-Himalayan ecotone extending across Dehradun, Haridwar, and Pauri Garhwal districts.
                </p>
              </div>

              {/* Booking CTA card */}
              <div className="bg-gradient-to-br from-safari-900 to-safari-950 p-6 rounded-2xl text-white border border-safari-800 shadow-md">
                <h4 className="text-lg font-bold mb-2">Need Help Planning Your Route?</h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                  Call our safari booking desk at <strong className="text-white">{contactInfo.safari.phone}</strong> for transport transfers and entry gate guidance.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Reserve Safari Permit
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
