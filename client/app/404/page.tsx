import NotFound from '../../views/NotFound';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Page Not Found | WebOrbitSolution',
  description: 'The page you are looking for could not be found.',
  path: '/404',
  robots: {
    index: false,
    follow: false,
  },
});

export default function Page() {
  return <NotFound />;
}
