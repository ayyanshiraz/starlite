import type { Metadata } from 'next';
import HomePageClient from './HomePageClient'; 
import { getAllProducts } from '@/lib/products'; // 🟢 Changed from getLatestProducts to getAllProducts

export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: 'Starlight Linkers LLC Site | The Unlimited Source for IT Products',
  description: 'Your one-stop shop for business IT requirements.',
  keywords: ['IT Products', 'Business IT', 'Starlight Linkers LLC', 'Laptops', 'Workstations', 'Networking'],
};

export default async function Home() {
  // 🟢 FETCH ALL PRODUCTS
  // This ensures the specific Dell, HP, and Ubiquiti items are included
  // regardless of when they were added.
  const products = await getAllProducts();

  return (
    <HomePageClient products={products} />
  );
}