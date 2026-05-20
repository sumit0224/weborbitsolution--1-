'use client'

import { SectionHeader } from '@/components/ui/section-header'

import Image from 'next/image'

const clients = [
  { name: 'Google', logo: 'https://icon.horse/icon/google.com' },
  { name: 'Microsoft', logo: 'https://icon.horse/icon/microsoft.com' },
  { name: 'Netflix', logo: 'https://icon.horse/icon/netflix.com' },
  { name: 'Spotify', logo: 'https://icon.horse/icon/spotify.com' },
  { name: 'Amazon', logo: 'https://icon.horse/icon/amazon.com' },
  { name: 'Stripe', logo: 'https://icon.horse/icon/stripe.com' },
  { name: 'Airbnb', logo: 'https://icon.horse/icon/airbnb.com' },
  { name: 'Uber', logo: 'https://icon.horse/icon/uber.com' },
]

export function ClientLogos() {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Trusted By"
          title="Industry-Leading Clients"
          subtitle="We have helped hundreds of businesses achieve success through strategic digital transformation."
          align="center"
        />

        {/* Logo Strip */}
        <div className="relative overflow-hidden">
          <div className="flex">
            <div className="motion-safe:animate-marquee flex items-center gap-16 whitespace-nowrap">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="relative flex h-16 w-32 items-center justify-center px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="motion-safe:animate-marquee flex items-center gap-16 whitespace-nowrap" aria-hidden="true">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="relative flex h-16 w-32 items-center justify-center px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
