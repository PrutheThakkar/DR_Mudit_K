import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "../css/header.css";
import "../css/common.css";
import "../css/home.css";
import "../css/about.css";
import "../css/inside.css";

const Layout = ({ children }) => {
  return (
    <>
      <a className="skip-to-content" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="site-main">
        {children}
      </main>
       <Footer />
    </>
  );
};

export default Layout;