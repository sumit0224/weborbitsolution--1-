export function Marquee() {
  const items = ['DESIGN', 'DEVELOPMENT', 'MARKETING', 'SEO', 'BRANDING', 'STRATEGY']
  
  return (
    <section className="relative py-8 overflow-hidden border-y border-border bg-card">
      {/* First Row */}
      <div className="flex">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground/20"
            >
              {item}
              <span className="mx-8 text-primary">·</span>
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap" aria-hidden="true">
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground/20"
            >
              {item}
              <span className="mx-8 text-primary">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
