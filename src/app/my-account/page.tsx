import type { Metadata } from 'next';
import MyAccountPageClient from './MyAccountPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'My Account',
  description: 'Login or create an account with Starlight Linkers LLC to manage your orders, track shipments, and view your account details.',
  keywords: ['Starlight Linkers LLC account', 'login', 'create account', 'customer account'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function MyAccountPage() {
  return (
    <MyAccountPageClient />
  );
}