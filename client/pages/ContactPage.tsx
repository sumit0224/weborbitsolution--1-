'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Contact from '../components/Contact';
import Seo from '../components/Seo';

const ContactPage: React.FC = () => {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || undefined;

  return (
    <section className="bg-black text-white pt-32">
      <Seo
        title="Contact WebOrbitSolution | IT Services in India"
        description="Contact WebOrbitSolution for website development, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting. Get a clear plan and quote within 24 hours."
        path="/contact"
      />
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Let’s Talk</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          Start Your
          <br />
          IT Project
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          {planName
            ? `You're interested in the ${planName} plan. Great choice! Let's discuss the details.`
            : "Tell us about your goals for website development, web & app development, UI/UX design, SEO services, digital marketing, or IT consulting. We'll respond with a clear plan, timeline, and quote."}
        </p>
      </div>
      <Contact />
      <div className="border-t border-white/10 px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Email', value: 'hello@weborbitsolution.in' },
            { title: 'Phone', value: '+91 9310513770' },
            { title: 'Studio', value: ' Sector-128, Noida ' },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 p-6 bg-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.title}</p>
              <p className="text-lg font-semibold mt-4">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
