import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from "../components/CookieBanner"; 
import { BrandsSlideShow } from '@/components/BrandsSlideShow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from "../hooks/useCart";
import CartPopup from "../components/CartPopup";
import LiveChat from '@/components/LiveChat';

// 🟢 Import Script for JSON-LD
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Starlight Linker LLCSite',
    default: 'Starlight Linker LLCSite | The Unlimited Source for IT Products',
  },
  description: 'The Unlimited Source for IT Products',
  keywords: ['Starlight Linker LLC', 'IT Products', 'Computers', 'Laptops', 'Networking', 'UK IT Supplier'],
  // 🟢 Explicitly point to your icon (optional but good for SEO)
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🟢 Organization Schema for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Starlight Linkers LLC",
    "url": "https://www.starlightlinkers.com",
    "logo": "https://www.starlightlinkers.com/logofile.png", // Make sure this file exists in public folder
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-972-431-0905",
      "contactType": "sales",
      "email": "sales@starlightlinkers.com"
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Navbar />
        
        <main className="pt-20 min-h-screen overflow-hidden">
          <CartProvider>
            {children}
            <CartPopup /> 
          </CartProvider>
        </main>

        <LiveChat />
        <BrandsSlideShow />
        <Footer />
        <CookieBanner />

        {/* 🟢 JSON-LD Script */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}