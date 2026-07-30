import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";

import Layout from "../component/Layout";
import InsideBanner from "../component/inside-banner";
import PersonalApproach from "../component/PersonalApproach";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

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
    title:
      "Member of Royal College\nof Surgeons of Edinburgh, UK",
  },

  {
    logo: logo2,
    title:
      "Member of Indian \nOrthopaedic Society, UK",
  },

  {
    logo: logo3,
    title:
      "Member of Indian\nOrthopaedic Association",
  },

  {
    logo: logo4,
    title:
      "Member of Indian Society \nof Hip and Knee Surgeons, India",
  },

  {
    logo: logo5,
    title:
      "Member of Indian \nArthroscopy Society, India",
  },

  {
    logo: logo6,
    title:
      "Member of Bombay \nOrthopaedic Society",
  },

  {
    logo: logo7,
    title:
      "Member of \nCAOS International, UK",
  },
  {
    logo: logo8,
    title:
      "Member of Indian\nArthroplasty Association, India",
  },

];



const Aboutpage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const expertiseSwiperRef = useRef(null);

  const mapObjectRef = useRef(null);
  const mapTimelineRef = useRef(null);
  const mapScrollTriggerRef = useRef(null);

  const activeContent = expertiseData[activeTab];

  const handleMapLoad = () => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mapObject = mapObjectRef.current;
    const svgDocument = mapObject?.contentDocument;

    if (!svgDocument) return;

    const mapPoints = Array.from(
      svgDocument.querySelectorAll(".map-point")
    );

    if (!mapPoints.length) {
      console.warn(
        'No map points found. Add class="map-point" to the SVG circles.'
      );
      return;
    }

    // Prevent duplicate animations during hot reload.
    mapTimelineRef.current?.kill();
    mapScrollTriggerRef.current?.kill();

    gsap.set(mapPoints, {
      opacity: 0,
      scale: 0.3,
      y: -25,
      transformOrigin: "50% 50%",
      transformBox: "fill-box",
    });

    const timeline = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 0.3,
    });

    mapPoints.forEach((point) => {
      timeline
        .fromTo(
          point,
          {
            opacity: 0,
            scale: 0.3,
            y: -30,
          },
          {
            opacity: 1,
            scale: 1.5,
            y: 0,
            duration: 0.55,
            ease: "bounce.out",
          }
        )
        .to(point, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(point, {
          scale: 1.25,
          duration: 0.25,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        })
        .to(point, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          delay: 0.5,
          ease: "power2.in",
        });
    });

    mapTimelineRef.current = timeline;

    mapScrollTriggerRef.current = ScrollTrigger.create({
      trigger: mapObject,
      start: "top 80%",
      end: "bottom 20%",

      onEnter: () => timeline.play(),
      onEnterBack: () => timeline.play(),

      onLeave: () => timeline.pause(),
      onLeaveBack: () => timeline.pause(),
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    return () => {
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
      <InsideBanner />

      <section className="map-section">
        <div className="container">
          <h2>A Global Foundation of Surgical Excellence</h2>
          <object
            ref={mapObjectRef}
            data={aboutImagemap}
            type="image/svg+xml"
            className="global-map-object"
            aria-label="Global surgical training locations"
            onLoad={handleMapLoad}
          >
            <img
              src={aboutImagemap}
              alt="Global surgical training locations"
            />
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
              <h2>Area Of Expertise</h2>

              {/* Desktop vertical tabs */}
              <div className="tabs-list tabs-list--desktop">
                {expertiseData.map((item, index) => (
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
                  {expertiseData.map((item, index) => (
                    <SwiperSlide key={item.title}>
                      <button
                        type="button"
                        className={`expertise-slide-button ${activeTab === index ? "active" : ""
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
                  alt={activeContent.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="membership-section">


        <div className="container">


          <h2 className="membership-title">
            Memberships & Affiliations
          </h2>



          <Swiper

            className="membership-slider"

            modules={[
              Pagination,
              Autoplay
            ]}

            slidesPerView={3}

            spaceBetween={50}

            loop={true}

            speed={800}


            autoplay={{

              delay: 3000,

              disableOnInteraction: false

            }}


            pagination={{

              clickable: true

            }}


            breakpoints={{

              0: {
                slidesPerView: 1,
                spaceBetween: 20
              },


              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },


              1200: {
                slidesPerView: 3,
                spaceBetween: 50
              }


            }}


          >


            {

              membershipData.map((item, index) => (


                <SwiperSlide key={index}>


                  <div className="membership-card">


                    <div className="membership-logo">

                      <img

                        src={item.logo}

                        alt={item.title}

                      />

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


              ))

            }


          </Swiper>


        </div>


      </section>

      <section className="map-section awards">
        <div className="container">
          <h2>Awards & Recognition</h2>

          <ul>
            <li>
              <h3>Gold Medalist</h3>
              <p>MCh Orthopaedics,<br />
                Dundee, UK (Best Presentation)</p>
            </li>
            <li>
              <h3>Gold Medalist</h3>
              <p>MBBS (Best Overall Student)</p>
            </li>
            <li>
              <h3>Asia Pacific Fellow</h3>
              <p>Cleveland Clinic, USA</p>
            </li>
            <li>
              <h3>Senior Clinical Fellow</h3>
              <p>Queen Elizabeth II Hospital, UK</p>
            </li>
          </ul>
        </div>
      </section>

      <PersonalApproach />

    </Layout>
  );
};

export default Aboutpage;

export const Head = () => (
  <>
    <html lang="en" />

    <title>
      Dr. Mudit Khanna | Robotic Hip &amp; Knee Surgeon
    </title>

    <meta
      name="description"
      content="Dr. Mudit Khanna is a robotic hip and knee replacement surgeon."
    />
  </>
);