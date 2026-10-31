import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/api";
import { ProductDetail } from "@/components/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${product.title} — Rive Atelier`,
      description: product.description,
      openGraph: {
        title: `${product.title} — Rive`,
        description: product.description,
        images: [
          {
            url: product.thumbnail || product.images[0],
            width: 800,
            height: 1000,
            alt: product.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Product Details — Rive",
      description: "Explore luxury fashion pieces from Rive Atelier",
    };
  }
}

async function ProductDetailLoader({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    const relatedProducts = await getRelatedProducts(
      product.category,
      product.id,
      4
    );

    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error("Error loading product detail:", error);
    notFound();
  }
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-28 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent dark:border-white" />
          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400">
            Loading luxury garment details...
          </p>
        </div>
      }
    >
      <ProductDetailLoader params={params} />
    </Suspense>
  );
}
