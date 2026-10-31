import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Clock, 
  FileText, 
  Search, 
  ChevronDown, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  BookOpen,
  Scale,
  Ban
} from 'lucide-react';
import { safariImages } from '../data/safariData';
import { sitePhone, siteWhatsapp } from '../utils/sitePhones';
import { fetchContent, primedContent } from '../api/client';
import SEO from '../components/SEO';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import RichText from '../components/RichText';

const defaultPolicies = [
  {
    num: "01",
    tag: "Gate Protocol",
    title: "Arrival at Gate",
    desc: "Guests must reach the designated safari gate at least 20 minutes before the scheduled reporting/last entry time mentioned on the safari permit or confirmation.",
    highlight: "Arrive 20 mins prior to gate closure",
  },
  {
    num: "02",
    tag: "Gate Protocol",
    title: "Late Arrival",
    desc: "Guests arriving after the permitted entry or reporting time may be denied entry. In such cases, the safari fee will strictly not be refundable.",
    highlight: "Non-refundable if reporting time is missed",
  },
  {
    num: "03",
    tag: "Booking Rules",
    title: "Final Safari Timing",
    desc: "Guests are advised to check the final date, timing, zone and reporting details mentioned on their safari permit or booking confirmation before travelling.",
    highlight: "Double check zone gate before departing",
  },
  {
    num: "04",
    tag: "Concessions",
    title: "Student Concession",
    desc: "Student concessions are available only for recognised institutional educational tours, subject to applicable Forest Department rules, eligibility and prior written approval.",
    highlight: "Institutional ID & prior approval required",
  },
  {
    num: "05",
    tag: "Booking Rules",
    title: "Children Policy",
    desc: "Children above 11 years of age will be charged the applicable park entry fee, subject to prevailing Forest Department rules and regulations.",
    highlight: "Full entry applies for children 11+ years",
  },
  {
    num: "06",
    tag: "Sanctuary Law",
    title: "Nature Guide Mandatory",
    desc: "An authorised nature guide/local guide is mandatory with each safari vehicle wherever required under the applicable park and Forest Department regulations.",
    highlight: "1 certified naturalist guide per vehicle",
  },
  {
    num: "07",
    tag: "Refund & Cancellations",
    title: "Permit Changes & Cancellations",
    desc: "Once a safari permit has been issued, changes to the safari date, slot or zone may not be permitted under Forest Department regulations. Where applicable rules do not permit a refund or change, no refund will be provided.",
    highlight: "Non-transferable government permits",
  },
  {
    num: "08",
    tag: "Force Majeure",
    title: "Circumstances Beyond Control",
    desc: "If a safari is cancelled, suspended or does not operate due to natural calamities, adverse weather conditions, river flooding, government or Forest Department restrictions, wildlife-related safety concerns, or park closure, no refund will be provided.",
    highlight: "Weather, river flooding & forest closures",
  },
];

const defaultDos = [
  {
    title: "Official Permits & IDs",
    desc: "Obtain the required permits before entering the Park and strictly follow all Forest Department rules. Keep original photo IDs handy.",
  },
  {
    title: "Certified Naturalist Guidance",
    desc: "Always use the services of an authorised Nature Guide to safely interpret wildlife signs, alarms, and tracks without intrusion.",
  },
  {
    title: "Strict Forest Speed Limit",
    desc: "Drive slowly and carefully (speed limit under 30 km/h). A silent, gentle safari improves sighting chances significantly.",
  },
  {
    title: "Stay on Forest Tracks",
    desc: "Remain strictly on designated roads. Off-roading is a punishable forest offense that damages delicate vegetation and burrows.",
  },
  {
    title: "Safe Wildlife Distance",
    desc: "Maintain a respectful distance of at least 30–50 meters, especially when encountering wild Asian elephant herds or big cats.",
  },
  {
    title: "Camouflaged Attire",
    desc: "Wear natural, muted tones (khaki, olive green, dusty tan, beige). Bright fluorescent shades alarm and startle wild animals.",
  },
];

const defaultDonts = [
  {
    title: "No Firearms or Weapons",
    desc: "Do not carry firearms, hunting tools, trapping devices, or prohibited equipment across any sanctuary gate boundary.",
  },
  {
    title: "No Smoking or Open Flames",
    desc: "Do not smoke, light cigarettes, or use matches inside the forest. Sparks can trigger devastating wild canopy fires.",
  },
  {
    title: "Never Step Off the Vehicle",
    desc: "Do not get out of your 4x4 Gypsy under any circumstances except at officially barricaded forest rest stations and watchtowers.",
  },
  {
    title: "Zero Feeding or Teasing",
    desc: "Do not feed, provoke, whistle at, or throw food to animals. Feeding alters wild foraging behavior and carries heavy fines.",
  },
  {
    title: "No Alcohol or Non-Veg Food",
    desc: "Alcohol, intoxicants, and non-vegetarian food are strictly banned within the wildlife reserve perimeter.",
  },
  {
    title: "Zero Plastic & No Litter",
    desc: "Rajaji is a strict zero-litter zone. Bring all bottles, candy wrappers, and plastic containers back with your Gypsy.",
  },
];

