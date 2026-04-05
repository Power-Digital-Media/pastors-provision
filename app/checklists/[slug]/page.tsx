import { notFound } from "next/navigation";
import Link from "next/link";
import { allChecklists, getChecklistBySlug } from "@/data/checklists";
import ChecklistGrid from "@/components/ChecklistGrid";
import type { Metadata } from "next";

/* ── Static params so Next.js can pre-render each page ── */
export function generateStaticParams() {
  return allChecklists.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getChecklistBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.title} Checklist — Pastor's Provision`,
    description: cat.description,
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getChecklistBySlug(slug);
  if (!cat) notFound();

  return (
    <>
      {/* ── Breadcrumb + Header ── */}
      <section className="bg-gradient-to-br from-[var(--navy)] via-[var(--navy-dark)] to-[var(--slate-900)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/#checklists"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            All Checklists
          </Link>

          <div className="flex items-start gap-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                {cat.title}
              </h1>
              <p className="mt-1 text-base text-[var(--gold)] font-medium">
                {cat.tagline}
              </p>
              <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Affiliate disclosure ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <p className="mx-auto max-w-5xl px-4 py-2.5 text-xs text-amber-800 sm:px-6 lg:px-8">
          <strong>Disclosure:</strong> As an Amazon Associate we earn from
          qualifying purchases. Clicking a product link takes you to Amazon.com
          where standard pricing applies.
        </p>
      </div>

      {/* ── Product Grid ── */}
      <section className="bg-[var(--slate-50)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--slate-800)]">
              {cat.items.length} Items on This List
            </h2>
            <span className="text-xs text-[var(--slate-500)]">
              Select items → open all at once on Amazon
            </span>
          </div>

          <ChecklistGrid items={cat.items} />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-[var(--slate-800)]">
            Looking for a different department?
          </h3>
          <p className="mt-1 text-sm text-[var(--slate-500)]">
            Browse all our curated restock checklists.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {allChecklists
              .filter((c) => c.slug !== cat.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/checklists/${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--slate-700)] shadow-sm transition-all hover:border-[var(--gold)] hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>{c.icon}</span>
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
