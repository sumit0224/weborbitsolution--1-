'use client';

import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Manifesto from '../components/Manifesto';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import StartProject from '../components/StartProject';

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
