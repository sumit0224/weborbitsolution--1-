'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import { SectionHeader } from '@/components/ui/section-header'

export function Services() {
  return (
    <section className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 h-[500px] opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="What We Do"
          title="Our Services"
          subtitle="Comprehensive digital solutions tailored to elevate your brand and drive measurable results."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative h-full flex"
            >
              <Link href={`/services/${service.slug}`} className="block h-full w-full">
                {/* Glow behind the card on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card itself */}
                <div className="relative h-full flex flex-col bg-card/40 dark:bg-black/40 backdrop-blur-md border border-border/50 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 group-hover:bg-card/80 dark:group-hover:bg-black/60 group-hover:border-primary/50 shadow-sm group-hover:shadow-2xl z-10">
                  {/* Subtle noise overlay */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {/* Top Header: Icon & Number */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <service.icon size={28} />
                    </div>
                    <span className="font-display text-5xl font-black text-muted-foreground/10 transition-colors duration-500 group-hover:text-primary/10">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Body: Title & Desc */}
                  <div className="relative z-10 flex flex-col flex-grow">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4 transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer: Learn More Link */}
                  <div className="mt-8 relative z-10 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                    Learn More
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-4 text-base font-semibold shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
