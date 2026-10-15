import React from "react";
import HeroImageRotator from "./HeroImageRotator";

/**
 * The shared full-bleed page heading used across the public site. Every page
 * gets the same height, centred type and soft vignette; only the photo, its
 * framing and the copy change. Calls to action live in the page body and the
 * floating action buttons, never over the photo.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  fallbackImage,
  alt = "",
  imagePosition = "center 35%",
}) {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-[#07120a] text-center sm:min-h-[640px] lg:min-h-[700px]">
      <div className="absolute inset-0 overflow-hidden">
        <HeroImageRotator image={image} fallbackImage={fallbackImage} alt={alt} imagePosition={imagePosition} />
        {/* Soft neutral vignette keeping photo bright & vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Long document titles ("Chilla Range – Rajaji National Park | ...") get a smaller size. */}
          <h1
            className={`mb-4 font-serif font-bold tracking-tight text-white ${
              String(title || "").length > 48 ? "text-3xl sm:text-4xl md:text-5xl" : "text-4xl sm:text-5xl md:text-6xl"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-gray-200/95 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
