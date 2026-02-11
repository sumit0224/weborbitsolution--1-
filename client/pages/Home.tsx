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
import Seo from '../components/Seo';

const Home: React.FC = () => {
  const orgJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'WebOrbitSolution',
      url: 'https://www.weborbitsolution.in',
      logo: 'https://www.weborbitsolution.in/favicon.png',
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'WebOrbitSolution',
      url: 'https://www.weborbitsolution.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        addressCountry: 'IN',
      },
      areaServed: ['IN', 'Noida', 'Delhi NCR'],
      priceRange: '$$',
    },
  ];

  return (
    
     <>
      <Seo
        title="Web Development Company in India | WebOrbitSolution"
        description="WebOrbitSolution is a web development company in India, based in Noida, delivering website development, SEO services, digital marketing, and IT consulting for startups and growing businesses."
        path="/"
        jsonLd={orgJsonLd}
      />

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
