export default function BlogPostLoading() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-8" />
        <div className="h-10 w-3/4 bg-muted animate-pulse rounded-lg" />
        <div className="mt-6 h-6 w-1/2 bg-muted animate-pulse rounded" />
        <div className="mt-10 aspect-[16/9] bg-muted animate-pulse rounded-3xl" />
        <div className="mt-10 space-y-4">
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-5 w-4/6 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </section>
  )
}
