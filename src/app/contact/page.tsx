import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient'; // Import our new client component

// ===== METADATA (SERVER COMPONENT) =====
export const metadata: Metadata = {
  title: 'Contact Starlite Linker',
  description: 'Get in touch with Starlite Linker. Contact us for sales, support, or any inquiries about our IT products and solutions. We are here to help 24/7.',
  keywords: ['Contact Starlite Linker', 'Starlite Linkersupport', 'Starlite Linkeraddress', 'IT sales', 'contact IT supplier'],
};
// ========================================


// ===== PAGE (SERVER COMPONENT) =====
export default function ContactPage() {
  return (
    <ContactPageClient />
  );
}