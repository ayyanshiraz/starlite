"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderSection } from '@/components/Header'; 
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents'; 
import { categoriesData } from '@/lib/data';
import type { Product } from '@/lib/products'; 
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { useCart } from '@/hooks/useCart';

// --- ICONS ---
const iconProps = { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const GridIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>);
const ListIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg>);
const HeartIcon = ({ className = "", fill = "none" }) => (<svg {...iconProps} fill={fill} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const ChevronDownIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m6 9 6 6 6-6"></path></svg>);
const ChevronLeftIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m15 18-6-6 6-6"></path></svg>);
const ChevronRightIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>);
const CompareIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>);

// --- HELPER: CATEGORY NORMALIZER ---
const normalizeCategoryName = (rawCategory: string, currentBrandName: string): string => {
  if (!rawCategory) return "Other";
  const parts = rawCategory.split(',');
  let specificPart = parts[parts.length - 1].trim();
  if (specificPart.toLowerCase() === currentBrandName.toLowerCase() && parts.length > 1) {
    specificPart = parts[parts.length - 2].trim();
  }
  const brandRegex = new RegExp(`\\b${currentBrandName}\\b`, 'gi');
  let cleanName = specificPart.replace(brandRegex, '').trim();
  cleanName = cleanName.replace(/^[-&,]+|[-&,]+$/g, '').trim();
  if (cleanName.toLowerCase().includes('laptop') || cleanName.toLowerCase().includes('notebook')) return 'Laptops';
  if (cleanName.toLowerCase().includes('dock')) return 'Docking Stations';
  if (cleanName.toLowerCase().includes('workstation')) return 'Workstations';
  if (cleanName.toLowerCase().includes('switch')) return 'Switches';
  if (cleanName.toLowerCase().includes('server')) return 'Servers';
  if (cleanName.toLowerCase().includes('display') || cleanName.toLowerCase().includes('monitor')) return 'Displays';
  return cleanName || "Accessories";
};

// --- SUB-COMPONENTS ---
const Breadcrumbs = ({ categoryName }: { categoryName: string }) => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex">
      <li className="flex items-center"><Link href="/" className="hover:underline">Home</Link></li>
      <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
      <li className="flex items-center"><Link href="/categories" className="hover:underline">Categories</Link></li>
      <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
      <li className="text-gray-900 font-medium">{categoryName}</li>
    </ol>
  </nav>
);

const FilterSidebar = ({ minPrice, setMinPrice, maxPrice, setMaxPrice, maxSliderPrice, onFilterClick }: any) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1));
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1));

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 pt-4">Price</h4>
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-sm text-gray-600"><span>Min Price</span><span>${minPrice}</span></div>
            <input type="range" min="0" max={maxSliderPrice} value={minPrice} onChange={handleMinChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{ accentColor: '#00001E' }} />
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600"><span>Max Price</span><span>${maxPrice}</span></div>
            <input type="range" min="0" max={maxSliderPrice} value={maxPrice} onChange={handleMaxChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{ accentColor: '#00001E' }} />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm pt-2"><span className="text-gray-500">Price: ${minPrice} — ${maxPrice}</span></div>
        <button onClick={onFilterClick} className="w-full bg-[#00001E] text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition mt-6">Filter</button>
      </div>
    </div>
  );
};

