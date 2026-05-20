'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/data/case-studies'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export function CaseStudiesGrid() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 0.1}>
              <Link href={`/case-studies/${project.slug}`}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card mb-6">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Results Preview */}
                  <div className="mt-4 flex gap-6">
                    {project.results.slice(0, 2).map((result, i) => (
                      <div key={i}>
                        <span className="font-display text-xl font-bold text-primary">
                          {result.metric}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {result.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
