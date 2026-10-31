import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, Phone, MessageSquare, Ticket, Sparkles } from 'lucide-react';
import { contactInfo, safariImages } from '../data/safariData';
import { fetchContent, primedContent } from '../api/client';
import SEO from '../components/SEO';
import { faqSchema } from '../seo/schema';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import RichText from '../components/RichText';
import { hoverToOpen } from '../utils/canHover';
import AnswerReveal from '../components/AnswerReveal';

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
  // A prerendered page starts from the build-time content (see primedContent).
  const [content, setContent] = useState(primedContent);
  const [loading, setLoading] = useState(() => !primedContent());
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

      <PageHero
        title={heroTitle || "Frequently Asked Questions (FAQ)"}
        subtitle={heroSubtitle}
        image={content?.faqs?.heroImages?.length ? content.faqs.heroImages : heroBanner}
        fallbackImage={safariImages.walkingTiger}
        alt={content?.faqs?.heroImageAlt || "Rajaji National Park wildlife"}
      />

      {/* FAQ Accordion Section */}
      <section className="relative z-10 py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                // With a mouse, pointing at a question opens its answer (and closes the others).
                {...hoverToOpen(() => setOpenIdx(idx))}
                className={`bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-2xl border overflow-hidden transition-[border-color,box-shadow] duration-300 ${
                  isOpen ? 'border-emerald-600/30 dark:border-emerald-400/30 shadow-md' : 'border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:border-emerald-600/25'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-gray-900 dark:text-emerald-50 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition duration-300 ${
                    isOpen ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rotate-180' : 'bg-[#f5f2e8]/80 dark:bg-[#07150c] text-gray-500 dark:text-emerald-400/60'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnswerReveal
                  open={isOpen}
                  id={`faq-answer-${idx}`}
                  className="px-6 pb-6 pt-3 text-sm text-gray-600 dark:text-emerald-100/80 leading-relaxed font-light border-t border-emerald-900/10 dark:border-emerald-800/30"
                >
                  <p><RichText text={faq.a} /></p>
                </AnswerReveal>
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
