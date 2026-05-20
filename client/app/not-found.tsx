'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-[8rem] sm:text-[10rem] leading-none font-bold text-primary/20"
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-display text-3xl sm:text-4xl font-bold text-foreground"
          >
            Page not found.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground leading-relaxed"
          >
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-3.5 text-base font-semibold transition-all hover:bg-foreground/90 shadow-lg hover:-translate-y-0.5"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              <ArrowLeft size={18} />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
