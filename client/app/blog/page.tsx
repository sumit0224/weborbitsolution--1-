import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { blogPosts as fallbackBlogPosts } from '@/data/blog-posts'
import { getSanityImageUrl } from '@/src/lib/sanity/image'
import { sanityFetch } from '@/src/lib/sanity/live'
import { BLOG_POSTS_QUERY, type SanityBlogPost } from '@/src/lib/sanity/queries'
import { BlogHero } from './blog-hero'
import { BlogGrid, type BlogGridPost } from './blog-grid'

export const revalidate = 120

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, trends, and expert perspectives on design, development, and digital marketing.',
}

function mapFallbackPosts(): BlogGridPost[] {
  return fallbackBlogPosts.map((post) => ({
    id: String(post.id),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    slug: post.slug,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
    },
  }))
}

function mapSanityPost(post: SanityBlogPost, index: number): BlogGridPost {
  const fallback = fallbackBlogPosts[index % fallbackBlogPosts.length]
  const image = getSanityImageUrl(post.mainImage, 1200, 750) || fallback.image
  const authorImage = getSanityImageUrl(post.author?.image, 120, 120) || fallback.author.avatar

  return {
    id: post._id,
    title: post.title,
    excerpt: post.excerpt || fallback.excerpt,
    category: post.category || fallback.category,
    date: post.publishedAt || fallback.date,
    readTime: post.readTime || fallback.readTime,
    image,
    slug: post.slug,
    author: {
      name: post.author?.name || fallback.author.name,
      avatar: authorImage,
    },
  }
}

async function getBlogGridPosts(): Promise<BlogGridPost[]> {
  const fallback = mapFallbackPosts()
  const posts = await sanityFetch<SanityBlogPost[]>({
    query: BLOG_POSTS_QUERY,
    tags: ['blogPost', 'blog'],
    revalidate,
  })

  if (!posts?.length) {
    return fallback
  }

  return posts.map((post, index) => mapSanityPost(post, index))
}

export default async function BlogPage() {
  const posts = await getBlogGridPosts()

  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </>
  )
}
