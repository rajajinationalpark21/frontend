import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/safariData';
import RichText from './RichText';
import AnswerReveal from './AnswerReveal';
import { hoverToOpen } from '../utils/canHover';

/**
 * Questions from the FAQ page (admin panel → FAQs) shown on another page, with a
 * link to the rest. `topic` keeps only the questions that page is about. Closed
 * answers stay in the page, so search engines and AI assistants read them too.
 */
export default function PageFaqs({
  siteFaqs,
  topic,
  count = 6,
  idPrefix = 'page-faq',
  kicker = 'Help & Information',
  title = 'Frequently Asked Questions',
  subtitle,
}) {
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  // The built-in questions only until the admin panel has any.
  const adminFaqs = (siteFaqs?.items || []).filter((item) => item.q && item.a).map((item) => ({ question: item.q, answer: item.a }));
  const allFaqs = adminFaqs.length ? adminFaqs : faqs;
  const shown = (topic ? allFaqs.filter((faq) => topic.test(faq.question)) : allFaqs).slice(0, count);
  const faqPagePath = `/${siteFaqs?.slug || 'faq'}`;
  if (!shown.length) return null;

  return (
    <section className="relative z-10 py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
          {kicker}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {shown.map((faq, idx) => {
          const isOpen = !!openFaqs[idx];
          return (
            <div
              key={idx}
              // With a mouse, pointing at a question opens its answer (and closes the others).
              {...hoverToOpen(() => setOpenFaqs({ [idx]: true }))}
              className={`bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md border rounded-2xl transition-[border-color,box-shadow] duration-300 overflow-hidden ${
                isOpen ? 'border-emerald-600/30 dark:border-emerald-400/30 shadow-md' : 'border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-600/25'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-${idx}`}
              >
                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rotate-180'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnswerReveal
                open={isOpen}
                id={`${idPrefix}-${idx}`}
                className="px-5 sm:px-6 pb-5 pt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/80"
              >
                <RichText text={faq.answer} />
              </AnswerReveal>
            </div>
          );
        })}
      </div>

      {allFaqs.length > shown.length && (
        <div className="text-center mt-8">
          <Link to={faqPagePath} className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
            See all {allFaqs.length} questions
          </Link>
        </div>
      )}
    </section>
  );
}
