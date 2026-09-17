import React, { useState, useEffect } from 'react';
import { Trees, Compass, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function FloraPage({ onOpenBooking }) {
  const [flora, setFlora] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setFlora(res.data.flora))
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

  const data = flora || {};
  const altitudinalBands = data.altitudinalBands || [];
  const dominantTrees = data.dominantTrees || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Flora & Forest Types | Sal Forest Ecology of Rajaji National Park"
        description="Botanical diversity of Rajaji National Park. Shorea robusta (Sal) forests, riverine Khair-Sissoo woodlands, medicinal trees, and altitudinal forest bands."
        keywords="flora of rajaji national park, sal forest shorea robusta uttarakhand, tree species shivalik hills, medicinal plants rajaji"
        ogImage={safariImages.tropicalLeafDew}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.mistyDarkPines} alt="Dense Sal forest canopy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">Flora & Forest Types of Rajaji</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.overview}</p>
          </div>
        </div>
      </section>

      {/* Altitudinal Bands */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Altitudinal Vegetation Bands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {altitudinalBands.map((band, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className="font-extrabold text-safari-600 dark:text-safari-400 text-sm block mb-1">{band.band}</span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{band.trees}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dominant Trees Catalog */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Major Forest Tree Species</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">The foundational trees and flowering hardwoods forming Rajaji's multi-tiered forest canopy.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Botanical / Scientific Name</th>
                  <th className="px-6 py-4">Botanical Family</th>
                  <th className="px-6 py-4">Ecological Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {dominantTrees.map((tree, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{tree.common}</td>
                    <td className="px-6 py-4 italic text-emerald-600 dark:text-emerald-400 font-medium">{tree.scientific}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">{tree.family}</td>
                    <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">{tree.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience the Pristine Sal Canopy</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">Witness ancient Shorea robusta trees towering over 100 feet tall on an open-top gypsy safari drive through Chila and Motichur ranges.</p>
          </div>
          <button onClick={onOpenBooking} className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shrink-0">
            Plan Jungle Tour
          </button>
        </div>
      </section>
    </div>
  );
}
