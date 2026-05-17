import Link from 'next/link';

const faqItems = [
  {
    question: 'What is an XML sitemap?',
    answer:
      'An XML sitemap is a machine-readable file that lists important URLs on your website so search engines can discover and crawl them more efficiently.',
  },
  {
    question: 'Why does an XML sitemap matter for SEO?',
    answer:
      'Sitemaps help search engines discover priority pages faster, especially on large or newly launched websites with deep internal structures.',
  },
  {
    question: 'How do search engines use sitemaps?',
    answer:
      'Search engines parse sitemap URLs, compare crawl signals, and use the file as a discovery hint. A sitemap does not guarantee indexing, but improves crawl coverage.',
  },
  {
    question: 'How often should I update my sitemap?',
    answer:
      'Update it whenever major pages are added, removed, or restructured. Dynamic websites should refresh sitemaps regularly as content changes.',
  },
  {
    question: 'How do I submit a sitemap to Google Search Console?',
    answer:
      'Open your property in Google Search Console, go to Indexing > Sitemaps, enter your sitemap URL, and click Submit.',
  },
];

export default function SEOContentSection() {
  return (
    <article className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 text-gray-200 md:p-10">
      <header className="border-b border-white/10 pb-6">
        <p className="sr-only">XML Sitemap Generator and Website Sitemap SEO Guide</p>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Sitemap SEO Guide</p>
        <h2 className="mt-3 font-body text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
          Complete Guide to XML Sitemap Generation for SEO
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
          Use this free sitemap generator to create sitemap files online, improve crawl discovery, and strengthen
          technical SEO foundations. The tool helps you generate a sitemap online and download valid XML in seconds.
        </p>
      </header>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">1. What an XML Sitemap Is</h2>
        <p className="leading-7">
          An XML sitemap is a structured list of website URLs intended for search engines. It acts as a crawl roadmap
          for important pages and helps bots understand your site architecture more efficiently.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Why Sitemaps Matter for SEO</h2>
        <p className="leading-7">
          Sitemaps support SEO by making URL discovery easier, especially for large sites, deep pages, new content, and
          recently migrated sections. They improve crawl coverage and reduce the risk of orphan pages.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">3. How Search Engines Use Sitemaps</h2>
        <p className="leading-7">
          Search engines fetch sitemap files, queue URLs for crawl evaluation, and combine these hints with internal
          links, canonical tags, and crawl budget signals. A sitemap is a discovery accelerator, not an indexing
          guarantee.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Sitemap Best Practices</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>Include only canonical, indexable URLs.</li>
          <li>Remove redirecting, broken, or noindex pages.</li>
          <li>Keep sitemap updated when content changes.</li>
          <li>Use a consistent URL format (HTTPS + preferred host).</li>
          <li>Submit sitemap to Google Search Console and monitor coverage.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">5. How to Submit Sitemap to Google Search Console</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-7">
          <li>Open your website property in Google Search Console.</li>
          <li>Navigate to Indexing and select Sitemaps.</li>
          <li>Enter your sitemap URL (for example, `/sitemap.xml`).</li>
          <li>Submit and review indexing reports over time.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-xl border border-white/10 bg-black/40 p-4">
              <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-white marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 leading-7 text-gray-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-primary/35 bg-black p-6 md:p-8">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
          Need Technical SEO Help Beyond Sitemap Generation?
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-gray-300">
          Our team can improve crawl efficiency, indexing quality, and technical SEO performance across your website
          structure.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-black transition-colors hover:bg-[#84f0ea]"
          >
            Contact WebOrbitSolution
          </Link>
        </div>
      </section>
    </article>
  );
}

export { faqItems };
