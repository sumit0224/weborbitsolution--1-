import NotFound from '../pages/NotFound';
import { createPageMetadata } from '../lib/seo';

export const metadata = createPageMetadata({
  title: 'Page Not Found | WebOrbitSolution',
  description:
    'The page you requested is unavailable. Explore WebOrbitSolution services for website, app, SaaS, SEO, and IT consulting solutions for teams across India.',
  path: '/404',
  robots: {
    index: false,
    follow: true,
  },
});

export default function NotFoundPage() {
  return <NotFound />;
}
