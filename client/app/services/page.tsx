import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ServicesHero } from './services-hero'
import { ServicesList } from './services-list'
import { CTABanner } from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our comprehensive digital services including web design, development, SEO, digital marketing, and brand strategy.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesList />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