const LatestProductsSidebar = ({ products }: { products: Product[] }) => {
  const sidebarProducts = products.slice(0, 5); 
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h3>
      <div className="space-y-6">
        {sidebarProducts.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id} className="flex items-center gap-4 group">
            <div className="w-20 h-20 bg-gray-100 rounded-md shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden">
              <Image src={product.image} alt={product.name} width={80} height={80} className="object-contain w-full h-full p-1 transition-transform group-hover:scale-105"/>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition line-clamp-2">{product.name}</h4>
              <p className="text-md font-bold text-gray-900 mt-1">{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const DynamicCategoriesSidebar = ({ currentCategoryName, products, onSubCategoryClick, activeSubCategory }: any) => {
  const subCategoryStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    products.forEach((product: Product) => {
      const cleanName = normalizeCategoryName(product.category, currentCategoryName);
      stats[cleanName] = (stats[cleanName] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [products, currentCategoryName]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
      <Link href="/categories" className="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100 text-blue-600 hover:text-blue-800 transition-colors group">
        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" /><span className="text-sm font-semibold">Show All Categories</span>
      </Link>
      <div className="px-5 py-4"><h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">{currentCategoryName}<span className="text-gray-400 font-normal text-sm">({products.length})</span></h2></div>
      <div className="flex flex-col pb-2">
        <button onClick={() => onSubCategoryClick(null)} className={`group relative flex items-center justify-between px-5 py-3 text-sm transition-all ${activeSubCategory === null ? 'text-blue-700 font-semibold bg-blue-50/50 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}>
          <span>View All</span><span className={`text-xs py-0.5 px-2 rounded-full ${activeSubCategory === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>{products.length}</span>
        </button>
        {subCategoryStats.map(([displayName, count]) => {
          const isActive = activeSubCategory === displayName;
          return (
            <button key={displayName} onClick={() => onSubCategoryClick(displayName)} className={`group relative flex items-center justify-between px-5 py-2.5 text-sm transition-all border-t border-gray-50 ${isActive ? 'text-blue-700 font-semibold bg-blue-50/50 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}>
              <span className="truncate pr-2">{displayName}</span><span className={`text-xs py-0.5 px-2 rounded-full ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewMode }: { product: Product, viewMode: 'grid' | 'list' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const { addToCart } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => { e.preventDefault(); addToCart(product); };
  const [isHovered, setIsHovered] = useState(false);
  
  const isQuoteOnly = typeof product.price !== 'number';
  const priceDisplay = !isQuoteOnly ? `$${Number(product.price).toFixed(2)}` : 'Get a Quote';
  const productUrl = `/product/${product.slug}`; 

  if (viewMode === 'list') {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-6 bg-white text-gray-900">
        <Link href={productUrl} className="w-full md:w-1/3 h-60 md:h-full shrink-0">
          <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-full object-contain rounded-md"/>
        </Link>
        <div className="grow">
          <span className="text-xs text-gray-500">{product.category}</span>
          <Link href={productUrl}><h3 className="text-lg font-bold hover:text-blue-600 transition mt-1">{product.name}</h3></Link>
          <p className="text-xl font-bold my-3">{priceDisplay}</p>
          <div className="flex items-center gap-4">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-md hover:bg-blue-700 transition">{!isQuoteOnly ? 'Add to Cart' : 'Get a Quote'}</button>
            <button onClick={toggleWishlist} className={`flex items-center gap-2 text-sm font-medium transition ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}><HeartIcon className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} /> {isInWishlist ? 'Saved' : 'Add to wishlist'}</button>
            <button onClick={toggleCompare} className={`flex items-center gap-2 text-sm font-medium transition ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}><CompareIcon className="w-5 h-5"/> {isInCompare ? 'Added' : 'Compare'}</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full border border-gray-200 rounded-lg group transition-all bg-white text-gray-900 shadow-sm hover:shadow-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <button onClick={toggleWishlist} className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition ${isInWishlist ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'}`}><HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /></button>
      <Link href={productUrl} className="block w-full h-48 bg-white p-3 rounded-t-lg">
        <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-full object-contain rounded-md group-hover:scale-105 transition-transform"/>
      </Link>
      <div className="p-3 text-center h-[120px] flex flex-col justify-center">
        {!isHovered ? (
          <div><span className="text-xs text-gray-500">{product.category.split(',')[0]}</span><Link href={productUrl}><h3 className="text-sm font-semibold hover:text-blue-600 transition mt-1 h-10 overflow-hidden line-clamp-2">{product.name}</h3></Link><p className="text-lg font-bold my-3">{priceDisplay}</p></div>
        ) : (
          <div className="animate-fadeIn flex flex-col gap-2">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white w-full py-2 rounded-md font-bold text-sm hover:bg-blue-700 transition">{!isQuoteOnly ? 'Add to Cart' : 'Get a Quote'}</button>
            <div className="flex flex-col"><button onClick={toggleWishlist} className={`flex items-center justify-center gap-2 w-full py-1 rounded-md font-bold text-sm transition ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}><HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"}/> {isInWishlist ? 'Saved' : 'Add to wishlist'}</button><button onClick={toggleCompare} className={`flex items-center justify-center gap-2 w-full py-1 rounded-md font-bold text-sm transition ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}><CompareIcon className="w-4 h-4"/> {isInCompare ? 'Added' : 'Compare'}</button></div>
          </div>
        )}
      </div>
    </div>
  );
};

const SortToolbar = ({ viewMode, setViewMode, setSortBy, setPerPage, totalProducts, perPage, sortBy }: any) => (
  <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-6">
    <div className="flex items-center gap-2 mb-4 md:mb-0"><button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><GridIcon className="w-5 h-5" /></button><button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><ListIcon className="w-5 h-5" /></button></div>
    <span className="text-sm text-gray-600 mb-4 md:mb-0">Showing {totalProducts > 0 ? 1 : 0}–{Math.min(perPage, totalProducts)} of {totalProducts} results</span>
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
      <div className="relative w-full sm:w-auto"><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-100 border border-gray-200 rounded-md py-2 px-4 text-sm text-gray-700 font-medium cursor-pointer w-full sm:appearance-none sm:pr-8"><option value="default">Default sorting</option><option value="price_asc">Sort by price: low to high</option><option value="price_desc">Sort by price: high to low</option><option value="name_asc">Sort by name: A to Z</option></select></div>
      <div className="relative w-full sm:w-auto"><select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="bg-gray-100 border border-gray-200 rounded-md py-2 px-4 text-sm text-gray-700 font-medium cursor-pointer w-full sm:appearance-none sm:pr-8"><option value="12">Show 12</option><option value="24">Show 24</option><option value="36">Show 36</option><option value={totalProducts}>Show All</option></select></div>
    </div>
  </div>
);

// 🟢 Accept data as Props
export default function CategoryPageClient({ products, slug }: { products: Product[], slug: string }) {
  
  const mainCategory = categoriesData.find(c => c.slug === slug);
  const dynamicCategoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryName = mainCategory ? mainCategory.name : dynamicCategoryName;
  
  const MAX_SLIDER_PRICE = 2500; 

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_SLIDER_PRICE);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(MAX_SLIDER_PRICE);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const handleFilterClick = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setCurrentPage(1); 
  };

  // 🟢 Filter logic using passed props
  const categoryProducts = useMemo(() => {
    if (!products) return [];
    return products; // The server has already filtered by slug!
  }, [products]);

  const filteredProducts = useMemo(() => {
      return categoryProducts.filter(product => {
          const productPrice = typeof product.price === 'number' ? product.price : -1;
          const priceMatch = (productPrice === -1) || (productPrice >= appliedMinPrice && productPrice <= appliedMaxPrice);
          if (!priceMatch) return false;
          if (selectedSubCategory) {
             const productCleanCategory = normalizeCategoryName(product.category, categoryName);
             if (productCleanCategory !== selectedSubCategory) return false;
          }
          return true;
      });
  }, [categoryProducts, appliedMinPrice, appliedMaxPrice, selectedSubCategory, categoryName]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = typeof a.price === 'number' ? a.price : Infinity;
    const priceB = typeof b.price === 'number' ? b.price : Infinity;
    switch (sortBy) {
      case 'price_asc': return priceA - priceB;
      case 'price_desc': return priceB - priceA;
      case 'name_asc': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const totalProducts = sortedProducts.length;
  const productsToShow = sortedProducts.slice(0, currentPage * perPage);

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />
      <div className="container mx-auto px-8 py-10">
        <Breadcrumbs categoryName={categoryName} />
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4 space-y-8 lg:sticky top-10 self-start">
            <DynamicCategoriesSidebar 
               currentCategoryName={categoryName}
               products={categoryProducts} 
               activeSubCategory={selectedSubCategory}
               onSubCategoryClick={(sub: string | null) => { setSelectedSubCategory(sub); setCurrentPage(1); }}
            />
            <FilterSidebar
              minPrice={minPrice} setMinPrice={setMinPrice}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              maxSliderPrice={MAX_SLIDER_PRICE} onFilterClick={handleFilterClick}
            />
            <LatestProductsSidebar products={products} />
          </aside>

          <div className="w-full lg:w-3/4">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{categoryName}</h1>
            <SortToolbar
              viewMode={viewMode} setViewMode={setViewMode}
              setSortBy={setSortBy} setPerPage={setPerPage}
              totalProducts={totalProducts} perPage={perPage} sortBy={sortBy}
            />
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'} gap-4`}>
              {productsToShow.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
            {productsToShow.length === 0 && (
             <div className="text-center text-gray-500 py-16 border border-dashed rounded-lg">
               <h3 className="text-xl font-semibold">No Products Found</h3>
               {selectedSubCategory && <button onClick={() => setSelectedSubCategory(null)} className="text-blue-600 underline mt-2">Clear Category Filter</button>}
             </div>
            )}
            {productsToShow.length < totalProducts && (
              <div className="flex justify-center mt-10">
                <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} className="bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition">Load More Products</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}