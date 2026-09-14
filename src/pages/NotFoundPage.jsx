import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft, Trees, Search } from 'lucide-react';
import { safariImages } from '../data/safariData';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      <SEO
        title="Page Not Found (404) | Rajaji National Park"
        description="The requested safari trail could not be found. Return to Rajaji National Park base camp."
      />

      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated badge */}
        <div className="w-20 h-20 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-safari-600 tracking-widest uppercase">
            ERROR 404 • UNCHARTED TERRITORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
            Lost in the Dense Canopy?
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
            It looks like this trail doesn't exist, has shifted, or has grown over with wild vegetation. Let's get you back on course.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-safari-500 hover:bg-safari-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Base Camp
          </Link>
          <Link
            to="/safari"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 hover:border-gray-900 text-gray-800 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            Explore Safari Zones
          </Link>
        </div>

        {/* Quick links */}
        <div className="pt-6 border-t border-gray-200/80 text-xs text-gray-400">
          <span>Popular trails: </span>
          <Link to="/gallery" className="text-safari-600 hover:underline mx-1">Gallery</Link>
          <span>•</span>
          <Link to="/blog" className="text-safari-600 hover:underline mx-1">Journal</Link>
          <span>•</span>
          <Link to="/contact" className="text-safari-600 hover:underline mx-1">Contact</Link>
        </div>
      </div>
    </div>
  );
}
