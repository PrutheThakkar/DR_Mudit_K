import React from "react";
import { Link } from "gatsby";

import Layout from "./Layout";
import { blogPath, blogs } from "../data/blogs";

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BlogDetail = ({ blog }) => {
  const relatedBlogs = blogs.filter(item => item.slug !== blog.slug).slice(0, 2);

  return (
    <Layout>
      <article className="blog-detail">
        <header className="container blog-detail__header">
          <Link to="/insights/" className="blog-detail__back">← Back to Insights</Link>
          <div className="blog-detail__meta">
            <span>{blog.category}</span>
            <span aria-hidden="true">•</span>
            <span>{blog.readTime}</span>
          </div>
          <h1>{blog.title}</h1>
          <p>{blog.intro}</p>
        </header>

        <div className="container blog-detail__hero">
          <img src={blog.image} alt={blog.title} />
        </div>

        <div className="container blog-detail__body">
          {blog.sections.map(section => (
            <section key={section.heading} className="blog-detail__section">
              <h2>{section.heading}</h2>
              {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}

        
        </div>
      </article>

      <section className="related-insights">
        <div className="container">
          <div className="insights-section-heading">
            <h2>More Insights</h2>
            <Link to="/insights/">View all <ArrowIcon /></Link>
          </div>
          <div className="insights-grid insights-grid--related">
            {relatedBlogs.map(item => (
              <Link to={blogPath(item.slug)} className="insight-card" key={item.slug}>
                <div className="insight-card__image"><img src={item.image} alt="" /></div>
                <div className="insight-card__content">
                  <span>{item.category} · {item.readTime}</span>
                  <h3>{item.shortTitle}</h3>
                  <span className="insight-card__link">Read article <ArrowIcon /></span>
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
