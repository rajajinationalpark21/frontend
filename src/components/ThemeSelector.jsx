import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-safari-500 transition shadow-sm"
        title="Change theme"
        aria-label="Change theme"
      >
        <span className="text-sm">{activeTheme.icon}</span>
        <span className="hidden sm:inline">{activeTheme.name}</span>
        <Palette className="w-3.5 h-3.5 text-safari-500 opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
              Select Safari Theme
            </span>
            <Sparkles className="w-3.5 h-3.5 text-safari-500" />
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition ${
                    isSelected
                      ? 'bg-safari-50 dark:bg-safari-900/30 text-safari-700 dark:text-safari-300 font-semibold'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{theme.icon}</span>
                    <div>
                      <div className="text-xs font-bold leading-none">{theme.name}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{theme.tag}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/50 shadow-inner"
                      style={{ backgroundColor: theme.primary }}
                    />
                    {isSelected && <Check className="w-4 h-4 text-safari-600 dark:text-safari-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
