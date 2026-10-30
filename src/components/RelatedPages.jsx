import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchBlogs, fetchContent } from '../api/client';
import { relatedPages } from '../seo/routes';

/**
 * "Explore more" links at the foot of every page: the same section's other
 * pages, then the safari essentials. The same list is written into each page's
 * prerendered HTML (scripts/seo-build.mjs) for search engines.
 */
export default function RelatedPages() {
  const { pathname } = useLocation();
  const [zones, setZones] = useState([]);
  const [posts, setPosts] = useState([]);
  const isPost = pathname.startsWith('/blog/');

  useEffect(() => {
    fetchContent().then((res) => setZones(res?.data?.safari?.zones || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isPost) return;
    fetchBlogs()
      .then((res) => setPosts((res?.data?.blogs || res?.blogs || []).filter((post) => post.slug && post.published !== false)))
      .catch(() => {});
  }, [isPost]);

  const links = relatedPages(pathname, { zones, posts });
  if (!links.length) return null;

  return (
    <nav aria-labelledby="related-pages-heading" className="relative z-10 border-t border-emerald-900/10 dark:border-emerald-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 id="related-pages-heading" className="font-serif text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white mb-6">
          Explore more of Rajaji
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="group flex items-center justify-between gap-3 rounded-xl border border-emerald-900/15 dark:border-emerald-800/40 bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-emerald-50 hover:border-emerald-600/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
