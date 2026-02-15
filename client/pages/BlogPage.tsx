'use client';

import React from 'react';
import Seo from '../components/Seo';
import BlogList from '../components/blog/BlogList';

const BlogPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-24 font-body-alt">
      <Seo
        title="WebOrbit Journal | Web Design, Development & SEO Insights"
        description="Read WebOrbitSolution insights on web design, web development, branding, and SEO. Practical guides for modern teams building fast, high-converting websites."
        path="/blog"
      />
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Insights</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            The Orbit
            <br />
            Journal
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            Strategy, design, and product thinking from our studio — crafted for founders, marketers, and product teams.
          </p>
        </div>

        <div className="mt-12">
          <BlogList />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
