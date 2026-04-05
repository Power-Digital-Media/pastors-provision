import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Hospitality", href: "#hospitality" },
  { name: "Communion", href: "#communion" },
  { name: "KidMin", href: "#kidmin" },
  { name: "Facilities", href: "#facilities" },
  { name: "Office", href: "#office" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[var(--slate-900)] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <Image
                src="/logo.png"
                alt="Pastor's Provision"
                width={120}
                height={120}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted wholesale ordering portal for church supplies.
              Streamline your ministry purchasing with curated products and
              monthly restock checklists.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#checklists"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Monthly Checklists
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Top Products
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Affiliate Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h3>
            <p className="text-sm text-slate-400">
              Questions about orders?
            </p>
            <a
              href="mailto:hello@pastorsprovision.com"
              className="mt-1 inline-block text-sm text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
            >
              hello@pastorsprovision.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Pastor&apos;s Provision. All rights
              reserved. ·{" "}
              <Link href="/privacy" className="underline hover:text-slate-300">Privacy</Link>{" · "}
              <Link href="/disclaimer" className="underline hover:text-slate-300">Disclaimer</Link>
            </p>
            <p className="text-xs text-slate-500 text-center sm:text-right max-w-lg">
              Pastor&apos;s Provision is a participant in the Amazon Services
              LLC Associates Program, an affiliate advertising program designed
              to provide a means for sites to earn advertising fees by
              advertising and linking to Amazon.com.{" "}
              <strong className="text-slate-400">
                As an Amazon Associate we earn from qualifying purchases.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
