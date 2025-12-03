"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import type { Product } from '../../lib/products';
import { useWishlist } from '../../hooks/useWishlist';
import { useCompare } from '../../hooks/useCompare';
import { useCart } from '../../hooks/useCart';
// 🟢 Import Quote Modal
import QuoteModal from '@/components/QuoteModal';

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

const GridIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
);
const ListIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg>
);
const HeartIcon = ({ className = "", fill = "none" }) => (
  <svg {...iconProps} fill={fill} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const CompareIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 3L4 7l4 4"/>
    <path d="M4 7h16"/>
    <path d="M16 21l4-4-4-4"/>
    <path d="M20 17H4"/>
  </svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m6 9 6 6 6-6"></path></svg>
);
const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>
);

// --- HELPER TYPE ---
type CategoryCount = [string, number];
const MAX_SLIDER_PRICE = 2500;

// --- SUB-COMPONENTS ---

const Breadcrumbs = () => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex">
      <li className="flex items-center">
        <Link href="/" className="hover:underline">Home</Link>
      </li>
      <li className="flex items-center mx-2">
        <ChevronRightIcon className="w-4 h-4" />
      </li>
      <li className="text-gray-900 font-medium">Shop</li>
    </ol>
  </nav>
);

const ShopCategoriesSidebar = ({
  categories,
  selectedCategory,
  onSelectCategory
}: {
  categories: CategoryCount[],
  selectedCategory: string | null,
  onSelectCategory: (category: string | null) => void
}) => (
  <div className="border border-gray-200 rounded-lg">
    <h3 className="text-lg font-bold text-gray-900 mb-4 p-4 border-b border-gray-200">Browse Categories</h3>
    <div className="max-h-[600px] overflow-y-auto">
      <button
        onClick={() => onSelectCategory(null)}
        className={`
          block w-full text-left p-3 text-sm font-medium transition-colors
          ${selectedCategory === null ? 'bg-[#00001E] text-white' : 'text-gray-800 hover:bg-gray-100'}
        `}
      >
        All Categories
      </button>
      {categories.map(([name, count]) => (
        <button
          key={name}
          onClick={() => onSelectCategory(name)}
          className={`
            block w-full text-left p-3 text-sm transition-colors border-t border-gray-100
            ${selectedCategory === name ? 'bg-[#00001E] text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}
          `}
        >
          {name} ({count})
        </button>
      ))}
    </div>
  </div>
);

