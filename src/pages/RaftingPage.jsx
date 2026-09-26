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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="River Rafting in Rishikesh & Rajaji | White Water Rafting"
        description="Experience world-class white water river rafting on the Holy Ganges adjoining Rajaji National Park. 9km, 16km, and 26km rafting stretches with certified river guides."
        keywords="river rafting rishikesh, ganga rafting rajaji, white water rafting shivpuri, adventure activities rajaji"
        ogImage={safariImages.riverCruise}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.riverCruise} alt="River Rafting in Ganges" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
              <Waves className="w-3.5 h-3.5" />
              Ganges Adventure Activities
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {pageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-xl transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book Rafting Session
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Booking
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition"
              >
                <Phone className="w-4 h-4 text-safari-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stretches List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
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
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 hover:shadow-xl transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400">
                    {run.level}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {run.distance}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {run.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {run.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
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
                <div className="text-xl font-black text-safari-600 dark:text-safari-400">
                  {run.price}
                </div>
                <button
                  onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                  className="w-full py-3 rounded-xl bg-safari-600 hover:bg-safari-700 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Book This Stretch
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Guidelines (if provided in DB) */}
        {safetyRules.length > 0 && (
          <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-safari-600" /> Rafting Safety Protocols
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
              {safetyRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
