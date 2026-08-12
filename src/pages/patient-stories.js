import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../component/Layout";
import SEO from "../component/SEO";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import manishImage from "../images/patient_stories_4_manish_anand.webp";
import louiseImage from "../images/patient_stories_1_louise_w.webp";
import ronakImage from "../images/patient_stories_2_ronak_khemka.webp";
import jeffImage from "../images/patient_stories_3_jeff_rouse.webp";
import patientstory from "../images/patient-story_banner.webp";

const patientStories = [
  {
    id: 1,
    image: manishImage,
    imageAlt: "Patient with the orthopaedic medical team",
    quote: "My father underwent a robotic partial knee replacement surgery performed by Dr. Khanna. The operation went very well, and my father was able to walk properly within a few days without needing a walker. Dr. Khanna and his team were very professional from the beginning. They patiently addressed all our concerns, were always available for questions, and provided clear and helpful responses. The doctor and his team continued to support us after the surgery, which kept us motivated. I would highly recommend Dr. Khanna to anyone considering orthopaedic surgery. You will truly be in good hands.",
    name: "Manish Anand",
  },
  {
    id: 2,
    image: louiseImage,
    imageAlt: "Patient after successful hip replacement",
    quote: "I travelled to India from New Zealand for a hip replacement and was fortunate to be referred to Dr. Mudit Khanna. He answered all my questions before surgery and gave me complete confidence. My operation went smoothly and after two weeks I was walking normally. The post-operative care was exceptional, and Dr. Khanna took the time to explain my recovery and show me how to walk correctly. I highly recommend him and thank him for enabling me to return to my active lifestyle.",
    name: "Louise W",
  },
  {
    id: 3,
    image: ronakImage,
    imageAlt: "Patient during orthopaedic recovery",
    quote: "We came from Myanmar for my mother's bilateral knee replacement. Dr. Mudit Khanna explained the surgery clearly and treated us with great patience and kindness. Both procedures went very well. Dr. Khanna and his team continued caring for my mother so closely that she was able to walk on the same day and recover confidently. From our first appointment through discharge and follow-up, he took full responsibility for her care. We are deeply grateful.",
    name: "Ronak Khemka",
  },
  {
    id: 4,
    image: jeffImage,
    imageAlt: "Patient following knee replacement",
    quote: "If you are considering orthopaedic surgery, Dr. Mudit Khanna is your man. From the first meeting, he and his wonderful team made me feel at ease about what I was going through. The care before and after my knee replacement could not have been better, and Dr. Khanna's calm and positive attitude made the whole process easier. I would have no hesitation recommending him and his team—the experience was first class.",
    name: "Jeff Rouse",
  },
  {
    id: 4,
    image: jeffImage,
    imageAlt: "Patient following knee replacement",
    quote: "If you are considering orthopaedic surgery, Dr. Mudit Khanna is your man. From the first meeting, he and his wonderful team made me feel at ease about what I was going through. The care before and after my knee replacement could not have been better, and Dr. Khanna's calm and positive attitude made the whole process easier. I would have no hesitation recommending him and his team—the experience was first class.",
    name: "Jeff Rouse",
  },
];

const reelVideos = [
  { id: "WljPsLeMNlE", title: "Walking Unaided in Just 4 Days", label: "Bilateral knee replacement" },
  { id: "1YTNmRZ_4Yw", title: "Walking After Total Knee Replacement", label: "Post-operative recovery" },
  { id: "Tua5D73sR2M", title: "From Surgery to Walking Again", label: "Orthopaedic success story" },
  { id: "9t8mePWtHF4", title: "From Two Sticks to Walking Solo", label: "Partial knee replacement" },
  { id: "9t8mePWtHF4", title: "From Two Sticks to Walking Solo", label: "Partial knee replacement" },
];

