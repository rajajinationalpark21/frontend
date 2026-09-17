import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ChevronRight,
  PlusCircle,
  ThumbsUp,
  Filter
} from 'lucide-react';
import { visitorFeedbacks } from '../data/safariData';
import { fetchFeedback } from '../api/client';
import FeedbackModal from './FeedbackModal';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState(visitorFeedbacks);
  const [selectedZone, setSelectedZone] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Load from API + localStorage
  useEffect(() => {
    let localSaved = [];
    try {
      localSaved = JSON.parse(localStorage.getItem('user_safari_feedbacks') || '[]');
    } catch {}

    fetchFeedback()
      .then((res) => {
        const apiFeedbacks = res?.feedbacks || res?.data?.feedbacks || [];
        if (Array.isArray(apiFeedbacks) && apiFeedbacks.length > 0) {
          // Merge local submissions with API feedbacks and fallback data, avoiding duplicates
          const seenIds = new Set();
          const combined = [];

          [...localSaved, ...apiFeedbacks, ...visitorFeedbacks].forEach((item) => {
            const key = item._id || item.id || `${item.name}-${item.comment?.slice(0, 15)}`;
            if (!seenIds.has(key)) {
              seenIds.add(key);
              combined.push(item);
            }
          });

          setFeedbacks(combined);
        } else if (localSaved.length > 0) {
          setFeedbacks([...localSaved, ...visitorFeedbacks]);
        }
      })
      .catch(() => {
        if (localSaved.length > 0) {
          setFeedbacks([...localSaved, ...visitorFeedbacks]);
        }
      });
  }, []);

  const handleFeedbackSubmitted = (newReview) => {
    setFeedbacks((prev) => [newReview, ...prev]);
  };

  const zones = ['All', 'Chilla Range', 'Motichur Range', 'Gohari Range', 'Jhilmil Jheel'];

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (selectedZone === 'All') return true;
    return fb.zone?.toLowerCase().includes(selectedZone.toLowerCase().replace(' range', ''));
  });

  const displayedFeedbacks = filteredFeedbacks.slice(0, visibleCount);

  // Calculate average rating
  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / feedbacks.length).toFixed(1)
    : '4.9';

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-gray-50/50 dark:bg-black/30 border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

          {/* Action & Metric Badge */}
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

        {/* Aggregate Ratings & Zone Filters Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
          {/* Rating summary */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
              <span className="text-lg font-black text-amber-700 dark:text-amber-400 leading-none">
                {avgRating}
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">{feedbacks.length}+ Verified Expeditions</span>
              <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
              <span className="text-safari-600 dark:text-safari-400 font-semibold">98% Sighting Satisfaction</span>
            </div>
          </div>

          {/* Zone filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedZone === zone
                    ? 'bg-safari-600 dark:bg-safari-500 text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white border border-gray-200/60 dark:border-gray-700/60'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Feedbacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFeedbacks.map((item, idx) => {
            const ratingVal = Number(item.rating) || 5;

            return (
              <div
                key={item._id || item.id || idx}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Stars + Zone Tag */}
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

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic relative z-10 line-clamp-4">
                    "{item.comment}"
                  </p>
                </div>

                {/* Visitor Footer */}
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

        {/* View More / Less Toggle */}
        {filteredFeedbacks.length > 6 && (
          <div className="text-center pt-8">
            {visibleCount < filteredFeedbacks.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-safari-500 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-safari-600 dark:hover:text-safari-400 transition"
              >
                <span>View More Visitor Stories</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-safari-600 dark:hover:text-safari-400 transition"
              >
                <span>Show Fewer Stories</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Interactive Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />
    </section>
  );
}