// The CMS's cancellation policy and park rules in the shape the page shows; null when not set.
const policiesFrom = (data) =>
  data?.tickets?.cancellationPolicy?.length
    ? data.tickets.cancellationPolicy.map((item, idx) => {
        const parts = item.split(': ');
        return {
          num: String(idx + 1).padStart(2, '0'),
          tag: idx < 3 ? "Gate Protocol" : idx === 6 ? "Cancellation" : "Regulation",
          title: parts[0] || `Policy ${idx + 1}`,
          desc: parts[1] || item,
          highlight: parts[0] || `Mandatory Rule #${idx + 1}`,
        };
      })
    : null;
const dosFrom = (data) =>
  data?.parkRules?.dos?.length ? data.parkRules.dos.map(d => ({ title: d.title || "Do's Rule", desc: d.desc || d.title })) : null;
const dontsFrom = (data) =>
  data?.parkRules?.donts?.length ? data.parkRules.donts.map(d => ({ title: d.title || "Don'ts Rule", desc: d.desc || d.title })) : null;

export default function TermsConditionsPage() {
  // A prerendered page starts from the build-time content (see primedContent).
  const [policies, setPolicies] = useState(() => policiesFrom(primedContent()) || defaultPolicies);
  const [dos, setDos] = useState(() => dosFrom(primedContent()) || defaultDos);
  const [donts, setDonts] = useState(() => dontsFrom(primedContent()) || defaultDonts);
  const [content, setContent] = useState(primedContent);
  const [loading, setLoading] = useState(() => !primedContent());

  // Dynamic filter state
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'policies' | 'dos' | 'donts'
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClause, setExpandedClause] = useState("01");

  useEffect(() => {
    fetchContent()
      .then(res => {
        setContent(res.data);
        const parsed = policiesFrom(res.data);
        if (parsed) setPolicies(parsed);
        const parkDos = dosFrom(res.data);
        if (parkDos) setDos(parkDos);
        const parkDonts = dontsFrom(res.data);
        if (parkDonts) setDonts(parkDonts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const phone = sitePhone(content?.settings);
  const whatsappUrl = `https://wa.me/${siteWhatsapp(content?.settings).replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I have a question regarding Rajaji safari booking terms and cancellation policy.")}`;

  const parkRules = content?.parkRules || {};
  const heroTitle = parkRules.title || "Rajaji Safari Terms, Rules & Visitor Protocol";
  const heroSubtitle = parkRules.subtitle || "Mandatory Forest Department regulations, cancellation policies, reporting timings, and conservation guidelines.";
  const heroBanner = parkRules.heroBanner || safariImages.safariJeepTrail;

  // Filtered lists based on search
  const filteredPolicies = policies.filter(p => 
    !searchQuery || 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDos = dos.filter(d =>
    !searchQuery ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDonts = donts.filter(d =>
    !searchQuery ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Background Delicate Texture */}
      <div className="pattern-leaf-delicate pointer-events-none fixed inset-0 z-0 opacity-40" aria-hidden="true" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={parkRules.heroImages?.length ? parkRules.heroImages : heroBanner}
        alt={parkRules.heroImageAlt || "Rajaji forest canopy trail"}
      />
      {/* Quick rule summary */}
      <section className="relative z-10 border-b border-emerald-950/10 bg-[#f7f5ed] py-8 dark:border-emerald-900/40 dark:bg-[#07120a]">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3.5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { Icon: Clock, title: "Gate Arrival", text: "Report 20m before entry" },
            { Icon: ShieldCheck, title: "Mandatory Guide", text: "1 per official Gypsy" },
            { Icon: Ban, title: "Zero Tolerance", text: "No plastic, horn or feeding" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl border border-emerald-950/10 bg-white/70 p-4 text-left dark:border-emerald-500/20 dark:bg-white/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">{title}</div>
                <div className="mt-0.5 text-[11px] text-gray-600 dark:text-emerald-100/70">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. INTERACTIVE CONTROLS: TABS & REAL-TIME SEARCH FILTER */}
      <section className="sticky top-[68px] sm:top-[76px] z-30 bg-[#f7f5ed]/95 dark:bg-[#07120a]/95 backdrop-blur-md border-b border-emerald-950/10 dark:border-emerald-900/40 py-4 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Segmented Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-safari-600 text-white shadow-md shadow-safari-600/30"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              All Directives ({policies.length + dos.length + donts.length})
            </button>
            <button
              onClick={() => setActiveTab("policies")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "policies"
                  ? "bg-safari-600 text-white shadow-md shadow-safari-600/30"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Terms & Clauses ({policies.length})
            </button>
            <button
              onClick={() => setActiveTab("dos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "dos"
                  ? "bg-safari-600 text-white shadow-md shadow-safari-600/30"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Official Do's ({dos.length})
            </button>
            <button
              onClick={() => setActiveTab("donts")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "donts"
                  ? "bg-safari-600 text-white shadow-md shadow-safari-600/30"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Strict Don'ts ({donts.length})
            </button>
          </div>

          {/* Interactive Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter rules, refunds, gates..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-safari-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 3. MAIN DIRECTIVES CONTENT CONTAINER */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* SECTION A: 8 OPERATING PROTOCOLS & CLAUSES */}
        {(activeTab === "all" || activeTab === "policies") && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-950/10 dark:border-emerald-800/30 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-px w-6 bg-emerald-500" />
                  <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                    Operating Protocols
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-950 dark:text-white">
                  Safari Booking & Cancellation Terms
                </h2>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Showing {filteredPolicies.length} conditions
              </span>
            </div>

            {/* Interactive Cards with Hover Elevate & Expand Drawer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPolicies.map((p) => {
                const isSelected = expandedClause === p.num;
                return (
                  <div
                    key={p.num}
                    onClick={() => setExpandedClause(isSelected ? null : p.num)}
                    className={`group rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border backdrop-blur-md relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#fdfcf8] dark:bg-[#0c1a12] border-safari-500 shadow-xl shadow-safari-500/10 -translate-y-0.5"
                        : "bg-[#fdfcf8]/90 dark:bg-[#0c1610]/80 border-emerald-950/10 dark:border-emerald-900/40 hover:border-safari-500/50 hover:shadow-lg"
                    }`}
                  >
                    {/* Top Tag & Number */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/40">
                          {p.tag || "Clause"}
                        </span>
                        <span className="font-mono text-sm font-extrabold text-emerald-600/70 dark:text-emerald-400/60">
                          {p.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-gray-950 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition-colors">
                        {p.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-emerald-100/80 leading-relaxed mt-2.5 font-normal">
                        <RichText text={p.desc} />
                      </p>
                    </div>

                    {/* Bottom Quick Pill */}
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400/90 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <RichText text={p.highlight} />
                      </span>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-safari-500 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION B: DO'S & DON'TS INTERACTIVE SIDE-BY-SIDE MATRIX */}
        {(activeTab === "all" || activeTab === "dos" || activeTab === "donts") && (
          <div className="space-y-8">
            <div className="border-b border-emerald-950/10 dark:border-emerald-800/30 pb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-px w-6 bg-emerald-500" />
                <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                  Field Ethics
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-950 dark:text-white">
                Wild Trail Code: Do's & Strict Prohibitions
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* DO'S COLUMN */}
              {(activeTab === "all" || activeTab === "dos") && (
                <div className="bg-gradient-to-br from-emerald-50/70 to-emerald-100/30 dark:from-emerald-950/30 dark:to-[#07150c] rounded-3xl p-7 sm:p-9 border border-emerald-300/60 dark:border-emerald-800/50 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between gap-4 border-b border-emerald-200/60 dark:border-emerald-800/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-bold text-emerald-950 dark:text-emerald-100">
                          Official Do's
                        </h3>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300/80">
                          Mandatory guidelines for respectful safari encounters
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-200/60 dark:bg-emerald-900/50 text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                      {filteredDos.length} Rules
                    </span>
                  </div>

                  <div className="space-y-4">
                    {filteredDos.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-900/10 dark:border-emerald-800/40 transition hover:translate-x-1 duration-200 flex items-start gap-3.5"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                          ✓
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-950 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-emerald-100/75 leading-relaxed mt-1">
                            <RichText text={item.desc} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* DONT'S COLUMN */}
              {(activeTab === "all" || activeTab === "donts") && (
                <div className="bg-gradient-to-br from-rose-50/70 to-rose-100/30 dark:from-rose-950/30 dark:to-[#1a080c] rounded-3xl p-7 sm:p-9 border border-rose-300/60 dark:border-rose-900/50 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between gap-4 border-b border-rose-200/60 dark:border-rose-900/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/25">
                        <X className="w-5 h-5 stroke-[3]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-bold text-rose-950 dark:text-rose-100">
                          Strict Don'ts
                        </h3>
                        <p className="text-xs text-rose-800 dark:text-rose-300/80">
                          Prohibited actions subject to immediate fines & confiscation
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-200/60 dark:bg-rose-950/60 text-[11px] font-bold text-rose-900 dark:text-rose-200">
                      {filteredDonts.length} Warnings
                    </span>
                  </div>

                  <div className="space-y-4">
                    {filteredDonts.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#fdfcf8]/90 dark:bg-[#1a080c]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-rose-900/10 dark:border-rose-900/40 transition hover:translate-x-1 duration-200 flex items-start gap-3.5"
                      >
                        <div className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                          ✕
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-950 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-rose-100/75 leading-relaxed mt-1">
                            <RichText text={item.desc} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </section>

      {/* 4. UNIFIED CALL TO ACTION MATCHING HOMEPAGE */}
      <CallToAction
        title="Questions Regarding Permits or Policies?"
        subtitle="Our reservation officers are available daily to clarify visitor rules, cancellation terms, gate reporting schedules, and vehicle guidelines."
        primaryText="Book Safari Permit"
        primaryLink="/safari/tickets"
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
