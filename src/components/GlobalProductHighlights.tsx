'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// --- FIX: Corrected the import path ---
import { allProducts } from '../lib/products'; 
import type { Product } from '../lib/products';

// --- NEW DATA LOGIC ---
// Helper function to find products safely from your master list
const findProduct = (slug: string, fallbackTitle: string, fallbackImg: string): Partial<Product> & { alt: string } => {
  const product = allProducts.find(p => p.slug === slug);
  if (product) {
    return {
      ...product,
      alt: `${product.name} [SEO Friendly]`,
    };
  }
  // Fallback if product is not in allProducts (like the HP printer)
  return {
    id: fallbackTitle,
    name: fallbackTitle,
    slug: '#', // Fallback link
    image: fallbackImg,
    alt: `${fallbackTitle} [SEO Friendly]`,
  };
};

// We now find the products from your master list
const featuredProducts = [
  findProduct('d-link-dwa-x1850-ax1800-wi-fi-6-usb-adapter', 'D-Link DWA-X1850', '/dlink/0.jpg'),
  findProduct('d-link-dap-x2850-nuclias-connect-ax3600-wi-fi-6-poe-access-point', 'D-Link DAP-X2850', '/dlink/2.jpg'),
  findProduct('ubiquiti-networks-unifi-5-x-switch-8-managed-gigabit', 'Ubiquiti Networks UniFi Switch 8', '/ubiquiti/1.jpg'),
];

const topSellingProducts = [
  findProduct('dell-15-6-latitude-5540-notebook-x3vh2', 'Dell 15.6" Latitude 5540', '/computerandlaptops/dell/dell4.png'),
  findProduct('ubiquiti-networks-ua-sk-eu-security-access-control-system-white', 'Ubiquiti Access Control', '/ubiquiti/2.jpg'),
  findProduct('hp-laserjet-pro-m501dn-j8h61a-bgj', 'HP LaserJet Pro M501dn', '/hp/2.webp'), // This one will use the fallback
];
// --- END NEW DATA LOGIC ---


// --- Helper component for a single product entry ---
const ProductRow = ({ product }: { product: Partial<Product> & { alt: string } }) => (
  <div 
    className="flex items-center gap-4 p-2 -ml-2 rounded-lg"
  >
    <div className="relative flex-shrink-0 w-16 h-16 bg-white rounded-md p-1">
      {/* --- CHANGED to next/image --- */}
      <Image
        src={product.image || '/placeholder.png'}
        alt={product.alt}
        width={64}
        height={64}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
    <div className="flex-grow">
      {/* --- CHANGED: Title is now a Link --- */}
      <Link 
        href={product.slug === '#' ? '#' : `/product/${product.slug}`}
        className={`text-sm font-medium text-white ${product.slug === '#' ? 'cursor-default' : 'hover:text-blue-400 transition-colors'}`}
      >
        {product.name}
      </Link>
      <div className="mt-2">
        {/* --- CHANGED: "Get a Quote" is now a Link --- */}
        <Link 
          href={product.slug === '#' ? '#' : `/product/${product.slug}`}
          className={`inline-block bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded-md transition-all ${product.slug === '#' ? 'opacity-70 cursor-default' : 'hover:bg-blue-700'}`}
        >
          Get a Quote
        </Link>
      </div>
    </div>
  </div>
);

// --- Animation Variants ---
const containerVariants = {
// ... existing code ...
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Staggers the animation of the two columns
    }
  }
};

const itemVariants = {
// ... existing code ...
  hidden: { opacity: 0, y: 30 }, // Start faded out and 30px down
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// --- Main Component ---
export const GlobalProductHighlights = () => {
// ... existing code ...
  return (
    <div className="bg-[#00001E] border-b border-gray-700 overflow-hidden"> {/* Added overflow-hidden */}
      <div className="container mx-auto px-24 py-12">
        <motion.div 
          className="flex flex-col md:flex-row gap-24 justify-center"
// ... existing code ...
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Triggers animation on scroll
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% is visible
        >
          
          {/* Column 1: Featured Products */}
          <motion.div 
// ... existing code ...
            className="w-full md:w-auto"
            variants={itemVariants}
          >
            <h3 
              className="text-xl font-semibold text-white mb-1"
// ... existing code ...
            >
              Featured Products
            </h3>
            <div className="w-16 h-0.5 bg-blue-600 mb-6"></div>
            <div className="flex flex-col gap-6">
              {/* --- FIX: Removed stray "" --- */}
              {featuredProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </motion.div>

          {/* Column 2: Top Selling Products */}
          <motion.div 
// ... existing code ...
            className="w-full md:w-auto"
            variants={itemVariants}
          >
            <h3 
              className="text-xl font-semibold text-white mb-1"
// ... existing code ...
            >
              Top Selling Products
            </h3>
            <div className="w-16 h-0.5 bg-blue-600 mb-6"></div>
            <div className="flex flex-col gap-6">
              {/* --- FIX: Removed stray "" --- */}
              {topSellingProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};