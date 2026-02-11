import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import BlogPost from '../components/blog/BlogPost';
import { BlogPost as BlogPostType, blogPosts } from '../data/blogPosts';
import NotFound from './NotFound';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setStatus('loading');
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/blog/posts/${slug}`);
        const data = await response.json();
        if (response.ok && data?.post) {
          setPost(data.post);
          setStatus('ready');
          return;
        }

        const fallback = blogPosts.find((item) => item.slug === slug);
        if (fallback) {
          setPost(fallback);
          setStatus('ready');
          return;
        }

        throw new Error(data?.error || 'Post not found.');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchPost();
  }, [slug]);

  if (status === 'error') {
    return <NotFound />;
  }

  if (status !== 'ready' || !post) {
    return (
      <section className="bg-white text-black pt-32 pb-20 font-body-alt">
        <div className="page-container">
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Loading</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-heading">Loading article...</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={post.metaTitle ? `${post.metaTitle} | WebOrbitSolution` : `${post.title} | WebOrbitSolution`}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.featuredImage.src}
        type="article"
      />
      <BlogPost post={post} />
    </>
  );
};

export default BlogPostPage;
