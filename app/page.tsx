import ProductGridWithFilters from "@/components/ProductGridWithFilters";
import ChecklistCard from "@/components/ChecklistCard";
import SubscribeForm from "@/components/SubscribeForm";

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

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://pastorsprovision.com/#webpage",
  "url": "https://pastorsprovision.com/",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pastorsprovision.com/#organization",
  "name": "Pastor's Provision",
  "url": "https://pastorsprovision.com",
  "logo": "https://pastorsprovision.com/logo.png",
  "email": "hello@pastorsprovision.com",
  "sameAs": ["https://powerdigitalmedia.com"],
  "description": "Your trusted restock ordering portal for church supplies, offering curated monthly checklists and high-demand product guides."
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pastorsprovision.com/#website",
  "name": "Pastor's Provision",
  "url": "https://pastorsprovision.com",
  "publisher": {
    "@id": "https://pastorsprovision.com/#organization"
  }
};

const faqs = [
  {
    question: "What is Pastor's Provision?",
    answer: "Pastor's Provision is a curated supply portal designed for church administrators, media directors, and ministry volunteers. We gather the most commonly needed supplies for Sunday hospitality, communion, children's ministry (KidMin), facilities, and administration, allowing you to restock in minutes instead of spending hours searching.",
  },
  {
    question: "How do the affiliate links work?",
    answer: "We use Amazon keyword search links (e.g. searching for a specific product name and volume) with our affiliate tracking code. This ensures that you always land on an active, stocked product page rather than a broken or unavailable specific item page, while allowing us to earn a small commission to keep the site running at no extra cost to you.",
  },
  {
    question: "Do you have custom checklist tracking?",
    answer: "Yes! On each category checklist page, you can check off items in real-time as you complete your inventory or placing orders. Your progress is saved in your local browser storage so you don't lose track of your work.",
  },
];

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

export default function HomePage() {
  return (
    <>
      {/* ── Schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1d33] via-[var(--navy-dark)] to-[var(--slate-900)] border-b border-slate-800">
        {/* Modern Mesh Gradients */}
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-[var(--gold)]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--gold)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Your Monthly Restock,{" "}
              <span className="text-[var(--gold)]">Already Curated.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg sm:mt-6 max-w-xl">
              Stop spending Saturday nights searching Amazon for communion
              cups and coffee filters. We&apos;ve hand-picked every item your
              church needs — organized by ministry, ready to reorder in
              minutes.
            </p>
            <p className="mt-3 text-sm text-slate-400 italic">
              Built by church media professionals who&apos;ve equipped ministries for years.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#checklists"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-yellow-900/20 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
              >
                Browse Restock Checklists
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.97]"
              >
                See Most Restocked Items
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                Most Restocked
              </span>
              <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-3xl">
                Items Churches Reorder Every Month
              </h2>
              <p className="mt-2 max-w-2xl text-[var(--slate-500)]">
                These are the supplies ministries run through the fastest.
                We&apos;ve already found the right ones — just click to restock.
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

          <ProductGridWithFilters products={products} />
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] mb-3">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[var(--slate-500)]">
              Got questions? We have direct answers for you.
            </p>
          </div>

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

      {/* ── CTA Banner ── */}
      <section className="bg-[var(--navy)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Bookmark This — Come Back Every Month
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            We keep the checklists updated so you don&apos;t have to search.
            Good stewardship starts with knowing exactly what to order and
            where to find it.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#checklists"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
            >
              Start with a Checklist
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.97]"
            >
              See Most Restocked Items
            </a>
          </div>
        </div>
      </section>

      {/* ── Subscribe Form ── */}
      <SubscribeForm />

      {/* ── PDM Cross-Sell ── */}
      <section className="border-t border-slate-700 bg-[var(--navy-dark)] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            Need help with church live-streaming, sound, or media production?
          </p>
          <a
            href="https://powerdigitalmedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
          >
            Visit Power Digital Media
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
