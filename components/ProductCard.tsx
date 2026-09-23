"use client";

import { useState } from "react";
import { trackAmazonClick, trackCopyQuery } from "@/utils/analytics";

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  affiliateUrl: string;
}

export default function ProductCard({
  title,
  description,
  category,
  icon,
  affiliateUrl,
}: ProductCardProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    trackAmazonClick(title, category, affiliateUrl);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = new URL(affiliateUrl);
      const query = url.searchParams.get("k") || title;
      await navigator.clipboard.writeText(query);
      setCopied(true);
      trackCopyQuery(title);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy search query", err);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Image placeholder */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <span className="text-5xl select-none">{icon}</span>
        <span className="absolute top-3 left-3 rounded-full bg-[var(--navy)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white select-none">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-[var(--slate-800)] line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm text-[var(--slate-500)] line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={handleClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--navy-dark)] hover:shadow-md active:scale-[0.97]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Restock on Amazon
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-[var(--slate-600)] cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-[0.97]"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 stroke-green-600 stroke-[3px]" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-green-600">Copied search query!</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                </svg>
                <span>Copy Search Query</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


