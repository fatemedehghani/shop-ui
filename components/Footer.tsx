"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    toast.success("Welcome to Rive Atelier", {
      description: "You have subscribed to our private seasonal previews.",
    });
    setEmail("");
  };

  return (
    <footer className="mt-24 sm:mt-32 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white">
      {/* Newsletter VIP Banner */}
      <div className="border-b border-white/10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              <Sparkles className="size-3.5 text-amber-400" />
              Private Lookbook Access
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
              Join the Rive Journal
            </h3>
            <p className="mt-2 text-sm text-neutral-400 font-light">
              Receive early editorial releases, invite-only runway previews, and 15% off your premiere purchase.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full max-w-md flex flex-col sm:flex-row gap-2"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="bg-white/10 border-white/15 text-white placeholder:text-neutral-400 rounded-full px-5 py-6 text-sm focus-visible:ring-1 focus-visible:ring-white"
            />
            <Button
              type="submit"
              className="rounded-full bg-white text-neutral-950 hover:bg-neutral-200 px-6 py-6 text-xs uppercase font-semibold tracking-wider shrink-0 transition-all"
            >
              {subscribed ? (
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" /> Subscribed
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Subscribe <ArrowRight className="size-3.5" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link
              href="/"
              className="font-serif text-3xl font-bold tracking-widest uppercase text-white hover:opacity-85 transition-opacity"
            >
              Rive
            </Link>
            <p className="mt-4 text-xs text-neutral-400 leading-relaxed font-light max-w-sm">
              Where style meets expression, trends inspire, and fashion thrives. Curating timeless silhouettes, architectural tailoring, and sustainable textiles for the modern wardrobe.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-neutral-400 font-mono">
              <span>PARIS</span>
              <span>•</span>
              <span>NEW YORK</span>
              <span>•</span>
              <span>MILAN</span>
              <span>•</span>
              <span>TOKYO</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <Link href="/?category=tops#catalog" className="hover:text-white transition-colors">
                  Tops & Hoodies
                </Link>
              </li>
              <li>
                <Link href="/?category=mens-shirts#catalog" className="hover:text-white transition-colors">
                  Men&apos;s Tailoring
                </Link>
              </li>
              <li>
                <Link href="/?category=womens-dresses#catalog" className="hover:text-white transition-colors">
                  Women&apos;s Atelier
                </Link>
              </li>
              <li>
                <Link href="/?category=sunglasses#catalog" className="hover:text-white transition-colors">
                  Eyewear & Jewelry
                </Link>
              </li>
              <li>
                <Link href="/?category=womens-bags#catalog" className="hover:text-white transition-colors">
                  Leather Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4">
              Client Service
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Order Tracking
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Garment Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact Concierge
                </span>
              </li>
            </ul>
          </div>

          {/* Legal / Manifesto */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Our Manifesto
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainability Report
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Ethical Sourcing
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy & Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <p>© 2025 RIVE ATELIER INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span>Powered by DummyJSON Products API</span>
            <span>•</span>
            <span>Carbon Neutral Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
