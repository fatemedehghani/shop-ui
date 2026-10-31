import { Product, ProductsResponse, CategoryItem } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export interface FetchProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export async function getProducts({
  limit = 24,
  skip = 0,
  category,
  search,
  sortBy,
  order,
}: FetchProductsParams = {}): Promise<ProductsResponse> {
  let endpoint = `${BASE_URL}/products`;

  if (search && search.trim() !== "") {
    endpoint = `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    endpoint = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    endpoint = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  if (sortBy) {
    endpoint += `&sortBy=${sortBy}&order=${order || "asc"}`;
  }

  const res = await fetch(endpoint, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  return res.json();
}

export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product #${id}: ${res.statusText}`);
  }

  return res.json();
}

export async function getCategories(): Promise<CategoryItem[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.statusText}`);
  }

  return res.json();
}

export async function getRelatedProducts(
  category: string,
  excludeId: number,
  limit = 4
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit + 2}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: ProductsResponse = await res.json();
    return data.products.filter((p) => p.id !== excludeId).slice(0, limit);
  } catch {
    return [];
  }
}
