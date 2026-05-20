export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="h-10 w-36 bg-muted animate-pulse rounded-lg" />
            <div className="hidden md:flex items-center gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
            <div className="h-10 w-28 bg-muted animate-pulse rounded-full" />
          </div>
        </nav>
      </header>

      {/* Hero Skeleton */}
      <section className="pt-28 pb-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-14 w-3/4 mx-auto bg-muted animate-pulse rounded-lg" />
          <div className="mt-6 h-5 w-1/2 mx-auto bg-muted animate-pulse rounded" />
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-36 bg-muted animate-pulse rounded-full" />
            <div className="h-12 w-36 bg-muted animate-pulse rounded-full" />
          </div>
          <div className="mt-12 mx-auto w-[300px] h-[300px] bg-muted animate-pulse rounded-xl" />
        </div>
      </section>

      {/* Client Logos Skeleton */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-4 w-24 mx-auto bg-muted animate-pulse rounded mb-4" />
            <div className="h-10 w-72 mx-auto bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="flex items-center justify-center gap-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-square bg-muted animate-pulse rounded-3xl" />
            <div className="space-y-6">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-10 w-3/4 bg-muted animate-pulse rounded-lg" />
              <div className="h-20 w-full bg-muted animate-pulse rounded" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
