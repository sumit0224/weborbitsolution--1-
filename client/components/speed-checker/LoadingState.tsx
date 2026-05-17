export default function LoadingState() {
  const skeletonBar = 'h-3 rounded bg-white/10';

  return (
    <section className="mt-8 space-y-4 text-white">
      <div className="border border-white/10 bg-[#111] p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#20B2AA]/30 border-t-[#20B2AA]" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#20B2AA]">Generating Report</p>
            <p className="mt-1 text-sm text-gray-300">Running website speed analysis and preparing insights.</p>
          </div>
        </div>
      </div>

      <div className="animate-pulse space-y-4">
        <div className="grid gap-3 md:grid-cols-[320px_1fr]">
          <div className="border border-white/10 bg-[#111] p-6">
            <div className="mx-auto h-36 w-36 rounded-full bg-white/10" />
            <div className={`mx-auto mt-5 w-40 ${skeletonBar}`} />
            <div className={`mx-auto mt-3 w-52 ${skeletonBar}`} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array.from({ length: 4 })].map((_, index) => (
              <div key={`score-${index}`} className="border border-white/10 bg-[#111] p-4">
                <div className={`w-20 ${skeletonBar}`} />
                <div className="mt-4 h-8 w-16 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[...Array.from({ length: 3 })].map((_, index) => (
            <div key={`vital-${index}`} className="border border-white/10 bg-[#111] p-5">
              <div className={`w-14 ${skeletonBar}`} />
              <div className={`mt-3 w-36 ${skeletonBar}`} />
              <div className="mt-5 h-7 w-24 rounded bg-white/10" />
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border border-white/10 bg-[#111] p-6">
            <div className={`w-40 ${skeletonBar}`} />
            <div className="mt-6 h-52 rounded bg-white/10" />
          </div>
          <div className="border border-white/10 bg-[#111] p-6">
            <div className={`w-52 ${skeletonBar}`} />
            <div className="mt-4 space-y-3">
              {[...Array.from({ length: 5 })].map((_, index) => (
                <div key={`suggestion-${index}`} className="h-10 rounded bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
