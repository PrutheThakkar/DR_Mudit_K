const path = require("path");

const expertiseSlugs = [
  "hip-replacement",
  "knee-replacement",
  "regenerative-treatment",
  "pain-management",
];

// Allow SVG files imported with `?raw` to be rendered inline in the DOM.
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  const excludeRawSvgImports = (rules = []) => {
    rules.forEach((rule) => {
      if (rule.oneOf) excludeRawSvgImports(rule.oneOf);
      if (rule.rules) excludeRawSvgImports(rule.rules);

      if (rule.test instanceof RegExp && rule.test.test("map.svg")) {
        rule.resourceQuery = { not: [/raw/] };
      }
    });
  };

  excludeRawSvgImports(config.module.rules);
  config.module.rules.push({
    test: /\.svg$/i,
    resourceQuery: /raw/,
    type: "asset/source",
  });

  actions.replaceWebpackConfig(config);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const expertiseTemplate = path.resolve("src/templates/expertise.js");
  const result = await graphql(`
    query ExpertisePageSlugs {
      allWpExpertiseAll {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Unable to load Expertise page slugs", result.errors);
    return;
  }

  const wordpressSlugs = result.data.allWpExpertiseAll.nodes
    .map((node) => node.slug)
    .filter(Boolean);

  [...new Set([...expertiseSlugs, ...wordpressSlugs])].forEach((slug) =>
    actions.createPage({
      path: `/${slug}/`,
      component: expertiseTemplate,
      context: { slug },
    })
  );

  const postsResult = await graphql(`
    query BlogPostSlugs {
      allWpPost {
        nodes {
          slug
        }
      }
    }
  `);

  if (postsResult.errors) {
    reporter.panicOnBuild(
      "Unable to load WordPress post slugs",
      postsResult.errors
    );
    return;
  }

  const blogTemplate = path.resolve("src/templates/blog-post.js");
  postsResult.data.allWpPost.nodes
    .filter((post) => post.slug)
    .forEach((post) =>
      actions.createPage({
        path: `/insights/${post.slug}/`,
        component: blogTemplate,
        context: { slug: post.slug },
      })
    );
};
