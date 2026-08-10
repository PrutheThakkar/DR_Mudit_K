import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../component/Layout";
import { blogPath, blogs } from "../data/blogs";
import bannerImage from "../images/insights-banner.webp";

const faqs = [
  {
    question: "Can my knee or hip be treated without surgery?",
    answer: "In early and moderate stages, many patients improve with weight management, medicines, physiotherapy, exercises, activity modification and, in some cases, injections. Surgery is usually discussed only when pain, stiffness or deformity continues despite these measures and starts affecting basic daily activities like walking, climbing stairs or sleeping.",
  },
  {
    question: "When should I start thinking about joint replacement?",
    answer: "Consider an assessment when pain is persistent, sleep or mobility is affected, and appropriate non-surgical care no longer gives enough relief. The decision is based on your symptoms, examination, X-rays, health and goals—not on age alone.",
  },
  {
    question: "How painful is hip or knee replacement surgery?",
    answer: "Modern anaesthesia, multimodal pain relief and early movement make recovery more manageable. Discomfort is expected, especially during the first days, but the care team adjusts medication and therapy to help you progress safely.",
  },
  {
    question: "How many days will I be in the hospital, and when can I walk?",
    answer: "Many patients stand or walk with assistance on the day of surgery or the following day. The hospital stay varies with the procedure and your health, but is commonly a few days when recovery is uncomplicated.",
  },
  {
    question: "Will I be able to sit cross-legged or use Indian toilets after surgery?",
    answer: "Some patients regain enough movement for these positions, but they are not guaranteed and may not be advised for everyone. Your pre-operative mobility, implant, strength and rehabilitation all influence what is safe.",
  },
  {
    question: "How long does a knee or hip replacement last?",
    answer: "Joint replacements are designed for long-term use, and many perform well for decades. Longevity varies with activity, weight, implant type, surgical factors and individual biology.",
  },
  {
    question: "What are the main risks of joint replacement?",
    answer: "Risks include infection, blood clots, stiffness, instability, nerve or vessel injury and the possibility of further surgery. Your surgeon should explain your individual risk and the steps used to reduce it.",
  },
  {
    question: "What is the difference between conventional and robotic-assisted knee replacement?",
    answer: "Both use established knee implants. Robotic assistance provides additional planning and intra-operative measurements that can help the surgeon position components for the individual knee. It remains a surgeon-controlled tool rather than an autonomous operation.",
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InsightsPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <Layout>
      <section className="insights-hero">
        <div className="container">
          <h1>Beyond<br /><span>The Diagnosis</span></h1>
          <div className="insights-hero__image">
            <img src={bannerImage} alt="Advanced knee replacement implant illustration" />
          </div>
        </div>
      </section>

      <section id="blogs" className="insights-listing">
        <div className="container">
          <div className="insights-section-heading insights-section-heading--center">
            <span>Helpful guidance for better decisions</span>
            <h2>Blogs</h2>
          </div>

          <div className="insights-grid">
            {blogs.map(blog => (
              <Link to={blogPath(blog.slug)} className="insight-card" key={blog.slug}>
                <div className="insight-card__image"><img src={blog.image} alt="" /></div>
                <div className="insight-card__content">
                  <span>{blog.category} · {blog.readTime}</span>
                  <h3>{blog.shortTitle}</h3>
                  <span className="insight-card__link">Read article <ArrowIcon /></span>
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
                <div className={`insights-faq__item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                      <span>{faq.question}</span>
                      <svg viewBox="0 0 14 8" aria-hidden="true"><path d="m1 1 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </button>
                  </h3>
                  <div id={`faq-answer-${index}`} className="insights-faq__answer" hidden={!isOpen}><p>{faq.answer}</p></div>
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

export const Head = () => (
  <>
    <title>Insights | Dr. Mudit Khanna</title>
    <meta name="description" content="Practical orthopaedic guidance on knee replacement, joint health, recovery and treatment decisions from Dr. Mudit Khanna." />
  </>
);
