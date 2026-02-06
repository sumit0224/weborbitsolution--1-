import React from 'react';

const posts = [
  {
    title: 'Designing for Motion',
    date: 'Jan 12, 2026',
    excerpt: 'How micro-interactions and scroll-based motion create brand memorability.'
  },
  {
    title: 'From Concept to Conversion',
    date: 'Dec 18, 2025',
    excerpt: 'A framework for aligning strategy, copy, and UI into a single conversion story.'
  },
  {
    title: 'Performance as a Design Material',
    date: 'Nov 30, 2025',
    excerpt: 'Why speed, responsiveness, and accessibility belong in the design brief.'
  }
];

const BlogPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Insights</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          The Orbit
          <br />
          Journal
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          Strategy, design, and product thinking from our studio.
        </p>
      </div>

      <div className="px-6 md:px-12 mt-12 grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.title} className="border border-white/10 p-6 bg-white/5 hover:border-primary transition-colors">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{post.date}</p>
            <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
            <p className="text-gray-400 mt-4">{post.excerpt}</p>
            <button className="mt-6 text-primary uppercase tracking-[0.3em] text-xs">Read More</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
