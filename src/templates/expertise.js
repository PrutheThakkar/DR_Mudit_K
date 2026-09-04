import React, { useEffect, useState } from "react";
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

const getVideoEmbedUrl = url => {
  if (!url) return null;

  const youtubeId = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/
  )?.[1];
  if (youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  }

  const vimeoId = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;

  return url;
};

const PlayIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="m20 16 13 8-13 8Z" fill="currentColor" />
  </svg>
);

const hipReplacementVideos = [
  {
    matches: title => /direct anterior|\bdaa\b/i.test(title),
    url: "https://youtu.be/fAd07j6H5FI",
  },
  {
    matches: title => /robotic.*hip replacement/i.test(title),
    url: "https://youtu.be/LNOl-hr_qAc",
  },
  {
    matches: title => /avascular necrosis|\bavn\b/i.test(title),
    url: "https://youtu.be/75DRfelqOZE",
  },
];

const getExpertiseVideoUrl = (slug, title = "") => {
  if (slug !== "hip-replacement") return null;
  return hipReplacementVideos.find(video => video.matches(title))?.url || null;
};

const ExpertiseTemplate = ({ data, pageContext }) => {
  const [activeVideo, setActiveVideo] = useState(null);
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
        videoUrl:
          getExpertiseVideoUrl(pageContext.slug, item.title) ||
          fallback?.items?.[index]?.videoUrl,
      }))
    : (fallback?.items || []).map(item => ({
        ...item,
        videoUrl:
          getExpertiseVideoUrl(pageContext.slug, item.title) || item.videoUrl,
      }));

  useEffect(() => {
    if (!activeVideo) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = event => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeVideo]);

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
                  {item.videoUrl ? (
                    <button
                      type="button"
                      className="expertise-listing__image expertise-listing__video-trigger"
                      onClick={() =>
                        setActiveVideo({
                          title: item.title,
                          src: getVideoEmbedUrl(item.videoUrl),
                        })
                      }
                      aria-label={`Play video: ${item.title}`}
                    >
                      <img src={item.image} alt="" loading="lazy" />
                      <span className="expertise-listing__play">
                        <PlayIcon />
                      </span>
                    </button>
                  ) : (
                    <div className="expertise-listing__image">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="expertise-video-title"
        >
          <button
            type="button"
            className="video-modal__backdrop"
            aria-label="Close video"
            onClick={() => setActiveVideo(null)}
          />
          <div className="video-modal__dialog">
            <div className="video-modal__header">
              <h2 id="expertise-video-title">{activeVideo.title}</h2>
              <button
                type="button"
                className="video-modal__close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
              >
                ×
              </button>
            </div>
            <div className="video-modal__player">
              <iframe
                src={activeVideo.src}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
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
