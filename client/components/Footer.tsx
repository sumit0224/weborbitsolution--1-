'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Mail, MoonStar, SunMedium } from 'lucide-react';
import OutboundLink from './OutboundLink';
import { socialProfiles } from '../lib/external-links';
import { businessContact } from '../lib/seo';

type FooterProps = {
  showSocialLinks?: boolean;
};

const serviceLinks = [
  { label: 'SEO Services', href: '/seo-services-in-india' },
  { label: 'Web Development', href: '/website-development-company-in-india' },
  { label: 'SaaS Development', href: '/website-app-saas-development-company-india' },
  { label: 'Mobile App Development', href: '/mobile-app-development-company' },
];

const productLinks = [
  { label: 'Website Speed Checker', href: '/tools/website-speed-checker' },
  { label: 'Free Website Audit', href: '/free-website-audit' },
  { label: 'Free SEO Audit', href: '/free-seo-audit' },
  { label: 'Pricing', href: '/pricing' },
];

const resourceLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Portfolio', href: '/work' },
  { label: 'About WebOrbitSolution', href: '/about' },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund', href: '/refund' },
  { label: 'Cookies', href: '/cookies' },
];

const trustBadges = ['Trusted by startup teams', 'Performance-first delivery', 'SEO + Engineering experts'];

const Footer: React.FC<FooterProps> = ({ showSocialLinks = true }) => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(current);
  }, []);

  useEffect(() => {
    if (newsletterStatus === 'idle') return;
    const timer = window.setTimeout(() => setNewsletterStatus('idle'), 2600);
    return () => window.clearTimeout(timer);
  }, [newsletterStatus]);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    return () => window.removeEventListener('theme-change', handleThemeChange as EventListener);
  }, []);

  const applyTheme = (next: 'light' | 'dark') => {
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: next }));
  };

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const handleNewsletterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setNewsletterStatus('error');
      return;
    }

    setIsSubscribing(true);
    setNewsletterStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setNewsletterStatus('success');
      setEmail('');
    } catch {
      setNewsletterStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_65%_at_10%_0%,rgba(32,178,170,0.2),transparent_65%),radial-gradient(55%_55%_at_100%_100%,rgba(255,255,255,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-5">
          <section className="xl:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Go to WebOrbitSolution homepage">
              <Image src="/logo-v2.png" alt="WebOrbitSolution logo" width={170} height={96} className="h-12 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-300">
              Premium growth partner for high-performance websites, SEO architecture, and conversion-focused product
              engineering.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gray-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>

          <nav aria-label="Footer Services" className="xl:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#20B2AA]">Services</h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer Products" className="xl:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#20B2AA]">Products</h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer Resources" className="xl:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#20B2AA]">Resources</h2>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="xl:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#20B2AA]">Contact & Updates</h2>
            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${businessContact.email}`}
                className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
              >
                <Mail size={16} />
                {businessContact.email}
              </a>
              <p className="text-sm text-gray-400">
                {businessContact.addressLocality}, India | Serving startups, SaaS teams, and growth-focused businesses.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#20B2AA] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#84f0ea]"
              >
                Book Consultation
                <ArrowRight size={14} />
              </Link>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3" aria-label="Newsletter sign up">
              <label htmlFor="footer-newsletter-email" className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Newsletter
              </label>
              <div className="flex flex-col gap-2 sm:flex-row xl:flex-col 2xl:flex-row">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  placeholder="Your work email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  disabled={isSubscribing}
                  className="w-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#20B2AA]"
                />
                <button
                  type="submit"
                  disabled={isSubscribing || !email.trim()}
                  className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#20B2AA]/45 hover:bg-[#20B2AA]/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubscribing ? 'Sending' : 'Subscribe'}
                  <ArrowUpRight size={13} />
                </button>
              </div>
              <div className="min-h-[18px]" aria-live="polite">
                {newsletterStatus === 'success' && <p className="text-xs text-[#20B2AA]">Thanks. You are subscribed.</p>}
                {newsletterStatus === 'error' && <p className="text-xs text-red-400">Please enter a valid email.</p>}
              </div>
            </form>

            {showSocialLinks ? (
              <div className="mt-5 flex items-center gap-2">
                <OutboundLink
                  href={socialProfiles.instagram}
                  aria-label="Visit WebOrbitSolution Instagram profile"
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5 text-gray-300 transition-all hover:-translate-y-0.5 hover:border-[#20B2AA]/50 hover:text-white"
                >
                  <Instagram size={16} />
                </OutboundLink>
                <OutboundLink
                  href={socialProfiles.linkedin}
                  aria-label="Visit WebOrbitSolution LinkedIn page"
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5 text-gray-300 transition-all hover:-translate-y-0.5 hover:border-[#20B2AA]/50 hover:text-white"
                >
                  <Linkedin size={16} />
                </OutboundLink>
              </div>
            ) : null}
          </section>
        </div>

        <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-gray-500">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-[#20B2AA]/45 hover:text-white"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunMedium size={14} /> : <MoonStar size={14} />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-600">
              © {new Date().getFullYear()} WebOrbitSolution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
