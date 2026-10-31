"use client";

import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, PackageX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  onReset?: () => void;
}

export function ProductGrid({
  products,
  isLoading,
  isError,
  onRetry,
  onReset,
}: ProductGridProps) {
  // Loading Skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="aspect-[3/4] w-full rounded-[1.75rem]" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-1/3 rounded-full" />
              <Skeleton className="h-4 w-4/5 rounded-full" />
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-4 w-1/4 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800">
        <div className="size-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mb-4">
          <RefreshCw className="size-7" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Unable to Load Collection
        </h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
          There was an issue communicating with the catalog service. Please check your network connection and try again.
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-6 rounded-full px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950"
          >
            Retry Loading
          </Button>
        )}
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800">
        <div className="size-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-4">
          <PackageX className="size-7" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          No Pieces Found
        </h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
          We couldn&apos;t find any items matching your selected criteria. Try adjusting your keyword or category filters.
        </p>
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="mt-6 rounded-full px-6 py-2.5 border-neutral-300 dark:border-neutral-700"
          >
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  // Product Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
