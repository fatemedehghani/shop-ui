import React, { Suspense } from "react";
import { Metadata } from "next";
import { SearchResultsClient } from "./SearchResultsClient";

export const metadata: Metadata = {
  title: "Search Results — Rive",
  description: "Search products in the Rive luxury fashion catalog",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent dark:border-white" />
          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">
            Searching Rive Catalog...
          </p>
        </div>
      }
    >
      <SearchResultsClient />
    </Suspense>
  );
}
