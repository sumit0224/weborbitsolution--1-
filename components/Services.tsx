import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const servicesList = [
  {
    id: 1,
    title: 'Branding',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: '3D',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Website',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Motion',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
  },
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    // Mouse move handler for the reveal image with RAF throttling
    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!revealRef.current) {
          rafId = null;
          return;
        }

        // Move image to cursor position with a slight offset to not block text immediately
        gsap.to(revealRef.current, {
          x: lastX,
          y: lastY,
          duration: 0.2,
          ease: "power2.out"
        });

        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (!revealRef.current) return;

    if (activeIndex !== null) {
      gsap.to(revealRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      });
    } else {
      gsap.to(revealRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      });
    }
  }, [activeIndex]);

  return (
    <section ref={containerRef} id="services" className="bg-black text-white py-32 relative overflow-hidden">

      {/* Floating Image Reveal Container - Follows Cursor */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-[280px] h-[180px] md:w-[350px] md:h-[240px] pointer-events-none z-30 rounded-lg overflow-hidden hidden lg:block border border-white/20 shadow-2xl"
        style={{
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          // Offset slightly so it appears next to cursor
          marginTop: '-120px',
          marginLeft: '-180px'
        }}
      >
        {servicesList.map((service) => (
          <img
            key={service.id}
            src={service.image}
            alt={service.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeIndex === service.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex justify-start md:justify-center mb-16 md:mb-24">
          <h2 className="font-heading text-primary text-4xl md:text-5xl -rotate-6">Services</h2>
        </div>

        {/* List */}
        <div className="flex flex-col items-start md:items-center space-y-4">
          {servicesList.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveIndex(service.id)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative flex items-baseline justify-start md:justify-end cursor-pointer transition-colors duration-300 select-none"
            >
              {/* Number */}
              <span className={`font-mono text-xs md:text-sm mr-4 md:mr-6 transition-colors duration-300 translate-y-[-1vw] ${activeIndex === service.id ? 'text-primary' : 'text-gray-700'}`}>
                (0{service.id})
              </span>

              {/* Title */}
              <h3
                className={`font-body font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter transition-all duration-300 leading-[0.9]
                            ${activeIndex !== null && activeIndex !== service.id
                    ? 'text-gray-800 blur-[2px]'
                    : 'text-gray-500 hover:text-white hover:blur-0'}`}
              >
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;