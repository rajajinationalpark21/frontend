import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, ShieldCheck, Clock, MapPin, Check, Sparkles } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import PageLoader from '../components/PageLoader';
import CoverImage from '../components/CoverImage';
import PageHero from '../components/PageHero';
import { DocSection } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import { cmsText } from '../utils/cmsText';

const fallbackRaftingStretches = [
  {
    name: "Shivpuri to Rishikesh",
    distance: "16 km Stretch",
    duration: "Approx. 3 to 3.5 Hours",
    rapids: "Grade II & III (Roller Coaster, Golf Course, Clubhouse)",
    level: "Moderate (Most Popular)",
    price: "₹1,000 – ₹1,200 per person",
    desc: "The classic white-water run navigating exhilarating class III rapids through scenic Shivalik gorges directly adjacent to the northern border of Rajaji Tiger Reserve.",
  },
  {
    name: "Marine Drive to Rishikesh",
    distance: "26 km Extended Run",
    duration: "Approx. 4.5 to 5 Hours",
    rapids: "Grade III & III+ (Three Blind Mice, Roller Coaster, Golf Course)",
    level: "Advanced / Adventurous",
    price: "₹1,500 – ₹1,800 per person",
    desc: "An extended river expedition featuring 10+ exciting rapids, calm swimming sections, body surfing, and stunning riverside cliff vistas.",
  },
  {
    name: "Brahmpuri to Rishikesh",
    distance: "9 km Introductory Run",
    duration: "Approx. 1.5 to 2 Hours",
    rapids: "Grade I & II (Sweet Fall, Initiation, Double Trouble)",
    level: "Beginner & Family Friendly",
    price: "₹600 – ₹800 per person",
    desc: "A gentle introductory rafting run ideal for families, first-timers, and children seeking scenic river time without extreme turbulence.",
  },
];

export default function RaftingPage({ onOpenBooking }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }


  const raftingData = content?.rafting || {};
  const stretchesList = (raftingData.stretches && raftingData.stretches.length > 0)
    ? raftingData.stretches
    : fallbackRaftingStretches;

  const pageTitle = raftingData.title || "River Rafting on the Ganges";
  const pageSubtitle = raftingData.subtitle || "Combine your Rajaji wildlife jeep safari with world-renowned white-water rafting along the sacred Ganges river as it carves through the forested Shivalik valleys of Uttarakhand.";
  const heroBanner = raftingData.heroBanner || safariImages.riverCruise;
  const safetyRules = raftingData.safetyGuidelines || [];
  const eyebrow = cmsText(raftingData.stretchesEyebrow, 'RIVER EXPEDITION CIRCUITS');
  const stretchesTitle = cmsText(raftingData.stretchesTitle, 'Available Rafting Stretches');
  const stretchesIntro = cmsText(raftingData.stretchesIntro, 'All runs include certified rescue kayakers, international safety helmets, lifejackets, and professional instruction.');
  const stretchButtonText = cmsText(raftingData.stretchButtonText, 'Book This Stretch');
  const safetyTitle = cmsText(raftingData.safetyTitle, 'Rafting Safety Protocols');

  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero title={pageTitle} subtitle={pageSubtitle} image={raftingData.heroImages?.length ? raftingData.heroImages : heroBanner} fallbackImage={safariImages.riverCruise} alt={raftingData.heroImageAlt || "River rafting in Ganges"} />

      {/* The client's "Rafting" document */}
      <DocSection blocks={raftingData.docBlocks} onBooking={onOpenBooking} />
      {raftingData.docBlocks?.length > 0 && (
        <div className="relative z-10 pt-12">
          <PhotoGallery title={raftingData.galleryTitle} images={raftingData.galleryImages || []} altPrefix={raftingData.heroImageAlt || pageTitle} />
        </div>
      )}

      {/* Stretches List */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
              {eyebrow}
            </span>
          )}
          {stretchesTitle && (
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {stretchesTitle}
            </h2>
          )}
          {stretchesIntro && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stretchesIntro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stretchesList.map((run, idx) => (
            <div 
              key={idx}
              className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/30 hover:shadow-2xl transition duration-500 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <CoverImage src={run.image} alt={run.name} icon={Waves} aspect="aspect-[16/9]" className="-mx-8 -mt-8 mb-2" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                    {run.level}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {run.distance}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                  {run.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {run.desc}
                </p>

                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                  {run.duration && (
                    <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-semibold">{run.duration}</span>
                    </div>
                  )}
                  {run.rapids && (
                    <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="text-gray-400">Rapids:</span>
                      <span className="font-semibold text-right max-w-[160px] truncate">{run.rapids}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <div className="font-sans text-xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums tracking-normal">
                  {run.price}
                </div>
                {stretchButtonText && (
                  <button
                    onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                    className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
                  >
                    {stretchButtonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Safety Guidelines (if provided in DB) */}
        {safetyRules.length > 0 && (
          <div className="mt-12 bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> {safetyTitle}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-gray-600 dark:text-gray-300">
              {safetyRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-gray-50/80 dark:bg-gray-800/50 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
