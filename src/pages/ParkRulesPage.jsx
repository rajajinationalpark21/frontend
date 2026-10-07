import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Check, X, AlertTriangle, Clock, Eye, VolumeX, Flame, Loader2 } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

export default function ParkRulesPage({ onOpenBooking }) {
  const [parkRules, setParkRules] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setParkRules(res.data.parkRules))
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

  const data = parkRules || {};
  const dos = data.dos || [];
  const donts = data.donts || [];

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Park Rules & Regulations | Do's and Don'ts at Rajaji National Park"
        description="Official visitor guidelines and wildlife safety regulations for Rajaji National Park. Dress codes, speed limits, noise control, and zero-plastic policies."
        keywords="rajaji park rules, wildlife safari guidelines, dos and donts rajaji national park, forest safety regulations uttarakhand"
        ogImage={safariImages.rangerSolo}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.rangerSolo} alt="Forest guard patrolling Rajaji" className="w-full h-full object-cover opacity-25 scale-105" />
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
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conservation Protocol</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Park Rules & <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">Visitor Guidelines</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Speed & Silence Quick Rules */}
      <section className="relative z-10 py-8 bg-amber-50/80 dark:bg-[#131109] border-b border-amber-200/80 dark:border-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm block">Sunrise to Sunset Only</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80 font-light">Strictly no entry or driving after dark</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <VolumeX className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm block">Speed Limit Under 30 km/h</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80 font-light">No vehicle horns or music playing allowed</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm block">High Fire Hazard Zone</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80 font-light">Cigarettes and matchsticks strictly prohibited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Split */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* DO's */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-emerald-900/15 dark:border-emerald-800/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50">Mandatory Do's</h2>
                <span className="text-xs text-gray-500 dark:text-emerald-400/70">Essential visitor practices for safe wildlife viewing</span>
              </div>
            </div>
            <div className="space-y-4">
              {dos.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm">
                  <h3 className="font-serif font-bold text-gray-900 dark:text-emerald-50 text-base mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/75 leading-relaxed pl-6 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DONT's */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-red-900/15 dark:border-red-800/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                <X className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50">Strict Don'ts</h2>
                <span className="text-xs text-gray-500 dark:text-red-400/70">Activities strictly prohibited under the Wildlife Protection Act</span>
              </div>
            </div>
            <div className="space-y-4">
              {donts.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#fdfcf8]/90 dark:bg-[#1a0f0f]/90 backdrop-blur-md border border-red-900/15 dark:border-red-900/40 shadow-sm">
                  <h3 className="font-serif font-bold text-gray-900 dark:text-red-100 text-base mb-1.5 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 stroke-[2.5]" />
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-red-100/70 leading-relaxed pl-6 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Penalty Box with Deep Forest & Tiger Stencil */}
        <div className="relative overflow-hidden mt-16 p-8 sm:p-10 rounded-3xl bg-[#07150c] text-white border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none bg-no-repeat bg-right-bottom bg-contain opacity-15"
            style={{
              backgroundImage: `url('${safariImages.tigerBgOverlay}')`,
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              Wildlife Protection Act (1972) Enforcement
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed font-light">
              Violations such as littering, speeding, entering non-designated zones, or disturbing wild animals carry heavy fines, confiscation of equipment, and legal prosecution by Uttarakhand Forest Department.
            </p>
          </div>
          <button 
            onClick={onOpenBooking} 
            className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 shrink-0"
          >
            Agree & Book Permit
          </button>
        </div>
      </section>
    </div>
  );
}
