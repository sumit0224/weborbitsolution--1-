import BlogPage from '../../views/BlogPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Web Development & SEO Insights in India',
  description:
    'Read WebOrbitSolution insights on web design, web development, branding, and SEO. Practical guides for modern teams building fast, high-converting websites.',
  path: '/blog',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPage />
    </>
  );
}
