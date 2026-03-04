import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  url?: string;
}

export function SEOHead({
  title = "Numcafé - Actualité Numérique, Intelligence Artificielle & Tendances Tech",
  description = "Découvrez l'actualité numérique, les tendances tech et l'intelligence artificielle expliquées simplement. Guides, outils IA gratuits et nouveautés numériques avec votre dose quotidienne de café digital.",
  keywords = "actualité numérique, tendances tech, intelligence artificielle, culture digitale, nouveautés numériques, innovations, futur du numérique, guides numériques, outils IA, technologie simple, comprendre le numérique, outils IA gratuits, tech, technologique, café, café digital", 
  ogImage = "https://numcafe.com/og-image.jpg",
  ogType = "website",
  canonical,
  url = "https://numcafe.com",
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags (avec URLs complètes)
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', 'Numcafé', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@numcafe');
    updateMetaTag('twitter:creator', '@numcafe');

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('author', 'Numcafé');
    updateMetaTag('language', 'French');
    updateMetaTag('content-language', 'fr');
    updateMetaTag('revisit-after', '7 days');

    // Canonical URL
    if (canonical || url) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical || url);
    }
  }, [title, description, keywords, ogImage, ogType, canonical, url]);

  return null;
}