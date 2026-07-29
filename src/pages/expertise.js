import React, { useState, useLayoutEffect } from "react";
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

import expImage from "../images/exp-banner.webp";
import patientStory1Img from "../images/knee_osteoarthritis.webp";
import patientStory2Img from "../images/total_knee_replacement_tkr.webp";
import patientStory3Img from "../images/partial_unicondylar_knee_replacement.webp";
import patientStory4Img from "../images/robotic_assisted_total_knee_replacement.webp";

const patientStories = [
  {
    id: 1,
    image: patientStory1Img,
    youtubeId: "Zyl7pTWB-Bo", // only slide 1 has a video for now
    imageAlt: "Knee Osteoarthritis",
    quote:
      "Knee replacement is a surgery in which the worn-out surfaces of the knee joint are removed and covered with smooth metal and medical‑grade plastic components to reduce pain and improve movement. It is usually considered when knee osteoarthritis or injury causes severe pain, stiffness or deformity that is no longer controlled with medicines, physiotherapy or injections, and day‑to‑day activities such as walking, climbing stairs and sleep are significantly affected. ",
    name: "Manish Anand",
  },
  {
    id: 2,
    image: patientStory2Img,
    imageAlt: "Total Knee Replacement (TKR)",
    quote:
      "In total knee replacement, the damaged joint surfaces are removed and covered with smooth metal and medical‑grade plastic components designed to match your knee shape. The aim is to reduce pain and improve function so that walking, standing and basic activities become easier again. Most patients start walking with support within a day or two after surgery, followed by a structured physiotherapy programme to regain strength and flexibility. ",
    name: "Louise W",
  },
  {
    id: 3,
    image: patientStory3Img,
    imageAlt: "Partial (Unicondylar) Knee Replacement",
    quote:
      "Partial knee replacement is an option when arthritis affects only one side (compartment) of the knee and the rest of the joint is relatively healthy. Only the damaged portion is resurfaced, preserving more bone and ligaments, which can make the knee feel more “natural” in selected patients. Recovery may be quicker than with a full replacement, but strict selection criteria are important for good long‑term results.",
    name: "Ronak Khemka",
  },
  {
    id: 4,
    image: patientStory4Img,
    imageAlt: "Robotic‑Assisted Total Knee Replacement",
    quote:
      "Robotic‑assisted knee replacement uses pre‑operative imaging (often CT) and a robotic system to help plan the ideal implant position and guide bone cuts during surgery.  This can improve accuracy of alignment and soft‑tissue balance in suitable knees, which may support better function and implant longevity. It is one tool among many; whether it is useful depends on your knee anatomy, disease pattern and overall health.  ",
    name: "Jeff Rouse",
  },
];

// Poster image by default; swaps to a lazy-loaded YouTube iframe once the
// play button is clicked (the iframe isn't mounted until then, so there's
// no unnecessary YouTube script/network cost on page load). Slides without
// a `youtubeId` just render the plain image.
const CardMedia = ({ image, youtubeId, alt, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Iframes can't be paused with a direct DOM call, so instead we unmount
  // it (drop back to the poster) as soon as the slide is no longer active.
  useLayoutEffect(() => {
    if (!isActive && isPlaying) {
      setIsPlaying(false);
    }
  }, [isActive]);

  if (!youtubeId) {
    return <img src={image} alt={alt} />;
  }

  if (isPlaying) {
    return (
      <iframe
        className="why-choose-card__video"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={alt}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="why-choose-card__play-trigger"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${alt}`}
    >
      <img src={image} alt={alt} />
      <span className="why-choose-card__play-btn">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};

const ExpPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx;

    const timer = setTimeout(() => {
      const section = document.querySelector(".why-choose-mudit-khanna");
      const slider = document.querySelector(".why-choose-slider");

      if (!section || !slider) return;

      const swiper = slider.swiper;

      if (!swiper) return;

      const totalSlides = swiper.slides.length;

      let currentSlide = 0;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,

          start: "5% top",

          end: () => `+=${window.innerHeight * totalSlides}`,

          pin: true,

          pinSpacing: true,

          scrub: 1,

          anticipatePin: 1,

          onUpdate(self) {
            const index = Math.min(
              totalSlides - 1,
              Math.floor(self.progress * totalSlides)
            );

            if (index !== currentSlide) {
              currentSlide = index;

              swiper.slideTo(index, 900);
            }
          },

          onEnter() {
            currentSlide = 0;

            swiper.slideTo(0, 0);
          },

          onEnterBack() {
            currentSlide = totalSlides - 1;

            swiper.slideTo(totalSlides - 1, 0);
          },
        });

        ScrollTrigger.refresh();
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      ctx?.revert();

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Track which slide is active so CardMedia can unmount its YouTube
  // iframe (stopping playback) the moment the user scrolls to another card.
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Layout>
      <section className="inside-banner">
        <div className="container">
          <h1>
            Expert Care For <br />
            <span>Knee Replacement</span>
          </h1>
          <div className="banner-sec">
            <img src={expImage} />
          </div>
        </div>
      </section>

      <section className="why-choose-mudit-khanna expertise">
        <div className="container">
          <Swiper
            className="why-choose-slider"
            modules={[Navigation, Pagination]}
            direction="vertical"
            spaceBetween={24}
            slidesPerView={1}
            loop={false}
            speed={800}
            allowTouchMove={false}
            autoplay={false}
            pagination={{
              clickable: true,
            }}
            onSlideChange={handleSlideChange}
          >
            {patientStories.map((story, index) => (
              <SwiperSlide key={story.id}>
                <div className="why-choose-card">
                  <h2 className="auto-name">{story.imageAlt}</h2>

                  <div className="why-choose-card__image">
                    <CardMedia
                      image={story.image}
                      youtubeId={story.youtubeId}
                      alt={story.imageAlt}
                      isActive={index === activeIndex}
                    />
                  </div>

                  <div className="why-choose-card__content">
                    <p>{story.quote}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Layout>
  );
};

export default ExpPage;

export const Head = () => (
  <>
    <html lang="en" />

    <title>Dr. Mudit Khanna | Robotic Hip &amp; Knee Surgeon</title>

    <meta
      name="description"
      content="Dr. Mudit Khanna is a robotic hip and knee replacement surgeon."
    />
  </>
);