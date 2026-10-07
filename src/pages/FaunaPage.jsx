import React, { useState, useEffect } from 'react';
import { Eye, ShieldCheck, Heart, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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
  const primeAttractions = data.primeAttractions || [];
  const herbivores = data.herbivores || [];
  const carnivores = data.carnivores || [];
  const reptiles = data.reptiles || [];
  const aquaticLife = data.aquaticLife || {};

  return (
    <div className="relative min-h-screen bg-transparent transition-colors">
      <SEO
        title="Wildlife & Fauna | Asian Elephants, Tigers, Leopards of Rajaji"
        description="Explore the rich fauna of Rajaji National Park. Asian elephants under Project Elephant, Royal Bengal Tigers, Indian leopards, deer, reptiles, and aquatic species in the Ganges."
        keywords="fauna of rajaji national park, asian elephant population uttarakhand, royal bengal tiger rajaji tiger reserve, leopard sighting chilla"
        ogImage={safariImages.walkingTiger}
      />

      {/* Hero Header - Deep Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative py-24 lg:py-28 bg-[#07150c] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.walkingTiger} alt="Royal Bengal Tiger in Rajaji" className="w-full h-full object-cover opacity-35 mix-blend-luminosity" />
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
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Faunal Sanctuary Records
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Wildlife (Fauna) of Rajaji
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">{data.overview}</p>
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
              <div key={idx} className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-2xl transition duration-500">
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
                <div key={hIdx} className="bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{h.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{h.info}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Carnivores & Forest Hunters</h3>
            <div className="space-y-3.5">
              {carnivores.map((c, cIdx) => (
                <div key={cIdx} className="bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{c.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reptiles & Aquatic Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-4">Reptilian Diversity</h3>
            <div className="space-y-3">
              {reptiles.map((rep, rIdx) => (
                <div key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{rep.name}</strong>
                    <span className="text-gray-500 dark:text-gray-400">{rep.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">Aquatic & River Ecosystem</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{aquaticLife.rivers}</p>
              <div className="flex flex-wrap gap-2">
                {(aquaticLife.fishes || []).map((fish, fIdx) => (
                  <span key={fIdx} className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">{fish}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button onClick={onOpenBooking} className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md">
                Track Wildlife on Safari
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
