"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, ArrowUpDown, Sparkles } from "lucide-react";

export function SearchResultsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [inputVal, setInputVal] = useState(queryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchResults = useCallback(async (query: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const endpoint = query.trim()
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}&limit=50`
        : `https://dummyjson.com/products?limit=30`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Search request failed");
      const data = await res.json();

      let list: Product[] = data.products || [];
      if (sortBy === "price-asc") {
        list = [...list].sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        list = [...list].sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        list = [...list].sort((a, b) => b.rating - a.rating);
      }

      setProducts(list);
      setTotalCount(data.total);
    } catch (err) {
      console.error("Search fetch error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    setInputVal(queryParam);
    fetchResults(queryParam);
  }, [queryParam, fetchResults]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    router.push(`/products/search?q=${encodeURIComponent(inputVal.trim())}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[70vh]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6 font-medium">
        <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3 text-neutral-300" />
        <span className="text-neutral-800 dark:text-neutral-200">Search</span>
        {queryParam && (
          <>
            <ChevronRight className="size-3 text-neutral-300" />
            <span className="truncate max-w-xs">&quot;{queryParam}&quot;</span>
          </>
        )}
      </nav>

      {/* Header and Search Form */}
      <div className="mb-10 pb-8 border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            <Sparkles className="size-3.5 text-neutral-500" />
            Catalog Search
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white mb-6">
            {queryParam ? (
              <>
                Results for &quot;
                <span className="italic font-light">{queryParam}</span>&quot;
              </>
            ) : (
              "Explore All Pieces"
            )}
          </h1>

          <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Search by product, category, or fabric..."
                className="pl-11 pr-4 py-6 text-sm rounded-full bg-neutral-100/80 dark:bg-neutral-900 border-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              />
            </div>
            <Button
              type="submit"
              className="rounded-full px-6 py-6 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 font-semibold text-xs tracking-wider uppercase shrink-0"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
          <span className="text-xs text-neutral-500 font-mono">
            {isLoading ? "Searching..." : `${totalCount} pieces found`}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="size-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full bg-neutral-100/80 dark:bg-neutral-900 border-none px-3.5 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => fetchResults(queryParam)}
        onReset={() => {
          setInputVal("");
          router.push("/products/search");
        }}
      />
    </div>
  );
}
