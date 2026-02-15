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
    <section id="faq" className="bg-black text-white section-padding relative overflow-hidden">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column - Heading */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-32">
              <span className="font-heading text-primary text-4xl mb-4 block -rotate-3">FAQ</span>
              <h2 className="font-body font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight uppercase mb-8 break-words">
                <span className="block">Frequently</span>
                <span className="block">Asked</span>
                <span className="block">Questions</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Have more questions?{' '}
                <Link href="/contact" className="text-primary font-bold hover:underline">
                  Contact Us
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="w-full lg:w-7/12">
            <div className="border-t border-white/20">
              {faqData.map((item, index) => (
                <div key={index} className="border-b border-white/20">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-8 flex justify-between items-start text-left group focus:outline-none"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-medium pr-6 sm:pr-8 group-hover:text-primary transition-colors duration-300 break-words leading-snug">
                      {item.question}
                    </span>
                    <span className={`shrink-0 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      <Plus size={28} />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-full">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
