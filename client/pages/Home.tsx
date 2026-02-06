import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Manifesto from '../components/Manifesto';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import StartProject from '../components/StartProject';
import Seo from '../components/Seo';

const Home: React.FC = () => {
  return (
    <>
      <Seo
        title="WebOrbitSolution | Web Design & Development Agency in India"
        description="WebOrbitSolution is a premium web design, development, branding, and SEO agency in India. We craft high-performance websites and digital experiences that convert."
        path="/"
      />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Manifesto />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <StartProject />
    </>
  );
};

export default Home;
