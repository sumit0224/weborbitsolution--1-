import type { Metadata } from 'next';
import BlogPostPage from '../../../pages/BlogPostPage';
import JsonLd from '../../../components/JsonLd';
import { blogPosts } from '../../../data/blogPosts';
import { createPageMetadata, siteConfig } from '../../../lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '../../../lib/structured-data';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export const generateStaticParams = () => blogPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return createPageMetadata({
      title: 'WebOrbit Journal | Web Design, Development & SEO Insights',
      description:
        'Read WebOrbitSolution insights on web design, web development, branding, and SEO. Practical guides for modern teams building fast, high-converting websites.',
      path: '/blog',
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
  const post = blogPosts.find((item) => item.slug === slug);
  const jsonLd = post
    ? [
      blogPostingJsonLd(post),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ]
    : breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostPage />
    </>
  );
}
