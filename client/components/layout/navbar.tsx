'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/magnetic-button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { 
    href: '/services', 
    label: 'Services',
    dropdown: [
      { href: '/services/creative-design', label: 'Creative Design' },
      { href: '/services/web-development', label: 'Web Development' },
      { href: '/services/seo-strategy', label: 'SEO Strategy' },
      { href: '/services/digital-marketing', label: 'Digital Marketing' },
      { href: '/services/social-media', label: 'Social Media' },
      { href: '/services/brand-identity', label: 'Brand Identity' },
    ]
  },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.webp" 
                alt="Weborbit Solution" 
                width={400} 
                height={300} 
                className="h-15 w-auto object-center"
                sizes="(max-width: 640px) 150px, 200px"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.href} className="relative group py-2">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-card border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:scale-100 scale-95">
                      <div className="p-2 flex flex-col gap-1">
                        {link.dropdown.map((drop) => (
                          <Link
                            key={drop.href}
                            href={drop.href}
                            className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                          >
                            {drop.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90"
                >
                  {"Let's Talk"}
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden overflow-y-auto"
          >
            <motion.div
              initial={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-0 bg-background min-h-screen pb-20 pt-24"
            >
              <div className="flex flex-col items-center justify-start h-full gap-8 px-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    className="w-full flex flex-col items-center text-center"
                  >
                    {link.dropdown ? (
                      <div className="w-full">
                        <button
                          onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                          className="font-display text-3xl font-bold text-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 w-full"
                        >
                          {link.label}
                          <ChevronDown 
                            size={24} 
                            className={cn(
                              "transition-transform duration-300", 
                              openMobileDropdown === link.label ? "rotate-180" : ""
                            )} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openMobileDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-4"
                            >
                              <div className="flex flex-col items-center gap-4 border-l-2 border-primary/20 ml-6 pl-4 py-2">
                                {link.dropdown.map((drop) => (
                                  <Link
                                    key={drop.href}
                                    href={drop.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left w-full"
                                  >
                                    {drop.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-display text-3xl font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : navLinks.length * 0.1 }}
                  className="mt-4"
                >
                  <MagneticButton>
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-lg font-semibold text-background"
                    >
                      {"Let's Talk"}
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
