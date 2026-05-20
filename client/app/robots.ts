import { MetadataRoute } from 'next'

const SITE_URL = 'https://weborbitsolution.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/studio'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
