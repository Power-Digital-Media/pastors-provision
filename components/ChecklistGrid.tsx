"use client";

import { useState, useCallback } from "react";
import type { ChecklistItem } from "@/data/checklists";

interface Props {
  items: ChecklistItem[];
}

export default function ChecklistGrid({ items }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = useCallback((index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) =>
      prev.size === items.length
        ? new Set()
        : new Set(items.map((_, i) => i))
    );
  }, [items]);

  const openSelected = useCallback(() => {
    const urls = items
      .filter((_, i) => selected.has(i))
      .map((item) => item.affiliateUrl);

    // Open each in a new tab with a small stagger so browsers don't block them
    urls.forEach((url, i) => {
      setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), i * 300);
    });
  }, [items, selected]);

  const count = selected.size;
  const allSelected = count === items.length;

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={toggleAll}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[var(--slate-700)] shadow-sm transition-all hover:border-[var(--gold)] hover:shadow-md active:scale-[0.97]"
        >
          {/* Checkbox icon */}
          <span
            className={`flex h-4.5 w-4.5 items-center justify-center rounded border-2 transition-colors ${
              allSelected
                ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                : "border-slate-300"
            }`}
          >
            {allSelected && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            )}
          </span>
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        {count > 0 && (
          <span className="text-sm text-[var(--slate-500)]">
            {count} item{count !== 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      {/* ── Item Grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const isChecked = selected.has(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`group relative flex cursor-pointer flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                isChecked
                  ? "border-[var(--gold)] bg-[var(--gold)]/[0.04] ring-1 ring-[var(--gold)]/30"
                  : "border-slate-200 bg-white hover:border-[var(--gold)]"
              }`}
            >
              {/* Checkbox */}
              <span
                className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  isChecked
                    ? "border-[var(--gold)] bg-[var(--gold)] text-white scale-110"
                    : "border-slate-300 group-hover:border-[var(--gold)]/60"
                }`}
              >
                {isChecked && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </span>

              <div className="mb-3 flex items-center gap-3 pr-6">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-sm font-semibold text-[var(--slate-800)] leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--slate-500)] leading-relaxed flex-1">
                {item.description}
              </p>
              {/* Individual Amazon link (secondary action) */}
              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                onClick={(e) => e.stopPropagation()}
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[var(--gold)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                Restock This Item
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          );
        })}
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
          count > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[var(--navy)]/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-sm font-bold text-white">
                {count}
              </span>
              <span className="text-sm text-slate-200">
                item{count !== 1 ? "s" : ""} selected
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelected(new Set())}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={openSelected}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-yellow-900/30 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Open {count} in Amazon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
