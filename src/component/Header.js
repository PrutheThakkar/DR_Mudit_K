import React, { useState } from "react";
import { Link } from "gatsby";

import logo from "../images/DMK_Logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = dropdownName => {
    setActiveDropdown(current =>
      current === dropdownName ? null : dropdownName
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="header">
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

        <button
          type="button"
          className={`header__menu-button ${
            menuOpen ? "is-active" : ""
          }`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(current => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
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
            onClick={closeMenu}
          >
            About
          </Link>

          <div
            className={`nav__item nav__item--has-dropdown ${
              activeDropdown === "expertise" ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className="nav__link nav__link--button"
              aria-expanded={activeDropdown === "expertise"}
              onClick={() => toggleDropdown("expertise")}
            >
              Expertise

              <span className="nav__arrow" aria-hidden="true">
                ↓
              </span>
            </button>

            <div className="nav__dropdown">
              <Link
                to="/expertise/knee-replacement/"
                className="nav__dropdown-link"
                onClick={closeMenu}
              >
                Knee Replacement
              </Link>

              <Link
                to="/expertise/hip-replacement/"
                className="nav__dropdown-link"
                onClick={closeMenu}
              >
                Hip Replacement
              </Link>

              <Link
                to="/expertise/sports-injuries/"
                className="nav__dropdown-link"
                onClick={closeMenu}
              >
                Sports Injuries
              </Link>
            </div>
          </div>

          <Link
            to="/insights/"
            className="nav__link"
            activeClassName="is-active"
            onClick={closeMenu}
          >
            Insights
          </Link>

          <Link
            to="/patient-stories/"
            className="nav__link"
            activeClassName="is-active"
            onClick={closeMenu}
          >
            Patient Stories
          </Link>

          <Link
            to="/contact/"
            className="header__cta"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;