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
import { fetchContent, fetchBlogs } from '../api/client';
import { slugify } from '../utils/slugify';
import SEO from '../components/SEO';
import FeedbackSection from '../components/FeedbackSection';
import CallToAction from '../components/CallToAction';
import PageLoader from '../components/PageLoader';
import HeroImageRotator from '../components/HeroImageRotator';
import RichText from '../components/RichText';
import { sizedImage } from '../utils/heroImage';
import { galleryAlt } from '../utils/galleryAlt';
import useNearViewport from '../utils/useNearViewport';

const fallbackGallery = [
  safariImages.walkingTiger,
  safariImages.elephantsRiver,
  safariImages.leopardBranch,
  safariImages.deerGrazing,
  safariImages.kingfisher
];

const defaultHomeContent = {
  heroTitle: "Unleash Your Wild Side",
  heroSubtitle: "Experience the heart of the jungle. Witness nature in its purest form.",
  heroBanner: safariImages.homeHero,
  timings: "Morning & Evening Safaris",
  zones: "Chilla, Motichur, Ranipur & more",
  rules: "Do's & Don'ts Guide",
  aboutTitle: "About the National Park",
  aboutDescription: "Spread across sal forest, grassland and winding rivers, the park protects one of the region's richest concentrations of wildlife.",
  aboutIntro: "Rajaji National Park is a significant wildlife conservation landscape in the Shiwalik foothills of Uttarakhand.",
  aboutDetails: [],
  aboutStats: [],
  aboutBadge: "EST. 1983",
  aboutImage: safariImages.walkingTiger,
  stats: {
    tigers: "50+",
    acres: "450k",
    sqKm: "820",
    forestArea: "Core & Buffer"
  }
};

