import { redirect } from 'next/navigation';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Website, App & SaaS Development in India',
  description:
    'Website, app, SaaS, and custom software development services in India for startups, SMEs, and enterprises with consulting-led delivery and scalable engineering.',
  path: '/website-app-saas-development-company-india',
  robots: {
    index: false,
    follow: true,
  },
});

export default function Page() {
  redirect('/website-app-saas-development-company-india');
}
