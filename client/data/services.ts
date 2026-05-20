import { Palette, Code, Search, Megaphone, Share2, Sparkles, LucideIcon } from 'lucide-react'

export interface Service {
  id: number
  icon: LucideIcon
  title: string
  description: string
  slug: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 1,
    icon: Palette,
    title: 'Creative Design & Visual Storytelling',
    description: 'We craft visually stunning designs that captivate your audience and communicate your brand story with impact and precision.',
    slug: 'creative-design',
    features: [
      'Brand Visual Identity Systems',
      'UI/UX Design & Prototyping',
      'Motion Graphics & Animation',
      'Marketing Collateral Design',
      'Presentation Design',
    ],
  },
  {
    id: 2,
    icon: Code,
    title: 'Web Development & Engineering',
    description: 'Custom-built websites and web applications using cutting-edge technologies that deliver exceptional performance and user experience.',
    slug: 'web-development',
    features: [
      'Custom Web Applications',
      'E-commerce Platforms',
      'CMS Development',
      'API Integration',
      'Performance Optimization',
    ],
  },
  {
    id: 3,
    icon: Search,
    title: 'SEO & Search Strategy',
    description: 'Data-driven SEO strategies that boost your visibility, drive organic traffic, and establish your authority in search results.',
    slug: 'seo-strategy',
    features: [
      'Technical SEO Audits',
      'Keyword Research & Strategy',
      'On-Page Optimization',
      'Link Building Campaigns',
      'Analytics & Reporting',
    ],
  },
  {
    id: 4,
    icon: Megaphone,
    title: 'Digital Marketing & Paid Ads',
    description: 'Strategic campaigns across Google, Meta, and emerging platforms that maximize ROI and accelerate your business growth.',
    slug: 'digital-marketing',
    features: [
      'PPC Campaign Management',
      'Social Media Advertising',
      'Conversion Rate Optimization',
      'Marketing Automation',
      'Performance Analytics',
    ],
  },
  {
    id: 5,
    icon: Share2,
    title: 'Social Media Management',
    description: 'Engaging content strategies and community management that build loyal audiences and amplify your brand presence.',
    slug: 'social-media',
    features: [
      'Content Strategy & Planning',
      'Community Management',
      'Influencer Partnerships',
      'Paid Social Campaigns',
      'Analytics & Insights',
    ],
  },
  {
    id: 6,
    icon: Sparkles,
    title: 'Brand Identity & Strategy',
    description: 'Comprehensive brand development from strategy to execution, creating memorable identities that resonate with your target market.',
    slug: 'brand-identity',
    features: [
      'Brand Strategy & Positioning',
      'Logo & Visual Identity',
      'Brand Guidelines',
      'Naming & Messaging',
      'Brand Architecture',
    ],
  },
]
