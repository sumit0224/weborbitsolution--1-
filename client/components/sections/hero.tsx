'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function Hero() {
  const marqueeItems = ['DESIGN', 'DEVELOPMENT', 'MARKETING']
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-28 pb-0 overflow-hidden ">
      {/* Top Content - Centered */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-5xl  tracking-tight text-foreground uppercase"
        >
          Marketing & Web Design Agency
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
        >
          Our expert team is dedicated to helping you make data-driven decisions for business success.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-accent-hover hover:scale-[1.02]"
            >
              {"Let's Talk"}
              <ArrowUpRight size={18} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full bg-secondary border border-border-strong px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-card"
            >
              Our Projects
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Hero Image + Marquee Section */}
      <div className="relative top-2 mt-12 min-h-[300px] sm:min-h-[300px]">
        {/* Person Image - Centered */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="relative z-10 flex justify-center"
        >
          <div className="relative">
            {/* Background Box */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-[250px] sm:w-[210px] md:w-[300px]
        h-[240px] sm:h-[280px] md:h-[340px]
        bg-primary rounded-t-[2rem] md:rounded-xl"
            />

            {/* Person Image */}
            <div className="relative z-10 w-[220px] sm:w-[260px] md:w-[300px]">
              <Image
                src="/sumit.webp"
                alt="Marketing expert"
                width={300}
                height={300}
                className="object-contain drop-shadow-xl w-full h-auto"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
                priority
              />
            </div>
          </div>
        </motion.div>


        {/* Marquee Row 1 - Behind the person */}
        <div className="absolute top-1/4 left-0 right-0 overflow-hidden">
          <div className="flex">
            <motion.div
              className="flex items-center gap-4 whitespace-nowrap"
              animate={shouldReduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
              transition={{ duration: 40, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear' }}
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className={`font-display ${index % 2 == 0 ? "text-text-primary" : ""} text-6xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase tracking-tight  text-foreground/10`}
                >
                  {item}
                  <span className="mx-4 text-primary/30">·</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Marquee Row 2 - Reverse direction */}
        <div className="absolute top-[60%] left-0 right-0 overflow-hidden">
          <div className="flex">
            <motion.div
              className="flex items-center gap-4 whitespace-nowrap"
              animate={shouldReduceMotion ? { x: '0%' } : { x: ['-50%', '0%'] }}
              transition={{ duration: 40, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear' }}
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className={`font-display ${index % 2 == 0 ? "text-text-primary" : ""} text-6xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase tracking-tight  text-foreground/10`}
                >
                  {item}
                  <span className="mx-4 text-primary/90">·</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
