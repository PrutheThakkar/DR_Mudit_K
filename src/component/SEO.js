import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const SEO = ({ title, description, pathname = "/", image, article = false, noIndex = false }) => {
  const { site } = useStaticQuery(graphql`
    query SeoMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `);
  const metadata = site.siteMetadata;
  const seoTitle = title || metadata.title;
  const seoDescription = description || metadata.description;
  const canonicalUrl = new URL(pathname, metadata.siteUrl).toString();
  const imageUrl = image ? new URL(image, metadata.siteUrl).toString() : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: metadata.author,
    url: metadata.siteUrl,
    medicalSpecialty: "Orthopedic",
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    telephone: "+91 86577 90513",
    email: "contact@drmuditkhanna.com",
  };

  return (
    <>
      <html lang="en" />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="author" content={metadata.author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:locale" content="en_IN" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  );
};

export default SEO;
