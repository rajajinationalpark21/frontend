import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, Waves, ArrowRight } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import PageLoader from '../components/PageLoader';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';

const fallbackActivities = [
  {
    title: "Jungle Safari / Jeep Safari",
    tagline: "4x4 Gypsy Wildlife Expeditions",
    slug: "/zones",
    desc: "Explore Rajaji Tiger Reserve on a guided Jeep Safari across six safari zones: Chilla, Motichur, Ranipur, Mohand–Chillawali, Jhilmil Jheel and Gohri. Depending on the season and natural conditions, visitors may encounter Asian Elephants, deer, Wild Boar, birds and other wildlife.",
    image: safariImages.safariJeepSavannah,
    cta: "Explore Safari Zones",
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
  "/stay": Home,
  "/rafting": Waves,
};

export default function ActivitiesPage({ onOpenBooking }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader />;
  }


  const activitiesList = (content?.activities?.items && content.activities.items.length > 0)
    ? content.activities.items
    : fallbackActivities;

  const pageTitle = content?.activities?.title || "Activities at Rajaji National Park";
  const pageSubtitle = content?.activities?.subtitle || "From adrenaline-fueled 4x4 jeep safaris and white-water rafting to secluded forest stays in the foothills of Uttarakhand.";
  const heroBanner = content?.activities?.heroBanner || safariImages.safariJeepSavannah;

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={pageTitle}
        subtitle={pageSubtitle}
        image={content?.activities?.heroImages?.length ? content.activities.heroImages : heroBanner}
        alt="Activities in Rajaji National Park"
      />

      {/* Activities Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 ${activitiesList.length === 3 ? 'lg:grid-cols-3' : ''}`}>
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

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title="Ready to Plan Your Jungle Expedition?"
        subtitle="From sunrise birding excursions to high-adrenaline river rafting and core zone jeep safaris, book your slots with registered government naturalists."
        primaryText="Book Safari Activity"
        onPrimaryClick={() => onOpenBooking ? onOpenBooking() : navigate('/booking')}
        secondaryText="View Safari Zones"
        secondaryLink="/zones"
        secondaryIcon={ArrowRight}
        bgImage={safariImages.chilaZone || safariImages.homeHero}
      />
    </div>
  );
}
