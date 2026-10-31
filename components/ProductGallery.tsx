"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
  discountPercentage?: number;
}

export function ProductGallery({
  images,
  title,
  discountPercentage,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const activeImage = images[selectedIndex] || images[0] || "/placeholder.png";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-6 items-start w-full">
      {/* Thumbnail Stack (Vertical on desktop matching reference bottom-right) */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 w-full md:w-24 shrink-0 no-scrollbar">
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative size-20 md:size-22 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-neutral-900 ring-2 ring-neutral-900/10 dark:border-white dark:ring-white/20 scale-[1.02]"
                    : "border-neutral-200/60 dark:border-neutral-800 opacity-70 hover:opacity-100"
                )}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} view ${idx + 1}`}
                  fill
                  sizes="88px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Stage */}
      <div
        className="relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#f4f4f5] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 shadow-xl cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover object-center transition-all duration-300",
            isZoomed ? "scale-150 origin-center" : "scale-100"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
          {discountPercentage && discountPercentage > 5 && (
            <span className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold px-3 py-1 shadow-md">
              -{Math.round(discountPercentage)}% OFF
            </span>
          )}
        </div>

        {/* Zoom Hint */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="size-3.5" /> Hover to zoom
        </div>
      </div>
    </div>
  );
}
