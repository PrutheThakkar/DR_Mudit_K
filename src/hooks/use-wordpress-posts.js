import { graphql, useStaticQuery } from "gatsby";

/**
 * Returns published WordPress posts sourced during the Gatsby build.
 * Import this hook in a React component when WordPress posts are needed.
 */
const useWordPressPosts = () => {
  const data = useStaticQuery(graphql`
    query WordPressPosts {
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          databaseId
          title
          excerpt
          content
          date(formatString: "MMMM D, YYYY")
          uri
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  `);

  return data.allWpPost.nodes;
};

export default useWordPressPosts;
