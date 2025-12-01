import type { Metadata } from 'next';
import StoreDirectoryPageClient from './StoreDirectoryPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
// [SEO Friendly]
export const metadata: Metadata = {
  // seo title
  title: 'Store Directory',
  // meta description (based on focus key phrase: Starlight Linkers LLC store directory)
  description: 'Browse the Starlight Linkers LLC store directory. Find all our IT product categories and brands like HP, Dell, Cisco, Lenovo, and more in one place.',
  // seo keywords
  keywords: ['store directory', 'Starlight Linkers LLC categories', 'all products', 'product index', 'sitemap', 'shop by brand', 'shop by category'],
};
// slug is /store-directory (from folder structure)
// img alt text is not needed as there are no images on this page.
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function StoreDirectoryPage() {
  return (
    <StoreDirectoryPageClient />
  );
}