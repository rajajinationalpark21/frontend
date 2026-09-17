import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import { safariImages } from '../data/safariData';

export default function CallToAction({
  title = "Ready to Answer the Call of the Wild?",
  subtitle = "Daily gypsy permits and visitor quotas are strictly capped to ensure minimal disturbance to wildlife. Plan your adventure early to secure your spot in the heart of nature.",
  primaryText = "Book Permit Now",
  primaryIcon: PrimaryIcon = Ticket,
  primaryLink,
  onPrimaryClick,
  secondaryText,
  secondaryIcon: SecondaryIcon,
  secondaryLink,
  onSecondaryClick,
  badges = [
    { icon: ShieldCheck, text: "Official Forest E-Permits" },
    { icon: Compass, text: "4x4 Gypsy & Registered Guides" },
    { icon: CheckCircle2, text: "Instant Quota Confirmation" }
  ],
  bgImage,
  className = "",
  containerClassName = "",
  showArrow = true,
}) {
  const isExternalOrTel = (link) => {
    if (!link) return false;
    return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('tel:') || link.startsWith('mailto:');
  };

  return (
    <section className={`py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-black/40 transition-colors ${className}`}>
      <div className={`max-w-6xl mx-auto rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#05160d] via-[#072012] to-[#020b06] text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-safari-500/20 text-center ${containerClassName}`}>
        
        {/* Crisp Background Forest Imagery */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url("${bgImage || safariImages.homeHero || safariImages.mistyDarkPines}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/75 pointer-events-none" />

        {/* Inner Content */}
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            {/* Primary Button */}
            {primaryLink ? (
              <Link
                to={primaryLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-400 text-white font-bold text-sm shadow-xl shadow-safari-500/25 hover:shadow-safari-400/40 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                {PrimaryIcon && <PrimaryIcon className="w-4 h-4 shrink-0" />}
                <span>{primaryText}</span>
                {showArrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onPrimaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-safari-500 hover:bg-safari-400 text-white font-bold text-sm shadow-xl shadow-safari-500/25 hover:shadow-safari-400/40 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                {PrimaryIcon && <PrimaryIcon className="w-4 h-4 shrink-0" />}
                <span>{primaryText}</span>
                {showArrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />}
              </button>
            )}

            {/* Secondary Button */}
            {secondaryText && (
              <>
                {secondaryLink ? (
                  isExternalOrTel(secondaryLink) ? (
                    <a
                      href={secondaryLink}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm active:scale-95 transition duration-200 cursor-pointer"
                    >
                      {SecondaryIcon && <SecondaryIcon className="w-4 h-4 text-safari-400 shrink-0" />}
                      <span>{secondaryText}</span>
                    </a>
                  ) : (
                    <Link
                      to={secondaryLink}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm active:scale-95 transition duration-200 cursor-pointer"
                    >
                      {SecondaryIcon && <SecondaryIcon className="w-4 h-4 text-safari-400 shrink-0" />}
                      <span>{secondaryText}</span>
                    </Link>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={onSecondaryClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm active:scale-95 transition duration-200 cursor-pointer"
                  >
                    {SecondaryIcon && <SecondaryIcon className="w-4 h-4 text-safari-400 shrink-0" />}
                    <span>{secondaryText}</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Trust Badges */}
          {badges && badges.length > 0 && (
            <div className={`grid grid-cols-1 ${badges.length === 2 ? 'sm:grid-cols-2' : badges.length === 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-3'} gap-3.5 pt-8 mt-6 border-t border-white/10 max-w-2xl mx-auto`}>
              {badges.map((badge, idx) => {
                const BadgeIcon = badge.icon || CheckCircle2;
                const justifyClass = badges.length > 1
                  ? idx === 0 
                    ? 'sm:justify-start' 
                    : idx === badges.length - 1 
                      ? 'sm:justify-end' 
                      : ''
                  : '';
                return (
                  <div key={idx} className={`flex items-center justify-center ${justifyClass} gap-2 text-xs text-gray-300 font-medium`}>
                    <BadgeIcon className="w-4 h-4 text-safari-400 shrink-0" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
