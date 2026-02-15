'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost as BlogPostType } from '../../data/blogPosts';

interface SectionDraft {
  heading: string;
  paragraphs: string;
  bullets: string;
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  date: '',
  readTime: '',
  author: 'WebOrbit Studio',
  category: '',
  featuredImageSrc: '',
  featuredImageAlt: '',
  metaTitle: '',
  metaDescription: '',
  published: true,
};

const AdminDashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [form, setForm] = useState(emptyForm);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [sections, setSections] = useState<SectionDraft[]>([
    { heading: '', paragraphs: '', bullets: '' },
  ]);
  const [actionStatus, setActionStatus] = useState<'idle' | 'saving' | 'error' | 'success'>('idle');
  const [actionMessage, setActionMessage] = useState('');
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const loadPosts = async () => {
    try {
      setStatus('loading');
      const response = await fetch(`${baseUrl}/api/admin/posts`, { credentials: 'include' });
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to load posts.');
      }
      setPosts(data.posts || []);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSectionChange = (index: number, field: keyof SectionDraft, value: string) => {
    setSections((prev) => prev.map((section, i) => (i === index ? { ...section, [field]: value } : section)));
  };

  const addSection = () => {
    setSections((prev) => [...prev, { heading: '', paragraphs: '', bullets: '' }]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setActionStatus('saving');
      setActionMessage('');

      if (!featuredImageFile) {
        throw new Error('Featured image file is required.');
      }

      const imageFormData = new FormData();
      imageFormData.append('image', featuredImageFile);
      const uploadResponse = await fetch(`${baseUrl}/api/admin/uploads`, {
        method: 'POST',
        body: imageFormData,
        credentials: 'include',
      });
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData?.error || 'Failed to upload image.');
      }

      const parsedSections = sections
        .filter((section) => section.heading.trim())
        .map((section) => ({
          heading: section.heading.trim(),
          paragraphs: section.paragraphs
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
          bullets: section.bullets
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
        }));

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        date: form.date,
        readTime: form.readTime,
        author: form.author,
        category: form.category,
        featuredImage: {
          src: uploadData.url,
          alt: form.featuredImageAlt,
        },
        sections: parsedSections,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        published: form.published,
      };

      const response = await fetch(`${baseUrl}/api/admin/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create post.');
      }

      setActionStatus('success');
      setActionMessage('Post created successfully.');
      setForm(emptyForm);
      setFeaturedImageFile(null);
      setSections([{ heading: '', paragraphs: '', bullets: '' }]);
      loadPosts();
    } catch (error) {
      setActionStatus('error');
      setActionMessage(error instanceof Error ? error.message : 'Failed to create post.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${baseUrl}/api/admin/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    loadPosts();
  };

  const handleLogout = async () => {
    await fetch(`${baseUrl}/api/admin/logout`, { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  return (
    <section className="bg-black text-white min-h-screen pt-28 pb-20 font-body-alt">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Admin</p>
            <h1 className="mt-4 text-3xl md:text-5xl font-heading">Blog Manager</h1>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 space-y-6">
            <h2 className="text-xl font-semibold">Create New Post</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Slug</label>
                <input
                  value={form.slug}
                  onChange={(event) => setForm({ ...form, slug: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="auto-generated if empty"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
                rows={3}
                className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Read Time</label>
                <input
                  value={form.readTime}
                  onChange={(event) => setForm({ ...form, readTime: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="5 min read"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Category</label>
                <input
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Author</label>
                <input
                  value={form.author}
                  onChange={(event) => setForm({ ...form, author: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Published</label>
                <select
                  value={form.published ? 'yes' : 'no'}
                  onChange={(event) => setForm({ ...form, published: event.target.value === 'yes' })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Featured Image (Upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setFeaturedImageFile(event.target.files?.[0] || null)}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Image Alt Text</label>
                <input
                  value={form.featuredImageAlt}
                  onChange={(event) => setForm({ ...form, featuredImageAlt: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Meta Title</label>
                <input
                  value={form.metaTitle}
                  onChange={(event) => setForm({ ...form, metaTitle: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Optional SEO title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Meta Description</label>
                <input
                  value={form.metaDescription}
                  onChange={(event) => setForm({ ...form, metaDescription: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Optional SEO description"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500">Sections</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="text-primary text-xs uppercase tracking-[0.3em]"
                >
                  Add Section
                </button>
              </div>
              {sections.map((section, index) => (
                <div key={index} className="border border-white/10 p-4 space-y-3">
                  <input
                    value={section.heading}
                    onChange={(event) => handleSectionChange(index, 'heading', event.target.value)}
                    className="w-full bg-black border border-white/10 p-2 text-white focus:outline-none focus:border-primary"
                    placeholder={`Section ${index + 1} heading`}
                  />
                  <textarea
                    value={section.paragraphs}
                    onChange={(event) => handleSectionChange(index, 'paragraphs', event.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 p-2 text-white focus:outline-none focus:border-primary"
                    placeholder="Paragraphs (one per line)"
                  />
                  <textarea
                    value={section.bullets}
                    onChange={(event) => handleSectionChange(index, 'bullets', event.target.value)}
                    rows={2}
                    className="w-full bg-black border border-white/10 p-2 text-white focus:outline-none focus:border-primary"
                    placeholder="Bullets (one per line)"
                  />
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-red-400 text-xs uppercase tracking-[0.3em]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {actionMessage && (
              <p className={actionStatus === 'error' ? 'text-red-500' : 'text-primary'}>
                {actionMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={actionStatus === 'saving'}
              className="w-full bg-primary text-black py-3 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
            >
              {actionStatus === 'saving' ? 'Saving...' : 'Publish Post'}
            </button>
          </form>

          <div className="bg-white/5 border border-white/10 p-8">
            <h2 className="text-xl font-semibold">Existing Posts</h2>
            {status === 'loading' && <p className="text-gray-400 mt-4">Loading posts...</p>}
            {status === 'error' && <p className="text-red-500 mt-4">Failed to load posts.</p>}
            {status === 'ready' && posts.length === 0 && (
              <p className="text-gray-400 mt-4">No posts yet.</p>
            )}
            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <div key={post.slug} className="border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{post.category}</p>
                  <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm">{post.date}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`text-xs uppercase tracking-[0.3em] ${post.published ? 'text-primary' : 'text-gray-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete((post as any)._id)}
                      className="text-red-400 text-xs uppercase tracking-[0.3em]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
