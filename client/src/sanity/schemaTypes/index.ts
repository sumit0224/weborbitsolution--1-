import { blogPostType } from './documents/blogPost'
import { categoryType } from './documents/category'
import { authorType } from './documents/author'
import { serviceType } from './documents/service'
import { testimonialType } from './documents/testimonial'
import { caseStudyType } from './documents/caseStudy'
import { teamMemberType } from './documents/teamMember'
import { faqType } from './documents/faq'
import { seoSettingsType } from './documents/seoSettings'
import { seoType } from './objects/seo'
import { portableTextType } from './objects/portableText'

export const schemaTypes = [
  portableTextType,
  seoType,
  blogPostType,
  categoryType,
  authorType,
  serviceType,
  testimonialType,
  caseStudyType,
  teamMemberType,
  faqType,
  seoSettingsType,
]
