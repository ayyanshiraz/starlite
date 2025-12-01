"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import { useCart } from '../../hooks/useCart';
// 🔴 Removed static import
import { getWishlistProducts } from '../actions/wishlist-actions'; // 🟢 Import Server Action
import type { Product } from '../../lib/products'; // Import Type only

// --- ICONS ---
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const TrashIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const EmptyHeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// --- MAIN COMPONENT ---
export default function WishlistPage() {
  // State to store the list of slugs (IDs) saved in LocalStorage
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]); // 🟢 Store real product objects
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { addToCart } = useCart();

  // 1. Load Slugs from LocalStorage on Mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlistSlugs(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. 🟢 FETCH DATA FROM SERVER BASED ON SLUGS
  useEffect(() => {
    const fetchData = async () => {
      if (wishlistSlugs.length === 0) {
        setWishlistProducts([]);
        return;
      }
      
      setIsLoadingData(true);
      try {
        // Call the Server Action
        const products = await getWishlistProducts(wishlistSlugs);
        setWishlistProducts(products);
      } catch (error) {
        console.error("Failed to load wishlist products", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isLoaded) {
      fetchData();
    }
  }, [wishlistSlugs, isLoaded]);

  // 3. Remove item handler
  const removeFromWishlist = (slugToRemove: string) => {
    const updatedList = wishlistSlugs.filter(slug => slug !== slugToRemove);
    setWishlistSlugs(updatedList);
    // Update LocalStorage
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
    // Optimistically remove from UI
    setWishlistProducts(prev => prev.filter(p => p.slug !== slugToRemove));
    // Trigger global event so Header updates
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600 mb-8">
          {isLoaded && !isLoadingData
            ? `${wishlistProducts.length} items saved for later` 
            : 'Loading your items...'}
        </p>

        {/* --- CONTENT AREA --- */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Remove Button (Top Right) */}
                <button
                  onClick={() => removeFromWishlist(product.slug)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-gray-200 shadow-sm"
                  title="Remove from wishlist"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>

                {/* Image Area */}
                <Link href={`/product/${product.slug}`} className="relative h-64 bg-gray-50 p-6 flex items-center justify-center border-b border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Details Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">
                    {product.category.split(',')[0]}
                  </div>
                  
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-gray-900 font-semibold text-lg leading-snug mb-2 hover:text-blue-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">
                      {typeof product.price === 'number' ? `$${product.price}` : product.price}
                    </span>
                    
                   <button 
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <CartIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {typeof product.price === 'number' ? 'Add to Cart' : 'Get a Quote'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- EMPTY STATE ---
          isLoaded && !isLoadingData && (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <EmptyHeartIcon className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md text-center">
                It seems you haven't saved any items yet. Browse our catalog and click the heart icon to save items for later.
              </p>
              <Link 
                href="/" 
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-xl"
              >
                Start Shopping
              </Link>
            </div>
          )
        )}
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}