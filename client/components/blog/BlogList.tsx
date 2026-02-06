import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '../../data/blogPosts';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setStatus('loading');
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/blog/posts`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load posts.');
        }
        setPosts(data.posts || []);
        setStatus('idle');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {status === 'loading' && <p className="text-gray-400">Loading articles...</p>}
      {status === 'error' && <p className="text-red-500">Unable to load posts right now.</p>}
      {status === 'idle' && posts.length === 0 && (
        <p className="text-gray-400">New articles are coming soon.</p>
      )}
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default BlogList;
