'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SiteLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isBlogDetailPage = pathname?.startsWith('/blog/');
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      return;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0 });

    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior || 'smooth';
    });
  }, [pathname]);

  return (
    <div className="layout-root bg-black text-white font-body selection:bg-primary selection:text-black">
      <Navbar />
      <main className="layout-main" style={{ paddingTop: 'var(--nav-offset, 0px)' }}>
        {children}
      </main>
      <Footer showSocialLinks={!isBlogDetailPage} />
    </div>
  );
};

export default SiteLayout;
