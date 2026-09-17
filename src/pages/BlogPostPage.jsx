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
          <p key={`p-${key}`} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
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
        <ul key={`ul-${key}`} className="space-y-2 my-3 pl-1 list-none">
          {currentList.map((it, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-safari-500 mt-2 shrink-0" />
              <span>
                {it.includes('**') ? (
                  it.split('**').map((seg, sIdx) => 
                    sIdx % 2 === 1 ? <strong key={sIdx} className="font-bold text-gray-950 dark:text-white">{seg}</strong> : seg
                  )
                ) : it}
              </span>
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
        <h3 key={`h3-${idx}`} className="text-base sm:text-lg font-bold text-gray-950 dark:text-white mt-6 mb-2 tracking-tight">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph(idx);
      flushList(idx);
      elements.push(
        <h2 key={`h2-${idx}`} className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white mt-7 mb-2.5 tracking-tight">
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
            content: blog.content || '',
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.date || "2023-11-12",
    "author": {
      "@type": "Person",
      "name": "Senior Field Naturalist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rajaji National Park Tiger Reserve"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rajajinationalpark.org/blog/${article.slug || slugify(article.title)}`
    }
  };

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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors pt-6 pb-24">
      <SEO
        title={`${article.title} | Wilderness Journal - Rajaji National Park`}
        description={article.excerpt}
        keywords={`${article.category.toLowerCase()}, wildlife story, tracking guide, rajaji national park, tiger reserve`}
        ogImage={article.image}
        ogType="article"
        schemaJson={articleSchema}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Top Navigation */}
        <div className="flex items-center justify-between py-3 mb-5 border-b border-gray-100 dark:border-gray-800 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-safari-600 dark:hover:text-safari-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/blog" className="hover:text-safari-600 dark:hover:text-safari-400 transition">
              Wilderness Journal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[160px] sm:max-w-xs">
              {article.title}
            </span>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-bold text-safari-600 dark:text-safari-400 hover:text-safari-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Stories
          </Link>
        </div>

        {/* Category, Date & Read Time */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-safari-50 dark:bg-safari-900/30 text-safari-700 dark:text-safari-300 text-[11px] font-bold uppercase tracking-wider border border-safari-200 dark:border-safari-800/50">
            {article.category}
          </span>
          {article.date && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
          )}
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-snug mb-3">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        {article.excerpt && (
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-normal leading-relaxed mb-6">
            {article.excerpt}
          </p>
        )}

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9] max-h-[340px] bg-gray-100 dark:bg-gray-800 mb-8 border border-gray-100 dark:border-gray-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="space-y-3.5">
          {article.content ? (
            renderContent(article.content)
          ) : (
            <div className="space-y-3.5 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                Tracking wildlife across dense Sal forests and open grasslands requires keen observation, patience, and deep reverence for the natural rhythm of the sanctuary. In this environment, every broken twig, fresh pugmark in the sandy riverbed, or sharp alarm call from a spotted deer tells an immediate story.
              </p>
              <p>
                The reserve is home to hundreds of species that have adapted to the unique topography formed by the Siwalik foothills and the wandering Ganges floodplains. As the morning mist lifts over the canopy, the forest awakens in layers: first the rhythmic calls of the Great Pied Hornbill echoing through towering trees, followed by the quiet emergence of herbivores toward ancient watering holes.
              </p>
            </div>
          )}

          {/* Pull Quote */}
          <div className="my-6 p-4 sm:p-5 bg-gray-50 dark:bg-gray-900 border-l-4 border-safari-500 rounded-r-2xl">
            <p className="text-sm sm:text-base italic text-gray-900 dark:text-white leading-snug">
              "The wild does not yield its secrets to haste. In the silence between our footsteps, the real jungle reveals itself."
            </p>
            <span className="block text-[11px] font-bold text-safari-600 dark:text-safari-400 mt-1.5 uppercase tracking-wider">
              - Senior Forest Ranger Field Notes
            </span>
          </div>
        </article>

        {/* Share & Actions Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" /> Link Copied!
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-safari-500 hover:bg-safari-600 text-white text-xs font-bold shadow transition"
          >
            Explore More Stories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-950 dark:text-white mb-8">
              Related Field Stories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relSlug = rel.slug || slugify(rel.title) || rel.id;
                return (
                  <Link
                    key={rel.id}
                    to={`/blog/${relSlug}`}
                    className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col block"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-safari-600 dark:text-safari-400">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-safari-600 dark:group-hover:text-safari-400 transition leading-snug mt-1">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-safari-600 dark:group-hover:text-safari-400 transition flex items-center gap-1 pt-2">
                        Read Story <ArrowRight className="w-3 h-3 text-safari-500" />
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
