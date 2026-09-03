import React from "react";
import { graphql } from "gatsby";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import SEO from "../component/SEO";
import { getExpertisePage } from "../data/expertise";

const wordpressSectionHeadings = [
  "Regenerative Options Offered",
  "Clinical Evidence Shows:",
  "Core Pain Management Services",
  "Key Benefits:",
];

const wordpressHighlightItems = [
  "Significant pain reduction and functional improvement in knee osteoarthritis at 6–12 months",
  "Multiple injections (2–3 doses) often yield better outcomes than single treatments",
  "Safe, autologous (no risk of allergic reaction), minimal downtime",
  "Structured physiotherapy",
  "Activity modification",
  "Pain management (including CRFA if needed)",
  "Nutritional and lifestyle optimization",
  "Hip and shoulder arthritis",
  "Tennis elbow, golfer’s elbow",
  "Rotator cuff tendinopathy",
  "Early meniscal degeneration",
  "Post-surgical joint stiffness or incomplete recovery",
  "Rapid, meaningful pain reduction",
  "Functional improvement and return to daily activities",
  "Minimal downtime and low procedural risk",
  "Personalized plans based on diagnosis, severity, and patient goals",
  "Up to 12–24 months of sustained pain relief in eligible patients",
  "Superior outcomes vs. hyaluronic acid injections in clinical trials",
  "Safe, outpatient procedure with quick recovery",
  "Ideal for patients who haven’t responded to medications, physiotherapy, or injections",
  "Pre-emptive analgesia",
  "Local infiltration techniques",
  "Adductor canal blocks (ultrasound-guided nerve targeting)",
  "Tailored medication cocktails to minimize opioid use",
  "Persistent knee, hip, or shoulder pain despite conservative care",
  "Osteoarthritis limiting daily function",
  "Post-injury or post-surgical chronic pain",
  "Desire to delay or avoid joint replacement surgery",
];

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const formatWordPressContent = content => {
  let formatted = content || "";

  wordpressSectionHeadings.forEach(heading => {
    formatted = formatted.replace(
      new RegExp(
        `<p class="wp-block-paragraph">${escapeRegExp(heading)}</p>`,
        "g"
      ),
      `<h2 class="wp-content-section-title">${heading}</h2>`
    );
  });

  wordpressHighlightItems.forEach(item => {
    formatted = formatted.replace(
      new RegExp(
        `<p class="wp-block-paragraph">${escapeRegExp(item)}</p>`,
        "g"
      ),
      `<p class="wp-content-highlight">${item}</p>`
    );
  });

  return formatted.replace(
    /<p class="wp-block-paragraph">([^<]+)<br\s*\/?>([\s\S]*?)<\/p>/g,
    '<section class="wp-content-feature"><h2>$1</h2><p>$2</p></section>'
  );
};

const ExpertiseTemplate = ({ data, pageContext }) => {
  const fallback = getExpertisePage(pageContext.slug);
  const wordpressExpertise = data?.allWpExpertiseAll?.nodes?.[0];
  const bannerTitle = wordpressExpertise?.commonBannerImage?.pageTitle;
  const highlightedTitle =
    wordpressExpertise?.title || fallback?.highlightedTitle;
  const title = bannerTitle
    ? bannerTitle.replace(new RegExp(`${highlightedTitle}$`, "i"), "").trim()
    : fallback?.title;
  const wordpressItems = wordpressExpertise?.expertisePost?.expertisePostList;
  const useWordPressBody =
    ["regenerative-treatment", "pain-management"].includes(pageContext.slug) &&
    Boolean(wordpressExpertise?.content);
  const items = wordpressItems?.length
    ? wordpressItems.map((item, index) => ({
        title: item.title,
        description: item.para,
        image: item.image?.node?.sourceUrl || fallback?.items?.[index]?.image,
      }))
    : fallback?.items || [];

  return (
    <Layout>
      <div className="expertise-listing-page">
        <InsideBanner
          title={title || "Expert Care For"}
          highlightedTitle={highlightedTitle}
          image={
            wordpressExpertise?.commonBannerImage?.bannerImage?.node
              ?.sourceUrl || fallback?.bannerImage
          }
          imageAlt={
            wordpressExpertise?.commonBannerImage?.bannerImage?.node?.altText ||
            fallback?.bannerAlt ||
            highlightedTitle
          }
          description={null}
        />

        <section
          className="expertise-listing"
          aria-label={`${highlightedTitle} expertise`}
        >
          <div className="container">
            {useWordPressBody ? (
              <article
                className="expertise-listing__wordpress-content"
                dangerouslySetInnerHTML={{
                  __html: formatWordPressContent(wordpressExpertise.content),
                }}
              />
            ) : (
              items.map((item) => (
                <article className="expertise-listing__item" key={item.title}>
                  <div className="expertise-listing__content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className="expertise-listing__image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ExpertisePageData($slug: String!) {
    allWpExpertiseAll(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        slug
        content
        commonBannerImage {
          pageTitle
          bannerImage {
            node {
              altText
              sourceUrl
            }
          }
        }
        expertisePost {
          expertisePostList {
            title
            para
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

export default ExpertiseTemplate;

export const Head = ({ data, pageContext, location }) => {
  const fallback = getExpertisePage(pageContext.slug);
  const title =
    data?.allWpExpertiseAll?.nodes?.[0]?.title || fallback?.highlightedTitle;

  return (
    <SEO
      title={`${title} | Dr. Mudit Khanna`}
      description={fallback?.metaDescription}
      pathname={location.pathname}
    />
  );
};
