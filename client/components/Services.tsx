import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    title: 'Android APPs',
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
  const [imageY, setImageY] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const updateActiveFromScroll = useCallback(() => {
    if (!containerRef.current) return;

    const sectionRect = containerRef.current.getBoundingClientRect();
    const inView = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;

    if (!inView) {
      setActiveIndex(null);
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    let closestCenter = viewportCenter;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
        closestCenter = center;
      }
    });

    if (closestDistance !== Number.POSITIVE_INFINITY) {
      setActiveIndex(servicesList[closestIndex].id);
      setImageY(closestCenter);
    }
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveFromScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateActiveFromScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateActiveFromScroll]);

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

  useEffect(() => {
    if (!revealRef.current) return;
    gsap.set(revealRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
  }, []);

  return (
    <section ref={containerRef} id="services" className="bg-black text-white section-padding relative overflow-hidden">

      {/* Floating Image Reveal Container - Left of the centered text */}
      <div
        ref={revealRef}
        className="fixed w-[200px] h-[200px] pointer-events-none z-30 rounded-lg overflow-hidden hidden lg:block border border-white/20 shadow-2xl"
        style={{
          left: '14vw',
          top: imageY
        }}
      >
        {servicesList.map((service) => (
          <img
            key={service.id}
            src={service.image}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeIndex === service.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex justify-start md:justify-center mb-16 md:mb-24">
          <h2 className="font-heading [filter:url('#liquid-flow')]  text-primary text-2xl md:text-3xl -rotate-6">Solution</h2>
        </div>

        {/* List */}
        <div className="flex flex-col items-end space-y-10">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="group w-full flex justify-end cursor-pointer transition-colors duration-300 select-none"
            >
              <div className="relative inline-block text-right">
                {/* Number */}
                <span className={`absolute -left-14 top-2 font-mono text-xs md:text-sm tracking-widest transition-colors duration-300 ${activeIndex === service.id ? 'text-primary' : 'text-gray-600'}`}>
                  (0{service.id})
                </span>

                {/* Title */}
                <h3
                  className={`font-body font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter transition-all duration-300 leading-[0.9]
                              ${activeIndex !== null && activeIndex !== service.id
                      ? 'text-gray-800 blur-[2px]'
                      : 'text-white'}`}
                >
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
