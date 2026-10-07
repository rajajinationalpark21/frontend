import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, X, AlertCircle, Phone, MessageSquare, Clock, FileText } from 'lucide-react';
import { contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

const defaultPolicies = [
  {
    num: "1",
    title: "Arrival at Gate",
    desc: "Guests must reach the designated safari gate at least 20 minutes before the scheduled reporting/last entry time mentioned on the safari permit or confirmation.",
  },
  {
    num: "2",
    title: "Late Arrival",
    desc: "Guests arriving after the permitted entry or reporting time may be denied entry. In such cases, the safari fee will strictly not be refundable.",
  },
  {
    num: "3",
    title: "Final Safari Timing",
    desc: "Guests are advised to check the final date, timing, zone and reporting details mentioned on their safari permit or booking confirmation before travelling.",
  },
  {
    num: "4",
    title: "Student Concession",
    desc: "Student concessions are available only for recognised institutional educational tours, subject to applicable Forest Department rules, eligibility and prior written approval.",
  },
  {
    num: "5",
    title: "Children Policy",
    desc: "Children above 11 years of age will be charged the applicable park entry fee, subject to prevailing Forest Department rules and regulations.",
  },
  {
    num: "6",
    title: "Nature Guide Mandatory",
    desc: "An authorised nature guide/local guide is mandatory with each safari vehicle wherever required under the applicable park and Forest Department regulations.",
  },
  {
    num: "7",
    title: "Permit Changes, Cancellations & Refunds",
    desc: "Once a safari permit has been issued, changes to the safari date, slot or zone may not be permitted under Forest Department regulations. Where applicable rules do not permit a refund or change, no refund will be provided.",
  },
  {
    num: "8",
    title: "Circumstances Beyond Our Control (Force Majeure)",
    desc: "If a safari is cancelled, suspended or does not operate due to natural calamities, adverse weather conditions, river flooding, government or Forest Department restrictions, wildlife-related safety concerns, or park closure, no refund will be provided.",
  },
];

const defaultDos = [
  "Obtain the required permits before entering the Park and strictly follow all Forest Department rules.",
  "Use the services of an authorised Nature Guide to safely interpret wildlife signs and tracks.",
  "Drive slowly and carefully (speed limit under 30 km/h). A quiet safari improves observation.",
  "Stay on designated roads and safari tracks. Driving off-track destroys vegetation and animal nests.",
  "Maintain a safe, respectful distance from wildlife, especially wild elephant herds.",
  "Keep vocal noise to a minimum; switch off car stereos to enjoy natural forest calls.",
  "Wear natural or subdued colours (khaki, olive green, earthy brown) rather than bright neon clothes.",
  "Carry a camera and binoculars to observe wildlife responsibly without causing panic.",
];

const defaultDonts = [
  "Do not carry firearms, hunting gear, or prohibited weapons into the Park boundary.",
  "Do not smoke or light fires inside the forest. Even a small spark creates serious forest fires.",
  "Do not get out of your safari vehicle except at officially designated watchtowers.",
  "Do not feed, chase, tease, or attempt to attract wild animals with food items.",
  "Do not expect a zoo. Rajaji is a wild, natural landscape; cherish the entire ecosystem.",
  "Do not be disappointed if you do not spot a tiger; every safari offers varied wildlife.",
  "Alcohol and non-vegetarian food are strictly not permitted inside the Park.",
  "Do not litter. Carry all non-biodegradable waste (plastics, cans, wrappers) back with you.",
  "Do not disturb the environment. Plucking flowers, collecting wood or disturbing plants is prohibited.",
  "Do not honk or blow horns inside the reserve under any circumstances.",
];

export default function TermsConditionsPage() {
  const [policies, setPolicies] = useState(defaultPolicies);
  const [dos, setDos] = useState(defaultDos);
  const [donts, setDonts] = useState(defaultDonts);

  useEffect(() => {
    fetchContent()
      .then(res => {
        if (res.data?.tickets?.cancellationPolicy && res.data.tickets.cancellationPolicy.length > 0) {
          const parsed = res.data.tickets.cancellationPolicy.map((item, idx) => {
            const parts = item.split(': ');
            return {
              num: String(idx + 1),
              title: parts[0] || `Policy ${idx + 1}`,
              desc: parts[1] || item,
            };
          });
          setPolicies(parsed);
        }
        if (res.data?.parkRules?.dos && res.data.parkRules.dos.length > 0) {
          setDos(res.data.parkRules.dos.map(d => `${d.title}: ${d.desc}`));
        }
        if (res.data?.parkRules?.donts && res.data.parkRules.donts.length > 0) {
          setDonts(res.data.parkRules.donts.map(d => `${d.title}: ${d.desc}`));
        }
      })
      .catch(() => {});
  }, []);

  const phone = contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I have a question regarding Rajaji safari booking terms and cancellation policy.")}`;

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Rajaji Jeep Safari Terms & Conditions, Cancellation & Refund Policy"
        description="Read official Rajaji National Park Jeep Safari terms and conditions, cancellation policy, refund rules, gate arrival guidelines, and visitor regulations."
        keywords="rajaji safari terms conditions, cancellation policy rajaji jeep safari, refund rules rajaji tiger reserve, safari permit guidelines"
        ogImage={safariImages.safariJeepTrail}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-24 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepTrail} alt="Safari terms" className="w-full h-full object-cover opacity-25 scale-105" />
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
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visitor Guidelines</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Rajaji Jeep Safari <br className="hidden sm:block" />
              <span className="italic font-normal text-emerald-400">Terms & Conditions</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed pt-2">
              Cancellation, Refunds, Gate Arrival Timings & Forest Department Safari Regulations
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 8 Core Clauses */}
        <div className="space-y-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">Operating Protocols</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 dark:text-emerald-50">
              Safari Terms & Cancellation Policy
            </h2>
            <p className="text-sm text-gray-500 dark:text-emerald-100/70 mt-1">
              Please review these mandatory operational conditions before confirming your safari booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((p, idx) => (
              <div 
                key={idx}
                className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-3 flex flex-col justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center justify-center shrink-0">
                    {p.num || idx + 1}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-emerald-50">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-emerald-100/80 leading-relaxed pl-11 font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold">Official Do's</h3>
            </div>
            <ul className="space-y-3 text-sm text-emerald-950 dark:text-emerald-200/90 leading-relaxed">
              {dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-rose-800 dark:text-rose-300">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                <X className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold">Official Don'ts</h3>
            </div>
            <ul className="space-y-3 text-sm text-rose-950 dark:text-rose-200/90 leading-relaxed">
              {donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Help */}
        <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/15 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              Questions regarding permits or cancellation policies?
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our official safari booking team is available via Phone and WhatsApp daily.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safari-600 hover:bg-safari-700 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              <Phone className="w-3.5 h-3.5" /> Call: {phone}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
