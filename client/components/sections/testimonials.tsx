import { SectionHeader } from '@/components/ui/section-header'
import AnimatedTestimonialsDemo from '@/components/animated-testimonials-demo'

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Client Stories"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it. Here's what industry leaders have to say about working with us."
          align="center"
        />

        <div className="mt-16">
          <AnimatedTestimonialsDemo />
        </div>
      </div>
    </section>
  )
}
