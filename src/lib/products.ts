import { prisma } from '@/lib/prisma';

// --- 1. KEEP YOUR TYPES ---
export type StandardProductDescription = {
  overview: string;
  design: { title: string; formFactor: string };
  performance: { title: string; processor: string; memory: string; storage: string };
  display: { title: string; screen: string; graphics: string };
  connectivity: { title: string; ports: string[]; wireless: string[] };
  functionality: { title: string; versatility: string; connectivityOptions: string };
};

export type KeyFeatureProductDescription = {
  keyFeatures: { title: string; items: string[] }[];
  benefits: string[];
  summary: string;
};

export type Product = {
  id: string;
  name: string;
  price: string | number;
  image: string;
  category: string;
  categorySlug: string;
  slug: string;
  sku: string;
  availability: string;
  description: StandardProductDescription | KeyFeatureProductDescription | string;
};

// --- 2. HELPER: TRANSFORM DB PRODUCT TO FRONTEND PRODUCT ---
function transformPrismaProduct(p: any): Product {
  // Price Logic: Convert cents to dollars, or return "Get a Quote"
  let formattedPrice: string | number = "Get a Quote";
  if (p.price !== null && p.price > 0) {
    formattedPrice = p.price / 100; 
  }

  // Category Slug Logic
  const catSlug = p.category 
    ? p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    : 'uncategorized';

  // Description Logic
  let desc: any = p.description;
  if (!desc) {
    desc = "No description available.";
  } 

  // 🟢 SMART IMAGE LOGIC (The Update)
  // Default to your GIF. Only use DB image if it's real and not the old placeholder.
  let finalImage = '/logogif.gif'; 
  if (p.image && p.image !== '/placeholder.png' && p.image.trim() !== '') {
    finalImage = p.image;
  }

  return {
    id: p.id,
    name: p.name,
    price: formattedPrice,
    image: finalImage, // Uses GIF if image is missing
    category: p.category || 'Uncategorized',
    categorySlug: catSlug,
    slug: p.slug,
    sku: p.sku || 'N/A',
    availability: p.availability || 'In Stock',
    description: desc,
  };
}

// --- 3. EXPORT ASYNC DATA FETCHERS ---

// A. Get ALL Products
export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return products.map(transformPrismaProduct);
}

// B. Get Featured/Latest Products
export async function getLatestProducts(limit: number = 3): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return products.map(transformPrismaProduct);
}

// C. Get Single Product by Slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  if (!product) return null;
  return transformPrismaProduct(product);
}

// D. Search Products
export async function searchProducts(term: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: 'insensitive' } },
        { category: { contains: term, mode: 'insensitive' } },
        { sku: { contains: term, mode: 'insensitive' } },
      ],
    },
  });
  return products.map(transformPrismaProduct);
}