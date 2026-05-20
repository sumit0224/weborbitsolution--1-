import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CaseStudiesHero } from './case-studies-hero'
import { CaseStudiesGrid } from './case-studies-grid'
import { CTABanner } from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our portfolio of successful projects and see how we have helped brands achieve extraordinary results.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
