'use client';

import React from 'react';
import Link from 'next/link';
import BlogList from './blog/BlogList';

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="bg-black text-white section-padding border-y border-white/10">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Blog</p>
            <h2 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
              Web Development
              <br />
              SEO Insights
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-gray-400 text-lg md:text-xl">
              Actionable guidance on website development, SEO services, ecommerce, and growth for teams building modern
              digital experiences in India.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              We publish practical playbooks on website development cost in India, technical SEO, and performance
              optimization to help startups and local businesses rank faster.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-primary"
            >
              View All Articles
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <BlogList limit={6} mode="carousel" />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
