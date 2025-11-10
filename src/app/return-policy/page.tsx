import type { Metadata } from 'next';
import ReturnPolicyPageClient from './ReturnPolicyPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'Return Policy',
  description: 'View the Starlite Linker return policy. Learn about returns for non-faulty items, faulty items under warranty, and our RMA process.',
  keywords: ['Starlite Linker return policy', 'RMA process', 'return faulty items', 'restocking fee'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function ReturnPolicyPage() {
  return (
    <ReturnPolicyPageClient />
  );
}