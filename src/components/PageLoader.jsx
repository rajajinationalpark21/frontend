import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// The spinner appears only when loading takes longer than this; a fast load
// goes straight to the page.
const SHOW_AFTER_MS = 400;

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return <div className="min-h-screen bg-[#faf8f5] dark:bg-[#07120a]" />;
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
