import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AboutHero } from './about-hero'
import { AboutValues } from './about-values'
import { AboutTeam } from './about-team'
import { CTABanner } from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Web Orbit Solution — our mission, values, and the talented team behind our award-winning digital experiences.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutValues />
        <AboutTeam />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
