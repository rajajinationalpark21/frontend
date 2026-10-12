import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Heart, Sparkles, Check, ArrowRight, Loader2, PawPrint } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import ThumbImage from '../components/ThumbImage';

export default function FaunaPage({ onOpenBooking }) {
  const [fauna, setFauna] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setFauna(res.data.fauna))
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

  const data = fauna || {};
  const heroTitle = data.title || "Wildlife (Fauna) of Rajaji";
  const heroSubtitle = data.subtitle || data.overview;
  const heroBanner = data.heroBanner || safariImages.walkingTiger;
  const primeAttractions = data.primeAttractions || [];
  const herbivores = data.herbivores || [];
  const carnivores = data.carnivores || [];
  const reptiles = data.reptiles || [];

  return (
    <div className="relative min-h-screen bg-transparent transition-colors">
      <SEO
        ogImage={heroBanner}
      />

      {/* Hero Header */}
      <section className="relative flex min-h-[460px] items-center py-24 sm:min-h-[540px] lg:min-h-[620px] lg:py-28 bg-[#07150c] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="Royal Bengal Tiger in Rajaji"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallbackUsed && safariImages.walkingTiger) {
                img.dataset.fallbackUsed = "1";
                img.src = safariImages.walkingTiger;
              } else {
                img.style.display = "none";
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-[#07150c]/90" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Prime Attractions */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
              Apex Predators & Keystone Species
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Prime Wildlife Attractions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primeAttractions.map((animal, idx) => (
              <div key={idx} className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-2xl transition duration-500">
                <CoverImage src={animal.image} alt={animal.name} icon={PawPrint} className="-mx-8 -mt-8 mb-6" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      Population: {animal.count}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">{animal.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{animal.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Herbivores & Carnivores Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Herbivores & Grazers</h3>
            <div className="space-y-3.5">
              {herbivores.map((h, hIdx) => (
                <div key={hIdx} className="bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex items-center gap-3">
                  <ThumbImage src={h.image} alt={h.name} icon={PawPrint} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{h.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{h.info}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Carnivores & Forest Hunters</h3>
            <div className="space-y-3.5">
              {carnivores.map((c, cIdx) => (
                <div key={cIdx} className="bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex items-center gap-3">
                  <ThumbImage src={c.image} alt={c.name} icon={PawPrint} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.info}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reptilian Diversity */}
        {reptiles && reptiles.length > 0 && (
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                  Forest Floor & Riparian Wildlife
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Reptilian Diversity</h3>
              </div>
              <Link
                to="/reptiles-of-rajaji-national-park"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 uppercase tracking-wider transition"
              >
                <span>Explore All Reptiles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reptiles.map((rep, rIdx) => (
                <div key={rIdx} className="bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex items-center gap-3">
                  <ThumbImage src={rep.image} alt={rep.name} icon={PawPrint} size={44} />
                  <div>
                    <strong className="text-gray-900 dark:text-white block text-sm">{rep.name}</strong>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{rep.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
