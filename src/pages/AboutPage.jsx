import React, { useState, useEffect } from 'react';
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
  Check,
  Loader2
} from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CallToAction from '../components/CallToAction';

export default function AboutPage({ onOpenBooking }) {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setAbout(res.data.about))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
      "name": "Rajaji National Park Conservation Trust",
      "foundingDate": "1983",
      "description": "Four decades of wildlife conservation, Asian elephant corridors, and Royal Bengal tiger breeding programs across Shiwalik foothills.",
      "url": "https://rajajinationalpark.org/about",
      "award": "Project Tiger Reserve Notification 2015"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = about || {};
  const stats = data.stats || {};
  const journey = data.journey || [];
  const activities = data.activities || [];

  return (
    <div className="min-h-screen bg-transparent transition-colors relative overflow-hidden">
      <SEO
        title="Our Wild Legacy & Conservation History Since 1983 | Rajaji National Park"
        description="Learn about our 40-year legacy of tiger and elephant conservation, protecting 820 sq km of pristine Himalayan foothills forest in Uttarakhand."
        keywords="rajaji national park history, tiger conservation, asian elephant corridor, c rajagopalachari reserve, eco-tourism uttarakhand"
        ogImage={safariImages.tigerPortrait}
        schemaJson={aboutSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[620px] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="w-full h-full absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${safariImages.aboutHero}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-500/30 text-emerald-400 mb-4">
            <span className="text-[11px] font-bold tracking-widest uppercase">
              ESTD. 1983 • UTTARAKHAND
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4 font-serif">
            {data.title || 'Our Wild Legacy'}
          </h1>
          <p className="text-base sm:text-lg text-gray-200/95 font-normal leading-relaxed max-w-2xl mx-auto">
            {data.subtitle || 'Exploring the heart of nature, preserving wildlife corridors, and creating unforgettable adventures across the Shiwalik foothills.'}
          </p>
        </div>
      </section>

      {/* 2. PRESERVING NATURE & WILDLIFE SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40">
              <span className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                SANCTUARY ROOTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight font-serif">
              {data.missionTitle || 'Preserving Nature & Wildlife'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {data.missionText || 'Formed in 1983 by amalgamating Rajaji, Motichur, and Chilla wildlife sanctuaries, Rajaji National Park spans 820.42 sq km across the foothills of the Himalayas.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-950 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group"
              >
                <span>Book a Guided Safari</span>
                <ArrowRight className="w-4 h-4 text-safari-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Tiger Face with Quote */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-[4/3] bg-gray-100 border border-gray-200/70 dark:border-gray-800">
              <img
                src={safariImages.tigerPortrait}
                alt="Bengal tiger portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 max-w-[280px] bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-emerald-900/15 dark:border-gray-800">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 italic leading-snug">
                  "Nature does not hurry, yet everything is accomplished."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY STATS PILL CONTAINER */}
      <section className="pb-20 max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md border border-emerald-950/10 dark:border-safari-900/40 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-900/40">
                <Footprints className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-950 dark:text-white font-serif">{stats.tigers || '50+'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Royal Bengal Tigers</div>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-900/40">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-950 dark:text-white font-serif">{stats.visitors || '1M+'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Visitors Annually</div>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-900/40">
                <Bird className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-950 dark:text-white font-serif">{stats.birds || '400+'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Bird Species</div>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-900/40">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-950 dark:text-white font-serif">{stats.sqKm || '820+'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Sq Km Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY TIMELINE SECTION */}
      {journey.length > 0 && (
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Our Journey
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                From a small plot of land to a globally recognized sanctuary.
              </p>
            </div>

            <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 sm:ml-32 space-y-10">
              {journey.map((item, idx) => {
                const IconComp = milestoneIcons[item.icon] || Flag;
                return (
                  <div key={idx} className="relative pl-8 sm:pl-10 group">
                    <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-safari-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-6 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:shadow-md transition">
                      <span className="text-xs font-bold text-safari-600 dark:text-safari-400 tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. EXPERIENCE THE JUNGLE SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Experience the Jungle
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.length > 0 ? activities.map((act, idx) => (
            <div 
              key={idx}
              onClick={onOpenBooking}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer"
            >
              <img
                src={act.image || safariImages.safariJeepTrail}
                alt={act.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {act.name}
                </h3>
              </div>
            </div>
          )) : (
            <>
              <div onClick={onOpenBooking} className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer">
                <img src={safariImages.safariJeepTrail} alt="Jeep Safari" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wide">Jeep Safari</h3>
                </div>
              </div>
              <div onClick={onOpenBooking} className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer">
                <img src={safariImages.riverCruise} alt="River Cruise" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wide">River Cruise</h3>
                </div>
              </div>
              <div onClick={onOpenBooking} className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg group cursor-pointer">
                <img src={safariImages.nightSky} alt="Night Camp" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wide">Night Camp</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <CallToAction
        title="Experience the Sanctuary Firsthand"
        subtitle="Join wildlife enthusiasts from around the world who have journeyed through Rajaji. Reserve your official safari permit and registered naturalist guide today."
        primaryText="Book Your Safari"
        onPrimaryClick={onOpenBooking}
        secondaryText="Explore Safari Zones"
        secondaryLink="/safari"
        secondaryIcon={ArrowRight}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
