"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const POPULAR_SEARCHES = [
  "Hoodie",
  "Tops",
  "Shirt",
  "Dress",
  "Sunglasses",
  "Watch",
  "Bag",
  "Shoes",
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            query.trim()
          )}&limit=6`
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onOpenChange(false);
    router.push(`/products/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 shadow-2xl">
        <DialogTitle className="sr-only">Search Products</DialogTitle>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative border-b border-neutral-100 dark:border-neutral-800 p-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 size-5 text-neutral-400" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, shoes, accessories, styles..."
              className="pl-12 pr-12 py-6 text-base rounded-full bg-neutral-50 dark:bg-neutral-900 border-none shadow-none focus-visible:ring-1 focus-visible:ring-neutral-400"
            />
            {loading && (
              <Loader2 className="absolute right-4 size-5 text-neutral-400 animate-spin" />
            )}
          </div>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Popular searches suggestions */}
          {!query && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                <Sparkles className="size-3.5 text-neutral-500" />
                Trending Collections & Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectPopular(term)}
                    className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                <span>
                  {results.length > 0
                    ? `Results for "${query}"`
                    : loading
                    ? "Searching..."
                    : `No results for "${query}"`}
                </span>
                {results.length > 0 && (
                  <button
                    onClick={handleSubmit}
                    className="text-xs font-medium text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
                  >
                    View all results <ArrowRight className="size-3" />
                  </button>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-neutral-100 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src={product.thumbnail || product.images[0]}
                          alt={product.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-neutral-400 capitalize">
                          {product.category.replace(/-/g, " ")}
                        </p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                          {product.title}
                        </p>
                        <p className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                !loading && (
                  <div className="py-8 text-center text-sm text-neutral-400">
                    No matching pieces found. Try searching for &quot;hoodie&quot;, &quot;shirt&quot;, or &quot;dress&quot;.
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
