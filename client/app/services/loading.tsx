export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="h-14 w-56 bg-muted animate-pulse rounded-lg mb-6" />
            <div className="h-5 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Services List Skeleton */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-32">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start border-t border-border pt-12 sm:pt-16">
                {/* Left column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-muted animate-pulse rounded-xl" />
                    <div className="h-6 w-8 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-10 w-3/4 bg-muted animate-pulse rounded-lg" />
                  <div className="h-16 w-full bg-muted animate-pulse rounded" />
                </div>
                {/* Right column */}
                <div className="lg:col-span-6 lg:col-start-7 space-y-4">
                  <div className="h-6 w-28 bg-muted animate-pulse rounded mb-6" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
