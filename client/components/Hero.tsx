import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

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

      tl.from(".hero-line-inner", animationConfig.lineReveal)
        .from(".hero-sub", animationConfig.fadeUp, "-=0.5")
        .from(".hero-scroll", animationConfig.fadeDown, "-=0.8");

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        gsap.to(".bg-gradient-blob", animationConfig.blobRotation);
      }
    }, containerRef.current || undefined);

    animationRef.current = ctx;

    return () => {
      ctx.revert();
      animationRef.current = null;
    };
  }, [animationConfig]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center bg-dark overflow-hidden pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div 
          className="bg-gradient-blob absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] opacity-60"
          role="presentation"
        />
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
          role="presentation"
        />
      </div>

      <div className="page-container relative z-10">
        <div className="hero-sub flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary" aria-hidden="true" />
          <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase">
            Est. 2026
          </span>
        </div>

        <div className="flex flex-col">
          <h1
            id="hero-heading"
            className="text-[12vw] leading-[0.85] font-bold text-white tracking-tighter uppercase mix-blend-exclusion"
          >
            <span className="hero-line-inner block overflow-hidden">Digital</span>
            <span className="hero-line-inner block overflow-hidden pl-[10vw]">Excellence</span>
          </h1>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="hero-sub max-w-xl">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              We fuse{' '}
              <span className="text-white font-medium">strategy</span>,{' '}
              <span className="text-white font-medium">design</span>, and{' '}
              <span className="text-white font-medium">technology</span>{' '}
              to build brands that defy gravity. WebOrbitSolution is a web design and development agency in India focused on branding, UI/UX, and SEO-ready websites.
            </p>
          </div>

          <div className="hero-sub">
            <Link
              to="/contact"
              className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 cursor-pointer"
              aria-label="Navigate to contact page"
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
            </Link>
          </div>
        </div>
      </div>

      <div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-[0.3em] uppercase text-gray-400 pointer-events-none"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="w-px h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-full bg-primary animate-rain" />
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
