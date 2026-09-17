import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = themes[currentTheme] || themes.emerald;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Elegant, compact circular theme button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-200/80 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-safari-500/40 dark:hover:border-safari-500/40 transition-all duration-200 shadow-sm hover:shadow active:scale-95 focus:outline-none"
        title={`Theme: ${activeTheme.name}`}
        aria-label="Change theme"
      >
        <Palette className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-safari-600 dark:hover:text-safari-400 transition-colors" />
      </button>

      {/* Elegant dropdown palette */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
              Theme Palette
            </span>
          </div>

          <div className="mt-1 space-y-1">
            {Object.values(themes).map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition ${
                    isSelected
                      ? 'bg-safari-50 dark:bg-safari-900/30 text-safari-700 dark:text-safari-300 font-semibold'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/70 text-gray-700 dark:text-gray-200 font-medium'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold leading-tight">{theme.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{theme.tag}</div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-safari-600 dark:text-safari-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
