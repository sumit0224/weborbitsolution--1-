import CookiePolicyPage from '../../pages/CookiePolicyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Cookie Policy | WebOrbitSolution',
  description: 'Read the WebOrbitSolution cookie policy and how cookies are used on our website.',
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
