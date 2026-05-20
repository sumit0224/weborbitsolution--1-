'use client'

import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const team = [
  {
    name: 'Vivek Pandey',
    role: 'Co-Founder',
    image: '/co-founder.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Pradhuman Mishra',
    role: 'Marketing Head',
    image: '/pradhuman-marketing-head.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Atul kumar',
    role: 'Fullstack Developer',
    image: '/atul-fullstackdeveloper.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Abhinav ',
    role: 'Frontend Developer',
    image: '/abhinav-frontend-devloper.webp',
    linkedin: '#',
    twitter: '#',
  },
]

export function AboutTeam() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Team"
          title="Meet the Experts"
          subtitle="A talented group of strategists, designers, developers, and marketers dedicated to your success."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="group text-center">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  {/* Hover Overlay with Social Links */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={member.linkedin}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={member.twitter}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
