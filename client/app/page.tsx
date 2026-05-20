import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { CaseStudies } from '@/components/sections/case-studies'
import { Process } from '@/components/sections/process'
import { Team } from '@/components/sections/team'
import { Testimonials } from '@/components/sections/testimonials'
import { ClientLogos } from '@/components/sections/client-logos'
import { Blog } from '@/components/sections/blog'
import { FAQ } from '@/components/sections/faq'
import { CTABanner } from '@/components/sections/cta-banner'

export default function HomePage() {
  return (
   <>
  <Navbar />

  <main>
    <Hero />
    
    <ClientLogos />
    
    <About />
    
    <Services />
    
    <Process />
    
    <CaseStudies />
    
    <Testimonials />
    
    <Team />
    
    <Blog />
    
    <FAQ />

    <CTABanner />
  </main>

  <Footer />
</>
  )
}
