"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { SearchModal } from "@/components/SearchModal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "New Arrivals", href: "/#catalog" },
  { name: "Tops & Hoodies", href: "/?category=tops#catalog" },
  { name: "Men", href: "/?category=mens-shirts#catalog" },
  { name: "Women", href: "/?category=womens-dresses#catalog" },
  { name: "Accessories", href: "/?category=sunglasses#catalog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Countdown timer state inspired by the reference top bar
  const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 40 });

  const { openCart, getTotalItems } = useCartStore();
  const { openWishlist, items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Countdown timer tick
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const totalCartItems = mounted ? getTotalItems() : 0;
  const totalWishlistItems = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Top Announcement Bar */}
        <div className="bg-neutral-950 text-white text-[11px] sm:text-xs tracking-wider border-b border-white/10 px-4 py-2 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2 text-neutral-400">
              <span className="flex items-center gap-1 font-semibold text-white">
                <Sparkles className="size-3 text-amber-400" />
                SPRING / WINTER SALE
              </span>
              <span>• Up to 40% off curated lookbook essentials</span>
            </div>

            <div className="mx-auto sm:mx-0 flex items-center gap-3">
              <span className="text-neutral-400">Ending in:</span>
              <div className="flex items-center gap-1 font-mono font-medium">
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}m
                </span>
                <span>:</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
              <Link
                href="/#catalog"
                className="hidden md:inline-flex items-center gap-1 text-white hover:text-neutral-300 font-semibold underline underline-offset-4 ml-2"
              >
                Shop Now <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={cn(
            "w-full transition-all duration-300 border-b",
            isScrolled
              ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-neutral-200/80 dark:border-neutral-800 shadow-xs py-3.5"
              : "bg-white/95 dark:bg-neutral-950/95 border-neutral-100 dark:border-neutral-800/60 py-4.5"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Mobile Menu Trigger + Brand Logo */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </button>

                <Link
                  href="/"
                  className="font-serif text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-neutral-950 dark:text-white transition-opacity hover:opacity-85"
                >
                  Rive
                </Link>
              </div>

              {/* Center: Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-xs font-semibold uppercase tracking-widest transition-colors py-1 relative",
                        isActive
                          ? "text-neutral-950 dark:text-white"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Right: Actions (Search, Wishlist, Bag) */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Search Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 transition-colors"
                  aria-label="Search products"
                >
                  <Search className="size-4.5" />
                  <span className="hidden sm:inline text-xs font-medium text-neutral-400">
                    Search...
                  </span>
                </button>

                {/* Wishlist Trigger */}
                <button
                  type="button"
                  onClick={openWishlist}
                  className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 transition-colors"
                  aria-label="Open wishlist"
                >
                  <Heart className="size-4.5" />
                  {totalWishlistItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50">
                      {totalWishlistItems}
                    </span>
                  )}
                </button>

                {/* Shopping Bag Trigger */}
                <button
                  type="button"
                  onClick={openCart}
                  className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all shadow-xs"
                  aria-label="Open shopping bag"
                >
                  <ShoppingBag className="size-4" />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide">
                    Bag
                  </span>
                  <span className="size-4.5 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/10 text-[10px] font-bold font-mono">
                    {totalCartItems}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex items-center gap-3 py-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <Search className="size-4" /> Search the collection
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openWishlist();
                    }}
                    className="flex items-center gap-3 py-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <Heart className="size-4 text-rose-500" /> Saved Pieces ({totalWishlistItems})
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global Search Modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
