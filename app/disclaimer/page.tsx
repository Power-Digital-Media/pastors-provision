export const metadata = {
  title: "Affiliate Disclaimer — Pastor's Provision",
  description:
    "FTC and Amazon Associates affiliate disclosure for pastorsprovision.com.",
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--slate-900)] mb-8">
        Affiliate Disclaimer
      </h1>
      <p className="text-sm text-[var(--slate-500)] mb-6">
        Last updated: April 4, 2026
      </p>

      <div className="prose prose-slate max-w-none text-[var(--slate-700)] space-y-6 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          FTC Disclosure
        </h2>
        <p>
          In accordance with the Federal Trade Commission&apos;s guidelines
          concerning the use of endorsements and testimonials in advertising
          (16 CFR Part 255), please be aware that Pastor&apos;s Provision may
          receive compensation for products purchased through links on this
          website.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          Amazon Associates Disclosure
        </h2>
        <p>
          Pastor&apos;s Provision is a participant in the{" "}
          <strong>Amazon Services LLC Associates Program</strong>, an affiliate
          advertising program designed to provide a means for sites to earn
          advertising fees by advertising and linking to{" "}
          <strong>Amazon.com</strong>.
        </p>
        <p className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-[var(--slate-700)]">
          <strong>
            As an Amazon Associate, we earn from qualifying purchases.
          </strong>
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          Product Information
        </h2>
        <p>
          Product prices and availability are accurate as of the date and time
          indicated on each product listing and are subject to change. Any
          price and availability information displayed on Amazon.com at the
          time of purchase will apply to the purchase of the product.
        </p>
        <p>
          We make no representations or warranties regarding the accuracy,
          completeness, or reliability of any product information displayed on
          this site. All product data, including pricing, descriptions, and
          availability, is sourced from Amazon.com and may differ from what is
          currently available.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          Editorial Independence
        </h2>
        <p>
          Our product recommendations are based on research into what church
          administrators and ministry leaders commonly purchase. Affiliate
          relationships do not influence which products we recommend. We
          recommend products we believe are genuinely useful for church
          operations.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          Contact Us
        </h2>
        <p>
          If you have questions about our affiliate relationships, please
          contact us at{" "}
          <a
            href="mailto:hello@pastorsprovision.com"
            className="text-[var(--gold)] hover:underline"
          >
            hello@pastorsprovision.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
