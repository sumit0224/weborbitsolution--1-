import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    id: 1,
    title: 'Website Development',
    image: '/images/services/website.png',
    alt: 'Website development services in India for startups and businesses'
  },
  {
    id: 2,
    title: 'Web & App Development',
    image: '/images/services/android_apps.png',
    alt: 'Web and app development company for scalable digital products'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    image: '/images/services/branding.png',
    alt: 'UI UX design services for modern web and mobile apps'
  },
  {
    id: 4,
    title: 'SEO Services',
    image: '/images/services/motion.png',
    alt: 'SEO services in India for better search visibility'
  },
  {
    id: 5,
    title: 'Digital Marketing',
    image: '/images/services/social_media.png',
    alt: 'Digital marketing services for business growth'
  },
  {
    id: 6,
    title: 'IT Consulting & Support',
    image: '/images/services/website.png',
    alt: 'IT consulting and support services for growing companies'
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
            alt={service.alt}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeIndex === service.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex justify-start md:justify-center mb-16 md:mb-24">
          <h2 className="font-heading [filter:url('#liquid-flow')]  text-primary text-2xl md:text-3xl -rotate-6">IT Services</h2>
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
                

                {/* Title */}
                <h3
                  className={`font-body font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter transition-all duration-300 leading-[0.9]
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

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-end gap-4 text-gray-400 text-sm">
          <span>Need the full IT services breakdown?</span>
          <Link to="/services" className="text-primary font-semibold hover:underline">
            Explore IT services in India
          </Link>
          <span className="hidden md:inline">·</span>
          <Link to="/contact" className="text-primary font-semibold hover:underline">
            Get a free quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
