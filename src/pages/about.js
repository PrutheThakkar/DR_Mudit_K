import React, { useEffect, useRef, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import PersonalApproach from "../component/PersonalApproach";
import SEO from "../component/SEO";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutImagemap from "../images/global-map.svg";
import hipImage from "../images/expertise-1.webp";
import kneeImage from "../images/expertise-2.webp";
import roboticImage from "../images/expertise-3.webp";
import revisionImage from "../images/expertise-4.webp";

import logo1 from "../images/logo-1.svg";
import logo2 from "../images/logo-2.svg";
import logo3 from "../images/logo-3.svg";
import logo4 from "../images/logo-5.svg";
import logo5 from "../images/logo-6.svg";
import logo6 from "../images/logo-7.svg";
import logo7 from "../images/logo-8.svg";
import logo8 from "../images/logo-9.svg";

const expertiseData = [
  {
    title: "Direct Anterior Approach (DAA) Hip Replacement",
    description:
      "Minimally invasive, muscle-sparing technique allowing faster recovery, reduced pain, and low dislocation risk.",
    image: hipImage,
    link: "/hip-replacement/",
  },
  {
    title: "Makoplasty® Robotic Partial Knee Replacement",
    description:
      "Advanced robotic-assisted technology providing accurate alignment, smaller incisions and faster recovery.",
    image: kneeImage,
    link: "/robotic-knee-replacement/",
  },
  {
    title: "Robotic Hip & Knee Replacement",
    description:
      "Computer-assisted precision technology helping surgeons deliver personalised joint replacement procedures.",
    image: roboticImage,
    link: "/robotic-joint-replacement/",
  },
  {
    title: "Subvastus Total Knee Replacement",
    description:
      "A muscle-preserving approach designed to improve recovery and maintain knee function.",
    image: kneeImage,
    link: "/knee-replacement/",
  },
  {
    title: "Complex & Revision Surgery",
    description:
      "Specialised solutions for previous failed replacements and complex joint conditions.",
    image: revisionImage,
    link: "/revision-surgery/",
  },
];

const membershipData = [
  {
    logo: logo1,
    title: "Member of Royal College\nof Surgeons of Edinburgh, UK",
  },

  {
    logo: logo2,
    title: "Member of Indian \nOrthopaedic Society, UK",
  },

  {
    logo: logo3,
    title: "Member of Indian\nOrthopaedic Association",
  },

  {
    logo: logo4,
    title: "Member of Indian Society \nof Hip and Knee Surgeons, India",
  },

  {
    logo: logo5,
    title: "Member of Indian \nArthroscopy Society, India",
  },

  {
    logo: logo6,
    title: "Member of Bombay \nOrthopaedic Society",
  },

  {
    logo: logo7,
    title: "Member of \nCAOS International, UK",
  },
  {
    logo: logo8,
    title: "Member of Indian\nArthroplasty Association, India",
  },
];

const normalizeWordPressHtml = (html) =>
  html ? html.replace(/\bclassName=/g, "class=") : "";

const Aboutpage = ({ data }) => {
  const wordpressPage = data?.allWpPage?.nodes?.[0];
  const aboutPage = wordpressPage?.aboutPageNew;
  const banner = wordpressPage?.commonBannerImage;
  const expertiseItems = aboutPage?.expertiseList?.length
    ? aboutPage.expertiseList.map((item, index) => ({
        title: item.expertiseRightTitle,
        description: item.expertisePara,
        image:
          item.expertiseImage?.node?.sourceUrl || expertiseData[index]?.image,
        imageAlt:
          item.expertiseImage?.node?.altText || item.expertiseRightTitle,
        link: expertiseData[index]?.link || "/contact/",
      }))
    : expertiseData;
  const [activeTab, setActiveTab] = useState(0);

  const expertiseSwiperRef = useRef(null);

  const mapObjectRef = useRef(null);
  const mapTimelineRef = useRef(null);
  const mapScrollTriggerRef = useRef(null);

  const activeContent = expertiseItems[activeTab] || expertiseItems[0];

  const handleMapLoad = () => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mapObject = mapObjectRef.current;
    const svgDocument = mapObject?.contentDocument;

    if (!svgDocument) return;

    const mapBackground = svgDocument.querySelector("rect");
    const mapLabels = Array.from(
      svgDocument.querySelectorAll('path[fill="white"]')
    );
    const mapRoutes = Array.from(
      svgDocument.querySelectorAll('path[stroke="#2171FF"]')
    );
    const mapPoints = Array.from(svgDocument.querySelectorAll("circle")).map(
      (circle) => circle.closest("g") || circle
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Prevent duplicate animations during hot reload.
    mapTimelineRef.current?.kill();
    mapScrollTriggerRef.current?.kill();

    mapRoutes.forEach((route, index) => {
      const routeLength = route.getTotalLength();

      gsap.set(route, {
        strokeDasharray: routeLength,
        // The final route is drawn from Singapore back towards India.
        strokeDashoffset: index === 2 ? -routeLength : routeLength,
      });
    });

    gsap.set(mapPoints, {
      opacity: 0,
    });
    gsap.set(mapLabels, { opacity: 0, y: 10 });

    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    const journeySteps = [
      { route: mapRoutes[0], point: mapPoints[1], label: mapLabels[1] },
      { route: mapRoutes[3], point: mapPoints[2], label: mapLabels[2] },
      { route: mapRoutes[1], point: mapPoints[3], label: mapLabels[3] },
      { route: mapRoutes[2], point: mapPoints[4], label: mapLabels[4] },
    ];

    timeline
      .fromTo(mapBackground, { opacity: 0 }, { opacity: 1, duration: 0.55 })
      .fromTo(
        mapLabels[0],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.28 },
        "-=0.22"
      )
      .to(
        mapPoints[0],
        { opacity: 1, duration: 0.22, ease: "power2.out" },
        "<"
      );

    journeySteps.forEach(({ route, point, label }) => {
      timeline
        .to(route, {
          strokeDashoffset: 0,
          duration: 0.62,
          ease: "power1.inOut",
        })
        .to(point, {
          opacity: 1,
          duration: 0.22,
          ease: "power2.out",
        })
        .fromTo(
          label,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" },
          "<0.03"
        );
    });

    mapTimelineRef.current = timeline;

    mapScrollTriggerRef.current = ScrollTrigger.create({
      trigger: mapObject,
      start: "top 78%",
      animation: timeline,
      once: true,
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const mapObject = mapObjectRef.current;
    if (!mapObject) return undefined;

    let retryTimer;
    let retryCount = 0;

    const initializeMap = () => {
      if (mapObject.contentDocument?.documentElement) {
        handleMapLoad();
        return;
      }

      // A cached SVG can finish loading before React hydration on production.
      // Retry until the embedded SVG document becomes available.
      if (retryCount < 20) {
        retryCount += 1;
        retryTimer = window.setTimeout(initializeMap, 100);
      }
    };

    mapObject.addEventListener("load", initializeMap);
    window.addEventListener("pageshow", initializeMap);
    initializeMap();

    return () => {
      window.clearTimeout(retryTimer);
      mapObject.removeEventListener("load", initializeMap);
      window.removeEventListener("pageshow", initializeMap);
      mapTimelineRef.current?.kill();
      mapScrollTriggerRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!expertiseSwiperRef.current) return;

    expertiseSwiperRef.current.slideTo(activeTab);
  }, [activeTab]);

  return (
    <Layout>
      <InsideBanner
        image={banner?.bannerImage?.node?.sourceUrl}
        imageAlt={banner?.bannerImage?.node?.altText}
      />

      <section className="map-section">
        <div className="container">
          <h2>A Global Foundation of Surgical Excellence</h2>
          <object
            ref={mapObjectRef}
            data={aboutImagemap}
            type="image/svg+xml"
            className="global-map-object"
            aria-label="Global surgical training locations"
          >
            <img src={aboutImagemap} alt="Global surgical training locations" />
          </object>
          <ul>
            <li>
              <h3>Asia Pacific Zimmer Fellowship</h3>
              <p>Cleveland Clinic, Ohio, USA</p>
            </li>
            <li>
              <h3>Senior Clinical Fellowship</h3>
              <p>Queen Elizabeth Hospital, UK</p>
            </li>
            <li>
              <h3>Robotic Surgery Training</h3>
              <p>Hospital for Special Surgery (HSS), Florida, USA</p>
            </li>
            <li>
              <h3>DAA Hip Training</h3>
              <p>Philadelphia & Portsmouth, USA; Singapore</p>
            </li>
            <li>
              <h3>Computer Navigation Training</h3>
              <p>Endoklinik & Asklepios Clinic, Germany</p>
            </li>
            <li>
              <h3>Advanced Courses</h3>
              <p>UK (Edinburgh, Dundee, Oxford), Italy, Singapore</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="expertise-tabs-section">
        <div className="container">
          <div className="expertise-layout">
            <div className="expertise-tabs">
              {aboutPage?.areaOfExpertiseTitle && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: normalizeWordPressHtml(
                      aboutPage.areaOfExpertiseTitle
                    ),
                  }}
                />
              )}

              {/* Desktop vertical tabs */}
              <div className="tabs-list tabs-list--desktop">
                {expertiseItems.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    className={activeTab === index ? "active" : ""}
                    onClick={() => setActiveTab(index)}
                    aria-pressed={activeTab === index}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Tablet and mobile Swiper tabs */}
              <div className="expertise-tabs-mobile">
                <Swiper
                  className="expertise-tabs-slider"
                  modules={[Navigation]}
                  navigation={true}
                  speed={600}
                  slidesPerView="auto"
                  spaceBetween={14}
                  centeredSlides={true}
                  centeredSlidesBounds={true}
                  slideToClickedSlide={true}
                  watchSlidesProgress={true}
                  onSwiper={(swiper) => {
                    expertiseSwiperRef.current = swiper;
                    swiper.slideTo(activeTab, 0);
                  }}
                  onSlideChange={(swiper) => {
                    setActiveTab(swiper.activeIndex);
                  }}
                >
                  {expertiseItems.map((item, index) => (
                    <SwiperSlide key={item.title}>
                      <button
                        type="button"
                        className={`expertise-slide-button ${
                          activeTab === index ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveTab(index);
                          expertiseSwiperRef.current?.slideTo(index);
                        }}
                        aria-pressed={activeTab === index}
                      >
                        {item.title}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="expertise-content" key={activeTab}>
              <div className="content-info">
                <h3>{activeContent.title}</h3>

                <p>{activeContent.description}</p>

                <Link to={activeContent.link} className="details-btn">
                  View Details
                </Link>
              </div>

              <div className="content-image">
                <img
                  src={activeContent.image}
                  alt={activeContent.imageAlt || activeContent.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="membership-section">
        <div className="container">
          <h2 className="membership-title">Memberships & Affiliations</h2>

          <Swiper
            className="membership-slider"
            modules={[Pagination, Autoplay]}
            slidesPerView={3}
            spaceBetween={50}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,

              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },

              1200: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {membershipData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="membership-card">
                  <div className="membership-logo">
                    <img src={item.logo} alt={item.title} />
                  </div>

                  <div className="membership-content">
                    <h3>
                      {item.title.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}

                          <br />
                        </React.Fragment>
                      ))}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="map-section awards">
        <div className="container">
          <h2>Awards & Recognition</h2>

          {aboutPage?.awardsList?.length && (
            <ul>
              {aboutPage.awardsList.map((item, index) => (
                <li key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: normalizeWordPressHtml(item.title),
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: normalizeWordPressHtml(item.subtitle),
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <PersonalApproach
        image={aboutPage?.personalImage?.node?.sourceUrl}
        imageAlt={aboutPage?.personalImage?.node?.altText}
        items={aboutPage?.personalList?.map((item) => item.personalListTitle)}
      />
    </Layout>
  );
};

export default Aboutpage;

export const query = graphql`
  query AboutPageWordPressData {
    allWpPage(filter: { databaseId: { eq: 93 } }) {
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
        aboutPageNew {
          aGlobalFoundationTitle
          aGlobalFoundationImage {
            node {
              altText
              sourceUrl
            }
          }
          aFoundationList {
            title
            subtitle
          }
          areaOfExpertiseTitle
          expertiseList {
            expertiseRightTitle
            expertisePara
            expertiseImage {
              node {
                altText
                sourceUrl
              }
            }
          }
          awardsList {
            title
            subtitle
          }
          personalImage {
            node {
              altText
              sourceUrl
            }
          }
          personalList {
            personalListTitle
          }
        }
      }
    }
  }
`;

export const Head = ({ location }) => (
  <SEO
    title="About Dr. Mudit Khanna | Orthopaedic Surgeon"
    description="Learn about Dr. Mudit Khanna's experience and personalised approach to robotic hip and knee replacement care in Mumbai."
    pathname={location.pathname}
  />
);
