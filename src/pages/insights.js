import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import SEO from "../component/SEO";
import bannerImage from "../images/insights-banner.webp";

const getReadTime = (content) => {
  const text = content?.replace(/<[^>]*>/g, " ").trim() || "";
  const words = text ? text.split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const getPlainText = (html) => html?.replace(/<[^>]*>/g, " ").trim() || "";

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InsightsPage = ({ data }) => {
  const [openFaq, setOpenFaq] = useState(0);
  const posts = data?.allWpPost?.nodes || [];
  const banner = data?.bannerPage?.nodes?.[0]?.commonBannerImage;
  const faqs = (data?.allWpFaq?.nodes || [])
    .flatMap((faqPost) => faqPost.faqsection?.faq || [])
    .filter(
      (faq, index, allFaqs) =>
        faq.que &&
        allFaqs.findIndex(
          (item) => getPlainText(item.que) === getPlainText(faq.que)
        ) === index
    );

  return (
    <Layout>
      <InsideBanner
        title="Beyond"
        highlightedTitle="The Diagnosis"
        image={banner?.bannerImage?.node?.sourceUrl || bannerImage}
        imageAlt={
          banner?.bannerImage?.node?.altText ||
          "Advanced knee replacement implant illustration"
        }
        description={null}
      />

      <section id="blogs" className="insights-listing">
        <div className="container">
          <div className="insights-section-heading insights-section-heading--center">
            <span>Helpful guidance for better decisions</span>
            <h2>Blogs</h2>
          </div>

          <div className="insights-grid">
            {posts.map((post) => (
              <Link
                to={`/insights/${post.slug}/`}
                className="insight-card"
                key={post.id}
              >
                <div className="insight-card__image">
                  <img
                    src={post.featuredImage?.node?.mediaItemUrl || bannerImage}
                    alt={post.featuredImage?.node?.altText || post.title}
                  />
                </div>
                <div className="insight-card__content">
                  <span>Insights · {getReadTime(post.content)}</span>
                  <h3>{post.title}</h3>
                  <span className="insight-card__link">
                    Read article <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="insights-faq">
        <div className="container">
          <div className="insights-section-heading insights-section-heading--center">
            <span>Clear answers to common concerns</span>
            <h2>FAQs</h2>
          </div>
          <div className="insights-faq__list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  className={`insights-faq__item ${isOpen ? "is-open" : ""}`}
                  key={`${getPlainText(faq.que)}-${index}`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <span>{getPlainText(faq.que)}</span>
                      <svg viewBox="0 0 14 8" aria-hidden="true">
                        <path
                          d="m1 1 6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    className="insights-faq__answer"
                    hidden={!isOpen}
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.ans || "" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InsightsPage;

export const query = graphql`
  query InsightsPageData {
    allWpPost(sort: { date: DESC }) {
      nodes {
        id
        title
        slug
        content
        featuredImage {
          node {
            altText
            mediaItemUrl
            uri
            title
          }
        }
      }
    }
    bannerPage: allWpPage(filter: { databaseId: { eq: 183 } }) {
      nodes {
        commonBannerImage {
          pageTitle
          bannerImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
    allWpFaq {
      nodes {
        faqsection {
          faq {
            que
            ans
          }
        }
      }
    }
  }
`;

export const Head = ({ location }) => (
  <SEO
    title="Insights | Dr. Mudit Khanna"
    description="Practical orthopaedic guidance on knee replacement, joint health, recovery and treatment decisions from Dr. Mudit Khanna."
    pathname={location.pathname}
  />
);
