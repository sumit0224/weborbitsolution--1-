'use client'

import Image from 'next/image'
import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Linkedin, Twitter, Github } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

const team = [
  {
    name: 'Vivek Pandey',
    role: 'Co-Founder',
    image: '/co-founder.webp',
  },
  {
    name: 'Pradhuman Mishra',
    role: 'Marketing Head',
    image: '/pradhuman-marketing-head.webp',
  },
  {
    name: 'Atul kumar',
    role: 'Fullstack Developer',
    image: '/atul-fullstackdeveloper.webp',
  },
  {
    name: 'Abhinav ',
    role: 'Frontend Developer',
    image: '/abhinav-frontend-devloper.webp',
  }
]

export function Team() {
  return (
    <section className="py-24 bg-muted/30 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Team"
          title="Meet the Experts Behind the Results"
          subtitle="A collective of creative minds, technical experts, and strategic thinkers dedicated to your success."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {team.map((member, index) => (
            <RevealOnScroll key={index} delay={index * 0.1} direction="up">
              <CardContainer className="w-full">
                <CardBody className="bg-white relative group/card dark:bg-card border-border/[0.5] w-full h-auto rounded-2xl p-4 border flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                  <CardItem translateZ="100" className="w-full relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-4">
                        <a href="#" className="text-white hover:text-primary transition-colors">
                          <Twitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-primary transition-colors">
                          <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-primary transition-colors">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </CardItem>
                  <CardItem translateZ="50" className="text-xl font-bold text-foreground mb-1 text-center">
                    {member.name}
                  </CardItem>
                  <CardItem translateZ="60" className="text-primary font-medium text-center">
                    {member.role}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
