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
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-safari-50 flex items-center justify-center text-safari-500">
                <svg className="w-6 h-6 fill-safari-500" viewBox="0 0 24 24">
                  <path d="m12 2 4 6h-3l4 6h-3l3 6H4l3-6H4l4-6H5l7-6z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Jungle Safari
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Protecting the wild since 1983 across the Shiwalik foothills. Join us in our mission to conserve nature while experiencing its raw beauty through sustainable, zero-disturbance expeditions in Rajaji National Park.
            </p>
            <div className="text-xs text-gray-600 space-y-1 pt-1">
              <p>📍 5/1 Ansari Road, Dehradun, Uttarakhand</p>
              <p>📞 <a href="tel:+919660871429" className="hover:text-safari-600 transition">+91-9660871429</a> | <a href="tel:01352621669" className="hover:text-safari-600 transition">0135-2621669</a></p>
              <p>✉️ <a href="mailto:wildbrookrajaji@gmail.com" className="hover:text-safari-600 transition">wildbrookrajaji@gmail.com</a></p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-safari-50 flex items-center justify-center text-gray-600 hover:text-safari-600 transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-safari-50 flex items-center justify-center text-gray-600 hover:text-safari-600 transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-safari-50 flex items-center justify-center text-gray-600 hover:text-safari-600 transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-safari-600 transition">
                  Safari Zones
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-safari-600 transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-safari-600 transition">
                  Wild Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-safari-600 transition">
                  Wilderness Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-safari-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-safari-600 transition">
                  Contact & Location
                </Link>
              </li>
              <li>
                <a href="#conservation" className="text-gray-600 hover:text-safari-600 transition">
                  Conservation Trust
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 hover:text-safari-600 transition">
                  Careers & Volunteering
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support / Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Get seasonal sighting reports and conservation updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-safari-500 focus:bg-white transition"
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
        <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Jungle Safari Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-900 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-900 transition">Terms of Service</a>
            <a href="#sitemap" className="hover:text-gray-900 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
