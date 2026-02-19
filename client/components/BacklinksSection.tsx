'use client';

import Link from 'next/link';

const backlinks = [
  { label: 'Website, App & SaaS Development Company in India', href: '/website-app-saas-development-company-india' },
  { label: 'Website Development Company in Mumbai', href: '/website-development-company-mumbai' },
  { label: 'App Development Company in Bangalore', href: '/app-development-company-bangalore' },
  { label: 'SaaS Development Company in Hyderabad', href: '/saas-development-company-hyderabad' },
  { label: 'Mobile App Development Company in India', href: '/mobile-app-development-company' },
  { label: 'Custom Software Development Company in India', href: '/custom-software-development-india' },
  { label: 'SEO Services in India', href: '/seo-services-in-india' },
  { label: 'Website Development Cost in India (2026)', href: '/blog/website-development-cost-in-india-2026' },
];

const BacklinksSection = () => {
  return (
    <section className="bg-black border-t border-white/10 text-white">
      <div className="page-container py-8 md:py-10">
        <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">Backlinks</h2>
        <p className="text-gray-400 text-sm mt-3 max-w-4xl">
          Explore our key service and city pages built for PAN India visibility and qualified lead generation.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {backlinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 hover:text-primary hover:border-primary/60 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BacklinksSection;
