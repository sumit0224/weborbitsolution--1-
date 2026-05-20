'use client'

import { SectionHeader } from '@/components/ui/section-header'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What services does Web Orbit Solution offer?",
    answer: "We offer a comprehensive suite of digital services including UI/UX design, custom web development, e-commerce solutions, mobile app development, SEO strategy, and digital marketing. We handle everything from initial brand strategy to final deployment and ongoing maintenance."
  },
  {
    question: "How long does a typical website project take?",
    answer: "Project timelines vary depending on the complexity and scope. A standard corporate website might take 4-6 weeks, while a complex custom web application or e-commerce platform can take 3-4 months. We provide a detailed project timeline during our initial strategy phase."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Absolutely. We believe in building long-term partnerships. After launch, we offer continuous support, performance monitoring, security updates, and feature enhancements to ensure your digital product scales seamlessly with your business."
  },
  {
    question: "What is your typical project process?",
    answer: "Our process is highly collaborative: we start with Discovery & Strategy to understand your goals, move into UI/UX Design for wireframing and prototyping, proceed to Engineering & Development, and finally perform comprehensive QA Testing before Launch. We keep you involved at every stage."
  },
  {
    question: "How much does a custom project cost?",
    answer: "Pricing is highly customized to your specific needs, the complexity of the features, and the scope of work. We prefer to have a discovery call to understand your requirements fully, after which we provide a detailed, transparent proposal with no hidden fees."
  }
]

export function FAQ() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about partnering with Web Orbit Solution and how we deliver world-class results."
          align="center"
        />

        <div className="mt-16">
          <RevealOnScroll>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-border/50 py-2"
                >
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2 pb-6 pr-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
