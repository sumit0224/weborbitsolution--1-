import { createClient } from 'next-sanity'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-20'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const isSanityConfigured = Boolean(projectId && dataset)

if (!isSanityConfigured && process.env.NODE_ENV !== 'production') {
  console.warn(
    'Sanity is not fully configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to enable CMS-backed content.',
  )
}

export const client = createClient({
  projectId: projectId || 'missing-project-id',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: false,
  },
})
