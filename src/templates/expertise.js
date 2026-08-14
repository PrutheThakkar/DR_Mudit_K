import React from "react";
import { graphql } from "gatsby";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import SEO from "../component/SEO";
import { getExpertisePage } from "../data/expertise";

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
            {items.map((item) => (
              <article className="expertise-listing__item" key={item.title}>
                <div className="expertise-listing__content">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="expertise-listing__image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              </article>
            ))}
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
