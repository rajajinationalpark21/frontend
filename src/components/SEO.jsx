import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight native SEO manager component for React SPA.
 * Updates document.title, meta descriptions, canonical URLs,
 * OpenGraph, Twitter Cards, and injects Schema.org JSON-LD.
 */
export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  schemaJson,
}) {
  const location = useLocation();
  const siteUrl = 'https://junglesafari.org';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=85';
  const finalImage = ogImage || defaultImage;

  const fullTitle = title.includes('Jungle Safari') 
    ? title 
    : `${title} | Jungle Safari National Reserve`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to create or update meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Open Graph / Facebook / WhatsApp
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Jungle Safari National Reserve');

    // 4. Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalImage);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data
    const existingScript = document.getElementById('page-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaJson) {
      const script = document.createElement('script');
      script.id = 'page-json-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, keywords, finalImage, currentUrl, ogType, schemaJson]);

  return null;
}
