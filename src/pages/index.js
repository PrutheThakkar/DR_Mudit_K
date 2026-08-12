import React, { useState, useLayoutEffect } from "react";
import { Link } from "gatsby";

import Layout from "../component/Layout";
import FaqSection from "../component/faq";
import SEO from "../component/SEO";

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

import aboutImage from "../images/dmk_homepage_about.webp";
import homeMetalImage from "../images/home-banner.png";
import whyChooseImage from "../images/why-choose-dr-mudit.webp";
import expimg1 from "../images/hip-replacement.webp";
import expimg2 from "../images/knee-replacement.webp";
import expimg3 from "../images/regenerative-treatment.webp";
import expimg4 from "../images/pain-management.webp";

import patientStory1Img from "../images/patient_stories_4_manish_anand.webp";
import patientStory2Img from "../images/patient_stories_1_louise_w.webp";
import patientStory3Img from "../images/patient_stories_2_ronak_khemka.webp";
import patientStory4Img from "../images/patient_stories_3_jeff_rouse.webp";

const faqItems = [
  {
    question: "Can my knee or hip be treated without surgery?",
    answer:
      "In early and moderate stages, many patients improve with weight management, medicines, physiotherapy, exercises, activity modification and, in some cases, injections. Surgery is usually discussed only when pain, stiffness or deformity continue despite these measures and start affecting basic daily activities like walking, climbing stairs or sleeping.",
  },
  {
    question: "When should I start thinking about joint replacement?",
    answer:
      "Joint replacement may be considered when pain and stiffness become persistent, daily activities become difficult and non-surgical treatments no longer provide enough relief.",
  },
  {
    question: "How painful is hip or knee replacement surgery?",
    answer:
      "Modern anaesthesia, pain-control techniques and rehabilitation planning help manage discomfort effectively. Pain usually reduces gradually as healing and mobility improve.",
  },
  {
    question:
      "How many days will I be in the hospital, and when can I walk?",
    answer:
      "Hospital stay depends on the procedure and the patient's overall health. Many patients begin assisted walking shortly after surgery under the guidance of the medical and physiotherapy team.",
  },
];

const patientStories = [
  {
    id: 1,
    image: patientStory1Img,
    imageAlt: "Patient with the orthopaedic medical team",
    quote:
      "My father underwent a robotic partial knee replacement surgery performed by Dr. Khanna. Surgery – The operation went very well, and my father was able to walk properly within a few days without needing a walker. Partial knee surgery is considered quite tricky, but the doctor performed it with perfection. Professional Behaviour – Dr. Khanna and his team were very professional from the beginning. They patiently addressed all our concerns, were always available for questions, and provided clear and helpful responses. Post-Surgery Care – The doctor and his team continued to support us after the surgery, which kept us motivated. My father felt very positive throughout his recovery. Recommendation – I would highly recommend Dr. Khanna to anyone considering orthopaedic surgery. You will truly be in good hands.",
    name: "Manish Anand",
  },
  {
    id: 2,
    image: patientStory2Img,
    imageAlt: "Patient after successful knee replacement",
    quote:
      "I traveled to India from New Zealand to get a hip replacement. I was lucky enough to have been referred to Dr Mudit Khanna. Dr Khanna was more than willing to answer all my pre op questions and after reading his credentials, I was very confident in his abilities. He is a revered orthopaedic surgeon and highly respected. My operation went smoothly and after two weeks I was walking normally. The post op care was exceptional and I was discharged from hospital only when I was feeling well and ready to leave. Dr Khanna took the time to take me through any restrictions and showed me how to walk correctly to maximise my recovery. I highly recommend Dr Mudit Khanna and thank you for enabling me to return to my active lifestyle.",
    name: "Louise W",
  },
  {
    id: 3,
    image: patientStory3Img,
    imageAlt: "Patient during orthopaedic recovery",
    quote:
      "I came from Myanmar relating bilateral knee replacement surgery of my mother with Dr.Mudit Khanna. The Doctor explained us well about the surgery, he has alot of patience and kindness.He has Gifted hands, the surgery went perfect for both knees. Dr.Mudit Khanna and his team,Dr.Ramiz and Ms.Bhakti continued caring my mother so much that she was able to walk on the same day of surgery and recovering at her best.He is very very reliable and trustworthy, from the first meet of OPD day to discharge and follow-up, he took care of my mom with full responsibility. As the Doctor promised, we had no worries about the surgery and recovery.He made my mother walk again and stand on her knees independently. We are so grateful for your exceptional care.May your days be healthy like you make it for others.",
    name: "Ronak Khemka",
  },
  {
    id: 4,
    image: patientStory4Img,
    imageAlt: "Patient following robotic partial knee replacement",
    quote:
      "First thing I would like to say is that if you are considering any type of orthopaedic surgery then Dr Mudit Khanna is your man. I have just spent the last 2 1/2 weeks at Wockhardt Hospital having my knee replaced by Dr Khanna and his wonderful team. From the very first meeting with Dr Khanna you are made to feel at ease with your about to go through. The before and after care could not be any better and Dr Khanna’s calm and positive attitude makes it much easier. I would have no hesitation to recommend him and his team as the whole experience has been 1st class and hugely cost effective. Thank you again Dr Khanna!",
    name: "Jeff Rouse",
  },
];



const IndexPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = index => {
    setActiveIndex(currentIndex =>
      currentIndex === index ? null : index
    );
  };

  useLayoutEffect(() => {

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
          <img className="home-hero__metal" src={homeMetalImage} alt="" />
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
            <div className="left">
              <h3>
                Dr Mudit Khanna · MCh, MRCS, MS Orthopaedics
              </h3>

              <p>
                Senior Orthopaedic &amp; Joint Replacement Surgeon
                <br />
                Wockhardt Hospitals, Mumbai Central
              </p>
            </div>

            <div className="right">
              {/* <Link
                to="/contact/"
                className="btn btn--primary home-hero__button"
              >
                Book An Appointment
              </Link> */}

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
            <img
              src={aboutImage}
              alt="Dr. Mudit Khanna"
            />
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

          <div className="right">
            <h2>Meet Dr. Mudit Khanna</h2>

            <p>
              Dr. Mudit Khanna is a fellowship-trained Consultant Joint
              Replacement Surgeon with over 18 years of specialized experience
              in hip and knee replacement. Trained at leading orthopaedic
              centres across the UK, Germany, USA and Singapore, he is
              recognized for pioneering the Direct Anterior Approach (DAA) Hip
              Replacement in India.
            </p>

            <p>
              Among the few surgeons specializing in robotic-assisted hip and
              knee replacement, he combines advanced technology with a
              patient-first approach to deliver precise, personalized care.
            </p>

            <p>
              Committed to innovation and evidence-based treatment, Dr. Khanna
              recommends surgery only when it offers the best path to lasting
              mobility, comfort and quality of life.
            </p>
          </div>
        </div>
      </section>

      <section className="precision-every-joint">
        <div className="container">
          <h2>Precision in Every Joint</h2>

          <div className="column-wrap">
            <div className="columns top">
              <div className="left">
                <h3>Hip Replacement</h3>

                <p className="paragraph">
                  Hip replacement restores smooth, pain-free movement by
                  replacing the damaged hip joint with advanced artificial
                  components. It is often recommended when arthritis, avascular
                  necrosis or injury causes persistent pain, stiffness and
                  reduced mobility despite conservative treatment.
                </p>

                <div className="img-wrap">
                  <img
                    src={expimg1}
                    alt="Hip replacement"
                  />
                </div>

                <Link to="/hip-replacement/">
                  Learn More
                </Link>
              </div>

              <div className="right">
                <h3>Knee Replacement</h3>

                <p className="paragraph">
                  Knee replacement replaces the damaged knee joint with
                  advanced implants to relieve pain, restore mobility and
                  improve quality of life when non-surgical treatments no
                  longer provide relief.
                </p>

                <div className="img-wrap">
                  <img
                    src={expimg2}
                    alt="Hip replacement"
                  />
                </div>

                <Link to="/knee-replacement/">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="columns bottom">
              <div className="left">
                <h3>Regenerative Treatment</h3>

                <p className="paragraph">
                  Stimulates the body's natural healing to reduce pain, repair
                  damaged tissues and improve joint function.
                </p>

                <div className="img-wrap">
                  <img
                    src={expimg3}
                    alt="Hip replacement"
                  />
                </div>

                <Link to="/regenerative-treatment/">
                  Learn More
                </Link>
              </div>

              <div className="right">
                <h3>Pain Management</h3>

                <p className="paragraph">
                  Personalized treatments to relieve chronic joint pain,
                  improve mobility and enhance your quality of life.
                </p>

                <div className="img-wrap">
                  <img
                    src={expimg4}
                    alt="Hip replacement"
                  />
                </div>

                <Link to="/pain-management/">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-mudit-khanna">
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

      <FaqSection />

    </Layout>
  );
};

export default IndexPage;

export const Head = ({ location }) => (
  <SEO title="Dr. Mudit Khanna | Robotic Hip & Knee Surgeon" description="Dr. Mudit Khanna is a robotic hip and knee replacement surgeon providing personalised orthopaedic care in Mumbai." pathname={location.pathname} />
);
