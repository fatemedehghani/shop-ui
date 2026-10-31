"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  // Calculate original price if discount exists
  const hasDiscount = product.discountPercentage > 5;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  // Secondary image for hover effect
  const primaryImage = product.thumbnail || product.images[0];
  const secondaryImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : primaryImage;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleItem(product);
    if (added) {
      toast.success("Saved to Wishlist", {
        description: `${product.title} was added to your curated favorites.`,
      });
    } else {
      toast.info("Removed from Wishlist", {
        description: `${product.title} was removed from your wishlist.`,
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, "M", "Default");
    toast.success("Added to Shopping Bag", {
      description: `${product.title} is now in your bag.`,
    });
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-[#f4f4f5] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 transition-shadow duration-300 group-hover:shadow-xl">
        {/* Main Product Image with Hover Flip/Zoom */}
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className={cn(
              "object-cover object-center transition-all duration-700 ease-out",
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 group-hover:scale-105"
            )}
          />

          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.title} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                "object-cover object-center absolute inset-0 transition-all duration-700 ease-out",
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              )}
            />
          )}
        </Link>

        {/* Floating Top Floating Bar (Price Badge + Quick Action Icons) */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
          {/* Price Pill Tag */}
          <div className="pointer-events-auto rounded-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md px-3 py-1 text-xs font-semibold font-mono tracking-tight text-neutral-900 dark:text-white shadow-xs border border-neutral-200/40 dark:border-neutral-800">
            ${product.price.toFixed(2)}
          </div>

          {/* Quick Actions (Wishlist & Cart) */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleWishlistClick}
              className={cn(
                "size-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs backdrop-blur-md border",
                isFavorite
                  ? "bg-rose-50 border-rose-200 text-rose-500 fill-rose-500 dark:bg-rose-950/60 dark:border-rose-900"
                  : "bg-white/90 dark:bg-neutral-950/90 border-neutral-200/40 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-rose-500 hover:bg-white"
              )}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn("size-3.5 transition-transform active:scale-125", isFavorite && "fill-current")}
              />
            </button>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className="size-8 rounded-full bg-white/90 dark:bg-neutral-950/90 border border-neutral-200/40 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 flex items-center justify-center transition-all duration-200 shadow-xs"
              aria-label="Quick add to bag"
              title="Quick Add to Bag"
            >
              <ShoppingBag className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Hover Quick View Pill at Bottom of Image */}
        <div className="absolute bottom-3 inset-x-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 rounded-full bg-neutral-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-neutral-900 px-4 py-2 text-xs font-medium tracking-wide shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Eye className="size-3.5" />
            Quick View
          </Link>
        </div>

        {/* Discount Badge if available */}
        {hasDiscount && (
          <div className="absolute bottom-3 left-3.5 pointer-events-none group-hover:opacity-0 transition-opacity">
            <span className="rounded-full bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        )}
      </div>

      {/* Product Details info below card */}
      <div className="pt-3.5 pb-1 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
          <span className="uppercase tracking-wider truncate max-w-[70%]">
            {product.brand || product.category.replace(/-/g, " ")}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300 font-medium">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors line-clamp-1 tracking-tight"
        >
          {product.title}
        </Link>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 font-light">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs text-neutral-400 line-through font-mono">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
