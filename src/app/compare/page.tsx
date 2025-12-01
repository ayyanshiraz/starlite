"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import type { Product } from '../../lib/products'; // Import Type only

// --- ICONS ---
const iconProps = { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const TrashIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const CompareIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>);
const ChevronRightIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>);

const COMPARE_KEY = 'compareList';

// --- HELPER: Extract Description Text Safely ---
const getProductDescriptionText = (product: Product) => {
  if (!product.description) return "No description available.";
  if (typeof product.description === 'string') return product.description;
  
  // Handle Object description
  const desc: any = product.description;
  if (desc.summary) return desc.summary;
  if (desc.overview) return desc.overview;
  
  return "View product details for more info.";
};

// --- COMPONENT: Desktop Row ---
const DesktopCompareRow = ({ label, productValues }: { label: string, productValues: React.ReactNode[] }) => (
  <>
    <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-900 flex items-center">
      {label}
    </div>
    {productValues.map((value, index) => (
      <div key={index} className="p-4 border-b border-gray-200 text-sm text-center flex items-center justify-center">
        {value}
      </div>
    ))}
    {Array.from({ length: 4 - productValues.length }).map((_, i) => (
        <div key={`empty-${i}`} className="p-4 border-b border-gray-200"></div>
    ))}
  </>
);

export default function ComparePage() {
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load List from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) {
      setCompareSlugs(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  // 2. Fetch Product Data from API
  useEffect(() => {
    const fetchData = async () => {
      if (compareSlugs.length === 0) {
        setCompareProducts([]);
        return;
      }

      try {
        // Fetch each product by slug from the API we created
        const responses = await Promise.all(
          compareSlugs.map(slug => fetch(`/api/products/${slug}`).then(res => res.ok ? res.json() : null))
        );
        setCompareProducts(responses.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch compare products", error);
      }
    };

    if (isLoaded) fetchData();
  }, [compareSlugs, isLoaded]);
  
  const removeFromCompare = (slugToRemove: string) => {
    const updatedSlugs = compareSlugs.filter(s => s !== slugToRemove);
    setCompareSlugs(updatedSlugs);
    setCompareProducts(prev => prev.filter(p => p.slug !== slugToRemove));
    
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updatedSlugs));
    window.dispatchEvent(new Event('compare-updated'));
  };

  // --- Dynamic Feature Extraction ---
  // This tries to find common keys (like "Processor", "Memory") from JSON descriptions
  const allFeatureLabels = useMemo(() => {
    const labels = new Set<string>();
    compareProducts.forEach(product => {
      if (typeof product.description === 'object' && product.description !== null) {
        const desc: any = product.description;
        
        // Check for "keyFeatures" array style
        if (desc.keyFeatures && Array.isArray(desc.keyFeatures)) {
           desc.keyFeatures.forEach((f: any) => labels.add(f.title));
        }
        
        // Check for "Standard" object style (design, performance, etc.)
        if (desc.performance) {
           labels.add("Processor");
           labels.add("Memory");
           labels.add("Storage");
        }
        if (desc.connectivity) labels.add("Ports");
      }
    });
    return Array.from(labels);
  }, [compareProducts]);

  // --- Helper to get value for a specific label ---
  const getFeatureValue = (product: Product, label: string) => {
     if (typeof product.description !== 'object' || !product.description) return <span className="text-gray-300">-</span>;
     const desc: any = product.description;

     // 1. Try KeyFeatures Array
     if (desc.keyFeatures && Array.isArray(desc.keyFeatures)) {
        const feature = desc.keyFeatures.find((f: any) => f.title === label);
        if (feature) {
           return (
             <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 text-left inline-block">
               {feature.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
             </ul>
           );
        }
     }

     // 2. Try Standard Object Properties
     if (label === "Processor" && desc.performance?.processor) return desc.performance.processor;
     if (label === "Memory" && desc.performance?.memory) return desc.performance.memory;
     if (label === "Storage" && desc.performance?.storage) return desc.performance.storage;
     
     if (label === "Ports" && desc.connectivity?.ports) {
        return (
          <ul className="list-disc list-inside text-sm text-gray-700 text-left inline-block">
             {desc.connectivity.ports.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
        );
     }

     return <span className="text-gray-300">-</span>;
  };

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10">
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center"><Link href="/" className="hover:underline">Home</Link></li>
            <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
            <li className="text-gray-900 font-medium">Compare Products</li>
          </ol>
        </nav>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Comparison</h1>

        {!isLoaded ? (
          <div className="text-center text-gray-600 py-20">Loading comparison items...</div>
        ) : compareProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm"><CompareIcon className="w-10 h-10 text-gray-300" /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your compare list is empty</h2>
            <Link href="/shop" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-xl">Start Shopping</Link>
          </div>
        ) : (
          <div>
            {/* MOBILE VIEW */}
            <div className="block md:hidden space-y-6">
              {compareProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
                  <button onClick={() => removeFromCompare(product.slug)} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><TrashIcon className="w-5 h-5" /></button>
                  <div className="flex flex-col items-center mb-6 text-center">
                    <Link href={`/product/${product.slug}`} className="block mb-3">
                      <div className="relative w-40 h-40"><Image src={product.image} alt={product.name} fill className="object-contain" /></div>
                    </Link>
                    <Link href={`/product/${product.slug}`}><h3 className="text-lg font-bold text-blue-600 hover:underline mb-1">{product.name}</h3></Link>
                    <span className="text-xl font-bold text-gray-900 mb-3">{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</span>
                    <p className="text-sm text-gray-600 line-clamp-3">{getProductDescriptionText(product)}</p>
                  </div>
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    {allFeatureLabels.map((label) => (
                         <div key={label} className="flex justify-between items-start border-t border-gray-50 pt-2 first:border-0">
                           <span className="text-xs uppercase tracking-wide font-semibold text-gray-500 mt-1">{label}</span>
                           <div className="text-sm text-gray-700 text-right max-w-[60%]">{getFeatureValue(product, label)}</div>
                         </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg pb-2">
              <div className="grid grid-cols-[250px_repeat(4,1fr)] min-w-full">
                <div className="p-4 bg-gray-100 border-b border-gray-200"></div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 border-b border-gray-200 text-center relative group">
                    <button onClick={() => removeFromCompare(product.slug)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors z-10"><TrashIcon className="w-4 h-4" /></button>
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative h-36 mb-3 w-full"><Image src={product.image} alt={product.name} fill className="object-contain" /></div>
                      <strong className="text-sm font-semibold text-blue-600 group-hover:underline line-clamp-2">{product.name}</strong>
                    </Link>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => <div key={`empty-header-${i}`} className="p-4 border-b border-gray-200"></div>)}

                <DesktopCompareRow label="Price" productValues={compareProducts.map(p => <span className="text-lg font-bold text-gray-900">{typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}</span>)} />
                <DesktopCompareRow label="Description" productValues={compareProducts.map(p => <span className="text-sm text-gray-600 block text-left line-clamp-4" title={getProductDescriptionText(p)}>{getProductDescriptionText(p)}</span>)} />
                <DesktopCompareRow label="Category" productValues={compareProducts.map(p => <span className="text-sm text-gray-700">{p.category.split(',')[0]}</span>)} />
                
                {allFeatureLabels.map(label => (
                  <DesktopCompareRow key={label} label={label} productValues={compareProducts.map(p => getFeatureValue(p, label))} />
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