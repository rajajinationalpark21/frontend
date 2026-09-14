import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Safaris', path: '/safari' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const getButtonText = () => {
    switch (location.pathname) {
      case '/':
        return 'Book Permit';
      case '/about':
        return 'Book Tickets';
      case '/safari':
        return 'Book Safari';
      default:
        return 'Book Now';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm group-hover:scale-105 transition shrink-0">
              <img 
                src="/logo.png" 
                alt="Rajaji Tiger Reserve Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:text-safari-600 transition block leading-none">
                Rajaji
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                Tiger Reserve
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-safari-600 dark:text-safari-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-safari-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button & Theme Selector */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSelector />
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-safari-500 hover:bg-safari-600 active:scale-[0.98] rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
              {getButtonText()}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSelector />
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-safari-500 rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition ${
                  isActive
                    ? 'bg-safari-50 dark:bg-safari-900/30 text-safari-600 dark:text-safari-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-safari-500 text-white font-semibold text-center text-sm shadow-md"
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
