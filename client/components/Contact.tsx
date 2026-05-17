'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock3, Mail, Phone } from 'lucide-react';
import { businessContact } from '../lib/seo';

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
      const response = await fetch('/api/inquiry', {
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
    <section id="contact" className="section-padding relative overflow-hidden border-t border-white/10 bg-black text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="page-container relative">
        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:gap-14">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Contact</p>
              <h2 className="type-h1 mt-4 font-body font-black uppercase text-white">Let&apos;s Build What&apos;s Next</h2>
              <p className="type-body-lg mt-5 max-w-xl text-gray-300">
                Tell us about your product, timeline, and growth goals. We&apos;ll reply with a practical scope, delivery
                plan, and execution path for web, app, SaaS, or SEO projects.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Response Time</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock3 size={16} className="text-primary" /> Within 24 hours
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Consulting</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <Phone size={16} className="text-primary" /> Strategy call available
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/35 bg-primary/10 p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-primary">Prefer Direct Contact</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">Talk to our team now</h3>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                For urgent requirements, call directly or send a quick email and we&apos;ll prioritize your request.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="tel:+919310513770"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
                >
                  <Phone size={14} /> Call {businessContact.telephone}
                </a>
                <a
                  href={`mailto:${businessContact.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail size={14} /> Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">
            <div className="mb-6 border-b border-white/10 pb-5">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Project Inquiry</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">Request Your Free Quote</h3>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {submitStatus !== 'idle' && (
                <div
                  role={submitStatus === 'error' ? 'alert' : 'status'}
                  aria-live={submitStatus === 'error' ? 'assertive' : 'polite'}
                  className={`rounded-xl border px-4 py-3 text-sm ${submitStatus === 'success'
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-red-500/20 border-red-500 text-red-500'
                    }`}
                >
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em]">
                    {submitStatus === 'success' ? 'Message Sent' : 'Submission Failed'}
                  </p>
                  <p>
                    {submitStatus === 'success'
                      ? 'Thanks for reaching out. We will get back to you within 24 hours.'
                      : 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm text-gray-300">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-black/80 ${errors.firstName ? 'border-red-500' : 'border-white/15'} p-3.5 text-white transition-colors placeholder-gray-500 focus:border-primary focus:outline-none`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm text-gray-300">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-black/80 ${errors.lastName ? 'border-red-500' : 'border-white/15'} p-3.5 text-white transition-colors placeholder-gray-500 focus:border-primary focus:outline-none`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-black/80 ${errors.email ? 'border-red-500' : 'border-white/15'} p-3.5 text-white transition-colors placeholder-gray-500 focus:border-primary focus:outline-none`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Share a short project brief"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full resize-none rounded-xl border bg-black/80 ${errors.message ? 'border-red-500' : 'border-white/15'} p-3.5 text-white transition-colors placeholder-gray-500 focus:border-primary focus:outline-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xs text-xs text-gray-500">
                  By submitting you agree to our{' '}
                  <Link href="/terms" className="text-white font-bold hover:text-primary transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-white font-bold hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#222] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary hover:text-black disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Get Free Quote'}
                  <ArrowUpRight size={16} />
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
