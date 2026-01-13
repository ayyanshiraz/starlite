"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../hooks/useCart';
import type { Product } from '../lib/products';
import { getSearchSuggestions } from '../app/actions/header-actions';

// --- SVG ICON COMPONENTS ---
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

const MenuIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const SearchIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const RepeatIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M17 2.1l4 4-4 4"></path><path d="M3 12.2v-2a4 4 0 0 1 4-4h12"></path><path d="M7 21.9l-4-4 4-4"></path><path d="M21 11.8v2a4 4 0 0 1-4 4H5"></path></svg>);
const HeartIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const UserIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const ShoppingBagIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>);

// --- HEADER SECTION ---
export function HeaderSection() {
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Badge Counts
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  // --- GET CART STATE ---
  const { cartCount, cartTotal } = useCart(); 

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // --- Wishlist Counter Logic ---
  useEffect(() => {
    const updateWishlistCount = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('wishlist');
        setWishlistCount(stored ? JSON.parse(stored).length : 0);
      }
    };
    updateWishlistCount();
    window.addEventListener('wishlist-updated', updateWishlistCount);
    return () => window.removeEventListener('wishlist-updated', updateWishlistCount);
  }, []);

  // --- Compare Counter Logic ---
  useEffect(() => {
    const updateCompareCount = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('compareList');
        setCompareCount(stored ? JSON.parse(stored).length : 0);
      }
    };
    updateCompareCount();
    window.addEventListener('compare-updated', updateCompareCount);
    return () => window.removeEventListener('compare-updated', updateCompareCount);
  }, []);

  // --- Search Logic ---
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const results = await getSearchSuggestions(searchQuery);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search error", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (searchQuery.trim()) {
      // 🟢 FIX: Route to '/search' instead of '/shop'
      // Use 'q' as the parameter to match your Search Page code
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="container mx-auto px-4 sm:px-8 py-5">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-x-6 gap-y-4">

          {/* --- "All Categories" Button --- */}
          <Link
            href="/categories"
            className="flex items-center gap-2 flex-shrink-0 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors md:order-1"
          >
            <div>
              <h1 className="text-lg font-bold text-gray-900">All Categories</h1>
            </div>
            <MenuIcon className="w-6 h-6 text-gray-700" />
          </Link>

          {/* --- Icon Group --- */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 md:order-3">
            <Link href="/compare" className="text-gray-700 hover:text-black relative">
              <RepeatIcon className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="text-gray-700 hover:text-black relative">
              <HeartIcon className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link href="/my-account" className="text-gray-700 hover:text-black">
              <UserIcon className="w-6 h-6" />
            </Link>
            
            <Link href="/cart" className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <ShoppingBagIcon className="w-7 h-7 text-gray-800 group-hover:text-blue-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-gray-800 hidden md:block group-hover:text-blue-600 transition-colors">
                {cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : '$0.00'}
              </span>
            </Link>
          </div>

          {/* --- Search Bar --- */}
          <div className="w-full order-last md:w-auto md:flex-1 md:max-w-3xl md:order-2 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowSuggestions(true);
                }}
                enterKeyHint="search"
                inputMode="search"
                className="w-full h-14 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-full text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>

            {/* --- DROPDOWN SUGGESTIONS --- */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-2 overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                <ul>
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <Link 
                        href={`/product/${product.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                          <Image 
                             src={product.image} 
                             alt="" 
                             width={40} 
                             height={40} 
                             className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.category.split(',')[0]}
                          </p>
                        </div>
                        <div className="text-xs font-bold text-blue-600 whitespace-nowrap">
                          View
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}