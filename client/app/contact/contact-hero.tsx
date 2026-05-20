'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Shahpur Sector 128, Noida',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@weborbitsolution.com',
    href: 'mailto:hello@weborbitsolution.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9310513770',
    href: 'tel:+919310513770',
  },
]

export function ContactHero() {
  return (
    <div className="flex flex-col">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
      >
        Get in touch.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md"
      >
        Have a project in mind or just want to say hi? We'd love to hear from you. Drop us a message below and we'll get back to you promptly.
      </motion.p>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 space-y-8"
      >
        {contactInfo.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1">
              <item.icon size={20} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-base font-semibold text-foreground">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
