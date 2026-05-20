'use client'

import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { getSanityImageUrl } from '@/src/lib/sanity/image'

type PortableTextImage = {
  alt?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-foreground mt-10 mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/30 pl-4 italic text-foreground/90 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableTextImage
      const src = getSanityImageUrl(image, 1200, 675)

      if (!src) {
        return null
      }

      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-border/60">
          <div className="relative aspect-[16/9]">
            <Image
              src={src}
              alt={image.alt || 'Article image'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </figure>
      )
    },
  },
}

interface PortableTextContentProps {
  value: PortableTextBlock[]
}

export function PortableTextContent({ value }: PortableTextContentProps) {
  return <PortableText value={value} components={components} />
}
