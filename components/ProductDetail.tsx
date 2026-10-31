"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useWishlistStore } from "@/lib/store";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  ChevronRight,
  PackageCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const COLOR_SWATCHES = [
  { name: "Taupe", hex: "#b4a088" },
  { name: "Onyx Black", hex: "#1a1a1a" },
  { name: "Heather Grey", hex: "#8c8e92" },
  { name: "Logan Moss", hex: "#526251" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].name);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "reviews">("details");

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  // Discount calculation
  const hasDiscount = product.discountPercentage > 5;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success("Added to Shopping Bag", {
      description: `${quantity} × ${product.title} (${selectedSize} / ${selectedColor}) added to your bag.`,
    });
  };

  const handleToggleWishlist = () => {
    const added = toggleItem(product);
    if (added) {
      toast.success("Saved to Wishlist", {
        description: `${product.title} has been added to your favorites.`,
      });
    } else {
      toast.info("Removed from Wishlist", {
        description: `${product.title} has been removed from your favorites.`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 sm:mb-12 font-medium">
        <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3 text-neutral-300" />
        <Link
          href={`/?category=${product.category}#catalog`}
          className="capitalize hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          {product.category.replace(/-/g, " ")}
        </Link>
        <ChevronRight className="size-3 text-neutral-300" />
        <span className="text-neutral-800 dark:text-neutral-200 truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images.length > 0 ? product.images : [product.thumbnail]}
            title={product.title}
            discountPercentage={product.discountPercentage}
          />
        </div>

        {/* Right Column: Info & Purchase Controls (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {product.brand || product.category.replace(/-/g, " ")}
            </span>

            {/* Availability Status from API */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {product.availabilityStatus || (product.stock > 0 ? "In Stock" : "Backorder")} ({product.stock} units)
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white leading-tight">
            {product.title}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-4",
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-neutral-200 text-neutral-200 dark:fill-neutral-800 dark:text-neutral-800"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-neutral-400">
              ({product.reviews?.length || 12} customer reviews)
            </span>
          </div>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-mono text-3xl font-bold text-neutral-950 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="font-mono text-lg text-neutral-400 line-through">
                ${originalPrice}
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 text-xs font-semibold px-2.5 py-0.5">
                Save ${((product.price * product.discountPercentage) / 100).toFixed(2)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
            {product.description}
          </p>

          <Separator className="my-2" />

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Color: <strong className="text-neutral-950 dark:text-white">{selectedColor}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {COLOR_SWATCHES.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "group relative size-9 rounded-full flex items-center justify-center transition-all cursor-pointer",
                      isSelected
                        ? "ring-2 ring-neutral-950 ring-offset-2 dark:ring-white dark:ring-offset-neutral-950 scale-105"
                        : "opacity-80 hover:opacity-100"
                    )}
                    aria-label={`Select ${color.name}`}
                  >
                    <span
                      className="size-7 rounded-full shadow-inner border border-black/10 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check className="size-3.5 text-white drop-shadow-sm" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Size: <strong className="text-neutral-950 dark:text-white">{selectedSize}</strong>
              </span>
              <button
                type="button"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 text-[11px]"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border",
                      isSelected
                        ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white shadow-xs"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-medium text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={cn(
                  "size-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs",
                  isFavorite
                    ? "bg-rose-50 border-rose-200 text-rose-500 fill-rose-500 dark:bg-rose-950/60 dark:border-rose-900"
                    : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                )}
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn("size-5 transition-transform active:scale-125", isFavorite && "fill-current")}
                />
              </button>
            </div>

            {/* Primary Add to Bag Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-full py-7 text-sm font-semibold tracking-wide bg-neutral-950 hover:bg-neutral-800 text-white shadow-xl dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-transform active:scale-[0.99] gap-2.5"
            >
              <ShoppingBag className="size-4" />
              Add to Bag • ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Perks Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-neutral-500 border-t border-neutral-100 dark:border-neutral-800/80">
            <div className="flex flex-col items-center gap-1 py-2">
              <Truck className="size-4 text-neutral-600 dark:text-neutral-400" />
              <span>Complimentary Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <RotateCcw className="size-4 text-neutral-600 dark:text-neutral-400" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-2">
              <ShieldCheck className="size-4 text-neutral-600 dark:text-neutral-400" />
              <span>Certified Authentic</span>
            </div>
          </div>

          {/* Specification Tabs (Real DummyJSON API Data) */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={cn(
                  "pb-2.5 tracking-wider transition-colors border-b-2 -mb-px",
                  activeTab === "details"
                    ? "border-neutral-950 text-neutral-950 dark:border-white dark:text-white"
                    : "border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                )}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={cn(
                  "pb-2.5 tracking-wider transition-colors border-b-2 -mb-px",
                  activeTab === "shipping"
                    ? "border-neutral-950 text-neutral-950 dark:border-white dark:text-white"
                    : "border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                )}
              >
                Delivery & Returns
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={cn(
                  "pb-2.5 tracking-wider transition-colors border-b-2 -mb-px",
                  activeTab === "reviews"
                    ? "border-neutral-950 text-neutral-950 dark:border-white dark:text-white"
                    : "border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                )}
              >
                Reviews ({product.reviews?.length || 0})
              </button>
            </div>

            <div className="pt-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {activeTab === "details" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-400">SKU</span>
                    <span className="font-mono text-neutral-800 dark:text-neutral-200 font-medium">
                      {product.sku || `RIVE-${product.id}092`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                    <span className="text-neutral-400">Category</span>
                    <span className="capitalize text-neutral-800 dark:text-neutral-200 font-medium">
                      {product.category.replace(/-/g, " ")}
                    </span>
                  </div>
                  {product.dimensions && (
                    <div className="grid grid-cols-2 py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                      <span className="text-neutral-400">Dimensions</span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200">
                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="grid grid-cols-2 py-1">
                      <span className="text-neutral-400">Weight</span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200">
                        {product.weight} kg
                      </span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2.5">
                  <p>
                    <strong>Shipping:</strong> {product.shippingInformation || "Standard express courier delivery in 3-5 business days."}
                  </p>
                  <p>
                    <strong>Warranty:</strong> {product.warrantyInformation || "1-year limited atelier warranty on materials and craftsmanship."}
                  </p>
                  <p>
                    <strong>Returns:</strong> {product.returnPolicy || "Complimentary returns within 30 days of receiving your package."}
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-3">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {rev.reviewerName}
                          </span>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="size-3 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 italic">
                          &quot;{rev.comment}&quot;
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block font-mono">
                          {new Date(rev.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-400">No verified reviews yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 sm:mt-28 border-t border-neutral-100 dark:border-neutral-800 pt-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                Curated Recommendations
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-950 dark:text-white">
                You May Also Like
              </h2>
            </div>
            <Link
              href={`/?category=${product.category}#catalog`}
              className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
            >
              View More <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
