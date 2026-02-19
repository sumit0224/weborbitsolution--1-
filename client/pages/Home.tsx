'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Manifesto from '../components/Manifesto';
import Pricing from '../components/Pricing';

const Portfolio = dynamic(() => import('../components/Portfolio'), { ssr: false, loading: () => null });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false, loading: () => null });
const BlogSection = dynamic(() => import('../components/BlogSection'), { ssr: false, loading: () => null });
const About = dynamic(() => import('../components/About'), { ssr: false, loading: () => null });
const FAQ = dynamic(() => import('../components/FAQ'), { ssr: false, loading: () => null });
const StartProject = dynamic(() => import('../components/StartProject'), { ssr: false, loading: () => null });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false, loading: () => null });

const Home: React.FC = () => {
  return (
    
     <>
  {/* Above the fold */}
  <Hero />
  <Manifesto />

  {/* Core offering */}
  <Services />
  <Pricing />

  {/* Trust & proof */}
  <Portfolio />
  <Testimonials />

  {/* Content */}
  <BlogSection />

  {/* Brand & clarity */}
  <About />
  <FAQ />

  {/* Conversion */}
  <StartProject />
  <Contact />
</>

  );
};

export default Home;
