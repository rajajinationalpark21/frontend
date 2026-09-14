import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  ShieldCheck, 
  Check, 
  X, 
  Car, 
  Eye, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function SafariInfoPage({ onOpenBooking }) {
  const [activeZone, setActiveZone] = useState('all');

  const safariSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Jungle Safari Permit & Expedition Tour",
    "description": "Official guided 4x4 open gypsy safari exploring 5 protected wildlife zones in Jungle Safari National Reserve.",
    "brand": {
      "@type": "Brand",
      "name": "Jungle Safari"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "45",
      "highPrice": "150",
      "offerCount": "4"
    }
  };


  const zones = [
    {
      id: 'core',
      name: 'Chila Core Sanctuary Zone',
      tag: 'PRIME TIGER TERRITORY',
      description: 'The showcase zone of the reserve featuring dense Sal forest, rugged dry riverbeds (Raus), and open grasslands. Highest tiger and leopard density.',
      timings: '06:00 AM – 09:30 AM | 02:30 PM – 06:00 PM',
      entryGate: 'Chila Gate (Near Haridwar)',
      keySightings: ['Bengal Tiger', 'Leopard', 'Elephant', 'Wild Boar'],
      terrain: 'Rugged foothills, riverbed crossings',
      image: safariImages.walkingTiger,
    },
    {
      id: 'motichur',
      name: 'Motichur & Ranipur Buffer',
      tag: 'ELEPHANT CORRIDOR',
      description: 'Expansive deciduous forest corridor linking western and eastern habitats. Celebrated for large elephant breeding herds and active bird colonies.',
      timings: '06:30 AM – 10:00 AM | 02:30 PM – 05:30 PM',
      entryGate: 'Motichur Gate / Ranipur',
      keySightings: ['Asian Elephant Herds', 'Spotted Deer (Cheetal)', 'Barking Deer'],
      terrain: 'Undulating sal tree woodlands',
      image: safariImages.elephantsRiver,
    },
    {
      id: 'gohari',
      name: 'Gohari Twilight & River Range',
      tag: 'BIRDING & GORAL SANCTUARY',
      description: 'Flanking the sacred Ganges riverbank. Renowned for spectacular dusk lighting, rare Goral mountain goat sightings, and over 250 species of birds.',
      timings: '06:00 AM – 10:30 AM | 03:00 PM – 06:30 PM',
      entryGate: 'Kunao Gate / Gohari',
      keySightings: ['Great Pied Hornbill', 'Kingfisher', 'Himalayan Goral', 'Gharial'],
      terrain: 'River terraces and rocky cliffs',
      image: safariImages.kingfisher,
    },
    {
      id: 'jhilmil',
      name: 'Jhilmil Jheel Wetland Zone',
      tag: 'SWAMP DEER REFUGE',
      description: 'A 3,783-hectare saucer-shaped wetland sanctuary preserving the endangered Barasingha (Swamp Deer) and migratory Siberian waterfowl.',
      timings: '07:00 AM – 11:00 AM | 02:00 PM – 05:00 PM',
      entryGate: 'Jhilmil Gate',
      keySightings: ['Swamp Deer (Barasingha)', 'Migratory Ducks', 'Otters'],
      terrain: 'Tall marsh reedbeds and marshland',
      image: safariImages.deerGrazing,
    },
  ];

  const vehicles = [
    {
      name: 'Open 4x4 Safari Gypsy',
      seats: 'Up to 6 Visitors + Guide',
      features: ['360° unobstructed photography angles', 'Heavy-duty suspension for riverbeds', 'Mandatory registered park naturalist'],
      bestFor: 'Wildlife photographers and first-time safari explorers',
      image: safariImages.safariJeepSavannah,
    },
    {
      name: 'River Expedition Catamaran',
      seats: 'Up to 12 Passengers',
      features: ['Electric silent motor (Zero acoustic pollution)', 'Covered sun canopy', 'Stabilized viewing deck'],
      bestFor: 'River cruises, aquatic birding, and sunset wildlife observation',
      image: safariImages.riverCruise,
    },
    {
      name: 'Enclosed Expedition Cruiser',
      seats: 'Up to 8 Passengers',
      features: ['Climate controlled', 'Panoramic pop-up roof hatch', 'Generous gear storage'],
      bestFor: 'Families with young children and seniors',
      image: safariImages.safariJeepRiver,
    },
  ];

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
    <div className="min-h-screen bg-white">
      <SEO
        title="Safari Zones, Timings & Entry Permits | Jungle Safari"
        description="Explore 5 safari ranges: Chila Core, Motichur Elephant Corridor, Gohari birding, and Jhilmil wetlands. View open timings, 4x4 gypsy vehicles, and conservation rules."
        keywords="safari zones, safari timings, chila range, motichur, safari rules, 4x4 gypsy booking, national park permit"
        ogImage={safariImages.walkingTiger}
        schemaJson={safariSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative h-[55vh] min-h-[440px] max-h-[580px] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${safariImages.aboutHero}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold tracking-widest text-safari-400 uppercase mb-3">
            EXPLORATION GUIDE
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Safari Zones & Guidelines
          </h1>
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Discover the five distinct ecological ranges, open timings, custom expedition vehicles, and conservation rules.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW INFO BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Season</span>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">Oct 15 – Jun 30</p>
            <span className="text-[11px] text-gray-500">Monsoon closure Jul–Sep</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Daily Safaris</span>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">2 Shifts Daily</p>
            <span className="text-[11px] text-gray-500">Morning & Afternoon</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Permit Limit</span>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">Capped Daily</p>
            <span className="text-[11px] text-gray-500">30 vehicles / zone shift</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Guide Protocol</span>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">Mandatory</p>
            <span className="text-[11px] text-gray-500">Forest dept. certified</span>
          </div>
        </div>
      </section>

      {/* 3. SAFARI ZONES DETAIL CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-safari-600 uppercase">
            RESERVE RANGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
            Explore the Safari Zones
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Each zone encompasses distinct elevations, rivers, and wildlife sightings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-safari-700 uppercase shadow-sm">
                  {zone.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-safari-600 transition">
                    {zone.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {zone.description}
                  </p>

                  <div className="mt-5 space-y-2.5 pt-4 border-t border-gray-100 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-safari-500 shrink-0" />
                      <span className="font-semibold text-gray-900">Timings:</span> {zone.timings}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-safari-500 shrink-0" />
                      <span className="font-semibold text-gray-900">Entry Gate:</span> {zone.entryGate}
                    </div>
                  </div>

                  {/* Sighting tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {zone.keySightings.map((animal, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-safari-50 text-safari-800 text-[11px] font-semibold"
                      >
                        {animal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 px-4 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5"
                  >
                    Check Permits for {zone.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPEDITION VEHICLES */}
      <section className="py-20 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-safari-600 uppercase">
              FLEET & EQUIPMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
              Expedition Vehicles
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Custom-built safari rigs optimized for zero acoustic disturbance and maximum passenger safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{v.name}</h3>
                    <p className="text-xs font-bold text-safari-600 mt-1">{v.seats}</p>
                    <ul className="mt-4 space-y-2 text-xs text-gray-600">
                      {v.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-safari-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <span className="font-bold text-gray-800">Ideal for: </span>
                    {v.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARK RULES (DO'S & DON'TS) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-safari-600 uppercase">
            RESPONSIBLE TOURISM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
            Park Rules & Conservation Ethics
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Please strictly respect these guidelines to preserve the forest ecosystem and ensure visitor safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-safari-card/70 border border-safari-200/60 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-safari-100 flex items-center justify-center text-safari-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Mandatory Do's
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
              {parkDos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-safari-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50/40 border border-red-100 rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Strict Prohibitions (Don'ts)
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
              {parkDonts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="bg-safari-dark text-white py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Plan Your Safari?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Reserve your zone permit online in advance. Our expedition naturalists handle entry gates, gypsies, and eco-guidance.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-lg hover:shadow-xl transition active:scale-95"
            >
              Reserve Safari Permit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
