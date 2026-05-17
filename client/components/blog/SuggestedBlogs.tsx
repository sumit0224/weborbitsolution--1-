'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '../../data/blogPosts';

type SuggestedBlogsProps = {
  posts: BlogPost[];
  title?: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const clampExcerpt = (excerpt: string) => {
  const normalized = excerpt.trim().replace(/\s+/g, ' ');
  if (normalized.length <= 110) return normalized;
  return `${normalized.slice(0, 107).trim()}...`;
};

export default function SuggestedBlogs({ posts, title = 'You May Also Like' }: SuggestedBlogsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="w-full" aria-labelledby="suggested-blogs-heading">
      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-6">
        <h2 id="suggested-blogs-heading" className="text-lg font-heading tracking-tight text-black">
          {title}
        </h2>

        <ul className="mt-5 space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className="group rounded-lg border border-black/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <Link href={`/blog/${post.slug}`} itemProp="url" className="flex gap-3 p-3">
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-black/5">
                    <Image
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      fill
                      sizes="96px"
                      loading="lazy"
                      quality={72}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                      <time dateTime={post.date} itemProp="datePublished">
                        {formatDate(post.date)}
                      </time>
                      {post.readTime ? (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-primary">
                          {post.readTime}
                        </span>
                      ) : null}
                    </div>
                    <h3 itemProp="headline" className="mt-2 max-h-[2.8rem] overflow-hidden text-sm font-semibold leading-snug text-black">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{clampExcerpt(post.excerpt)}</p>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-black/10 pt-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary hover:underline">
            View All Blogs
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </aside>
  );
}
