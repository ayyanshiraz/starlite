'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '../lib/products'; 
import { useCart } from '../hooks/useCart';

// --- HELPER: Filter Products by Exact Names ---
const getProductsByNames = (allProducts: Product[], names: string[]) => {
  if (!allProducts) return [];
  return names.map(name => allProducts.find(p => p.name.trim() === name.trim())).filter(Boolean) as Product[];
};

const ProductRow = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const isPriced = typeof product.price === 'number';
  const productUrl = `/product/${product.slug}`;

  return (
    <div className="flex items-center gap-4 p-2 -ml-2 rounded-lg group">
      <div className="relative flex-shrink-0 w-16 h-16 bg-white rounded-md p-1 border border-gray-100">
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.name}
          width={64}
          height={64}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex-grow">
        <Link 
          href={productUrl}
          className="text-sm font-medium text-gray-900 block line-clamp-2 hover:text-blue-600 transition-colors"
        >
          {product.name}
        </Link>
        
        <div className="mt-2">
          <button
            onClick={handleAddToCart}
            className="inline-block bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded-md transition-all hover:bg-blue-700 hover:shadow-md active:transform active:scale-95"
          >
            {isPriced ? 'Add to Cart' : 'Get a Quote'}
          </button>
        </div>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const GlobalProductHighlights = ({ products }: { products: Product[] }) => {
  
  // 🟢 FEATURED LIST (Global Highlights)
  const featuredNames = [
    'D-Link DWA-X1850 AX1800 Wi-Fi 6 USB Adapter',
    'D-Link DAP-X2850 Nuclias Connect AX3600 Wi-Fi 6 PoE Access Point',
    'Ubiquiti Networks UniFi 5 x Switch 8 Managed Gigabit'
  ];
  const featuredList = getProductsByNames(products, featuredNames);

  // 🟢 TOP SELLING LIST (Global Highlights)
  const topSellingNames = [
    'Dell 15.6″ Latitude 5540 Notebook – X3VH2',
    'Ubiquiti Networks UA-SK-EU security access control system White',
    'HP LaserJet Pro M501dn'
  ];
  const topSellingList = getProductsByNames(products, topSellingNames);

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-24 py-12">
        <motion.div 
          className="flex flex-col md:flex-row gap-24 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Column 1: Featured Products */}
          <motion.div className="w-full md:w-auto" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Featured Products</h3>
            <div className="w-16 h-0.5 bg-blue-600 mb-6"></div>
            <div className="flex flex-col gap-6">
              {featuredList.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </motion.div>

          {/* Column 2: Top Selling Products */}
          <motion.div className="w-full md:w-auto" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Top Selling Products</h3>
            <div className="w-16 h-0.5 bg-blue-600 mb-6"></div>
            <div className="flex flex-col gap-6">
              {topSellingList.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};