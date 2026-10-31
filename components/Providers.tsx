"use client";

import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <>
          <CartDrawer />
          <WishlistDrawer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
              },
            }}
          />
        </>
      )}
    </>
  );
}
