import React from "react";

import aboutImage from "../images/about-banner.webp";

const InsideBanner = ({
  title = "Where Athletic Instinct Meets",
  highlightedTitle = "Surgical Precision",
  image = aboutImage,
  imageAlt = "Dr. Mudit Khanna's orthopaedic care",
  description = "Dr. Mudit Khanna is a hip and knee replacement and arthroscopy specialist with over 18 years of focused orthopaedic experience. An active sportsman and member of the Indian Medical Tennis Team, he brings the same discipline, focus, and strategic thinking from the court to every joint he evaluates. He believes that good outcomes start with understanding the joint and the patient, not just imaging or tests. Every recommendation, whether conservative care, partial replacement, or complex surgery is made with precision and clear reasoning.",
}) => (
  <section className="inside-banner">
    <div className="container">
      <h1>
        {title} <br />
        <span>{highlightedTitle}</span>
      </h1>
      <div className="banner-sec">
        <img src={image} alt={imageAlt} />
      </div>
      {description && <p>{description}</p>}
    </div>
  </section>
);

export default InsideBanner;
