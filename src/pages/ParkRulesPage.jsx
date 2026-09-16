import React from 'react';
import { ShieldCheck, ShieldAlert, Check, X, AlertTriangle, Clock, Eye, VolumeX, Flame } from 'lucide-react';
import { parkRulesData } from '../data/parkContent';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function ParkRulesPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Park Rules & Regulations | Do's and Don'ts at Rajaji National Park"
        description="Official visitor guidelines and wildlife safety regulations for Rajaji National Park. Dress codes, speed limits, noise control, and zero-plastic policies."
        keywords="rajaji park rules, wildlife safari guidelines, dos and donts rajaji national park, forest safety regulations uttarakhand"
        ogImage={safariImages.rangerSolo}
      />

      {/* Hero Header */}
      <section className="relative py-20 bg-safari-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={safariImages.rangerSolo}
            alt="Forest guard patrolling Rajaji"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider mb-4 border border-safari-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Conservation Protocol
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Park Rules & Visitor Guidelines
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              To safeguard the wild Asian elephants, Bengal tigers, and delicate forest ecosystem, all visitors and drivers must strictly adhere to the following Wildlife Protection guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Speed & Silence Quick Rules */}
      <section className="py-8 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-sm block">Sunrise to Sunset Only</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80">Strictly no entry or driving after dark</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <VolumeX className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-sm block">Speed Limit Under 30 km/h</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80">No vehicle horns or music playing allowed</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-sm block">High Fire Hazard Zone</span>
                <span className="text-xs text-amber-800 dark:text-amber-300/80">Cigarettes and matchsticks strictly prohibited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Split */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* DO's */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mandatory Do's</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">Essential visitor practices for safe wildlife viewing</span>
              </div>
            </div>

            <div className="space-y-4">
              {parkRulesData.dos.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DONT's */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strict Don'ts</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">Activities strictly prohibited under the Wildlife Protection Act</span>
              </div>
            </div>

            <div className="space-y-4">
              {parkRulesData.donts.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Legal Penalty Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gray-900 text-white border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              Wildlife Protection Act (1972) Enforcement
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Violations such as littering, speeding, entering non-designated zones, or disturbing wild animals carry heavy fines, confiscation of equipment, and legal prosecution by Uttarakhand Forest Department.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
          >
            Agree & Book Permit
          </button>
        </div>

      </section>
    </div>
  );
}
