'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const servicesList = [
  {
    id: 1,
    title: 'Website Development',
    image: '/images/services/website.webp',
    alt: 'Website development services in India for startups and businesses'
  },
  {
    id: 2,
    title: 'App Development',
    image: '/images/services/app.webp',
    alt: 'App development company for scalable digital products'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    image: '/images/services/ux.webp',
    alt: 'UI UX design services for modern web and mobile apps'
  },
  {
    id: 4,
    title: 'SEO Services',
    image: '/images/services/seo.webp',
    alt: 'SEO services in India for better search visibility'
  },
  {
    id: 5,
    title: 'Digital Marketing',
    image: '/images/services/marketing.webp',
    alt: 'Digital marketing services for business growth'
  },
  {
    id: 6,
    title: 'IT Consulting & Support',
    image: '/images/services/ITsupport.webp',
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

  const activeService = servicesList.find((service) => service.id === activeIndex) || servicesList[0];

  return (
    <section ref={containerRef} id="services" className="bg-black text-white section-padding relative overflow-hidden">

      {/* Floating Image Reveal Container - Left of the centered text */}
      <div
        ref={revealRef}
        className="fixed hidden lg:block w-[200px] h-[200px] pointer-events-none z-30 rounded-lg overflow-hidden border border-white/20 shadow-2xl transition-[transform,opacity] duration-300 ease-out"
        style={{
          left: '14vw',
          top: imageY,
          opacity: activeIndex === null ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${activeIndex === null ? 0 : 1})`,
        }}
      >
        <Image
          key={activeService.id}
          src={activeService.image}
          alt={activeService.alt}
          fill
          sizes="200px"
          loading="lazy"
          quality={72}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        />
      </div>

      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex justify-start md:justify-center mb-16 md:mb-24">
          <h2 className="font-heading [filter:url('#liquid-flow')] text-primary text-2xl md:text-3xl">
            Web Development & SEO Services in India
          </h2>
        </div>

        <div className="max-w-3xl ml-auto mb-10 text-right text-gray-400 text-sm md:text-base">
          We deliver web development services in India, including custom website development, app development, UI/UX
          design, SEO services, and digital marketing. Every engagement is built for performance, ranking, and
          measurable outcomes so your website loads fast, communicates value clearly, and converts visitors into
          qualified leads.
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
          <span>Need the full services breakdown?</span>
          <Link href="/services" className="text-primary font-semibold hover:underline">
            Explore web development services in India
          </Link>
          <span className="hidden md:inline">·</span>
          <Link href="/seo-services-in-india" className="text-primary font-semibold hover:underline">
            SEO growth services
          </Link>
          <span className="hidden md:inline">·</span>
          <Link href="/react-js-development-company" className="text-primary font-semibold hover:underline">
            React JS development
          </Link>
          <span className="hidden md:inline">·</span>
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Get a free quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
