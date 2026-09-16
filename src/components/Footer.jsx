import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-28 sm:pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Rajaji Tiger Reserve Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight block leading-none">
                  Rajaji
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                  Tiger Reserve
                </span>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Protecting 820 sq km of wild Shivalik foothills since 1983. Preserving Asian elephants, Bengal tigers, and 400+ avian species through sustainable, low-impact eco-tourism.
            </p>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 pt-1">
              <p>📍 5/1 Ansari Road, Dehradun, Uttarakhand 248001</p>
              <p>📞 <a href="tel:+919660871429" className="hover:text-safari-600 transition">+91-9660871429 (Booking)</a> | <a href="tel:01352621669" className="hover:text-safari-600 transition">0135-2621669</a></p>
              <p>✉️ <a href="mailto:wildbrookrajaji@gmail.com" className="hover:text-safari-600 transition">wildbrookrajaji@gmail.com</a></p>
            </div>
          </div>

          {/* Column 1: Plan Safaris */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Plan Safaris
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/safari" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Safari Overview
                </Link>
              </li>
              <li>
                <Link to="/safari/zones" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Safari Zones
                </Link>
              </li>
              <li>
                <Link to="/safari/tickets" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Tickets & Tariffs
                </Link>
              </li>
              <li>
                <Link to="/safari/rules" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Park Rules
                </Link>
              </li>
              <li>
                <Link to="/how-to-reach" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  How To Reach
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Wildlife & Nature */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Wildlife & Nature
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/wildlife/birds" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Birds of Rajaji
                </Link>
              </li>
              <li>
                <Link to="/wildlife/birding-areas" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Birding Trails
                </Link>
              </li>
              <li>
                <Link to="/wildlife/fauna" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Wildlife (Fauna)
                </Link>
              </li>
              <li>
                <Link to="/wildlife/flora" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Forests (Flora)
                </Link>
              </li>
              <li>
                <Link to="/wildlife/butterflies" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Butterflies & Insects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay & Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Stay & Discover
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/stay" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Stay in Rajaji (FRH)
                </Link>
              </li>
              <li>
                <Link to="/eco-tourism" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Eco-Tourism & Green
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  About the Reserve
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Contact & Permits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Wild Updates
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Seasonal birding reports and safari booking window alerts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-safari-500 transition text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-safari-500 hover:bg-safari-600 rounded-lg transition duration-200 flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" /> Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Rajaji Tiger Reserve & National Park. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/safari/rules" className="hover:text-gray-900 dark:hover:text-white transition">Park Rules</Link>
            <Link to="/how-to-reach" className="hover:text-gray-900 dark:hover:text-white transition">How To Reach</Link>
            <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition">Permit Office</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
