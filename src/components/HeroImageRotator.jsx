import React, { useEffect, useState } from "react";

// Cloudinary serves resized copies when a transformation follows "/upload/".
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;
const cloudinary = (src, transform) => {
  const match = typeof src === "string" ? src.match(CLOUDINARY_UPLOAD) : null;
  return match ? `${match[1]}${transform}/${match[2]}` : null;
};
const WIDTHS = [768, 1280, 1920];
const srcSetFor = (src) => {
  if (!cloudinary(src, "x")) return undefined;
  return WIDTHS.map((width) => `${cloudinary(src, `f_auto,q_auto,w_${width}`)} ${width}w`).join(", ");
};

/**
 * Full-bleed header photo(s). One image stays fixed; two or more cross-fade
 * every few seconds. Images that fail to load drop out of the rotation, and
 * the fallback is used only when none of them load.
 *
 * Cloudinary photos show a tiny blurred copy at once and fade to a copy sized
 * for the screen when it arrives, so the header is never a black box.
 */
export default function HeroImageRotator({ image, fallbackImage, alt = "", imagePosition = "center 35%", interval = 6000 }) {
  const imageList = (Array.isArray(image) ? image : [image]).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  // Start over when the page hands in a different image set.
  const [currentImage, setCurrentImage] = useState(image);
  if (image !== currentImage) {
    setCurrentImage(image);
    setActiveIndex(0);
    setFailedImages([]);
    setLoadedImages([]);
  }
  const visibleImages = imageList.filter((src) => !failedImages.includes(src));
  const displayImages = visibleImages.length ? visibleImages : (fallbackImage ? [fallbackImage] : []);
  // A failed image can shrink the list under the current index.
  const shownIndex = displayImages.length ? activeIndex % displayImages.length : 0;
  const placeholder = cloudinary(displayImages[0], "f_auto,q_30,w_48,e_blur:600");
  const markLoaded = (src) => setLoadedImages((loaded) => (loaded.includes(src) ? loaded : [...loaded, src]));

  useEffect(() => {
    if (displayImages.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % displayImages.length), interval);
    return () => window.clearInterval(timer);
  }, [displayImages.length, interval]);

  return (
    <>
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
          style={{ objectPosition: imagePosition }}
        />
      )}
      {displayImages.map((src, index) => (
        <img
          key={src}
          src={cloudinary(src, "f_auto,q_auto,w_1920") || src}
          srcSet={srcSetFor(src)}
          sizes="100vw"
          alt={index === 0 ? alt : ""}
          aria-hidden={index !== 0}
          fetchPriority={index === 0 ? "high" : "low"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] motion-reduce:transition-none ${
            index === shownIndex && (loadedImages.includes(src) || !placeholder) ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: imagePosition }}
          // A cached photo can finish before React attaches onLoad, so also check on mount.
          ref={(element) => { if (element?.complete && element.naturalWidth > 0) markLoaded(src); }}
          onLoad={() => markLoaded(src)}
          onError={() => setFailedImages((failed) => [...failed, src])}
        />
      ))}
    </>
  );
}
