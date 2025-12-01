// src/app/products/[slug]/page.tsx
import { getProductBySlug } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // 🟢 1. Await Params (Next.js 15)
  const { slug } = await params;

  // 🟢 2. Fetch from DB
  const product = await getProductBySlug(slug);

  // 3. Handle 404
  if (!product) {
    notFound();
  }

  // 4. Render Client UI
  return <ProductDetailClient product={product} />;
}