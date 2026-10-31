import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { CatalogSection } from "@/components/CatalogSection";
import { ArrowRight, Sparkles, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Compact Editorial Hero Section inspired by Reference Image */}
      <HeroSection />

      {/* Editorial "Best Selling" Featurette inspired by Reference Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            <Flame className="size-3.5 text-amber-500" />
            Seasonal Highlights
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            Best Selling
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-light">
            Stay cozy and stylish with our exclusive collection of best-selling hoodies, minimalist outerwear, and organic knitwear!
          </p>
        </div>

        {/* 3 High-fashion Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/?category=tops#catalog"
            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
              alt="Emerald Oversized Hoodie"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-300">
                  Exclusive Drop
                </span>
                <h3 className="text-lg font-serif font-medium leading-tight mt-1">
                  Emerald Cargo Hoodie
                </h3>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">$490.50</p>
              </div>
              <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>

          <Link
            href="/?category=tops#catalog"
            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
              alt="Forest Green Waffle Crew"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-300">
                  Organic Knit
                </span>
                <h3 className="text-lg font-serif font-medium leading-tight mt-1">
                  Forest Waffle Knit
                </h3>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">$385.00</p>
              </div>
              <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>

          <Link
            href="/?category=tops#catalog"
            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
              alt="Sage Relaxed Fleece"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-300">
                  Minimal Cut
                </span>
                <h3 className="text-lg font-serif font-medium leading-tight mt-1">
                  Sage Dropped Shoulder
                </h3>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">$420.00</p>
              </div>
              <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="inline-block size-8 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent dark:border-white" />
            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">
              Loading Rive Lookbook...
            </p>
          </div>
        }
      >
        <CatalogSection />
      </Suspense>
    </div>
  );
}
