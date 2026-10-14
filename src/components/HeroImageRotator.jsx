import React, { useEffect, useState } from "react";

/**
 * Full-bleed header photo(s). One image stays fixed; two or more cross-fade
 * every few seconds. Images that fail to load drop out of the rotation, and
 * the fallback is used only when none of them load.
 */
export default function HeroImageRotator({ image, fallbackImage, alt = "", imagePosition = "center 35%", interval = 6000 }) {
  const imageList = (Array.isArray(image) ? image : [image]).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState([]);
  // Start over when the page hands in a different image set.
  const [currentImage, setCurrentImage] = useState(image);
  if (image !== currentImage) {
    setCurrentImage(image);
    setActiveIndex(0);
    setFailedImages([]);
  }
  const visibleImages = imageList.filter((src) => !failedImages.includes(src));
  const displayImages = visibleImages.length ? visibleImages : (fallbackImage ? [fallbackImage] : []);
  // A failed image can shrink the list under the current index.
  const shownIndex = displayImages.length ? activeIndex % displayImages.length : 0;

  useEffect(() => {
    if (displayImages.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % displayImages.length), interval);
    return () => window.clearInterval(timer);
  }, [displayImages.length, interval]);

  return displayImages.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={index === 0 ? alt : ""}
      aria-hidden={index !== 0}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] motion-reduce:transition-none ${index === shownIndex ? "opacity-100" : "opacity-0"}`}
      style={{ objectPosition: imagePosition }}
      onError={() => setFailedImages((failed) => [...failed, src])}
    />
  ));
}
