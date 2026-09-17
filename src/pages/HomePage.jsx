import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Compass, 
  Shield, 
  ArrowRight, 
  ArrowUpRight, 
  Calendar,
  Ticket,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { safariImages } from '../data/safariData';
import { fetchContent, fetchBlogs, fetchGallery } from '../api/client';
import { slugify } from '../utils/slugify';
import SEO from '../components/SEO';
import FeedbackSection from '../components/FeedbackSection';

const fallbackContent = {
  tagline: "Unleash Your Wild Side",
  heroTitle: "Unleash Your Wild Side",
  heroSubtitle: "Experience the heart of the jungle. Witness nature in its purest form.",
  heroBanner: safariImages.homeHero,
  timings: "06:00 AM - 06:00 PM",
  zones: "Buffer, Core & River Safari",
  rules: "Do's & Don'ts Guide",
  aboutTitle: "The Sanctuary Legacy",
  aboutDescription: "Dedicated to conservation and protecting our wildlife for generations to come. Discover the story behind the sanctuary, our efforts in anti-poaching, and how we maintain the delicate balance of the ecosystem.",
  stats: { tigers: "50+", acres: "120k" },
  featuredBlogs: [],
  featuredGallery: [],
};

const fallbackGallery = [
  safariImages.elephantsRiver,
  safariImages.safariJeepSavannah,
  safariImages.leopardLounge,
  safariImages.kingfisher,
  safariImages.deerGrazing,
];

