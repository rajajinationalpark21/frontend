import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Tag, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { blogArticles, safariImages } from '../data/safariData';
import { fetchBlog, fetchBlogs } from '../api/client';
import SEO from '../components/SEO';

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Try fetching single blog from API first
    fetchBlog(id)
      .then((data) => {
        const blog = data?.data?.blog || data?.blog;
        if (blog) {
          setArticle({
            id: blog._id || blog.id,
            title: blog.title || 'Untitled',
            category: blog.category || 'Uncategorized',
            date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            readTime: blog.readTime || '5 min read',
            image: blog.image || safariImages.tigerEye,
            excerpt: blog.summary || '',
            content: blog.content || '',
          });
          // Fetch related articles
          fetchBlogs()
            .then((res) => {
              const blogs = res?.data?.blogs || res?.blogs || [];
              setRelatedArticles(
                blogs
                  .filter((b) => (b._id || b.id) !== id)
                  .slice(0, 3)
                  .map((b) => ({
                    id: b._id || b.id,
                    title: b.title,
                    category: b.category,
                    image: b.image || safariImages.tigerEye,
                    excerpt: b.summary || '',
                  }))
              );
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        // Fallback to local data
        const fallback = blogArticles.find(
          (a) => a.id === id || a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
        ) || blogArticles[0];
        setArticle(fallback);
        setRelatedArticles(blogArticles.filter((a) => a.id !== fallback.id).slice(0, 3));
      });
  }, [id]);

  if (!article) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": "2023-11-12",
    "author": {
      "@type": "Person",
      "name": "Senior Field Naturalist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jungle Safari National Reserve"
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
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-6 pb-24">
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={`${article.category.toLowerCase()}, wildlife, jungle safari, tracking guide`}
        ogImage={article.image}
        ogType="article"
        schemaJson={articleSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between py-4 mb-6 border-b border-gray-100 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Link to="/" className="hover:text-safari-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/blog" className="hover:text-safari-600 transition">Wilderness Journal</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate max-w-[180px] sm:max-w-xs">
              {article.title}
            </span>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-bold text-safari-600 hover:text-safari-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Stories
          </Link>
        </div>

        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-safari-100 text-safari-700 text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title & Lead */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.15] mb-6">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed mb-8">
          {article.excerpt}
        </p>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-gray-100 mb-10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-gray-800 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Tracking wildlife across dense Sal forests and open grasslands requires keen observation, patience, and deep reverence for the natural rhythm of the sanctuary. In this environment, every broken twig, fresh pugmark in the sandy riverbed, or sharp alarm call from a spotted deer tells an immediate story.
          </p>

          <p>
            The reserve is home to hundreds of species that have adapted to the unique topography formed by the Siwalik foothills and the wandering Ganges floodplains. As the morning mist lifts over the canopy, the forest awakens in layers: first the rhythmic calls of the Great Pied Hornbill echoing through towering trees, followed by the quiet emergence of herbivores toward ancient watering holes.
          </p>

          {/* Pull Quote */}
          <div className="my-8 p-6 sm:p-8 bg-safari-card/70 border-l-4 border-safari-500 rounded-r-3xl">
            <p className="text-base sm:text-lg italic text-gray-900 leading-snug">
              "The wild does not yield its secrets to haste. In the silence between our footsteps, the real jungle reveals itself."
            </p>
            <span className="block text-xs font-bold text-safari-600 mt-2 uppercase tracking-wider">
              — Senior Forest Ranger Field Notes
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-950 mt-8 mb-3">
            Reading the Canopy and Territory
          </h3>
          <p>
            Predators rely heavily on camouflage. A leopard lounging along a lichen-encrusted branch can remain completely invisible to the untrained eye even from thirty feet away. Naturalists observe indirect indicators: langurs sounding persistent staccato barks from the higher canopy invariably signal movement on the forest floor below.
          </p>
          <p>
            Sustainable safari expeditions follow strict non-intrusive protocols. Drivers cut vehicle engines at sighting points, leaving only the natural sounds of the wild. These practices prevent habituation and protect breeding corridors for future generations of big cats and elephants.
          </p>

          <h3 className="text-2xl font-bold text-gray-950 mt-8 mb-3">
            Conservation and Community Stewardship
          </h3>
          <p>
            Every safari permit issued directly funds anti-poaching patrol squads, artificial waterhole replenishment during peak dry summers, and grassroots educational programs in border villages. When local communities actively benefit from eco-tourism, human-wildlife conflict drops significantly.
          </p>
        </article>

        {/* Share & Actions Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-safari-50 text-gray-700 hover:text-safari-700 text-xs font-bold transition"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Article
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
        <div className="mt-20 pt-12 border-t border-gray-100">
          <h3 className="text-2xl font-bold text-gray-950 mb-8">
            Related Field Stories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-safari-600">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-safari-600 transition leading-snug mt-1">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition flex items-center gap-1 pt-2">
                    Read Story <ArrowRight className="w-3 h-3 text-safari-500" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
