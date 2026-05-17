import { businessContact, siteConfig } from './seo';
import type { BlogPost } from '../data/blogPosts';
import { socialProfiles } from './external-links';

const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.png`,
  description: siteConfig.description,
  email: businessContact.email,
  telephone: businessContact.telephone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessContact.streetAddress,
    addressLocality: businessContact.addressLocality,
    addressRegion: businessContact.addressRegion,
    postalCode: businessContact.postalCode,
    addressCountry: businessContact.addressCountry,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: businessContact.telephone,
      email: businessContact.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  areaServed: ['India', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'],
  sameAs: [socialProfiles.instagram, socialProfiles.linkedin],
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
});

export const serviceJsonLd = (serviceTypes: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web Development and SEO Services',
  serviceType: serviceTypes,
  areaServed: ['India', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'],
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
});

type LocalBusinessJsonLdOptions = {
  name?: string;
  description?: string;
};

export const localBusinessJsonLd = ({ name, description }: LocalBusinessJsonLdOptions = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}#localbusiness`,
  name: name || businessContact.name,
  description: description || siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/logo-v2.png`,
  email: businessContact.email,
  telephone: businessContact.telephone,
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Kolkata' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessContact.streetAddress,
    addressLocality: businessContact.addressLocality,
    addressRegion: businessContact.addressRegion,
    postalCode: businessContact.postalCode,
    addressCountry: businessContact.addressCountry,
  },
});

export const faqPageJsonLd = (items: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
});

export const blogPostingJsonLd = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.metaDescription || post.excerpt,
  image: [absoluteUrl(post.featuredImage.src)],
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Organization',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/favicon.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/blog/${post.slug}`,
  },
});

export const breadcrumbJsonLd = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

type SoftwareApplicationJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  operatingSystem?: string;
};

export const softwareApplicationJsonLd = ({
  name,
  description,
  path,
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web Browser',
}: SoftwareApplicationJsonLdOptions) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url: absoluteUrl(path),
  applicationCategory,
  operatingSystem,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});
