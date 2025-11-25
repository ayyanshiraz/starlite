import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from "../components/CookieBanner"; // <-- 1. Add this import
import { BrandsSlideShow } from '@/components/BrandsSlideShow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// 1. ADD THIS IMPORT
import { CartProvider } from "../hooks/useCart";
import CartPopup from "../components/CartPopup"; // <--- Add this import




const inter = Inter({ subsets: ['latin'] });

// ===== MODIFIED METADATA =====
export const metadata: Metadata = {
  // This is your new "SEO Title" template
  title: {
    template: '%s | Starlight Linker LLCSite', // %s will be replaced by the page-specific title
    default: 'Starlight Linker LLCSite | The Unlimited Source for IT Products', // Default title for home
  },
  // This is your default "Meta Description"
  description: 'The Unlimited Source for IT Products',
  // This is your default "SEO Keywords"
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
          <CartPopup /> {/* <--- Add this Component here, inside the Provider */}
          </CartProvider>
        </main>
        <BrandsSlideShow />
        <Footer />
        <CookieBanner /> {/* <-- 2. Add the component here */}
      </body>
    </html>
  );
}