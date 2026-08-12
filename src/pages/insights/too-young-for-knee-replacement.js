import React from "react";
import BlogDetail from "../../component/BlogDetail";
import SEO from "../../component/SEO";
import { blogs } from "../../data/blogs";

const blog = blogs[2];
const Page = () => <BlogDetail blog={blog} />;
export default Page;
export const Head = ({ location }) => <SEO title={`${blog.title} | Dr. Mudit Khanna`} description={blog.intro} pathname={location.pathname} article />;
