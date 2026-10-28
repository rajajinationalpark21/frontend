import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Heart, Sparkles, Check, ArrowRight, Loader2, PawPrint } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import ThumbImage from '../components/ThumbImage';
import PageHero from '../components/PageHero';
import Breadcrumb from '../components/Breadcrumb';
import GroupDropdownCard from '../components/GroupDropdownCard';
import { DocSection } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import RichText from '../components/RichText';

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

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.walkingTiger}
        alt={data.heroImageAlt || "Royal Bengal Tiger in Rajaji"}
      />

      {/* Link back to the Wildlife & Biodiversity main page (hub doc) */}
      <Breadcrumb parent={{ label: 'Wildlife & Biodiversity', path: '/wildlife-biodiversity-rajaji-tiger-reserve' }} current="Mammals of Rajaji" />

      {/* The client's page document: intro and sections not shown below */}
      <DocSection blocks={data.docBlocks} onBooking={onOpenBooking} />

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
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"><RichText text={animal.details} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Herbivores & Carnivores: each group's animals open as a dropdown on hover or tap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Herbivores & Grazers', items: herbivores },
            { title: 'Carnivores & Forest Hunters', items: carnivores },
          ]
            .filter((group) => group.items.length > 0)
            .map((group) => (
              <GroupDropdownCard
                key={group.title}
                title={group.title}
                image={group.items.find((item) => item.image)?.image}
                icon={PawPrint}
                items={group.items.map((item) => ({ name: item.name, info: item.info, image: item.image }))}
                thumbs
              />
            ))}
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
                to="/reptiles-of-rajaji-tiger-reserve"
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

      <PhotoGallery title={data.galleryTitle || 'Mammals of Rajaji – Photo Gallery'} images={data.galleryImages} alts={data.galleryAlts} />
    </div>
  );
}
