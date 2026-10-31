"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOOKBOOK_MODELS = [
  {
    id: 1,
    name: "Arctic Gray",
    tag: "Minimalist Fleece",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    category: "tops",
  },
  {
    id: 2,
    name: "Urban Moss",
    tag: "Organic Streetwear",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
    category: "tops",
  },
  {
    id: 3,
    name: "Ivory Luxe",
    tag: "Clean Cut Hoodie",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
    category: "mens-shirts",
  },
  {
    id: 4,
    name: "Shadow Stripe",
    tag: "Tailored Oversize",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
    category: "tops",
  },
  {
    id: 5,
    name: "Sand Dune",
    tag: "Relaxed Fit Lounge",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
    category: "womens-dresses",
  },
];

export function HeroSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % LOOKBOOK_MODELS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? LOOKBOOK_MODELS.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-[#0c0c0e] text-white overflow-hidden relative border border-neutral-800/80 shadow-2xl">
        {/* Subtle Luxury Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)]" />

        {/* Hero Top Nav Badge */}
        <div className="relative pt-10 sm:pt-16 pb-6 px-6 sm:px-12 text-center max-w-4xl mx-auto z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-neutral-300 backdrop-blur-md mb-6">
            <Sparkles className="size-3.5 text-amber-300" />
            <span>New spring collection 2025</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15] sm:leading-[1.12]">
            Where style meets expression,{" "}
            <span className="italic font-light text-neutral-300">
              trends inspire,
            </span>{" "}
            and fashion thrives.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Step into a fashion haven where the latest trends meet your unique
            style aspirations. Redefine your wardrobe with timeless luxury,
            contemporary silhouettes, and organic textiles.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-white text-neutral-950 hover:bg-neutral-200 px-7 py-6 text-sm font-semibold tracking-wide shadow-xl group transition-all"
            >
              <Link href="#catalog" className="flex items-center gap-2">
                Explore Collection
                <div className="size-6 rounded-full bg-neutral-950 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-3" />
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6 py-6 text-sm font-medium backdrop-blur-xs transition-colors"
            >
              <Link href="/?category=tops#catalog">View Lookbook</Link>
            </Button>
          </div>
        </div>

        {/* Arched Model Gallery Section Inspired by Reference */}
        <div className="relative pb-10 sm:pb-14 pt-4 px-4 sm:px-8 z-10">
          <div className="max-w-6xl mx-auto relative">
            {/* Gallery Navigation Controls */}
            <div className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={handlePrev}
                className="size-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-transform active:scale-95"
                aria-label="Previous lookbook item"
              >
                <ChevronLeft className="size-5" />
              </button>
            </div>
            <div className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={handleNext}
                className="size-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-transform active:scale-95"
                aria-label="Next lookbook item"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* 5 Arch Model Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 justify-center items-end">
              {LOOKBOOK_MODELS.map((model, idx) => {
                const isCenter = idx === 2;
                return (
                  <Link
                    key={model.id}
                    href={`/?category=${model.category}#catalog`}
                    className={`group relative overflow-hidden rounded-t-[5rem] sm:rounded-t-[6rem] rounded-b-2xl bg-neutral-900 border border-white/10 transition-all duration-300 hover:border-white/30 hover:-translate-y-1.5 shadow-lg block ${
                      isCenter
                        ? "aspect-[9/16] sm:aspect-[9/15] ring-1 ring-white/20"
                        : "aspect-[9/16] opacity-90 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Caption at bottom */}
                    <div className="absolute bottom-3 inset-x-3 text-center">
                      <p className="text-xs font-semibold text-white tracking-wide drop-shadow-sm">
                        {model.name}
                      </p>
                      <p className="text-[10px] text-neutral-300 font-light truncate drop-shadow-sm">
                        {model.tag}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
