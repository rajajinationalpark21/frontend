import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, ShieldCheck, Clock, MapPin, Check, Phone, MessageSquare, Ticket, Sparkles } from 'lucide-react';
import { contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);

  const phone = content?.settings?.contact?.phone || contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I would like to book River Rafting near Rajaji National Park and Rishikesh.")}`;

  const raftingData = content?.rafting || {};
  const stretchesList = (raftingData.stretches && raftingData.stretches.length > 0)
    ? raftingData.stretches
    : fallbackRaftingStretches;

  const pageTitle = raftingData.title || "River Rafting on the Ganges";
  const pageSubtitle = raftingData.subtitle || "Combine your Rajaji wildlife jeep safari with world-renowned white-water rafting along the sacred Ganges river as it carves through the forested Shivalik valleys of Uttarakhand.";
  const safetyRules = raftingData.safetyGuidelines || [];

  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        title="River Rafting in Rishikesh & Rajaji | White Water Rafting"
        description="Experience world-class white water river rafting on the Holy Ganges adjoining Rajaji National Park. 9km, 16km, and 26km rafting stretches with certified river guides."
        keywords="river rafting rishikesh, ganga rafting rajaji, white water rafting shivpuri, adventure activities rajaji"
        ogImage={safariImages.riverCruise}
      />

      {/* Hero Header - Deep Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative py-24 lg:py-28 bg-[#07150c] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.riverCruise} alt="River Rafting in Ganges" className="w-full h-full object-cover opacity-35 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/95 via-[#07150c]/85 to-[#07150c]" />
        </div>

        {/* Botanical leaf vein texture */}
        <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

        {/* Tiger watermark stencil */}
        <div 
          className="absolute right-0 bottom-0 top-0 w-2/3 max-w-2xl bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Corner foliage flourish */}
        <div 
          className="absolute -top-10 -left-10 w-60 h-60 bg-contain bg-no-repeat pointer-events-none opacity-20 filter invert"
          style={{
            backgroundImage: `url("/images/leaf for cta.jpg")`,
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              Ganges Adventure Activities
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {pageTitle}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">
              {pageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 transition duration-200 hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book Rafting Session
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md transition duration-200 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Booking
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stretches List */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
            RIVER EXPEDITION CIRCUITS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Available Rafting Stretches
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All runs include certified rescue kayakers, international safety helmets, lifejackets, and professional instruction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stretchesList.map((run, idx) => (
            <div 
              key={idx}
              className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/30 hover:shadow-2xl transition duration-500 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
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
                  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-semibold">{run.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-400">Rapids:</span>
                    <span className="font-semibold text-right max-w-[160px] truncate">{run.rapids}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <div className="font-serif text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  {run.price}
                </div>
                <button
                  onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
                >
                  Book This Stretch
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Guidelines (if provided in DB) */}
        {safetyRules.length > 0 && (
          <div className="mt-12 bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Rafting Safety Protocols
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
