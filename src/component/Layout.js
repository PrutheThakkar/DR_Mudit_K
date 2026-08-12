import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTitleAnimation from "./PageTitleAnimation";
import SiteScrollReveal from "./SiteScrollReveal";
import InteractiveMotion from "./InteractiveMotion";

import "../css/header.css";
import "../css/common.css";
import "../css/home.css";
import "../css/about.css";
import "../css/inside.css";
import "../css/contact.css";
import "../css/insights.css";
import "../css/patient-stories.css";
import "../css/button-effects.css";

const Layout = ({ children }) => {
  return (
    <>
      <a className="skip-to-content" href="#main-content">
        Skip to content
      </a>

      <Header />
      <InteractiveMotion />

      <main id="main-content" className="site-main">
        <PageTitleAnimation />
        <SiteScrollReveal />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
