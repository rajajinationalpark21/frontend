import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, DollarSign, Camera, Car, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, Loader2, Phone, MessageSquare, Video, ArrowRight } from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function TicketsPage({ onOpenBooking }) {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setTickets(res.data.tickets))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const data = tickets || {};
  const timings = data.timings || {
    summer: "16 Apr – 15 Jun: Morning 5:30 AM – 7:00 AM | Evening 3:00 PM – 4:30 PM",
    winter: "15 Nov – 15 Feb: Morning 6:30 AM – 8:00 AM | Evening 1:30 PM – 3:00 PM",
    openDates: "15 November to 15 June (Gohari Range open year-round except August & September)",
  };

  const defaultEntranceFees = [
    { category: "Park Entry (Chila, Ranipur, Motichur, Chillawali)", indian: "₹150 per person", foreigner: "₹600 per person", note: "Government entry fee per person per shift" },
    { category: "Vehicle / Jeep Permit", indian: "₹250 per vehicle", foreigner: "₹500 per vehicle", note: "Forest Department vehicle permit fee" },
    { category: "Gypsy / Safari Cost", indian: "₹3,500 per vehicle", foreigner: "₹3,500 – ₹4,000 per vehicle", note: "Authorised 4x4 Gypsy (Up to 6 persons capacity)" },
    { category: "Jhilmil Zone Entry & Permit", indian: "₹200 ticket + ₹300 permit", foreigner: "₹600 ticket + ₹500 permit", note: "Swamp deer wetland conservation reserve rate" },
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
    { zone: "Gohari Range (Buffer Zone)", rate: "₹3,500", capacity: "Up to 6 visitors + driver & guide" },
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

  const phone = contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I would like to book a Rajaji National Park Jeep Safari and check permit availability.")}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Rajaji National Park Jeep Safari – Tickets, Entry Fees & Charges"
        description="Book Rajaji National Park Jeep Safari online. Check official entry fees, safari charges, Gypsy permit fees, shift timings and booking information for Rajaji Tiger Reserve."
        keywords="rajaji national park jeep safari tickets, safari charges rajaji, entry fees rajaji tiger reserve, gypsy cost chilla motichur"
        ogImage={safariImages.safariJeepTrail}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepTrail} alt="Safari vehicle entering Rajaji" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-2 border border-white/15 backdrop-blur-sm">
              <Ticket className="w-3.5 h-3.5" />
              Official Tariff Schedule
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Rajaji National Park Jeep Safari – Tickets, Entry Fees & Charges
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Transparent, government-standard park entry fees, 4x4 Gypsy tariffs, naturalist guide charges, and seasonal timings for Indian citizens and foreign visitors.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-xl transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book Safari Online
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Assistance
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition"
              >
                <Phone className="w-4 h-4 text-safari-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timings banner */}
      <section className="bg-gray-50 dark:bg-gray-900/90 border-y border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-safari-500/20 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Season Calendar</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">{timings.openDates}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-safari-500/20 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Summer Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">{timings.summer}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-safari-500/20 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Winter Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">{timings.winter}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tariff Tables */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Entrance Fee Table */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rajaji National Park Entry Fees & Jeep Permit Charges
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Applicable across Chilla, Motichur, Ranipur, Mohand–Chillawali, and Jhilmil zones.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Fee Head / Permit Category</th>
                    <th className="px-6 py-4">Indian Visitors</th>
                    <th className="px-6 py-4">Foreign Visitors</th>
                    <th className="px-6 py-4">Details & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {entranceFees.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{row.category}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">{row.indian}</td>
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-sky-300">{row.foreigner}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Gypsy & Guide Charges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rajaji Jeep Safari Charges by Zone</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Fixed Gypsy rate per vehicle per shift (Up to 6 persons)</span>
              </div>
            </div>
            <div className="space-y-3">
              {gypsyRates.map((gypsy, gIdx) => (
                <div key={gIdx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/80 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white text-sm block">{gypsy.zone}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{gypsy.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-safari-600 dark:text-safari-400">{gypsy.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nature Guide Charges</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mandatory certified park guide per vehicle</span>
                </div>
              </div>
              <div className="space-y-4">
                {guideFees.map((guide, gdIdx) => (
                  <div key={gdIdx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/80">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">{guide.type}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{guide.fee}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed block">{guide.note}</span>
                  </div>
                ))}

                {/* Elephant Ride Info */}
                <div className="p-4 rounded-xl bg-safari-50 dark:bg-safari-950/30 border border-safari-200 dark:border-safari-800 text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold text-safari-900 dark:text-safari-200">
                    <span>Elephant Ride (Subject to availability)</span>
                    <span>₹1,200 – ₹1,500</span>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-safari-600" />
              Photography & Filming Fees
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Personal non-commercial photography is free. Commercial films require prior permissions and security deposits.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Filming Category</th>
                    <th className="px-6 py-4">Indian Nationals</th>
                    <th className="px-6 py-4">Foreign Nationals</th>
                    <th className="px-6 py-4">Security Deposit (Refundable)</th>
                    <th className="px-6 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filmingFees.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{row.type}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">{row.indian}</td>
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-sky-300">{row.foreigner}</td>
                      <td className="px-6 py-4 font-mono text-xs">{row.security}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Important Rules Checklist & Terms Link */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-safari-600" />
              Important Safari Booking Information
            </h3>
            <Link
              to="/terms"
              className="text-xs font-bold text-safari-600 dark:text-safari-400 hover:underline inline-flex items-center gap-1"
            >
              Read Full Cancellation & Refund Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {importantNotes.map((note, nIdx) => (
              <div key={nIdx} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <CheckCircle2 className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Assistance with safari availability, zone selection, and payment?
            </span>
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                WhatsApp Us
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-2.5 rounded-xl bg-safari-600 hover:bg-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Book Safari Now
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
