import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
// [SEO Friendly]
export const metadata: Metadata = {
  // seo title
  title: 'Shop All Products | Starlight Linkers LLC ',
  // meta description
  description: 'Browse and shop all IT products available at Starlight Linkers LLC . Find computers, laptops, networking gear, accessories, and more from top brands.',
  // seo keywords
  keywords: ['shop', 'all products', 'IT products', 'Starlight Linkers LLC  shop', 'buy computers', 'networking equipment'],
};
// slug is /shop (from folder structure)
// focus key phrase: Shop All Products
// img alt text: A grid of various IT products available at Starlight Linkers LLC  shop
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function ShopPage() {
  return (
    <ShopPageClient />
  );
}