import React, { useState } from "react";

import Layout from "../component/Layout";
import SEO from "../component/SEO";

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
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Silently accept bot submissions caught by the honeypot.
    if (formData.get("bot-field")) {
      form.reset();
      setFormStatus("success");
      setFormMessage("Thank you. Your appointment request has been received.");
      return;
    }

    const webhookUrl = process.env.GATSBY_N8N_CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      setFormStatus("error");
      setFormMessage("The appointment form is not configured yet. Please call or email us.");
      return;
    }

    setFormStatus("submitting");
    setFormMessage("");

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      source: "website-contact-form",
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook returned ${response.status}`);
      }

      form.reset();
      setFormStatus("success");
      setFormMessage("Thank you. Your appointment request has been received.");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormStatus("error");
      setFormMessage("We could not send your request. Please try again or contact us directly.");
    }
  };

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
                  onSubmit={handleSubmit}
                >
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
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting"
                      ? "Sending..."
                      : "Book An Appointment"}
                  </button>

                  {formMessage && (
                    <p
                      className={`contact-form__status contact-form__status--${formStatus}`}
                      role={formStatus === "error" ? "alert" : "status"}
                      aria-live="polite"
                    >
                      {formMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

       
     
    </Layout>
  );
};

export default ContactPage;

export const Head = ({ location }) => (
  <SEO title="Contact Dr. Mudit Khanna | Book an Appointment" description="Contact Dr. Mudit Khanna for personalised hip and knee treatment, second opinions and orthopaedic consultations in Mumbai." pathname={location.pathname} />
);
