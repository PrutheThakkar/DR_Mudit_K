const GA_MEASUREMENT_ID = process.env.GATSBY_GA_MEASUREMENT_ID;

exports.onRouteUpdate = ({ location }) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: location.href,
    page_path: `${location.pathname}${location.search}${location.hash}`,
  });
};
