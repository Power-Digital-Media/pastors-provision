"use client";

import React, { useState } from "react";
import { trackAmazonClick, trackCopyQuery } from "@/utils/analytics";

interface ChecklistItem {
  title: string;
  description: string;
  icon: string;
  affiliateUrl: string;
}

interface ChecklistItemRowProps {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
}

export default function ChecklistItemRow({
  item,
  isChecked,
  onToggle,
}: ChecklistItemRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  const handleCardClick = () => {
    trackAmazonClick(item.title, "Checklist Item", item.affiliateUrl);
  };

  const handleCopyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = new URL(item.affiliateUrl);
      const query = url.searchParams.get("k") || item.title;
      await navigator.clipboard.writeText(query);
      setCopied(true);
      trackCopyQuery(item.title);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy search query", err);
    }
  };

  return (
    <a
      href={item.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={handleCardClick}
      className={`group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        isChecked
          ? "border-slate-100 bg-slate-50/50 opacity-60 hover:opacity-85"
          : "border-slate-200 bg-white hover:border-[var(--gold)]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5 select-none">{item.icon}</span>
          <h3
            className={`text-sm font-semibold leading-snug transition-colors ${
              isChecked
                ? "text-[var(--slate-400)] line-through"
                : "text-[var(--slate-800)]"
            }`}
          >
            {item.title}
          </h3>
        </div>

        {/* Custom Premium Checkbox */}
        <button
          onClick={handleCheckboxClick}
          type="button"
          aria-label={isChecked ? "Mark as uncompleted" : "Mark as completed"}
          className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition-all duration-150 active:scale-90 ${
            isChecked
              ? "border-[var(--gold)] bg-[var(--gold)] text-white"
              : "border-slate-300 bg-white hover:border-[var(--gold)]"
          }`}
        >
          {isChecked && (
            <svg
              className="h-3 w-3 stroke-white stroke-[3px]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          )}
        </button>
      </div>

      <p
        className={`text-xs leading-relaxed flex-1 transition-colors ${
          isChecked ? "text-[var(--slate-400)]" : "text-[var(--slate-500)]"
        }`}
      >
        {item.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`flex items-center gap-1.5 text-xs font-semibold transition-opacity duration-200 ${
            isChecked ? "text-[var(--slate-400)]" : "text-[var(--gold)] opacity-0 group-hover:opacity-100"
          }`}
        >
          {isChecked ? "Restocked on Amazon" : "Restock This Item"}
          {!isChecked && (
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
          )}
        </span>

        {/* Copy search query button inside the card */}
        <button
          onClick={handleCopyClick}
          className={`z-10 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-[var(--slate-600)] cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-95 ${
            isChecked ? "opacity-40" : ""
          }`}
        >
          {copied ? "Copied!" : "Copy Query"}
        </button>
      </div>
    </a>
  );
}

