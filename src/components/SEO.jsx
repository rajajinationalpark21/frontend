import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchContent } from '../api/client';
import { ROUTE_SEO, breadcrumbTrail, canonicalPath, sectionSeo } from '../seo/routes';
import { breadcrumbSchema } from '../seo/schema';
import { SITE_URL } from '../seo/site';

const absoluteUrl = (value) =>
  /^https?:\/\//.test(value) ? value : `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;

/**
 * Lightweight native SEO manager component for React SPA.
 * Updates document.title, meta descriptions, canonical URLs,
 * OpenGraph, Twitter Cards, and injects Schema.org JSON-LD.
 *
 * Static pages take their title/description from the SEO settings of their CMS
 * section (edited in the admin panel), then from `seo/routes.js`; the props are
 * for pages whose metadata comes from elsewhere in the CMS (safari zones, blog posts).
 */
export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  schemaJson,
  noindex = false,
}) {
  const location = useLocation();
  const path = canonicalPath(location.pathname);
  const page = ROUTE_SEO[path];
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (!page?.section) return;
    fetchContent().then((res) => setContent(res.data)).catch(() => {});
  }, [page?.section]);
  const cms = sectionSeo(content, page);
  const currentUrl = `${SITE_URL}${path}`;
  const finalImage = absoluteUrl(ogImage || '/og-image.png');

  const pageTitle = cms.title || page?.title || title || 'Rajaji National Park';
  // A title set in the admin panel is used exactly as written.
  const fullTitle = (cms.title || pageTitle.includes('Rajaji'))
    ? pageTitle
    : `${pageTitle} | Rajaji National Park`;
  const finalDescription = cms.description || page?.description || description || '';
  const finalKeywords = cms.keywords || page?.keywords || keywords;

  const trail = noindex ? [] : breadcrumbTrail(path, title?.split(' | ')[0]);
  const schemas = [
    ...(Array.isArray(schemaJson) ? schemaJson : schemaJson ? [schemaJson] : []),
    ...(trail.length > 0 ? [breadcrumbSchema(trail, SITE_URL)] : []),
  ];
  const schemaText = schemas.length > 0 ? JSON.stringify(schemas) : '';

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
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    if (finalKeywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    }
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 3. Open Graph / Facebook / WhatsApp
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

    // 4. Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
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

    if (schemaText) {
      const script = document.createElement('script');
      script.id = 'page-json-ld';
      script.type = 'application/ld+json';
      script.textContent = schemaText;
      document.head.appendChild(script);
    }
  }, [fullTitle, finalDescription, finalKeywords, finalImage, currentUrl, ogType, schemaText, noindex]);

  return null;
}
