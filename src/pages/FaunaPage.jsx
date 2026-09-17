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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Wildlife & Fauna | Asian Elephants, Tigers, Leopards of Rajaji"
        description="Explore the rich fauna of Rajaji National Park. Asian elephants under Project Elephant, Royal Bengal Tigers, Indian leopards, deer, reptiles, and aquatic species in the Ganges."
        keywords="fauna of rajaji national park, asian elephant population uttarakhand, royal bengal tiger rajaji tiger reserve, leopard sighting chilla"
        ogImage={safariImages.walkingTiger}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.walkingTiger} alt="Royal Bengal Tiger in Rajaji" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Eye className="w-3.5 h-3.5" />
              Wildlife Heritage
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">Wildlife (Fauna) of Rajaji</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.overview}</p>
          </div>
        </div>
      </section>

      {/* Prime Attractions */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400 block mb-1">Apex Predators & Keystone Species</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Prime Wildlife Attractions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primeAttractions.map((animal, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-safari-500/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-safari-500/10 text-safari-600 dark:text-safari-400 text-xs font-bold uppercase">Population: {animal.count}</span>
                    <ShieldCheck className="w-5 h-5 text-safari-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{animal.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{animal.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Herbivores & Carnivores Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50/60 dark:bg-gray-900/40 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Herbivores & Grazers</h3>
            <div className="space-y-4">
              {herbivores.map((h, hIdx) => (
                <div key={hIdx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{h.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{h.info}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50/60 dark:bg-gray-900/40 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Carnivores & Forest Hunters</h3>
            <div className="space-y-4">
              {carnivores.map((c, cIdx) => (
                <div key={cIdx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{c.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reptiles & Aquatic Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reptilian Diversity</h3>
            <div className="space-y-3">
              {reptiles.map((rep, rIdx) => (
                <div key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-safari-500 shrink-0 mt-2" />
                  <div>
                    <strong className="text-gray-900 dark:text-white block">{rep.name}</strong>
                    <span className="text-gray-500 dark:text-gray-400">{rep.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aquatic & River Ecosystem</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{aquaticLife.rivers}</p>
              <div className="flex flex-wrap gap-2">
                {(aquaticLife.fishes || []).map((fish, fIdx) => (
                  <span key={fIdx} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">{fish}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button onClick={onOpenBooking} className="w-full py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm">
                Track Wildlife on Safari
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
