import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  MapPin, 
  User, 
  Navigation, 
  MessageSquareQuote,
  Sparkles,
  Loader2
} from 'lucide-react';
import { submitFeedback } from '../api/client';

const ZONES = [
  'Chilla Range',
  'Motichur Range',
  'Gohari Range',
  'Jhilmil Jheel',
  'General Sanctuary Experience'
];

const RATING_LABELS = {
  1: '1 Star - Needs Improvement',
  2: '2 Stars - Fair',
  3: '3 Stars - Good Expedition',
  4: '4 Stars - Very Good Wildlife Sighting',
  5: '5 Stars - Exceptional Safari Experience'
};

export default function FeedbackModal({ isOpen, onClose, onFeedbackSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [zone, setZone] = useState('Chilla Range');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError('Please provide your name and share a few words about your safari experience.');
      return;
    }

    if (comment.trim().length < 15) {
      setError('Please provide at least 15 characters to describe your experience.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      name: name.trim(),
      rating: Number(rating),
      zone,
      location: location.trim() || 'Visitor Guest',
      comment: comment.trim(),
    };

    try {
      let savedReview = null;
      try {
        const res = await submitFeedback(payload);
        savedReview = res?.feedback;
      } catch (err) {
        // Fallback for offline or remote cold-start: construct local review object
        console.warn('API feedback submission fallback:', err);
      }

      const finalReview = savedReview || {
        id: `local-${Date.now()}`,
        ...payload,
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      // Save locally to persist across refresh
      try {
        const existing = JSON.parse(localStorage.getItem('user_safari_feedbacks') || '[]');
        localStorage.setItem('user_safari_feedbacks', JSON.stringify([finalReview, ...existing]));
      } catch {}

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(finalReview);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setName('');
        setLocation('');
        setComment('');
        setRating(5);
      }, 1800);
    } catch (err) {
      setError('An unexpected error occurred while saving your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  Share Your Safari Experience
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Your feedback helps fellow wildlife lovers & the sanctuary team
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-full bg-safari-100 dark:bg-safari-900/40 text-safari-600 dark:text-safari-400 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
                Your experience has been recorded and will inspire upcoming explorers on the Rajaji trails.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs">
                  {error}
                </div>
              )}

              {/* Star Rating Selector */}
              <div className="space-y-1.5 text-center sm:text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Overall Expedition Rating *
                </label>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const active = (hoverRating || rating) >= starVal;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-gray-300 dark:text-gray-700 hover:scale-115 transition-transform cursor-pointer focus:outline-none"
                        aria-label={`${starVal} Star`}
                      >
                        <Star 
                          className={`w-7 h-7 transition-colors ${
                            active 
                              ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                              : 'text-gray-300 dark:text-gray-700'
                          }`} 
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-semibold text-safari-600 dark:text-safari-400 h-4">
                  {RATING_LABELS[hoverRating || rating]}
                </div>
              </div>

              {/* Full Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rathore"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-safari-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    City / Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Dehradun / New Delhi"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-safari-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Zone Visited */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Safari Zone Visited
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-safari-500 text-gray-900 dark:text-white appearance-none cursor-pointer"
                  >
                    {ZONES.map((z) => (
                      <option key={z} value={z} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Review Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Your Safari Review & Sighting Details *
                  </label>
                  <span className="text-[10px] text-gray-400">
                    {comment.length}/1000
                  </span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, 1000))}
                  placeholder="Share details about your safari: wildlife spotted, guide knowledge, landscape impressions, or tips for future visitors..."
                  rows={4}
                  required
                  className="w-full p-3 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-safari-500 text-gray-900 dark:text-white leading-relaxed resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 transition duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Experience</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
