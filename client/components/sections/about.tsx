'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { MagneticButton } from '@/components/ui/magnetic-button'

const features = [
  'Result-driven websites',
  'Branding & Design',
  'SEO & Content Strategy',
  'Smart Marketing Solutions',
]

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Commitment' },
]

export function About() {
  return (
    <section className="py-5 bg-white lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <RevealOnScroll direction="left">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card">
              <Image
                src="/weborbitsolution-team.webp"
                alt="Creative team working together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>

          {/* Content Column */}
          <div>
            <SectionHeader
              tag="About Us"
              title="Driving Real Digital Growth"
              subtitle="At WebOrbit Solution, we are a team of young founders with a vision to help every business build a strong online presence."
            />

            <RevealOnScroll delay={0.2}>
              <div className="text-muted-foreground leading-relaxed mb-8 space-y-4">
                <p>
                  Our journey started in February 2025 with a mission to deliver high-quality digital solutions at the best price. Since then, we have successfully delivered 50+ projects and helped 100+ clients grow their business through smart marketing and modern technology solutions.
                </p>
                <p>
                  We believe every business deserves the opportunity to grow online, no matter its size. That's why we focus on creating result-driven websites, branding, SEO, and marketing strategies that bring real value to our clients.
                </p>
                <p>
                  Our mission is simple — provide the best results at the best price while building long-term relationships with our clients through trust, creativity, and innovation.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <Check size={12} className="text-primary" />
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-accent-hover hover:scale-[1.02]"
                >
                  {"Let's Talk"}
                </Link>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border pt-12">
          {stats.map((stat, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl lg:text-6xl font-bold text-primary">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
