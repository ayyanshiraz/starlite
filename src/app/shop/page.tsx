import { getAllProducts } from '@/lib/products';
import ShopPageClient from './ShopPageClient';

export const dynamic = 'force-dynamic'; // 🟢 Fetch fresh data on every page load

export default async function ShopPage() {
  // 🟢 Fetch products from Database (using the function we wrote in lib/products.ts)
  const products = await getAllProducts();

  // 🟢 Pass them to the Client Component
  return <ShopPageClient products={products} />;
}