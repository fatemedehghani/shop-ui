"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/api";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowDown } from "lucide-react";

// Curated fashion categories matching DummyJSON's fashion endpoints
const FASHION_CATEGORIES = [
  { slug: "all", name: "All Pieces" },
  { slug: "tops", name: "Tops & Hoodies" },
  { slug: "mens-shirts", name: "Men's Shirts" },
  { slug: "womens-dresses", name: "Women's Dresses" },
  { slug: "womens-bags", name: "Bags & Leather" },
  { slug: "sunglasses", name: "Eyewear" },
  { slug: "mens-shoes", name: "Men's Footwear" },
  { slug: "womens-shoes", name: "Women's Footwear" },
  { slug: "mens-watches", name: "Horology" },
  { slug: "womens-jewellery", name: "Fine Jewelry" },
  { slug: "beauty", name: "Beauty" },
  { slug: "fragrances", name: "Fragrances" },
];

export function CatalogSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const [sortBy, setSortBy] = useState("featured");

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(24);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    if (categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch products from DummyJSON
  const fetchProductList = useCallback(
    async (resetLimit = false) => {
      const currentLimit = resetLimit ? 24 : limit;
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await getProducts({
          limit: currentLimit,
          skip: 0,
          category: activeCategory,
          search: debouncedSearch,
        });

        let list = response.products || [];

        // Client-side sorting for refined ordering
        if (sortBy === "price-asc") {
          list = [...list].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
          list = [...list].sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          list = [...list].sort((a, b) => b.rating - a.rating);
        }

        setProducts(list);
        setTotalCount(response.total);
        setHasMore(response.total > list.length);
      } catch (err) {
        console.error("Failed to load products:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [activeCategory, debouncedSearch, sortBy, limit]
  );

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  // Handle category change
  const handleSelectCategory = (catSlug: string) => {
    setActiveCategory(catSlug);
    setSearchQuery("");
    setDebouncedSearch("");
    setLimit(24);

    // Update URL shallowly
    if (catSlug === "all") {
      router.push("/#catalog", { scroll: false });
    } else {
      router.push(`/?category=${catSlug}#catalog`, { scroll: false });
    }
  };

  // Load more
  const handleLoadMore = async () => {
    setLoadingMore(true);
    const newLimit = limit + 12;
    setLimit(newLimit);

    try {
      const response = await getProducts({
        limit: newLimit,
        skip: 0,
        category: activeCategory,
        search: debouncedSearch,
      });

      let list = response.products || [];
      if (sortBy === "price-asc") {
        list = [...list].sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        list = [...list].sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        list = [...list].sort((a, b) => b.rating - a.rating);
      }

      setProducts(list);
      setHasMore(response.total > list.length);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setDebouncedSearch("");
    setSortBy("featured");
    setLimit(24);
    router.push("/#catalog", { scroll: false });
  };

  const currentCategoryName =
    FASHION_CATEGORIES.find((c) => c.slug === activeCategory)?.name || "Collection";

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
            <Sparkles className="size-3.5 text-neutral-500" />
            Curated Catalog
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            {activeCategory === "all" ? "The New Lookbook" : currentCategoryName}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 font-light max-w-xl">
            {activeCategory === "tops"
              ? "Stay cozy and stylish with our exclusive collection of architectural hoodies and minimal fleece wear."
              : "Explore our latest seasonal silhouettes, crafted with precision from high-grade organic fibers."}
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-8">
        <CategoryFilter
          categories={FASHION_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={totalCount}
        />
      </div>

      {/* Product Grid with Skeletons / Empty / Error */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => fetchProductList()}
        onReset={handleResetFilters}
      />

      {/* Load More Button */}
      {!isLoading && !isError && hasMore && (
        <div className="mt-14 flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            className="rounded-full px-8 py-6 text-xs font-semibold tracking-widest uppercase border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:hover:bg-white dark:hover:text-neutral-950 transition-all shadow-xs gap-2"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading More Pieces...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Load More Styles <ArrowDown className="size-3.5" />
              </span>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
