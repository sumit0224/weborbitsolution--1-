import Link from 'next/link';
import type { GeneratedPageConfig } from '../data/seoGeneratedPages';

type SeoContentPageProps = {
  config: GeneratedPageConfig;
};

const SeoContentPage = ({ config }: SeoContentPageProps) => {
  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container space-y-10">
        <header className="max-w-5xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">{config.badge}</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">{config.h1}</h1>
          {config.intro.map((paragraph) => (
            <p key={paragraph} className="text-gray-300 text-base md:text-lg mt-5 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </header>

        {config.sections.map((section) => (
          <article key={section.h2} className="border border-white/10 bg-white/5 p-8 space-y-5">
            <h2 className="text-2xl md:text-3xl font-semibold">{section.h2}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2 text-gray-300">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
            )}

            {section.subSections &&
              section.subSections.map((subSection) => (
                <div key={subSection.h3} className="space-y-3 pt-2">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">{subSection.h3}</h3>
                  {subSection.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {subSection.bullets && subSection.bullets.length > 0 && (
                    <ul className="space-y-2 text-gray-300">
                      {subSection.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </article>
        ))}

        {config.internalLinks && config.internalLinks.length > 0 && (
          <section className="border border-primary/30 bg-primary/10 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Suggested Internal Links</h2>
            <ul className="mt-5 space-y-3 text-gray-200">
              {config.internalLinks.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  -{' '}
                  <Link href={item.href} className="text-primary hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {config.faqs && config.faqs.length > 0 && (
          <section className="border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {config.faqs.map((faq) => (
                <article key={faq.q}>
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  <p className="text-gray-300 mt-2 leading-relaxed">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-primary/40 bg-primary/10 p-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{config.cta.heading}</h2>
          <p className="text-gray-100 mt-4 leading-relaxed">{config.cta.body}</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              href={config.cta.primaryHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              {config.cta.primaryLabel}
            </Link>
            {config.cta.secondaryLabel && config.cta.secondaryHref && (
              <Link
                href={config.cta.secondaryHref}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
              >
                {config.cta.secondaryLabel}
              </Link>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default SeoContentPage;
