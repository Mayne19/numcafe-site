import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'website' | 'article' | 'organization';
  data?: {
    title?: string;
    description?: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    category?: string;
    url?: string;
  };
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Remove any existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    let structuredData: any = {};

    if (type === 'website') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Numcafé",
        "alternateName": "Numcafe",
        "url": "https://numcafe.com",
        "description": "Actualité numérique, tendances tech et intelligence artificielle expliquées simplement. Guides, outils IA gratuits et nouveautés numériques.",
        "publisher": {
          "@type": "Organization",
          "name": "Numcafé",
          "logo": {
            "@type": "ImageObject",
            "url": "https://numcafe.com/logo.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://numcafe.com/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://twitter.com/numcafe",
          "https://linkedin.com/company/numcafe",
          "https://instagram.com/numcafe"
        ]
      };
    } else if (type === 'organization') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Numcafé",
        "alternateName": "Numcafe",
        "url": "https://numcafe.com",
        "logo": "https://numcafe.com/logo.png",
        "description": "Média digital moderne spécialisé dans l'actualité numérique, les tendances tech et l'intelligence artificielle.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "url": "https://numcafe.com/contact",
          "availableLanguage": ["French"]
        },
        "sameAs": [
          "https://twitter.com/numcafe",
          "https://linkedin.com/company/numcafe",
          "https://instagram.com/numcafe"
        ]
      };
    } else if (type === 'article' && data) {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title || "",
        "description": data.description || "",
        "image": data.image || "https://numcafe.com/og-image.jpg",
        "author": {
          "@type": "Person",
          "name": data.author || "Mayne",
          "url": "https://numcafe.com/a-propos"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Numcafé",
          "logo": {
            "@type": "ImageObject",
            "url": "https://numcafe.com/logo.png"
          }
        },
        "datePublished": data.datePublished || new Date().toISOString(),
        "dateModified": data.dateModified || data.datePublished || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.url || "https://numcafe.com"
        },
        "articleSection": data.category || "Actualité Numérique",
        "keywords": "actualité numérique, tendances tech, intelligence artificielle, culture digitale, nouveautés numériques, innovations",
        "inLanguage": "fr-FR"
      };
    }

    // Create and append the script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}
