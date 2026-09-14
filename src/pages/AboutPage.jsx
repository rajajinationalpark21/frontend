import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Footprints, 
  Bird, 
  Mountain, 
  Users, 
  ArrowRight, 
  Flag, 
  Shield, 
  Award, 
  Sparkles,
  Check
} from 'lucide-react';
import { safariImages, journeyMilestones } from '../data/safariData';
import SEO from '../components/SEO';

export default function AboutPage({ onOpenBooking }) {
  const milestoneIcons = {
    flag: Flag,
    shield: Shield,
    award: Award,
    star: Sparkles,
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Jungle Safari Conservation Trust",
      "foundingDate": "1995",
      "description": "Three decades of wildlife conservation, elephant corridors, and Royal Bengal tiger breeding programs.",
      "url": "https://junglesafari.org/about",
      "award": "Global Conservation Award 2015"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Our Wild Legacy & Conservation History Since 1995 | Jungle Safari"
        description="Learn about our 30-year legacy of tiger conservation, protecting 120 sq km of pristine forest, and supporting ethical, community-driven eco-tourism."
        keywords="tiger conservation, wildlife sanctuary history, sanctuary legacy, royal bengal tiger protection, eco-tourism"
        ogImage={safariImages.tigerPortrait}
        schemaJson={aboutSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[620px] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${safariImages.aboutHero}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold tracking-widest text-safari-400 uppercase mb-3">
            ESTD. 1983 • UTTARAKHAND
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Our Wild Legacy
          </h1>
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Exploring the heart of nature, preserving wildlife corridors, and creating unforgettable adventures across the Shiwalik foothills.
          </p>
        </div>
      </section>

      {/* 2. PRESERVING NATURE & WILDLIFE SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Preserving Nature & Wildlife
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Formed in 1983 by amalgamating Rajaji, Motichur, and Chilla wildlife sanctuaries, Rajaji National Park spans 820.42 sq km across the foothills of the Himalayas. Our mission has always been conservation first, maintaining crucial elephant corridors and tiger habitats.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Protected under Project Tiger and Project Elephant, our dedicated rangers and eco-naturalists monitor migration trails along the Ganges basin, ensuring ethical, zero-disturbance exploration for travelers worldwide.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-safari-600 transition group"
              >
                Book a Guided Safari
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          {/* Right Tiger Face with Quote */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3] bg-gray-100">
              <img
                src={safariImages.tigerPortrait}
                alt="Bengal tiger portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              {/* Floating Quote Box */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 max-w-[280px] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-800 italic leading-snug">
                  "Nature does not hurry, yet everything is accomplished."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY STATS PILL CONTAINER */}
      <section className="pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-safari-card/70 border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 shadow-sm">
                <Footprints className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900">50+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Royal Bengal Tigers</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900">500+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Asian Elephants</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 shadow-sm">
                <Bird className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900">400+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Bird Species</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 shadow-sm">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900">820+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Sq Km Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY TIMELINE SECTION */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Journey
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              From a small plot of land to a globally recognized sanctuary.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-32 space-y-10">
            {journeyMilestones.map((item, idx) => {
              const IconComp = milestoneIcons[item.icon] || Flag;
              return (
                <div key={idx} className="relative pl-8 sm:pl-10 group">
                  {/* Timeline Badge Node */}
                  <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-safari-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                    <IconComp className="w-4 h-4" />
                  </div>

                  {/* Year Tag & Content Card */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <span className="text-xs font-bold text-safari-600 tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE THE JUNGLE SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Experience the Jungle
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              More than just a drive, it's an immersion.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-xs font-bold text-safari-600 hover:text-safari-700 transition"
          >
            View All Activities
          </button>
        </div>

        {/* 3 Immersive Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Jeep Safari */}
          <div 
            onClick={onOpenBooking}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer"
          >
            <img
              src={safariImages.safariJeepTrail}
              alt="Jeep Safari"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Jeep Safari
              </h3>
            </div>
          </div>

          {/* Card 2: River Cruise */}
          <div 
            onClick={onOpenBooking}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer"
          >
            <img
              src={safariImages.riverCruise}
              alt="River Cruise"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                River Cruise
              </h3>
            </div>
          </div>

          {/* Card 3: Night Camp */}
          <div 
            onClick={onOpenBooking}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer"
          >
            <img
              src={safariImages.nightSky}
              alt="Night Camp"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Night Camp
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
