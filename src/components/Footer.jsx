import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Ticket, ShieldCheck, Compass, HelpCircle } from 'lucide-react';
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
  const brandDesc = footerData.brandDesc || contactInfo.footerBrand.desc;
  const address = contact.address || contactInfo.address;
  const phone = contact.phone || contactInfo.phone;
  const secondaryPhone = contact.secondaryPhone || contactInfo.secondaryPhone;
  const email = contact.email || contactInfo.email;
  const youtubeUrl = social.youtube || contactInfo.social.youtube;
  const instagramUrl = social.instagram || contactInfo.social.instagram;

  // Active zones list
  const zones = (content?.safari?.zones && content.safari.zones.length > 0)
    ? content.safari.zones
    : safariZonesList;

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-12 pb-24 sm:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid strictly based on Client Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">
          
          {/* Column 1: Brand & Official Contact Desk */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm shrink-0 group-hover:scale-105 transition">
                <img 
                  src="/logo.png" 
                  alt="Rajaji Tiger Reserve Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight block leading-tight">
                  {brandTitle}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400 block mt-0.5">
                  Official Safari Booking Portal
                </span>
              </div>
            </Link>

            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              {brandDesc}
            </p>

            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-safari-600 dark:text-safari-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-safari-600 dark:text-safari-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-semibold text-safari-600 dark:text-safari-400 hover:underline">
                  {phone}
                </a>
                {secondaryPhone && (
                  <>
                    <span className="text-gray-400">|</span>
                    <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`} className="hover:underline">
                      {secondaryPhone}
                    </a>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-safari-600 dark:text-safari-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline text-gray-700 dark:text-gray-200">
                  {email}
                </a>
              </div>
            </div>

            {/* Social Icons & Booking Button */}
            <div className="flex items-center gap-3 pt-2">
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on YouTube"
                  className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rajaji Safari on Instagram"
                  className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              <Link
                to="/booking"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safari-600 hover:bg-safari-700 text-white text-xs font-bold transition ml-1"
              >
                <Ticket className="w-3.5 h-3.5" /> Book Online
              </Link>
            </div>
          </div>

          {/* Column 2: 7 Safari Zones */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5">
              Jungle Safari Zones
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {zones.map((z, idx) => (
                <li key={idx}>
                  <Link
                    to={z.slug ? `/${z.slug}` : `/zones`}
                    className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition block truncate"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/zones" className="text-safari-600 dark:text-safari-400 font-semibold hover:underline block pt-1">
                  View All Zones Overview →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Wildlife & Biodiversity (5 Sub-pages) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Wildlife & Biodiversity
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <Link to="/wildlife" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Wildlife Overview Hub
                </Link>
              </li>
              <li>
                <Link to="/mammals-of-rajaji-tiger-reserve" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Mammals of Rajaji (Tigers & Elephants)
                </Link>
              </li>
              <li>
                <Link to="/birds-of-rajaji-national-park" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Birds of Rajaji (400+ Species)
                </Link>
              </li>
              <li>
                <Link to="/butterflies-of-rajaji-national-park" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Butterflies of Rajaji
                </Link>
              </li>
              <li>
                <Link to="/reptiles-of-rajaji-tiger-reserve" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Reptiles of Rajaji (King Cobra & Pythons)
                </Link>
              </li>
              <li>
                <Link to="/flora-of-rajaji-national-park" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Flora of Rajaji (Sal & Medicinal Plants)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Activities, Tariffs & Policies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Activities & Rules
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/activities" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Activities at Rajaji
                </Link>
              </li>
              <li>
                <Link to="/rafting" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Ganges River Rafting
                </Link>
              </li>
              <li>
                <Link to="/stay" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Stay in Rajaji (FRH & Resorts)
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Tickets, Fees & Charges
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Terms & Cancellation Rules
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-safari-600 dark:hover:text-safari-400 transition">
                  Contact Safari Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} {brandTitle}. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <Link to="/tickets" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Tickets & Charges</Link>
            <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Terms & Refunds</Link>
            <Link to="/faq" className="hover:text-gray-700 dark:hover:text-gray-300 transition">FAQ</Link>
            <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
