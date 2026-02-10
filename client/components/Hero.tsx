import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  const animationConfig = useMemo(() => ({
    lineReveal: {
      yPercent: 100,
      duration: 1.1,
      stagger: 0.15,
      ease: 'power4.out',
    },
    fadeUp: {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: 'power2.out',
    },
    fadeDown: {
      opacity: 0,
      y: -20,
      duration: 0.9,
      ease: 'power2.out',
    },
    blobRotation: {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    },
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-line-inner', animationConfig.lineReveal)
        .from('.hero-sub', animationConfig.fadeUp, '-=0.5')
        .from('.hero-cta', animationConfig.fadeUp, '-=0.7')
        .from('.hero-visual', animationConfig.fadeUp, '-=0.6')
        .from('.hero-scroll', animationConfig.fadeDown, '-=0.8');

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        gsap.to('.bg-gradient-blob', animationConfig.blobRotation);
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
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{ paddingTop: 'calc(var(--nav-height, 112px) + 16px)' }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(32,178,170,0.25),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_60%)]"
          role="presentation"
        />
        <div
          className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
          role="presentation"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
          role="presentation"
        />
      </div>

      <div className="page-container relative z-10 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="hero-sub flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary" aria-hidden="true" />
              <span className="text-primary font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
                IT Services in India · Global Delivery
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-[10vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6vw] leading-[0.9] font-black text-white tracking-tighter uppercase"
            >
              <span className="hero-line-inner block overflow-hidden">Build Faster.</span>
              <span className="hero-line-inner block overflow-hidden">Scale Smarter.</span>
            </h1>

            <p className="hero-sub mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              WebOrbitSolution delivers website development, web & app development, UI/UX design, SEO services, digital
              marketing, and IT consulting for startups, small businesses, and growing companies. Get a clear plan, fast
              delivery, and measurable results.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                View Services
              </Link>
            </div>

            <div className="hero-sub mt-8 flex flex-wrap items-center gap-6 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-400">
              <span>24h response</span>
              <span className="hidden sm:inline">•</span>
              <span>Strategy + Delivery</span>
              <span className="hidden sm:inline">•</span>
              <span>Trusted by growing teams</span>
            </div>
          </div>

          <div className="hero-visual relative">
            <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full" aria-hidden="true" />
            <div className="relative border border-white/10 bg-black/60 backdrop-blur-md p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
                <span>Project Snapshot</span>
                <span className="text-primary">Premium</span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Web Development', value: 'High-performance websites' },
                  { label: 'UI/UX Design', value: 'Conversion-first experiences' },
                  { label: 'SEO Services', value: 'Growth-ready visibility' },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 p-4 bg-white/5">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.label}</p>
                    <p className="text-white font-semibold mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                <span>India-based team</span>
                <span>Global delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 pointer-events-none"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-white/20 overflow-hidden">
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
