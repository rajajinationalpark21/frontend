import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare, Ticket, Sparkles } from 'lucide-react';
import { contactInfo, safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

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
    a: "Yes! Chilla Range Gate and Gohari Range Gate are directly across the river from Rishikesh (10–15 km), while the historic Chaurasi Kutiya (Beatles Ashram) is located directly at Swargashram in Rishikesh.",
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
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);

  const phone = content?.settings?.contact?.phone || contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I have an inquiry about Rajaji National Park safari booking.")}`;
  
  // Dynamic FAQs from DB with fallback
  const faqsList = (content?.faqs?.items && content.faqs.items.length > 0)
    ? content.faqs.items
    : fallbackFaqs;

  const headerOverview = content?.faqs?.overview || "Find quick answers to common questions regarding Rajaji National Park Jeep Safaris, entry fees, vehicle permits, timings, and booking guidelines.";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Frequently Asked Questions (FAQ) | Rajaji National Park Safari"
        description="Get answers to common questions about Rajaji National Park Jeep Safari: costs, entry fees, booking procedures, timings, gate locations, and permit guidelines."
        keywords="rajaji safari faq, rajaji jeep safari cost, safari timings haridwar rishikesh, how to book rajaji safari online"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepSavannah} alt="FAQ header" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-400/30">
              <HelpCircle className="w-3.5 h-3.5" />
              Visitor Helpdesk
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {headerOverview}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-safari-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Help Card */}
        <div className="mt-12 bg-gradient-to-br from-safari-900 to-zinc-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Still have questions?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Speak Directly with our Safari Desk
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Our reservation officers are available daily to assist with zone recommendations, permit confirmations, Gypsy allocation, and seasonal gate updates.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Chat
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition"
              >
                <Phone className="w-4 h-4 text-safari-400" /> Call {phone}
              </a>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book Safari Online
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
