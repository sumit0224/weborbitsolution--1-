import React from 'react';
import Services from '../components/Services';
import Seo from '../components/Seo';

const ServicesPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32">
      <Seo
        title="Web Design, Development & Branding Services | WebOrbitSolution"
        description="Explore WebOrbitSolution services: web design, web development, branding, UI/UX, and SEO-ready builds for ambitious brands in India."
        path="/services"
      />
      <div className="px-6 md:px-12 mb-16">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">What We Do</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          Services Built
          <br />
          For Bold Brands
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          From identity systems to immersive web experiences, we craft web design, web development, branding, and UI/UX solutions built to rank and convert for growing teams in India.
        </p>
      </div>
      <Services />
      <div className="border-t border-white/10 px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Strategy', desc: 'Research, positioning, and messaging frameworks that clarify direction.' },
            { title: 'Design', desc: 'Brand systems, UI/UX, and creative direction with a premium finish.' },
            { title: 'Engineering', desc: 'High-performance builds with modern stacks and scalable architecture.' },
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

export default ServicesPage;
