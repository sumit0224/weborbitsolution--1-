import Link from 'next/link';

const faqItems = [
  {
    question: 'What is keyword density?',
    answer:
      'Keyword density is the percentage of times a keyword appears compared to the total number of words in a piece of content.',
  },
  {
    question: 'What is a good keyword density percentage?',
    answer:
      'There is no universal perfect number, but most pages naturally stay around 0.5% to 2.5% for primary terms. Focus on relevance and readability first.',
  },
  {
    question: 'Can high keyword density hurt SEO?',
    answer:
      'Yes. Repeating terms unnaturally can look like keyword stuffing, which may reduce user trust and hurt ranking performance.',
  },
  {
    question: 'How often should I check keyword density?',
    answer:
      'Check density during content drafting and again before publishing major landing pages, blog posts, or service pages.',
  },
  {
    question: 'Does this keyword density tool work for pasted text?',
    answer:
      'Yes. You can analyze either a live URL or pasted text, making it useful for audits and drafts before publication.',
  },
];

export default function SEOContentSection() {
  return (
    <article className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 text-gray-200 md:p-10">
      <header className="border-b border-white/10 pb-6">
        <p className="sr-only">Keyword Density Checker and SEO Keyword Analyzer Guide</p>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Keyword SEO Guide</p>
        <h2 className="mt-3 font-body text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
          Complete Guide to Keyword Density Optimization
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
          Use this free keyword density checker to check keyword density for any page or draft. The tool helps you
          balance term usage, avoid stuffing, and improve topical clarity for search engines and users.
        </p>
      </header>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">1. What Keyword Density Is</h2>
        <p className="leading-7">
          Keyword density measures how often a term appears in content relative to the total word count. A keyword
          density tool helps you identify overused and underused phrases so your content remains natural and relevant.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Why Keyword Density Matters for SEO</h2>
        <p className="leading-7">
          Search engines use multiple signals to understand page topics. Clear, natural repetition helps reinforce
          relevance, but excessive repetition can trigger quality issues. A reliable SEO keyword analyzer gives you data
          to maintain balance.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">3. Ideal Keyword Density Percentage</h2>
        <p className="leading-7">
          Most quality pages keep important terms in a reasonable range and vary phrasing through related entities and
          synonyms. Instead of chasing one target percentage, optimize around clarity, intent match, and topical depth.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>Primary terms: usually natural around 0.5% to 2.5%.</li>
          <li>Secondary terms: lower frequency with semantic variation.</li>
          <li>Use context-rich wording rather than repetitive exact matches.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Common Keyword Stuffing Mistakes</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          <li>Repeating exact-match terms in every heading and paragraph.</li>
          <li>Adding awkward keyword lists in footers or intro blocks.</li>
          <li>Forcing terms where user intent expects natural language.</li>
          <li>Ignoring readability and conversion clarity for density metrics.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">5. How to Optimize Keyword Usage</h2>
        <p className="leading-7">
          Start with intent-driven outlines, then use this keyword density checker to review final drafts. Improve weak
          sections with related entities, examples, and clear subheadings instead of repetitive keyword insertion.
        </p>
        <p className="leading-7">
          For full technical + content optimization support, explore our{' '}
          <Link href="/services" className="text-primary underline-offset-4 hover:underline">
            SEO and web services
          </Link>
          .
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
          Need Content Optimization Support?
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-gray-300">
          Our team helps brands improve keyword strategy, on-page SEO structure, and technical content quality for
          scalable organic growth.
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
