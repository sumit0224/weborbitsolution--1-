import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import BlogPost from '../../../components/blog/BlogPost';
import { blogPosts, type BlogPost as BlogPostType } from '../../../data/blogPosts';
import { createPageMetadata, normalizeSeoDescription, normalizeSeoTitle, siteConfig } from '../../../lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '../../../lib/structured-data';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

const REQUEST_TIMEOUT_MS = 3_500;
const trimSlash = (value: string) => value.replace(/\/+$/, '');
const MAX_RELATED_POSTS = 5;

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

const fetchLivePosts = async (limit = 30): Promise<BlogPostType[]> => {
  const apiBase = getBlogApiBaseUrl();
  if (!apiBase) return [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBase}/api/blog/posts?limit=${Math.max(10, limit)}`, {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return [];
    const data = (await response.json().catch(() => ({}))) as { posts?: BlogPostType[] };
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
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

const getAllPublishedPosts = cache(async (): Promise<BlogPostType[]> => {
  const livePosts = await fetchLivePosts();
  const merged = new Map<string, BlogPostType>();

  for (const post of livePosts) {
    if (post?.slug && post.published !== false) {
      merged.set(post.slug, post);
    }
  }

  for (const post of blogPosts) {
    if (post.published !== false && !merged.has(post.slug)) {
      merged.set(post.slug, post);
    }
  }

  return Array.from(merged.values()).sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'from',
  'that',
  'this',
  'your',
  'how',
  'what',
  'why',
  'are',
  'you',
  'our',
  'into',
  'about',
  'will',
  'more',
  'best',
  'guide',
  'india',
]);

const inferTags = (post: BlogPostType): Set<string> => {
  const explicitTags = Array.isArray(post.tags) ? post.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean) : [];
  if (explicitTags.length > 0) {
    return new Set(explicitTags);
  }

  const text = [
    post.category,
    post.title,
    post.excerpt,
    ...post.sections.map((section) => section.heading),
  ]
    .join(' ')
    .toLowerCase();

  const counts = new Map<string, number>();
  text
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token))
    .forEach((token) => {
      counts.set(token, (counts.get(token) || 0) + 1);
    });

  const topTags = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([token]) => token);

  return new Set(topTags);
};

const tagOverlapScore = (source: Set<string>, candidate: Set<string>) => {
  let overlap = 0;
  for (const tag of source) {
    if (candidate.has(tag)) overlap += 1;
  }
  return overlap;
};

const getRelatedPosts = (currentPost: BlogPostType, allPosts: BlogPostType[]) => {
  const others = allPosts.filter((post) => post.slug !== currentPost.slug && post.published !== false);
  const currentTags = inferTags(currentPost);

  const sameCategory = others
    .filter((post) => post.category.toLowerCase() === currentPost.category.toLowerCase())
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const used = new Set(sameCategory.map((post) => post.slug));
  const similarTags = others
    .filter((post) => !used.has(post.slug))
    .map((post) => ({ post, score: tagOverlapScore(currentTags, inferTags(post)) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.score === a.score ? +new Date(b.post.date) - +new Date(a.post.date) : b.score - a.score))
    .map((item) => item.post);

  const fallbackTrending = others
    .filter((post) => !used.has(post.slug) && !similarTags.some((item) => item.slug === post.slug))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return [...sameCategory, ...similarTags, ...fallbackTrending].slice(0, MAX_RELATED_POSTS);
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: 'Page Not Found | WebOrbitSolution',
      description: 'The article you are looking for could not be found.',
      path: '/404',
      normalize: false,
      robots: {
        index: false,
        follow: true,
      },
    });
  }

  const seoTitle = normalizeSeoTitle(post.metaTitle || post.title);
  const seoDescription = normalizeSeoDescription(post.metaDescription || post.excerpt);

  return createPageMetadata({
    title: seoTitle,
    description: seoDescription,
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
  const allPosts = await getAllPublishedPosts();

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, allPosts);

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
      <BlogPost post={post} suggestedPosts={relatedPosts} />
    </>
  );
}
