import React, { useState, FormEvent } from 'react';
import { Instagram, Twitter, Linkedin, Github, ArrowUpRight, Globe, Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNewsletterStatus('error');
      return;
    }
    if (newsletterStatus) {
      setTimeout(() => {
        setNewsletterStatus('idle')
      }, 1000)
    }

    setIsSubscribing(true);
    setNewsletterStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsletterStatus('success');
      setEmail('');
    } catch (error) {
      setNewsletterStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

  const links = [
    { label: 'Works', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: '404', href: '/404' },
  ];

  const socials = [

    { label: 'Instagram', href: 'https://www.instagram.com/weborbitsolution?igsh=M2J4eno5YzZkM2k4', icon: <Instagram size={18} /> },
    { label: 'Linkedin', href: 'https://www.linkedin.com/company/weborbit-solution', icon: <Linkedin size={18} /> },

  ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="grid lg:grid-cols-[360px_1fr]">
        {/* Left Brand Block */}
        <div className="bg-primary text-white p-10 md:p-12 flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="flex items-center gap-4">
              <img src="/logo-v2.png" alt="WebOrbit Logo" className="w-50 h-30 object-contain" />
              
            </div>
            <div className="mt-6 flex items-center gap-6">
              <Sparkles size={24} />
              <Globe size={24} />
              <Code size={24} />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Creative Design
              <br />
              Agency based in
              <br />
              Digital Space
            </p>
            <p className="text-xs uppercase tracking-widest">© {new Date().getFullYear()} WebOrbitsolution. All rights reserved.</p>
          </div>
        </div>

        {/* Right Content */}
        <div className="grid grid-rows-[auto_auto]">
          <div className="grid md:grid-cols-[1.1fr_1fr_2fr] border-b border-white/10">
            {/* Menu */}
            <div className="border-b border-white/10 md:border-b-0 md:border-r border-white/10">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center justify-between px-8 md:px-10 py-6 text-xl font-semibold uppercase tracking-wide border-b border-white/10 last:border-b-0 hover:text-primary transition-colors"
                >
                  {link.label}
                  <span className="text-gray-500">↗</span>
                </Link>
              ))}
            </div>

            {/* Social */}
            <div className="border-b border-white/10 md:border-b-0 md:border-r border-white/10 px-8 md:px-10 py-8">
              <p className="font-heading text-2xl text-primary mb-6">Follow Us</p>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-3 text-xl hover:text-primary transition-colors"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="relative px-8 md:px-10 py-8 overflow-hidden">
              <div className="footer-marquee" aria-hidden="true">
                <div className="footer-marquee-track">
                  <div className="flex items-center gap-16 px-8 md:px-10 whitespace-nowrap text-[12vw] font-black uppercase leading-none tracking-tight text-white/10">
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                  </div>
                  <div className="flex items-center gap-16 px-8 md:px-10 whitespace-nowrap text-[12vw] font-black uppercase leading-none tracking-tight text-white/10" aria-hidden="true">
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                    <span>Stay Ahead</span>
                  </div>
                </div>
              </div>
              <div className="relative top-40 z-10">
                <p className="font-heading text-2xl text-primary mb-4">Newsletter</p>
                <p className="text-gray-400 max-w-md">
                  Subscribe to our newsletter for more insights.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-lg outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing || !email.trim()}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary hover:text-black transition-colors disabled:opacity-50"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                    <ArrowUpRight size={16} />
                  </button>
                </form>
                {newsletterStatus === 'success' && (
                  <p className="text-primary text-sm mt-3">Thank you for subscribing!</p>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-red-500 text-sm mt-3">Please enter a valid email address.</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-8 md:px-10 py-10">
            <div>
              <p className="font-heading text-2xl text-primary mb-2">Reach Out</p>
              <a href="mailto:hello@weborbitsolution.in" className="text-3xl md:text-4xl font-black tracking-tight hover:text-primary transition-colors">
                hello@weborbitsolution.in
              </a>
            </div>
            <div className="flex items-center gap-10 text-xs uppercase tracking-widest text-gray-500">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/refund" className="hover:text-white">Refund Policy</Link>
              <span>Made by WebOrbit Studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
