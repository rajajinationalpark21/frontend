import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feather, ShieldCheck, Trees, Sparkles, ArrowRight, Phone, MessageSquare, Ticket } from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import SEO from '../components/SEO';

const wildlifeCategories = [
  {
    title: "Mammals of Rajaji",
    slug: "/wildlife/fauna",
    icon: ShieldCheck,
    tagline: "Asian Elephants, Bengal Tigers & Leopards",
    description: "Rajaji supports over 500 wild Asian Elephants, thriving Bengal Tiger populations, leopards, sambars, barking deer, wild boar, and langurs across its sprawling Shivalik valleys.",
    image: safariImages.tigerStalking,
    accent: "from-amber-500/20 to-orange-500/20 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Birds of Rajaji",
    slug: "/wildlife/birds",
    icon: Feather,
    tagline: "400+ Avian Residents & Migratory Waterfowl",
    description: "Recognized internationally as an Important Bird Area (IBA). Spot Great Hornbills, Crested Kingfishers, Pallas's Fish Eagles, and hundreds of Himalayan & wetland species.",
    image: safariImages.kingfisher,
    accent: "from-blue-500/20 to-cyan-500/20 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Reptiles of Rajaji",
    slug: "/wildlife/reptiles",
    icon: Sparkles,
    tagline: "King Cobras, Pythons & Monitor Lizards",
    description: "Diverse reptile species inhabiting riverbeds, rocky ravines, and moist deciduous woods, including the King Cobra, Indian Rock Python, and Bengal Monitor Lizard.",
    image: safariImages.safariJeepTrail,
    accent: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Flora of Rajaji",
    slug: "/wildlife/flora",
    icon: Trees,
    tagline: "Ancient Sal Canopies & Forest Medicine",
    description: "Over 820 sq km of subtropical forest dominated by towering Sal (Shorea robusta), Rohini, Amaltas, Palash, and medicinal botanical flora that sustain the entire reserve.",
    image: safariImages.tropicalLeafDew,
    accent: "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400",
  },
  {
    title: "Butterflies of Rajaji",
    slug: "/wildlife/butterflies",
    icon: Sparkles,
    tagline: "Lepidoptera Diversity & Riverbed Mud-Puddling",
    description: "Vibrant butterflies including Common Mormons, Peacock Pansies, and Swallowtails congregating in spectacular mineral mud-puddling displays along the Song and Ganges rivers.",
    image: safariImages.butterfly,
    accent: "from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400",
  },
];

export default function WildlifeHubPage({ onOpenBooking }) {
  const navigate = useNavigate();
  const phone = contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I would like to inquire about wildlife safaris and biodiversity tours in Rajaji National Park.")}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Wildlife & Biodiversity of Rajaji Tiger Reserve | Elephants, Tigers, Birds"
        description="Explore the rich wildlife and biodiversity of Rajaji Tiger Reserve in Uttarakhand. Discover Asian Elephants, Bengal Tigers, 400+ bird species, and diverse flora."
        keywords="rajaji tiger reserve wildlife, biodiversity rajaji national park, asian elephants uttarakhand, bengal tiger rajaji"
        ogImage={safariImages.tigerStalking}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.tigerStalking} alt="Wildlife in Rajaji" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sanctuary Biodiversity
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Wildlife & Biodiversity of Rajaji Tiger Reserve
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Extending across 820 sq km of the Shivalik hills, alluvial floodplains, and Ganges riverbeds in Uttarakhand, Rajaji represents one of Northern India's most biodiverse wildlife landscapes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-xl transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book Wildlife Safari
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Booking
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition"
              >
                <Phone className="w-4 h-4 text-safari-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hub Navigation Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Explore Rajaji by Biological Realm
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dive into detailed species checklists, behavioral guides, and prime viewing habitats across each major group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wildlifeCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-safari-300 uppercase tracking-wider">
                      {cat.tagline}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={cat.slug}
                    className="inline-flex items-center gap-2 text-sm font-bold text-safari-600 dark:text-safari-400 group-hover:underline"
                  >
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
