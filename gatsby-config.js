require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Dr. Mudit Khanna`,
    description: `Personalised robotic hip and knee replacement care from orthopaedic surgeon Dr. Mudit Khanna in Mumbai.`,
    author: `Dr. Mudit Khanna`,
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
  ],
};
