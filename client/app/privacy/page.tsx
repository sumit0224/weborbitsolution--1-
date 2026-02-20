import PrivacyPage from '../../views/PrivacyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Privacy Policy | WebOrbitSolution',
  description: 'Read the WebOrbitSolution privacy policy and how we handle data for clients and visitors.',
  path: '/privacy',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PrivacyPage />
    </>
  );
}
