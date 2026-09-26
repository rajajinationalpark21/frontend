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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Activities at Rajaji National Park | Safari, Bird Watching, Stay & Rafting"
        description="Discover top activities at Rajaji National Park: 4x4 Jeep Safari, Bird Watching expeditions, Forest Rest House stays, and River Rafting on the Ganges."
        keywords="activities at rajaji, jungle safari rajaji, bird watching rishikesh, stay in rajaji, ganga river rafting"
        ogImage={safariImages.safariJeepSavannah}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepSavannah} alt="Activities at Rajaji" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-500/20 text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-400/30">
              <Compass className="w-3.5 h-3.5" />
              Experiences & Adventures
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {pageSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-sm shadow-xl transition hover:scale-105 active:scale-95"
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
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition"
              >
                <Phone className="w-4 h-4 text-safari-400" /> {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {activitiesList.map((act, idx) => {
            const IconComponent = activityIcons[act.slug] || Compass;
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl transition duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={act.image || safariImages.safariJeepSavannah}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                      <IconComponent className="w-3.5 h-3.5" />
                      {act.tagline}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">
                      {act.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2.5">
                      {act.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <Link
                      to={act.slug}
                      className="inline-flex items-center gap-2 font-bold text-sm text-safari-600 dark:text-safari-400 hover:text-safari-700 transition group-hover:translate-x-1 duration-200"
                    >
                      <span>{act.cta || 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-safari-500 hover:text-white text-gray-700 dark:text-gray-200 text-xs font-bold transition"
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
