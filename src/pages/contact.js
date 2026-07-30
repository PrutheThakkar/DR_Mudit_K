import React from "react";
import { Link } from "gatsby";

import Layout from "../component/Layout";

import contactHeroImage from "../images/contact-banner.webp";



const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 21s7-6.2 7-13A7 7 0 1 0 5 8c0 6.8 7 13 7 13Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="8"
      r="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m4 7 8 6 8-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7.2 3.5 10 7.7 8.3 9.4c1.2 2.4 3.2 4.4 5.6 5.6l1.7-1.7 4.2 2.8c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 20 4 14 3.5 5.9c0-.6.3-1.2.9-1.4l2.1-.8c.2-.1.5-.1.7-.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M14 8h3V4.5c-.5-.1-1.8-.2-3.4-.2-3.3 0-5.6 2-5.6 5.8V13H4v4h4v7h5v-7h3.4l.6-4H13v-2.5C13 9.3 13.3 8 14 8Z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 10v7M8 7.4v.1M12 17v-4c0-1.7 1-3 2.7-3 1.6 0 2.3 1.1 2.3 3v4M12 10v7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ContactPage = () => {
  return (
    <Layout>
     
        {/* Hero section */}
        <section className="inside-banner">
               <div className="container">
                 <h1>
                   Expert Care For <br />
                   <span>Knee Replacement</span>
                 </h1>
                 <div className="banner-sec">
                   <img src={contactHeroImage} />
                 </div>
               </div>
             </section>

        {/* Get in touch section */}
        <section className="contact-details-section">
          <div className="container">
            <h2 className="contact-section-title">
              Get In Touch
            </h2>

            <div className="contact-details-grid">
              <div className="contact-information-card">
                <div className="contact-information-card__content">
                  <p className="contact-introduction">
                    Whether you&apos;re seeking relief from hip
                    or knee pain, exploring treatment options,
                    or looking for a second opinion, schedule a
                    consultation with Dr. Mudit Khanna for
                    personalised orthopaedic care.
                  </p>

                  <address className="contact-address">
                    <div className="contact-address__item">
                      <span className="contact-address__icon">
                        <LocationIcon />
                      </span>

                      <span>
                        Wockhardt Hospital – Mumbai Central
                      </span>
                    </div>

                    <div className="contact-address__item">
                      <span className="contact-address__icon">
                        <EmailIcon />
                      </span>

                      <a href="mailto:contact@drmuditkhanna.com">
                        contact@drmuditkhanna.com
                      </a>
                    </div>

                    <div className="contact-address__item">
                      <span className="contact-address__icon">
                        <PhoneIcon />
                      </span>

                      <a href="tel:+918657790513">
                        +91 86577 90513
                      </a>
                    </div>
                  </address>

                  <div className="contact-social">
                    <p>Connect</p>

                    <div className="contact-social__links">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit Facebook"
                      >
                        <FacebookIcon />
                      </a>

                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit Instagram"
                      >
                        <InstagramIcon />
                      </a>

                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <form
                  className="contact-form"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="contact"
                  />

                  <p className="contact-form__honeypot">
                    <label>
                      Do not fill this field:
                      <input name="bot-field" />
                    </label>
                  </p>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="first-name">
                        First name
                      </label>

                      <input
                        id="first-name"
                        type="text"
                        name="firstName"
                        placeholder="First Name*"
                        autoComplete="given-name"
                        required
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="last-name">
                        Last name
                      </label>

                      <input
                        id="last-name"
                        type="text"
                        name="lastName"
                        placeholder="Last Name*"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="phone-number">
                        Phone number
                      </label>

                      <input
                        id="phone-number"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number*"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="email-address">
                        Email address
                      </label>

                      <input
                        id="email-address"
                        type="email"
                        name="email"
                        placeholder="Email Address*"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="message">
                      Your message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message*"
                      rows="7"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-form__submit"
                  >
                    Book An Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact and location section */}
        <section className="contact-location-section">
          <div className="container">
            <div className="contact-location-grid">
              <div className="contact-location-content">
                <h2>Contact &amp; Location</h2>

                <p>
                  Have a question or need to plan a visit?
                  <br />
                  Personalised care, led directly by the doctor.
                </p>

                <Link
                  to="/book-an-appointment/"
                  className="contact-location-content__button"
                >
                  Book An Appointment
                </Link>
              </div>

              <div className="contact-map">
                <iframe
                  title="Wockhardt Hospital Mumbai Central location"
                  src="https://www.google.com/maps?q=Wockhardt%20Hospitals%20Mumbai%20Central&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="contact-location-bar">
              <div className="contact-location-bar__item">
                <LocationIcon />

                <span>
                  Wockhardt Hospital – Mumbai Central
                </span>
              </div>

              <div className="contact-location-bar__item">
                <EmailIcon />

                <a href="mailto:contact@drmuditkhanna.com">
                  contact@drmuditkhanna.com
                </a>
              </div>

              <div className="contact-location-bar__item">
                <PhoneIcon />

                <a href="tel:+918657790513">
                  +91 86577 90513
                </a>
              </div>
            </div>
          </div>
        </section>
     
    </Layout>
  );
};

export default ContactPage;

export const Head = () => (
  <>
    <html lang="en" />

    <title>
      Contact Dr. Mudit Khanna | Book an Appointment
    </title>

    <meta
      name="description"
      content="Contact Dr. Mudit Khanna for personalised hip and knee treatment, second opinions and orthopaedic consultations in Mumbai."
    />
  </>
);