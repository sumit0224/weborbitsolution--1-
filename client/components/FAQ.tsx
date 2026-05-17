'use client';

import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much does website development cost in India?",
    answer: "Website development pricing depends on scope, content, and features. We offer fixed-scope packages for startups and custom quotes for complex builds, with clear line items for design, development, SEO setup, and support."
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most marketing websites take a few weeks once content is ready, while ecommerce or web applications take longer. After discovery, we provide a delivery timeline with key milestones and review points."
  },
  {
    question: "Do you include SEO with website development?",
    answer: "Yes. Every build includes SEO-ready structure, optimized metadata, clean code, and performance best practices. We can also add ongoing SEO services for content and rankings."
  },
  {
    question: "What tech stack do you use for web and app development?",
    answer: "We use modern stacks like React and Next.js for frontend, plus Node.js and scalable APIs where needed. The stack is selected based on performance, SEO, and long-term maintainability."
  },
  {
    question: "Can you redesign an existing website and improve Core Web Vitals?",
    answer: "Yes. We audit your current site, fix performance bottlenecks, optimize assets, and improve LCP, CLS, and INP so your site loads faster and ranks better."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  }, []);

  return (
    <section id="faq" className="section-padding relative overflow-hidden border-y border-white/10 bg-black text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="page-container relative">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] xl:gap-14">
          <div className="space-y-6 xl:sticky xl:top-32 xl:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
            <h2 className="type-h1 font-body font-black uppercase text-white">Frequently Asked Questions</h2>
            <p className="type-body-lg text-gray-300">
              Answers to common questions about pricing, timelines, SEO, and delivery. Need a custom project estimate?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-primary/50 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-primary transition-colors hover:border-primary hover:bg-primary hover:text-black"
            >
              Contact Us
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111]/85 p-3 md:p-4">
            <div className="space-y-3">
              {faqData.map((item, index) => (
                <article key={item.question} className="rounded-xl border border-white/10 bg-black/60">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="group flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                  >
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-xs font-semibold tracking-[0.18em] text-primary/90">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-primary md:text-xl">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 p-1.5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={`grid overflow-hidden px-4 transition-all duration-300 ease-out md:px-5 ${
                      openIndex === index ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/10 pt-4 text-sm leading-7 text-gray-300 md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
