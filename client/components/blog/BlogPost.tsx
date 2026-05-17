'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost as BlogPostType } from '../../data/blogPosts';
import { siteConfig } from '../../lib/seo';
import { buildSocialShareLinks } from '../../lib/external-links';
import OutboundLink from '../OutboundLink';
import SuggestedBlogs from './SuggestedBlogs';

interface BlogPostProps {
  post: BlogPostType;
  suggestedPosts?: BlogPostType[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const BlogPost: React.FC<BlogPostProps> = ({ post, suggestedPosts = [] }) => {
  const [progress, setProgress] = useState(0);
  const [shareUrl, setShareUrl] = useState(`${siteConfig.url}/blog/${post.slug}`);
  const shareLinks = useMemo(() => buildSocialShareLinks(shareUrl, post.title), [post.title, shareUrl]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('[data-blog-article]') as HTMLElement | null;
      if (!article) return;

      const total = article.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - article.offsetTop;
      const next = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(Math.round(next * 100));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <article className="bg-white  text-black font-body-alt" data-blog-article>
      <div className="fixed top-0 left-0 h-[3px] bg-primary z-[70] transition-all" style={{ width: `${progress}%` }} />

      <header className="border-b border-black/10">
        <div className="page-container pt-28 pb-10">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">{post.category}</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-heading leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <section className="page-container py-10">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 75vw, 100vw"
          priority
          quality={80}
          className="w-full h-[320px] md:h-[480px] object-cover"
        />
      </section>

      <section className="page-container pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:items-start">
          <div className="min-w-0">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading mb-4">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="border-t border-black/10 pt-8 mt-12">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Related Links</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/" className="text-primary font-semibold hover:underline">
                  WebOrbitSolution Home
                </Link>
                <Link href="/services" className="text-primary font-semibold hover:underline">
                  Web Design & Development Services
                </Link>
                <Link href="/seo-services-in-india" className="text-primary font-semibold hover:underline">
                  SEO Services in India
                </Link>
                <Link href="/react-js-development-company" className="text-primary font-semibold hover:underline">
                  React JS Development
                </Link>
                <Link href="/work" className="text-primary font-semibold hover:underline">
                  Explore Our Portfolio
                </Link>
                <Link href="/contact" className="text-primary font-semibold hover:underline">
                  Start a Project
                </Link>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Share</span>
              <div className="flex flex-wrap gap-3">
                <OutboundLink
                  href={shareLinks.twitter}
                  aria-label={`Share "${post.title}" on Twitter`}
                  className="border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors"
                >
                  Twitter
                </OutboundLink>
                <OutboundLink
                  href={shareLinks.linkedin}
                  aria-label={`Share "${post.title}" on LinkedIn`}
                  className="border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors"
                >
                  LinkedIn
                </OutboundLink>
                <OutboundLink
                  href={shareLinks.facebook}
                  aria-label={`Share "${post.title}" on Facebook`}
                  className="border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors"
                >
                  Facebook
                </OutboundLink>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <SuggestedBlogs posts={suggestedPosts} title="Related Articles" />
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPost;
