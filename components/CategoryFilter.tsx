"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FilterState {
  category: string;
  search: string;
  sortBy: string;
}

interface CategoryFilterProps {
  categories: { slug: string; name: string }[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount?: number;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="w-full space-y-6">
      {/* Search Bar & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input within catalog */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter current view by keyword..."
            className="pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-neutral-100/80 dark:bg-neutral-900 border-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Sort & Count Info */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {totalCount !== undefined && (
            <span className="text-xs text-neutral-400 font-mono">
              {totalCount} {totalCount === 1 ? "style" : "styles"}
            </span>
          )}

          <div className="flex items-center gap-2">
            <ArrowUpDown className="size-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-full bg-neutral-100/80 dark:bg-neutral-900 border-none px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-neutral-400 cursor-pointer"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Slider / Row */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                type="button"
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
