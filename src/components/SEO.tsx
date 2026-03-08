import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  page: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    schema?: any;
  };
}

const SEO: React.FC<SEOProps> = ({ page }) => {
  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={page.ogTitle} />
      <meta property="og:description" content={page.ogDescription} />
      <meta property="og:image" content={page.ogImage} />
      
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": page.title,
            "description": page.description,
            "image": page.ogImage,
            "publisher": {
              "@type": "Organization",
              "name": "Arvie Benito",
              "logo": {
                "@type": "ImageObject",
                "url": "https://arviebenito.com/public/vite.svg"
              }
            }
          }, null, 2)
        }
      </script>
    </Helmet>
  );
};

export default SEO;