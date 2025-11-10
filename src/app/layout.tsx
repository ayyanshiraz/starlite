import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from "../components/CookieBanner"; // <-- 1. Add this import
import { BrandsSlideShow } from '@/components/BrandsSlideShow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const inter = Inter({ subsets: ['latin'] });

// ===== MODIFIED METADATA =====
export const metadata: Metadata = {
  // This is your new "SEO Title" template
  title: {
    template: '%s | Starlite LinkerSite', // %s will be replaced by the page-specific title
    default: 'Starlite LinkerSite | The Unlimited Source for IT Products', // Default title for home
  },
  // This is your default "Meta Description"
  description: 'The Unlimited Source for IT Products',
  // This is your default "SEO Keywords"
  keywords: ['Starlite Linker', 'IT Products', 'Computers', 'Laptops', 'Networking', 'UK IT Supplier'],
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
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <BrandsSlideShow />
        <Footer />
        <CookieBanner /> {/* <-- 2. Add the component here */}
      </body>
    </html>
  );
}