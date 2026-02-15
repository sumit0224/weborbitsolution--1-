'use client';

import React from 'react';
import About from '../components/About';
import Manifesto from '../components/Manifesto';

const AboutPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32">
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Who We Are</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          The IT Services Team
          <br />
          Behind WebOrbit
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          We are a multidisciplinary team of designers, developers, and strategists delivering website development, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting for startups and growing companies in India and worldwide.
        </p>
      </div>
      <About />
      <Manifesto />
      <div className="border-t border-white/10 px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Vision', desc: 'Design-forward, performance-first experiences that feel effortless.' },
            { title: 'Values', desc: 'Clarity, momentum, and craft in every deliverable.' },
            { title: 'Impact', desc: 'We help brands stand out with measurable, lasting outcomes.' },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
