'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { PortableTextBlock } from '@portabletext/types'
import { Tag } from '@/components/ui/tag'
import { CTABanner } from '@/components/sections/cta-banner'
import { PortableTextContent } from '@/components/sanity/portable-text'

export interface BlogPostDetailData {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  slug: string
  author: {
    name: string
    avatar: string
  }
  body?: PortableTextBlock[]
}

export function BlogPostDetail({ post }: { post: BlogPostDetailData }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <article className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
          >
            <Tag>{post.category}</Tag>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="text-foreground font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
            className="mt-10 relative aspect-[16/9] rounded-3xl overflow-hidden bg-card"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.5 }}
            className="mt-12 prose prose-invert prose-lg max-w-none"
          >
            {post.body?.length ? (
              <PortableTextContent value={post.body} />
            ) : (
              <>
                <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
                <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This article is being managed through our CMS. If long-form content is not yet published,
                  this summary section keeps the reading experience complete without changing the existing design.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </article>

      <CTABanner />
    </>
  )
}
