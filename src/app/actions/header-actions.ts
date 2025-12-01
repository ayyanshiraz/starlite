"use server";

import { searchProducts } from "@/lib/products";

export async function getSearchSuggestions(query: string) {
  if (!query || query.length < 2) return [];
  
  // Reuse the search function we wrote in lib/products
  // We limit to 5 for the dropdown
  const results = await searchProducts(query);
  return results.slice(0, 5); 
}