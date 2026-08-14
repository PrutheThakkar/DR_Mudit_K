import React from "react";
import { graphql } from "gatsby";

import BlogDetail from "../component/BlogDetail";
import SEO from "../component/SEO";

const BlogPostTemplate = ({ data }) => {
  const post = data?.wpPost;

  if (!post) return null;

  return <BlogDetail post={post} relatedPosts={data.allWpPost.nodes} />;
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      id
      title
      slug
      excerpt
      content
      date(formatString: "MMMM D, YYYY")
      featuredImage {
        node {
          altText
          mediaItemUrl
          title
        }
      }
    }
    allWpPost(filter: { slug: { ne: $slug } }, sort: { date: DESC }, limit: 2) {
      nodes {
        id
        title
        slug
        content
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const Head = ({ data, location }) => {
  const post = data?.wpPost;
  const description = post?.excerpt?.replace(/<[^>]*>/g, " ").trim();

  return (
    <SEO
      title={`${post?.title || "Insight"} | Dr. Mudit Khanna`}
      description={description}
      pathname={location.pathname}
    />
  );
};
