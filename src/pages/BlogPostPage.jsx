import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ChevronRight,
  ArrowRight,
  Check
} from 'lucide-react';
import { blogArticles, safariImages } from '../data/safariData';
import { fetchBlog, fetchBlogs } from '../api/client';
import { slugify } from '../utils/slugify';
import SEO from '../components/SEO';
import { blogSeoTitle } from '../seo/blogTitle';
import { SITE_URL } from '../seo/site';
import { blogPostingSchema } from '../seo/schema';
import { sizedImage } from '../utils/heroImage';

function renderContent(rawContent) {
  if (!rawContent) return null;

  // Split into lines to parse headings, bullets, and paragraphs cleanly
  const lines = rawContent.split('\n');
  const elements = [];
  let currentParagraph = [];
  let currentList = [];

  const flushParagraph = (key) => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={`p-${key}`} className="text-base sm:text-lg leading-[1.8] text-gray-700 dark:text-gray-300 mb-6 font-normal">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = (key) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="space-y-3 my-5 pl-2 list-none border-l-2 border-emerald-600/30 dark:border-emerald-500/30">
          {currentList.map((it, i) => (
            <li key={i} className="pl-3 text-base sm:text-lg leading-[1.75] text-gray-700 dark:text-gray-300">
              {it.includes('**') ? (
                it.split('**').map((seg, sIdx) => 
                  sIdx % 2 === 1 ? <strong key={sIdx} className="font-bold text-gray-950 dark:text-white">{seg}</strong> : seg
                )
              ) : it}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph(idx);
      flushList(idx);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(idx);
      flushList(idx);
      elements.push(
        <h3 key={`h3-${idx}`} className="text-xl sm:text-2xl font-bold font-serif text-gray-950 dark:text-white mt-9 mb-3.5 tracking-tight">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph(idx);
      flushList(idx);
      elements.push(
        <h2 key={`h2-${idx}`} className="text-2xl sm:text-3xl font-bold font-serif text-gray-950 dark:text-white mt-12 mb-4 tracking-tight border-b border-gray-100 dark:border-gray-800 pb-2">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph(idx);
      currentList.push(trimmed.replace(/^[-*]\s+/, '').trim());
      return;
    }

    // Otherwise it is paragraph text
    flushList(idx);
    currentParagraph.push(trimmed);
  });

  flushParagraph('end');
  flushList('end');

  return elements;
}

export default function BlogPostPage() {
  const { slug, id } = useParams();
  const blogParam = slug || id;
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 1. Try finding in local blogArticles first for instant render
    const localMatch = blogArticles.find(
      (a) =>
        a.slug === blogParam ||
        a.id === blogParam ||
        slugify(a.title) === blogParam ||
        a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === blogParam
    );

    if (localMatch) {
      setArticle({
        ...localMatch,
        slug: localMatch.slug || slugify(localMatch.title) || localMatch.id,
      });
      setRelatedArticles(
        blogArticles
          .filter((a) => a.id !== localMatch.id && (a.slug || slugify(a.title)) !== blogParam)
          .slice(0, 3)
          .map((a) => ({
            ...a,
            slug: a.slug || slugify(a.title) || a.id,
          }))
      );
    }

    // 2. Query backend API
    fetchBlog(blogParam)
      .then((data) => {
        const blog = data?.data?.blog || data?.blog;
        if (blog) {
          const fetchedArticle = {
            id: blog._id || blog.id,
            slug: blog.slug || slugify(blog.title) || blog._id,
            title: blog.title || 'Untitled',
            category: blog.category || 'Uncategorized',
            date: blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '',
            readTime: blog.readTime || '5 min read',
            image: blog.image || safariImages.tigerEye,
            excerpt: blog.summary || '',
            seoTitle: blog.seoTitle || '',
            content: blog.content || '',
            quote: blog.quote || '',
            quoteAuthor: blog.quoteAuthor || '',
          };
          setArticle(fetchedArticle);

          // Fetch related articles
          fetchBlogs()
            .then((res) => {
              const blogs = res?.data?.blogs || res?.blogs || [];
              const others = blogs
                .filter(
                  (b) =>
                    (b.slug || slugify(b.title) || b._id) !== blogParam &&
                    (b._id || b.id) !== blogParam
                )
                .slice(0, 3)
                .map((b) => ({
                  id: b._id || b.id,
                  slug: b.slug || slugify(b.title) || b._id,
                  title: b.title,
                  category: b.category,
                  image: b.image || safariImages.tigerEye,
                  excerpt: b.summary || '',
                }));

              if (others.length > 0) {
                setRelatedArticles(others);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        // If API fails and local didn't match, fallback to first article
        if (!localMatch) {
          const fallback = blogArticles[0];
          setArticle({
            ...fallback,
            slug: fallback.slug || slugify(fallback.title) || fallback.id,
          });
          setRelatedArticles(
            blogArticles.slice(1, 4).map((a) => ({
              ...a,
              slug: a.slug || slugify(a.title) || a.id,
            }))
          );
        }
      });
  }, [blogParam]);

  if (!article) return null;

  const articleSchema = blogPostingSchema(
    {
      title: article.title,
      summary: article.excerpt,
      image: article.image,
      slug: article.slug || slugify(article.title),
    },
    SITE_URL
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] dark:bg-[#07120a] transition-colors pt-6 pb-24">
      {/* Delicate tactile ambient leaf texture */}
      <div className="pattern-leaf-delicate pointer-events-none z-0" aria-hidden="true" />

      <SEO
        title={blogSeoTitle(article)}
        description={article.excerpt}
        keywords={`${article.category.toLowerCase()}, rajaji national park, rajaji tiger reserve, rajaji jeep safari`}
        ogImage={article.image}
        ogType="article"
        schemaJson={articleSchema}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Top Navigation */}
        <div className="flex items-center justify-between py-4 mb-6 border-b border-emerald-900/10 dark:border-emerald-800/30 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-emerald-300/70">
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Wilderness Journal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 dark:text-emerald-100 font-semibold truncate max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Wilderness Stories
          </Link>
        </div>

        {/* Grand Article Header - Full Width */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          {/* Category, Date & Read Time */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50">
              {article.category}
            </span>
            {article.date && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-emerald-300/70">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{article.date}</span>
              </div>
            )}
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-emerald-300/70">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-gray-950 dark:text-emerald-50 tracking-tight leading-[1.12] mb-6">
            {article.title}
          </h1>

          {/* Lead Excerpt */}
          {article.excerpt && (
            <p className="text-lg sm:text-xl text-gray-600 dark:text-emerald-100/80 font-light leading-relaxed max-w-3xl mx-auto">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Featured Banner Image - Wide Cinematic */}
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] sm:aspect-[21/9] max-h-[520px] bg-gray-100 dark:bg-gray-800 mb-12 border border-emerald-950/10 dark:border-emerald-500/20">
          <img
            src={sizedImage(article.image, 1600)}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2-Column Editorial Layout on PC (Wide Main Article + Sticky Info Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Main Reading Column (8 cols on desktop) */}
          <div className="lg:col-span-8">
            <article className="prose prose-emerald dark:prose-invert max-w-none">
              {article.content ? (
                renderContent(article.content)
              ) : (
                <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-[1.8] text-base sm:text-lg">
                  <p>
                    Tracking wildlife across dense Sal forests and open grasslands requires keen observation, patience, and deep reverence for the natural rhythm of the sanctuary. In this environment, every broken twig, fresh pugmark in the sandy riverbed, or sharp alarm call from a spotted deer tells an immediate story.
                  </p>
                  <p>
                    The reserve is home to hundreds of species that have adapted to the unique topography formed by the Siwalik foothills and the wandering Ganges floodplains. As the morning mist lifts over the canopy, the forest awakens in layers: first the rhythmic calls of the Great Pied Hornbill echoing through towering trees, followed by the quiet emergence of herbivores toward ancient watering holes.
                  </p>
                </div>
              )}

              {/* Dynamic Optional Pull Quote */}
              {article.quote && article.quote.trim() && (
                <div className="my-8 p-6 sm:p-8 bg-[#f5f2e9]/80 dark:bg-[#0c1f13] border-l-4 border-emerald-600 rounded-r-3xl shadow-sm">
                  <p className="font-serif text-lg sm:text-xl italic text-gray-950 dark:text-white leading-relaxed">
                    "{article.quote.trim().replace(/^["']|["']$/g, '')}"
                  </p>
                  {article.quoteAuthor && article.quoteAuthor.trim() && (
                    <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-3 uppercase tracking-widest">
                      — {article.quoteAuthor.trim()}
                    </span>
                  )}
                </div>
              )}
            </article>

            {/* Share & Actions Bar */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold border border-gray-200 dark:border-gray-700 shadow-sm transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Link Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" /> Share Article
                    </>
                  )}
                </button>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition"
              >
                Explore More Stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sticky Editorial Sidebar (4 cols on desktop) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Safari Booking Inquiry CTA Card */}
            <div className="bg-[#fdfcf8] dark:bg-[#0c1f13] rounded-3xl p-6 border border-emerald-950/10 dark:border-emerald-500/20 shadow-md relative overflow-hidden">
              <div className="pattern-leaf-delicate absolute inset-0 opacity-[0.04] pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  Plan Your Wildlife Trip
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-950 dark:text-white mt-1 mb-2">
                  Experience Rajaji Firsthand
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                  Book registered 4x4 Gypsy safari permits with certified forest guides across the Chilla, Motichur, Ranipur, Mohand–Chillawali, Jhilmil Jheel & Gohri zones.
                </p>
                <Link
                  to="/booking"
                  state={{ toForm: true }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow transition"
                >
                  Inquire Safari Permit <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Author / Field Journal Details */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Field Journal Notes
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Authored by Rajaji National Park naturalists and wildlife researchers tracking biodiversity across Uttarakhand's tiger habitat.
              </p>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 space-y-1.5">
                <div><strong>Category:</strong> {article.category}</div>
                <div><strong>Estimated Reading:</strong> {article.readTime}</div>
                <div><strong>Published:</strong> {article.date || 'Recent Field Log'}</div>
              </div>
            </div>

          </aside>
        </div>

        {/* Related Stories - Full Width Grid */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  More From Wilderness Journal
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 dark:text-white mt-1">
                  Related Field Stories
                </h3>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedArticles.map((rel) => {
                const relSlug = rel.slug || slugify(rel.title) || rel.id;
                return (
                  <Link
                    key={rel.id}
                    to={`/blog/${relSlug}`}
                    className="group bg-[#fdfcf8] dark:bg-[#0c1f13] rounded-3xl overflow-hidden border border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={sizedImage(rel.image, 600)}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {rel.category}
                        </span>
                        <h4 className="text-base font-serif font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug mt-1.5">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition flex items-center gap-1 pt-2">
                        Read Story <ArrowRight className="w-3 h-3 text-emerald-500" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
