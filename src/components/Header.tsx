// src/app/components/Header.tsx
"use client"; // Keep as client component for consistency and future state (e.g., search)

import React from 'react';
import Link from 'next/link'; // Import Link for navigation

// --- SVG ICON COMPONENTS ---
// Base props for all Lucide-style icons
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

const MenuIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const RepeatIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M17 2.1l4 4-4 4"></path>
    <path d="M3 12.2v-2a4 4 0 0 1 4-4h12"></path>
    <path d="M7 21.9l-4-4 4-4"></path>
    <path d="M21 11.8v2a4 4 0 0 1-4 4H5"></path>
  </svg>
);

const HeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UserIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ShoppingBagIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// --- HEADER SECTION ---
// This is now simplified and links to the new categories page.
export function HeaderSection() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-8 py-5">
        <div className="flex justify-between items-center gap-6">

          {/* UPDATED: This is now a Link, not a button */}
          <Link
            href="/categories"
            className="flex items-center gap-4 `flex-shrink-0` bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition-colors"
          >
            <div>
              <h1 className="text-xl font-bold text-gray-900">All Categories</h1>
            </div>
            <MenuIcon className="w-7 h-7 text-gray-700" />
          </Link>
          {/* REMOVED: The entire dropdown modal logic is gone */}

          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-14 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-full text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-gray-700 hover:text-black">
              <RepeatIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-black">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-black">
              <UserIcon className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBagIcon className="w-7 h-7 text-gray-800" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  0
                </span>
              </div>
              <span className="font-bold text-gray-800">£0.00</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}