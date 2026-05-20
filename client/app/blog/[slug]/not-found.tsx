import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-4">
      <div className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Article Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          The article you are looking for does not exist or has not been published yet.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Back to Blog
        </Link>
      </div>
    </section>
  )
}
