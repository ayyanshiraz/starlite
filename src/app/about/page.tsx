import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'About Starlite Linker', // This becomes "About Starlite Linker| Starlite LinkerSite"
  description: 'Learn about Starlite Linker, who we are, our vision, and how we provide comprehensive IT solutions, hardware procurement, and logistics.',
  keywords: ['About Starlite Linker', 'Starlite Linkerhistory', 'IT solutions', 'company vision', 'IT procurement'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
// This simple component now renders your interactive client component.
export default function AboutPage() {
  return (
    <AboutPageClient />
  );
}