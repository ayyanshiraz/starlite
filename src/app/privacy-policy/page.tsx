import type { Metadata } from 'next';
import PrivacyPolicyPageClient from './PrivacyPolicyPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Starlite Linker Privacy Policy to understand what personal data we collect and how we use your information.',
  keywords: ['Starlite Linkerprivacy policy', 'data protection', 'personal data', 'customer privacy'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyPageClient />
  );
}