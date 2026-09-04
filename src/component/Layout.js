import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTitleAnimation from "./PageTitleAnimation";
import SiteScrollReveal from "./SiteScrollReveal";
import InteractiveMotion from "./InteractiveMotion";
import SitePreloader from "./SitePreloader";

import "../css/header.css";
import "../css/common.css";
import "../css/home.css";
import "../css/about.css";
import "../css/inside.css";
import "../css/contact.css";
import "../css/insights.css";
import "../css/patient-stories.css";
import "../css/button-effects.css";
import "../css/preloader.css";

const Layout = ({ children }) => {
  return (
    <>
      <SitePreloader />
      <a className="skip-to-content" href="#main-content">
        Skip to content
      </a>

      <Header />
      <InteractiveMotion />

      <main id="main-content" className="site-main">
        {/* Start entrance animations behind the preloader so the page is
            already settled by the time the loader reveals it. */}
        <PageTitleAnimation />
        <SiteScrollReveal />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
