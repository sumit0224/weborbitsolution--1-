'use client';

import React from 'react';

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, Helix Studio',
    quote: 'WebOrbit delivered a site that feels premium and loads instantly. Our inbound leads doubled within weeks.'
  },
  {
    name: 'Nina Rodriguez',
    role: 'Marketing Lead, Nova Labs',
    quote: 'The team understood our brand voice and translated it into a bold digital system we can scale.'
  },
  {
    name: 'Kenji Sato',
    role: 'Product Director, FluxPay',
    quote: 'From strategy to launch, everything was structured, fast, and deeply thoughtful. Highly recommend.'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-black text-white section-padding border-y border-white/10">
      <div className="page-container">
        <div className="px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Testimonials</p>
              <h2 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
                Trusted By
                <br />
                Bold Teams
              </h2>
            </div>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl">
              We partner with ambitious founders and teams who want digital experiences that feel intentional, fast, and unforgettable.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <article key={item.name} className="bg-white/5 border border-white/10 p-6 md:p-8">
                <div className="text-primary text-sm uppercase tracking-[0.3em]">★★★★★</div>
                <p className="text-xl md:text-2xl font-medium mt-6 leading-relaxed">“{item.quote}”</p>
                <div className="mt-8">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
