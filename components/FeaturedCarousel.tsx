"use client";

import { useState } from "react";
import { ChecklistItem, ChecklistItemVariation } from "@/data/checklists";
import { trackCopyQuery } from "@/utils/analytics";

interface FeaturedCarouselProps {
  featuredItem: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
  onTrackAmazonClick: (title: string, url: string) => void;
}

export default function FeaturedCarousel({
  featuredItem,
  isChecked,
  onToggle,
  onTrackAmazonClick,
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  const variations = featuredItem.variations || [];
  if (variations.length === 0) return null;

  const currentVar = variations[currentIndex];
  const spritePath = featuredItem.spritePath || "/images/featured-cups.png";

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % variations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + variations.length) % variations.length);
  };

  const handleCopy = async () => {
    try {
      // Build a nice descriptive search query
      const query = currentVar.title;
      await navigator.clipboard.writeText(query);
      setCopySuccess(true);
      trackCopyQuery(currentVar.title);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy search query", err);
    }
  };

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-white via-white to-amber-50/20 shadow-md transition-all duration-300 hover:shadow-lg no-print">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50/40 px-5 py-3">
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-800">
          <svg className="h-3.5 w-3.5 fill-amber-500 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Featured Supply Showcase
        </span>
        <span className="text-xs font-medium text-[var(--slate-500)]">
          {currentIndex + 1} of {variations.length} styles
        </span>
      </div>

      <div className="relative flex flex-col items-stretch p-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Navigation arrows absolute overlay (centered vertically on image area) */}
        <div className="absolute top-1/2 left-3 right-3 z-10 flex -translate-y-1/2 justify-between pointer-events-none sm:left-4 sm:right-auto sm:w-[220px]">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--slate-700)] shadow-md border border-slate-100 hover:bg-slate-50 active:scale-90 pointer-events-auto transition-all cursor-pointer"
            aria-label="Previous style"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--slate-700)] shadow-md border border-slate-100 hover:bg-slate-50 active:scale-90 pointer-events-auto transition-all cursor-pointer"
            aria-label="Next style"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Left: Sprite Cropped Product Visuals */}
        <div className="mx-auto mb-6 flex h-40 w-48 flex-shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden sm:mb-0">
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <img
              src={spritePath}
              alt={currentVar.title}
              className="absolute max-w-none transition-all duration-300 ease-out"
              style={{
                width: "500%", // 5 images side-by-side
                left: `-${currentVar.spriteIndex * 100}%`,
                top: 0,
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Right: Content details & actions */}
        <div className="flex-grow pl-0 sm:pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-[var(--slate-800)] sm:text-lg">
              {currentVar.title}
            </h3>
            {currentVar.asin && (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[var(--slate-500)] uppercase">
                ASIN: {currentVar.asin}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[var(--slate-500)] sm:text-sm">
            {currentVar.description}
          </p>

          {/* Action Row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Sync add to checklist toggle */}
            <button
              onClick={onToggle}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold cursor-pointer active:scale-95 transition-all ${
                isChecked
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-slate-200 text-[var(--slate-700)] hover:bg-slate-50"
              }`}
            >
              {isChecked ? (
                <>
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Added to Checklist</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Add to Checklist</span>
                </>
              )}
            </button>

            {/* Amazon CTA */}
            <a
              href={currentVar.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackAmazonClick(currentVar.title, currentVar.affiliateUrl)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0c14b] border border-[#a88734] hover:bg-[#f4d078] text-[#111] px-3.5 py-2 text-xs font-semibold cursor-pointer active:scale-95 transition-all shadow-sm"
            >
              <svg className="h-4 w-4 text-[#111]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span>Buy on Amazon</span>
            </a>

            {/* Copy Search Keyword Trigger */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[var(--slate-700)] cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
            >
              {copySuccess ? (
                <>
                  <svg className="h-4 w-4 stroke-green-600 stroke-[3px]" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-green-600 font-bold">Query Copied!</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0A2.25 2.25 0 0 1 13.5 5.25h-3a2.25 2.25 0 0 1-2.166-1.638m7.332 0a2.25 2.25 0 0 0-3.478-.397l-12 12a2.25 2.25 0 0 0-.62 1.104l-.994 4.47a.75.75 0 0 0 .901.902l4.47-.994a2.25 2.25 0 0 0 1.104-.62l12-12a2.25 2.25 0 0 0-.397-3.478Z" />
                  </svg>
                  <span>Copy Search Query</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
