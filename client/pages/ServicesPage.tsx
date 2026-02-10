import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const ServicesPage: React.FC = () => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.scroll-reveal'));
    if (!elements.length) return;
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: 'Website Development',
      description:
        'High-converting business websites that load fast, look premium, and build trust from the first click.',
      problems: [
        'Outdated websites that don’t convert',
        'Slow load times and poor SEO',
        'Low credibility for growing businesses',
      ],
      benefits: [
        'Responsive, mobile-first layouts',
        'SEO-ready structure and metadata',
        'Performance optimization for speed',
        'Easy updates with CMS-ready builds',
      ],
      idealFor: 'Startups and service businesses launching or upgrading their online presence.',
    },
    {
      title: 'Web & App Development',
      description:
        'Custom web and mobile applications built for performance, scalability, and real business outcomes.',
      problems: [
        'Manual workflows and inefficiencies',
        'Off-the-shelf tools that don’t fit',
        'Legacy systems that block growth',
      ],
      benefits: [
        'Custom features tailored to your workflow',
        'Secure authentication and user roles',
        'API integrations and automation',
        'Scalable architecture for future growth',
      ],
      idealFor: 'Growing companies and product teams building internal tools or customer platforms.',
    },
    {
      title: 'UI/UX Design',
      description:
        'User-first design that makes your product intuitive, engaging, and easy to use across devices.',
      problems: [
        'User drop-offs and low engagement',
        'Confusing navigation and flows',
        'Inconsistent brand experience',
      ],
      benefits: [
        'Clear user journeys and wireframes',
        'Modern, conversion-focused UI design',
        'Design systems for consistency',
        'Prototypes for fast validation',
      ],
      idealFor: 'SaaS products, apps, and businesses improving digital experience.',
    },
    {
      title: 'Digital Marketing & SEO',
      description:
        'Growth-focused marketing that improves visibility, traffic, and qualified leads.',
      problems: [
        'Low organic search visibility',
        'Inconsistent lead flow',
        'Weak content and keyword targeting',
      ],
      benefits: [
        'Technical and on-page SEO',
        'Keyword and content strategy',
        'Local and global search visibility',
        'Performance tracking and reporting',
      ],
      idealFor: 'Businesses that want consistent inbound leads and long-term growth.',
    },
    {
      title: 'IT Consulting & Support',
      description:
        'Expert guidance and ongoing support to keep your systems secure, reliable, and scalable.',
      problems: [
        'Unclear tech decisions',
        'Downtime and reliability issues',
        'No in-house IT support',
      ],
      benefits: [
        'Technology roadmaps and audits',
        'Infrastructure and security reviews',
        'Ongoing maintenance and monitoring',
        'Fast issue resolution',
      ],
      idealFor: 'Teams that need dependable IT support without hiring full-time staff.',
    },
  ];

  const process = [
    { step: 'Requirement Gathering', detail: 'We learn your goals, challenges, and success metrics.' },
    { step: 'Planning & Design', detail: 'We map the solution and craft a clear design direction.' },
    { step: 'Development', detail: 'We build with clean code, performance, and scalability in mind.' },
    { step: 'Testing & Delivery', detail: 'We test thoroughly and launch with confidence.' },
    { step: 'Support & Maintenance', detail: 'We monitor, optimize, and support post-launch.' },
  ];

  const reasons = [
    {
      title: 'Experience & Expertise',
      desc: 'Proven delivery across websites, apps, and IT services for growing teams.',
    },
    {
      title: 'Transparent Pricing',
      desc: 'Clear proposals and quotes with no hidden costs.',
    },
    {
      title: 'On-Time Delivery',
      desc: 'Structured timelines and reliable execution you can plan around.',
    },
    {
      title: 'Dedicated Support',
      desc: 'Fast response and ongoing maintenance options when you need them.',
    },
  ];

  const techItems = [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
    { name: 'Vue.js', logo: 'https://cdn.simpleicons.org/vuedotjs/41B883' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter/02569B' },
    { name: 'React Native', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
   
    { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
    { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'GA4', logo: 'https://cdn.simpleicons.org/googleanalytics/F9AB00' },
    { name: 'Search Console', logo: 'https://cdn.simpleicons.org/googlesearchconsole/1A73E8' },
  ];

  const faqs = [
    {
      q: 'How much does a website or app cost?',
      a: 'Costs depend on scope, features, and timelines. We provide a clear quote after a brief discovery call.',
    },
    {
      q: 'How long will the project take?',
      a: 'Most projects range from 2–8 weeks depending on complexity and feedback cycles.',
    },
    {
      q: 'Do you offer ongoing support after launch?',
      a: 'Yes. We offer maintenance, updates, and dedicated support plans.',
    },
    {
      q: 'Can you redesign our existing website?',
      a: 'Absolutely. We improve design, performance, SEO, and conversion rates.',
    },
    {
      q: 'Will my website be SEO-friendly?',
      a: 'Yes. We build with SEO best practices from day one.',
    },
    {
      q: 'Do you work with global clients?',
      a: 'Yes. We serve clients in India and worldwide with flexible communication.',
    },
    {
      q: 'What do you need from us to get started?',
      a: 'A brief of your goals, examples you like, and access to any existing assets.',
    },
  ];

  return (
    <section className="bg-black text-white pt-32 pb-20">
      <Seo
        title="IT Services & Digital Solutions | WebOrbitSolution"
        description="WebOrbitSolution delivers website development, app development, UI/UX design, digital marketing, SEO, and IT consulting for startups and growing businesses in India and worldwide."
        path="/services"
      />
      <div className="px-6 md:px-12 mb-16 scroll-reveal">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Services</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          IT Services & Digital Solutions
          <br />
          That Help You Grow
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mt-6">
          WebOrbitSolution helps startups, small businesses, and growing companies build high-performing websites, apps,
          and digital systems. Based in India, serving clients worldwide.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 uppercase tracking-[0.3em] text-xs hover:border-primary hover:text-primary transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-14 scroll-reveal">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Overview</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4">Our Services Overview</h2>
          <p className="text-gray-400 mt-4">
            Clear, reliable delivery across web, app, design, marketing, and IT support — everything you need to launch
            and scale with confidence.
          </p>
        </div>
      </div>

      {services.map((service) => (
        <div key={service.title} className="border-t border-white/10 px-6 md:px-12 py-12 scroll-reveal">
          <div className="grid lg:grid-cols-[320px_1fr] gap-10">
            <div>
              <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Service</p>
              <h3 className="text-2xl md:text-3xl font-semibold mt-4">{service.title}</h3>
            </div>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg text-gray-200">{service.description}</p>
              <div>
                <p className="text-white font-semibold mb-2">Problems it solves</p>
                <ul className="list-disc list-inside space-y-2">
                  {service.problems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Key features & benefits</p>
                <ul className="list-disc list-inside space-y-2">
                  {service.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Ideal for</p>
                <p>{service.idealFor}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="border-t border-white/10 px-6 md:px-12 py-14 scroll-reveal">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Process</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Our Process</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {process.map((item, index) => (
            <div key={item.step} className="border border-white/10 p-6 bg-white/5 scroll-reveal">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Step {index + 1}</p>
              <h3 className="text-xl font-bold mt-3">{item.step}</h3>
              <p className="text-gray-400 mt-3">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-14 scroll-reveal">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Why Us</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Why Choose WebOrbitSolution</h2>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {reasons.map((item) => (
            <div key={item.title} className="border border-white/10 p-6 bg-white/5 scroll-reveal">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-400 mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-14 scroll-reveal">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Stack</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Tools & Technologies</h2>
        <p className="text-gray-400 mt-4 max-w-3xl">
          We use modern, scalable tools and frameworks to build reliable solutions that are secure, fast, and ready for
          growth.
        </p>
        <div className="mt-8 tech-band">
          <div className="tech-mask">
            <div className="marquee marquee-slow py-6">
              <div className="flex items-center gap-6 px-8 md:px-12 whitespace-nowrap">
                {techItems.map((item) => {
                  return (
                    <div key={item.name} className="tech-chip">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className="tech-logo"
                      />
                      <span className="text-xs  px-4 uppercase tracking-[0.3em] text-gray-200">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-6 px-4 md:px-12 whitespace-nowrap" aria-hidden="true">
                {techItems.map((item, index) => {
                  return (
                    <div key={`${item.name}-${index}`} className="tech-chip">
                      <img
                        src={item.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="tech-logo"
                      />
                      <span className="text-xs px-8 uppercase tracking-[0.3em] text-gray-200">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tech-mask mt-4">
            <div className="marquee marquee-fast marquee-reverse py-6">
              <div className="flex items-center gap-6 px-6 md:px-12 whitespace-nowrap">
                {techItems.map((item) => {
                  return (
                    <div key={`${item.name}-alt`} className="tech-chip tech-chip-alt">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className="tech-logo"
                      />
                      <span className="text-xs px-4 uppercase tracking-[0.3em] text-gray-200">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-6 px-6 md:px-12 whitespace-nowrap" aria-hidden="true">
                {techItems.map((item, index) => {
                  return (
                    <div key={`${item.name}-alt-${index}`} className="tech-chip tech-chip-alt">
                      <img
                        src={item.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="tech-logo"
                      />
                      <span className="text-xs px-4 uppercase tracking-[0.3em] text-gray-200">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-12 pb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Secure, scalable, and performance-first</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-14 scroll-reveal">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">FAQs</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-4">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((item) => (
            <div key={item.q} className="border border-white/10 p-6 bg-white/5 scroll-reveal">
              <h3 className="text-lg font-semibold text-white">{item.q}</h3>
              <p className="text-gray-400 mt-3">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-16 scroll-reveal">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Let’s Talk</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4">
            Ready to Build Something That Grows Your Business?
          </h2>
          <p className="text-gray-400 mt-4">
            Tell us your goals and we’ll respond with a clear plan, timeline, and quote.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 uppercase tracking-[0.3em] text-xs hover:border-primary hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
