import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Register scroll trigger if not already (safeguard)
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax effect for image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        ease: 'none',
      });

      // Text Reveal
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef.current || undefined); // Fix: Pass .current

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-white text-black overflow-hidden">
      <div className="page-container flex flex-col md:flex-row items-center gap-16">

        <div className="w-full md:w-1/2 relative h-[600px] overflow-hidden rounded-lg">
          <img
            ref={imageRef}
            src="/images/about/studio.jpg"
            alt="WebOrbitSolution IT services team in Noida, India"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-[120%] object-cover grayscale hover:grayscale-0 transition-all duration-700 will-change-transform"
          />
        </div>

        <div ref={textRef} className="w-full md:w-1/2">
          <h2 className="font-heading text-5xl md:text-7xl mb-8">We Build <span className="text-primary">Digital</span></h2>
          <p className="font-body text-lg leading-relaxed text-gray-800 mb-6">
            WebOrbitSolution is an IT services and digital solutions agency in India helping startups and growing
            companies with website development, web & app development, UI/UX design, SEO services, digital marketing,
            and IT consulting.
          </p>
          <p className="font-body text-lg leading-relaxed text-gray-800 mb-8">
            Our team blends strategy, design, and engineering to deliver fast, secure, and SEO-friendly websites plus
            scalable web applications that drive measurable business results.
          </p>
          <p className="font-body text-lg leading-relaxed text-gray-800 mb-10">
            Explore our{' '}
            <Link to="/services" className="text-primary font-semibold hover:underline">IT services in India</Link>, review{' '}
            <Link to="/pricing" className="text-primary font-semibold hover:underline">website development pricing</Link>, or browse the{' '}
            <Link to="/work" className="text-primary font-semibold hover:underline">portfolio of digital work</Link> we have shipped.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <span className="block text-4xl font-bold text-primary mb-2 ziggle-effect">50+</span>
              <span className="text-sm uppercase tracking-widest font-bold">Projects Delivered</span>
            </div>
            <div>
              <span className="block text-4xl font-bold text-primary mb-2 ziggle-effect">12</span>
              <span className="text-sm uppercase tracking-widest font-bold">Awards Won</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
