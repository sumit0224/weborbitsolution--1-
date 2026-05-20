import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ContactHero } from './contact-hero'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out to Web Orbit Solution. We are ready to discuss your next project.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <ContactHero />
            </div>
            <div className="lg:col-span-7 lg:pl-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
