import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, X, Ticket, Sparkles, Phone } from 'lucide-react';
import { blogArticles, safariImages } from '../data/safariData';
import { fetchBlogs } from '../api/client';
import { slugify } from '../utils/slugify';
import SEO from '../components/SEO';
import CallToAction from '../components/CallToAction';

export default function BlogPage({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState(
    blogArticles.map((a) => ({
      ...a,
      slug: a.slug || slugify(a.title) || a.id,
    }))
  );

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        const blogs = data?.data?.blogs || data?.blogs;
        if (Array.isArray(blogs) && blogs.length > 0) {
          setArticles(
            blogs.map((b) => {
              const title = b.title || 'Untitled';
              const slug = b.slug || slugify(title) || (b._id || b.id);
              return {
                id: b._id || b.id,
                slug,
                title,
                category: b.category || 'Uncategorized',
                date: b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '',
                readTime: b.readTime || '5 min read',
                image: b.image || safariImages.tigerEye,
                featured: b.featured || false,
                excerpt: b.summary || b.excerpt || '',
                content: b.content || '',
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Wilderness Journal - Rajaji National Park",
    "description": "Field guides, leopard tracking, birdwatching canopy notes, and conservation stories from Rajaji Tiger Reserve.",
    "url": "https://rajajinationalpark.org/blog",
    "blogPost": articles.map((b) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "description": b.excerpt,
      "image": b.image,
      "url": `https://rajajinationalpark.org/blog/${b.slug || slugify(b.title)}`,
      "datePublished": "2023-11-12"
    }))
  };

  const categories = [
    'All Stories',
    'Big Cats',
    'Bird Watching',
    'Conservation',
    'Photography',
    'Travel Tips',
  ];

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const regularArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  const filteredArticles = regularArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Stories' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors pt-10 pb-20">
      <SEO
        title="Wilderness Journal - Field Guides & Wildlife Stories | Rajaji National Park"
        description="Read real-time wildlife sighting reports, big cat tracking guides, photography tips, and forest conservation stories from Rajaji National Park field naturalists."
        keywords="rajaji wildlife blog, tiger sightings chilla, leopard tracking guide, elephant corridor stories, safari travel tips"
        ogImage={featuredArticle?.image}
        schemaJson={blogSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-white tracking-tight mb-2.5">
            Wilderness Journal
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 max-w-xl">
            Insights from the Heart of the Jungle. Explore our stories, field guides, and conservation reports.
          </p>
        </div>

        {/* 2. FEATURED STORY HERO CARD */}
        {featuredArticle && (
          <Link
            to={`/blog/${featuredArticle.slug || slugify(featuredArticle.title) || featuredArticle.id}`}
            className="mb-14 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition duration-300 grid grid-cols-1 lg:grid-cols-12 group block cursor-pointer"
          >
            {/* Left: Featured Image */}
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* Right: Featured Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-safari-600 dark:text-safari-400 uppercase tracking-wider">
                <span>FEATURED STORY</span>
                <span>•</span>
                <span className="text-gray-400 dark:text-gray-400 font-normal">{featuredArticle.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition">
                  Read Full Article <ArrowRight className="w-4 h-4 text-safari-500 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* 3. CATEGORY FILTER PILLS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-gray-800">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-md shadow-safari-600/20'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:text-gray-950 dark:hover:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-safari-600 dark:text-safari-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, wildlife, flora..."
              className="w-full pl-11 pr-9 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-full focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 shadow-sm transition font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4. STORIES GRID */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400 text-sm">
            No articles found matching "{searchQuery}" in {selectedCategory}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {filteredArticles.map((article) => {
              const articleSlug = article.slug || slugify(article.title) || article.id;
              return (
                <Link
                  key={article.id}
                  to={`/blog/${articleSlug}`}
                  className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group block cursor-pointer"
                >
                  {/* Article Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Article Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400 mb-2">
                        <span>{article.category}</span>
                        <span className="text-gray-400 dark:text-gray-400 font-normal">{article.date}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition inline-flex items-center gap-1.5">
                        Read Story <ArrowRight className="w-3.5 h-3.5 text-safari-500 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 5. BOOK YOUR RIDE TODAY CTA */}
        <CallToAction
          className="!px-0 !py-4 sm:!py-8 !bg-transparent"
          title="Book Your Ride Today"
          subtitle="Daily visitor quotas and gypsy permits are strictly capped to preserve natural habitats. Reserve your open-top 4x4 safari jeep, registered guide, and official entry permits for Chila, Motichur, Gohari & Jhilmil."
          primaryText="Book Your Ride Now"
          onPrimaryClick={onOpenBooking}
          secondaryText="View Tariffs"
          secondaryLink="/safari/tickets"
          secondaryIcon={ArrowRight}
        />
      </div>
    </div>
  );
}
