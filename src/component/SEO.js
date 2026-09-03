import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getStaticSeo } from "../data/seo";

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
  const staticSeo = getStaticSeo(pathname);
  const seoTitle = staticSeo?.title || title || metadata.title;
  const seoDescription =
    staticSeo?.description || description || metadata.description;
  const schemaType = staticSeo?.schemaType || (article ? "Article" : "Physician");
  const canonicalUrl = new URL(pathname, metadata.siteUrl).toString();
  const imageUrl = image ? new URL(image, metadata.siteUrl).toString() : null;
  const physicianData = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: metadata.author,
    url: metadata.siteUrl,
    ...(schemaType === "Physician" && {
      medicalSpecialty: "Orthopedic",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
      telephone: "+91 86577 90513",
      email: "contact@drmuditkhanna.com",
    }),
    ...(schemaType !== "Physician" && {
      headline: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      author: {
        "@type": "Physician",
        name: metadata.author,
      },
    }),
  };

  return (
    <>
      <html lang="en" />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {staticSeo?.keywords && (
        <meta name="keywords" content={staticSeo.keywords} />
      )}
      <meta name="author" content={metadata.author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        property="og:type"
        content={schemaType === "Article" ? "article" : "website"}
      />
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
      <script type="application/ld+json">{JSON.stringify(physicianData)}</script>
    </>
  );
};

export default SEO;
