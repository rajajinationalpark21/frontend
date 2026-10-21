import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Building2, ExternalLink, Calendar, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import { DocSection } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import { cmsText } from '../utils/cmsText';

const DEFAULT_FRH_COLUMNS = ["Forest Rest House", "Suites Available", "Current Status", "Entry Gate Access", "Setting & Atmosphere"];

export default function StayPage({ onOpenBooking }) {
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setStay(res.data.stay))
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

  const data = stay || {};
  const wildBrook = data.wildBrook || {};
  const forestRestHouses = data.forestRestHouses || [];
  const frhBookingInfo = data.frhBookingInfo || {};
  const cta = data.ctaBand || {};
  const wildBrookButton = cmsText(wildBrook.buttonText, 'Inquire for Wild Brook Booking');
  const frhEyebrow = cmsText(data.frhEyebrow, 'Colonial Heritage Forest Lodges');
  const frhTitle = cmsText(data.frhTitle, 'Forest Rest Houses (FRH) of Rajaji');
  const frhIntro = cmsText(data.frhIntro, 'Managed directly by the Uttarakhand Forest Department, these historic colonial-era rest houses offer rustic charm, prime wildlife proximity, and complete seclusion.');
  const frhColumns = DEFAULT_FRH_COLUMNS.map((fallback, index) => cmsText(data.frhColumns?.[index], fallback));
  const frhBookingTitle = cmsText(frhBookingInfo.title, 'How to Book Forest Rest Houses');
  const frhBookingButton = cmsText(frhBookingInfo.buttonText, 'Safari & Stay Assistance');

  const heroTitle = data.title;
  const heroSubtitle = data.subtitle || data.overview;
  const heroBanner = (data.heroBanner && data.heroBanner.trim()) || "/images/stay/gohari-safari.jpg";

  return (
    <div className="relative min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors">
      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle || "Stay in Rajaji National Park"}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage="/images/stay/gohari-safari.jpg"
        alt={data.heroImageAlt || "Stay in Rajaji"}
      />

      {/* The client's "Stay in Rajaji" document */}
      <DocSection blocks={data.docBlocks} onBooking={onOpenBooking} />
      {data.docBlocks?.length > 0 && (
        <div className="pt-12">
          <PhotoGallery title={data.galleryTitle} images={data.galleryImages || []} altPrefix={data.heroImageAlt || heroTitle} />
        </div>
      )}

      {/* Wild Brook Retreat Showcase */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-emerald-50">{wildBrook.name}</h2>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-base mt-1">{wildBrook.tagline}</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-emerald-100/80 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{wildBrook.location} ({wildBrook.distance})</span>
              </div>
              <div className="space-y-3">
                {(wildBrook.features || []).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-emerald-100/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-emerald-900/10 dark:border-emerald-800/30 flex flex-wrap items-center gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-900 dark:text-emerald-100 font-medium">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{wildBrook.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-900 dark:text-emerald-100 font-medium">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{(wildBrook.email || '').split('/')[0]}</span>
                </div>
              </div>
              {wildBrookButton && (
                <div className="pt-2">
                  <button 
                    onClick={onOpenBooking} 
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25"
                  >
                    {wildBrookButton}
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <img 
                  src={(wildBrook.mainImage && wildBrook.mainImage.trim()) || "/images/stay/wild-brook-stream.jpg"} 
                  alt={cmsText(wildBrook.mainImageAlt, 'Wild Brook Retreat valley stream')} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-700" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={(wildBrook.leafImage && wildBrook.leafImage.trim()) || "/images/stay/rajaji-foliage.jpg"} 
                    alt={cmsText(wildBrook.leafImageAlt, 'Native Rajaji forest foliage')} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={(wildBrook.sunsetImage && wildBrook.sunsetImage.trim()) || "/images/stay/gohari-wildlife.png"} 
                    alt={cmsText(wildBrook.sunsetImageAlt, 'Spotted deer in Gohri meadow')} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forest Rest Houses (FRHs) Section */}
      <section className="relative z-10 py-16 border-t border-emerald-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            {frhEyebrow && (
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                {frhEyebrow}
              </span>
            )}
            {frhTitle && (
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 dark:text-emerald-50">
                {frhTitle}
              </h2>
            )}
            {frhIntro && (
              <p className="text-sm text-gray-600 dark:text-emerald-100/75 mt-2 leading-relaxed font-light">
                {frhIntro}
              </p>
            )}
          </div>

          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border-b border-emerald-900/15">
                  <tr>
                    {frhColumns.map((column, index) => (
                      <th key={index} className="px-6 py-4">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/10 dark:divide-emerald-900/30">
                  {forestRestHouses.map((frh, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-emerald-100">{frh.name}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-emerald-200">{frh.suites}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${frh.status.includes('Operational') ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'}`}>{frh.status}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{frh.gate}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-emerald-300/70">{frh.setting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FRH Booking Procedure Box with Deep Forest Tone, Leaf Watermark & Tiger Stencil */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#07150c] via-[#091b10] to-[#040b06] text-white p-8 sm:p-10 rounded-3xl border border-safari-500/30 shadow-2xl flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Corner Botanical Foliage Watermark */}
            <div 
              className="absolute -top-10 -left-10 w-56 h-56 opacity-[0.16] pointer-events-none bg-contain bg-no-repeat rotate-180"
              style={{ 
                backgroundImage: `url("/images/leaf%20for%20cta.jpg")`, 
                filter: 'invert(1) hue-rotate(90deg) brightness(1.2)', 
                mixBlendMode: 'screen' 
              }}
            />
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-20"
              style={{
                backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
                filter: 'invert(1)',
                mixBlendMode: 'screen',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-3 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                {frhBookingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                {frhBookingInfo.bookingRule}
              </p>
              <div className="text-xs text-emerald-200/70 pt-2 space-y-1">
                {frhBookingInfo.authority && <div><strong>Authority:</strong> {frhBookingInfo.authority}</div>}
                {frhBookingInfo.address && <div><strong>Address:</strong> {frhBookingInfo.address}</div>}
                {frhBookingInfo.phone && <div><strong>Office Tel:</strong> {frhBookingInfo.phone}</div>}
              </div>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col gap-3 w-full md:w-auto">
              {frhBookingButton && (
                <button 
                  onClick={onOpenBooking} 
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 text-center"
                >
                  {frhBookingButton}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title={cmsText(cta.title, "Experience a Night Inside the Sanctuary?")}
        subtitle={cmsText(cta.subtitle, "Wake up to the sounds of the jungle. Book official Forest Rest Houses or nearby eco-resorts combined with morning gypsy safari permits.")}
        primaryText={cmsText(cta.primaryText, "Plan Safari & Stay")}
        onPrimaryClick={onOpenBooking}
        secondaryText={cmsText(cta.secondaryText, "View Safari Zones")}
        secondaryLink={cta.secondaryLink || "/zones"}
        secondaryIcon={Building2}
        bgImage={cta.bgImage || safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
