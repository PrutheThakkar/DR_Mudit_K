import React from "react";
import { Link } from "gatsby";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__content">
            <h2 className="site-footer__title">
              Contact &amp; Location
            </h2>

            <p className="site-footer__description">
              Have a question or need to plan a visit?
              <br />
              Personalised care, led directly by the doctor.
            </p>

            <Link
              to="/contact/"
              className="btn btn--primary site-footer__appointment"
            >
              Book An Appointment
            </Link>

            <div className="site-footer__navigation">
              <div className="site-footer__nav-column">
                <h3>Home</h3>

                <ul>
                  <li>
                    <Link to="/about/">About</Link>
                  </li>

                  <li>
                    <Link to="/insights/">Insights</Link>
                  </li>

                  <li>
                    <Link to="/patient-stories/">
                      Patient Stories
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact/">Contact</Link>
                  </li>
                </ul>
              </div>

              <div className="site-footer__nav-column">
                <h3>Explore</h3>

                <ul>
                  <li>
                    <Link to="/blogs/">Blogs</Link>
                  </li>

                  <li>
                    <Link to="/faqs/">FAQs</Link>
                  </li>
                </ul>
              </div>

              <div className="site-footer__nav-column">
                <h3>Expertise</h3>

                <ul>
                  <li>
                    <Link to="/knee-replacement/">
                      Knee Replacement
                    </Link>
                  </li>

                  <li>
                    <Link to="/hip-replacement/">
                      Hip Replacement
                    </Link>
                  </li>

                  <li>
                    <Link to="/regenerative-treatment/">
                      Regenerative Treatment
                    </Link>
                  </li>

                  <li>
                    <Link to="/pain-management/">
                      Pain Management
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="site-footer__location">
            <div className="site-footer__map">
              <iframe
                title="Wockhardt Hospital Mumbai Central"
                src="https://www.google.com/maps?q=Wockhardt%20Hospitals%20Mumbai%20Central&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="site-footer__contact-row">
              <a
                href="https://maps.google.com/?q=Wockhardt+Hospital+Mumbai+Central"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__contact-item"
              >
                <FaMapMarkerAlt aria-hidden="true" />

                <span>
                  Wockhardt Hospital - Mumbai Central
                </span>
              </a>

              <a
                href="mailto:contact@drmuditkhanna.com"
                className="site-footer__contact-item"
              >
                <FaEnvelope aria-hidden="true" />

                <span>contact@drmuditkhanna.com</span>
              </a>

              <a
                href="tel:+918657790513"
                className="site-footer__contact-item"
              >
                <FaPhoneAlt aria-hidden="true" />

                <span>+91 86577 90513</span>
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span className="site-footer__connect-label">
            Connect
          </span>

          <div className="site-footer__socials">
            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;