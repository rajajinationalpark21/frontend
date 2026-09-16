import React from 'react';
import { Ticket, DollarSign, Camera, Car, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ticketTariffData } from '../data/parkContent';
import { safariImages, contactInfo } from '../data/safariData';
import SEO from '../components/SEO';

export default function TicketsPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Tickets & Safari Tariffs | Rajaji National Park Entry Fees"
        description="Official entry ticket prices, vehicle charges, 4x4 Gypsy safari rates, video camera permits, and guide fees for Indian and International visitors at Rajaji National Park."
        keywords="rajaji safari ticket price, gypsy safari cost chilla, rajaji entry fees foreigner indian, camera fee rajaji national park"
        ogImage={safariImages.safariJeepTrail}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={safariImages.safariJeepTrail}
            alt="Safari vehicle entering Rajaji"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Ticket className="w-3.5 h-3.5" />
              Official Tariff Schedule
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Tickets & Entry Tariffs
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Transparent, government-standard entry fees, Gypsy vehicle tariffs, and naturalist guide charges for Indian citizens and international guests.
            </p>
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
                <span className="text-gray-600 dark:text-gray-300 text-xs">{ticketTariffData.timings.openDates}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-safari-500/20 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Summer Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">{ticketTariffData.timings.summer}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-safari-500/20 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Winter Shift Timings</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">{ticketTariffData.timings.winter}</span>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">General Entry & Filming Tariffs</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Charged per 3-hour shift at all official park entry gates (Chila, Motichur, Ranipur, Jhilmil).
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Fee Item / Permit Category</th>
                    <th className="px-6 py-4">Indian Citizens</th>
                    <th className="px-6 py-4">Foreign Visitors</th>
                    <th className="px-6 py-4">Details & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {ticketTariffData.entranceFees.map((row, idx) => (
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
          
          {/* Gypsy Charges */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">4x4 Gypsy Safari Hire</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Fixed rate per vehicle per shift</span>
              </div>
            </div>

            <div className="space-y-3">
              {ticketTariffData.gypsyRates.map((gypsy, gIdx) => (
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

          {/* Guide Charges */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Naturalist Guide Charges</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mandatory certified park guide per vehicle</span>
                </div>
              </div>

              <div className="space-y-4">
                {ticketTariffData.guideFees.map((guide, gdIdx) => (
                  <div key={gdIdx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/80">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">{guide.type}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{guide.fee}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed block">{guide.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300">
              <strong>Tip:</strong> Specialized birding guides should be reserved at least 3-5 days in advance during peak migratory season.
            </div>
          </div>

        </div>

        {/* Important Rules Checklist */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-safari-600" />
            Important Booking & Entry Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {ticketTariffData.importantNotes.map((note, nIdx) => (
              <div key={nIdx} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <CheckCircle2 className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Questions regarding permit allocations or corporate/educational discounts?
            </span>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm w-full sm:w-auto"
            >
              Book Safari Permit Now
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
