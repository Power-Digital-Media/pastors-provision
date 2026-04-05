"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Hospitality", href: "/checklists/hospitality" },
  { name: "Communion", href: "/checklists/communion" },
  { name: "KidMin", href: "/checklists/kidmin" },
  { name: "Facilities", href: "/checklists/facilities" },
  { name: "Office", href: "/checklists/office" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Pastor's Provision"
              width={140}
              height={140}
              className="h-12 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--slate-700)] transition-colors hover:bg-[var(--slate-100)] hover:text-[var(--navy)]"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/#checklists"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--gold-light)] hover:shadow-md active:scale-[0.97]"
          >
            Browse Supplies
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[var(--slate-700)] transition-colors hover:bg-[var(--slate-100)]"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-[var(--slate-700)] transition-colors hover:bg-[var(--slate-100)] hover:text-[var(--navy)]"
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/#checklists"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-lg bg-[var(--gold)] px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-[var(--gold-light)]"
            >
              Browse Supplies
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
