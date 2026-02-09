  import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SiteLayout: React.FC = () => {
  const { pathname } = useLocation();

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
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
