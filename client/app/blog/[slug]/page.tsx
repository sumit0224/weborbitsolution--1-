import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import BlogPost from '../../../components/blog/BlogPost';
import { blogPosts, type BlogPost as BlogPostType } from '../../../data/blogPosts';
import { createPageMetadata, siteConfig } from '../../../lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '../../../lib/structured-data';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

const REQUEST_TIMEOUT_MS = 3_500;
const trimSlash = (value: string) => value.replace(/\/+$/, '');

const getBlogApiBaseUrl = () => {
  const configured = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (configured) {
    return trimSlash(configured);
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:4000';
  }

  return '';
};

const fetchLivePost = async (slug: string): Promise<BlogPostType | null> => {
  const apiBase = getBlogApiBaseUrl();
  if (!apiBase) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBase}/api/blog/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json().catch(() => ({}))) as { post?: BlogPostType };
    return data?.post?.slug ? data.post : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const getPostBySlug = cache(async (slug: string): Promise<BlogPostType | null> => {
  const livePost = await fetchLivePost(slug);
  if (livePost) {
    return livePost;
  }

  return blogPosts.find((item) => item.slug === slug && item.published !== false) || null;
});

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: 'Page Not Found | WebOrbitSolution',
      description: 'The article you are looking for could not be found.',
      path: '/404',
      robots: {
        index: false,
        follow: false,
      },
    });
  }

  return createPageMetadata({
    title: post.metaTitle ? `${post.metaTitle} | WebOrbitSolution` : `${post.title} | WebOrbitSolution`,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage.src,
    type: 'article',
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
  });
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPost post={post} />
    </>
  );
}
