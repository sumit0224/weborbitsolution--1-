import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-24 flex flex-col items-center text-center">
      <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">404</p>
      <h1 className="font-body font-black text-6xl md:text-8xl uppercase tracking-tighter mt-4">Lost In Orbit</h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-xl mt-6">
        The page you are looking for does not exist. Let’s get you back to the main station.
      </p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-3 uppercase tracking-[0.3em] text-xs hover:border-primary hover:text-primary transition-colors">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
