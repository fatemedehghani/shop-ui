"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getShippingFee,
    getTotal,
    getTotalItems,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeeded = (freeShippingThreshold - subtotal).toFixed(2);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      closeCart();
      toast.success("Order Placed Successfully!", {
        description:
          "Thank you for your purchase from Rive. Your luxury order confirmation has been dispatched.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md lg:max-w-lg bg-white dark:bg-neutral-950"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-neutral-800 dark:text-neutral-200" />
              <SheetTitle className="text-xl font-medium tracking-tight">
                Shopping Bag
              </SheetTitle>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                {totalItems}
              </span>
            </div>
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="mt-3 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                  <Truck className="size-3.5" />
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Complimentary worldwide shipping unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-neutral-900 dark:text-white">${amountNeeded}</strong> for free shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {progressToFreeShipping}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-full bg-neutral-900 transition-all duration-500 ease-out dark:bg-white"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="relative mb-6 flex size-20 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <ShoppingBag className="size-8 text-neutral-400" />
                <Sparkles className="absolute -top-1 -right-1 size-5 text-amber-500/80 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Your bag is currently empty
              </h3>
              <p className="mt-2 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                Explore our new season lookbook and discover modern luxury silhouettes tailored for you.
              </p>
              <Button
                onClick={closeCart}
                className="mt-6 rounded-full px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900"
              >
                Discover Collection
              </Button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-800/80">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pt-4 first:pt-0 group transition-opacity"
                >
                  {/* Thumbnail */}
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800">
                    <Image
                      src={item.product.thumbnail || item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={closeCart}
                          className="text-sm font-medium leading-tight text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                        <span className="capitalize">{item.product.category.replace(/-/g, " ")}</span>
                        {item.selectedSize && (
                          <>
                            <span>•</span>
                            <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[11px]">
                              Size: {item.selectedSize}
                            </span>
                          </>
                        )}
                        {item.selectedColor && item.selectedColor !== "Default" && (
                          <>
                            <span>•</span>
                            <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
                              {item.selectedColor}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="size-7 flex items-center justify-center text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                          title="Decrease"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="size-7 flex items-center justify-center text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                          title="Increase"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[11px] text-neutral-400 font-mono">
                            ${item.product.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-neutral-100 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-950/60">
            <div className="w-full space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span className="flex items-center gap-1">
                    Shipping
                    {shippingFee === 0 && (
                      <span className="text-[10px] uppercase font-semibold text-emerald-600 tracking-wider">
                        Complimentary
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-neutral-900 dark:text-white">
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-semibold text-neutral-900 dark:text-white">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full rounded-full py-6 text-sm font-medium tracking-wide bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg transition-transform active:scale-[0.99] dark:bg-white dark:text-neutral-950"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3.5 text-neutral-500" /> Secure Checkout
                </span>
                <span>•</span>
                <span>30-Day Effortless Returns</span>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
