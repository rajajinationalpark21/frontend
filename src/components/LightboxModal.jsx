import React from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function LightboxModal({ activePhoto, onClose, onPrev, onNext }) {
  if (!activePhoto) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-safari-dark rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="max-h-[75vh] flex items-center justify-center bg-black/40 overflow-hidden">
          <img
            src={activePhoto.src}
            alt={activePhoto.title}
            className="w-full h-full max-h-[75vh] object-contain select-none"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="p-6 bg-gradient-to-t from-black to-safari-darker text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-safari-300 bg-safari-900/60 rounded-full mb-1">
                {activePhoto.category}
              </span>
              <h3 className="text-xl font-bold font-serif">{activePhoto.title}</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">
            {activePhoto.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
