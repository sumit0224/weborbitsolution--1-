'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedNumber } from '@/components/ui/animated-number'

const stats = [
  { value: 50, suffix: '+', label: 'Design Awards Won' },
  { value: 150, suffix: '+', label: 'Products Launched' },
  { value: 99, suffix: '%', label: 'Client Retention' },
  { value: 3, suffix: '+', label: 'Years of Excellence' },
]

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 min-h-[80vh] flex items-center">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/weborbitsolution-team.webp"
          alt="Web Orbit Solution Team"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 " />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center pt-50 pb-16">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="font-display text-white text-5xl sm:text-6xl lg:text-7xl font-bold  drop-shadow-md"
          >
            WebOrbit Solution
          </motion.h1>

          

          
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/20 pt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-white drop-shadow-sm">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm sm:text-base font-medium text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
