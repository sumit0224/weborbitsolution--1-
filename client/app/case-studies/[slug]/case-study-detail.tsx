'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Tag } from '@/components/ui/tag'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { CTABanner } from '@/components/sections/cta-banner'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  slug: string
  results: { metric: string; label: string }[]
}

export function CaseStudyDetail({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Case Studies
            </Link>
          </motion.div>

          {/* Header */}
          <div className="max-w-3xl">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            >
              <Tag>{project.category}</Tag>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
            className="mt-12 relative aspect-[16/9] rounded-3xl overflow-hidden bg-card"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Results */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                  <div className="font-display text-4xl lg:text-5xl font-bold text-primary">
                    {result.metric}
                  </div>
                  <p className="mt-2 text-muted-foreground">{result.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Project Details */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  The Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.title} came to us with a clear vision but needed a partner who could translate that vision into a compelling digital presence. They were looking to stand out in a competitive market, connect with their target audience, and drive measurable business results through strategic design and marketing.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Our Approach
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We developed a comprehensive strategy that combined brand positioning, user experience design, and data-driven marketing. Our team worked closely with the client to understand their unique value proposition and created a cohesive digital ecosystem that would resonate with their audience.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
