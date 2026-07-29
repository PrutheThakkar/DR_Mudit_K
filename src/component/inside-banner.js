import React, { useState } from "react";
import { Link } from "gatsby";

import aboutImage from "../images/about-banner.webp";




const AboutBanner = () => {

  return (
    <section className="inside-banner">
      <div className="container">
        <h1>Where Athletic Instinct Meets <br /><span>Surgical Precision</span></h1>
        <div className="banner-sec">
          <img src={aboutImage} />
        </div>
        <p>Dr. Mudit Khanna is a hip and knee replacement and arthroscopy specialist with over 18 years of focused orthopaedic experience.  An active sportsman and member of the Indian Medical Tennis Team, he brings the same discipline, focus, and strategic thinking from the court to every joint he evaluates. He believes that good outcomes start with understanding the joint and the patient, not just imaging or tests. Every recommendation,whether conservative care, partial replacement, or complex surgery is made  with precision and clear reasoning.</p>
      </div>
    </section>
  );
};

export default AboutBanner;