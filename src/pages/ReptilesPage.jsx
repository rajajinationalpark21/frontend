import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, AlertCircle, ArrowRight, Compass, Phone } from 'lucide-react';
import { fetchContent } from '../api/client';
import { safariImages, contactInfo } from '../data/safariData';
import SEO from '../components/SEO';

const defaultReptiles = [
  {
    name: "King Cobra",
    scientific: "Ophiophagus hannah",
    status: "Vulnerable (Schedule II)",
    habitat: "Dense moist Sal forests, bamboo thickets & deep ravines",
    description: "The world's longest venomous snake, reaching lengths of up to 5 metres. The King Cobra plays an apex predatory role by feeding almost exclusively on other snakes.",
  },
  {
    name: "Indian Rock Python",
    scientific: "Python molurus",
    status: "Near Threatened (Schedule I)",
    habitat: "Rocky outcrops, marshes, riverbanks & hollow logs",
    description: "A magnificent non-venomous constrictor capable of growing over 4 metres. Often observed basking on warm riverbed rocks in early winter mornings.",
  },
  {
    name: "Indian Cobra (Spectacled Cobra)",
    scientific: "Naja naja",
    status: "Protected (Schedule I)",
    habitat: "Grassland clearings, termite mounds & scrub forest",
    description: "One of India's most iconic snakes, known for expanding its majestic hood marked with distinctive spectacled patterns.",
  },
  {
    name: "Common Krait",
    scientific: "Bungarus caeruleus",
    status: "Common",
    habitat: "Fallen leaves, soil fissures & agricultural edges",
    description: "Nocturnal venomous snake with glossy blue-black scales separated by narrow white crossbars.",
  },
  {
    name: "Bengal Monitor Lizard",
    scientific: "Varanus bengalensis",
    status: "Protected (Schedule I)",
    habitat: "Forest trails, trees, ravines & riverbed washes",
    description: "A large terrestrial reptile frequently seen actively hunting insects, small rodents, and birds along sunny forest tracks.",
  },
  {
    name: "Yellow Monitor Lizard",
    scientific: "Varanus flavescens",
    status: "Endangered (Schedule I)",
    habitat: "Wetland fringes and marshy edges of Jhilmil Jheel",
    description: "A rare and endangered monitor lizard adapted to wetland ecosystems, sporting distinctive yellowish-olive bands.",
  },
  {
    name: "Indian Star Tortoise & Freshwater Turtles",
    scientific: "Geochelone elegans / Pangshura sp.",
    status: "Vulnerable",
    habitat: "Tranquil perennial pools and sandy riverbeds",
    description: "Aquatic and semi-aquatic chelonians thriving in the clean waters of the Song and Ganges rivers.",
  },
  {
    name: "Oriental Garden Lizard (Calotes)",
    scientific: "Calotes versicolor",
    status: "Common",
    habitat: "Understory trees, shrubs & forest glades",
    description: "Agile tree lizard whose males develop fiery crimson throats and heads during the summer breeding season.",
  },
];

export default function ReptilesPage({ onOpenBooking }) {
  const [reptilesData, setReptilesData] = useState(defaultReptiles);
  const [overview, setOverview] = useState("");

  useEffect(() => {
    fetchContent()
      .then(res => {
        if (res.data?.reptiles?.species && res.data.reptiles.species.length > 0) {
          setReptilesData(res.data.reptiles.species);
        }
        if (res.data?.reptiles?.overview) {
          setOverview(res.data.reptiles.overview);
        }
      })
      .catch(() => {});
  }, []);

  const phone = contactInfo.phone || "+91 98298 50501";

  return (
    <div className="relative min-h-screen bg-[#f7f5ed] dark:bg-[#07120a] transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        title="Reptiles of Rajaji Tiger Reserve | Snakes, Lizards & Pythons"
        description="Explore the rich reptile diversity of Rajaji Tiger Reserve in Uttarakhand. Learn about King Cobras, Indian Rock Pythons, Monitor Lizards, and safe forest guidelines."
        keywords="king cobra rajaji national park, indian python rajaji, monitor lizard uttarakhand, reptiles rajaji tiger reserve"
        ogImage={safariImages.safariJeepTrail}
      />

      {/* Hero Header - Deep Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative py-24 lg:py-28 bg-[#07150c] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepTrail} alt="Rajaji wildlife trail" className="w-full h-full object-cover opacity-35 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/95 via-[#07150c]/85 to-[#07150c]" />
        </div>

        {/* Botanical leaf vein texture */}
        <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

        {/* Tiger watermark stencil */}
        <div 
          className="absolute right-0 bottom-0 top-0 w-2/3 max-w-2xl bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Corner foliage flourish */}
        <div 
          className="absolute -top-10 -left-10 w-60 h-60 bg-contain bg-no-repeat pointer-events-none opacity-20 filter invert"
          style={{
            backgroundImage: `url("/images/leaf for cta.jpg")`,
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Biodiversity of Rajaji
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Reptiles of Rajaji Tiger Reserve
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">
              {overview || "Rajaji Tiger Reserve in Uttarakhand supports a rich diversity of reptiles across its Shivalik hill forests, perennial riverbeds, grasslands, and wetlands. While secretive and well-camouflaged, these cold-blooded apex species are critical indicators of healthy forest ecology."}
            </p>
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
            HERPETOFAUNA CATALOGUE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Key Reptile Species Checklist
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Commonly recorded snakes, lizards, and chelonians across the reserve's core and buffer habitats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {reptilesData.map((rep, idx) => (
            <div 
              key={idx}
              className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 sm:p-8 border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/40 hover:shadow-2xl transition duration-500 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                    {rep.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    {rep.status || "Protected"}
                  </span>
                </div>

                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 italic">
                  {rep.scientific}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {rep.description}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-900/10 dark:border-emerald-800/40 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Prime Habitat: </span>
                {rep.habitat}
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Guidelines Alert */}
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-3xl p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            Responsible Wildlife Observation Guidelines
          </div>
          <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
            Reptiles in Rajaji are protected under the Wildlife Protection Act, 1972. Never attempt to approach, handle, corner, or provoke any snake or lizard. Always remain inside your authorised Gypsy vehicle during jungle safaris and follow all instructions from your certified Forest Department nature guide.
          </p>
        </div>

        {/* Hub-and-Spoke Navigation Banner */}
        <div className="pt-8 border-t border-emerald-900/10 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/wildlife"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            ← Back to Wildlife & Biodiversity Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/wildlife/birds"
              className="text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 text-gray-700 dark:text-gray-200 border border-emerald-900/15 dark:border-emerald-700/40 hover:border-emerald-500 transition"
            >
              Birds of Rajaji →
            </Link>
            <Link
              to="/wildlife/fauna"
              className="text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 text-gray-700 dark:text-gray-200 border border-emerald-900/15 dark:border-emerald-700/40 hover:border-emerald-500 transition"
            >
              Mammals & Tigers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
