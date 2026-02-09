import React, { useState, useEffect, useRef } from 'react';
import { NavItem } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';

const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const isBlogDetail = pathname.startsWith('/blog/');
  const navBgClass = isScrolled
    ? isBlogDetail
      ? 'py-4 bg-white/90 backdrop-blur-md border-b border-black/10'
      : 'py-4 bg-black/85 backdrop-blur-md border-b border-white/10'
    : isBlogDetail
      ? 'py-6 md:py-8 bg-white/70 backdrop-blur-md'
      : 'py-6 md:py-8 bg-black/60 backdrop-blur-md';
  const navTextClass = isBlogDetail ? 'text-black' : 'text-white';
  const navMutedClass = isBlogDetail ? 'text-gray-600' : 'text-gray-400';

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    gsap.from('.nav-element', {
      y: -12,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.6,
      clearProps: 'opacity,transform'
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hamburgerTl.current) {
        hamburgerTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const top = hamburgerTopRef.current;
    const bottom = hamburgerBottomRef.current;

    if (!top || !bottom) return;

    if (!hamburgerTl.current) {
      hamburgerTl.current = gsap.timeline({ paused: true });

      hamburgerTl.current
        .to(top, {
          y: 6,
          x: -6,
          rotation: 45,
          duration: 0.3,
          ease: 'power2.inOut'
        }, 0)
        .to(bottom, {
          y: -6,
          x: 6,
          rotation: -45,
          duration: 0.3,
          ease: 'power2.inOut'
        }, 0);
    }

    if (isDrawerOpen) {
      hamburgerTl.current.play();
    } else {
      hamburgerTl.current.reverse();
    }
  }, [isDrawerOpen]);

  const handleHover = (isEnter: boolean) => {
    const top = hamburgerTopRef.current;
    const bottom = hamburgerBottomRef.current;
    if (!top || !bottom || isDrawerOpen) return;

    if (hoverTl.current) {
      hoverTl.current.kill();
    }

    hoverTl.current = gsap.timeline();
    hoverTl.current
      .to(top, { x: isEnter ? 6 : 0, duration: 0.2, ease: 'power2.out' }, 0)
      .to(bottom, { x: isEnter ? -6 : 0, duration: 0.2, ease: 'power2.out' }, 0);
  };

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    if (!drawer || !overlay) return;

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(drawer, {
        x: '0%',
        duration: 0.7,
        ease: 'power4.out'
      });

      gsap.fromTo('.drawer-link',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power3.out'
        }
      );
    } else {
      document.body.style.overflow = '';

      gsap.to(drawer, {
        x: '100%',
        duration: 0.6,
        ease: 'power3.in'
      });

      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.1
      });
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBgClass}`}>
        <div className="page-container flex justify-between items-center">
          <Link
            to="/"
            className={`nav-element flex items-center gap-3 ${navTextClass} hover:text-primary transition-colors duration-300 relative z-50`}
          >
            <img src="/logo-v2.png" alt="WebOrbit Logo" className="w-40 h-20 object-contain" />
            
          </Link>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            className="nav-element group flex flex-col justify-between items-end w-12 h-[14px] cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
            aria-controls="nav-drawer"
          >
            <span
              ref={hamburgerTopRef}
              className="w-full h-[3px] bg-primary transition-colors duration-300"
              style={{ transformOrigin: 'center' }}
            />
            <span
              ref={hamburgerBottomRef}
              className="w-full h-[3px] bg-primary transition-colors duration-300"
              style={{ transformOrigin: 'center' }}
            />
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] opacity-0 invisible cursor-pointer"
        aria-hidden="true"
      />

      <aside
        id="nav-drawer"
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[40%] bg-[#0a0a0a] z-[70] transform translate-x-full border-l border-white/10 flex flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end items-center p-6 md:p-10">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="w-12 h-12 flex items-center justify-center text-white hover:text-primary transition-colors duration-300 group"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 gap-6 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsDrawerOpen(false)}
              className="drawer-link group block w-full"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl font-body font-black uppercase tracking-tighter text-white group-hover:text-primary group-hover:translate-x-4 transition-all duration-300 ease-out">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="px-8 md:px-16 pb-10">
          <Link
            to="/contact"
            onClick={() => setIsDrawerOpen(false)}
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-primary"
          >
            Start a project
            <span className="h-px w-10 bg-primary" />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
