import React from 'react';
import { Loader2 } from 'lucide-react';

export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#07120a] flex flex-col items-center justify-center transition-colors">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 border-t-emerald-600 animate-spin" />
        <Loader2 className="w-6 h-6 text-emerald-600 absolute animate-pulse" />
      </div>
      <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-900/60 dark:text-emerald-400/60">
        Rajaji Tiger Reserve
      </p>
    </div>
  );
}