const FilterSidebar = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  maxSliderPrice,
  onFilterClick
}: {
  minPrice: number;
  setMinPrice: (val: number) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  maxSliderPrice: number;
  onFilterClick: () => void;
}) => {

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 pt-4">Price</h4>
        
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Min Price</span>
              <span>${minPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxSliderPrice}
              value={minPrice}
              onChange={handleMinChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#2563eb' }}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Max Price</span>
              <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxSliderPrice}
              value={maxPrice}
              onChange={handleMaxChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#2563eb' }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <span className="text-gray-500">Price: ${minPrice} — ${maxPrice}</span>
        </div>
        
        <button
          onClick={onFilterClick}
          className="w-full bg-[#00001E] text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition mt-6"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

const SortToolbar = ({ viewMode, setViewMode, setSortBy, totalProducts, sortBy }: {
  viewMode: 'grid' | 'list',
  setViewMode: (mode: 'grid' | 'list') => void,
  setSortBy: (sort: string) => void,
  totalProducts: number,
  sortBy: string
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-6">
      
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-label="Grid View"><GridIcon className="w-5 h-5" /></button>
        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-label="List View"><ListIcon className="w-5 h-5" /></button>
      </div>
      
      <span className="text-sm text-gray-600 mb-4 md:mb-0">
        Showing all {totalProducts} results
      </span>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 px-4 pr-8 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <option value="default">Default sorting</option>
            <option value="price_asc">Sort by price: low to high</option>
            <option value="price_desc">Sort by price: high to low</option>
            <option value="name_asc">Sort by name: A to Z</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

// --- SHOP PRODUCT CARD ---
// 🟢 Updated to accept onQuoteClick
const ShopProductCard = ({ 
  product, 
  viewMode, 
  onQuoteClick 
}: { 
  product: Product, 
  viewMode: 'grid' | 'list',
  onQuoteClick: (p: Product) => void 
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const { addToCart } = useCart();
  
  const isQuoteOnly = typeof product.price !== 'number';
  const availabilityText = product.availability || 'In Stock';
  const isOutOfStock = availabilityText.toLowerCase().includes('out') || availabilityText.toLowerCase().includes('sold');

  // 🟢 Unified Action Handler
  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isQuoteOnly) {
        onQuoteClick(product);
    } else if (!isOutOfStock) {
        addToCart(product);
    }
  };

  const productPrice = !isQuoteOnly ? product.price as number : -1;
  const priceDisplay = !isQuoteOnly ? `$${productPrice.toFixed(2)}` : 'Get a Quote';
  const productUrl = `/product/${product.slug}`;

  // --- LIST VIEW ---
  if (viewMode === 'list') {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-6 bg-white text-gray-900">
        <Link href={productUrl} className="w-full md:w-1/4 h-48 md:h-auto shrink-0 relative">
          <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-full object-contain rounded-md" />
        </Link>
        <div className="grow">
          <span className="text-xs text-gray-500">{product.category}</span>
          <Link href={productUrl}><h3 className="text-lg font-bold hover:text-blue-600 transition mt-1">{product.name}</h3></Link>
          <p className="text-xl font-bold my-3 text-gray-900">{priceDisplay}</p>
          
          <div className="flex flex-wrap items-center gap-4">
           <button 
              onClick={handleAction}
              disabled={!isQuoteOnly && isOutOfStock}
              className={`font-bold py-2 px-5 rounded-md transition ${(!isQuoteOnly && isOutOfStock) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {isQuoteOnly ? 'Get a Quote' : (isOutOfStock ? 'Out of Stock' : 'Add to Cart')}
            </button>
            <button onClick={toggleWishlist} className={`flex items-center gap-2 text-sm font-medium transition ${isInWishlist ? 'text-red-600' : 'text-gray-700 hover:text-blue-600'}`}>
              <HeartIcon className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} /> {isInWishlist ? 'Saved' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="relative w-full border border-gray-200 rounded-lg group transition-all bg-white text-gray-900 flex flex-col">
      <Link href={productUrl} className="block w-full h-48 bg-white p-3 rounded-t-lg relative">
         <div className="relative w-full h-full">
            <Image src={product.image} alt={product.name} fill className="object-contain rounded-md group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 100vw, 33vw"/>
         </div>
      </Link>
      
      <div className="p-4 text-left flex flex-col flex-grow">
        <span className="text-xs text-gray-500">{product.category ? product.category.split(',')[0] : 'Product'}</span>
        <Link href={productUrl} className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition mt-1 h-10 overflow-hidden line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-lg font-bold text-gray-900 my-2">{priceDisplay}</p>
        
        <div className="mt-auto space-y-2">
            <button 
             onClick={handleAction}
             disabled={!isQuoteOnly && isOutOfStock}
             className={`w-full text-center font-semibold py-2.5 rounded-md text-sm transition-all duration-300 ${(!isQuoteOnly && isOutOfStock) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
           >
             {isQuoteOnly ? 'Get a Quote' : (isOutOfStock ? 'Out of Stock' : 'Add to Cart')}
           </button>
           <div className="flex justify-between items-center pt-1 gap-2">
             <button onClick={toggleWishlist} className={`flex-1 flex items-center justify-center gap-1.5 text-sm transition-colors border rounded-md py-2 ${isInWishlist ? 'text-red-600 font-medium border-red-200 bg-red-50' : 'text-gray-500 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}>
               <HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
             </button>
             <button onClick={toggleCompare} className={`flex-1 flex items-center justify-center gap-1.5 text-sm transition-colors border rounded-md py-2 ${isInCompare ? 'text-blue-600 font-medium border-blue-200 bg-blue-50' : 'text-gray-500 border-gray-300 hover:text-blue-600 hover:border-blue-500'}`}>
               <CompareIcon className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CLIENT COMPONENT ---
export default function ShopPageClient({ products }: { products: Product[] }) {

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_SLIDER_PRICE);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(MAX_SLIDER_PRICE);

  const [allCategories, setAllCategories] = useState<CategoryCount[]>([]);
  
  // 🟢 Quote Modal State
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  useEffect(() => {
    const categoryMap = new Map<string, number>();
    if (products) {
        products.forEach(product => {
        const cats = product.category ? product.category.split(',').map(c => c.trim()) : ['Uncategorized'];
        cats.forEach(cat => {
            if (cat) {
            categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
            }
        });
        });
    }
    const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    setAllCategories(sortedCategories);
  }, [products]);

  const handleFilterClick = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      // Price Filter
      const productPrice = typeof product.price === 'number' ? product.price : -1;
      const priceMatch = (productPrice === -1) || (productPrice >= appliedMinPrice && productPrice <= appliedMaxPrice);
      if (!priceMatch) return false;

      // Category Filter
      if (selectedCategory) {
        const productCategories = product.category.split(',').map(c => c.trim());
        if (!productCategories.includes(selectedCategory)) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, appliedMinPrice, appliedMaxPrice]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = typeof a.price === 'number' ? a.price : Infinity;
      const priceB = typeof b.price === 'number' ? b.price : Infinity;
      
      switch (sortBy) {
        case 'price_asc': return priceA - priceB;
        case 'price_desc': return priceB - priceA;
        case 'name_asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const totalProducts = sortedProducts.length;

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10">
        <Breadcrumbs />
        
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4 space-y-8 lg:sticky top-10 self-start">
            <ShopCategoriesSidebar
              categories={allCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <FilterSidebar
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              maxSliderPrice={MAX_SLIDER_PRICE}
              onFilterClick={handleFilterClick}
            />
          </aside>

          <div className="w-full lg:w-3/4">
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {selectedCategory ? selectedCategory : 'All Products'}
            </h1>
            
            <SortToolbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              setSortBy={setSortBy}
              totalProducts={totalProducts}
              sortBy={sortBy}
            />

            {sortedProducts.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {sortedProducts.map((product, index) => (
                  <ShopProductCard 
                    key={`${product.id}-${index}`} 
                    product={product} 
                    viewMode={viewMode}
                    // 🟢 Pass handler to card
                    onQuoteClick={setQuoteProduct} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-16 border border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="mt-2">Try adjusting your filters or selecting a different category.</p>
              </div>
            )}

          </div>
        </div>
      </div>
      <ChatButton />
      <CustomScrollbarStyles />

      {/* 🟢 Global Quote Modal */}
      <QuoteModal 
         isOpen={!!quoteProduct} 
         onClose={() => setQuoteProduct(null)} 
         product={quoteProduct} 
      />
    </main>
  );
}