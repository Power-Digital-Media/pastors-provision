"use client";

import { useState, useCallback } from "react";
import type { ChecklistItem } from "@/data/checklists";

interface Props {
  items: ChecklistItem[];
}

type Mode = "selecting" | "opening";

export default function ChecklistGrid({ items }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<Mode>("selecting");
  const [openIndex, setOpenIndex] = useState(0); // which selected item to open next
  const [opened, setOpened] = useState<Set<number>>(new Set()); // tracks which have been opened

  // Ordered list of selected indices
  const selectedList = Array.from(selected).sort((a, b) => a - b);

  const toggle = useCallback((index: number) => {
    if (mode !== "selecting") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, [mode]);

  const toggleAll = useCallback(() => {
    if (mode !== "selecting") return;
    setSelected((prev) =>
      prev.size === items.length
        ? new Set()
        : new Set(items.map((_, i) => i))
    );
  }, [items, mode]);

  const startOpening = useCallback(() => {
    setMode("opening");
    setOpenIndex(0);
    setOpened(new Set());
  }, []);

  const handleItemOpened = useCallback(() => {
    setOpened((prev) => new Set(prev).add(selectedList[openIndex]));
    if (openIndex + 1 < selectedList.length) {
      setOpenIndex(openIndex + 1);
    } else {
      // All done — small delay then reset
      setTimeout(() => {
        setMode("selecting");
        setSelected(new Set());
        setOpenIndex(0);
        setOpened(new Set());
      }, 2000);
    }
  }, [openIndex, selectedList]);

  const cancelOpening = useCallback(() => {
    setMode("selecting");
    setOpenIndex(0);
    setOpened(new Set());
  }, []);

  const count = selected.size;
  const allSelected = count === items.length;
  const allOpened = mode === "opening" && opened.size === selectedList.length;
  const currentItem = mode === "opening" && !allOpened ? items[selectedList[openIndex]] : null;
  const currentStep = openIndex + 1;

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={toggleAll}
          disabled={mode === "opening"}
          className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[var(--slate-700)] shadow-sm transition-all hover:border-[var(--gold)] hover:shadow-md active:scale-[0.97] ${
            mode === "opening" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
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

        {count > 0 && mode === "selecting" && (
          <span className="text-sm text-[var(--slate-500)]">
            {count} item{count !== 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      {/* ── Item Grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const isChecked = selected.has(i);
          const isOpened = opened.has(i);
          const isNext = mode === "opening" && selectedList[openIndex] === i;
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`group relative flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 ${
                mode === "selecting" ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5" : ""
              } ${
                isNext
                  ? "border-[var(--gold)] bg-[var(--gold)]/[0.08] ring-2 ring-[var(--gold)]/50 scale-[1.01]"
                  : isOpened
                    ? "border-green-400 bg-green-50/50 opacity-60"
                    : isChecked
                      ? "border-[var(--gold)] bg-[var(--gold)]/[0.04] ring-1 ring-[var(--gold)]/30"
                      : "border-slate-200 bg-white hover:border-[var(--gold)]"
              }`}
            >
              {/* Status indicator */}
              <span
                className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  isOpened
                    ? "border-green-500 bg-green-500 text-white"
                    : isChecked
                      ? "border-[var(--gold)] bg-[var(--gold)] text-white scale-110"
                      : "border-slate-300 group-hover:border-[var(--gold)]/60"
                }`}
              >
                {(isChecked || isOpened) && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </span>

              {/* "UP NEXT" badge */}
              {isNext && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Open This →
                </span>
              )}

              <div className="mb-3 flex items-center gap-3 pr-6">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-sm font-semibold text-[var(--slate-800)] leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--slate-500)] leading-relaxed flex-1">
                {item.description}
              </p>
              {/* Individual Amazon link */}
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

            {/* ── SELECTING MODE ── */}
            {mode === "selecting" && (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-sm font-bold text-white">
                    {count}
                  </span>
                  <span className="text-sm text-slate-200">
                    item{count !== 1 ? "s" : ""} ready to open
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
                    onClick={startOpening}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-yellow-900/30 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Open {count} on Amazon
                  </button>
                </div>
              </>
            )}

            {/* ── OPENING MODE ── */}
            {mode === "opening" && !allOpened && currentItem && (
              <>
                <div className="flex items-center gap-3">
                  {/* Progress dots */}
                  <div className="flex items-center gap-1">
                    {selectedList.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          idx < openIndex
                            ? "bg-green-400"
                            : idx === openIndex
                              ? "bg-[var(--gold)] animate-pulse"
                              : "bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-300">
                    {currentStep} of {selectedList.length}
                  </span>
                  <span className="text-sm font-medium text-white truncate max-w-[200px]">
                    {currentItem.icon} {currentItem.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={cancelOpening}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    Cancel
                  </button>
                  <a
                    href={currentItem.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={handleItemOpened}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-yellow-900/30 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl active:scale-[0.97]"
                  >
                    Open on Amazon
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </>
            )}

            {/* ── ALL DONE ── */}
            {mode === "opening" && allOpened && (
              <div className="flex w-full items-center justify-center gap-2 text-sm font-medium text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                All {selectedList.length} items opened — add them to your Amazon cart!
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
