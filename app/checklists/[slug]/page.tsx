import { notFound } from "next/navigation";
import Link from "next/link";
import { allChecklists, getChecklistBySlug } from "@/data/checklists";
import InteractiveChecklist from "@/components/InteractiveChecklist";

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

function getCategoryFaqs(slug: string) {
  switch (slug) {
    case "hospitality":
      return [
        {
          question: "How much coffee should I brew for a Sunday service?",
          answer: "A good rule of thumb is to brew 1 gallon of coffee for every 20–25 expected attendees. Typically, 60% of attendees will drink coffee, with a higher percentage in winter or early morning services.",
        },
        {
          question: "What are the essential elements of a church hospitality station?",
          answer: "An essential church hospitality station needs: freshly brewed regular and decaf coffee, hot water for tea, cups, lids, sleeves, sugar, sweeteners (Splenda/Stevia), non-dairy liquid creamer packets, stir sticks, napkins, and bottled water for greeters/volunteers.",
        },
      ];
    case "communion":
      return [
        {
          question: "How much communion bread and grape juice do I need?",
          answer: "For a congregation, order unleavened bread wafers in packs of 500 (approx. 1.2x your average attendance to account for spillages/multi-services) and 64 oz of grape juice for every 150–200 communion cups.",
        },
        {
          question: "Should I use pre-filled communion cups or standard cups?",
          answer: "Pre-filled juice-and-wafer cups are best for large holiday services, outdoor worship, or sanitization efficiency. Standard plastic communion cups inside stainless steel trays are ideal for traditional, reverent Sunday services.",
        },
      ];
    default:
      return [
        {
          question: "How often should I review my church department inventory?",
          answer: "We recommend reviewing your supply inventory during the last week of every month. This ensures you can order and restock before the first Sunday of the next month, preventing mid-service shortages.",
        },
        {
          question: "How are the product search links built?",
          answer: "We use Amazon keyword search links (e.g. searching for a specific product name and volume) with our affiliate tracking code. This ensures that you always land on an active, stocked product page rather than a broken or unavailable specific item page.",
        },
      ];
  }
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getChecklistBySlug(slug);
  if (!cat) notFound();

  const faqs = getCategoryFaqs(slug);

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://pastorsprovision.com/checklists/${slug}/#webpage`,
    "url": `https://pastorsprovision.com/checklists/${slug}/`,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2"],
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${cat.title} Checklist`,
    "description": cat.description,
    "itemListElement": cat.items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": item.title,
        "description": item.description,
        "image": `https://pastorsprovision.com/logo.png`,
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      {/* ── Schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <span className="text-5xl select-none">{cat.icon}</span>
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
              <p className="mt-3 text-xs text-slate-400">
                <span>Last Updated: </span>
                <span className="font-semibold text-slate-300">
                  {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
                </span>
                <span className="mx-2">•</span>
                <span className="bg-slate-800/80 text-[var(--gold)] border border-slate-700/50 rounded-full px-2.5 py-0.5 font-medium select-none">
                  Verified Active Links
                </span>
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

      {/* ── Interactive Checklist Grid ── */}
      <section className="bg-[var(--slate-50)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--slate-800)]">
              {cat.items.length} Items on This List
            </h2>
          </div>

          <InteractiveChecklist slug={slug} items={cat.items} />
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-white py-12 sm:py-16 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-[var(--slate-800)] text-center">
            Frequently Asked Questions — {cat.title}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-slate-200 rounded-xl bg-white p-5 cursor-pointer transition-all duration-200 hover:border-slate-300"
              >
                <summary className="list-none flex items-center justify-between font-semibold text-[var(--slate-800)] outline-none select-none">
                  <span>{faq.question}</span>
                  <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-100 p-1 text-slate-500 group-open:rotate-180 transition-transform duration-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--slate-500)] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
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
