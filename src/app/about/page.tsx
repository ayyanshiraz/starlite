import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'About Starlight Linkers LLC ', // This becomes "About Starlight Linkers LLC | Starlight Linkers LLC Site"
  description: 'Learn about Starlight Linkers LLC , who we are, our vision, and how we provide comprehensive IT solutions, hardware procurement, and logistics.',
  keywords: ['About Starlight Linkers LLC ', 'Starlight Linkers LLC history', 'IT solutions', 'company vision', 'IT procurement'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
// This simple component now renders your interactive client component.
export default function AboutPage() {
  return (
    <AboutPageClient />
  );
}