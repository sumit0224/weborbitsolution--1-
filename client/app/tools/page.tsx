import Link from 'next/link';
import { createPageMetadata } from '../../lib/seo';
import PageSection from '../../components/layout/PageSection';

export const metadata = createPageMetadata({
  title: 'Free SEO and Performance Tools',
  description:
    'Explore WebOrbitSolution free tools for website performance testing, Core Web Vitals checks, and practical SEO optimization workflows.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <PageSection className="bg-black pt-28 text-white" spacing="large" containerWidth="screen">
      <header className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">Growth Toolkit</p>
        <h1 className="type-h1 mt-4 font-body font-black uppercase text-white">Free SEO and Performance Tools</h1>
        <p className="type-body-lg mt-5 text-gray-300">
          Use our tools to audit website quality, improve technical SEO, and identify performance bottlenecks that affect
          rankings and conversions.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-white">Website Speed Checker</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
            Run a website speed test, inspect Core Web Vitals, and get optimization suggestions for mobile and desktop.
          </p>
          <Link
            href="/tools/website-speed-checker"
            className="mt-6 inline-flex items-center rounded-xl bg-[#20B2AA] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#84f0ea]"
          >
            Open Tool
          </Link>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-white">Meta Tag Analyzer</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
            Check title, description, canonical, robots, Open Graph, and Twitter tags with actionable SEO recommendations.
          </p>
          <Link
            href="/tools/meta-tag-analyzer"
            className="mt-6 inline-flex items-center rounded-xl bg-[#20B2AA] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#84f0ea]"
          >
            Open Tool
          </Link>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-white">Keyword Density Checker</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
            Analyze keyword frequency and density from URL content or pasted text to optimize on-page SEO writing.
          </p>
          <Link
            href="/tools/keyword-density-checker"
            className="mt-6 inline-flex items-center rounded-xl bg-[#20B2AA] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#84f0ea]"
          >
            Open Tool
          </Link>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-white">Sitemap Generator</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
            Crawl internal pages, generate valid XML sitemap files, and download instantly for Search Console submission.
          </p>
          <Link
            href="/tools/sitemap-generator"
            className="mt-6 inline-flex items-center rounded-xl bg-[#20B2AA] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#84f0ea]"
          >
            Open Tool
          </Link>
        </article>
      </div>
    </PageSection>
  );
}
