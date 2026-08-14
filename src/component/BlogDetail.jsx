import React from "react";
import { Link } from "gatsby";

import Layout from "./Layout";

const getReadTime = (content) => {
  const text = content?.replace(/<[^>]*>/g, " ").trim() || "";
  const words = text ? text.split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BlogDetail = ({ post, relatedPosts = [] }) => {
  return (
    <Layout>
      <article className="blog-detail">
        <header className="container blog-detail__header">
          <Link to="/insights/" className="blog-detail__back">
            ← Back to Insights
          </Link>
          <div className="blog-detail__meta">
            <span>Insights</span>
            <span aria-hidden="true">•</span>
            <span>{getReadTime(post.content)}</span>
          </div>
          <h1>{post.title}</h1>
          {post.excerpt && (
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          )}
        </header>

        {post.featuredImage?.node?.mediaItemUrl && (
          <div className="container blog-detail__hero">
            <img
              src={post.featuredImage.node.mediaItemUrl}
              alt={post.featuredImage.node.altText || post.title}
            />
          </div>
        )}

        <div
          className="container blog-detail__body blog-detail__wordpress-content"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      <section className="related-insights">
        <div className="container">
          <div className="insights-section-heading">
            <h2>More Insights</h2>
            <Link to="/insights/">
              View all <ArrowIcon />
            </Link>
          </div>
          <div className="insights-grid insights-grid--related">
            {relatedPosts.map((item) => (
              <Link
                to={`/insights/${item.slug}/`}
                className="insight-card"
                key={item.id}
              >
                <div className="insight-card__image">
                  {item.featuredImage?.node?.mediaItemUrl && (
                    <img
                      src={item.featuredImage.node.mediaItemUrl}
                      alt={item.featuredImage.node.altText || item.title}
                    />
                  )}
                </div>
                <div className="insight-card__content">
                  <span>Insights · {getReadTime(item.content)}</span>
                  <h3>{item.title}</h3>
                  <span className="insight-card__link">
                    Read article <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