const featuredVideos = [
  { id: "QvRs0D8q5b0", title: "From New Zealand to India", label: "A smooth hip replacement journey" },
  { id: "_kPkG7N8P8Q", title: "Donna Rameka's Journey", label: "Transforming lives" },
  { id: "5Fx241Jcal0", title: "Robotic Hip Replacement in India", label: "Patient success story" },
  { id: "LBR_UQ9s0TY", title: "An Absolute Pain-Free Recovery", label: "Hip replacement testimonial" },
  { id: "LBR_UQ9s0TY", title: "An Absolute Pain-Free Recovery", label: "Hip replacement testimonial" },
];

const PlayIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="m20 16 13 8-13 8Z" fill="currentColor" />
  </svg>
);

const YouTubeCard = ({ video, onPlay }) => (
  <div className="story-media-card">
    <button type="button" className="story-media-card__trigger" onClick={() => onPlay(video)} aria-label={`Play ${video.title}`}>
      <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="story-media-card__overlay"><PlayIcon /><strong>{video.title}</strong><small>{video.label}</small></span>
    </button>
  </div>
);

const PatientStoriesPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

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

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    let storyScrollTrigger;


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


      storyScrollTrigger = ScrollTrigger.create({

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

      storyScrollTrigger?.kill();

    };


  }, []);

  return (
    <Layout>
     <section className="inside-banner">
           <div className="container">
             <h1>
               Expert Care For <br />
               <span>Knee Replacement</span>
             </h1>
             <div className="banner-sec">
               <img src={patientstory} alt="Hip replacement and restored movement" />
             </div>
           </div>
         </section>

      <section className="why-choose-mudit-khanna stories-testimonials">
          <div className="container">
            <div className="section-heading section-heading--center">
            
  
              <h2 className="section-heading__title">
                Why Choose Dr. Mudit Khanna?
              </h2>
            </div>
  
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
            >
              {
                patientStories.map((story) => (
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

    <section className="story-media-section story-media-section--reels">
      <div className="container">
        <h2>Highlighted Reels</h2>
        <Swiper
          className="story-media-slider story-media-slider--reels"
          modules={[Navigation]}
          centeredSlides
          loop
          navigation
          slideToClickedSlide
          spaceBetween={28}
          slidesPerView={3}
          breakpoints={{ 0: { slidesPerView: 1.45, spaceBetween: 12 }, 640: { slidesPerView: 2.2 }, 1000: { slidesPerView: 3 } }}
        >
          {reelVideos.map(video => (
            <SwiperSlide key={`reel-${video.id}`}>
              <YouTubeCard video={video} onPlay={setActiveVideo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

    <section className="story-media-section story-media-section--videos">
      <div className="container">
        <h2>Highlighted Videos</h2>
        <Swiper
          className="story-media-slider story-media-slider--videos"
          modules={[Navigation]}
          centeredSlides
          loop
          navigation
          slideToClickedSlide
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1.08, spaceBetween: 10 },
            700: { slidesPerView: 1.5, spaceBetween: 18 },
            1100: { slidesPerView: 2, spaceBetween: 24 },
          }}
        >
          {featuredVideos.map(video => (
            <SwiperSlide key={`video-${video.id}`}>
              <YouTubeCard video={video} onPlay={setActiveVideo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

    {activeVideo && (
      <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
        <button type="button" className="video-modal__backdrop" aria-label="Close video" onClick={() => setActiveVideo(null)} />
        <div className="video-modal__dialog">
          <div className="video-modal__header">
            <h2 id="video-modal-title">{activeVideo.title}</h2>
            <button type="button" className="video-modal__close" onClick={() => setActiveVideo(null)} aria-label="Close video">×</button>
          </div>
          <div className="video-modal__player">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
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

export default PatientStoriesPage;

export const Head = ({ location }) => (
  <SEO title="Patient Stories | Dr. Mudit Khanna" description="Hear from patients whose mobility and confidence were restored with personalised orthopaedic care from Dr. Mudit Khanna." pathname={location.pathname} />
);
