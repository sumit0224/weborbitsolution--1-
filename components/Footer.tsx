import React, { useState, FormEvent } from 'react';
import { Instagram, Twitter, Linkedin, Github, ArrowUpRight, Globe, Code, Sparkles } from 'lucide-react';

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

        setIsSubscribing(true);
        setNewsletterStatus('idle');

        try {
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Newsletter subscription:', email);
            setNewsletterStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setNewsletterStatus('error');
        } finally {
            setIsSubscribing(false);
        }
    };
    const links = [
        { label: 'Works', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '#' },
    ];

    const socials = [
        { label: 'X/Twitter', href: '#', icon: <Twitter size={18} /> },
        { label: 'Instagram', href: '#', icon: <Instagram size={18} /> },
        { label: 'Linkedin', href: '#', icon: <Linkedin size={18} /> },
        { label: 'Github', href: '#', icon: <Github size={18} /> },
    ];

    return (
        <footer className="flex flex-col lg:flex-row w-full bg-black border-t border-white/5 relative z-10">
            {/* Left Sidebar - Primary Color */}
            <div className="w-full lg:w-[28%] bg-primary text-black p-8 md:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-0 relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="font-heading text-5xl md:text-6xl mb-2 leading-none">Web<br />Orbit</h3>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs font-bold tracking-widest uppercase border border-black px-2 py-1 rounded-full group-hover:bg-black group-hover:text-primary transition-colors duration-300">Est. 2024</span>
                    </div>
                </div>

                <div className="flex justify-between items-center py-12 lg:py-24 relative z-10 px-4">
                    <Sparkles className="animate-pulse opacity-80 group-hover:scale-125 transition-transform duration-500" size={48} strokeWidth={1} />
                    <Globe className="animate-[spin_10s_linear_infinite] opacity-80 group-hover:scale-125 transition-transform duration-500" size={48} strokeWidth={1} />
                    <Code className="opacity-80 group-hover:scale-125 transition-transform duration-500" size={48} strokeWidth={1} />
                </div>

                <div className="space-y-4 relative z-10">
                    <h4 className="text-2xl md:text-3xl font-bold leading-tight max-w-xs">
                        Creative Web Agency based in Digital Space.
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                        © {new Date().getFullYear()} WebOrbit All Rights reserved
                    </p>
                </div>

                {/* Decorative Circle in sidebar */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none group-hover:bg-black/10 group-hover:scale-150 transition-all duration-700"></div>
            </div>

            {/* Right Content */}
            <div className="flex-1 p-8 md:p-16 lg:p-24 bg-black text-white flex flex-col justify-between">

                {/* Newsletter Section */}
                <div className="mb-20">
                    <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-6">Stay in the orbit</h4>
                    <form onSubmit={handleNewsletterSubmit}>
                        <div className="flex flex-col md:flex-row gap-4 max-w-2xl border-b border-white/20 pb-4 focus-within:border-primary transition-colors duration-300 group/input">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubscribing}
                                className="w-full bg-transparent text-xl md:text-2xl outline-none placeholder:text-gray-600 group-hover/input:placeholder:text-gray-500 transition-colors disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing || !email.trim()}
                                className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-primary transition-colors duration-300 group/btn whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'} <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </button>
                        </div>
                        {newsletterStatus === 'success' && (
                            <p className="text-primary text-sm mt-2">Thank you for subscribing!</p>
                        )}
                        {newsletterStatus === 'error' && (
                            <p className="text-red-500 text-sm mt-2">Please enter a valid email address.</p>
                        )}
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Menu</h4>
                        <ul className="space-y-4">
                            {links.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-xl font-medium hover:text-primary hover:pl-2 transition-all duration-300 inline-block">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Socials</h4>
                        <ul className="space-y-4">
                            {socials.map((social) => (
                                <li key={social.label}>
                                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-lg hover:text-primary transition-colors duration-300">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black group-hover:rotate-12 transition-all duration-300">
                                            {social.icon}
                                        </span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{social.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Locate Us</h4>
                        <address className="not-italic text-lg space-y-2 text-gray-300">
                            <p>123 Innovation Blvd,</p>
                            <p>Tech District, TD 94043</p>
                            <p className="pt-4 hover:text-primary transition-colors cursor-pointer">hello@weborbit.com</p>
                            <p className="hover:text-primary transition-colors cursor-pointer">+1 (555) 000-0000</p>
                        </address>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-20 flex flex-wrap gap-8 text-xs text-gray-600 uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookies Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;