import type { MetadataRoute } from 'next';
import { blogPosts } from '../data/blogPosts';
import { siteConfig } from '../lib/seo';

const trimSlash = (value: string) => value.replace(/\/+$/, '');
const REQUEST_TIMEOUT_MS = 3_500;

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

type BlogPostEntry = {
  slug?: string;
  date?: string;
  published?: boolean;
};

const fetchLiveBlogPosts = async (): Promise<BlogPostEntry[]> => {
  const apiBase = getBlogApiBaseUrl();
  if (!apiBase) {
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBase}/api/blog/posts?limit=500`, {
      next: { revalidate: 900 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json().catch(() => ({}))) as { posts?: BlogPostEntry[] };
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/seo-services-in-india', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/react-js-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mobile-app-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/custom-software-development-india', priority: 0.9, changeFrequency: 'weekly' as const },
    {
      path: '/website-app-saas-development-company-india',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    { path: '/website-development-company-mumbai', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/app-development-company-bangalore', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/saas-development-company-hyderabad', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/refund', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const liveBlogPosts = await fetchLiveBlogPosts();
  const fallbackBlogPosts = blogPosts
    .filter((post) => post.published !== false)
    .map((post) => ({ slug: post.slug, date: post.date, published: post.published }));

  const mergedPosts = new Map<string, BlogPostEntry>();
  [...fallbackBlogPosts, ...liveBlogPosts].forEach((post) => {
    const slug = String(post.slug || '').trim();
    if (!slug || post.published === false) {
      return;
    }
    mergedPosts.set(slug, post);
  });

  const blogEntries = [...mergedPosts.values()].map((post) => {
    const parsedDate = post.date ? new Date(post.date) : new Date();
    const lastModified = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
