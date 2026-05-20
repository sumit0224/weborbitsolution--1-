import { MetadataRoute } from 'next'
import { caseStudies } from '@/data/case-studies'
import { blogPosts as fallbackBlogPosts } from '@/data/blog-posts'
import { sanityFetch } from '@/src/lib/sanity/live'
import { SITEMAP_BLOG_POSTS_QUERY } from '@/src/lib/sanity/queries'

const SITE_URL = 'https://weborbitsolution.in'

type BlogSlugForSitemap = {
  slug: string
  publishedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/about',
    '/services',
    '/case-studies',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const caseStudyRoutes = caseStudies.map((project) => ({
    url: `${SITE_URL}/case-studies/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const sanityBlogPosts = await sanityFetch<BlogSlugForSitemap[]>({
    query: SITEMAP_BLOG_POSTS_QUERY,
    tags: ['blogPost', 'blog'],
    revalidate: 300,
  })

  const blogMap = new Map<string, Date>()

  for (const post of fallbackBlogPosts) {
    blogMap.set(post.slug, new Date(post.date))
  }

  for (const post of sanityBlogPosts || []) {
    if (post.slug) {
      blogMap.set(post.slug, new Date(post.publishedAt || new Date().toISOString()))
    }
  }

  const blogRoutes = [...blogMap.entries()].map(([slug, publishedAt]) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...caseStudyRoutes, ...blogRoutes]
}
