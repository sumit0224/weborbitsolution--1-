'use client';

import { useState } from 'react';

type LeadCaptureFormProps = {
  analyzedUrl: string;
  performanceScore: number | null;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
};

const splitName = (fullName: string) => {
  const normalized = fullName.trim().replace(/\s+/g, ' ');
  const [firstName, ...rest] = normalized.split(' ');
  return {
    firstName: firstName || 'Website',
    lastName: rest.join(' ') || 'Lead',
  };
};

export default function LeadCaptureForm({ analyzedUrl, performanceScore }: LeadCaptureFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    const { firstName, lastName } = splitName(name);

    const inquiryMessage = [
      'Lead Source: Website Speed Checker',
      `Analyzed URL: ${analyzedUrl}`,
      `Performance Score: ${performanceScore ?? 'N/A'}`,
      form.phone ? `Phone: ${form.phone.trim()}` : '',
      form.company ? `Company: ${form.company.trim()}` : '',
      'User requested a speed optimization consultation.',
    ]
      .filter(Boolean)
      .join('\n');

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message: inquiryMessage,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || 'Unable to submit lead. Please try again.');
      }

      setForm(initialState);
      setMessage('Thanks. Our team will reach out with your optimization plan.');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit lead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border border-[#20B2AA]/40 bg-[#111] p-6 md:p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Get This Fixed by WebOrbitSolution</h3>
      <p className="mt-2 text-sm text-gray-200">
        Share your email to receive a custom action plan and free consultation for this performance report.
      </p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Full name*"
          value={form.name}
          onChange={(event) => onChange('name', event.target.value)}
          className="border border-white/10 bg-black px-3 py-2 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#20B2AA] transition-colors"
        />
        <input
          type="email"
          placeholder="Email*"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          className="border border-white/10 bg-black px-3 py-2 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#20B2AA] transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          className="border border-white/10 bg-black px-3 py-2 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#20B2AA] transition-colors"
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={form.company}
          onChange={(event) => onChange('company', event.target.value)}
          className="border border-white/10 bg-black px-3 py-2 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#20B2AA] transition-colors"
        />

        <button
          type="submit"
          disabled={submitting}
          className="md:col-span-2 px-4 py-3 bg-[#20B2AA] text-black text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#84f0ea] transition-colors disabled:bg-[#20B2AA]/45 disabled:text-black/70"
        >
          {submitting ? 'Submitting...' : 'Get Free Consultation'}
        </button>
      </form>

      {message ? <p className="mt-3 text-sm text-primary">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </section>
  );
}
