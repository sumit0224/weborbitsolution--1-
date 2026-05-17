'use client';

import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: FC = () => {
  return (
    <section
      className="relative min-h-[88svh] bg-black text-white overflow-hidden"
      style={{ paddingTop: 'calc(var(--nav-height, 104px) + 12px)' }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-bg-image absolute inset-0" role="presentation">
          <Image
            src="/images/hero/hero-bg.webp"
            alt="WebOrbitSolution team planning website and app product strategy"
            fill
            priority
            sizes="100vw"
            quality={60}
            className="object-cover object-center"
          />
        </div>
        <div className="hero-bg-overlay absolute inset-0" />
      </div>

      <div className="page-container relative z-10 pb-12 md:pb-16">
        <div className="grid gap-12 items-center">
          <div>
            <div className="hero-sub hero-enter hero-enter-delay-1 flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary" aria-hidden="true" />
              <span className="text-primary font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
                Website, App, and SaaS Partner · PAN India
              </span>
            </div>

            <h1
              id="hero-heading"
              className="hero-enter hero-enter-delay-2 type-display font-black text-white uppercase"
            >
              <span className="hero-line-inner block overflow-hidden">Website Development</span>
              <span className="hero-line-inner block overflow-hidden">Company in India</span>
            </h1>

            <p className="hero-sub hero-enter hero-enter-delay-3 mt-6 type-body-lg text-gray-300 max-w-2xl">
              We help startups, SMEs, and enterprises launch websites, apps, and SaaS products with measurable speed.
              From Mumbai and Delhi to Bangalore, Hyderabad, Pune, and Chennai, we deliver scalable engineering that
              converts growth plans into real outcomes.
            </p>

            <div className="hero-cta hero-enter hero-enter-delay-4 mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                View Services
              </Link>
            </div>

            <div className="hero-sub hero-enter hero-enter-delay-5 mt-8 flex flex-wrap items-center gap-6 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-400">
              <span>24h response</span>
              <span className="hidden sm:inline">•</span>
              <span>Strategy + Delivery</span>
              <span className="hidden sm:inline">•</span>
              <span>Trusted by growing teams</span>
            </div>
          </div>

        </div>
      </div>

      <div
        className="hero-scroll hero-enter hero-enter-delay-6 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 pointer-events-none"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-white/20 overflow-hidden">
          <div className="w-full h-full bg-primary animate-rain" />
        </div>
      </div>

      <style>{`
        @keyframes hero-fade-up {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-enter {
          opacity: 0;
          animation: hero-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-enter-delay-1 { animation-delay: 0.08s; }
        .hero-enter-delay-2 { animation-delay: 0.18s; }
        .hero-enter-delay-3 { animation-delay: 0.3s; }
        .hero-enter-delay-4 { animation-delay: 0.38s; }
        .hero-enter-delay-5 { animation-delay: 0.46s; }
        .hero-enter-delay-6 { animation-delay: 0.52s; }

        @keyframes rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        .animate-rain {
          animation: rain 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-enter {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .animate-rain {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
