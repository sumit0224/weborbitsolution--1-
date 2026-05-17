'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { NavItem } from '../types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks: NavItem[] = [
  { label: 'Website Development', href: '/website-development-company-in-india' },
  { label: 'SaaS Development', href: '/saas-development-company-in-india' },
  { label: 'Next.js Development', href: '/nextjs-development-company-in-india' },
  { label: 'SEO for Startups', href: '/seo-services-for-startups' },
];

const growthLinks: NavItem[] = [
  { label: 'Free Website Audit', href: '/free-website-audit' },
  { label: 'Free SEO Audit', href: '/free-seo-audit' },
  { label: 'Book Consultation', href: '/book-project-consultation' },
];

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname || '/';
  const isBlogDetail = pathname?.startsWith('/blog/') ?? false;
  const useLightNav = isBlogDetail || isLightTheme;
  const navTextClass = useLightNav ? 'text-black' : 'text-white';
  const subTextClass = useLightNav ? 'text-black/60' : 'text-white/65';
  const logoSrc = useLightNav ? '/BLACK.png' : '/logo-v2.png';

  const drawerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuOpenButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const isActiveRoute = (href: string) => {
    if (href === '/') return currentPath === '/';
    if (href === '/blog') return currentPath === '/blog' || currentPath.startsWith('/blog/');
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const updateNavVars = () => {
    const nav = navRef.current;
    if (!nav) return;

    const height = Math.round(nav.getBoundingClientRect().height);
    const baseHeight = 128;
    const offset = Math.max(0, height - baseHeight);

    const root = document.documentElement;
    root.style.setProperty('--nav-height', `${height}px`);
    root.style.setProperty('--nav-offset', `${offset}px`);
  };

  useEffect(() => {
    const getTheme = () => document.documentElement.dataset.theme === 'light';
    const syncTheme = () => setIsLightTheme(getTheme());
    syncTheme();

    const handleThemeChange = () => syncTheme();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'theme') {
        syncTheme();
      }
    };

    window.addEventListener('theme-change', handleThemeChange as EventListener);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    updateNavVars();

    const nav = navRef.current;
    if (!nav) return;

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateNavVars);
      observer.observe(nav);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateNavVars);
    return () => window.removeEventListener('resize', updateNavVars);
  }, []);

  useEffect(() => {
    updateNavVars();
  }, [pathname]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>(focusSelector)).filter((el) => !el.hasAttribute('aria-hidden'));

    const initialFocus = drawerCloseButtonRef.current || getFocusableElements()[0];
    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsDrawerOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusableElements = getFocusableElements();
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    drawer.addEventListener('keydown', handleKeyDown);
    return () => drawer.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen && lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [isDrawerOpen]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-3 md:pt-4">
        <div className="page-container">
          <div className="nav-element px-4 md:px-5 py-3 md:py-4 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className={`flex items-center gap-3 ${navTextClass} hover:text-primary transition-colors duration-300`}>
                <Image src={logoSrc} alt="WebOrbit Logo" width={148} height={74} priority className="w-36 md:w-40 h-auto object-contain" />
              </Link>

              <div className="hidden xl:flex items-center justify-center flex-1 px-2">
                <ul className="flex items-center gap-1 px-2 py-1">
                  {navItems.map((item) => {
                    const active = isActiveRoute(item.href);
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={`px-3 py-2 rounded-lg text-sm uppercase tracking-[0.18em] transition-all duration-300 ${
                            active ? 'text-primary' : `${subTextClass} hover:${navTextClass}`
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Link
                  href="/book-project-consultation"
                  className={`hidden md:inline-flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-[0.22em] ${navTextClass} hover:text-primary transition-colors`}
                >
                  Start Project
                  <ArrowUpRight size={14} />
                </Link>

                <button
                  ref={menuOpenButtonRef}
                  type="button"
                  onClick={() => {
                    lastFocusedElementRef.current = menuOpenButtonRef.current || (document.activeElement as HTMLElement | null);
                    setIsDrawerOpen(true);
                  }}
                  className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border border-current/30 ${navTextClass} hover:text-primary hover:border-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70`}
                  aria-label="Open navigation menu"
                  aria-expanded={isDrawerOpen}
                  aria-controls="nav-drawer"
                >
                  <Menu size={17} />
                  <span className="text-xs uppercase tracking-[0.24em] font-semibold">Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[60] cursor-pointer transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <aside
        id="nav-drawer"
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[86%] md:w-[68%] lg:w-[52%] xl:w-[46%] bg-[#0a0a0a] z-[70] border-l border-white/10 flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        aria-labelledby="nav-drawer-title"
        inert={!isDrawerOpen}
      >
        <h2 id="nav-drawer-title" className="sr-only">
          Main navigation
        </h2>

        <div className="px-6 md:px-10 pt-6 md:pt-8 pb-5 border-b border-white/10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary">WebOrbit Navigation</p>
              <p className="text-white/70 mt-2 text-sm">Explore services, proof, and growth actions.</p>
            </div>
            <button
              ref={drawerCloseButtonRef}
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-primary hover:border-primary transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-10">
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                className="drawer-nav-link group block w-full"
              >
                <span
                  style={{ transitionDelay: isDrawerOpen ? `${80 + index * 40}ms` : '0ms' }}
                  className={`block text-3xl sm:text-4xl md:text-5xl font-body font-black uppercase tracking-tight transition-all duration-300 ease-out ${
                    isActiveRoute(item.href)
                      ? 'text-primary translate-x-2'
                      : 'text-white group-hover:text-primary group-hover:translate-x-2'
                  } ${isDrawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xs uppercase tracking-[0.25em] text-primary">Popular Services</h3>
              <div className="mt-4 space-y-3">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="block text-sm text-white/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xs uppercase tracking-[0.25em] text-primary">Growth Actions</h3>
              <div className="mt-4 space-y-3">
                {growthLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="block text-sm text-white/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="px-6 md:px-10 pb-8 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
          <Link
            href="/startup-website-consultation"
            onClick={() => setIsDrawerOpen(false)}
            className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Startup Consultation
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsDrawerOpen(false)}
            className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-white/25 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
          >
            Contact Team
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
