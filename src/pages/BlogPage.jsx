import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { blogArticles, safariImages } from '../data/safariData';
import { fetchBlogs } from '../api/client';
import SEO from '../components/SEO';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [readingArticle, setReadingArticle] = useState(null);
  const [articles, setArticles] = useState(blogArticles);

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        const blogs = data?.data?.blogs || data?.blogs;
        if (Array.isArray(blogs) && blogs.length > 0) {
          setArticles(blogs.map((b) => ({
            id: b._id || b.id,
            title: b.title || 'Untitled',
            category: b.category || 'Uncategorized',
            date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            readTime: b.readTime || '5 min read',
            image: b.image || safariImages.tigerEye,
            featured: b.featured || false,
            excerpt: b.summary || b.excerpt || '',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Wilderness Journal - Jungle Safari",
    "description": "Field guides, leopard tracking, birdwatching canopy notes, and conservation stories.",
    "url": "https://junglesafari.org/blog",
    "blogPost": articles.map((b) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "description": b.excerpt,
      "image": b.image,
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
  const regularArticles = articles.filter((a) => !a.featured);

  const filteredArticles = regularArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Stories' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <SEO
        title="Wilderness Journal - Field Guides & Wildlife Stories | Jungle Safari"
        description="Read real-time wildlife sighting reports, big cat tracking guides, photography tips, and forest conservation stories from expert field naturalists."
        keywords="wildlife blog, tiger sightings, leopard tracking guide, bird watching canopy, safari travel tips"
        ogImage={featuredArticle?.image}
        schemaJson={blogSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif text-gray-950 tracking-tight mb-3">
            Wilderness Journal
          </h1>
          <p className="text-sm sm:text-base font-medium text-safari-800 max-w-2xl">
            Insights from the Heart of the Jungle. Explore our stories, guides, and photography.
          </p>
        </div>

        {/* 2. FEATURED STORY HERO CARD */}
        {featuredArticle && (
          <div 
            onClick={() => setReadingArticle(featuredArticle)}
            className="mb-14 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left: Leopard Image */}
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* Right: Featured Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-safari-600 uppercase tracking-wider">
                <span>FEATURED STORY</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">{featuredArticle.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-gray-900 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-900 group-hover:text-safari-600 transition">
                  Read Full Article <ArrowRight className="w-4 h-4 text-safari-500" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. CATEGORY FILTER PILLS & SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-gray-100">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition duration-150 ${
                  selectedCategory === cat
                    ? 'bg-safari-500 text-white shadow-sm'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or wildlife..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-full focus:outline-none focus:border-safari-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* 4. 6 STORIES GRID */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No articles found matching "{searchQuery}" in {selectedCategory}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setReadingArticle(article)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 flex flex-col cursor-pointer group"
              >
                {/* Article Image */}
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Article Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-safari-600 mb-2">
                      <span>{article.category}</span>
                      <span className="text-gray-400 font-normal">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-gray-900 group-hover:text-safari-600 transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-safari-600 transition">
                      Read Story
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. LOAD MORE STORIES BUTTON */}
        <div className="text-center mb-20">
          <button
            onClick={() => alert("All currently available field stories are loaded.")}
            className="px-8 py-3 rounded-full border border-gray-300 hover:border-gray-900 text-xs font-bold text-gray-800 transition active:scale-95"
          >
            Load More Stories
          </button>
        </div>

        {/* 6. JOIN THE EXPEDITION NEWSLETTER CONTAINER */}
        <div className="rounded-3xl bg-safari-dark text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
                Join the Expedition
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg">
                Subscribe to our newsletter for exclusive travel tips, wildlife photography guides, and seasonal safari offers.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-safari-400 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-gray-900 bg-safari-400 hover:bg-safari-300 rounded-xl transition duration-200 shrink-0"
                >
                  {newsletterSubscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
              {newsletterSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-safari-300 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Welcome to the expedition mailing list!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Reading Modal */}
      {readingArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setReadingArticle(null)}
        >
          <div 
            className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-safari-600 uppercase mb-2">
              <span>{readingArticle.category}</span>
              <span>•</span>
              <span className="text-gray-400">{readingArticle.date}</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-gray-950 mb-4">
              {readingArticle.title}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {readingArticle.excerpt}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Our conservation rangers and naturalists continuously monitor animal movements, territorial boundaries, and ecosystem changes. Guided expeditions provide our visitors with real-time insights while maintaining complete respect for the wild inhabitants.
            </p>
            <button
              onClick={() => setReadingArticle(null)}
              className="w-full py-2.5 text-xs font-bold text-white bg-safari-500 hover:bg-safari-600 rounded-xl"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
