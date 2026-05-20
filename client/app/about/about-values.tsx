'use client'

import { Target, Zap, Heart, Users } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const values = [
  {
    icon: Target,
    title: 'Pixel-Perfect Precision',
    description: 'We obsess over every detail, ensuring that our designs are translated flawlessly into the final product with no compromises.',
  },
  {
    icon: Zap,
    title: 'Future-Proof Engineering',
    description: 'Performance and scalability are built in from day one. We use modern stacks to ensure your platform runs blazingly fast.',
  },
  {
    icon: Heart,
    title: 'User-Centric Empathy',
    description: 'Every interaction we design starts with the user. We build accessible, intuitive, and delightful experiences that people love.',
  },
  {
    icon: Users,
    title: 'Radical Transparency',
    description: 'No black boxes. We act as an extension of your team, providing complete visibility into our process and progress.',
  },
]

export function AboutValues() {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Values"
          title="What Drives Us"
          subtitle="Our core values shape everything we do, from how we approach projects to how we build relationships."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-background border border-border rounded-2xl p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
