import type { Metadata } from 'next';
import HomePageClient from './HomePageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
// This is your "SEO Title", "Meta Description", and "SEO Keywords"
export const metadata: Metadata = {
  title: 'Starlight Linkers LLC Site | The Unlimited Source for IT Products',
  description: 'Your one-stop shop for business IT requirements. Find laptops, workstations, networking equipment, and more from top brands.',
  keywords: ['IT Products', 'Business IT', 'Starlight Linkers LLC ', 'Laptops', 'Workstations', 'Networking'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
// This simple component now renders your interactive client component.
export default function Home() {
  return (
    <HomePageClient />
  );
}