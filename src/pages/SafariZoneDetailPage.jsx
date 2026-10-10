import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Compass, MapPin, Clock, Calendar, ShieldCheck, 
  Check, ArrowRight, Phone, MessageSquare, Ticket, 
  HelpCircle, AlertCircle, Share2, Sparkles 
} from 'lucide-react';
import { safariZonesList, contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function SafariZoneDetailPage({ onOpenBooking, defaultSlug }) {
  const params = useParams();
  const navigate = useNavigate();
  const slug = defaultSlug || params.slug;

  const [zones, setZones] = useState(safariZonesList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => {
        if (res.data?.safari?.zones && res.data.safari.zones.length > 0) {
          // Merge API zones with fallback if API doesn't have slug yet
          const apiZones = res.data.safari.zones;
          setZones(apiZones);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Find current zone by slug or fallback
  const cleanSlug = (slug || '').replace(/^\/+|\/+$/g, '');
  const currentZone = zones.find(z => 
    z.slug === cleanSlug || 
    z.name?.toLowerCase().includes(cleanSlug.replace(/-jeep-safari|-safari/g, ''))
  ) || safariZonesList.find(z => z.slug === cleanSlug) || safariZonesList[0];

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      navigate('/booking');
    }
  };

  const phone = contactInfo.phone || "+91 98298 50501";
  const whatsappNum = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello! I would like to book a safari for ${currentZone.name} in Rajaji National Park.`)}`;

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title={currentZone.seoTitle || `${currentZone.name} | Rajaji National Park Jeep Safari`}
        description={currentZone.metaDescription || currentZone.description?.substring(0, 160)}
        keywords={`${currentZone.name}, rajaji jeep safari, ${currentZone.entryGate}, jungle safari uttarakhand`}
        ogImage={currentZone.heroImage || safariImages.safariJeepSavannah}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-20 lg:py-28 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img 
            src={currentZone.heroImage || safariImages.safariJeepSavannah} 
            alt={currentZone.name} 
            className="w-full h-full object-cover opacity-30 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07150c] via-[#07150c]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07150c] via-transparent to-[#07150c]/80" />
        </div>

        {/* Tiger Watermark Overlay in forest shadow */}
        <div
          className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 pointer-events-none z-[1] bg-no-repeat bg-right-bottom bg-contain opacity-[0.14]"
          style={{
            backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />

        {/* Corner Leaf Foliage Overlay */}
        <div
          className="absolute -top-16 -left-16 w-80 h-80 pointer-events-none z-[1] bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: `url('${safariImages.leafCta}')`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                Rajaji Safari Zone
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold backdrop-blur-sm border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {currentZone.entryGate || "Official Park Gate"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              {currentZone.name}
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/80 font-light leading-relaxed">
              {currentZone.tag}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={handleBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/25 transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book {currentZone.name}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 backdrop-blur-sm transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> Call: {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Specs Bar */}
      <section className="relative z-10 bg-[#fdfcf8]/90 dark:bg-[#0a1a0f]/90 backdrop-blur-md border-y border-emerald-900/15 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Ticket className="w-3.5 h-3.5 text-emerald-500" /> Gypsy Tariff
              </span>
              <p className="font-serif font-extrabold text-gray-900 dark:text-emerald-50 text-base sm:text-lg">
                {currentZone.gypsyCost || "₹3,500 per Gypsy"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-500" /> Duration
              </span>
              <p className="font-serif font-extrabold text-gray-900 dark:text-emerald-50 text-base sm:text-lg">
                {currentZone.duration || "2.5 – 3 Hours"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Operating Season
              </span>
              <p className="font-serif font-extrabold text-gray-900 dark:text-emerald-50 text-base sm:text-lg">
                {currentZone.openSeason || "15 Nov to 15 June"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Capacity
              </span>
              <p className="font-serif font-extrabold text-gray-900 dark:text-emerald-50 text-base sm:text-lg">
                Up to 6 Persons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main 2 Columns: Description & Features */}
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
                {currentZone.description}
              </p>

              {currentZone.landscape && (
                <div className="pt-6 border-t border-emerald-900/10 dark:border-emerald-800/40">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-2">
                    Landscape & Terrain
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">
                    {currentZone.landscape}
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
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wildlife Sightings */}
            {currentZone.wildlife && currentZone.wildlife.length > 0 && (
              <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50">
                  Wildlife You May Encounter
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {currentZone.wildlife.map((animal, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-sm font-semibold border border-emerald-200/60 dark:border-emerald-800/50"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-emerald-400/60 italic pt-2">
                  * Note: Wildlife encounters are natural events and cannot be guaranteed. Every safari offers a unique window into the Himalayan foothill ecosystem.
                </p>
              </div>
            )}

            {/* Shift Timings */}
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
                    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-emerald-100">15 Nov – 15 Feb</td>
                      <td className="px-5 py-4 text-emerald-700 dark:text-emerald-400 font-semibold">6:30 AM – 8:00 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">1:30 PM – 3:00 PM</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-emerald-100">16 Feb – 15 Apr</td>
                      <td className="px-5 py-4 text-emerald-700 dark:text-emerald-400 font-semibold">6:00 AM – 7:30 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">2:00 PM – 3:30 PM</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-emerald-100">16 Apr – 15 Jun</td>
                      <td className="px-5 py-4 text-emerald-700 dark:text-emerald-400 font-semibold">5:30 AM – 7:00 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">3:00 PM – 4:30 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-emerald-400/60">
                Please report at the gate at least 20 minutes prior to scheduled entry time. Entry is strictly non-refundable for late arrivals.
              </p>
            </div>
          </div>

          {/* Right Sidebar: Booking Form & Other Zones */}
          <div className="space-y-8">
            
            {/* Quick Booking Card with Deep Forest Tone & Tiger Stencil */}
            <div className="relative overflow-hidden bg-[#07150c] text-white rounded-3xl p-8 shadow-2xl border border-emerald-800/40 space-y-6">
              <div
                className="absolute right-0 bottom-0 top-0 w-3/4 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-20"
                style={{
                  backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
                  filter: 'invert(1)',
                  mixBlendMode: 'screen',
                }}
                aria-hidden="true"
              />
              <span className="relative z-10 inline-block px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Instant Permit Assistance
              </span>
              <h3 className="relative z-10 text-2xl font-serif font-extrabold text-white leading-snug">
                Book Your {currentZone.name} Safari
              </h3>
              <p className="relative z-10 text-sm text-emerald-100/80 leading-relaxed font-light">
                Permits are capped per day by the Forest Department. Reserve your date, Gypsy vehicle, and certified guide in advance.
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

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 backdrop-blur-sm transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" /> Call: {phone}
                </a>
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
                  to="/safari/zones"
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  Compare All Zones on Map →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
