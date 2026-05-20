'use client'

import { Tag } from '@/components/ui/tag'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  tag: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ 
  tag, 
  title, 
  subtitle, 
  align = 'left',
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-5 lg:mb-16',
      align === 'center' && 'text-center',
      className
    )}>
      <RevealOnScroll>
        <Tag>{tag}</Tag>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <h2 className={cn(
          'mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground text-balance',
          align === 'center' && 'mx-auto max-w-3xl'
        )}>
          {title}
        </h2>
      </RevealOnScroll>
      {subtitle && (
        <RevealOnScroll delay={0.2}>
          <p className={cn(
            'mt-4 text-lg text-muted-foreground leading-relaxed',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'
          )}>
            {subtitle}
          </p>
        </RevealOnScroll>
      )}
    </div>
  )
}
