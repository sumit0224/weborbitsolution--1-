import { defineQuery } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type?: 'image'
  alt?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  slug?: string
  keywords?: string[]
  ogImage?: SanityImage
}

export interface BlogAuthor {
  name: string
  image?: SanityImage
}

export interface SanityBlogPost {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  publishedAt?: string
  readTime?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  author?: BlogAuthor
  seo?: SeoFields
}

const seoProjection = `
"seo": {
  "metaTitle": coalesce(seo.metaTitle, title),
  "metaDescription": coalesce(seo.metaDescription, excerpt),
  "slug": coalesce(seo.slug.current, slug.current),
  "keywords": seo.keywords,
  "ogImage": seo.ogImage
}
`

export const BLOG_POSTS_QUERY = defineQuery(`
*[_type == "blogPost" && defined(slug.current)]
| order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  excerpt,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  readTime,
  mainImage,
  "category": category->title,
  "author": author->{
    name,
    image
  },
  ${seoProjection}
}
`)

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current
}
`)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
  readTime,
  mainImage,
  body,
  "category": category->title,
  "author": author->{
    name,
    image
  },
  ${seoProjection}
}
`)

export const SERVICES_QUERY = defineQuery(`
*[_type == "service"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  icon,
  featuredImage,
  features,
  ${seoProjection}
}
`)

export const TESTIMONIALS_QUERY = defineQuery(`
*[_type == "testimonial"] | order(orderRank asc){
  _id,
  name,
  role,
  company,
  quote,
  rating,
  avatar,
  ${seoProjection}
}
`)

export const CASE_STUDIES_QUERY = defineQuery(`
*[_type == "caseStudy"] | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  clientName,
  heroImage,
  results,
  ${seoProjection}
}
`)

export const TEAM_MEMBERS_QUERY = defineQuery(`
*[_type == "teamMember"] | order(orderRank asc){
  _id,
  name,
  "slug": slug.current,
  role,
  image,
  bio,
  expertise,
  ${seoProjection}
}
`)

export const FAQ_QUERY = defineQuery(`
*[_type == "faq"] | order(orderRank asc){
  _id,
  question,
  answer,
  category,
  ${seoProjection}
}
`)

export const SEO_SETTINGS_QUERY = defineQuery(`
*[_type == "seoSettings"][0]{
  _id,
  siteName,
  defaultMetaTitle,
  defaultMetaDescription,
  defaultOgImage,
  defaultKeywords,
  "slug": slug.current
}
`)

export const SITEMAP_BLOG_POSTS_QUERY = defineQuery(`
*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt)
}
`)
