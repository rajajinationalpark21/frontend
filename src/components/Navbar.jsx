import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Feather, 
  Home, 
  Ticket, 
  ShieldCheck, 
  Navigation, 
  Trees, 
  Sparkles, 
  Waves,
  HelpCircle,
  PhoneCall,
  BookOpen
} from 'lucide-react';
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

  // Nav items strictly matching the client's official structure
  const navDropdowns = [
    {
      name: 'Safari Zones',
      basePath: '/zones',
      items: [
        { name: 'All Safari Zones', path: '/zones', icon: Compass, desc: 'Overview of all 7 park safari ranges' },
        { name: 'Chilla Range', path: '/chilla-jeep-safari', icon: Navigation, desc: 'Core tiger & elephant reserve' },
        { name: 'Haridwar / Ranipur', path: '/ranipur-gate-jeep-safari', icon: Navigation, desc: 'Leopard safari near Haridwar' },
        { name: 'Chillawali / Mohand', path: '/chillawali-jeep-safari', icon: Navigation, desc: 'Scenic Shivalik gorge safari' },
        { name: 'Motichur Zone', path: '/motichur-jeep-safari', icon: Navigation, desc: 'Ancient Sal forest sanctuary' },
        { name: 'Jhilmil Jheel', path: '/jhilmil-jheel-safari', icon: Navigation, desc: 'Wetland Swamp Deer reserve' },
        { name: 'Gohri Range', path: '/gohri-range-safari', icon: Navigation, desc: 'Year-round buffer safari' },
        { name: 'Chaurasi Kutiya', path: '/chaurasi-kutiya-beatles-ashram', icon: Navigation, desc: 'Beatles Ashram forest heritage' },
      ]
    },
    {
      name: 'Activities',
      basePath: '/activities',
      items: [
        { name: 'Activities Overview', path: '/activities', icon: Compass, desc: 'Safari, Birding, Stay & Rafting' },
        { name: 'Jungle Safari / Jeep Safari', path: '/zones', icon: Navigation, desc: '4x4 open Gypsy forest safaris' },
        { name: 'Bird Watching', path: '/birds-of-rajaji-national-park', icon: Feather, desc: '400+ avian species & expert guides' },
        { name: 'Stay in Rajaji', path: '/stay', icon: Home, desc: 'Forest Rest Houses & eco-cottages' },
        { name: 'River Rafting', path: '/rafting', icon: Waves, desc: 'White-water rapids on the Ganges' },
      ]
    },
    {
      name: 'Wildlife',
      basePath: '/wildlife',
      items: [
        { name: 'Wildlife Overview', path: '/wildlife', icon: ShieldCheck, desc: 'Biodiversity & ecosystems' },
        { name: 'Mammals of Rajaji', path: '/mammals-of-rajaji-tiger-reserve', icon: ShieldCheck, desc: 'Tigers, elephants & leopards' },
        { name: 'Birds of Rajaji', path: '/birds-of-rajaji-national-park', icon: Feather, desc: 'Hornbills, eagles & kingfishers' },
        { name: 'Butterflies of Rajaji', path: '/butterflies-of-rajaji-national-park', icon: Sparkles, desc: 'Mud-puddling & Lepidoptera' },
        { name: 'Reptiles of Rajaji', path: '/reptiles-of-rajaji-tiger-reserve', icon: Sparkles, desc: 'King Cobras, pythons & monitors' },
        { name: 'Flora of Rajaji', path: '/flora-of-rajaji-national-park', icon: Trees, desc: 'Sal canopies & medicinal flora' },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm group-hover:scale-105 transition shrink-0">
              <img 
                src="/logo.png" 
                alt="Rajaji National Park Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:text-safari-600 transition block leading-none">
                Rajaji
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                National Park
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav ref={dropdownRef} className="hidden xl:flex items-center space-x-5 text-sm font-medium">
            {/* 1. Home / About Rajaji */}
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

            {/* 2. Safari Zones Dropdown */}
            {navDropdowns.slice(0, 1).map((group) => {
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

            {/* 3. Tickets & Charges */}
            <Link
              to="/tickets"
              className={`transition-colors py-1 ${
                location.pathname === '/tickets' || location.pathname === '/safari/tickets'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Tickets & Charges
            </Link>

            {/* 4. Terms & Rules */}
            <Link
              to="/terms"
              className={`transition-colors py-1 ${
                location.pathname === '/terms' || location.pathname === '/safari/rules'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Terms & Rules
            </Link>

            {/* 5. Activities Dropdown */}
            {navDropdowns.slice(1, 2).map((group) => {
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

            {/* 6. Wildlife Dropdown */}
            {navDropdowns.slice(2, 3).map((group) => {
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

            {/* 7. Blog */}
            <Link
              to="/blog"
              className={`transition-colors py-1 ${
                location.pathname.startsWith('/blog') || location.pathname.startsWith('/journal')
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Blog
            </Link>

            {/* 8. FAQ */}
            <Link
              to="/faq"
              className={`transition-colors py-1 ${
                location.pathname === '/faq'
                  ? 'text-safari-600 dark:text-safari-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              FAQ
            </Link>

            {/* 9. Contact us */}
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

          {/* 10. Action Book Now CTA Button & Theme Selector */}
          <div className="hidden xl:flex items-center gap-3">
            <ThemeSelector />
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-safari-500 hover:bg-safari-600 active:scale-[0.98] rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <ThemeSelector />
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-safari-500 rounded-full"
            >
              Book Now
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

      {/* Mobile Drawer (Strictly client's pages) */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-h-[80vh] overflow-y-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-3 pb-8 space-y-2 shadow-2xl animate-fadeIn">
          {/* 1. Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Home
          </Link>

          {/* 2. Safari Zones Accordion */}
          {navDropdowns.slice(0, 1).map((group) => {
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

          {/* 3. Tickets & Charges */}
          <Link
            to="/tickets"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Tickets & Charges
          </Link>

          {/* 4. Terms & Rules */}
          <Link
            to="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Terms & Rules
          </Link>

          {/* 5. Activities Accordion */}
          {navDropdowns.slice(1, 2).map((group) => {
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

          {/* 6. Wildlife Accordion */}
          {navDropdowns.slice(2, 3).map((group) => {
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

          {/* 7. Blog */}
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Blog
          </Link>

          {/* 8. FAQ */}
          <Link
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            FAQ
          </Link>

          {/* 9. Contact */}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            Contact Us
          </Link>

          {/* 10. Book Now CTA */}
          <div className="pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-safari-500 text-white font-bold text-center text-sm shadow-md active:scale-[0.98] transition"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
