import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from "../components/CookieBanner";
import { BrandsSlideShow } from '@/components/BrandsSlideShow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from "../hooks/useCart";
import CartPopup from "../components/CartPopup";

// 🟢 Import the new LiveChat component
import LiveChat from '@/components/LiveChat';

const inter = Inter({ subsets: ['latin'] });

// ===== MODIFIED METADATA =====
export const metadata: Metadata = {
  title: {
    template: '%s | Starlight Linker LLCSite',
    default: 'Starlight Linker LLCSite | The Unlimited Source for IT Products',
  },
  description: 'The Unlimited Source for IT Products',
  keywords: ['Starlight Linker LLC', 'IT Products', 'Computers', 'Laptops', 'Networking', 'UK IT Supplier'],
};
// =============================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Changed bg-gray-50 to bg-white to fix the dark background */}
      <body className={`${inter.className} bg-white`}>
        <Navbar />
        
        {/* This pt-20 matches the h-20 of the new navbar */}
        <main className="pt-20 min-h-screen overflow-hidden">
          <CartProvider>
            {children}
            <CartPopup /> 
          </CartProvider>
        </main>

        {/* 🟢 Tawk.to Chat Widget */}
        <LiveChat />

        <BrandsSlideShow />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}