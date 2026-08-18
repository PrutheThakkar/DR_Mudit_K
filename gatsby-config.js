require("dotenv").config();

// Netlify sets CONTEXT to "production", "deploy-preview", or "branch-deploy"
// at build time. Only the real production build should be crawlable —
// deploy previews and branch deploys get a blanket disallow so they never
// leak into Google's index as duplicate content.
const isProductionBuild = process.env.CONTEXT
  ? process.env.CONTEXT === "production"
  : process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: `Dr. Mudit Khanna`,
    description: `Personalised robotic hip and knee replacement care from orthopaedic surgeon Dr. Mudit Khanna in Mumbai.`,
    author: `Dr. Mudit Khanna`,
    // IMPORTANT: before going live on the real domain, set GATSBY_WEBSITE_URL
    // in Netlify's Site settings -> Environment variables. Canonical URLs,
    // Open Graph tags, the sitemap, and robots.txt all derive from this.
    siteUrl:
      process.env.GATSBY_WEBSITE_URL || `https://drmuditkk.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          process.env.GATSBY_WPGRAPHQL_URL ||
          `https://drmuditk.studiosentientdemo.com/graphql`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dr. Mudit Khanna`,
        short_name: `Dr. Mudit Khanna`,
        description: `Robotic hip and knee replacement care from orthopaedic surgeon Dr. Mudit Khanna in Mumbai.`,
        start_url: `/`,
        // TODO: swap these for the site's actual brand colours.
        background_color: `#ffffff`,
        theme_color: `#0b2f4a`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/404/`, `/404.html`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: isProductionBuild
          ? [{ userAgent: `*`, allow: `/` }]
          : [{ userAgent: `*`, disallow: `/` }],
      },
    },
  ],
};
