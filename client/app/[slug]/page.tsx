import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import SeoContentPage from '../../components/SeoContentPage';
import { seoGeneratedPages, seoGeneratedPageSlugs } from '../../data/seoGeneratedPages';
import { createPageMetadata } from '../../lib/seo';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
  serviceJsonLd,
} from '../../lib/structured-data';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export const dynamicParams = false;

export const generateStaticParams = () => seoGeneratedPageSlugs.map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const config = seoGeneratedPages[slug];

  if (!config) {
    return createPageMetadata({
      title: 'Page Not Found | WebOrbitSolution',
      description: 'The page you are looking for could not be found.',
      path: '/404',
      normalize: false,
      robots: {
        index: false,
        follow: true,
      },
    });
  }

  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: `/${config.slug}`,
  });
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const config = seoGeneratedPages[slug];

  if (!config) {
    notFound();
  }

  const jsonLd: Array<Record<string, unknown>> = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: `WebOrbit Solution - ${config.h1}`,
      description: config.metaDescription,
    }),
    serviceJsonLd([config.targetKeyword]),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: config.h1, path: `/${config.slug}` },
    ]),
  ];
  if (config.faqs?.length) {
    jsonLd.push(faqPageJsonLd(config.faqs));
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoContentPage config={config} />
    </>
  );
}