export default function HomePage({ onOpenBooking }) {
  const [content, setContent] = useState(fallbackContent);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);

  useEffect(() => {
    fetchContent()
      .then((data) => {
        const home = data?.data?.home || data?.home;
        if (home && home.heroTitle) {
          setContent((prev) => ({
            ...prev,
            ...home,
            heroBanner: home.heroBanner || prev.heroBanner,
            stats: { ...prev.stats, ...(home.stats || {}) },
          }));
        }
      })
      .catch(() => {});

    fetchBlogs()
      .then((data) => {
        const blogs = data?.data?.blogs || data?.blogs;
        if (Array.isArray(blogs) && blogs.length > 0) {
          setRecentBlogs(blogs);
        }
      })
      .catch(() => {});

    fetchGallery()
      .then((data) => {
        const images = data?.data?.images || data?.images;
        if (Array.isArray(images) && images.length > 0) {
          setGalleryImages(images);
        }
      })
      .catch(() => {});
  }, []);

  // Resolve featured blogs from IDs
  const displayBlogs = React.useMemo(() => {
    const featuredIds = content.featuredBlogs || [];
    if (featuredIds.length > 0 && recentBlogs.length > 0) {
      const featured = featuredIds
        .map((id) => recentBlogs.find((b) => (b._id || b.id) === id))
        .filter(Boolean)
        .slice(0, 3);
      if (featured.length > 0) return featured;
    }
    return recentBlogs.slice(0, 3);
  }, [content.featuredBlogs, recentBlogs]);

  // Resolve featured gallery from IDs
  const displayGallery = React.useMemo(() => {
    const featuredIds = content.featuredGallery || [];
    if (featuredIds.length > 0 && galleryImages.length > 0) {
      const featured = featuredIds
        .map((id) => galleryImages.find((img) => (img._id || img.id) === id))
        .filter((img) => img && (img.url || img.src))
        .slice(0, 5);
      if (featured.length > 0) return featured.map((img) => img.url || img.src);
    }
    // If galleryImages are objects with .url/.src, map them; otherwise use as-is (fallback URLs)
    if (galleryImages.length > 0 && typeof galleryImages[0] === 'object') {
      return galleryImages.slice(0, 5).map((img) => img.url || img.src).filter(Boolean);
    }
    return fallbackGallery;
  }, [content.featuredGallery, galleryImages]);
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Rajaji National Park Tiger Reserve",
    "description": "Experience raw nature at Rajaji National Park. Witness Royal Bengal Tigers, Asian Elephants, and leopards in their natural habitat through guided 4x4 expeditions.",
    "url": "https://rajajinationalpark.org/",
    "image": safariImages.homeHero,
    "touristType": ["Eco-tourists", "Wildlife Photographers", "Families"],
    "availableLanguage": ["English", "Hindi"]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <SEO
        title="Rajaji National Park | Official Wildlife Reserve & Tiger Expeditions"
        description="Experience the heart of Rajaji National Park. Book guided open 4x4 jeep safaris, witness Royal Bengal Tigers and wild Asian Elephants in protected Himalayan foothills."
        keywords="rajaji national park, tiger safari booking, chilla safari, motichur zone, haridwar rishikesh safari, jeep safari permits, uttarakhand wildlife"
        ogImage={safariImages.walkingTiger}
        schemaJson={homeSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center text-center">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url("${content.heroBanner || safariImages.homeHero}")` }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-5 border border-white/20 shadow-md">
            <Shield className="w-3.5 h-3.5 text-safari-400" />
            Official Tiger Reserve & National Park
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 drop-shadow-sm">
            {content.heroTitle || "Experience the Heart of the Jungle"}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto font-normal mb-7">
            {content.heroSubtitle || "Track royal Bengal tigers across open meadows, listen to the forest wake at dawn, and discover a national park where every trail tells a story."}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 transition duration-200"
            >
              Explore Safari
            </button>
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-full border-2 border-white/80 hover:border-white text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Floating Info Cards */}
      <div className="relative z-20 -mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Timings */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Timings</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.timings || "06:00 AM - 06:00 PM"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Open all days except Tuesday</p>
            </div>
          </div>

          {/* Card 2: Zones */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Zones</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.zones || "Chilla, Motichur & Ranipur"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Explore 5 distinct wildlife ranges</p>
            </div>
          </div>

          {/* Card 3: Rules */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-full bg-safari-100 dark:bg-safari-900/40 flex items-center justify-center shrink-0 text-safari-600 dark:text-safari-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">Rules</h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.rules || "Do's & Don'ts Guide"}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">Strict conservation policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE SANCTUARY LEGACY SECTION */}
      <section className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Walking Tiger Image with EST badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3] bg-gray-100">
              <img
                src={safariImages.walkingTiger}
                alt="Bengal Tiger walking in grassland"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />
              {/* EST. 1983 Badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold text-gray-900 tracking-wider">
                EST. 1983
              </div>
            </div>
          </div>

          {/* Right: Sanctuary Legacy Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">
              CONSERVATION FIRST
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {content.aboutTitle || "The Sanctuary Legacy"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {content.aboutDescription || "Dedicated to conservation and protecting our wildlife for generations to come. Discover the story behind the sanctuary, our efforts in anti-poaching, and how we maintain the delicate balance of the ecosystem."}
            </p>

            {/* Statistics */}
            <div className="flex items-center gap-10 pt-2 border-l-2 border-safari-500 pl-5">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {content.stats?.tigers || "50+"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  Tigers Protected
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {content.stats?.sqKm || "820+"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  Sq Km of Forest
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group text-sm sm:text-base"
              >
                Read Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPTURED MOMENTS GALLERY MOSAIC */}
      <section className="py-16 bg-gray-50/60 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Captured Moments
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                Glimpses of the wild, caught in the perfect light.
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group"
            >
              View Full Gallery
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Left Column: Two landscape stacked cards */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={displayGallery[0] || fallbackGallery[0]}
                  alt="Gallery image 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/9] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={displayGallery[1] || fallbackGallery[1]}
                  alt="Gallery image 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Middle Column: Tall portrait */}
            <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition group bg-gray-200 dark:bg-gray-800 min-h-[380px] h-full">
              <img
                src={displayGallery[2] || fallbackGallery[2]}
                alt="Gallery image 3"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* Right Column: Two stacked cards */}
            <div className="space-y-5 flex flex-col justify-between">
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={displayGallery[3] || fallbackGallery[3]}
                  alt="Gallery image 4"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition aspect-[16/10] group bg-gray-200 dark:bg-gray-800">
                <img
                  src={displayGallery[4] || fallbackGallery[4]}
                  alt="Gallery image 5"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TALES FROM THE JUNGLE SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-safari-600 dark:text-safari-400 uppercase">
            WILD JOURNAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
            Tales from Rajaji Reserve
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.length > 0 ? displayBlogs.map((blog) => {
            const blogId = blog._id || blog.id;
            const title = blog.title || 'Untitled';
            const slug = blog.slug || slugify(title) || blogId;
            const date = blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '';
            const image = blog.image || safariImages.tigerEye;
            const excerpt = blog.summary || blog.excerpt || '';
            const category = blog.category || 'Uncategorized';
            return (
              <Link
                key={blogId}
                to={`/blog/${slug}`}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-safari-950/20 dark:hover:shadow-safari-950/40 hover:border-safari-500/40 dark:hover:border-safari-500/40 transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col cursor-pointer block transform-gpu will-change-transform"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase shadow-sm group-hover:bg-safari-500 group-hover:text-white transition-all duration-300">
                    {category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {date && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-400 group-hover:text-safari-600 dark:group-hover:text-safari-400 mb-2 transition-colors duration-200">
                        <Calendar className="w-3.5 h-3.5" /> {date}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition-colors duration-200 leading-snug">
                      {title}
                    </h3>
                    {excerpt && (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                        {excerpt}
                      </p>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition-colors pt-2">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-safari-500 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
                  </div>
                </div>
              </Link>
            );
          }) : (
            /* Fallback when no blogs exist */
            <>
              <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={safariImages.tigerEye} alt="Wildlife" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase shadow-sm">SIGHTING REPORT</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">Latest Park Updates</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">Stay tuned for the latest wildlife sightings and park news from Rajaji.</p>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={safariImages.mistyHills} alt="Forest" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase shadow-sm">TRAVEL GUIDE</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">Explore Rajaji Trails</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">Discover the best trails and wildlife corridors in the park.</p>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={safariImages.rangerSolo} alt="Conservation" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase shadow-sm">CONSERVATION</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">Protecting Wildlife</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">Learn about our conservation efforts and how you can help.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 5. VISITOR REVIEWS & FEEDBACK SECTION */}
      <FeedbackSection />

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-black/40 transition-colors">
        <div className="max-w-6xl mx-auto rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#05160d] via-[#072012] to-[#020b06] text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-safari-500/20">
          
          {/* Subtle Background Forest Imagery & Ambient Glow */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
            style={{ backgroundImage: `url("${safariImages.mistyDarkPines || safariImages.homeHero}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-safari-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-safari-400/10 blur-3xl pointer-events-none" />

          {/* Inner Content */}
          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safari-500/20 border border-safari-400/30 text-safari-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-safari-400" />
              <span>Official E-Permit & Safari Portal</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Answer the Call of the Wild?
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Daily gypsy permits and visitor quotas are strictly capped to ensure minimal disturbance to wildlife. Plan your adventure early to secure your spot in the heart of nature.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-400 text-white font-bold text-sm shadow-xl shadow-safari-500/25 hover:shadow-safari-400/40 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <Ticket className="w-4 h-4" />
                <span>Book Permit Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm active:scale-95 transition duration-200"
              >
                <Phone className="w-4 h-4 text-safari-400" />
                <span>Contact Ranger Office</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 mt-6 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-safari-400 shrink-0" />
                <span>Official Forest E-Permits</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-300 font-medium">
                <Compass className="w-4 h-4 text-safari-400 shrink-0" />
                <span>4x4 Gypsy & Registered Guides</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-gray-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-safari-400 shrink-0" />
                <span>Instant Quota Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
