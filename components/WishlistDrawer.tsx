"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/lib/store";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";

export function WishlistDrawer() {
  const [mounted, setMounted] = useState(false);
  const { items, isWishlistOpen, closeWishlist, removeItem, clearWishlist } =
    useWishlistStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMoveToCart = (product: Product) => {
    addItem(product, 1);
    removeItem(product.id);
    toast.success("Moved to Shopping Bag", {
      description: `${product.title} has been transferred to your bag.`,
    });
  };

  return (
    <Sheet
      open={isWishlistOpen}
      onOpenChange={(open) => !open && closeWishlist()}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md lg:max-w-lg bg-white dark:bg-neutral-950"
      >
        <SheetHeader className="p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="size-5 fill-rose-500 text-rose-500" />
              <SheetTitle className="text-xl font-medium tracking-tight">
                Wishlist
              </SheetTitle>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                {items.length}
              </span>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <Heart className="size-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Your wishlist is empty
              </h3>
              <p className="mt-2 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                Tap the heart on any piece to save your favorite luxury styles for later.
              </p>
              <Button
                onClick={closeWishlist}
                className="mt-6 rounded-full px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900"
              >
                Explore Catalog
              </Button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-800">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 pt-4 first:pt-0 group transition-all"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800">
                    <Image
                      src={product.thumbnail || product.images[0]}
                      alt={product.title}
                      fill
                      sizes="96px"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeWishlist}
                          className="text-sm font-medium leading-tight text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                        <span className="capitalize">{product.category.replace(/-/g, " ")}</span>
                        <span>•</span>
                        <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 rounded-full text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 gap-1.5"
                      >
                        <ShoppingBag className="size-3.5" />
                        Move to Bag
                      </Button>
                      <Link
                        href={`/products/${product.id}`}
                        onClick={closeWishlist}
                        className="rounded-full border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                        title="View Product"
                      >
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
