'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTABanner() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] opacity-40 mix-blend-normal md:mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full motion-safe:animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
          className="relative rounded-[2rem] border border-border/50 bg-background/50 dark:bg-black/40 backdrop-blur-2xl overflow-hidden p-8 sm:p-12 md:p-20 text-center shadow-2xl"
        >
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.5, type: "spring" }}
            className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-inner"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-6">
            Ready to scale your <br className="hidden sm:block" /> digital presence?
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Join forward-thinking brands who have transformed their businesses with our cutting-edge design and engineering solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="group relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/case-studies"
                className="inline-flex w-full items-center justify-center rounded-full bg-transparent border border-border px-8 py-4 text-base font-medium text-foreground transition-all hover:bg-muted"
              >
                View Case Studies
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
