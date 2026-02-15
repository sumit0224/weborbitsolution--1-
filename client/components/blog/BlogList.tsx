'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BlogCard from './BlogCard';
import { BlogPost, blogPosts } from '../../data/blogPosts';

interface BlogListProps {
  limit?: number;
}

const BlogList: React.FC<BlogListProps> = ({ limit }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const fallbackPosts = useMemo(
    () =>
      [...blogPosts]
        .filter((post) => post.published !== false)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setStatus('loading');
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/blog/posts`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load posts.');
        }
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts(fallbackPosts);
        }
        setStatus('idle');
      } catch (error) {
        if (fallbackPosts.length > 0) {
          setPosts(fallbackPosts);
          setStatus('idle');
        } else {
          setStatus('error');
        }
      }
    };

    fetchPosts();
  }, [fallbackPosts]);

  const visiblePosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {status === 'loading' && <p className="text-gray-400">Loading articles...</p>}
      {status === 'error' && <p className="text-red-500">Unable to load posts right now.</p>}
      {status === 'idle' && visiblePosts.length === 0 && (
        <p className="text-gray-400">New articles are coming soon.</p>
      )}
      {visiblePosts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default BlogList;
