import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

import logo from "../images/DMK_Logo.svg";

import hipImage from "../images/expertise-1.webp";
import kneeImage from "../images/expertise-2.webp";
import regenerativeImage from "../images/expertise-3.webp";
import painManagementImage from "../images/expertise-4.webp";

const expertiseItems = [
  {
    title: "Hip Replacement",
    image: hipImage,
    link: "/hip-replacement/",
  },
  {
    title: "Knee Replacement",
    image: kneeImage,
    link: "/knee-replacement/",
  },
  {
    title: "Regenerative Treatment",
    image: regenerativeImage,
    link: "/regenerative-treatment/",
  },
  {
    title: "Pain Management",
    image: painManagementImage,
    link: "/pain-management/",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const expertiseOpen = activeDropdown === "expertise";

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1101px)").matches;

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const openDesktopDropdown = () => {
    if (isDesktop()) {
      setActiveDropdown("expertise");
    }
  };

  const closeDesktopDropdown = () => {
    if (isDesktop()) {
      setActiveDropdown(null);
    }
  };

  const handleExpertiseClick = event => {
    if (!isDesktop()) {
      event.preventDefault();
      setActiveDropdown(current =>
        current === "expertise" ? null : "expertise"
      );
      return;
    }

    closeMenu();
  };

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    const handleEscape = event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container header__container">
        <Link
          to="/"
          className="header__logo"
          aria-label="Dr. Mudit Khanna home"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Dr. Mudit Khanna Orthopaedic Surgeon"
          />
        </Link>

        <nav
          id="primary-navigation"
          className={`header__nav ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="nav__link"
            activeClassName="is-active"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/about/"
            className="nav__link"
            activeClassName="is-active"
            partiallyActive
            onClick={closeMenu}
          >
            About
          </Link>

          <div
            className={`nav__item nav__item--has-dropdown ${
              expertiseOpen ? "is-open" : ""
            }`}
            onMouseEnter={openDesktopDropdown}
            onMouseLeave={closeDesktopDropdown}
          >
            <Link
              to={expertiseItems[0].link}
              className="nav__link nav__link--button"
              getProps={({ location }) =>
                expertiseItems.some(item =>
                  location.pathname.startsWith(item.link)
                )
                  ? { className: "nav__link nav__link--button is-active" }
                  : {}
              }
              aria-expanded={expertiseOpen}
              aria-controls="expertise-mega-menu"
              onClick={handleExpertiseClick}
            >
              <span>Expertise</span>

              <svg
                className="nav__arrow"
                viewBox="0 0 12 8"
                aria-hidden="true"
              >
                <path
                  d="M1 1.5 6 6.5l5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div
              id="expertise-mega-menu"
              className="nav__dropdown"
            >
              <div className="nav__dropdown-grid">
                {expertiseItems.map(item => (
                  <Link
                    key={item.title}
                    to={item.link}
                    className="expertise-menu-card"
                    activeClassName="is-active"
                    partiallyActive
                    onClick={closeMenu}
                  >
                    <div className="expertise-menu-card__image">
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                    <div className="expertise-menu-card__content">
                      <span>{item.title}</span>

                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 10h10M11 6l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/insights/"
            className="nav__link"
            activeClassName="is-active"
            partiallyActive
            onClick={closeMenu}
          >
            Insights
          </Link>

          <Link
            to="/patient-stories/"
            className="nav__link"
            activeClassName="is-active"
            partiallyActive
            onClick={closeMenu}
          >
            Patient Stories
          </Link>

          <Link
            to="/contact/"
            className="header__cta header__cta--mobile"
            activeClassName="is-active"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>

        <Link
          to="/contact/"
          className="header__cta header__cta--desktop"
          activeClassName="is-active"
          onClick={closeMenu}
        >
          Contact
        </Link>

        <button
          type="button"
          className={`header__menu-button ${
            menuOpen ? "is-active" : ""
          }`}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen(current => !current);

            if (menuOpen) {
              setActiveDropdown(null);
            }
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        type="button"
        className={`header__overlay ${
          menuOpen ? "is-visible" : ""
        }`}
        aria-label="Close navigation"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  );
};

export default Header;
