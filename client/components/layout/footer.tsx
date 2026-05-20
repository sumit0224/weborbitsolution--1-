import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react'

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/case-studies', label: 'Our Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services/creative-design', label: 'Creative Design' },
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/seo-strategy', label: 'SEO Strategy' },
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
  ],
  resources: [
    { href: '/blog', label: 'Articles' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/contact', label: 'Free Consultation' },
  ],
}

const socialLinks = [
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://dribbble.com', icon: Dribbble, label: 'Dribbble' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.webp" 
                alt="Weborbit Solution" 
                width={200} 
                height={50} 
                sizes="(max-width: 640px) 150px, 200px"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
              A premium digital agency crafting exceptional brands, websites, and marketing strategies that drive measurable growth.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-muted-foreground leading-relaxed">
                Shahpur, Sector 128, Noida
              </li>
              <li>
                <a
                  href="mailto:hello@weborbitsolution.in"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  hello@weborbitsolution.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+91 9310513770"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +91 93105-13770
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} weborbit solution. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
