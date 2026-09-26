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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title={currentZone.seoTitle || `${currentZone.name} | Rajaji National Park Jeep Safari`}
        description={currentZone.metaDescription || currentZone.description?.substring(0, 160)}
        keywords={`${currentZone.name}, rajaji jeep safari, ${currentZone.entryGate}, jungle safari uttarakhand`}
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={safariImages.safariJeepSavannah} 
            alt={currentZone.name} 
            className="w-full h-full object-cover opacity-35" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-400/30">
                <Compass className="w-3.5 h-3.5" />
                Rajaji Safari Zone
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" />
                {currentZone.entryGate || "Official Park Gate"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {currentZone.name}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed">
              {currentZone.tag}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={handleBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition hover:scale-105 active:scale-95"
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
                <Phone className="w-4 h-4 text-safari-400" /> Call: {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Specs Bar */}
      <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-safari-500" /> Gypsy Tariff
              </span>
              <p className="font-extrabold text-gray-900 dark:text-white text-base">
                {currentZone.gypsyCost || "₹3,500 per Gypsy"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-safari-500" /> Duration
              </span>
              <p className="font-extrabold text-gray-900 dark:text-white text-base">
                {currentZone.duration || "2.5 – 3 Hours"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-safari-500" /> Operating Season
              </span>
              <p className="font-extrabold text-gray-900 dark:text-white text-base">
                {currentZone.openSeason || "15 Nov to 15 June"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-safari-500" /> Capacity
              </span>
              <p className="font-extrabold text-gray-900 dark:text-white text-base">
                Up to 6 Persons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main 2 Columns: Description & Features */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                About {currentZone.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {currentZone.description}
              </p>

              {currentZone.landscape && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                    Landscape & Terrain
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentZone.landscape}
                  </p>
                </div>
              )}
            </div>

            {/* Highlights */}
            {currentZone.highlights && currentZone.highlights.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-safari-500" />
                  Key Safari Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentZone.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wildlife Sightings */}
            {currentZone.wildlife && currentZone.wildlife.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Wildlife You May Encounter
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {currentZone.wildlife.map((animal, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-safari-50 dark:bg-safari-950/40 text-safari-800 dark:text-safari-300 text-sm font-semibold border border-safari-200/60 dark:border-safari-800/50"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic pt-2">
                  * Note: Wildlife encounters are natural events and cannot be guaranteed. Every safari offers a unique window into the Himalayan foothill ecosystem.
                </p>
              </div>
            )}

            {/* Shift Timings */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-safari-500" />
                Jeep Safari Entry Timings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3 rounded-l-xl">Season / Period</th>
                      <th className="px-5 py-3">Morning Entry</th>
                      <th className="px-5 py-3 rounded-r-xl">Afternoon Entry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">15 Nov – 15 Feb</td>
                      <td className="px-5 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">6:30 AM – 8:00 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">1:30 PM – 3:00 PM</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">16 Feb – 15 Apr</td>
                      <td className="px-5 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">6:00 AM – 7:30 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">2:00 PM – 3:30 PM</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                      <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">16 Apr – 15 Jun</td>
                      <td className="px-5 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">5:30 AM – 7:00 AM</td>
                      <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-semibold">3:00 PM – 4:30 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Please report at the gate at least 20 minutes prior to scheduled entry time. Entry is strictly non-refundable for late arrivals.
              </p>
            </div>
          </div>

          {/* Right Sidebar: Booking Form & Other Zones */}
          <div className="space-y-8">
            
            {/* Quick Booking Card */}
            <div className="bg-gradient-to-br from-safari-600 to-safari-700 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
                Instant Permit Assistance
              </span>
              <h3 className="text-2xl font-extrabold text-white leading-snug">
                Book Your {currentZone.name} Safari
              </h3>
              <p className="text-sm text-safari-100 leading-relaxed">
                Permits are capped per day by the Forest Department. Reserve your date, Gypsy vehicle, and certified guide in advance.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBooking}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-gray-100 text-safari-800 font-extrabold text-sm shadow-md transition hover:scale-[1.02] active:scale-95"
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
                  className="w-full py-3.5 rounded-xl bg-safari-800/40 hover:bg-safari-800/60 text-white font-bold text-sm border border-white/20 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call: {phone}
                </a>
              </div>
            </div>

            {/* Other Safari Zones Links */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Explore Other Safari Zones
              </h3>
              <ul className="space-y-2.5">
                {zones.filter(z => z.slug !== currentZone.slug).map((z, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${z.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                    >
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">
                        {z.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-safari-600 group-hover:translate-x-1 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/safari/zones"
                  className="text-xs font-bold text-safari-600 dark:text-safari-400 hover:underline inline-flex items-center gap-1"
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
