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
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-safari-500 animate-spin" />
      </div>
    );
  }

  const data = stay || {};
  const wildBrook = data.wildBrook || {};
  const forestRestHouses = data.forestRestHouses || [];
  const frhBookingInfo = data.frhBookingInfo || {};

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Stay in Rajaji National Park | Wild Brook Retreat & Forest Rest Houses"
        description="Experience wilderness lodging in Rajaji National Park. Wild Brook Retreat eco-cottages in Gohari range, and British colonial Forest Rest Houses (FRHs) across Chila and Motichur."
        keywords="stay in rajaji national park, forest rest house booking chilla motichur, wild brook retreat booking, eco resort rajaji haridwar"
        ogImage={safariImages.nightCamp}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.nightCamp} alt="Campfire under night sky in Rajaji" className="w-full h-full object-cover opacity-25 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07150c] via-[#07150c]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07150c] via-transparent to-[#07150c]/70" />
        </div>

        {/* Tiger Watermark in forest shadow */}
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
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Wilderness Accommodations</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Stay in <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">Rajaji National Park</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Wild Brook Retreat Showcase */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Premier Eco-Lodge
              </div>
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
              <div className="pt-2">
                <button 
                  onClick={onOpenBooking} 
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25"
                >
                  Inquire for Wild Brook Booking
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <img src={safariImages.nightCamp} alt="Wild Brook Retreat cottages" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <img src={safariImages.tropicalLeafDew} alt="Valley foliage" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <img src={safariImages.acaciaSunset} alt="Sunset near Gohari" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forest Rest Houses (FRHs) Section */}
      <section className="relative z-10 py-16 bg-[#f7f5ed]/80 dark:bg-[#071109]/80 pattern-leaf-delicate backdrop-blur-sm border-t border-emerald-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
              Colonial Heritage Forest Lodges
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 dark:text-emerald-50">
              Forest Rest Houses (FRH) of Rajaji
            </h2>
            <p className="text-sm text-gray-600 dark:text-emerald-100/75 mt-2 leading-relaxed font-light">
              Managed directly by the Uttarakhand Forest Department, these historic colonial-era rest houses offer rustic charm, prime wildlife proximity, and complete seclusion.
            </p>
          </div>

          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider border-b border-emerald-900/15">
                  <tr>
                    <th className="px-6 py-4">Forest Rest House</th>
                    <th className="px-6 py-4">Suites Available</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4">Entry Gate Access</th>
                    <th className="px-6 py-4">Setting & Atmosphere</th>
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

          {/* FRH Booking Procedure Box with Deep Forest Tone & Tiger Stencil */}
          <div className="relative overflow-hidden bg-[#07150c] text-white p-8 sm:p-10 rounded-3xl border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-start justify-between gap-8">
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
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
                How to Book Forest Rest Houses
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                {frhBookingInfo.bookingRule}
              </p>
              <div className="text-xs text-emerald-200/70 pt-2 space-y-1">
                <div><strong>Authority:</strong> {frhBookingInfo.authority}</div>
                <div><strong>Address:</strong> {frhBookingInfo.address}</div>
                <div><strong>Office Tel:</strong> {frhBookingInfo.phone}</div>
              </div>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col gap-3 w-full md:w-auto">
              <button 
                onClick={onOpenBooking} 
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 text-center"
              >
                Safari & Stay Assistance
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
