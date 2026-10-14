import React, { useState, useEffect } from 'react';
import { Feather, Compass, Check, AlertCircle, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CoverImage from '../components/CoverImage';
import ThumbImage from '../components/ThumbImage';
import PageHero from '../components/PageHero';

export default function BirdsPage({ onOpenBooking }) {
  const [birds, setBirds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setBirds(res.data.birds))
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

  const data = birds || {};
  const heroTitle = data.title || "Birds of Rajaji National Park";
  const heroSubtitle = data.subtitle || data.overview || 'Situated in the Sino-Himalayan subtropical and temperate ecotone, Rajaji harbors over 400 recorded species of resident, passage, and altitudinal migratory birds.';
  const heroBanner = data.heroBanner || safariImages.kingfisher;
  const stats = data.stats || {};
  const families = data.families || [];
  const restrictedRange = data.restrictedRange || [];
  const watchingParagraphs = (data.watchingParagraphs || []).filter(Boolean);
  const notableSpecies = (data.notableSpecies || []).filter(Boolean);
  const gallery = (data.galleryImages || []).filter(Boolean);
  const packagePhones = (data.packagesPhones || []).filter(Boolean);
  const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
  const whatsappHref = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
  };

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.kingfisher}
        alt="Crested Kingfisher at Rajaji"
      />

      {/* Birding Stats Ribbon */}
      <section className="relative z-10 py-8 bg-[#fdfcf8]/85 dark:bg-[#0c1f13]/85 backdrop-blur-md border-b border-emerald-950/10 dark:border-emerald-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSpecies || '400+'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Recorded Species</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.residentSpecies || '151'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Resident Species</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-blue-600 dark:text-cyan-400">{stats.winterMigrants || '87'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Winter Migrants</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.woodpeckers || '11'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Woodpecker Species</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bird Watching in Rajaji (client document section) */}
      {(watchingParagraphs.length > 0 || notableSpecies.length > 0) && (
        <section className="relative z-10 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {data.watchingTitle || 'Bird Watching in Rajaji National Park'}
              </h2>
              {watchingParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">{paragraph}</p>
              ))}
            </div>
            {notableSpecies.length > 0 && (
              <div className="lg:col-span-5">
                <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-4">Birds Recorded in Rajaji</h3>
                  <ul className="flex flex-wrap gap-2">
                    {notableSpecies.map((species) => (
                      <li key={species} className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-900/10 dark:border-emerald-800/40 px-3 py-1.5 text-xs font-medium text-gray-800 dark:text-emerald-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {species}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bird Families Catalog */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
            AVIAN DIVERSITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Notable Avian Families</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Explore the flagship bird groups inhabiting the canopy, waterways, and grasslands of Rajaji.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {families.map((fam, idx) => (
            <div key={idx} className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 hover:shadow-2xl transition duration-500 flex flex-col justify-between">
              <div>
                <CoverImage src={fam.image} alt={fam.group} icon={Feather} className="-mx-7 -mt-7 mb-5" />
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">{fam.group}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{fam.desc}</p>
                <div className="space-y-2">
                  {(fam.species || []).map((sp, sIdx) => (
                    <div key={sIdx} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-900/10 dark:border-emerald-800/40 text-[11px] text-gray-400 dark:text-emerald-200/60">
                Sighted across Sal canopy & riparian zones
              </div>
            </div>
          ))}
        </div>

        {/* Endemic & Restricted Range Species */}
        {restrictedRange.length > 0 && (
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Western Himalayas Endemic Bird Area (EBA) Species
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl">
              Rajaji is an internationally recognized Important Bird Area (IBA) due to its protection of critical restricted-range passerines during winter altitudinal migration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {restrictedRange.map((rr, rIdx) => (
                <div key={rIdx} className="bg-[#f5f2e8]/90 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/40 flex items-center gap-3">
                  <ThumbImage src={rr.image} alt={rr.name} icon={Feather} />
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 dark:text-white text-sm block mb-1">{rr.name}</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{rr.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Birds of Rajaji photo gallery */}
        {gallery.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">Birds of Rajaji Gallery</h3>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {gallery.map((src, idx) => (
                <div key={`${src}-${idx}`} className="mb-5 break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group bg-gray-200 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                  <img src={src} alt={`Bird photographed in Rajaji National Park ${idx + 1}`} loading="lazy" className="w-full h-auto block group-hover:scale-105 transition duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking CTA - Deep Forest with Tiger Watermark */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-[#07150c] text-white border border-emerald-900/40 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="absolute right-0 bottom-0 top-0 w-2/3 max-w-sm bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
            style={{
              backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
          />
          <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold mb-1">{data.packagesTitle || 'Birdwatching Packages and Enquiries'}</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              {data.packagesText || 'Birdwatching and wildlife tour packages are available on request.'}
            </p>
            {data.packagesContactName && (
              <p className="mt-3 text-sm font-semibold text-white">
                For bookings and enquiries: {data.packagesContactName}
                {packagePhones.length > 0 && <span className="font-normal text-emerald-100/80"> · {packagePhones.join(' | ')}</span>}
              </p>
            )}
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 shrink-0">
            {packagePhones.length > 0 ? (
              <>
                <a href={telHref(packagePhones[0])} className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md">
                  Call Now
                </a>
                <a href={whatsappHref(packagePhones[0])} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-full border border-emerald-400/60 hover:bg-emerald-900/60 text-white font-bold text-xs uppercase tracking-wider transition">
                  WhatsApp
                </a>
              </>
            ) : (
              <button onClick={onOpenBooking} className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md">
                Reserve Birding Safari
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
