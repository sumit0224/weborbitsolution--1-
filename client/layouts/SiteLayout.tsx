import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SiteLayout: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-primary selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
