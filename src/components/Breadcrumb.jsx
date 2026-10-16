import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** Home › parent › current page, shown under a page header. */
export default function Breadcrumb({ parent, current, className = '' }) {
  return (
    <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 ${className}`}>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-gray-600 dark:text-emerald-200/70">
        <Link to="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">Home</Link>
        {parent && (
          <>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <Link to={parent.path} className="hover:text-emerald-700 dark:hover:text-emerald-400">{parent.label}</Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="text-gray-900 dark:text-emerald-50 font-medium" aria-current="page">{current}</span>
      </nav>
    </div>
  );
}
