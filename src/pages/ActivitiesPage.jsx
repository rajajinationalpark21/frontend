import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Feather, Home, Waves, ArrowRight, Phone, MessageSquare, Ticket } from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';

const fallbackActivities = [
  {
    title: "Jungle Safari / Jeep Safari",
    tagline: "4x4 Gypsy Wildlife Expeditions",
    slug: "/zones",
    desc: "Experience thrilling guided open 4x4 Gypsy safaris through 7 distinct ranges including Chilla, Motichur, Ranipur, Jhilmil Jheel, and Mohand to observe tigers, wild elephants, and leopards in their natural habitat.",
    image: safariImages.safariJeepSavannah,
    cta: "Explore Safari Zones",
  },
  {
    title: "Bird Watching",
    tagline: "400+ Avian Species & Expert Guides",
    slug: "/birds-of-rajaji-national-park",
    desc: "Explore prime Important Bird Area (IBA) river corridors and Sal canopies with specialised nature guides. Spot Great Hornbills, Crested Kingfishers, Pallas's Fish Eagles, and seasonal migratory waterfowl.",
    image: safariImages.kingfisher,
    cta: "View Bird Watching Guide",
  },
  {
    title: "Stay in Rajaji",
    tagline: "Heritage Forest Rest Houses & Eco Cottages",
    slug: "/stay",
    desc: "Immerse yourself in nature by staying at historic British-era Forest Rest Houses (FRHs) or tranquil eco-resorts nestled amidst the pristine Shivalik foothills on the fringe of the reserve.",
    image: safariImages.forestCabins || safariImages.nightCamp,
    cta: "View Accommodation Options",
  },
  {
    title: "River Rafting",
    tagline: "White-Water Adventures on the Ganges",
    slug: "/rafting",
    desc: "Navigate Grade II, III, and IV rapids along the scenic Ganges river gorges adjoining the northern boundary of Rajaji Tiger Reserve, led by certified river guides and rescue kayakers.",
    image: safariImages.riverCruise,
    cta: "View Rafting Stretches",
  },
];

const activityIcons = {
  "/zones": Compass,
  "/birds-of-rajaji-national-park": Feather,
  "/stay": Home,
  "/rafting": Waves,
};

export default function ActivitiesPage({ onOpenBooking }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);

  const phone = content?.settings?.contact?.phone || contactInfo.phone || "+91 98298 50501";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I would like to enquire about activities at Rajaji National Park (Safari, Birdwatching, Stay, Rafting).")}`;

  const activitiesList = (content?.activities?.items && content.activities.items.length > 0)
    ? content.activities.items
    : fallbackActivities;

  const pageTitle = content?.activities?.title || "Activities at Rajaji National Park";
  const pageSubtitle = content?.activities?.subtitle || "From adrenaline-fueled 4x4 jeep safaris and white-water rafting to peaceful birdwatching trails and secluded forest stays in the foothills of Uttarakhand.";

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title="Activities at Rajaji National Park | Safari, Bird Watching, Stay & Rafting"
        description="Discover top activities at Rajaji National Park: 4x4 Jeep Safari, Bird Watching expeditions, Forest Rest House stays, and River Rafting on the Ganges."
        keywords="activities at rajaji, jungle safari rajaji, bird watching rishikesh, stay in rajaji, ganga river rafting"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header with Inverted Tiger & Leaf Watermark Overlay */}
      <section className="relative py-20 lg:py-28 bg-[#07150c] text-white overflow-hidden border-b border-emerald-950/60">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepSavannah} alt="Activities at Rajaji" className="w-full h-full object-cover opacity-25 scale-105" />
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
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Experiences & Adventures</span>
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              {pageTitle}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
              {pageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/25 transition hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" /> Book an Experience
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 backdrop-blur-sm transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {activitiesList.map((act, idx) => {
            const IconComponent = activityIcons[act.slug] || Compass;
            return (
              <div
                key={idx}
                className="group bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm hover:shadow-2xl transition duration-500 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={act.image || safariImages.safariJeepSavannah}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07150c]/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-emerald-300">
                      <IconComponent className="w-3.5 h-3.5" />
                      {act.tagline}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-emerald-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                      {act.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-emerald-100/75 leading-relaxed mt-2.5 font-light">
                      {act.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-900/10 dark:border-emerald-800/30 flex items-center justify-between">
                    <Link
                      to={act.slug}
                      className="inline-flex items-center gap-2 font-bold text-sm text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition group-hover:translate-x-1 duration-200"
                    >
                      <span>{act.cta || 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 text-xs font-bold transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
