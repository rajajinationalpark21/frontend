import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Compass, 
  Shield, 
  ArrowRight, 
  ArrowUpRight, 
  Calendar 
} from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

const fallbackContent = {
  tagline: "Unleash Your Wild Side",
  heroTitle: "Unleash Your Wild Side",
  heroSubtitle: "Experience the heart of the jungle. Witness nature in its purest form.",
  heroBanner: safariImages.homeHero,
  timings: "06:00 AM - 06:00 PM",
  zones: "Buffer, Core & River Safari",
  rules: "Do's & Don'ts Guide",
  aboutTitle: "The Sanctuary Legacy",
  aboutDescription: "Dedicated to conservation and protecting our wildlife for generations to come. Discover the story behind the sanctuary, our efforts in anti-poaching, and how we maintain the delicate balance of the ecosystem.",
  stats: { tigers: "50+", acres: "120k" },
};

export default function HomePage({ onOpenBooking }) {
  const [content, setContent] = useState(fallbackContent);

  useEffect(() => {
    fetchContent()
      .then((data) => {
        const home = data?.data?.home || data?.home;
        if (home && home.heroTitle) {
          setContent((prev) => ({
            ...prev,
            ...home,
            heroBanner: home.heroBanner || prev.heroBanner,
            stats: { ...prev.stats, ...(home.stats || {}) },
          }));
        }
      })
      .catch(() => {});
  }, []);
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Rajaji National Park Tiger Reserve",
    "description": "Experience raw nature at Rajaji National Park. Witness Royal Bengal Tigers, Asian Elephants, and leopards in their natural habitat through guided 4x4 expeditions.",
    "url": "https://rajajinationalpark.org/",
    "image": safariImages.homeHero,
    "touristType": ["Eco-tourists", "Wildlife Photographers", "Families"],
    "availableLanguage": ["English", "Hindi"]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Rajaji National Park | Official Wildlife Reserve & Tiger Expeditions"
        description="Experience the heart of Rajaji National Park. Book guided open 4x4 jeep safaris, witness Royal Bengal Tigers and wild Asian Elephants in protected Himalayan foothills."
        keywords="rajaji national park, tiger safari booking, chilla safari, motichur zone, haridwar rishikesh safari, jeep safari permits, uttarakhand wildlife"
        ogImage={safariImages.walkingTiger}
        schemaJson={homeSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center text-center">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url("${content.heroBanner || safariImages.homeHero}")` }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-safari-400 animate-ping" />
            Official Tiger Reserve & National Park
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-5 drop-shadow-sm">
            {content.heroTitle || "Experience the Heart of the Jungle"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto font-normal mb-9">
            {content.heroSubtitle || "Track royal Bengal tigers across open meadows, listen to the forest wake at dawn, and discover a national park where every trail tells a story."}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 transition duration-200"
            >
              Explore Safari
            </button>
            <Link
              to="/gallery"
              className="px-8 py-3.5 rounded-full border-2 border-white/80 hover:border-white text-white font-semibold text-sm sm:text-base hover:bg-white/10 active:scale-95 transition duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Floating Info Cards - positioned naturally overlapping Hero & Legacy without overflow clipping */}
      <div className="relative z-20 -mt-14 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Timings */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Timings</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.timings || "06:00 AM - 06:00 PM"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Open all days except Tuesday</p>
            </div>
          </div>

          {/* Card 2: Zones */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Zones</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.zones || "Chilla, Motichur & Ranipur"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Explore 5 distinct wildlife ranges</p>
            </div>
          </div>

          {/* Card 3: Rules */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Rules</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.rules || "Do's & Don'ts Guide"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Strict conservation policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE SANCTUARY LEGACY SECTION */}
      <section className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Walking Tiger Image with EST badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3] bg-gray-100">
              <img
                src={safariImages.walkingTiger}
                alt="Bengal Tiger walking in grassland"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />
              {/* EST. 1983 Badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold text-gray-900 tracking-wider">
                EST. 1983
              </div>
            </div>
          </div>

          {/* Right: Sanctuary Legacy Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">
              CONSERVATION FIRST
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {content.aboutTitle || "The Sanctuary Legacy"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {content.aboutDescription || "Dedicated to conservation and protecting our wildlife for generations to come. Discover the story behind the sanctuary, our efforts in anti-poaching, and how we maintain the delicate balance of the ecosystem."}
            </p>

            {/* Statistics */}
            <div className="flex items-center gap-10 pt-2 border-l-2 border-safari-500 pl-5">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {content.stats?.tigers || "50+"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  Tigers Protected
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {content.stats?.sqKm || "820+"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  Sq Km of Forest
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group text-sm sm:text-base"
              >
                Read Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPTURED MOMENTS GALLERY MOSAIC */}
      <section className="py-16 bg-gray-50/60 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Captured Moments
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Glimpses of the wild, caught in the perfect light.
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group"
            >
              View Full Gallery
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Left Column: Two landscape stacked cards */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={safariImages.elephantsRiver}
                  alt="Elephants crossing river at sunset"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/9] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={safariImages.safariJeepSavannah}
                  alt="Safari 4x4 vehicle in savannah"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Middle Column: Tall portrait leopard */}
            <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition group bg-gray-200 dark:bg-gray-800 min-h-[380px] h-full">
              <img
                src={safariImages.leopardLounge}
                alt="Leopard resting on tree limb"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* Right Column: Kingfisher bird + Deer grazing */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={safariImages.kingfisher}
                  alt="Colorful Kingfisher perched on branch"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={safariImages.deerGrazing}
                  alt="Stag deer grazing in meadow"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TALES FROM THE JUNGLE SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">
            WILD JOURNAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
            Tales from Rajaji Reserve
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src={safariImages.tigerEye}
                alt="Tiger Eye"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 uppercase">
                SIGHTING REPORT
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" /> Oct 12, 2023
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-safari-600 transition leading-snug">
                  Rare Black Panther Sighting in Chilla Range
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  A once in a lifetime sighting happened yesterday evening during the routine patrol...
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition pt-2"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={safariImages.mistyHills}
                alt="Misty forest"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase">
                TRAVEL GUIDE
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" /> Sep 28, 2023
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-safari-600 transition leading-snug">
                  Best Season to Visit for Himalayan Bird Watching
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  Winter brings migratory birds from across the Himalayas to Rajaji. Here is your guide to the best spots...
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition pt-2"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={safariImages.rangerSolo}
                alt="Ranger with binoculars"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase">
                CONSERVATION
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" /> Sep 15, 2023
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-safari-600 transition leading-snug">
                  Rajaji Tiger & Elephant Corridor Protection
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  Protecting vital ecological corridors between Chilla and Motichur ranges...
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition pt-2"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="bg-safari-dark text-white py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Answer the Call of the Wild?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Permits are limited to ensure minimal disturbance to the wildlife. Plan your adventure early to secure your spot in the heart of nature.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-semibold text-sm sm:text-base transition duration-200 shadow-lg active:scale-95"
            >
              Book Permit Now
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-gray-600 hover:border-gray-400 text-white font-semibold text-sm sm:text-base hover:bg-white/5 transition duration-200 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
