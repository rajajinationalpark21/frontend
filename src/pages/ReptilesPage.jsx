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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Reptiles of Rajaji Tiger Reserve | Snakes, Lizards & Pythons"
        description="Explore the rich reptile diversity of Rajaji Tiger Reserve in Uttarakhand. Learn about King Cobras, Indian Rock Pythons, Monitor Lizards, and safe forest guidelines."
        keywords="king cobra rajaji national park, indian python rajaji, monitor lizard uttarakhand, reptiles rajaji tiger reserve"
        ogImage={safariImages.safariJeepTrail}
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={safariImages.safariJeepTrail} alt="Rajaji wildlife trail" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Biodiversity of Rajaji
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Reptiles of Rajaji Tiger Reserve
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {overview || "Rajaji Tiger Reserve in Uttarakhand supports a rich diversity of reptiles across its Shivalik hill forests, perennial riverbeds, grasslands, and wetlands. While secretive and well-camouflaged, these cold-blooded apex species are critical indicators of healthy forest ecology."}
            </p>
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Key Reptile Species Checklist
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Commonly recorded snakes, lizards, and chelonians across the reserve's core and buffer habitats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reptilesData.map((rep, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-safari-500/40 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {rep.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-safari-500/10 text-safari-700 dark:text-safari-300 text-xs font-bold">
                    {rep.status || "Protected"}
                  </span>
                </div>

                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 italic">
                  {rep.scientific}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {rep.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Prime Habitat: </span>
                {rep.habitat}
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Guidelines Alert */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-base">
            <AlertCircle className="w-5 h-5 shrink-0" />
            Responsible Wildlife Observation Guidelines
          </div>
          <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
            Reptiles in Rajaji are protected under the Wildlife Protection Act, 1972. Never attempt to approach, handle, corner, or provoke any snake or lizard. Always remain inside your authorised Gypsy vehicle during jungle safaris and follow all instructions from your certified Forest Department nature guide.
          </p>
        </div>

        {/* Hub-and-Spoke Navigation Banner */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/wildlife"
            className="inline-flex items-center gap-2 text-sm font-bold text-safari-600 dark:text-safari-400 hover:underline"
          >
            ← Back to Wildlife & Biodiversity Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/wildlife/birds"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition"
            >
              Birds of Rajaji →
            </Link>
            <Link
              to="/wildlife/fauna"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition"
            >
              Mammals & Tigers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
