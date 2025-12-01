import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'Contact Starlight Linkers LLC ',
  description: 'Get in touch with Starlight Linkers LLC . Contact us for sales, support, or any inquiries about our IT products and solutions. We are here to help 24/7.',
  keywords: ['Contact Starlight Linkers LLC ', 'Starlight Linkers LLC support', 'Starlight Linkers LLC address', 'IT sales', 'contact IT supplier'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function ContactPage() {
  return (
    <ContactPageClient />
  );
}