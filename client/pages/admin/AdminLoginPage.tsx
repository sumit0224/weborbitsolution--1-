'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setStatus('loading');
      setErrorMessage('');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Login failed.');
      }

      router.push('/admin');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <section className="bg-black text-white min-h-screen pt-32 pb-20 font-body-alt">
      <div className="page-container max-w-2xl">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Admin</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-heading">Sign In</h1>
        <p className="text-gray-400 mt-4">Access the blog admin panel to create and manage posts.</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 bg-white/5 border border-white/10 p-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
              placeholder="admin@weborbitsolution.in"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          {status === 'error' && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-black py-3 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
          >
            {status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLoginPage;
