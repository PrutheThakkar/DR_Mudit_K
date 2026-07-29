import React, { useState } from "react";
import { Link } from "gatsby";


const faqItems = [
  {
    question: "Can my knee or hip be treated without surgery?",
    answer:
      "In early and moderate stages, many patients improve with weight management, medicines, physiotherapy, exercises, activity modification and, in some cases, injections. Surgery is usually discussed only when pain, stiffness or deformity continue despite these measures and start affecting basic daily activities like walking, climbing stairs or sleeping.",
  },
  {
    question: "When should I start thinking about joint replacement?",
    answer:
      "Joint replacement may be considered when pain becomes persistent, movement is significantly restricted and non-surgical treatments no longer provide enough relief. Your doctor will evaluate your symptoms, examination findings, X-rays and overall health before recommending surgery.",
  },
  {
    question: "How painful is hip or knee replacement surgery?",
    answer:
      "Pain after surgery is managed using modern anaesthesia, medicines, ice therapy and early physiotherapy. Most patients notice gradual improvement over the first few days, while surgical pain continues to reduce during recovery.",
  },
  {
    question: "How many days will I be in the hospital, and when can I walk?",
    answer:
      "Hospital stay is commonly between one and three days, depending on your health and recovery. Many patients begin standing or walking with support on the same day or the day after surgery under the supervision of a physiotherapist.",
  },
];

const AccordionIcon = ({ isOpen }) => {
  return (
    <span
      className={`faq-accordion__icon ${
        isOpen ? "faq-accordion__icon--active" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7L9 12L14 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="faq-section">
      <div className="faq-section__container">
        <div className="faq-section__content">
          <div className="faq-section__intro">
            <h2 className="faq-section__title">
              What patients want to know
            </h2>

            <p className="faq-section__description">
              Clear, honest answers to the questions patients most commonly
              ask before, during, and after treatment.
            </p>

            <Link to="/contact/" className="faq-section__button">
              Contact Now
            </Link>
          </div>

          <div className="faq-accordion">
            {faqItems.map((item, index) => {
              const isOpen = activeIndex === index;
              const contentId = `faq-content-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  className={`faq-accordion__item ${
                    isOpen ? "faq-accordion__item--active" : ""
                  }`}
                  key={item.question}
                >
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-accordion__button"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span className="faq-accordion__question">
                      {item.question}
                    </span>

                    <AccordionIcon isOpen={isOpen} />
                  </button>

                  <div
                    id={contentId}
                    className="faq-accordion__content"
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-accordion__content-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;