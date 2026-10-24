import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Ticket } from 'lucide-react';
import { contactInfo, safariZonesList } from '../data/safariData';
import { fetchContent } from '../api/client';

export default function Footer() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent()
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);

  const settings = content?.settings || {};
  const contact = settings.contact || {};
  const social = settings.social || {};
  const footerData = settings.footer || {};

  const brandTitle = footerData.brandTitle || contactInfo.footerBrand.title;
  // The footer brand line of the client's Tickets document ("RAJAJI NATIONAL PARK – SAFARI BOOKING").
  const footerDisplayTitle = footerData.brandTitle || footerData.brandShortTitle || "Rajaji Safari";
  const brandDesc = footerData.brandDesc;
  const address = contact.address || contactInfo.address;
  const phone = contact.phone || contactInfo.phone;
  const secondaryPhone = contact.secondaryPhone || contactInfo.secondaryPhone;
  const tertiaryPhone = contact.tertiaryPhone || contactInfo.tertiaryPhone;
  const email = contact.email || contactInfo.email;
  const youtubeUrl = social.youtube || contactInfo.social.youtube;
  const instagramUrl = social.instagram || contactInfo.social.instagram;
  const facebookUrl = social.facebook;
  const twitterUrl = social.twitter;
  const telegramUrl = social.telegram;

  // Active zones list
  const zones = (content?.safari?.zones && content.safari.zones.length > 0)
    ? content.safari.zones
    : safariZonesList;

  return (
    <footer className="bg-[#07120a] text-gray-200 border-t border-safari-900/30 pt-10 pb-20 sm:pb-10 transition-colors relative overflow-hidden">
      {/* Ambient Botanical Pattern Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none pattern-leaf-delicate invert"
      />

      {/* Subtle Royal Bengal Tiger Watermark in Footer Corner */}
      <div 
        className="absolute -bottom-10 right-4 w-72 sm:w-96 h-80 sm:h-96 opacity-[0.07] pointer-events-none bg-contain bg-right-bottom bg-no-repeat"
        style={{ 
          backgroundImage: `url("/images/tiger%20for%20bg%20overlay.jpg")`, 
          filter: 'invert(1) brightness(1.2)', 
          mixBlendMode: 'screen' 
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid strictly based on Client Structure */}
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-3 md:gap-10">
          
          {/* Column 1: Brand & Official Contact Desk */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center border border-gray-100 dark:border-emerald-900/60 shadow-sm shrink-0 group-hover:scale-105 transition">
                <img 
                  src="/logo.png" 
                  alt="Rajaji National Park logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white tracking-tight block leading-tight">
                  {footerDisplayTitle}
                </span>
              </div>
            </Link>

            {brandDesc && <p className="text-xs leading-relaxed text-gray-400 max-w-sm">{brandDesc}</p>}

            <div className="space-y-1.5 text-xs text-gray-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><span className="font-semibold text-gray-200">Address:</span> {address}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-semibold text-emerald-400 hover:underline">
                  {phone}
                </a>
                {[secondaryPhone, tertiaryPhone].filter(Boolean).map((number) => (
                  <React.Fragment key={number}>
                    <span className="text-gray-500">|</span>
                    <a href={`tel:${number.replace(/\s+/g, '')}`} className="hover:underline text-gray-300">
                      {number}
                    </a>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline text-gray-300">
                  {email}
                </a>
              </div>
            </div>

            {/* Social icons in the client's order (Instagram, Facebook, Telegram, YouTube, X) and the booking button */}
            <div className="flex items-center gap-3 pt-2">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on Instagram"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-pink-400 flex items-center justify-center hover:scale-110 transition shadow-sm hover:bg-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on Facebook"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-blue-400 flex items-center justify-center hover:scale-110 transition shadow-sm hover:bg-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
              )}
              {telegramUrl && (
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on Telegram"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-sky-400 flex items-center justify-center hover:scale-110 transition shadow-sm hover:bg-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on YouTube"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-400 flex items-center justify-center hover:scale-110 transition shadow-sm hover:bg-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on X (Twitter)"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-gray-200 flex items-center justify-center hover:scale-110 transition shadow-sm hover:bg-white/10"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              <Link
                to="/booking"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-safari-500 hover:bg-safari-400 text-white text-xs font-bold transition ml-1 shadow-md"
              >
                <Ticket className="w-3.5 h-3.5" /> Book Online
              </Link>
            </div>
          </div>

          {/* Column 2: 7 Safari Zones */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-white flex items-center gap-1.5">
              Safari zones
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {zones.slice(0, 4).map((z, idx) => (
                <li key={idx}>
                  <Link
                    to={z.slug ? `/${z.slug}` : `/zones`}
                    className="text-gray-400 hover:text-emerald-400 transition block truncate"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/zones" className="text-emerald-400 font-semibold hover:underline block pt-1">
                  View All Zones Overview →
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              Plan your visit
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/activities" className="text-gray-400 hover:text-emerald-400 transition">
                  Activities at Rajaji
                </Link>
              </li>
              <li>
                <Link to="/rajaji-national-park-jeep-safari-tickets-entry-fees-charges" className="text-gray-400 hover:text-emerald-400 transition">
                  Tickets, Fees & Charges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-emerald-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition">
                  Contact Safari Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} {brandTitle}. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <Link to="/about" className="hover:text-gray-700 dark:hover:text-gray-300 transition">About Rajaji</Link>
            <Link to="/rajaji-national-park-jeep-safari-tickets-entry-fees-charges" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Tickets & Charges</Link>
            <Link to="/rajaji-jeep-safari-terms-conditions-cancellation-refund" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Terms & Refunds</Link>
            <Link to="/faq" className="hover:text-gray-700 dark:hover:text-gray-300 transition">FAQ</Link>
            <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
