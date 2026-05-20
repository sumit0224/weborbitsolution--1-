'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export interface BlogGridPost {
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
}

interface BlogGridProps {
  posts: BlogGridPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (!posts.length) {
    return (
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">No blog posts published yet</h2>
            <p className="mt-3 text-muted-foreground">Please check back soon for fresh insights.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="bg-card border border-border rounded-2xl overflow-hidden transition-colors hover:border-primary/30">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                        Read More
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
