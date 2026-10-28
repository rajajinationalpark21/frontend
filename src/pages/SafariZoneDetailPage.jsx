import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Calendar, ShieldCheck, 
  Check, ArrowRight, Phone, MessageSquare, Ticket, 
  HelpCircle, AlertCircle, Share2, Sparkles 
} from 'lucide-react';
import { safariZonesList, contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import { SITE_URL } from '../seo/site';
import { zoneSchema } from '../seo/schema';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import DocContent, { DOC_WIDTH } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import RichText from '../components/RichText';

export default function SafariZoneDetailPage({ onOpenBooking, defaultSlug }) {
  const params = useParams();
  const navigate = useNavigate();
  const slug = defaultSlug || params.slug;

  const [zones, setZones] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => {
        setSettings(res.data?.settings || null);
        if (res.data?.safari?.zones && res.data.safari.zones.length > 0) {
          setZones(res.data.safari.zones);
        } else {
          setZones(safariZonesList);
        }
      })
      .catch(() => {
        setZones(safariZonesList);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  // Find current zone by slug
  const cleanSlug = (slug || '').replace(/^\/+|\/+$/g, '');
  const activeZoneList = zones.length > 0 ? zones : safariZonesList;
  const currentZone = activeZoneList.find(z => 
    z.slug === cleanSlug || 
    z.name?.toLowerCase().includes(cleanSlug.replace(/-jeep-safari|-safari/g, ''))
  ) || activeZoneList[0];

  // "15 Nov – 15 Feb: 6:30 AM – 8:00 AM & 1:30 PM – 3:00 PM | ..." -> one table row per period
  const timingRows = (currentZone.timings || '')
    .split(' | ')
    .map((entry) => entry.match(/^(.+?):\s*(.+?)\s*&\s*(.+)$/))
    .filter(Boolean)
    .map(([, period, morning, afternoon]) => ({ period, morning, afternoon }));

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking(currentZone?.slug);
    } else {
      navigate(currentZone?.slug ? `/booking?zone=${currentZone.slug}` : '/booking');
    }
  };

  // The zone document's own numbers first, then the site contact numbers.
  const zonePhones = currentZone.docBlocks?.find((block) => block.t === 'contact' && block.phones?.length)?.phones || [];
  const sitePhones = [settings?.contact?.phone, settings?.contact?.tertiaryPhone].filter(Boolean);
  const phones = zonePhones.length ? zonePhones : sitePhones.length ? sitePhones : [contactInfo.phone || "+91 98298 50501"];
  const phone = phones[0];
  const cta = settings?.ctaCopy || {};
  const whatsappNum = phone.replace(/\D/g, '');
  const whatsappMessage = `Hello! I would like to book a safari for ${currentZone.name} in Rajaji National Park.`;
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMessage)}`;
  // The client's page document, when loaded, replaces the generic sections below.
  const docBlocks = currentZone.docBlocks?.length ? currentZone.docBlocks : null;

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title={currentZone.seoTitle || `${currentZone.name} | Rajaji National Park Jeep Safari`}
        description={currentZone.metaDescription || currentZone.description?.substring(0, 160)}
        keywords={`${currentZone.name}, rajaji jeep safari, ${currentZone.entryGate}, jungle safari uttarakhand`}
        ogImage={currentZone.heroImage || safariImages.safariJeepSavannah}
        schemaJson={zoneSchema(currentZone, SITE_URL)}
      />

      <PageHero
        title={(docBlocks && currentZone.docTitle) || currentZone.name}
        subtitle={(docBlocks && currentZone.docKicker?.join(' · ')) || currentZone.tag}
        image={currentZone.heroImages?.length ? currentZone.heroImages : (currentZone.heroImage || safariImages.safariJeepSavannah)}
        fallbackImage={safariImages.safariJeepSavannah}
        alt={currentZone.heroImageAlt || currentZone.name}
      />

      {/* Meta Specs Bar */}
      <section className="relative z-10 bg-[#fdfcf8]/90 dark:bg-[#0a1a0f]/90 backdrop-blur-md border-y border-emerald-900/15 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Ticket className="w-3.5 h-3.5 text-emerald-500" /> Gypsy Tariff
              </span>
              <p className="font-sans font-bold text-gray-900 dark:text-emerald-50 text-base sm:text-lg tabular-nums tracking-normal">
                {currentZone.gypsyCost || "₹3,500 per Gypsy"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-500" /> Duration
              </span>
              <p className="font-sans font-bold text-gray-900 dark:text-emerald-50 text-base sm:text-lg tabular-nums tracking-normal">
                {currentZone.duration || "2.5 – 3 Hours"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Operating Season
              </span>
              <p className="font-sans font-bold text-gray-900 dark:text-emerald-50 text-base sm:text-lg tabular-nums tracking-normal">
                {currentZone.openSeason || "15 Nov to 15 June"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Capacity
              </span>
              <p className="font-sans font-bold text-gray-900 dark:text-emerald-50 text-base sm:text-lg tabular-nums tracking-normal">
                Up to 6 Persons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className={`relative z-10 py-16 ${DOC_WIDTH}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main 2 Columns: Description & Features */}
          {docBlocks ? (
            <DocContent
              className="lg:col-span-2 space-y-8 min-w-0"
              blocks={docBlocks}
              onBooking={handleBooking}
              phones={phones}
              message={whatsappMessage}
            />
          ) : (
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview */}
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-emerald-500"></span>
                <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Sanctuary Overview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50">
                About {currentZone.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-emerald-100/80 leading-relaxed font-light">
                <RichText text={currentZone.description} />
              </p>

              {currentZone.landscape && (
                <div className="pt-6 border-t border-emerald-900/10 dark:border-emerald-800/40">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-2">
                    Landscape & Terrain
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">
                    <RichText text={currentZone.landscape} />
                  </p>
                </div>
              )}
            </div>

            {/* Highlights */}
            {currentZone.highlights && currentZone.highlights.length > 0 && (
              <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Key Safari Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentZone.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 dark:bg-[#07150c]/60 border border-emerald-900/10 dark:border-emerald-800/30">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-emerald-100/90">
                        <RichText text={item} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wildlife You May Encounter (zone documents) */}
            {currentZone.wildlife?.length > 0 && (
              <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  Wildlife You May Encounter
                </h2>
                <ul className="flex flex-wrap gap-2.5">
                  {currentZone.wildlife.map((animal) => (
                    <li key={animal} className="rounded-full bg-emerald-50/70 dark:bg-[#07150c]/60 border border-emerald-900/10 dark:border-emerald-800/30 px-4 py-2 text-sm font-semibold text-gray-800 dark:text-emerald-100/90">
                      {animal}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 dark:text-emerald-100/60">
                  Wildlife sightings depend on animal movement, season, weather and other natural conditions and are not guaranteed.
                </p>
              </div>
            )}

            {/* Shift Timings */}
            {timingRows.length > 0 && (
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Jeep Safari Entry Timings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border-b border-emerald-900/15">
                    <tr>
                      <th className="px-5 py-3 rounded-l-xl">Season / Period</th>
                      <th className="px-5 py-3">Morning Entry</th>
                      <th className="px-5 py-3 rounded-r-xl">Afternoon Entry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/10 dark:divide-emerald-900/30">
                    {timingRows.map((row) => (
                      <tr key={row.period} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                        <td className="px-5 py-4 font-bold text-gray-900 dark:text-emerald-100">{row.period}</td>
                        <td className="px-5 py-4 text-emerald-700 dark:text-emerald-400 font-semibold">{row.morning}</td>
                        <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">{row.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-emerald-400/60">
                Please report at the gate at least 20 minutes prior to scheduled entry time. Entry is strictly non-refundable for late arrivals.
              </p>
            </div>
            )}
          </div>
          )}

          {/* Right Sidebar: Booking Form & Other Zones */}
          <div className="space-y-8">
            
            {/* Quick Booking Card with Deep Forest Tone, Leaf Watermark & Tiger Stencil */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#07150c] via-[#091b10] to-[#040b06] text-white rounded-3xl p-8 shadow-2xl border border-safari-500/30 space-y-6">
              {/* Forest Imagery Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                style={{ backgroundImage: `url("${currentZone.heroImage || currentZone.heroImages?.[0] || safariImages.homeHero}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040b06]/90 via-[#07150c]/70 to-[#040b06]/85 pointer-events-none" />

              {/* Corner Botanical Foliage Watermark */}
              <div 
                className="absolute -top-10 -left-10 w-56 h-56 opacity-[0.16] pointer-events-none bg-contain bg-no-repeat rotate-180"
                style={{ 
                  backgroundImage: `url("/images/leaf-cta.webp")`, 
                  filter: 'invert(1) hue-rotate(90deg) brightness(1.2)', 
                  mixBlendMode: 'screen' 
                }}
              />

              {/* Royal Bengal Tiger Stencil Silhouette Overlay on the Right */}
              <div
                className="absolute -bottom-6 -right-6 w-60 h-64 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-[0.20]"
                style={{
                  backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
                  filter: 'invert(1) brightness(1.2)',
                  mixBlendMode: 'screen',
                }}
                aria-hidden="true"
              />

              {/* Radial Forest Emerald Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-safari-500/15 via-transparent to-transparent pointer-events-none" />

              <span className="relative z-10 inline-block px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {cta.zoneSidebarKicker || 'Instant Permit Assistance'}
              </span>
              <h3 className="relative z-10 text-2xl font-serif font-extrabold text-white leading-snug">
                Book Your {currentZone.name} Safari
              </h3>
              <p className="relative z-10 text-sm text-emerald-100/80 leading-relaxed font-light">
                {cta.zoneSidebarText || 'Permits are capped per day by the Forest Department. Reserve your date, Gypsy vehicle, and certified guide in advance.'}
              </p>

              <div className="relative z-10 space-y-3 pt-2">
                <button
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/50 transition hover:scale-[1.02] active:scale-95"
                >
                  Book Safari Online →
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Booking
                </a>

                {phones.map((number) => (
                  <a
                    key={number}
                    href={`tel:${number.replace(/[^\d+]/g, '')}`}
                    className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 backdrop-blur-sm transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" /> Call: {number}
                  </a>
                ))}
              </div>
            </div>

            {/* Other Safari Zones Links */}
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-900 dark:text-emerald-300 uppercase tracking-widest">
                Explore Other Safari Zones
              </h3>
              <ul className="space-y-2.5">
                {zones.filter(z => z.slug !== currentZone.slug).map((z, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${z.slug}`}
                      className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-[#07150c]/60 transition border border-transparent hover:border-emerald-500/20"
                    >
                      <span className="text-sm font-semibold text-gray-700 dark:text-emerald-100/80 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                        {z.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-emerald-600/50 group-hover:text-emerald-500 group-hover:translate-x-1 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-emerald-900/10 dark:border-emerald-800/30">
                <Link
                  to="/zones"
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  Compare All Zones on Map →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Zone gallery: every client photo for this zone, managed in the backend */}
      <PhotoGallery
        title={`${currentZone.name} Gallery`}
        images={currentZone.galleryImages}
        alts={currentZone.galleryAlts}
        altPrefix={currentZone.name}
      />

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title={`Ready to Book Your Safari in ${currentZone.name}?`}
        subtitle={cta.zoneCtaSubtitle || `Gypsy vehicles and permits for ${currentZone.name} are capped daily to preserve the natural ecosystem. Reserve early to guarantee your morning or afternoon drive.`}
        primaryText={`Book ${currentZone.name} Safari`}
        onPrimaryClick={handleBooking}
        secondaryText={`Call ${phone}`}
        secondaryLink={`tel:${phone.replace(/[^\d+]/g, '')}`}
        secondaryIcon={Phone}
        whatsappText="WhatsApp Booking"
        whatsappLink={whatsappUrl}
        bgImage={currentZone.heroImage || currentZone.heroImages?.[0] || safariImages.homeHero}
      />
    </div>
  );
}
