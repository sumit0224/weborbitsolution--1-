'use client'

interface BlogPostErrorProps {
  error: Error
  reset: () => void
}

export default function BlogPostError({ error, reset }: BlogPostErrorProps) {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Unable to load this article</h2>
        <p className="mt-3 text-muted-foreground">{error.message || 'Please try again in a moment.'}</p>
        <button
          onClick={reset}
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Reload Article
        </button>
      </div>
    </div>
  )
}
