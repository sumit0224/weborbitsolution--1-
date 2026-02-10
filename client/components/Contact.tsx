import React, { useState, FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry.');
      }

      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="section-padding bg-black text-white relative overflow-hidden">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Text & CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-4xl text-primary mb-4 rotate-[-2deg]">Contact Us</h3>
              <h2 className="font-body font-black text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter uppercase mb-8">
                Get a Free Quote
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-md leading-relaxed">
                Tell us about your goals for website development, web & app development, UI/UX design, SEO services,
                digital marketing, or IT consulting. We respond within 24 hours with a clear plan and next steps.
              </p>
            </div>

            {/* Prefer a Call Box */}
            <div className="mt-16 lg:mt-0 p-8 border border-white/10 bg-white/5 rounded-sm relative group cursor-pointer hover:border-primary/50 transition-colors">
              <h4 className="font-heading text-3xl text-primary mb-2">Prefer a Call?</h4>
              <p className="text-gray-400 text-sm mb-0">Book a quick IT consultation call with our team.</p>

              <a href="tel:9310513770" className="absolute bottom-8 right-8 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                Book a Call <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#111] p-8 md:p-12 rounded-sm border border-white/5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {submitStatus !== 'idle' && (
                <div
                  role={submitStatus === 'error' ? 'alert' : 'status'}
                  aria-live={submitStatus === 'error' ? 'assertive' : 'polite'}
                  className={`rounded border px-4 py-3 text-sm ${submitStatus === 'success'
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-red-500/20 border-red-500 text-red-500'
                    }`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">
                    {submitStatus === 'success' ? 'Message Sent' : 'Submission Failed'}
                  </p>
                  <p>
                    {submitStatus === 'success'
                      ? 'Thanks for reaching out. We will get back to you within 24 hours.'
                      : 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm text-gray-400">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-black border ${errors.firstName ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-700`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm text-gray-400">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-black border ${errors.lastName ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-700`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-700`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-white/10'} p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-700 resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-gray-500 max-w-xs">
                  By submitting you agree to our <span className="text-white font-bold">Terms of Service</span> and{' '}
                  <span className="text-white font-bold">Privacy Policy</span>.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-[#222] text-white font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 cursor-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Get Free Quote'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
