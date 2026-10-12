import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare, Ticket, Sparkles } from 'lucide-react';
import { contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import { faqSchema } from '../seo/schema';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';

const fallbackFaqs = [
  {
    q: "How much is the Rajaji National Park Jeep Safari?",
    a: "The Gypsy vehicle hire is ₹3,500 per vehicle (capacity up to 6 persons). In addition, mandatory Forest Department charges apply: Park Entry (₹150 Indian / ₹600 Foreigner per person), Vehicle Permit (₹250 Indian / ₹500 Foreigner per vehicle), and Mandatory Nature Guide (₹1,000 per Gypsy).",
  },
  {
    q: "What is the entry fee for Rajaji National Park?",
    a: "Park entry fee is ₹150 per person for Indian visitors and ₹600 per person for foreign nationals for designated safari zones (Chilla, Ranipur, Motichur, Chillawali). Jhilmil Zone entry is ₹200 per Indian visitor. Children above 11 years are charged full entry fee.",
  },
  {
    q: "How can I book a Rajaji Jeep Safari online?",
    a: "Booking is simple: choose your preferred safari date, morning or afternoon time slot, and safari zone. Provide the required identification details for all travellers (Aadhaar/Passport/Voter ID) and complete the booking request online or via our dedicated WhatsApp desk.",
  },
  {
    q: "What are the Rajaji National Park safari timings?",
    a: "Safari shift timings operate seasonally: 15 Nov – 15 Feb: Morning 6:30 AM – 8:00 AM & Afternoon 1:30 PM – 3:00 PM. 16 Feb – 15 Apr: Morning 6:00 AM – 7:30 AM & Afternoon 2:00 PM – 3:30 PM. 16 Apr – 15 Jun: Morning 5:30 AM – 7:00 AM & Afternoon 3:00 PM – 4:30 PM. Visitors must arrive at least 20 minutes prior.",
  },
  {
    q: "What is the Jeep permit fee in Rajaji Tiger Reserve?",
    a: "The Forest Department vehicle entry permit is ₹250 per vehicle for Indian nationals and ₹500 per vehicle for foreign nationals, valid for one entry shift.",
  },
  {
    q: "How many people can travel in one Rajaji safari Jeep?",
    a: "Each authorised 4x4 Gypsy vehicle accommodates up to 6 visitors plus one certified Forest Department nature guide and driver.",
  },
  {
    q: "Which Rajaji safari zone is accessible from Haridwar?",
    a: "Ranipur Gate (Haridwar Zone) is the closest entry point, located just 9 km from Haridwar Railway Station and near BHEL township. Chilla Gate and Motichur Gate are also easily accessible within 12–15 km.",
  },
  {
    q: "Can I book a Rajaji Jeep Safari from Rishikesh?",
    a: "Yes! Chilla Range Gate and Gohri Range Gate are directly across the river from Rishikesh (10–15 km), while the historic Chaurasi Kutiya (Beatles Ashram) is located directly at Swargashram in Rishikesh.",
  },
  {
    q: "Is advance booking available for Rajaji National Park safari?",
    a: "Yes, advance booking is strongly recommended. The Forest Department enforces strict daily vehicle caps per zone to safeguard the wildlife corridors. Weekend and holiday slots fill rapidly.",
  },
  {
    q: "Are wildlife sightings guaranteed during a Rajaji Jeep Safari?",
    a: "Rajaji is a protected, natural wilderness and not a zoo. Animal sightings depend on natural movement, season, temperature, and habitat conditions. While elephants, deer, and diverse birds are seen daily, tiger and leopard sightings are thrilling wild encounters that cannot be guaranteed.",
  },
];

export default function FAQPage({ onOpenBooking }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(0);
  const [heroRatio, setHeroRatio] = useState(null);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const phone = content?.settings?.contact?.phone || contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I have an inquiry about Rajaji National Park safari booking.")}`;
  
  // Dynamic FAQs from DB with fallback
  const faqsList = (content?.faqs?.items && content.faqs.items.length > 0)
    ? content.faqs.items
    : fallbackFaqs;

  const headerOverview = content?.faqs?.overview || "Find quick answers to common questions regarding Rajaji National Park Jeep Safaris, entry fees, vehicle permits, timings, and booking guidelines.";
  const heroTitle = content?.faqs?.title;
  const heroSubtitle = content?.faqs?.subtitle || headerOverview;
  const heroBanner = content?.faqs?.heroBanner || safariImages.safariJeepSavannah;

  return (
    <div className="relative min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors">
      <SEO
        ogImage={heroBanner}
        schemaJson={faqSchema(faqsList)}
      />

      {/* Hero Header — Seamless full-width background */}
      <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden bg-stone-900 text-white">
        {/* Full bleed image background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="Rajaji National Park wildlife"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallbackUsed && safariImages.walkingTiger) {
                img.dataset.fallbackUsed = "1";
                img.src = safariImages.walkingTiger;
              }
            }}
          />
          {/* Subtle text readability scrim */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              {heroTitle || (
                <>
                  Frequently Asked <br className="hidden sm:block" />
                  <span className="italic font-normal text-emerald-300">Questions (FAQ)</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed pt-2 drop-shadow">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="relative z-10 py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-gray-900 dark:text-emerald-50 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition ${
                    isOpen ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-[#f5f2e8]/80 dark:bg-[#07150c] text-gray-500 dark:text-emerald-400/60'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-600 dark:text-emerald-100/80 leading-relaxed font-light border-t border-emerald-900/10 dark:border-emerald-800/30">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title="Speak Directly with our Safari Desk"
        subtitle="Our reservation officers are available daily to assist with zone recommendations, permit confirmations, Gypsy allocation, and seasonal gate updates."
        primaryText="Book Safari Online"
        onPrimaryClick={onOpenBooking}
        secondaryText={`Call ${phone}`}
        secondaryLink={`tel:${phone.replace(/\s+/g, '')}`}
        secondaryIcon={Phone}
        whatsappText="WhatsApp Chat"
        whatsappLink={whatsappUrl}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
