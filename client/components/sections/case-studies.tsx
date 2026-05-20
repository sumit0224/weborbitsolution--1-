'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '@/data/case-studies'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export function CaseStudies() {
  // Show only first 4 case studies on homepage
  const displayedCases = caseStudies.slice(0, 4)

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Work"
          title="Selected Projects"
          subtitle="Explore how we have helped leading brands achieve extraordinary results through strategic design and digital innovation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16 sm:mt-24">
          {displayedCases.map((project, index) => (
            <RevealOnScroll key={project.id} delay={0.1}>
              <Link 
                href={`/case-studies/${project.slug}`} 
                className={`group block ${index % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                {/* Image Container - No Text Overlay */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-card mb-6 border border-border/50 shadow-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                
                {/* Content Container (Below Image) */}
                <div className="flex items-start justify-between px-2">
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{project.category}</p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card group-hover:bg-foreground group-hover:border-foreground transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <ArrowRight size={20} className="text-foreground group-hover:text-background transition-colors duration-300 group-hover:-rotate-45" />
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mt-24 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-4 text-base font-semibold shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
          >
            View All Projects
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
