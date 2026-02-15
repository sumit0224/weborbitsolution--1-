'use client';

import React from 'react';
import Link from 'next/link';
import Portfolio from '../components/Portfolio';
import StartProject from '../components/StartProject';

const WorkPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32">
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Selected Work</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          Web Design & Development
          <br />
          Portfolio in India
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          A mix of premium web design, development, and branding launches crafted to scale and perform for modern teams.
        </p>
        <p className="text-gray-400 text-sm mt-4">
          Interested in a similar build? Explore our{' '}
          <Link href="/services" className="text-primary font-semibold hover:underline">
            web development services
          </Link>{' '}
          or{' '}
          <Link href="/seo-services-in-india" className="text-primary font-semibold hover:underline">
            SEO services in India
          </Link>
          .
        </p>
      </div>
      <Portfolio />
      <StartProject />
    </section>
  );
};

export default WorkPage;
