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
  BookOpen,
  MapPin
} from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import MapNudge from './MapNudge';
import { fetchContent } from '../api/client';

const MENU_ICONS = [
  [/bird/i, Feather],
  [/butterfl|reptile/i, Sparkles],
  [/flora|tree/i, Trees],
  [/stay/i, Home],
  [/raft/i, Waves],
  [/ticket|charges|fees/i, Ticket],
  [/terms|rules|cancellation|mammal|wildlife/i, ShieldCheck],
  [/book/i, BookOpen],
  [/faq/i, HelpCircle],
  [/contact/i, PhoneCall],
  [/jeep|safari|zone|chilla|ranipur|mohand|motichur|jhilmil|gohri|chaurasi/i, Navigation],
];
const menuIcon = (item) => MENU_ICONS.find(([pattern]) => pattern.test(`${item.label} ${item.path}`))?.[1] || Compass;


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

  // The menu is edited in the admin panel (Settings → Website Menu); this one is
  // used only until it loads, or when the site cannot reach the CMS.
  const fallbackMenu = [
    { label: 'Home', path: '/', children: [] },
    { label: 'About Rajaji', path: '/about', children: [] },
    {
      label: 'Safari Zones', path: '/zones', children: [
        { label: 'All Safari Zones', path: '/zones', desc: 'Overview of all 6 safari zones' },
        { label: 'Chilla Range', path: '/chilla-jeep-safari', desc: 'Core tiger & elephant reserve' },
        { label: 'Haridwar / Ranipur', path: '/ranipur-gate-jeep-safari', desc: 'Leopard safari near Haridwar' },
        { label: 'Chillawali / Mohand', path: '/chillawali-jeep-safari-mohand-gate', desc: 'Scenic Shivalik gorge safari' },
        { label: 'Motichur Zone', path: '/motichur-jeep-safari', desc: 'Ancient Sal forest sanctuary' },
        { label: 'Jhilmil Jheel', path: '/jhilmil-jheel-safari', desc: 'Wetland Swamp Deer reserve' },
        { label: 'Gohri Range', path: '/gohri-range-safari', desc: 'Year-round buffer safari' },
        { label: 'Chaurasi Kutiya', path: '/chaurasi-kutiya-beatles-ashram', desc: 'Beatles Ashram forest heritage' },
      ],
    },
    { label: 'Tickets & Charges', path: '/rajaji-national-park-jeep-safari-tickets-entry-fees-charges', children: [] },
    {
      label: 'Activities', path: '/activities', children: [
        { label: 'Activities Overview', path: '/activities', desc: 'Safari, Stay & Rafting' },
        { label: 'Jungle Safari / Jeep Safari', path: '/rajaji-jeep-safari', desc: '4x4 open Gypsy forest safaris' },
        { label: 'Stay in Rajaji', path: '/stay-near-rajaji-national-park', desc: 'Forest Rest Houses & eco-cottages' },
        { label: 'River Rafting', path: '/river-rafting-rishikesh', desc: 'White-water rapids on the Ganges' },
      ],
    },
    {
      label: 'Wildlife', path: '/wildlife-biodiversity-rajaji-tiger-reserve', children: [
        { label: 'Wildlife Overview', path: '/wildlife-biodiversity-rajaji-tiger-reserve', desc: 'Biodiversity & ecosystems' },
        { label: 'Mammals of Rajaji', path: '/mammals-of-rajaji-tiger-reserve', desc: 'Tigers, elephants & leopards' },
        { label: 'Birds of Rajaji', path: '/birds-of-rajaji-national-park', desc: 'Hornbills, eagles & kingfishers' },
        { label: 'Butterflies of Rajaji', path: '/butterflies-of-rajaji-national-park', desc: 'Mud-puddling & Lepidoptera' },
        { label: 'Reptiles of Rajaji', path: '/reptiles-of-rajaji-tiger-reserve', desc: 'King Cobras, pythons & monitors' },
        { label: 'Flora of Rajaji', path: '/flora-of-rajaji-national-park', desc: 'Sal canopies & medicinal flora' },
      ],
    },
    { label: 'Blog', path: '/blog', children: [] },
    { label: 'FAQ', path: '/faq', children: [] },
    { label: 'Contact', path: '/contact', children: [] },
  ];

  const [cmsMenu, setCmsMenu] = useState(null);
  useEffect(() => {
    fetchContent()
      .then((res) => {
        const navigation = (res.data?.settings?.navigation || []).filter((entry) => entry.label && entry.path);
        if (navigation.length) setCmsMenu(navigation);
      })
      .catch(() => {});
  }, []);

  const fullMenu = cmsMenu || fallbackMenu;
  // The menu's "Book Now" entry is the green button next to the menu.
  const bookingEntry = fullMenu.find((entry) => entry.path === '/booking');
  const menu = fullMenu.filter((entry) => entry !== bookingEntry);
  const bookingLabel = bookingEntry?.label || 'Book Now';
  // The menu's "How to Reach" entry is the Map button on wide screens; the phone
  // menu keeps it as a link because the phone Map button shows only an icon.
  const reachEntry = fullMenu.find((entry) => /how to reach/i.test(entry.label));
  const reachPath = reachEntry?.path || '/how-to-reach';
  const desktopMenu = menu.filter((entry) => entry !== reachEntry);

  const isEntryActive = (entry) => {
    const path = location.pathname;
    if (entry.path === '/') return path === '/';
    if (path === entry.path || path.startsWith(`${entry.path}/`)) return true;
    return (entry.children || []).some((child) => child.path === path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fdfcf8]/95 dark:bg-[#07120a]/95 backdrop-blur-md border-b border-emerald-950/10 dark:border-emerald-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-200/80 dark:border-gray-800 shadow-sm group-hover:scale-105 transition shrink-0">
              <img 
                src="/logo.png" 
                alt="Rajaji National Park Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-gray-950 dark:text-white group-hover:text-safari-600 transition block leading-none font-serif">
                Rajaji
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mt-0.5">
                National Park
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (the admin panel's Website Menu) */}
          <nav ref={dropdownRef} className="hidden xl:flex items-center gap-x-3.5 text-[13px] font-medium">
            {desktopMenu.map((entry) => {
              const children = entry.children || [];
              if (children.length === 0) {
                return (
                  <Link
                    key={entry.label}
                    to={entry.path}
                    className={`transition-colors py-1 whitespace-nowrap ${
                      isEntryActive(entry)
                        ? 'text-safari-600 dark:text-safari-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {entry.label}
                  </Link>
                );
              }
              const isOpen = activeDropdown === entry.label;
              return (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(entry.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : entry.label)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap transition-colors ${
                      isEntryActive(entry) || isOpen
                        ? 'text-safari-600 dark:text-safari-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{entry.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 w-72 pt-1.5 z-[60]">
                      <div className="bg-white dark:bg-[#0b1b11] rounded-2xl p-2 shadow-2xl border border-gray-200/90 dark:border-emerald-800/60 animate-fadeIn">
                        <div className="space-y-1">
                          {children.map((item) => {
                            const isItemActive = location.pathname === item.path;
                            const Icon = menuIcon(item);
                            return (
                              <Link
                                key={`${item.label}-${item.path}`}
                                to={item.path}
                                className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                                  isItemActive
                                    ? 'bg-safari-50 dark:bg-safari-900/40 text-safari-600 dark:text-safari-400'
                                    : 'hover:bg-emerald-50/70 dark:hover:bg-emerald-950/60 text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-safari-500/10 text-safari-600 dark:text-safari-400 flex items-center justify-center shrink-0 mt-0.5">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold leading-tight text-gray-950 dark:text-white">
                                    {item.label}
                                  </div>
                                  {item.desc && (
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                                      {item.desc}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 10. Action Book Now CTA Button & Theme Selector */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <ThemeSelector />
            <div className="relative">
              <Link
                to={reachPath}
                title="How to reach Rajaji National Park"
                className="inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2.5 text-sm font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-900/20 dark:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-full transition duration-200"
              >
                <MapPin className="w-4 h-4" />
                Map
              </Link>
              <MapNudge arrowClass="right-[34px]" />
            </div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 text-sm font-bold text-white bg-safari-500 hover:bg-safari-600 active:scale-[0.98] rounded-full shadow-sm hover:shadow-md transition duration-200"
            >
              {bookingLabel}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <ThemeSelector />
            <div className="relative">
              <Link
                to={reachPath}
                aria-label="How to reach Rajaji National Park"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-900/20 dark:border-emerald-500/30 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </Link>
              <MapNudge boxClass="-right-[88px] sm:right-0" arrowClass="right-[100px] sm:right-6" />
            </div>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-safari-500 rounded-full"
            >
              {bookingLabel}
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
        <div className="xl:hidden max-h-[80vh] overflow-y-auto border-t border-emerald-900/15 dark:border-emerald-800/40 bg-white dark:bg-[#07120a] px-4 pt-3 pb-8 space-y-2 shadow-2xl animate-fadeIn">
          {menu.map((entry) => {
            const children = entry.children || [];
            if (children.length === 0) {
              return (
                <Link
                  key={entry.label}
                  to={entry.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {entry.label}
                </Link>
              );
            }
            const isExpanded = !!mobileExpanded[entry.label];
            return (
              <div key={entry.label} className="border-b border-gray-100 dark:border-gray-800/80 pb-2">
                <button
                  onClick={() => toggleMobileGroup(entry.label)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <span>{entry.label}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl my-1">
                    {children.map((subItem) => (
                      <Link
                        key={`${subItem.label}-${subItem.path}`}
                        to={subItem.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-safari-600 dark:hover:text-safari-400"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* 10. Book Now CTA */}
          <div className="pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-safari-500 text-white font-bold text-center text-sm shadow-md active:scale-[0.98] transition"
            >
              {bookingLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
