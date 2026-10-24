import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  Compass, 
  ArrowRight, 
  Phone, 
  Sparkles,
  Ticket,
  ChevronRight,
  Info
} from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import { submitBooking } from '../api/client';
import HoneypotField from '../components/HoneypotField';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import RichText from '../components/RichText';

const DEFAULT_BOOKING_CONTENT = {
  heroTitle: 'Book Your Rajaji Jeep Safari',
  heroSubtitle: 'Share your preferred date, zone and visitor details. Our team will help you check availability, permit requirements and booking options.',
  overviewTitle: 'Rajaji Safari Booking Overview',
  overviewParagraphs: ['Use the form below to send your preferred safari date, zone and number of visitors. Our team will guide you through availability, charges and entry requirements.'],
  enquiryTitle: 'Send Your Safari Enquiry',
  enquirySubtitle: 'Our team will respond with availability and next steps.',
  assistanceItems: ['Safari availability', 'Zone selection', 'Entry and permit requirements', 'Jeep/Gypsy booking'],
  responseMessage: 'Our team will contact you with availability, tariff and permit details.',
  guidelinesTitle: 'Booking guidelines',
  guidelines: [],
  contactPhones: [],
  disclaimerTitle: 'Important information',
  disclaimerParagraphs: [],
};

const DEFAULT_ZONES = [
  { id: 'chilla-jeep-safari', name: 'Chilla Range', tag: 'Sal Forests, Grasslands & Riverine Habitats', distance: 'Approx. 36 km Circular Route', highlights: 'Mundal and Ghasiram watchtowers, elephants, deer and birdlife', gates: 'Chilla Gate (Haridwar–Rishikesh bypass road)', image: safariImages.safariJeepSavannah },
  { id: 'ranipur-gate-jeep-safari', name: 'Haridwar Zone / Ranipur Gate', tag: 'Jeep Safari & Leopard Safari near Haridwar', distance: 'Approx. 25 km Safari Route', highlights: 'Mixed forest and grassland, elephants, deer and leopard habitat', gates: 'Ranipur Gate (near the Ranipur and BHEL area, Haridwar)', image: safariImages.safariJeepSavannah },
  { id: 'chillawali-jeep-safari-mohand-gate', name: 'Chillawali Zone / Mohand Gate', tag: 'Peaceful Leopard Safari in the Shivalik Foothills', distance: 'Approx. 30–36 km Track', highlights: 'Quiet Shivalik foothill forests, leopards and forest birds', gates: 'Mohand Gate (near Ganeshpur, Dehradun–Haridwar highway)', image: safariImages.safariJeepSavannah },
  { id: 'motichur-jeep-safari', name: 'Motichur Safari Zone', tag: 'Sal Forests, Elephants & Forest Birdlife', distance: 'Approx. 25 km Circular Route', highlights: 'Sal forests, Asian Elephant, Chital, Sambar and forest birds', gates: 'Motichur Gate (Haridwar–Rishikesh route)', image: safariImages.safariJeepSavannah },
  { id: 'jhilmil-jheel-safari', name: 'Jhilmil Jheel Safari & Conservation Reserve', tag: 'Wetland Reserve – Swamp Deer (Barasingha) Habitat', distance: '', highlights: 'Swamp Deer habitat, wetlands, grasslands and 238 recorded bird species', gates: 'Haridwar–Najibabad road, approx. 20 km from Haridwar', image: safariImages.safariJeepSavannah },
  { id: 'gohri-range-safari', name: 'Gohri Range Safari', tag: 'Peaceful Buffer-Zone Safari near Rishikesh & Haridwar', distance: '', highlights: 'Quiet forest routes, elephant and deer habitats, birdwatching', gates: 'Gohri Range (near Rishikesh and Haridwar)', image: safariImages.safariJeepSavannah },
];


