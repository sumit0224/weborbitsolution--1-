'use client'

import { useRef } from 'react'
import { Lightbulb, PenTool, Code, Rocket } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const steps = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, market landscape, and audience to craft a tailored strategy.',
  },
  {
    id: 2,
    icon: PenTool,
    title: 'Design & Prototype',
    description: 'Our designers create stunning visuals and interactive prototypes that bring your vision to life.',
  },
  {
    id: 3,
    icon: Code,
    title: 'Development & Build',
    description: 'Expert engineers transform designs into high-performance, scalable digital products.',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Launch & Optimize',
    description: 'We ensure a flawless launch and continuously optimize for peak performance and growth.',
  },
]

export function Process() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Connection line animation
    gsap.fromTo('.process-line',
      { scaleX: 0, transformOrigin: 'left center' },
      { 
        scaleX: 1, 
        duration: 1.2, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )

    // Steps unhide one by one
    gsap.fromTo('.process-step',
      { 
        opacity: 0, 
        y: 40 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section className="py-24 lg:py-32 bg-card" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Process"
          title="How We Deliver Results"
          subtitle="A proven methodology that transforms ideas into successful digital products."
          align="center"
        />

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px border-t border-dashed border-border process-line" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative text-center process-step opacity-0">
                {/* Step Number Circle */}
                <div className="relative z-10 mx-auto mb-6 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-background border border-border">
                  <span className="font-display text-xs font-bold text-primary mb-1">
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <step.icon size={32} className="text-foreground" />
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
