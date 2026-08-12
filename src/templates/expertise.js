import React from "react";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import SEO from "../component/SEO";
import { getExpertisePage } from "../data/expertise";

const ExpertiseTemplate = ({ pageContext }) => {
  const expertise = getExpertisePage(pageContext.slug);

  return (
    <Layout>
      <div className="expertise-listing-page">
        <InsideBanner
          title={expertise.title}
          highlightedTitle={expertise.highlightedTitle}
          image={expertise.bannerImage}
          imageAlt={expertise.bannerAlt}
          description={null}
        />

        <section
          className="expertise-listing"
          aria-label={`${expertise.highlightedTitle} expertise`}
        >
          <div className="container">
            {expertise.items.map(item => (
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

export default ExpertiseTemplate;

export const Head = ({ pageContext, location }) => {
  const expertise = getExpertisePage(pageContext.slug);

  return (
    <SEO
      title={`${expertise.highlightedTitle} | Dr. Mudit Khanna`}
      description={expertise.metaDescription}
      pathname={location.pathname}
    />
  );
};
