import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchContent } from '../api/client';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import PageLoader from '../components/PageLoader';

const fallback = {
  title: 'About Rajaji National Park',
  subtitle: 'A living landscape of forests, rivers and wildlife in the Shiwalik foothills of Uttarakhand.',
  overviewTitle: 'Rajaji at a glance',
  overviewIntro: 'Rajaji National Park is a significant wildlife conservation landscape in Uttarakhand.',
  overviewParagraphs: [],
  overviewStats: [],
};

export default function AboutPage({ onOpenBooking }) {
  const [content, setContent] = useState(fallback);
  const [home, setHome] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then((result) => {
        const data = result?.data || result || {};
        setContent((current) => ({ ...current, ...(data.about || {}) }));
        setHome(data.home || {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  const stats = content.overviewStats?.length ? content.overviewStats : home.aboutStats || [];
  const paragraphs = [content.overviewIntro, ...(content.overviewParagraphs || [])].filter(Boolean);
  const heroImage = home.aboutImage || safariImages.walkingTiger;

  return (
    <div className="min-h-screen bg-[#fafaf7] text-gray-800 dark:bg-[#070c09] dark:text-gray-100">
      <SEO title="About Rajaji National Park" ogImage={heroImage} />
      <PageHero title={content.title} subtitle={content.subtitle} image={home.aboutImages?.length ? home.aboutImages : heroImage} fallbackImage={safariImages.walkingTiger} alt="Rajaji National Park" imagePosition="center 45%" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)] lg:gap-20">
          <article>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">{content.overviewTitle}</h2>
            <div className="prose-balanced mt-7 space-y-5 text-[15px] leading-8 text-gray-600 dark:text-gray-300 sm:text-base">
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </article>

          <aside className="border-y border-emerald-950/15 py-7 dark:border-emerald-100/15">
            <div className="grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-3 lg:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={`${stat.value}-${index}`}>
                  <div className="font-sans text-3xl font-extrabold leading-none tracking-tight tabular-nums text-emerald-800 dark:text-emerald-300 sm:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold leading-5 text-gray-700 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-emerald-950 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Plan a responsible visit</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-100/85">Safari entry, permits and access are subject to Forest Department rules and availability.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={onOpenBooking} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-50"><CheckCircle2 className="h-4 w-4" /> Send an enquiry</button>
            <Link to="/zones" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Explore zones <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
