import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import BlogPost from '../../../components/blog/BlogPost';
import { blogPosts } from '../../../data/blogPosts';
import { createPageMetadata, siteConfig } from '../../../lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '../../../lib/structured-data';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export const generateStaticParams = () =>
  blogPosts
    .filter((post) => post.published !== false)
    .map((post) => ({ slug: post.slug }));
export const dynamicParams = false;

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.published !== false);

  if (!post) {
    return createPageMetadata({
      title: 'Page Not Found | WebOrbitSolution',
      description: 'The article you are looking for could not be found.',
      path: '/404',
      robots: {
        index: false,
        follow: false,
      },
    });
  }

  return createPageMetadata({
    title: post.metaTitle ? `${post.metaTitle} | WebOrbitSolution` : `${post.title} | WebOrbitSolution`,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage.src,
    type: 'article',
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
  });
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.published !== false);

  if (!post) {
    notFound();
  }

  const jsonLd = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPost post={post} />
    </>
  );
}
