import type { Metadata } from 'next';
import NotFound from '../../views/NotFound';
import { createPageMetadata } from '../../lib/seo';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Page Not Found | WebOrbitSolution',
    description: 'The page you are looking for could not be found.',
    path: '/404',
    normalize: false,
  }),
  other: {
    robots: 'noindex,follow',
  },
};

export default function Page() {
  return <NotFound />;
}
