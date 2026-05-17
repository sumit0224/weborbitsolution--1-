import Link from 'next/link';

const faqItems = [
  {
    question: 'What is a meta tag analyzer?',
    answer:
      'A meta tag analyzer checks the HTML head of a webpage and reports whether key tags like title, description, canonical, robots, Open Graph, and Twitter metadata are present and optimized.',
  },
  {
    question: 'How does a meta tag checker help SEO?',
    answer:
      'A meta tag checker identifies missing or weak metadata that impacts crawlability, click-through rates, and how your pages appear in search and social previews.',
  },
  {
    question: 'What is a good title tag length?',
    answer:
      'A practical target is 50 to 60 characters. This range helps reduce truncation in search results while keeping the title specific and compelling.',
  },
  {
    question: 'What is a good meta description length?',
    answer:
      'Aim for around 150 to 160 characters. It should summarize the page clearly and encourage users to click, without stuffing keywords.',
  },
  {
    question: 'Why should I check Open Graph tags?',
    answer:
      'Open Graph tags control how links appear on social platforms. Complete tags improve visual consistency and increase click-through from social shares.',
  },
];

export default function SEOContentSection() {
  return (
    <article className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 text-gray-200 md:p-10">
      <header className="border-b border-white/10 pb-6">
        <p className="sr-only">Meta Tag Analyzer and SEO Meta Tag Checker Guide</p>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Meta SEO Guide</p>
        <h2 className="mt-3 font-body text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
          Complete Guide to Meta Tag Analysis for SEO
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
          Use this free meta tag analyzer to run a fast SEO meta tag test for any URL. It helps marketers and
          developers check meta tags, find technical gaps, and improve both search visibility and social sharing
          previews.
        </p>
      </header>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">1. What Meta Tags Are</h2>
        <p className="leading-7">
          Meta tags are HTML elements inside the page head that provide search engines and social platforms with context
          about your page. A proper meta tag checker should evaluate both traditional SEO tags and social metadata to
          give a complete picture.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Why Meta Tags Matter for SEO</h2>
        <p className="leading-7">
          Metadata impacts indexability, relevance, and click-through rate. When you run a meta tag analyzer regularly,
          you reduce the risk of missing tags after content updates, migrations, or template changes.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>Title and description improve snippet quality and click potential.</li>
          <li>Robots and canonical tags prevent indexing and duplication errors.</li>
          <li>Viewport and charset improve technical quality and compatibility.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">3. Title Tag Best Practices</h2>
        <p className="leading-7">
          Keep titles unique per page, align with user intent, and include the main topic naturally. Most pages perform
          best when titles stay within roughly 50 to 60 characters and prioritize the key phrase early.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Meta Description Best Practices</h2>
        <p className="leading-7">
          A strong description should summarize the page value and include a clear reason to click. Aim for around 150
          to 160 characters, avoid duplication, and keep language human-first.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">5. Why Open Graph and Twitter Tags Are Important</h2>
        <p className="leading-7">
          Open Graph and Twitter metadata control how links render on social platforms. Incomplete tags can cause broken
          previews, poor visual quality, and lower engagement. This is why every SEO meta tag test should include
          social metadata checks.
        </p>
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
          Need Help Fixing Meta Tags at Scale?
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-gray-300">
          If your site has template-level SEO issues, our team can help you implement clean metadata patterns across
          pages and improve technical search performance.
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
