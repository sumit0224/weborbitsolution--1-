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
    question: "What’s your typical process for a new project?",
    answer: "We believe in a collaborative approach. It starts with Discovery to understand your goals, followed by Strategy & Design where we shape the visual direction. Once approved, we move to Development using modern frameworks, and finally, Launch & Support to ensure everything runs smoothly."
  },
  {
    question: "How long does a project usually take?",
    answer: "Timelines vary depending on scope and complexity. A standard corporate website typically takes 4-6 weeks, while comprehensive e-commerce or web applications can take 3-6 months. We provide a detailed timeline during our proposal phase."
  },
  {
    question: "Do you offer packages or custom quotes?",
    answer: "Both. We have streamlined packages for startups and small businesses, but for larger or unique projects, we provide custom quotes tailored to your specific requirements and goals to ensure you're not paying for things you don't need."
  },
  {
    question: "What’s included in a branding package?",
    answer: "Our branding packages are comprehensive. They typically include Logo Design, Color Palette, Typography System, Brand Guidelines, and Social Media Assets. We can also include stationery and marketing collateral design upon request."
  },
  {
    question: "Can you work with our existing dev or marketing team?",
    answer: "Absolutely. We act as an extension of your team. Whether you need us to handle just the UI/UX while your team handles backend, or if you need us to build a site that your marketing team populates, we adapt to your workflow."
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
