"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  title: string;
  description: string;
  category: string;
  icon: string;
  affiliateUrl: string;
}

interface ProductGridWithFiltersProps {
  products: Product[];
}

export default function ProductGridWithFilters({ products }: ProductGridWithFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Category Pills & Search */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 ${
                selectedCategory === cat
                  ? "bg-[var(--navy)] text-white shadow-md"
                  : "bg-white text-[var(--slate-600)] border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat === "CR" ? "Celebrate Recovery" : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 pl-10 text-sm outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] text-[var(--slate-800)]"
          />
          <svg
            className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400"
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
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-xl bg-white border border-slate-200 p-8 shadow-sm">
          <span className="text-4xl">🔍</span>
          <p className="mt-4 text-sm font-medium text-[var(--slate-500)]">
            No products found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
