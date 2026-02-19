'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import BlogCard from './BlogCard';
import { BlogPost, blogPosts } from '../../data/blogPosts';

interface BlogListProps {
  limit?: number;
  mode?: 'grid' | 'carousel';
}

const BlogList: React.FC<BlogListProps> = ({ limit, mode = 'grid' }) => {
  const fallbackPosts = useMemo(
    () =>
      [...blogPosts]
        .filter((post) => post.published !== false)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );
  const hasFallback = fallbackPosts.length > 0;
  const [posts, setPosts] = useState<BlogPost[]>(hasFallback ? fallbackPosts : []);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>(hasFallback ? 'idle' : 'loading');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!hasFallback) {
          setStatus('loading');
        }
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
  }, [fallbackPosts, hasFallback]);

  const visiblePosts = limit ? posts.slice(0, limit) : posts;
  const isCarousel = mode === 'carousel';
  const canLoop = visiblePosts.length > 3;

  if (isCarousel) {
    return (
      <section>
        {status === 'loading' && <p className="text-gray-400">Loading articles...</p>}
        {status === 'error' && <p className="text-red-500">Unable to load posts right now.</p>}
        {status === 'idle' && visiblePosts.length === 0 && (
          <p className="text-gray-400">New articles are coming soon.</p>
        )}
        {status === 'idle' && visiblePosts.length > 0 && (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={canLoop}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {visiblePosts.map((post) => (
              <SwiperSlide key={post.slug}>
                <div className="h-full">
                  <BlogCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    );
  }

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
