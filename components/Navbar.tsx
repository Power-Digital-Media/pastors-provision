"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { allChecklists } from "@/data/checklists";
import { trackAmazonClick } from "@/utils/analytics";

const categories = [
  { name: "Hospitality", href: "/checklists/hospitality" },
  { name: "Communion", href: "/checklists/communion" },
  { name: "KidMin", href: "/checklists/kidmin" },
  { name: "Facilities", href: "/checklists/facilities" },
  { name: "Office", href: "/checklists/office" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Flatten all items from checklists for searching
  const allItems = allChecklists.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryName: cat.title,
      categorySlug: cat.slug,
    }))
  );

  const filteredCategories =
    query.trim() === ""
      ? []
      : allChecklists.filter(
          (cat) =>
            cat.title.toLowerCase().includes(query.toLowerCase()) ||
            cat.description.toLowerCase().includes(query.toLowerCase())
        );

  const filteredItems =
    query.trim() === ""
      ? []
      : allItems.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

  // Close search on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

        {/* CTA + Search + Mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-[var(--slate-500)] cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300 w-32 sm:w-40"
          >
            <svg
              className="h-3.5 w-3.5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
              />
            </svg>
            <span className="hidden xs:inline">Search supplies...</span>
          </button>

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

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-20 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop click close */}
          <div
            className="fixed inset-0 cursor-default"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl animate-in slide-in-from-top-4 duration-200">
            {/* Input field */}
            <div className="flex items-center border-b border-slate-200 px-4 py-3">
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search communion, cups, paper, snacks..."
                className="ml-2 w-full text-sm text-[var(--slate-800)] placeholder-slate-400 outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                }}
                className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-[350px] overflow-y-auto p-4">
              {query.trim() === "" ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Type to search checklists, categories, or specific products...
                </div>
              ) : filteredCategories.length === 0 && filteredItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No matches found for &quot;{query}&quot;.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Categories */}
                  {filteredCategories.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Checklists
                      </h4>
                      <ul className="space-y-1">
                        {filteredCategories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/checklists/${cat.slug}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--slate-700)] hover:bg-slate-50 hover:text-[var(--navy)] transition-colors font-medium"
                            >
                              <span className="text-base select-none">{cat.icon}</span>
                              <span>{cat.title} Checklist</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Products */}
                  {filteredItems.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Supplies & Products
                      </h4>
                      <ul className="space-y-1">
                        {filteredItems.map((item, idx) => (
                          <li key={idx}>
                            <a
                              href={item.affiliateUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              onClick={() => {
                                trackAmazonClick(item.title, "Global Search Result", item.affiliateUrl);
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--slate-700)] hover:bg-slate-50 hover:text-[var(--navy)] transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base select-none">{item.icon}</span>
                                <span className="font-medium truncate">{item.title}</span>
                              </div>
                              <span className="ml-2 flex-shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 font-semibold uppercase">
                                {item.categorySlug === "celebrate-recovery" ? "CR" : item.categorySlug}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
