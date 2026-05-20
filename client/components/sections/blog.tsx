'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export function Blog() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Insights"
          title="Latest Articles"
          subtitle="Stay ahead with expert insights on design, development, and digital marketing trends."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-16 sm:mt-24">
          {blogPosts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-card mb-6 shadow-sm border border-border/50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow px-2">
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium text-muted-foreground">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-2 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        Read Article
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-foreground group-hover:border-foreground transition-all duration-300 shadow-sm">
                        <ArrowRight size={16} className="text-foreground group-hover:text-background transition-colors duration-300 group-hover:-rotate-45" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mt-24 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-4 text-base font-semibold shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
          >
            View All Articles
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
