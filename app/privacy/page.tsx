export const metadata = {
  title: "Privacy Policy — Pastor's Provision",
  description:
    "Privacy policy for pastorsprovision.com explaining how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--slate-900)] mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-[var(--slate-500)] mb-6">
        Last updated: April 4, 2026
      </p>

      <div className="prose prose-slate max-w-none text-[var(--slate-700)] space-y-6 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p>
          Pastor&apos;s Provision does not require account creation. We do not
          collect personal information such as names, email addresses, or
          payment details directly on this site. When you click an affiliate
          link and visit Amazon.com, your interaction is governed by
          Amazon&apos;s own privacy policy.
        </p>
        <p>
          We may collect non-personal, aggregate data through analytics tools
          (such as page views and referral sources) to understand how visitors
          use the site and improve the experience.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          2. Cookies &amp; Tracking Technologies
        </h2>
        <p>
          This site may use cookies or similar technologies for basic analytics
          (e.g., Google Analytics). When you click an affiliate link to
          Amazon.com, Amazon places its own cookies on your device to track the
          referral. We do not control Amazon&apos;s cookies. You can manage
          cookie preferences in your browser settings.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          3. Amazon Associates Program
        </h2>
        <p>
          Pastor&apos;s Provision is a participant in the Amazon Services LLC
          Associates Program, an affiliate advertising program designed to
          provide a means for sites to earn advertising fees by advertising and
          linking to Amazon.com. As an Amazon Associate, we earn from qualifying
          purchases.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          4. Third-Party Links
        </h2>
        <p>
          This website contains links to Amazon.com. Once you leave our site,
          our privacy policy no longer applies. We encourage you to read
          Amazon&apos;s privacy notice before making purchases.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          5. Children&apos;s Privacy
        </h2>
        <p>
          This site is not directed at children under 13. We do not knowingly
          collect personal information from children.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          6. Changes to This Policy
        </h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with a revised &quot;Last updated&quot; date.
        </p>

        <h2 className="text-lg font-semibold text-[var(--slate-800)] mt-8 mb-2">
          7. Contact Us
        </h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
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
