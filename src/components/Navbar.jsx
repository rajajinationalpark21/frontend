import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Compass, Feather, Home, Ticket, ShieldCheck, Navigation, Trees, Sparkles, Leaf } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileGroup = (name) => {
    setMobileExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const navGroups = [
    {
      name: 'Safaris',
      basePath: '/safari',
      items: [
        { name: 'Safari Overview', path: '/safari', icon: Compass, desc: 'Expeditions, shifts & activities' },
        { name: 'Safari Zones', path: '/safari/zones', icon: Navigation, desc: 'Chila, Gohari, Jhilmil & Motichur' },
        { name: 'Tickets & Tariffs', path: '/safari/tickets', icon: Ticket, desc: 'Entry, Gypsy & guide fees' },
        { name: 'Park Rules & Timings', path: '/safari/rules', icon: ShieldCheck, desc: 'Safety regulations & Do’s/Don’ts' },
        { name: 'How To Reach', path: '/how-to-reach', icon: Navigation, desc: 'Flights, train stations & highways' }
      ]
    },
    {
      name: 'Wildlife',
      basePath: '/wildlife',
      items: [
        { name: 'Birds of Rajaji', path: '/wildlife/birds', icon: Feather, desc: '400+ avian species & hornbills' },
        { name: 'Major Birding Areas', path: '/wildlife/birding-areas', icon: Compass, desc: 'Top 4 trails and river circuits' },
        { name: 'Fauna & Wildlife', path: '/wildlife/fauna', icon: ShieldCheck, desc: 'Elephants, tigers, leopards & bears' },
        { name: 'Flora & Forests', path: '/wildlife/flora', icon: Trees, desc: 'Sal canopies & botanical trees' },
        { name: 'Butterflies & Insects', path: '/wildlife/butterflies', icon: Sparkles, desc: 'Mud-puddling & Lepidoptera' }
      ]
    },
    {
      name: 'Stay & Eco',
      basePath: '/stay',
      items: [
        { name: 'Stay in Rajaji', path: '/stay', icon: Home, desc: 'Wild Brook Retreat & Forest Rest Houses' },
        { name: 'Eco-Tourism & Conservation', path: '/eco-tourism', icon: Leaf, desc: 'Sustainable travel & green construction' }
      ]
    }
  ];

  const getButtonText = () => {
    switch (location.pathname) {
      case '/':
        return 'Book Permit';
      case '/about':
        return 'Book Tickets';
      case '/safari':
      case '/safari/zones':
        return 'Book Safari';
      default:
        return 'Book Permit';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm group-hover:scale-105 transition shrink-0">
              <img 
                src="/logo.png" 
                alt="Rajaji Tiger Reserve Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:text-safari-600 transition block leading-none">
                Rajaji
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                Tiger Reserve
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors py-1 ${
                location.pathname === '/'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`transition-colors py-1 ${
                location.pathname === '/about'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              About
            </Link>

            {/* Dropdown Groups */}
            {navGroups.map((group) => {
              const isGroupActive = location.pathname.startsWith(group.basePath) || 
                group.items.some(item => location.pathname === item.path);
              const isOpen = activeDropdown === group.name;

              return (
                <div
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : group.name)}
                    className={`inline-flex items-center gap-1.5 py-2 transition-colors ${
                      isGroupActive || isOpen
                        ? 'text-safari-600 dark:text-safari-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{group.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu Panel */}
                  {isOpen && (
                    <div className="absolute top-full left-0 w-72 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-xl border border-gray-100 dark:border-gray-800 animate-fadeIn z-50">
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const isItemActive = location.pathname === item.path;
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                                isItemActive
                                  ? 'bg-safari-50 dark:bg-safari-900/40 text-safari-600 dark:text-safari-400'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold leading-tight text-gray-900 dark:text-white">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              to="/gallery"
              className={`transition-colors py-1 ${
                location.pathname === '/gallery'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/blog"
              className={`transition-colors py-1 ${
                location.pathname.startsWith('/blog')
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Journal
            </Link>

            <Link
              to="/contact"
              className={`transition-colors py-1 ${
                location.pathname === '/contact'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA Button & Theme Selector */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeSelector />
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-safari-500 hover:bg-safari-600 active:scale-[0.98] rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
              {getButtonText()}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
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
        <div className="lg:hidden max-h-[80vh] overflow-y-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-3 pb-8 space-y-2 shadow-2xl animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            About Us
          </Link>

          {/* Accordion Groups in Mobile */}
          {navGroups.map((group) => {
            const isExpanded = !!mobileExpanded[group.name];
            return (
              <div key={group.name} className="border-b border-gray-100 dark:border-gray-800/80 pb-2">
                <button
                  onClick={() => toggleMobileGroup(group.name)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <span>{group.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl my-1">
                    {group.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-safari-600 dark:hover:text-safari-400"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            to="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Gallery
          </Link>

          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Journal
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Contact
          </Link>

          <div className="pt-4">
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
