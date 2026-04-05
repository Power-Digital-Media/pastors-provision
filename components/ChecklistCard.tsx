import Link from "next/link";

interface ChecklistCardProps {
  title: string;
  description: string;
  icon: string;
  itemCount: number;
  href: string;
}

export default function ChecklistCard({
  title,
  description,
  icon,
  itemCount,
  href,
}: ChecklistCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-[var(--gold)] hover:-translate-y-0.5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <span className="rounded-full bg-[var(--gold)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--gold)]">
          {itemCount} items
        </span>
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--slate-800)] group-hover:text-[var(--navy)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--slate-500)] line-clamp-2 flex-1">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--navy)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        View Checklist
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
