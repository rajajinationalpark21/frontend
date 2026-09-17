import React, { useState, useEffect } from 'react';
import { Home, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Building2, ExternalLink, Calendar, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = stay || {};
  const wildBrook = data.wildBrook || {};
  const forestRestHouses = data.forestRestHouses || [];
  const frhBookingInfo = data.frhBookingInfo || {};

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Stay in Rajaji National Park | Wild Brook Retreat & Forest Rest Houses"
        description="Experience wilderness lodging in Rajaji National Park. Wild Brook Retreat eco-cottages in Gohari range, and British colonial Forest Rest Houses (FRHs) across Chila and Motichur."
        keywords="stay in rajaji national park, forest rest house booking chilla motichur, wild brook retreat booking, eco resort rajaji haridwar"
        ogImage={safariImages.nightCamp}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.nightCamp} alt="Campfire under night sky in Rajaji" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
              <Home className="w-3.5 h-3.5" />
              Wilderness Accommodations
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">Stay in Rajaji National Park</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.overview}</p>
          </div>
        </div>
      </section>

      {/* Wild Brook Retreat Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/10 text-safari-600 dark:text-safari-400 text-xs font-bold uppercase tracking-wider">Premier Eco-Lodge</div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">{wildBrook.name}</h2>
                <p className="text-safari-600 dark:text-safari-400 font-semibold text-base mt-1">{wildBrook.tagline}</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                <span>{wildBrook.location} ({wildBrook.distance})</span>
              </div>
              <div className="space-y-3">
                {(wildBrook.features || []).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium"><Phone className="w-4 h-4 text-safari-500" /><span>{wildBrook.phone}</span></div>
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium"><Mail className="w-4 h-4 text-safari-500" /><span>{(wildBrook.email || '').split('/')[0]}</span></div>
              </div>
              <div className="pt-2">
                <button onClick={onOpenBooking} className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm">Inquire for Wild Brook Booking</button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <img src={safariImages.nightCamp} alt="Wild Brook Retreat cottages" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800"><img src={safariImages.tropicalLeafDew} alt="Valley foliage" className="w-full h-full object-cover" /></div>
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800"><img src={safariImages.acaciaSunset} alt="Sunset near Gohari" className="w-full h-full object-cover" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forest Rest Houses (FRHs) Section */}
      <section className="py-16 bg-gray-50/60 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400 block mb-1">Colonial Heritage Forest Lodges</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Forest Rest Houses (FRH) of Rajaji</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">Managed directly by the Uttarakhand Forest Department, these historic colonial-era rest houses offer rustic charm, prime wildlife proximity, and complete seclusion.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100/75 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Forest Rest House</th>
                    <th className="px-6 py-4">Suites Available</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4">Entry Gate Access</th>
                    <th className="px-6 py-4">Setting & Atmosphere</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {forestRestHouses.map((frh, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{frh.name}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{frh.suites}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${frh.status.includes('Operational') ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'}`}>{frh.status}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-safari-600 dark:text-safari-400">{frh.gate}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">{frh.setting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FRH Booking Procedure Box */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><Building2 className="w-5 h-5 text-safari-600" />How to Book Forest Rest Houses</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{frhBookingInfo.bookingRule}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 space-y-1">
                <div><strong>Authority:</strong> {frhBookingInfo.authority}</div>
                <div><strong>Address:</strong> {frhBookingInfo.address}</div>
                <div><strong>Office Tel:</strong> {frhBookingInfo.phone}</div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
              <button onClick={onOpenBooking} className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm text-center">Safari & Stay Assistance</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
