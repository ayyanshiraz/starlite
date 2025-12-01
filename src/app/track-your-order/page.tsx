import type { Metadata } from 'next';
import TrackYourOrderPageClient from './TrackYourOrderPageClient.tsx'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
// [SEO Friendly]
export const metadata: Metadata = {
  // seo title
  title: 'Track Your Order',
  // meta description (based on focus key phrase: track your Starlight Linkers LLC order)
  description: 'Track your Starlight Linkers LLC order status. Enter your Order ID and billing email to see the latest updates on your purchase.',
  // seo keywords
  keywords: ['track order', 'Starlight Linkers LLC order status', 'find my order', 'order tracking'],
};
// slug is /track-your-order (from folder structure)
// No img alt text is needed as there are no images on this page.
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function TrackYourOrderPage() {
  return (
    <TrackYourOrderPageClient />
  );
}