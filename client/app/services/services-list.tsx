'use client'

import { motion } from 'framer-motion'
import { services } from '@/data/services'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Check } from 'lucide-react'



export function ServicesList() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-20 sm:space-y-32">
          {services.map((service, index) => (
            <RevealOnScroll key={service.id}>
              <div
                id={service.slug}
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start border-t border-border pt-12 sm:pt-16"
              >
                {/* Left: Sticky Title & Icon */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border shrink-0">
                      <service.icon size={24} className="text-foreground" />
                    </div>
                    <span className="font-display text-xl font-bold text-muted-foreground/40">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* Right: Features */}
                <div className="lg:col-span-6 lg:col-start-7">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    Capabilities
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <Check size={20} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
