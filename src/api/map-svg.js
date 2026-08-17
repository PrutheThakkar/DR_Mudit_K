const WORDPRESS_MAP_SVG_URL =
  "https://drmuditk.studiosentientdemo.com/wp-content/uploads/2026/08/global-map-1.svg";

export default async function handler(req, res) {
  try {
    const response = await fetch(WORDPRESS_MAP_SVG_URL);

    if (!response.ok) {
      throw new Error(`WordPress returned ${response.status}`);
    }

    const svgMarkup = await response.text();

    if (!svgMarkup.includes("<svg")) {
      throw new Error("WordPress response was not valid SVG markup");
    }

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    );
    res.status(200).send(svgMarkup);
  } catch (error) {
    res.status(502).json({
      error: "Unable to load the WordPress map SVG",
    });
  }
}
