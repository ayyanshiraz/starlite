"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import { allProducts, Product, KeyFeatureProductDescription } from '../../lib/products';

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

const CompareIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 3L4 7l4 4"/>
    <path d="M4 7h16"/>
    <path d="M16 21l4-4-4-4"/>
    <path d="M20 17H4"/>
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>
);

// --- HELPER: Extract Description ---
const getProductDescription = (product: Product) => {
  if (!product.description) return "No description available.";
  // Check if it's the KeyFeature type
  if ('summary' in product.description) {
    return product.description.summary;
  }
  // Check if it's the Standard type
  if ('overview' in product.description) {
    return product.description.overview;
  }
  return "";
};

// --- END ICONS ---

const COMPARE_KEY = 'compareList';

/**
 * Desktop Row: Renders one label cell + comparison cells for the grid.
 */
const DesktopCompareRow = ({ label, productValues }: { label: string, productValues: React.ReactNode[] }) => (
  <>
    {/* Label Column */}
    <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-900 flex items-center">
      {label}
    </div>
    
    {/* Product Values */}
    {productValues.map((value, index) => (
      <div key={index} className="p-4 border-b border-gray-200 text-sm text-center flex items-center justify-center">
        {value}
      </div>
    ))}
    
    {/* Empty fillers to maintain Grid structure */}
    {Array.from({ length: 4 - productValues.length }).map((_, i) => (
        <div key={`empty-${i}`} className="p-4 border-b border-gray-200"></div>
    ))}
  </>
);

