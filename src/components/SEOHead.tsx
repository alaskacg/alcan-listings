import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
}

const SEOHead = ({
  title = "Alcan Listings - Interior Alaska's Premier Private Listings Marketplace",
  description = "Interior Alaska's premier private listings marketplace for vehicles, boats, real estate, land, mining equipment, and guide services. Post your listing for just $10—no commissions, no middleman.",
  canonical = "https://alcanlistings.com",
  type = "website",
  image,
}: SEOHeadProps) => {
  const fullTitle = title.includes('Alcan Listings') ? title : `${title} | Alcan Listings`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Alcan Listings",
    "url": "https://alcanlistings.com",
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://alcanlistings.com/browse?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alaska Listings LLC",
      "url": "https://aklistings.com",
      "areaServed": {
        "@type": "State",
        "name": "Alaska"
      }
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
