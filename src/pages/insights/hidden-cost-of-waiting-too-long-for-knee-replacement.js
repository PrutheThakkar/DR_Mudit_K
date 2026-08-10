import React from "react";
import BlogDetail from "../../component/BlogDetail";
import { blogs } from "../../data/blogs";

const blog = blogs[1];
const Page = () => <BlogDetail blog={blog} />;
export default Page;
export const Head = () => <><title>{blog.title} | Dr. Mudit Khanna</title><meta name="description" content={blog.intro} /></>;
