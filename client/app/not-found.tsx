import type { Metadata } from 'next';
import NotFound from '../views/NotFound';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Page Not Found | WebOrbitSolution',
    description:
      'The page you requested is unavailable. Explore WebOrbitSolution services for website, app, SaaS, SEO, and IT consulting solutions for teams across India.',
    path: '/404',
    normalize: false,
  }),
  other: {
    robots: 'noindex,follow',
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
