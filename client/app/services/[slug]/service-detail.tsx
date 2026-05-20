'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CTABanner } from '@/components/sections/cta-banner'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { services } from '@/data/services'

export function ServiceDetail({ slug }: { slug: string }) {
  const shouldReduceMotion = useReducedMotion()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left: Sticky Title & Icon */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                  <service.icon size={32} />
                </div>
                <span className="font-display text-2xl font-bold text-muted-foreground/40">
                  {String(service.id).padStart(2, '0')}
                </span>
              </motion.div>
              
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"
              >
                {service.title}
              </motion.h1>
              
              <motion.p
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-md"
              >
                {service.description}
              </motion.p>
            </div>

            {/* Right: Features & Content */}
            <div className="lg:col-span-6 lg:col-start-7 pt-4">
              <RevealOnScroll>
                <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                  Core Capabilities
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={16} className="mt-0.5" />
                      </div>
                      <span className="text-foreground font-medium mt-1">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.2} className="mt-16">
                 <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Why Choose Us
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Our approach to {service.title.toLowerCase()} is rooted in data, creativity, and a deep understanding of your business objectives. We don't just deliver a service; we act as an extension of your team to ensure every deliverable pushes your brand forward.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By partnering with WebOrbit Solution, you gain access to industry-leading experts who are passionate about driving tangible results and elevating your digital presence.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
