interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  affiliateUrl: string;
}

export default function ProductCard({
  title,
  description,
  category,
  icon,
  affiliateUrl,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Image placeholder */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <span className="text-5xl">{icon}</span>
        <span className="absolute top-3 left-3 rounded-full bg-[var(--navy)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-[var(--slate-800)] line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm text-[var(--slate-500)] line-clamp-2 mb-4 flex-1">
          {description}
        </p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--navy-dark)] hover:shadow-md active:scale-[0.97]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}