export default function BookingPage() {
  const [zones, setZones] = useState(DEFAULT_ZONES);
  const [honeypot, setHoneypot] = useState('');
  const [bookingContent, setBookingContent] = useState(DEFAULT_BOOKING_CONTENT);
  // "Book This Zone" links here as /booking?zone=<slug>.
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // Book buttons ask for the form itself, so it is in view straight away (on phones
  // the page header alone fills the screen), even when already on this page.
  const toForm = location.state?.toForm;
  useEffect(() => {
    if (!toForm) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [toForm]);
  const requestedZone = searchParams.get('zone') || '';
  const [selectedZone, setSelectedZone] = useState(
    DEFAULT_ZONES.some((zone) => zone.id === requestedZone) ? requestedZone : DEFAULT_ZONES[0].id
  );
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState('Morning Safari');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchContent()
      .then((data) => {
        const booking = data?.data?.booking || data?.booking;
        if (booking) setBookingContent((current) => ({ ...current, ...booking }));
        const safari = data?.data?.safari || data?.safari;
        if (safari?.zones && safari.zones.length > 0) {
          const mapped = safari.zones.map((z, i) => ({
            id: z.slug || `zone-${i}`,
            name: z.name,
            tag: z.tag || 'Safari Zone',
            distance: z.routeKm || '',
            highlights: Array.isArray(z.highlights) ? z.highlights.join(', ') : (z.description || ''),
            gates: z.entryGate || '',
            image: z.heroImage || safariImages.safariJeepSavannah,
          }));
          setZones(mapped);
          if (mapped.some((zone) => zone.id === requestedZone)) {
            setSelectedZone(requestedZone);
          } else if (mapped.length > 0 && !mapped.some((zone) => zone.id === selectedZone)) {
            setSelectedZone(mapped[0].id);
          }
        }
      })
      .catch(() => {});
  }, []);

  const currentZone = zones.find((z) => z.id === selectedZone) || zones[0];

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (submitError) setSubmitError('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setSubmitError('Please enter a valid 10-digit mobile number (without country code).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitBooking({
        name: fullName,
        email,
        phone: cleanPhone,
        zone: currentZone.name,
        date,
        shift: slot,
        guests,
        specialRequests,
        website_hp: honeypot,
      });

      setBookingConfirmed({
        refNumber: res?.booking?.refNumber || '',
        name: fullName,
        phone: cleanPhone,
        email,
        zone: currentZone.name,
        date,
        slot,
        guests,
      });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err?.message || 'We could not save your inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = contactInfo.safari.whatsapp.replace(/\D/g, '') || "919660871429";
  const getWhatsAppMessage = () => {
    if (!bookingConfirmed) return '';
    return encodeURIComponent(
      `Hello Rajaji Safari Desk! I would like to inquire about a safari booking.\n\n` +
      `*Reference:* ${bookingConfirmed.refNumber}\n` +
      `*Name:* ${bookingConfirmed.name}\n` +
      `*Phone:* ${bookingConfirmed.phone}\n` +
      `*Zone:* ${bookingConfirmed.zone}\n` +
      `*Date:* ${bookingConfirmed.date} (${bookingConfirmed.slot})\n` +
      `*Guests:* ${bookingConfirmed.guests}\n\n` +
      `Please share the tariff and permit details.`
    );
  };

  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors pb-24">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        ogImage={bookingContent.heroBanner || safariImages.chillaRiverbed}
      />

      <PageHero
        title={bookingContent.heroTitle}
        subtitle={bookingContent.heroSubtitle}
        image={bookingContent.heroImages?.length ? bookingContent.heroImages : (bookingContent.heroBanner || safariImages.chillaRiverbed)}
        fallbackImage={safariImages.safariJeepSavannah}
        alt={bookingContent.heroImageAlt || "Rajaji safari landscape"}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 mb-6 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/zones" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Safaris</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-semibold">Safari Permit Inquiry</span>
        </div>

        <section className="mb-10 grid gap-6 rounded-3xl border border-emerald-950/10 bg-[#fdfcf8]/90 p-6 shadow-sm dark:border-emerald-500/20 dark:bg-[#0c1f13]/90 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-950 dark:text-white sm:text-3xl">{bookingContent.overviewTitle}</h2>
            <div className="prose-balanced mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {(bookingContent.overviewParagraphs || []).map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-950 p-5 text-emerald-50">
            <h3 className="font-serif text-xl font-bold">{bookingContent.enquiryTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-100/85">{bookingContent.enquirySubtitle}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {(bookingContent.assistanceItems || []).map((item, index) => <li className="flex gap-2" key={index}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><RichText text={item} /></li>)}
            </ul>
          </div>
        </section>

        {/* Confirmation State Screen */}
        {bookingConfirmed ? (
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-emerald-950/10 dark:border-emerald-500/20 shadow-2xl animate-fadeIn max-w-3xl mx-auto my-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Safari Inquiry Received
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white mt-1 mb-2">
              Inquiry Submitted Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              Inquiry Ref ID: <span className="font-mono font-bold text-gray-900 dark:text-white text-base">{bookingConfirmed.refNumber}</span>
            </p>

            <div className="bg-gray-50/80 dark:bg-gray-800/70 rounded-2xl p-6 text-left border border-gray-200/80 dark:border-gray-700/80 space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">Primary Guest</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Requested Zone</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.zone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Preferred Date</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Shift Timing</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.slot}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-xs">Party Size</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.guests} Guests</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs text-left mb-6">
              <strong>Please Note:</strong> This is an initial inquiry request. Your gypsy and permit slot are <strong>not confirmed yet</strong>. Our safari booking desk will review zone quota availability and contact you with the official tariff, permit confirmation, and payment details.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition duration-200"
              >
                Connect on WhatsApp Desk <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setBookingConfirmed(null)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold uppercase tracking-wider transition"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
              <form id="booking-form" onSubmit={handleBookingSubmit} className="space-y-8 relative scroll-mt-24">
                {/* Spam trap, checked by the server */}
                <HoneypotField value={honeypot} onChange={setHoneypot} />
                {/* 1. SELECT SAFARI ZONE */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      1. Choose Safari Zone
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">Capped Daily Quotas</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {zones.map((zone) => {
                      const isSelected = selectedZone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/25 ring-2 ring-emerald-500/30 shadow-sm'
                              : 'border-gray-200/80 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-gray-900'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-serif font-bold text-sm text-gray-950 dark:text-white">{zone.name}</span>
                            </div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                              {zone.tag}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{zone.highlights}</p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                            <span>{zone.distance}</span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                                Selected <CheckCircle2 className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. DATE & SHIFT TIMINGS */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    2. Date & Safari Timing
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Preferred Safari Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Select Safari Shift</label>
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition"
                      >
                        <option className="bg-white dark:bg-gray-900">Morning Safari</option>
                        <option className="bg-white dark:bg-gray-900">Afternoon / Evening Safari</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. GUEST COUNT */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    3. Number of Visitors
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                      <span>Total Guests</span>
                      <span className="text-gray-400">Max 6 per Gypsy</span>
                    </label>
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-100 transition"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'} ({Math.ceil(guests / 6)} {Math.ceil(guests / 6) === 1 ? 'Gypsy' : 'Gypsies'})
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(18, guests + 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. CONTACT INFO */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    4. Primary Permit Holder
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name (As on Gov ID / Aadhaar / Passport)</label>
                      <input
                        type="text"
                        required
                        maxLength={120}
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        maxLength={160}
                        placeholder="permit@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp Mobile Number</label>
                        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">10 digits only</span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition tracking-wider"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Special Requests or Notes (Optional)</label>
                      <textarea
                        rows="2"
                        maxLength={500}
                        placeholder="Photography equipment, senior citizen assistance, or specific wildlife naturalist request..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  {submitError && (
                    <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-xs sm:text-sm text-red-700 dark:text-red-300">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        Your inquiry was not sent. {submitError} Please try again, or call us on{' '}
                        <a href={`tel:${contactInfo.safari.phone.replace(/\s/g, '')}`} className="font-bold underline">
                          {contactInfo.safari.phone}
                        </a>
                        .
                      </span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      'Submitting Inquiry...'
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        Submit Safari Inquiry
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <RichText text={bookingContent.responseMessage} />
                  </p>
                </div>
              </form>
            </div>

            {/* Booking Guidelines */}
            <div className="mt-6 bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-gray-950 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600" />
                {bookingContent.guidelinesTitle}
              </h4>
              <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                {(bookingContent.guidelines?.length ? bookingContent.guidelines : ['Carry the original photo ID used for the inquiry for gate verification.', 'Arrive at the designated zone entry gate before the scheduled reporting time.', 'Follow sanctuary protocols and instructions at the gate.']).map((item, index) => (
                  <li className="flex items-start gap-2" key={index}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span><RichText text={item} /></span></li>
                ))}
              </ul>
            </div>

            {/* Help Card - Deep Jungle with Tiger Watermark */}
            <div className="relative mt-6 rounded-3xl bg-[#07150c] text-white p-7 border border-emerald-900/40 shadow-xl overflow-hidden space-y-3">
              {/* Tiger watermark silhouette */}
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
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Phone className="w-3.5 h-3.5" />
                  Need Instant Assistance?
                </div>
                <h4 className="font-serif text-xl font-bold text-white mt-1">{bookingContent.contactTitle || 'Safari booking assistance'}</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed mt-1">
                  {bookingContent.contactAddress || 'Call or message our coordinators directly for booking assistance.'}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  {(bookingContent.contactPhones?.length ? bookingContent.contactPhones : [{ number: contactInfo.safari.phone }]).map((contact, index) => (
                    <a key={`${contact.number}-${index}`} href={`tel:${contact.number.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-emerald-300"><Phone className="h-3.5 w-3.5 text-emerald-400" /> {contact.number}</a>
                  ))}
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline">WhatsApp Permit Desk Available</a>
                </div>
              </div>
            </div>
            {bookingContent.disclaimerParagraphs?.length > 0 && <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-xs leading-6 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200"><h4 className="font-bold">{bookingContent.disclaimerTitle}</h4>{bookingContent.disclaimerParagraphs.map((paragraph, index) => <p className="mt-2" key={index}><RichText text={paragraph} /></p>)}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
