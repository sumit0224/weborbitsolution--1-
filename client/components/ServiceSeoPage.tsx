import Link from 'next/link';
import type { ServiceSeoConfig } from '../data/serviceSeoPages';

type ServiceSeoPageProps = {
  config: ServiceSeoConfig;
};

const ServiceSeoPage = ({ config }: ServiceSeoPageProps) => {
  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container space-y-10">
        <header className="max-w-4xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">{config.badge}</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">{config.h1}</h1>
          <p className="text-gray-300 text-base md:text-lg mt-6 leading-relaxed">{config.aiIntro}</p>
          <p className="text-gray-400 text-sm md:text-base mt-3">{config.indiaSignal}</p>
        </header>

        {config.answerSections.map((section, index) => (
          <div key={section.title} className="space-y-6">
            <article className="border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl md:text-3xl font-semibold">{section.title}</h2>
              <h3 className="text-lg font-semibold text-primary mt-4">Direct Answer</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">{section.answer}</p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-gray-300">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
              )}
              {section.comparison && section.comparison.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {section.comparison.map((item) => (
                    <div key={item.label} className="border border-white/10 bg-black/40 p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-gray-400">{item.label}</p>
                      <p className="text-gray-200 mt-2">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>

            {(index + 1) % 2 === 0 && (
              <aside className="rounded-2xl border border-primary/40 bg-primary/10 p-7">
                <p className="text-sm uppercase tracking-[0.25em] text-primary">Consultation Hook</p>
                <h3 className="text-2xl font-black uppercase tracking-tight mt-2">{config.cta.heading}</h3>
                <p className="text-gray-100 mt-3">{config.cta.body}</p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    href={config.cta.primaryHref}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                  >
                    {config.cta.primaryLabel}
                  </Link>
                  <Link
                    href={config.cta.secondaryHref}
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
                  >
                    {config.cta.secondaryLabel}
                  </Link>
                </div>
              </aside>
            )}
          </div>
        ))}

        <section className="border border-white/10 bg-white/5 p-8 space-y-7">
          <h2 className="text-2xl md:text-3xl font-semibold">Experience, Expertise, and Trust Signals</h2>
          <div>
            <h3 className="text-lg font-semibold text-primary">About Founder</h3>
            <p className="text-gray-300 mt-3 leading-relaxed">{config.founder}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary">Technologies Used</h3>
              <ul className="mt-3 space-y-2 text-gray-300">
                {config.technologies.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Industries Served</h3>
              <ul className="mt-3 space-y-2 text-gray-300">
                {config.industries.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Testimonials</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {config.testimonials.map((item) => (
                <blockquote key={item.name} className="border border-white/10 bg-black/40 p-5">
                  <p className="text-gray-100">"{item.quote}"</p>
                  <footer className="text-sm text-gray-400 mt-3">
                    {item.name} - {item.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Lead Capture Form Suggestion</h2>
          <p className="text-gray-300 mt-3 leading-relaxed">
            For higher conversion, use a short form with Name, Work Email, Phone, Company, Project Type, and Budget
            Range. Add a mandatory "Preferred Consultation Slot" field to increase booking intent and reduce drop-off.
          </p>
          <p className="text-gray-300 mt-3 leading-relaxed">
            Keep the first response within 24 hours and include a 30-minute roadmap call option for startups, SMEs,
            and enterprise buyers.
          </p>
          <Link
            href="/contact"
            className="inline-flex mt-5 items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Book Consultation
          </Link>
        </section>

        <section className="border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-6 mt-6">
            {config.faqs.map((item) => (
              <article key={item.q}>
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ServiceSeoPage;