export default function HomePage({ onOpenBooking }) {
  const [content, setContent] = useState(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);
  // The rest of the "Page – Home About Rajaji" document and the shared booking wording.
  const [ctaCopy, setCtaCopy] = useState({});
  // The photo frame downloads its photos only as the visitor scrolls toward it.
  const [galleryRef, galleryNear] = useNearViewport('600px');
  const [blogsRef, blogsNear] = useNearViewport('600px');

  useEffect(() => {
    // Each handler also runs again if the live CMS response replaces the copy
    // embedded at build time.
    const showContent = (res) => {
      const home = res?.data?.home || res?.home;
      if (home) {
        setContent(home);
      }
      setCtaCopy(res?.data?.settings?.ctaCopy || {});
    };
    const showBlogs = (res) => {
      const blogs = res?.data?.blogs || res?.blogs;
      if (Array.isArray(blogs) && blogs.length > 0) {
        setRecentBlogs(blogs);
      }
    };

    Promise.allSettled([fetchContent().then(showContent), fetchBlogs().then(showBlogs)])
      .then((results) => {
        results
          .filter((result) => result.status === 'rejected')
          .forEach((result) => console.error('Error fetching homepage data:', result.reason));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Resolve featured blogs from IDs
  const displayBlogs = React.useMemo(() => {
    if (!content) return [];
    const featuredIds = content.featuredBlogs || [];
    if (featuredIds.length > 0 && recentBlogs.length > 0) {
      const featured = featuredIds
        .map((id) => recentBlogs.find((b) => (b._id || b.id) === id))
        .filter(Boolean)
        .slice(0, 3);
      if (featured.length > 0) return featured;
    }
    return recentBlogs.slice(0, 3);
  }, [content, recentBlogs]);

  // Photos uploaded in the admin Home editor, any number of them. Stock photos only when none exist.
  const uploadedGallery = (content?.galleryImages || []).filter(Boolean);
  const displayGallery = uploadedGallery.length > 0 ? uploadedGallery : fallbackGallery;
  const galleryColumns =
    displayGallery.length === 1
      ? 'max-w-3xl mx-auto'
      : displayGallery.length === 2
        ? 'columns-1 sm:columns-2'
        : displayGallery.length <= 6
          ? 'columns-1 sm:columns-2 lg:columns-3'
          : 'columns-2 md:columns-3 lg:columns-4';
  const aboutIntro = content.aboutIntro || content.aboutDescription || defaultHomeContent.aboutIntro;
  const legacyStats = [
    { value: content.stats?.tigers || "50+", label: "Tigers Protected" },
    { value: content.stats?.sqKm || content.stats?.forestArea || content.stats?.acres || "820+", label: "Sq Km of Forest" },
  ];
  const aboutStats = Array.isArray(content.aboutStats) && content.aboutStats.length ? content.aboutStats : legacyStats;

  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors relative overflow-hidden">
      <SEO
        ogImage={safariImages.walkingTiger}
      />

      {/* Subtle Ambient Botanical Leaf Texture Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none pattern-leaf-delicate"
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center text-center">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <HeroImageRotator
            image={content.heroImages?.length ? content.heroImages : content.heroBanner}
            fallbackImage={safariImages.homeHero}
            alt="Rajaji National Park"
            imagePosition="center"
          />
          {/* Deep rich forest vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-20 sm:pb-28">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-4 drop-shadow-md font-serif">
            {content.heroTitle || "Unleash Your Wild Side"}
          </h1>
          <p className="text-sm sm:text-base text-gray-200/95 max-w-xl mx-auto font-normal mb-8 leading-relaxed">
            {content.heroSubtitle || "Experience the heart of the jungle. Witness nature in its purest form."}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onOpenBooking}
              className="attention-pulse px-7 py-3.5 rounded-full bg-safari-700 hover:bg-safari-600 text-white font-bold text-sm active:scale-95 transition-colors duration-200 cursor-pointer"
            >
              Book Safari Permit
            </button>
            <Link
              to="/zones"
              className="px-7 py-3.5 rounded-full border-2 border-white/80 hover:border-white text-white font-bold text-sm hover:bg-white/10 active:scale-95 transition-all duration-200 backdrop-blur-sm"
            >
              Explore Safari Zones
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Floating Info Pill Capsules (Matching Reference Design) */}
      <div className="relative z-20 -mt-8 sm:-mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Timings */}
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md rounded-2xl sm:rounded-full px-6 py-4 shadow-xl border border-emerald-900/15 dark:border-emerald-500/25 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">Timings</h2>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.timings || "Morning & Evening Safaris"}</p>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">{content.timingsNote || "Timings change with the season"}</p>
            </div>
          </div>

          {/* Card 2: Zones */}
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md rounded-2xl sm:rounded-full px-6 py-4 shadow-xl border border-emerald-900/15 dark:border-emerald-500/25 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">Zones</h2>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.zones || "Chilla, Motichur, Ranipur & more"}</p>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">{content.zonesNote || "6 safari zones plus Beatles Ashram"}</p>
            </div>
          </div>

          {/* Card 3: Rules */}
          <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-md rounded-2xl sm:rounded-full px-6 py-4 shadow-xl border border-emerald-900/15 dark:border-emerald-500/25 flex items-center gap-4 text-left transition hover:-translate-y-1 duration-200">
            <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">Rules</h2>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{content.rules || "Do's & Don'ts Guide"}</p>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">{content.rulesNote || "Strict conservation policies"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE SANCTUARY LEGACY (ABOUT RAJAJI) SECTION */}
      <section id="about-rajaji" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Walking Tiger Image with EST badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl group aspect-[4/3] bg-gray-100 border border-gray-200/60 dark:border-gray-800">
              <img
                src={sizedImage(content.aboutImage, 1000) || safariImages.walkingTiger}
                alt="Wildlife of Rajaji National Park"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />
              {/* EST. 1983 Badge */}
              <div className="absolute bottom-5 left-5 bg-[#fdfcf8]/95 dark:bg-[#0c1610]/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-gray-900 dark:text-white tracking-wider border border-emerald-900/15 dark:border-emerald-800/40">
                {content.aboutBadge || "EST. 1983"}
              </div>
            </div>
          </div>

          {/* Right: Sanctuary Legacy Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
              {content.aboutTitle || "The Sanctuary Legacy"}
            </h2>
            <div id="about-rajaji-text" className="prose-balanced space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base sm:leading-8">
              <p><RichText text={aboutIntro} /></p>
            </div>
            {/* The rest of the story is on the About page. */}
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300">
              {content.aboutReadMoreLabel || "Read the full story"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-l-2 border-safari-500 pl-6 sm:grid-cols-3">
              {aboutStats.map((stat, index) => (
                <div key={`${stat.value}-${index}`}>
                  <div className="font-sans text-2xl font-extrabold tracking-tight tabular-nums text-emerald-800 dark:text-emerald-300 sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold leading-4 text-gray-700 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPTURED MOMENTS GALLERY MOSAIC */}
      <section className="py-20 border-y border-emerald-950/10 dark:border-emerald-900/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
                {content.galleryTitle || "Captured Moments"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1.5">
                {content.gallerySubtitle || "Glimpses of the wild, caught in the perfect light."}
              </p>
            </div>
            <Link
              to="/wildlife-biodiversity-rajaji-tiger-reserve"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white hover:text-safari-600 dark:hover:text-safari-400 transition group"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Masonry frame: columns and photo sizes follow the number of photos */}
          <div ref={galleryRef} className={`${galleryColumns} gap-5`}>
            {galleryNear && displayGallery.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="mb-5 break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group bg-gray-200 dark:bg-gray-800 border border-gray-100 dark:border-gray-800"
              >
                <img
                  src={sizedImage(src, 800)}
                  alt={galleryAlt(uploadedGallery.length ? content.galleryAlts : [], index, `Wildlife and jeep safari moment in Rajaji National Park, photo ${index + 1}`)}
                  loading="lazy"
                  className="w-full h-auto block group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TALES FROM THE JUNGLE: real blog posts only; the section stays hidden until they load */}
      {displayBlogs.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight font-serif">
              {content.blogTitle || 'Tales from the Jungle'}
            </h2>
          </div>

          {/* 3 Editorial Blog Cards Matching Reference */}
          <div ref={blogsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogs.map((blog) => {
              const blogId = blog._id || blog.id;
              const title = blog.title || 'Untitled';
              const slug = blog.slug || slugify(title) || blogId;
              const date = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '';
              const image = blog.image || safariImages.tigerEye;
              const excerpt = blog.summary || blog.excerpt || '';
              const category = blog.category || 'Sightings';
              return (
                <Link
                  key={blogId}
                  to={`/blog/${slug}`}
                  className="group bg-[#fdfcf8]/90 dark:bg-[#0c1610]/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:shadow-xl hover:border-safari-500/40 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {blogsNear && (
                      <img
                        src={sizedImage(image, 800)}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    )}
                    <span className="absolute top-3.5 left-3.5 bg-[#fdfcf8]/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-gray-900 dark:text-white uppercase shadow-sm border border-emerald-900/10 dark:border-gray-800">
                      {category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {date && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-400 mb-2">
                          <Calendar className="w-3.5 h-3.5" /> {date}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-950 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition-colors duration-200 leading-snug font-serif">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                          {excerpt}
                        </p>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition-colors pt-2">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 text-safari-500 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. VISITOR REVIEWS & FEEDBACK SECTION */}
      <FeedbackSection title={content.reviewsTitle} subtitle={content.reviewsSubtitle} />

      {/* 6. CALL TO ACTION SECTION */}
      <CallToAction
        onPrimaryClick={onOpenBooking}
        title={ctaCopy.title || undefined}
        subtitle={ctaCopy.subtitle || undefined}
        primaryText={ctaCopy.primaryLabel || "Book Permit Now"}
        secondaryText={ctaCopy.secondaryLabel || "Contact Ranger Office"}
        secondaryLink="/contact"
        secondaryIcon={Phone}
        bgImage={safariImages.homeHero || safariImages.mistyDarkPines}
      />
    </div>
  );
}
