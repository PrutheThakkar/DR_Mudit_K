const path = require("path");

const expertiseSlugs = [
  "hip-replacement",
  "knee-replacement",
  "regenerative-treatment",
  "pain-management",
];

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const expertiseTemplate = path.resolve("src/templates/expertise.js");

  expertiseSlugs.forEach(slug => {
    createPage({
      path: `/${slug}/`,
      component: expertiseTemplate,
      context: { slug },
    });
  });
};
