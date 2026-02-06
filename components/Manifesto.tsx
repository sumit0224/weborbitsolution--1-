import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      // Split text into words for animation
      const text = textRef.current.innerText;
      const words = text.trim().split(/\s+/);
      textRef.current.innerHTML = words
        .map((word, index) => `${index > 0 ? ' ' : ''}<span class=\"inline-block opacity-10 transition-colors duration-300\">${word}</span>`)
        .join('');

      const spans = textRef.current.querySelectorAll('span');

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      gsap.to(spans, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: true,
        },
        opacity: 1,
        color: '#20B2AA',
        stagger: 0.1,
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden border-y border-white/5"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center grayscale will-change-transform"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460904577954-8fadb262612c?q=80&w=2000&auto=format&fit=crop')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 container h-[400px] mx-auto text-center">
        <h3 className="font-heading text-primary [filter:url('#liquid-flow')]  text-2xl md:text-3xl mb-12 -rotate-3 select-none">
          Manifesto
        </h3>

        <h2
          ref={textRef}
          className="font-body font-black text-5xl md:text-8xl lg:text-9xl leading-tight tracking-tighter uppercase text-white"
        >
          No boring <br />stuff here.
        </h2>

        <div className="mt-16 w-24 h-px bg-white/20 mx-auto" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Manifesto;
