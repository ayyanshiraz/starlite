"use server";

import { prisma } from '@/lib/prisma';

export async function getWishlistProducts(slugs: string[]) {
  if (!slugs || slugs.length === 0) return [];

  try {
    // Fetch products from DB where the slug is in the list
    const products = await prisma.product.findMany({
      where: {
        slug: { in: slugs }
      }
    });

    // Transform them to match your Frontend 'Product' type
    // (Matching the logic we used in lib/products.ts)
    return products.map(p => {
      let formattedPrice: string | number = "Get a Quote";
      if (p.price !== null && p.price > 0) {
        formattedPrice = p.price / 100; 
      }

      let desc: any = p.description;
      if (!desc) desc = "No description available.";

      return {
        id: p.id,
        name: p.name,
        price: formattedPrice,
        image: p.image || '/placeholder.png',
        category: p.category || 'Uncategorized',
        categorySlug: p.category ? p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'uncategorized',
        slug: p.slug,
        sku: p.sku || 'N/A',
        availability: p.availability || 'In Stock',
        description: desc,
      };
    });

  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    return [];
  }
}