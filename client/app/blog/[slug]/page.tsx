import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { blogPosts as fallbackBlogPosts } from '@/data/blog-posts'
import { getSanityImageUrl } from '@/src/lib/sanity/image'
import { sanityFetch } from '@/src/lib/sanity/live'
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
  type SeoFields,
  type SanityBlogPost,
} from '@/src/lib/sanity/queries'
import { BlogPostDetail, type BlogPostDetailData } from './blog-post-detail'

const SITE_URL = 'https://weborbitsolution.in'

export const revalidate = 120

interface PageProps {
  params: Promise<{ slug: string }>
}

type ResolvedPost = {
  post: BlogPostDetailData
  seo: SeoFields
}

function mapFallbackPost(slug: string): ResolvedPost | null {
  const fallback = fallbackBlogPosts.find((post) => post.slug === slug)

  if (!fallback) {
    return null
  }

  return {
    post: {
      id: String(fallback.id),
      title: fallback.title,
      excerpt: fallback.excerpt,
      category: fallback.category,
      date: fallback.date,
      readTime: fallback.readTime,
      image: fallback.image,
      slug: fallback.slug,
      author: {
        name: fallback.author.name,
        avatar: fallback.author.avatar,
      },
      body: [],
    },
    seo: {
      metaTitle: fallback.title,
      metaDescription: fallback.excerpt,
      slug: fallback.slug,
      keywords: [fallback.category],
    },
  }
}

function mapSanityPostToResolved(post: SanityBlogPost): ResolvedPost {
  const fallback = fallbackBlogPosts[0]
  const image = getSanityImageUrl(post.mainImage, 1600, 900) || fallback.image
  const authorImage = getSanityImageUrl(post.author?.image, 120, 120) || fallback.author.avatar
  const category = post.category || fallback.category

  return {
    post: {
      id: post._id,
      title: post.title,
      excerpt: post.excerpt || fallback.excerpt,
      category,
      date: post.publishedAt || fallback.date,
      readTime: post.readTime || fallback.readTime,
      image,
      slug: post.slug,
      author: {
        name: post.author?.name || fallback.author.name,
        avatar: authorImage,
      },
      body: post.body || [],
    },
    seo: {
      metaTitle: post.seo?.metaTitle || post.title,
      metaDescription: post.seo?.metaDescription || post.excerpt || fallback.excerpt,
      slug: post.seo?.slug || post.slug,
      keywords: post.seo?.keywords || [category],
      ogImage: post.seo?.ogImage,
    },
  }
}

async function getPostBySlug(slug: string): Promise<ResolvedPost | null> {
  const sanityPost = await sanityFetch<SanityBlogPost>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['blogPost', `blogPost:${slug}`],
    revalidate,
  })

  if (sanityPost) {
    return mapSanityPostToResolved(sanityPost)
  }

  return mapFallbackPost(slug)
}

export async function generateStaticParams() {
  const sanitySlugs = await sanityFetch<Array<{ slug: string }>>({
    query: BLOG_POST_SLUGS_QUERY,
    tags: ['blogPost', 'blog'],
    revalidate,
  })

  const slugSet = new Set<string>(fallbackBlogPosts.map((post) => post.slug))

  for (const item of sanitySlugs || []) {
    if (item.slug) {
      slugSet.add(item.slug)
    }
  }

  return [...slugSet].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resolved = await getPostBySlug(slug)

  if (!resolved) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage =
    getSanityImageUrl(resolved.seo.ogImage, 1200, 630) ||
    resolved.post.image ||
    '/og-image.jpg'

  return {
    title: resolved.seo.metaTitle || `${resolved.post.title} | Blog`,
    description: resolved.seo.metaDescription || resolved.post.excerpt,
    keywords: resolved.seo.keywords,
    alternates: {
      canonical: `/blog/${resolved.seo.slug || resolved.post.slug}`,
    },
    openGraph: {
      title: resolved.seo.metaTitle || resolved.post.title,
      description: resolved.seo.metaDescription || resolved.post.excerpt,
      type: 'article',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolved.seo.metaTitle || resolved.post.title,
      description: resolved.seo.metaDescription || resolved.post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const resolved = await getPostBySlug(slug)

  if (!resolved) {
    notFound()
  }

  const { post } = resolved

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Web Orbit Solution',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        <BlogPostDetail post={post} />
      </main>
      <Footer />
    </>
  )
}
