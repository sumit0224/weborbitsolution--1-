'use client';

import React from 'react';

const Manifesto: React.FC = () => {
  return (
    <section
      className="relative bg-black py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden border-y border-white/5"
    >
      <div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460904577954-8fadb262612c?q=80&w=2000&auto=format&fit=crop')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 container h-[320px] md:h-[360px] mx-auto text-center">
        <p className="font-heading text-primary [filter:url('#liquid-flow')]  text-2xl md:text-3xl mb-12 -rotate-3 select-none">
          Manifesto
        </p>

        <h2
          className="manifesto-text font-body font-black text-[clamp(2rem,8vw,5.25rem)] leading-tight tracking-tighter uppercase text-white"
        >
          No boring <br />stuff here.
        </h2>

        <div className="mt-12 w-24 h-px bg-white/20 mx-auto" aria-hidden="true" />
      </div>

      <style>{`
        @keyframes manifesto-fade {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .manifesto-text {
          animation: manifesto-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .manifesto-text {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Manifesto;
