import ProductCard from "@/components/ProductCard";
import ChecklistCard from "@/components/ChecklistCard";

/* ── Data ────────────────────────────────────────────── */

const checklists = [
  {
    title: "Sunday Hospitality",
    description:
      "Coffee, cups, creamers, napkins, and welcome supplies for every Sunday.",
    icon: "☕",
    itemCount: 12,
    href: "/checklists/hospitality",
  },
  {
    title: "Communion Prep",
    description:
      "Communion cups, wafers, juice, trays, and table linens for the Lord's Supper.",
    icon: "🍷",
    itemCount: 8,
    href: "/checklists/communion",
  },
  {
    title: "KidMin Essentials",
    description:
      "Craft supplies, snacks, stickers, coloring sheets, and check-in materials.",
    icon: "🎨",
    itemCount: 15,
    href: "/checklists/kidmin",
  },
  {
    title: "Facilities & Janitorial",
    description:
      "Cleaning supplies, trash bags, paper towels, and restroom essentials.",
    icon: "🧹",
    itemCount: 10,
    href: "/checklists/facilities",
  },
  {
    title: "Office & Admin",
    description:
      "Printer paper, toner, envelopes, labels, and administrative supplies.",
    icon: "📋",
    itemCount: 9,
    href: "/checklists/office",
  },
  {
    title: "Celebrate Recovery",
    description:
      "Participant guides, journals, name badges, milestone chips, and fellowship supplies.",
    icon: "💜",
    itemCount: 12,
    href: "/checklists/celebrate-recovery",
  },
];

