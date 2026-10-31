import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Rive — Modern Minimalist Luxury Fashion",
    template: "%s | Rive Atelier",
  },
  description:
    "Where style meets expression, trends inspire, and fashion thrives. Discover contemporary luxury hoodies, tailored outerwear, and curated streetwear.",
  keywords: [
    "luxury fashion",
    "minimalist clothing",
    "hoodies",
    "streetwear lookbook",
    "designer apparel",
    "sustainable fashion",
  ],
  authors: [{ name: "Rive Atelier" }],
  openGraph: {
    title: "Rive — Modern Minimalist Luxury Fashion",
    description:
      "Where style meets expression, trends inspire, and fashion thrives. Discover contemporary luxury garments.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        <Providers>
          <Suspense fallback={<div className="h-16 w-full bg-white dark:bg-neutral-950" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
