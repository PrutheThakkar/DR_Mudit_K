import React, { useLayoutEffect } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../component/Layout";
import FaqSection from "../component/faq";
import SEO from "../component/SEO";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutImage from "../images/dmk_homepage_about.webp";
import homeMetalImage from "../images/home-banner.png";
import expimg1 from "../images/hip-replacement.webp";
import expimg2 from "../images/knee-replacement.webp";
import expimg3 from "../images/regenerative-treatment.webp";
import expimg4 from "../images/pain-management.webp";

const normalizeWordPressHtml = html =>
  html ? html.replace(/\bclassName=/g, "class=") : "";

const IndexPage = ({ data }) => {
  const wordpressPage = data?.allWpPage?.edges?.[0]?.node;
  const homePage = wordpressPage?.homePage;
  const precisionLinks = [
    "/hip-replacement/",
    "/knee-replacement/",
    "/regenerative-treatment/",
    "/pain-management/",
  ];
  const wordpressFaq = homePage?.faq?.map(item => ({
    question: item.questions,
    answer: item.ans,
  }));
  const wordpressPatientStories =
    homePage?.whyChooseDrMuditKhanna?.map((story, index) => ({
      id: index,
      image: story.patientImage?.node?.sourceUrl,
      imageAlt: story.patientImage?.node?.altText || story.patientName,
      quote: story.patientPara,
      name: story.patientName,
    })) || [];

  useLayoutEffect(() => {

    // The scroll-pinned testimonial treatment is a desktop interaction. On
    // touch layouts it creates several viewport-heights of empty space and
    // makes the page appear clipped while the vertical Swiper is pinned.
    if (window.matchMedia("(max-width: 1100px)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);


    const timer = setTimeout(() => {

      const whySection = document.querySelector(
        ".why-choose-mudit-khanna"
      );

      const whySwiper = document.querySelector(
        ".why-choose-slider"
      );


      if (!whySection || !whySwiper) return;


      const swiperInstance =
        whySwiper.swiper;


      if (!swiperInstance) return;


      const totalSlides =
        swiperInstance.slides.length;


      let currentSlide = 0;


      ScrollTrigger.create({

        trigger: whySection,

        start: "top top",

        end: () =>
          `+=${window.innerHeight * totalSlides}`,

        pin: true,

        pinSpacing: true,

        scrub: 1,

        anticipatePin: 1,


        snap: {
          snapTo: 1 / (totalSlides - 1),
          duration: {
            min: 0.2,
            max: 0.6,
          },
          ease: "power1.inOut",
        },


        onUpdate(self) {

          const slideIndex = Math.min(
            totalSlides - 1,
            Math.floor(
              self.progress * totalSlides
            )
          );


          if (
            slideIndex !== currentSlide
          ) {

            currentSlide = slideIndex;


            swiperInstance.slideTo(
              slideIndex,
              800
            );

          }

        },


        onEnter() {

          currentSlide = 0;

          swiperInstance.slideTo(
            0,
            0
          );

        },


        onEnterBack() {

          currentSlide =
            totalSlides - 1;


          swiperInstance.slideTo(
            totalSlides - 1,
            0
          );
        },
      });
      ScrollTrigger.refresh();
    }, 500);


    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(
        trigger => trigger.kill()
      );
    };
  }, []);

  return (
    <Layout>
      <section className="home-hero">
        <div className="home-hero__metal-wrap" aria-hidden="true">
          <div className="home-hero__metal-glow" />
          <img
            className="home-hero__metal"
            src={homePage?.homePageLogoImg?.node?.sourceUrl || homeMetalImage}
            alt={homePage?.homePageLogoImg?.node?.altText || ""}
          />
        </div>
        <div className="container home-hero__container">
          <div className="home-hero__heading-wrap">
            <h1 className="home-hero__title">
              <span className="home-hero__title-top">
                India’s Leading
              </span><br />

              <span className="home-hero__title-highlight-blue">
                Robotic
              </span> Hip &<br />

              <span className="home-hero__title-highlight">
                Knee Surgeon
              </span>
            </h1>
          </div>

          <div className="home-hero__bottom">
            {homePage?.aboutSectionLeft && (
              <div
                className="left"
                dangerouslySetInnerHTML={{
                  __html: normalizeWordPressHtml(homePage.aboutSectionLeft),
                }}
              />
            )}

            <div className="right">
              <a
                href="https://wa.me/918657790513"
                className="btn btn--outline home-hero__button"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp The Clinic
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="dr-mudit">
        <div className="container">
          <div className="left">
            <div className="img-wrap">
            <img
              src={homePage?.drImage?.node?.sourceUrl || aboutImage}
              alt={homePage?.drImage?.node?.altText || "Dr. Mudit Khanna"}
            />
            </div>
            <div className="exp">

              <ul >
                <li>
                  <p className="number">18+</p>
                  <p className="txt">Years of Experience</p>
                </li>

                <li>
                  <p className="number">8000+</p>
                  <p className="txt">Joint Replacements</p>
                </li>

                <li>
                  <p className="number">15000+</p>
                  <p className="txt">Surgeries Assisted</p>
                </li>

                <li>
                  <p className="number">500+</p>
                  <p className="txt">Recommendations</p>
                </li>
              </ul>
            </div>
          </div>

          {homePage?.aboutSectionRightContent && (
            <div
              className="right"
              dangerouslySetInnerHTML={{
                __html: normalizeWordPressHtml(homePage.aboutSectionRightContent),
              }}
            />
          )}
        </div>
      </section>

      <section className="precision-every-joint">
        <div className="container">
          <h2>{homePage?.precisionTitle || "Precision in Every Joint"}</h2>

          {homePage?.precisionList?.length && (
            <div className="column-wrap">
              {[0, 2].map(start => (
                <div className={`columns ${start === 0 ? "top" : "bottom"}`} key={start}>
                  {homePage.precisionList.slice(start, start + 2).map((item, offset) => (
                    <div className={offset === 0 ? "left" : "right"} key={`${start}-${offset}`}>
                      <div className="img-wrap">
                        <img src={item.image?.node?.sourceUrl} alt={item.image?.node?.altText || ""} />
                      </div>
                      <div className="precision-card__content">
                        <div dangerouslySetInnerHTML={{ __html: normalizeWordPressHtml(item.title) }} />
                        <div
                          className={start === 2 ? "bottom-para" : undefined}
                          dangerouslySetInnerHTML={{
                            __html: normalizeWordPressHtml(item.paragraph),
                          }}
                        />
                        <Link to={precisionLinks[start + offset]}>Learn More</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )  }
        </div>
      </section>

      {wordpressPatientStories.length > 0 && (
      <section className="why-choose-mudit-khanna">
        <div className="container">
          <div className="section-heading section-heading--center">
          

            {homePage?.whyChooseDrTitle && (
              <div
                dangerouslySetInnerHTML={{
                  __html: normalizeWordPressHtml(homePage.whyChooseDrTitle),
                }}
              />
            )}
          </div>

          <Swiper
            className="why-choose-slider"
            modules={[Navigation, Pagination]}
            direction="vertical"
            breakpoints={{
              0: { direction: "horizontal" },
              1101: { direction: "vertical" },
            }}
            spaceBetween={24}
            slidesPerView={1}
            loop={false}
            speed={800}
            allowTouchMove
            autoplay={false}
            pagination={{
              clickable: true,
            }}
          >
            {
              wordpressPatientStories.map((story) => (
                <SwiperSlide key={story.id}>
                  <div className="why-choose-card">

                    <div className="why-choose-card__image">
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                      />
                    </div>

                    <div className="why-choose-card__content">

                      <p>
                        {story.quote}
                      </p>

                      <p className="auto-name">
                        - {story.name}
                      </p>

                    </div>

                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </section>
      )}

      <FaqSection
        items={wordpressFaq?.length ? wordpressFaq : undefined}
        title={homePage?.whatPatientWantTitle}
        description={homePage?.whatPatientsWantPara}
      />

    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePageWordPressData {
    allWpPage(filter: { databaseId: { eq: 35 } }) {
      edges {
        node {
          homePage {
            homePageLogoImg {
              node {
                altText
                sourceUrl
              }
            }
            aboutSectionLeft
            drImage {
              node {
                altText
                sourceUrl
              }
            }
            aboutSectionRightContent
            precisionTitle
            precisionList {
              title
              paragraph
              image {
                node {
                  altText
                  sourceUrl
                }
              }
            }
            whyChooseDrTitle
            whyChooseDrMuditKhanna {
              patientImage {
                node {
                  altText
                  sourceUrl
                }
              }
              patientName
              patientPara
            }
            whatPatientWantTitle
            whatPatientsWantPara
            faq {
              questions
              ans
            }
          }
        }
      }
    }
  }
`;

export const Head = ({ location }) => (
  <SEO title="Dr. Mudit Khanna | Robotic Hip & Knee Surgeon" description="Dr. Mudit Khanna is a robotic hip and knee replacement surgeon providing personalised orthopaedic care in Mumbai." pathname={location.pathname} />
);
