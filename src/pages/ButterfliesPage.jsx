import React from 'react';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { butterfliesData } from '../data/parkContent';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function ButterfliesPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Butterflies & Insects of Rajaji National Park | Lepidoptera Diversity"
        description="Discover the vibrant butterflies, moths, and insects of Rajaji National Park. Common Mormon, Peacock Pansy, Lime Butterfly, and riverbank mud-puddling ecology."
        keywords="butterflies of rajaji national park, insect biodiversity uttarakhand, lepidoptera shivalik foothills, mud puddling butterflies ganges"
        ogImage={safariImages.pinkFlower}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-safari-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={safariImages.pinkFlower}
            alt="Butterfly on forest flower"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider mb-4 border border-safari-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Insect Biodiversity
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Butterflies & Insects of Rajaji
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              From dazzling swallowtails congregating along wet river sandbanks to cryptic forest moths, Rajaji’s warm tropical valleys nurture a thriving insect realm essential for forest pollination.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Mud Puddling */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mud-Puddling Phenomenon
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              During the pre-monsoon and post-monsoon months, hundreds of Common Emigrants, Grass Yellows, and Swallowtails gather in spectacular clusters on the damp sandbanks of the Song and Suswa riverbeds to extract essential mineral salts, creating unforgettable flashes of fluttering yellow and white.
            </p>
          </div>
        </div>

        {/* Species Cards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Prominent Butterfly Species
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {butterfliesData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400 block mb-1">
                    Family: {item.family}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    <strong>Habitat:</strong> {item.habitat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gray-900 text-white border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold mb-1">Experience Rajaji’s Natural Wonders</h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Macro-photography and botanical walks available with expert naturalists.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
          >
            Book Nature Tour
          </button>
        </div>

      </section>
    </div>
  );
}
