import 'server-only'

import type { QueryParams } from 'next-sanity'
import { client, isSanityConfigured } from './client'

const DEFAULT_REVALIDATE = 120

type SanityFetchOptions = {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null
  }

  try {
    return await client.fetch<T>(query, params, {
      useCdn: true,
      next: {
        revalidate,
        tags,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Sanity fetch failed. Falling back to local/static data.', error)
    }

    return null
  }
}
