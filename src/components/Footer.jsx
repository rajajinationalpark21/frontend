import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-12 pb-24 sm:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Rajaji Tiger Reserve Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight block leading-none">
                  Rajaji
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                  Tiger Reserve
                </span>
              </div>
            </Link>

            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Protecting 820 sq km of wild Himalayan foothills and Asian elephant corridors across Uttarakhand since 1983.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-1">
              <a href="tel:+919660871429" className="inline-flex items-center gap-1.5 hover:text-safari-600 dark:hover:text-safari-400 transition">
                <Phone className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" />
                +91-9660871429
              </a>
              <a href="mailto:wildbrookrajaji@gmail.com" className="inline-flex items-center gap-1.5 hover:text-safari-600 dark:hover:text-safari-400 transition">
                <Mail className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" />
                wildbrookrajaji@gmail.com
              </a>
            </div>
          </div>

          {/* Column 1: Safaris & Visiting */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Plan Your Safari
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/safari" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Safari Overview
                </Link>
              </li>
              <li>
                <Link to="/safari/zones" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Safari Zones & Gates
                </Link>
              </li>
              <li>
                <Link to="/safari/tickets" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Tariffs & Permits
                </Link>
              </li>
              <li>
                <Link to="/how-to-reach" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  How To Reach
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore & Sanctuary */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  About the Park
                </Link>
              </li>
              <li>
                <Link to="/wildlife/birds" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Avian & Wildlife
                </Link>
              </li>
              <li>
                <Link to="/stay" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Stay & Eco-Lodges
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Wilderness Journal
                </Link>
              </li>
              <li>
                <a href="/#reviews" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Visitor Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Direct Link */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Assistance
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/booking" className="inline-flex items-center gap-1 text-safari-600 dark:text-safari-400 font-semibold hover:underline">
                  Online Permit Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/safari/rules" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Park Regulations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Rajaji Tiger Reserve & National Park. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <Link to="/safari/rules" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Rules</Link>
            <Link to="/how-to-reach" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Directions</Link>
            <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Permit Office</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
