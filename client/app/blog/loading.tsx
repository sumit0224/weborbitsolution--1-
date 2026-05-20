export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="h-4 w-20 bg-muted animate-pulse rounded mb-6" />
            <div className="h-14 w-3/4 bg-muted animate-pulse rounded-lg mb-4" />
            <div className="h-5 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <article key={i} className="flex flex-col">
                <div className="aspect-[4/3] bg-muted animate-pulse rounded-[2rem] mb-6" />
                <div className="px-2 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-7 w-full bg-muted animate-pulse rounded-lg" />
                  <div className="h-12 w-full bg-muted animate-pulse rounded" />
                  <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
