import type { Metadata } from 'next';
import TermsAndConditionsPageClient from './TermsAndConditionsPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
// Here are the SEO Title, Meta Description, and Keywords for this page.
export const metadata: Metadata = {
  // SEO Title
  title: 'Terms and Conditions', 
  // Meta Description (Focus Key Phrase: Starlight Linkers LLC  Terms and Conditions)
  description: 'Read the Starlight Linkers LLC  Terms and Conditions. By placing an order, you consent and agree to these business policies, warranty, and return rules.',
  // SEO Keywords
  keywords: ['Starlight Linkers LLC terms and conditions', 'business policies', 'payment terms', 'warranty', 'returns policy', 'RMA'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
// This simple component now renders your interactive client component.
export default function TermsAndConditionsPage() {
  return (
    <TermsAndConditionsPageClient />
  );
}