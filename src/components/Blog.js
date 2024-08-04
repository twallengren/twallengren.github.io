import React from 'react';
import BaseSection, {SectionTitle} from './BaseSection';

const Blog = () => {
  return (
    <BaseSection id="blog">
      <SectionTitle>Blog</SectionTitle>
      <ul>
        <li>
          <h3>Blog Post Title 1</h3>
          <p>Brief description or excerpt of the blog post.</p>
          <a href="blog-post-link" target="_blank" rel="noopener noreferrer">Read More</a>
        </li>
        <li>
          <h3>Blog Post Title 2</h3>
          <p>Brief description or excerpt of the blog post.</p>
          <a href="blog-post-link" target="_blank" rel="noopener noreferrer">Read More</a>
        </li>
        {/* Add more blog posts as needed */}
      </ul>
    </BaseSection>
  );
};

export default Blog;
