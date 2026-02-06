import React, { useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import StartProject from './components/StartProject';
import Footer from './components/Footer';

function App() {
  
  // Smooth Scroll Behavior Fix for Anchor Links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-primary selection:text-black">
     
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <FAQ />
        <Contact />
        <StartProject />
      </main>
      <Footer />
    </div>
  );
}

export default App;