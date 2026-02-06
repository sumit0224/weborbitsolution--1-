import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group border border-black/10 bg-white text-black rounded-none overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
        <div className="relative overflow-hidden">
          <img
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            loading="lazy"
            decoding="async"
            width={1200}
            height={700}
            className="w-full h-56 md:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-500">
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-heading leading-tight">
            {post.title}
          </h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed max-h-[4.5rem] overflow-hidden">
            {post.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-primary">
            Read More
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
