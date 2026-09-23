"use client";

import { useState, useEffect } from "react";
import ChecklistItemRow from "./ChecklistItemRow";
import FeaturedCarousel from "./FeaturedCarousel";
import { ChecklistItem } from "@/data/checklists";
import { trackShareChecklist, trackCartCheckout, trackAmazonClick } from "@/utils/analytics";

interface InteractiveChecklistProps {
  slug: string;
  items: ChecklistItem[];
}

export default function InteractiveChecklist({
  slug,
  items,
}: InteractiveChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Load from localStorage AND URL parameters on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCheckedStr = urlParams.get("checked");
      let urlChecked: Record<string, boolean> = {};

      if (urlCheckedStr) {
        urlCheckedStr.split(",").forEach((idx) => {
          urlChecked[`${slug}-${idx}`] = true;
        });
      }

      const stored = localStorage.getItem(`checklist-${slug}`);
      const localChecked = stored ? JSON.parse(stored) : {};

      // Merge both states (checked in either takes precedence)
      const mergedChecked = { ...localChecked, ...urlChecked };
      setCheckedItems(mergedChecked);
    } catch (e) {
      console.error("Error reading checklist state", e);
    }
    setIsLoaded(true);
  }, [slug]);

  // Update URL search parameters to keep links shareable
  const updateUrlParams = (newChecked: Record<string, boolean>) => {
    try {
      const checkedIndices = Object.keys(newChecked)
        .filter((key) => key.startsWith(`${slug}-`) && newChecked[key])
        .map((key) => key.replace(`${slug}-`, ""));

      const url = new URL(window.location.href);
      if (checkedIndices.length > 0) {
        url.searchParams.set("checked", checkedIndices.join(","));
      } else {
        url.searchParams.delete("checked");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      console.error("Error updating URL params", e);
    }
  };

  // Toggle item
  const handleToggle = (index: number) => {
    const key = `${slug}-${index}`;
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    updateUrlParams(newChecked);

    try {
      localStorage.setItem(`checklist-${slug}`, JSON.stringify(newChecked));
    } catch (e) {
      console.error("Error saving localStorage", e);
    }
  };

  // Reset checklist
  const handleReset = () => {
    setCheckedItems({});
    
    // Clear URL params
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("checked");
      window.history.replaceState({}, "", url.toString());
      localStorage.removeItem(`checklist-${slug}`);
    } catch (e) {
      console.error("Error resetting checklist state", e);
    }
  };

  const totalItems = items.length;
  const checkedKeys = Object.keys(checkedItems).filter(
    (key) => key.startsWith(`${slug}-`) && checkedItems[key]
  );
  const checkedCount = checkedKeys.length;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const checkedAsinCount = items.filter(
    (item, idx) => checkedItems[`${slug}-${idx}`] && item.asin
  ).length;

  // Find featured item details
  const featuredItem = items.find((item) => item.featured);
  const featuredIndex = items.findIndex((item) => item.featured);
  const isFeaturedChecked = featuredIndex !== -1 ? !!checkedItems[`${slug}-${featuredIndex}`] : false;
  const handleToggleFeatured = () => {
    if (featuredIndex !== -1) {
      handleToggle(featuredIndex);
    }
  };

  // Checkout Amazon Remote Cart
  const handleAmazonCheckout = () => {
    const checkedAsinItems = items
      .map((item, idx) => ({ item, idx }))
      .filter(({ idx }) => checkedItems[`${slug}-${idx}`] && items[idx].asin);

    if (checkedAsinItems.length === 0) return;

    // Track checkout event in GA4
    trackCartCheckout(slug, checkedAsinItems.length);

    // Build Amazon Remote Cart Add URL
    const baseUrl = "https://www.amazon.com/gp/aws/cart/add.html";
    const params = new URLSearchParams();
    params.set("AssociateTag", "powerdigital1-20");

    checkedAsinItems.forEach(({ item }, index) => {
      params.set(`ASIN.${index + 1}`, item.asin!);
      params.set(`Quantity.${index + 1}`, "1");
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  // Share via Link Copy
  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      trackShareChecklist(slug, "link");
      setTimeout(() => setShareCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy link", e);
    }
  };

  // Share via Email mailto
  const handleEmailShare = () => {
    const checkedItemsList = items
      .map((item, idx) => ({ item, idx }))
      .filter(({ idx }) => checkedItems[`${slug}-${idx}`])
      .map(({ item }) => `- ${item.title} (${item.description})`);

    const checklistTitle = slug.charAt(0).toUpperCase() + slug.slice(1) + " Restock Checklist";
    const subject = encodeURIComponent(`${checklistTitle} — Supplies Needed`);
    
    const bodyText = `Hi,

Here are the supplies we need to order for our ${slug} department:

${checkedItemsList.length > 0 ? checkedItemsList.join("\n") : "(No items were checked yet)"}

You can view the full checklist and restock them directly here:
${window.location.href}

Thanks!`;

    const body = encodeURIComponent(bodyText);
    trackShareChecklist(slug, "email");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Trigger print
  const handlePrint = () => {
    trackShareChecklist(slug, "print");
    window.print();
  };

  return (
    <div>
      {/* Progress bar section */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm no-print">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[var(--slate-800)]">
              Your Checklist Progress
            </h3>
            <p className="text-xs text-[var(--slate-500)] mt-0.5">
              Check items off as you stock your inventory or complete orders.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[var(--slate-700)]">
              {isLoaded ? `${checkedCount} of ${totalItems}` : "Loading..."}{" "}
              {isLoaded && `(${progressPercent}%)`}
            </span>
            {isLoaded && checkedCount > 0 && (
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer active:scale-95 transition-all"
              >
                Reset Checklist
              </button>
            )}
          </div>
        </div>

        {/* Progress Line */}
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--gold)] transition-all duration-300 ease-out"
            style={{ width: `${isLoaded ? progressPercent : 0}%` }}
          />
        </div>
      </div>

      {/* Featured Carousel */}
      {isLoaded && featuredItem && (
        <FeaturedCarousel
          featuredItem={featuredItem}
          isChecked={isFeaturedChecked}
          onToggle={handleToggleFeatured}
          onTrackAmazonClick={(title, url) => trackAmazonClick(title, slug, url)}
        />
      )}

      {/* Action / Sharing Buttons */}
      {isLoaded && (
        <div className="mb-8 flex flex-wrap items-center gap-2 no-print">
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[var(--slate-700)] cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
          >
            {shareCopied ? (
              <>
                <svg className="h-4 w-4 stroke-green-600 stroke-[3px]" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-green-600 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                <span>Share Completed List</span>
              </>
            )}
          </button>

          {checkedCount > 0 && (
            <button
              onClick={handleEmailShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[var(--slate-700)] cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
            >
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>Email Order to Admin ({checkedCount})</span>
            </button>
          )}

          {checkedAsinCount > 0 && (
            <button
              onClick={handleAmazonCheckout}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0c14b] border border-[#a88734] hover:bg-[#f4d078] text-[#111] px-3.5 py-2 text-xs font-semibold cursor-pointer active:scale-95 transition-all shadow-sm"
            >
              <svg className="h-4 w-4 text-[#111]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span>Add {checkedAsinCount} Checked to Amazon Cart</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[var(--slate-700)] cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
          >
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229.252A2.25 2.25 0 0 1 18 19.828V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.172c0-.58-.23-1.14-.634-1.545L5.13 16.24M12 10.5V2.25m-3 3h6" />
            </svg>
            <span>Print Sheet</span>
          </button>
        </div>
      )}

      {/* Grid of items */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-2">
        {items.map((item, i) => {
          const key = `${slug}-${i}`;
          const isChecked = isLoaded ? !!checkedItems[key] : false;
          return (
            <ChecklistItemRow
              key={i}
              item={item}
              isChecked={isChecked}
              onToggle={() => handleToggle(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