const TAG = "powerdigital1-20";
const amzSearch = (q: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

const products = [
  {
    title: "Broadman Disposable Communion Cups (1,000-ct)",
    description:
      "Plastic, recyclable communion cups that fit standard communion trays. The #1 reordered church item.",
    category: "Communion",
    icon: "🥤",
    affiliateUrl: amzSearch("Broadman church communion cups 1000 count disposable"),
  },
  {
    title: "Community Coffee — Breakfast Blend (40-ct Packets)",
    description:
      "Pre-measured 2.5 oz ground coffee packets, medium roast. Makes brewing for large groups effortless.",
    category: "Hospitality",
    icon: "☕",
    affiliateUrl: amzSearch("Community Coffee Breakfast Blend 40 count packets"),
  },
  {
    title: "Clorox Disinfecting Wipes — Value Pack (300+ ct)",
    description:
      "Lemon & fresh scented. Sanitizes, cleans, and deodorizes nursery, classrooms, and common areas.",
    category: "Facilities",
    icon: "🧴",
    affiliateUrl: amzSearch("Clorox disinfecting wipes value pack 300 count"),
  },
  {
    title: "Copy Paper — 8.5×11 (10-Ream Case, 5,000 Sheets)",
    description:
      "20 lb, 92 bright white multipurpose paper for bulletins, handouts, and newsletters.",
    category: "Office",
    icon: "📄",
    affiliateUrl: amzSearch("copy paper 8.5x11 10 ream case 5000 sheets 20lb"),
  },
  {
    title: "Crayola Washable Markers — Bulk 200-ct (8 Colors)",
    description:
      "Broad-line, washable markers for classrooms. Perfect for Sunday School and VBS crafts.",
    category: "KidMin",
    icon: "🖍️",
    affiliateUrl: amzSearch("Crayola washable markers bulk classpack 200 count"),
  },
  {
    title: "Hot Cup Lids for 8–12 oz Cups (200-ct)",
    description:
      "Snap-on lids for paper hot cups. Essential for coffee stations and hospitality service.",
    category: "Hospitality",
    icon: "🫗",
    affiliateUrl: amzSearch("disposable hot cup lids 12oz 200 count"),
  },
  {
    title: "Unleavened Communion Bread Wafers (500 Pieces)",
    description:
      "Individually sealed unleavened bread wafers for inclusive communion services.",
    category: "Communion",
    icon: "🍞",
    affiliateUrl: amzSearch("unleavened communion bread wafers 500 count church"),
  },
  {
    title: "Heavy-Duty Contractor Trash Bags — 55 Gal (50-ct)",
    description:
      "Tear-resistant bags with ties for post-service and event cleanup. Fits 50–60 gal cans.",
    category: "Facilities",
    icon: "🗑️",
    affiliateUrl: amzSearch("heavy duty contractor trash bags 55 gallon 50 count"),
  },
  {
    title: "Badge Lanyards + ID Holders (100 Sets)",
    description:
      "Clear plastic badge holders with black lanyards. Great for volunteers, staff, and visitors.",
    category: "Office",
    icon: "🪪",
    affiliateUrl: amzSearch("badge lanyards ID holders clear 100 sets"),
  },
  {
    title: "Goldfish Crackers — Variety Pack (30-ct)",
    description:
      "Cheddar, Colors, and Pretzel variety pack. Individual bags keep serving easy and hygienic.",
    category: "KidMin",
    icon: "🐟",
    affiliateUrl: amzSearch("Goldfish crackers variety pack 30 count"),
  },
  {
    title: "Welch's 100% Concord Grape Juice (64 oz)",
    description:
      "No added sugar, 100% Concord grape juice for communion preparation.",
    category: "Communion",
    icon: "🍇",
    affiliateUrl: amzSearch("Welch's 100% Concord grape juice 64 oz"),
  },
  {
    title: "Commercial Paper Towel Rolls (6-Pack, High Capacity)",
    description:
      "High-capacity recycled fiber rolls for restrooms, kitchens, and classrooms.",
    category: "Facilities",
    icon: "🧻",
    affiliateUrl: amzSearch("commercial paper towel rolls high capacity 6 pack"),
  },
  {
    title: "Celebrate Recovery Participant Guides (Set of 4)",
    description:
      "The complete four-part guide set covering all 25 lessons of the CR journey.",
    category: "CR",
    icon: "📚",
    affiliateUrl: amzSearch("Celebrate Recovery participant guide set 4 pack"),
  },
  {
    title: "Sobriety / Milestone Chip Coins (Set of 9)",
    description:
      "Color-coded recovery milestone chips for celebrating 30 days through multiple years.",
    category: "CR",
    icon: "🪙",
    affiliateUrl: amzSearch("sobriety milestone chip coins recovery set"),
  },
];

/* ── Page ────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--navy)] via-[var(--navy-dark)] to-[var(--slate-900)]">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--gold)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Church Supplies,{" "}
              <span className="text-[var(--gold)]">Simplified.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg sm:mt-6 max-w-xl">
              We built this portal to help churches stop wasting hours hunting
              for supplies. Browse our curated restock checklists and
              hand-picked product links — from communion prep to coffee hour.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#checklists"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-yellow-900/20 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
              >
                View Restock Checklists
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.97]"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Monthly Restock Checklists ── */}
      <section id="checklists" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] mb-3">
              Monthly Checklists
            </span>
            <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-3xl">
              Monthly Restock Checklists
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--slate-500)]">
              Never run out mid-service again. Pick a department, review the
              checklist, and restock in minutes — not hours.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {checklists.map((cl) => (
              <ChecklistCard key={cl.title} {...cl} />
            ))}
          </div>
        </div>
      </section>

      {/* ── High-Demand Products ── */}
      <section
        id="products"
        className="bg-[var(--slate-50)] py-16 sm:py-20 border-t border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-block rounded-full bg-[var(--navy)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--navy)] mb-3">
                Top-Selling
              </span>
              <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-3xl">
                High-Demand Consumables
              </h2>
              <p className="mt-2 max-w-2xl text-[var(--slate-500)]">
                The most reordered church supplies across all departments. Click
                &quot;Buy on Amazon&quot; to order directly.
              </p>
            </div>
          </div>

          {/* Inline Affiliate Disclosure */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-[var(--slate-600)]">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, Pastor&apos;s Provision
            earns from qualifying purchases. Prices and availability are subject to change.
            See our{" "}
            <a href="/disclaimer" className="underline text-[var(--navy)] hover:text-[var(--navy-dark)]">
              full disclaimer
            </a>
            .
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[var(--navy)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to streamline your church purchasing?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Bookmark this portal and come back every month. We keep the
            checklists fresh so you don&apos;t have to.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#checklists"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
            >
              Start with Checklists
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.97]"
            >
              Browse All Products
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
