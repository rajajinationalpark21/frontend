import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Forest',
    tag: 'Classic Reserve',
    icon: '🌿',
    primary: '#16a34a',
    accent: '#22c55e',
    light: '#f0fdf4',
    bg: '#ffffff',
    preview: 'from-emerald-600 to-green-800'
  },
  golden: {
    id: 'golden',
    name: 'Golden Savannah',
    tag: 'Sunset Safari',
    icon: '🌅',
    primary: '#d97706',
    accent: '#f59e0b',
    light: '#fffbeb',
    bg: '#ffffff',
    preview: 'from-amber-500 to-orange-700'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Jungle',
    tag: 'Night Safari',
    icon: '🌌',
    primary: '#10b981',
    accent: '#34d399',
    light: '#064e3b',
    bg: '#0a0f0c',
    preview: 'from-emerald-500 to-slate-900'
  },
  himalayan: {
    id: 'himalayan',
    name: 'Himalayan Foothills',
    tag: 'Shivalik Mist',
    icon: '🏔️',
    primary: '#0284c7',
    accent: '#38bdf8',
    light: '#f0f9ff',
    bg: '#ffffff',
    preview: 'from-sky-600 to-indigo-900'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('rajaji_theme') || 'emerald';
  });

  useEffect(() => {
    const theme = THEMES[currentTheme] ? currentTheme : 'emerald';
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'midnight') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('rajaji_theme', theme);
  }, [currentTheme]);

  const setTheme = (themeId) => {
    if (THEMES[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
