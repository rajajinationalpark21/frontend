import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feather, ShieldCheck, Trees, Sparkles, ArrowRight } from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent } from '../api/client';
import SEO from '../components/SEO';
import CallToAction from '../components/CallToAction';
import PageHero from '../components/PageHero';
import DocContent, { DOC_WIDTH } from '../components/DocContent';
import RichText from '../components/RichText';

export default function WildlifeHubPage() {
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);


  const fauna = content?.fauna || {};
  const birds = content?.birds || {};
  const reptiles = content?.reptiles || {};
  const flora = content?.flora || {};
  const butterflies = content?.butterflies || {};

  // The client's Wildlife & Biodiversity document, when loaded, replaces the category grid.
  const docBlocks = fauna.hubDocBlocks?.length ? fauna.hubDocBlocks : null;
  const heroTitle = (docBlocks && fauna.hubDocTitle) || fauna.title || "Wildlife & Biodiversity of Rajaji Tiger Reserve";
  const heroSubtitle = fauna.subtitle || "Extending across 820 sq km of the Shivalik hills, alluvial floodplains, and Ganges riverbeds in Uttarakhand, Rajaji represents one of Northern India's most biodiverse wildlife landscapes.";
  // The hub has its own header photo; older content falls back to the Mammals one.
  const hubHeroBanner = fauna.hubHeroBanner && fauna.hubHeroBanner.trim();
  const heroBanner = hubHeroBanner || (fauna.heroBanner && fauna.heroBanner.trim()) || "/images/wildlife/mammals/tiger.png";

  const wildlifeCategories = [
    {
      title: "Mammals of Rajaji",
      slug: "/mammals-of-rajaji-tiger-reserve",
      icon: ShieldCheck,
      tagline: "Asian Elephants, Bengal Tigers & Leopards",
      description: fauna.overview || fauna.subtitle || "Rajaji supports over 500 wild Asian Elephants, thriving Bengal Tiger populations, leopards, sambars, barking deer, wild boar, and langurs across its sprawling Shivalik valleys.",
      image: (fauna.heroBanner && fauna.heroBanner.trim()) || "/images/wildlife/mammals/tiger.png",
      accent: "from-amber-500/20 to-orange-500/20 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Birds of Rajaji",
      slug: "/birds-of-rajaji-national-park",
      icon: Feather,
      tagline: "400+ Avian Residents & Migratory Waterfowl",
      description: birds.overview || birds.subtitle || "Recognized internationally as an Important Bird Area (IBA). Spot Great Hornbills, Crested Kingfishers, Pallas's Fish Eagles, and hundreds of Himalayan & wetland species.",
      image: (birds.heroBanner && birds.heroBanner.trim()) || "/images/wildlife/birds/great-hornbill.png",
      accent: "from-blue-500/20 to-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Reptiles of Rajaji",
      slug: "/reptiles-of-rajaji-tiger-reserve",
      icon: Sparkles,
      tagline: "King Cobras, Pythons & Monitor Lizards",
      description: reptiles.overview || reptiles.subtitle || "Diverse reptile species inhabiting riverbeds, rocky ravines, and moist deciduous woods, including the King Cobra, Indian Rock Python, and Bengal Monitor Lizard.",
      image: (reptiles.heroBanner && reptiles.heroBanner.trim()) || "/images/wildlife/reptiles/spectacled-cobra.jpg",
      accent: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Flora of Rajaji",
      slug: "/flora-of-rajaji-national-park",
      icon: Trees,
      tagline: "Ancient Sal Canopies & Forest Medicine",
      description: flora.overview || flora.subtitle || "Over 820 sq km of subtropical forest dominated by towering Sal (Shorea robusta), Rohini, Amaltas, Palash, and medicinal botanical flora that sustain the entire reserve.",
      image: (flora.heroBanner && flora.heroBanner.trim()) || "/images/wildlife/flora/sal-canopy.jpg",
      accent: "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400",
    },
    {
      title: "Butterflies of Rajaji",
      slug: "/butterflies-of-rajaji-national-park",
      icon: Sparkles,
      tagline: "Lepidoptera Diversity & Riverbed Mud-Puddling",
      description: butterflies.overview || butterflies.subtitle || "Vibrant butterflies including Common Mormons, Peacock Pansies, and Swallowtails congregating in spectacular mineral mud-puddling displays along the Song and Ganges rivers.",
      image: (butterflies.heroBanner && butterflies.heroBanner.trim()) || "/images/wildlife/butterflies/common-palmfly.png",
      accent: "from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors">
      <SEO
        ogImage={heroBanner}
      />

      <PageHero
        title={heroTitle}
        subtitle={docBlocks ? null : heroSubtitle}
        image={!hubHeroBanner && fauna.heroImages?.length ? fauna.heroImages : heroBanner}
        fallbackImage={safariImages.walkingTiger}
        alt={hubHeroBanner ? "Safari Gypsy watching a wild Asian elephant herd crossing riverine forest in Rajaji Tiger Reserve" : "Tiger in the Sal forests of Rajaji"}
      />

      {docBlocks ? (
        <section className={`relative z-10 py-16 ${DOC_WIDTH}`}>
          <DocContent
            blocks={docBlocks}
            onBooking={() => navigate('/booking')}
            message="Hello! I would like to book a Rajaji Jeep Safari."
            linkImages={Object.fromEntries(wildlifeCategories.map((cat) => [cat.slug, cat.image]))}
          />
        </section>
      ) : (
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
            ECOSYSTEM CATALOGUE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
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
                className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/30 hover:shadow-2xl transition duration-500 flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040b06]/95 via-[#07150c]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                      {cat.tagline}
                    </span>
                  </div>
                </div>

                <div className="p-7 space-y-3 flex-grow">
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    <RichText text={cat.description} />
                  </p>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    to={cat.slug}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600"
                  >
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* Unified Call To Action matching HomePage */}
      <CallToAction
        title="Witness the Wild in Its Natural Habitat"
        subtitle="Embark on an open-top gypsy safari driven by experienced forest drivers and registered guides across the prime habitats of Rajaji Tiger Reserve."
        primaryText="Book Safari Permit"
        primaryLink="/booking"
        secondaryText="View Wildlife Zones"
        secondaryLink="/zones"
        secondaryIcon={ArrowRight}
        bgImage={safariImages.walkingTiger || safariImages.homeHero}
      />
    </div>
  );
}
