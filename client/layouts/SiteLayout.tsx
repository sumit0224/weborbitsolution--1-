'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SiteLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0 });

    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior || 'smooth';
    });
  }, [pathname]);

  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-primary selection:text-black overflow-x-hidden">
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-offset, 0px)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
