import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Web Orbit Solution.',
}

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-8">
            Terms & Conditions
          </h1>
          
          <div className="space-y-10 text-lg text-muted-foreground leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">1. Agreement to Terms</h2>
              <p>
                By accessing our website and using our services, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Web Orbit Solution's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on Web Orbit Solution's website;</li>
                <li>remove any copyright or other proprietary notations from the materials.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">3. Disclaimer</h2>
              <p>
                The materials on Web Orbit Solution's website are provided on an 'as is' basis. Web Orbit Solution makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">4. Limitations</h2>
              <p>
                In no event shall Web Orbit Solution or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Web Orbit Solution's website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">5. Revisions and Errata</h2>
              <p>
                The materials appearing on Web Orbit Solution's website could include technical, typographical, or photographic errors. Web Orbit Solution does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground font-display">6. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:hello@weborbitsolution.com" className="text-primary hover:underline font-medium">hello@weborbitsolution.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
