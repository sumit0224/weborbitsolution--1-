import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  // Memoize static animation configuration
  const animationConfig = useMemo(() => ({
    lineReveal: {
      yPercent: 100,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    },
    fadeUp: {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out"
    },
    fadeDown: {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power2.out"
    },
    blobRotation: {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    }
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Optimized animation sequence
      tl.from(".hero-line-inner", animationConfig.lineReveal)
        .from(".hero-sub", animationConfig.fadeUp, "-=0.5")
        .from(".hero-scroll", animationConfig.fadeDown, "-=0.8");

      // Background animation with reduced motion check
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        gsap.to(".bg-gradient-blob", animationConfig.blobRotation);
      }
    }, containerRef.current || undefined); // Fix: Pass .current or undefined, not the ref object

    animationRef.current = ctx;

    return () => {
      ctx.revert();
      animationRef.current = null;
    };
  }, [animationConfig]);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center bg-dark overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Animated Gradient Blob */}
        <div 
          className="bg-gradient-blob absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] opacity-60"
          role="presentation"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
          role="presentation"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOP LABEL */}
        <div className="hero-sub flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary" aria-hidden="true" />
          <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase">
            Est. 2024
          </span>
        </div>

        {/* MAIN TYPOGRAPHY */}
        <div className="flex flex-col">
          <div className="overflow-hidden">
            <h1 
              id="hero-heading"
              className="hero-line-inner text-[12vw] leading-[0.85] font-bold text-white tracking-tighter uppercase mix-blend-exclusion"
            >
              Digital
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              className="hero-line-inner text-[12vw] leading-[0.85] font-bold text-white tracking-tighter uppercase mix-blend-exclusion pl-[10vw]"
              aria-label="Excellence"
            >
              Excellence
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              className="hero-line-inner text-[12vw] leading-[0.85] font-rock stroke-text tracking-tighter uppercase text-transparent"
              aria-label="Redefined"
            >
              Redefined
            </h1>
          </div>
        </div>

        {/* DESCRIPTION & CTA */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="hero-sub max-w-xl">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              We fuse{' '}
              <span className="text-white font-medium">strategy</span>,{' '}
              <span className="text-white font-medium">design</span>, and{' '}
              <span className="text-white font-medium">technology</span>{' '}
              to build brands that defy gravity.
            </p>
          </div>
          
          <div className="hero-sub">
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 cursor-pointer"
              aria-label="Navigate to contact section"
            >
              <span className="text-sm font-bold tracking-widest uppercase border-b border-transparent group-hover:border-primary pb-1 transition-all duration-300">
                Start The Journey
              </span>
              <div 
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300"
                aria-hidden="true"
              >
                <ArrowDown 
                  size={20} 
                  className="-rotate-90 group-hover:rotate-0 transition-transform duration-300" 
                />
              </div>
            </a>
          </div>
        </div>
      </div>

    

      <style>{`
        @keyframes rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        
        .animate-rain {
          animation: rain 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-rain {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;