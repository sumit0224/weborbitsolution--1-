import CookiePolicyPage from '../../views/CookiePolicyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Cookie Policy for WebOrbitSolution Website and Services',
  description:
    "Review WebOrbitSolution's cookie policy to understand essential, analytics, and preference cookies, how consent works, and browser controls across devices.",
  path: '/cookies',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Cookie Policy', path: '/cookies' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <CookiePolicyPage />
    </>
  );
}
