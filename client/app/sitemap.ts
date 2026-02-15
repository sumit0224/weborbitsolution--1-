import type { MetadataRoute } from 'next';
import { blogPosts } from '../data/blogPosts';
import { siteConfig } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/seo-services-in-india', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/react-js-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mobile-app-development-company', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/custom-software-development-india', priority: 0.9, changeFrequency: 'weekly' as const },
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

  const blogEntries = blogPosts
    .filter((post) => post.published !== false)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