export default function ComparePage() {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to load/update list
  const loadCompareList = () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(COMPARE_KEY);
    const slugs: string[] = stored ? JSON.parse(stored) : [];
    
    const products = slugs
      .map(slug => allProducts.find(p => p.slug === slug))
      .filter((p): p is Product => p !== undefined); 
      
    setCompareProducts(products);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadCompareList();

    // --- SEO METADATA ---
    document.title = "Compare Products | Starlight Linkers LLC ";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Compare IT hardware side-by-side. See specs for laptops, printers, and more to find the best product for your needs.");
    }

    window.addEventListener('storage', loadCompareList);
    return () => {
      window.removeEventListener('storage', loadCompareList);
    };
  }, []);
  
  const removeFromCompare = (slugToRemove: string) => {
    const updatedSlugs = compareProducts.map(p => p.slug).filter(s => s !== slugToRemove);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updatedSlugs));
    loadCompareList();
    window.dispatchEvent(new Event('compare-updated'));
  };

  const allFeatureLabels = useMemo(() => {
    const labels = new Set<string>();
    compareProducts.forEach(product => {
      if (product.description && 'keyFeatures' in product.description && (product.description as KeyFeatureProductDescription).keyFeatures) {
        (product.description as KeyFeatureProductDescription).keyFeatures.forEach(f => labels.add(f.title));
      }
    });
    return Array.from(labels);
  }, [compareProducts]);

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10">
        
        {/* --- Breadcrumbs --- */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li className="flex items-center mx-2">
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="text-gray-900 font-medium">Compare Products</li>
          </ol>
        </nav>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Comparison</h1>

        {!isLoaded ? (
          <div className="text-center text-gray-600 py-20">Loading comparison items...</div>
        ) : compareProducts.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <CompareIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your compare list is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
              You have not added any products to compare. Find products and add them to see a comparison.
            </p>
            <Link 
              href="/shop" 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            {/* ========================================= */}
            {/* MOBILE VIEW: Vertical Stack of Cards      */}
            {/* ========================================= */}
            <div className="block md:hidden space-y-6">
              {compareProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCompare(product.slug)}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove from comparison"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>

                  {/* Header Info */}
                  <div className="flex flex-col items-center mb-6 text-center">
                    <Link href={`/product/${product.slug}`} className="block mb-3">
                      <div className="relative w-40 h-40">
                          <Image 
                            src={product.image} 
                            alt={`[SEO Friendly] ${product.name}`} 
                            fill
                            className="object-contain" 
                          />
                      </div>
                    </Link>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-lg font-bold text-blue-600 hover:underline mb-1">{product.name}</h3>
                    </Link>
                    <span className="text-xl font-bold text-gray-900 mb-3">
                      {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Get a Quote'}
                    </span>
                    {/* --- ADDED: Description for Mobile --- */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {getProductDescription(product)}
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-start">
                        <span className="text-xs uppercase tracking-wide font-semibold text-gray-500 mt-1">Category</span>
                        <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">{product.category.split(',')[0]}</span>
                    </div>

                    {/* Dynamic Features Loop */}
                    {allFeatureLabels.map((label) => {
                        const desc = product.description as KeyFeatureProductDescription;
                        const feature = (desc?.keyFeatures || []).find(f => f.title === label);
                        
                        return (
                         <div key={label} className="flex justify-between items-start border-t border-gray-50 pt-2">
                           <span className="text-xs uppercase tracking-wide font-semibold text-gray-500 mt-1">{label}</span>
                           <div className="text-sm text-gray-700 text-right max-w-[60%]">
                             {feature ? (
                               <ul className="list-none">
                                 {feature.items.map((item, i) => <li key={i}>{item}</li>)}
                               </ul>
                             ) : (
                               <span className="text-gray-300 italic">-</span>
                             )}
                           </div>
                         </div>
                        );
                    })}
                  </div>
                </div>
              ))}
            </div>


            {/* ========================================= */}
            {/* DESKTOP VIEW: Side-by-Side Grid Table     */}
            {/* ========================================= */}
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg pb-2">
              <div className="grid grid-cols-[250px_repeat(4,1fr)] min-w-full">
                
                {/* --- Empty Header Cell (Label Column) --- */}
                <div className="p-4 bg-gray-100 border-b border-gray-200"></div>
                
                {/* --- Product Header Cells --- */}
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 border-b border-gray-200 text-center relative group">
                    <button
                      onClick={() => removeFromCompare(product.slug)}
                      className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors z-10"
                      title="Remove from comparison"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative h-36 mb-3 w-full">
                          <Image 
                            src={product.image} 
                            alt={`[SEO Friendly] ${product.name}`} 
                            fill
                            className="object-contain" 
                          />
                      </div>
                      <strong className="text-sm font-semibold text-blue-600 group-hover:underline line-clamp-2">
                        {product.name}
                      </strong>
                    </Link>
                  </div>
                ))}

                {/* --- Empty Fillers --- */}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-header-${i}`} className="p-4 border-b border-gray-200"></div>
                ))}

                {/* --- SPECIFICATION ROWS --- */}
                <DesktopCompareRow label="Price" productValues={compareProducts.map(p => (
                  <span className="text-lg font-bold text-gray-900">{typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : 'Get a Quote'}</span>
                ))} />
                
                {/* --- ADDED: Description Row for Desktop --- */}
                <DesktopCompareRow label="Description" productValues={compareProducts.map(p => (
                  <span className="text-sm text-gray-600 block text-left line-clamp-4" title={getProductDescription(p)}>
                    {getProductDescription(p)}
                  </span>
                ))} />

                <DesktopCompareRow label="Category" productValues={compareProducts.map(p => (
                  <span className="text-sm text-gray-700">{p.category.split(',')[0]}</span>
                ))} />

                {/* --- Dynamic Feature Rows --- */}
                {allFeatureLabels.map(label => (
                  <DesktopCompareRow 
                    key={label}
                    label={label}
                    productValues={compareProducts.map(p => {
                      const desc = p.description as KeyFeatureProductDescription;
                      const feature = (desc?.keyFeatures || []).find(f => f.title === label);
                      return (
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 text-left inline-block">
                          {feature ? feature.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          )) : (
                            <li className="text-gray-400 italic list-none text-center">N/A</li>
                          )}
                        </ul>
                      );
                    })} 
                  />
                ))}

              </div>
            </div>
          </div>
        )}

      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}