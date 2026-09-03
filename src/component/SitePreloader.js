import React, { useEffect, useState } from "react";

import logo from "../images/DMK_Logo.svg";

let initialLoadComplete = false;

const SitePreloader = () => {
  const [status, setStatus] = useState(
    initialLoadComplete ? "hidden" : "loading"
  );

  useEffect(() => {
    if (initialLoadComplete) return undefined;

    const startedAt = window.performance.now();
    let finishTimer;
    let removeTimer;

    const finishLoading = () => {
      const elapsed = window.performance.now() - startedAt;
      const remaining = Math.max(0, 700 - elapsed);

      finishTimer = window.setTimeout(() => {
        setStatus("complete");
        initialLoadComplete = true;
        document.body.classList.remove("is-preloading");
        removeTimer = window.setTimeout(() => setStatus("hidden"), 650);
      }, remaining);
    };

    document.body.classList.add("is-preloading");

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(finishTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("is-preloading");
    };
  }, []);

  if (status === "hidden") return null;

  return (
    <div
      className={`site-preloader ${
        status === "complete" ? "is-complete" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={status === "complete" ? "Website loaded" : "Loading website"}
    >
      <div className="site-preloader__glow" aria-hidden="true" />
      <div className="site-preloader__content">
        <img
          className="site-preloader__logo"
          src={logo}
          alt="Dr. Mudit Khanna Orthopaedic Surgeon"
        />
        <div className="site-preloader__track" aria-hidden="true">
          <span />
        </div>
        <span className="site-preloader__label">
          {status === "complete" ? "Ready" : "Loading"}
        </span>
      </div>
    </div>
  );
};

export default SitePreloader;
