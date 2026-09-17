import React, { useState, useEffect } from 'react';
import {
  Star,
  MessageSquareQuote,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { fetchFeedback } from '../api/client';
import FeedbackModal from './FeedbackModal';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFeedback()
      .then((res) => {
        const apiFeedbacks = res?.feedbacks || res?.data?.feedbacks || [];
        setFeedbacks(Array.isArray(apiFeedbacks) ? apiFeedbacks : []);
      })
      .catch(() => {
        setFeedbacks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFeedbackSubmitted = () => {
    setIsModalOpen(false);
  };

  const baseList = feedbacks.length < 6
    ? [...feedbacks, ...feedbacks, ...feedbacks]
    : feedbacks;
  const loopItems = [...baseList, ...baseList];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-gray-50/50 dark:bg-black/30 border-t border-gray-100 dark:border-gray-800 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safari-50 dark:bg-safari-900/30 text-safari-700 dark:text-safari-300 text-xs font-bold uppercase tracking-wider border border-safari-200 dark:border-safari-800/50 mb-3 shadow-sm">
              <MessageSquareQuote className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" />
              <span>Visitor Reviews & Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
              Stories & Ratings from the Trail
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl mt-2 leading-relaxed">
              Unfiltered reflections from naturalists, wildlife photographers, and families who journeyed through the Sal forests and river corridors of Rajaji.
            </p>
          </div>

          <div className="flex items-center gap-3.5 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-safari-500 hover:bg-safari-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-safari-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-12 px-4">
          <MessageSquareQuote className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Reviews will appear here after visitor experiences are shared and approved.
          </p>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden py-2 group">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50/95 dark:from-[#090e0b]/95 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50/95 dark:from-[#090e0b]/95 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-ltr gap-6 flex items-stretch py-3 pl-4">
            {loopItems.map((item, idx) => {
              const ratingVal = Number(item.rating) || 5;

              return (
                <div
                  key={`${item._id || item.id || idx}-${idx}`}
                  className="w-[300px] sm:w-[360px] shrink-0 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-safari-500/30 transition-all duration-300 flex flex-col justify-between select-none"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= ratingVal ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'}`}
                          />
                        ))}
                      </div>
                      {item.zone && (
                        <span className="px-2.5 py-0.5 rounded-full bg-safari-50 dark:bg-safari-900/40 text-safari-700 dark:text-safari-300 text-[10px] font-bold tracking-wide border border-safari-100 dark:border-safari-800/40 shrink-0">
                          {item.zone}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic line-clamp-4">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                          {item.name}
                        </span>
                        {item.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-safari-500 shrink-0" title="Verified Visitor" />
                        )}
                      </div>
                      {item.location && (
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />
    </section>
  );
}
