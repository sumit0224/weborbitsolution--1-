import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax } from 'swiper/modules';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

// Swiper styles are imported in index.html

const projects: Project[] = [
  {
    id: 1,
    title: 'Neon Horizon',
    category: 'E-commerce',
    image: 'https://picsum.photos/id/12/1200/800',
    year: '2023'
  },
  {
    id: 2,
    title: 'Abstract Arch',
    category: 'Portfolio',
    image: 'https://picsum.photos/id/28/1200/800',
    year: '2024'
  },
  {
    id: 3,
    title: 'Quantum Finance',
    category: 'Fintech',
    image: 'https://picsum.photos/id/48/1200/800',
    year: '2023'
  },
  {
    id: 4,
    title: 'Eco Sphere',
    category: 'Non-Profit',
    image: 'https://picsum.photos/id/54/1200/800',
    year: '2024'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="section-padding  bg-black relative overflow-hidden">
      <div className="border-y border-white/10 py-6 mb-16 overflow-hidden">
        <div className="marquee">
          <div className="flex items-center gap-12 px-6 md:px-12 whitespace-nowrap">
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl -rotate-3">Top Picks</span>
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl -rotate-3">Top Picks</span>
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl -rotate-3">Top Picks</span>
          </div>
          <div className="flex items-center gap-12 px-6 md:px-12 whitespace-nowrap" aria-hidden="true">
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl -rotate-3">Top Picks</span>
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl -rotate-3">Top Picks</span>
            <span className="text-6xl md:text-7xl font-black uppercase tracking-tight text-white">Works</span>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">(03)</span>
            <span className="text-primary [filter:url('#liquid-flow')] text-2xl md:text-3xl -rotate-3">Top Picks</span>
          </div>
        </div>
      </div>

      <div className="page-container mb-12 flex flex-col gap-8 md:flex-row md:justify-between md:items-end">
        <div>
          <h2 className="font-heading text-2xl md:text-4xl text-white mb-4">Selected Work</h2>
          <p className="text-primary font-body uppercase tracking-widest text-sm">Showcase 2024-2025</p>
        </div>
        
        {/* Navigation buttons will be injected by Swiper */}
        <div className="flex space-x-4">
           <div className="swiper-button-prev-custom w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all cursor-pointer">
             ←
           </div>
           <div className="swiper-button-next-custom w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all cursor-pointer">
             →
           </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-12">
        <Swiper
          modules={[Navigation, Pagination, Parallax]}
          spaceBetween={30}
          slidesPerView={1.2}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{ clickable: true }}
          parallax={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.8 },
          }}
          className="w-full h-[500px] md:h-[600px] !overflow-visible"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="group cursor-hover relative overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
                data-swiper-parallax="-20%"
              ></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{project.category} — {project.year}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-heading text-white">{project.title}</h3>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;
