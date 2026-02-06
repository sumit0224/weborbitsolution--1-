import React, { useState, useEffect, useRef } from 'react';
import { NavItem } from '../types';
import { X } from 'lucide-react';
import gsap from 'gsap';

const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Refs
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial animation for Logo and Menu Trigger
    gsap.from('.nav-element', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 2.2
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hamburgerTl.current) {
        hamburgerTl.current.kill();
      }
    };
  }, []);

  // Hamburger Animation Setup
  useEffect(() => {
    const top = hamburgerTopRef.current;
    const bottom = hamburgerBottomRef.current;

    if (!top || !bottom) return;

    if (!hamburgerTl.current) {
      hamburgerTl.current = gsap.timeline({ paused: true });

      // 2-line animation to X
      // Container height approx 14px. Top line at 0, Bottom at ~12px. Center ~6-7px.
      hamburgerTl.current
        .to(top, {
          y: 6,
          rotation: 45,
          duration: 0.3,
          ease: 'power2.inOut'
        }, 0)
        .to(bottom, {
          y: -6,
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

  // Drawer Animation Logic
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

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

  // Keyboard accessibility - ESC to close drawer
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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent py-6 md:py-8'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo - Refined to match the blocky style */}
          <a
            href="#"
            className="nav-element text-3xl md:text-4xl font-body font-black text-white hover:text-primary transition-colors duration-300 relative z-50 mix-blend-difference tracking-tighter"
          >
            WebOrbit<span className="text-primary">.</span>
          </a>

          {/* Minimalist Hamburger Button (2 Lines) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="nav-element group flex flex-col justify-between items-end w-12 h-[14px] cursor-pointer mix-blend-difference focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
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

      {/* BACKDROP OVERLAY */}
      <div
        ref={overlayRef}
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] opacity-0 invisible cursor-pointer"
        aria-hidden="true"
      />

      {/* RIGHT SIDE DRAWER */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[40%] bg-[#0a0a0a] z-[70] transform translate-x-full border-l border-white/10 flex flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* DRAWER HEADER */}
        <div className="flex justify-end items-center p-6 md:p-10">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-12 h-12 flex items-center justify-center text-white hover:text-primary transition-colors duration-300 group"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 gap-6 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsDrawerOpen(false)}
              className="drawer-link group block w-full"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl font-body font-black uppercase tracking-tighter text-white group-hover:text-primary group-hover:translate-x-4 transition-all duration-300 ease-out">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Navbar;