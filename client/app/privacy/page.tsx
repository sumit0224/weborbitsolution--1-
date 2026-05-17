import PrivacyPage from '../../views/PrivacyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Privacy Policy for WebOrbitSolution Website and Services',
  description:
    'Read how WebOrbitSolution collects, uses, secures, and retains personal and project data, plus your privacy rights, cookie choices, and contact channels.',
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
