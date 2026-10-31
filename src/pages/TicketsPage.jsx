import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, DollarSign, Camera, Car, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, Loader2, Phone, Video, ArrowRight } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { sitePhone, siteWhatsapp } from '../utils/sitePhones';
import { fetchContent, primedContent } from '../api/client';
import SEO from '../components/SEO';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import DocContent, { DOC_WIDTH } from '../components/DocContent';
import PhotoGallery from '../components/PhotoGallery';
import RichText from '../components/RichText';

export default function TicketsPage({ onOpenBooking }) {
  // A prerendered page starts from the build-time content (see primedContent).
  const [tickets, setTickets] = useState(() => primedContent()?.tickets ?? null);
  const [settings, setSettings] = useState(() => primedContent()?.settings ?? null);
  const [loading, setLoading] = useState(() => !primedContent());
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent()
      .then(res => {
        setTickets(res.data.tickets);
        setSettings(res.data.settings);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const data = tickets || {};
  // The client's Tickets document, when loaded, replaces the tariff tables below.
  const docBlocks = data.docBlocks?.length ? data.docBlocks : null;
  const heroTitle = (docBlocks && data.docTitle) || data.title || "Rajaji National Park Jeep Safari – Tickets, Entry Fees & Charges";
  const heroSubtitle = data.subtitle || "Transparent, government-standard park entry fees, 4x4 Gypsy tariffs, naturalist guide charges, and seasonal timings for Indian citizens and foreign visitors.";
  const heroBanner = data.heroBanner || safariImages.safariJeepSavannah;
  const timings = data.timings || {
    summer: "16 Apr – 15 Jun: Morning 5:30 AM – 7:00 AM | Evening 3:00 PM – 4:30 PM",
    winter: "15 Nov – 15 Feb: Morning 6:30 AM – 8:00 AM | Evening 1:30 PM – 3:00 PM",
    openDates: "15 November to 15 June (Gohri Range open year-round except August & September)",
  };

  const defaultEntranceFees = [
    { category: "Park Entry (Chilla, Ranipur, Motichur, Chillawali)", indian: "₹150 per person", foreigner: "₹600 per person", note: "Government entry fee per person per shift" },
    { category: "Vehicle / Jeep Permit", indian: "₹250 per vehicle", foreigner: "₹500 per vehicle", note: "Forest Department vehicle permit fee" },
    { category: "Gypsy / Safari Cost", indian: "₹3,500 per vehicle", foreigner: "₹3,500 – ₹4,000 per vehicle", note: "Authorised 4x4 Gypsy (Up to 6 persons capacity)" },
    { category: "Jhilmil Zone Entry & Permit", indian: "₹200 ticket + ₹300 permit", foreigner: "₹800 ticket + ₹400 permit", note: "Swamp deer wetland conservation reserve rate" },
    { category: "General Nature Guide", indian: "₹1,000 per vehicle", foreigner: "₹1,000 per vehicle", note: "Certified Forest Department nature guide (Mandatory)" },
    { category: "Experienced Bird & Wildlife Guide", indian: "₹1,200 – ₹1,800", foreigner: "₹1,200 – ₹1,800", note: "Specialized expert guide for birdwatching & photography" },
    { category: "Fixed / Movie Camera (Non-commercial)", indian: "FREE", foreigner: "FREE", note: "Personal photography & videography permitted without charge" },
    { category: "Movie Camera / Video (Commercial)", indian: "₹500", foreigner: "₹1,500", note: "Commercial handheld video permit" },
  ];

  const defaultGypsyRates = [
    { zone: "Chilla Range", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Ranipur Gate / Haridwar", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Chillawali / Mohand Gate", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Motichur Safari Zone", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Jhilmil Jheel Safari Zone", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
    { zone: "Gohri Range (Buffer Zone)", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
  ];

  const defaultGuideFees = [
    { type: "Mandatory Nature Guide", fee: "₹1,000 per shift", note: "Authorised guide compulsory per Gypsy" },
    { type: "Experienced Bird & Wildlife Guide", fee: "₹1,200 – ₹1,800 per shift", note: "Recommended for birdwatchers & photographers" },
  ];

  const defaultFilming = [
    { type: "Feature Film Shooting (Per Day)", indian: "₹1,00,000 / day", foreigner: "₹2,00,000 / day", security: "₹1,00,000 / ₹2,00,000 (Refundable)", note: "Prior State Forest Department clearance required" },
    { type: "Documentary Film Shooting (Per Day)", indian: "₹10,000 / day", foreigner: "₹30,000 / day", security: "₹50,000 / ₹1,00,000 (Refundable)", note: "Requires documentary permit & security deposit" },
    { type: "Ramganga Conducted Tour (Per Person)", indian: "₹1,000 + GST", foreigner: "₹2,000 + GST", security: "N/A", note: "Conducted scenic forest excursion" },
  ];

  const defaultImportantNotes = [
    "Arrival at Gate: Guests must reach the designated safari gate at least 20 minutes before reporting time.",
    "Late Arrival: Entry will be denied if arriving after last entry time; fees are strictly non-refundable.",
    "Identification: Valid original Govt ID (Aadhaar / Passport / Voter ID) mandatory for each passenger.",
    "Child Policy: Children above 11 years will be charged the applicable park entry fee.",
    "Student Concession: Available only for recognised institutional educational tours with prior approval.",
    "Strict No-Refund Policy: Once safari permit is issued, cancellations, modifications or date transfers are strictly not permitted.",
    "Force Majeure: No refunds if safari is cancelled due to weather, rain, flooding, park closure, or Forest Dept regulations.",
  ];

  const entranceFees = (data.entranceFees && data.entranceFees.length > 0) ? data.entranceFees : defaultEntranceFees;
  const gypsyRates = (data.gypsyRates && data.gypsyRates.length > 0) ? data.gypsyRates : defaultGypsyRates;
  const guideFees = (data.guideFees && data.guideFees.length > 0) ? data.guideFees : defaultGuideFees;
  const filmingFees = (data.filmingFees && data.filmingFees.length > 0) ? data.filmingFees : defaultFilming;
  const importantNotes = (data.importantNotes && data.importantNotes.length > 0) ? data.importantNotes : defaultImportantNotes;

  const phone = sitePhone(settings);
  const whatsappUrl = `https://wa.me/${siteWhatsapp(settings).replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I would like to book a Rajaji National Park Jeep Safari and check permit availability.")}`;

  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      {/* Delicate ambient botanical pattern */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={data.heroImages?.length ? data.heroImages : heroBanner}
        fallbackImage={safariImages.safariJeepSavannah}
        alt={data.heroImageAlt || "Safari vehicle entering Rajaji"}
      />

      {/* Timings banner */}
      <section className="relative z-10 bg-[#fdfcf8]/90 dark:bg-gray-900/80 backdrop-blur-md border-y border-emerald-950/10 dark:border-emerald-500/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Season Calendar</span>
                <span className="text-gray-600 dark:text-gray-400 text-xs"><RichText text={timings.openDates} /></span>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Summer Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-400 text-xs"><RichText text={timings.summer} /></span>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Winter Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-400 text-xs"><RichText text={timings.winter} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tariff Tables */}
      <section className={`relative z-10 py-16 space-y-16 ${DOC_WIDTH}`}>
        
        {docBlocks ? (
          <DocContent
            className="space-y-8"
            blocks={docBlocks}
            onBooking={onOpenBooking || (() => navigate('/booking'))}
            phones={[phone]}
            message="Hello! I would like to book a Rajaji National Park Jeep Safari and check permit availability."
          />
        ) : (
        <>
        {/* Entrance Fee Table */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 block">
              GOVERNMENT TARIFF SCHEDULE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Rajaji National Park Entry Fees & Jeep Permit Charges
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Applicable across Chilla, Motichur, Ranipur, Mohand–Chillawali, and Jhilmil zones.
            </p>
          </div>
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#07150c]/5 dark:bg-emerald-950/30 text-gray-800 dark:text-gray-200 font-semibold text-xs uppercase tracking-wider border-b border-emerald-950/5 dark:border-emerald-500/10">
                  <tr>
                    <th className="px-6 py-4 font-bold">Fee Head / Permit Category</th>
                    <th className="px-6 py-4 font-bold">Indian Visitors</th>
                    <th className="px-6 py-4 font-bold">Foreign Visitors</th>
                    <th className="px-6 py-4 font-bold">Details & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {entranceFees.map((row, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{row.category}</td>
                      <td className="px-6 py-4 font-sans font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{row.indian}</td>
                      <td className="px-6 py-4 font-sans font-bold text-amber-700 dark:text-amber-400 tabular-nums">{row.foreigner}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400"><RichText text={row.note} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Gypsy & Guide Charges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/40">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Rajaji Jeep Safari Charges by Zone</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Fixed Gypsy rate per vehicle per shift (Up to 6 persons)</span>
              </div>
            </div>
            <div className="space-y-3">
              {gypsyRates.map((gypsy, gIdx) => (
                <div key={gIdx} className="p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white text-sm block">{gypsy.zone}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{gypsy.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums tracking-normal">{gypsy.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/40">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Nature Guide Charges</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mandatory certified park guide per vehicle</span>
                </div>
              </div>
              <div className="space-y-4">
                {guideFees.map((guide, gdIdx) => (
                  <div key={gdIdx} className="p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">{guide.type}</span>
                      <span className="font-sans font-bold text-emerald-700 dark:text-emerald-400 tabular-nums tracking-normal text-base">{guide.fee}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed block"><RichText text={guide.note} /></span>
                  </div>
                ))}

                {/* Elephant Ride Info */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold text-emerald-950 dark:text-emerald-200">
                    <span>Elephant Ride (Subject to availability)</span>
                    <span className="font-sans font-bold text-emerald-800 dark:text-emerald-300 tabular-nums tracking-normal text-sm sm:text-base">₹1,200 – ₹1,500</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Early morning rides conducted at designated ranges subject to Forest Department availability. Confirm at gate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photography & Commercial Filming Fees */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 block">
              MEDIA & COMMERCIAL PROTOCOL
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Photography & Filming Fees
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Personal non-commercial photography is free. Commercial films require prior permissions and security deposits.
            </p>
          </div>
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#07150c]/5 dark:bg-emerald-950/30 text-gray-800 dark:text-gray-200 font-semibold text-xs uppercase tracking-wider border-b border-emerald-950/5 dark:border-emerald-500/10">
                  <tr>
                    <th className="px-6 py-4 font-bold">Filming Category</th>
                    <th className="px-6 py-4 font-bold">Indian Nationals</th>
                    <th className="px-6 py-4 font-bold">Foreign Nationals</th>
                    <th className="px-6 py-4 font-bold">Security Deposit (Refundable)</th>
                    <th className="px-6 py-4 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filmingFees.map((row, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{row.type}</td>
                      <td className="px-6 py-4 font-sans font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{row.indian}</td>
                      <td className="px-6 py-4 font-sans font-bold text-amber-700 dark:text-amber-400 tabular-nums">{row.foreigner}</td>
                      <td className="px-6 py-4 font-sans font-semibold text-xs text-gray-700 dark:text-gray-300 tabular-nums">{row.security}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400"><RichText text={row.note} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        </>
        )}

        {/* Important Rules Checklist & Terms Link */}
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Important Safari Booking Information
            </h3>
            <Link
              to="/rajaji-jeep-safari-terms-conditions-cancellation-refund"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              Read Full Cancellation & Refund Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {importantNotes.map((note, nIdx) => (
              <div key={nIdx} className="flex items-start gap-3 bg-gray-50/80 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed"><RichText text={note} /></span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <PhotoGallery title="Rajaji Jeep Safari Photos" images={data.galleryImages} alts={data.galleryAlts} altPrefix="Rajaji National Park jeep safari" />

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title="Ready to Reserve Your Forest Permits?"
        subtitle="Daily entry quotas for Indian and Foreign visitors are limited across morning and afternoon shifts. Confirm your Gypsy allocation and certified naturalist guide today."
        primaryText="Book Safari Now"
        onPrimaryClick={onOpenBooking}
        secondaryText={`Call ${phone}`}
        secondaryLink={`tel:${phone.replace(/\s+/g, '')}`}
        secondaryIcon={Phone}
        whatsappText="WhatsApp Assistance"
        whatsappLink={whatsappUrl}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
