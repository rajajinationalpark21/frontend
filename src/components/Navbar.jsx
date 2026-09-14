import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-safari-50 flex items-center justify-center text-safari-500 group-hover:bg-safari-100 transition">
              {/* Distinctive pine tree icon matching mockup */}
              <svg className="w-7 h-7 fill-safari-500" viewBox="0 0 24 24">
                <path d="m12 2 4 6h-3l4 6h-3l3 6H4l3-6H4l4-6H5l7-6z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-safari-600 transition">
              Jungle Safari
            </span>
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
                      ? 'text-safari-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
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

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-safari-500 hover:bg-safari-600 active:scale-[0.98] rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
              {getButtonText()}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-safari-500 rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition ${
                  isActive
                    ? 'bg-safari-50 text-safari-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-safari-500 hover:bg-safari-600 rounded-full shadow"
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
