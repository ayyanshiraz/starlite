// src/app/category/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HeaderSection } from '../../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../../components/SharedComponents';
import { categoriesData } from '../../../lib/data';
import { allProducts, latestProducts } from '../../../lib/products';
import type { Product } from '../../../lib/products';

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
const HeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m6 9 6 6 6-6"></path></svg>
);
const ChevronLeftIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m15 18-6-6 6-6"></path></svg>
);
const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>
);
const CompareIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 3L4 7l4 4"/>
    <path d="M4 7h16"/>
    <path d="M16 21l4-4-4-4"/>
    <path d="M20 17H4"/>
  </svg>
);

// --- NEW LATEST PRODUCTS DATA (based on screenshot) ---
const newLatestProducts = [
  {
    id: "lp1",
    name: "Ubiquiti UniFi Switch Ultra 210W",
    price: 160.00,
    image: "/ubiquiti/12.jpg",
  },
  {
    id: "lp2",
    name: "Ubiquiti UniFi Switch Pro Max 24",
    price: 315.11,
    image: "/ubiquiti/5.jpg",
  },
  {
    id: "lp3",
    name: "Ubiquiti UniFi Switch USW-Enterprise-24-PoE",
    price: 570.00,
    image: "/ubiquiti/6.jpg",
  },
  {
    id: "lp4",
    name: "Ubiquiti UniFi U6+",
    price: 71.35,
    image: "/ubiquiti/7.jpg",
  },
  {
    id: "lp5",
    name: "Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2",
    price: 65.21,
    image: "/ubiquiti/8.jpg",
  },
];


// --- SUB-COMPONENTS ---
const Breadcrumbs = ({ categoryName }: { categoryName: string }) => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex">
      <li className="flex items-center">
        <Link href="/" className="hover:underline">Home</Link>
      </li>
      <li className="flex items-center mx-2">
        <ChevronRightIcon className="w-4 h-4" />
      </li>
      <li className="flex items-center">
        <Link href="/categories" className="hover:underline">Categories</Link>
      </li>
      <li className="flex items-center mx-2">
        <ChevronRightIcon className="w-4 h-4" />
      </li>
      <li className="text-gray-900 font-medium">{categoryName}</li>
    </ol>
  </nav>
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
              <span>£{minPrice}</span>
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
              <span>£{maxPrice}</span>
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
          <span className="text-gray-500">Price: £{minPrice} — £{maxPrice}</span>
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

const LatestProductsSidebar = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h3>
      <div className="space-y-6">
        {newLatestProducts.map((product) => (
          <Link href="#" key={product.id} className="flex items-center gap-4 group">
            <div className="w-20 h-20 bg-gray-100 rounded-md shrink-0">
              <Image src={product.image} alt={product.name} width={80} height={80} className="w-full h-full object-contain"/>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">{product.name}</h4>
              <p className="text-md font-bold text-gray-900 mt-1">Get a Quote</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SpecialOfferSidebar = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200">
      <Image 
        src="https://via.placeholder.com/300x250.png?text=Ad+Placeholder" 
        alt="Advertisement Placeholder"
        width={300}
        height={250}
        className="w-full h-auto"
      />
    </div>
  );
};
// --- END REFACTORED SIDEBAR ---

// --- START: NEW COMPONENT ---
// --- Calculate Category Counts ---
const categoryCounts = categoriesData.reduce((acc, category) => {
  const count = allProducts.filter(product => product.categorySlug === category.slug).length;
  acc[category.slug] = count;
  return acc;
}, {} as { [key: string]: number });


const CategoriesSidebar = () => (
  <div className="border border-[#00001E] rounded-lg overflow-hidden">
    <Link 
  href="/categories" 
  className="block p-4 border-b border-gray-200 transition bg-[#00001E] text-white font-medium hover:bg-gray-800"
>
      Show All Categories
    </Link>
    
    {categoriesData.map((category, index) => (
      <Link 
        key={category.slug}
        href={`/category/${category.slug}`} 
        className={`
  block p-4 text-gray-800 transition hover:bg-[#00001E] hover:text-white
  ${index < categoriesData.length - 1 ? 'border-b border-gray-200' : ''}
`}
      >
        {category.name} ({categoryCounts[category.slug] || 0})
      </Link>
    ))}
  </div>
);
// --- END: NEW COMPONENT ---


const SortToolbar = ({ viewMode, setViewMode, setSortBy, setPerPage, totalProducts, perPage, sortBy }: {
  viewMode: 'grid' | 'list',
  setViewMode: (mode: 'grid' | 'list') => void,
  setSortBy: (sort: string) => void,
  setPerPage: (num: number) => void,
  totalProducts: number,
  perPage: number,
  sortBy: string
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-6">
      
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-label="Grid View"><GridIcon className="w-5 h-5" /></button>
        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-label="List View"><ListIcon className="w-5 h-5" /></button>
      </div>
      
      <span className="text-sm text-gray-600 mb-4 md:mb-0">
        Showing {totalProducts > perPage ? perPage : totalProducts} of {totalProducts} results
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
        
        <div className="relative">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 px-4 pr-8 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <option value="12">Show 12</option>
            <option value="24">Show 24</option>
            <option value="36">Show 36</option>
            <option value="48">Show 48</option>
            <option value="60">Show 60</option>
            <option value={totalProducts}>Show All ({totalProducts})</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewMode }: { product: Product, viewMode: 'grid' | 'list' }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  
  const productPrice = typeof product.price === 'number' ? product.price : -1;
  const priceDisplay = productPrice !== -1 ? `£${productPrice.toFixed(2)}` : 'Get a Quote';
  
  const productUrl = `/product/${product.slug}`; 

  // --- LIST VIEW ---
  if (viewMode === 'list') {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-6 bg-[#00001E] text-white">
        <Link href={productUrl} className="w-full md:w-1/3 h-60 md:h-full shrink-0">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300} 
            height={300} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
        <div className="grow">
          <span className="text-xs text-gray-400">{product.category}</span>
          <Link href={productUrl}><h3 className="text-lg font-bold hover:text-blue-400 transition mt-1">{product.name}</h3></Link>
          <p className="text-xl font-bold my-3">{priceDisplay}</p>
          <p className="text-sm text-gray-300 mb-4">This is a placeholder description for the product. More details would go here.</p>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-md hover:bg-blue-700 transition">
              {productPrice !== -1 ? 'Add to Cart' : 'Get a Quote'}
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-300 font-medium hover:text-blue-400">
              <HeartIcon className="w-5 h-5" /> Add to wishlist
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div
      className="relative w-full border border-gray-800 rounded-lg group transition-all bg-[#00001E] text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 hover:text-white text-gray-200 transition">
        <HeartIcon className="w-4 h-4" />
      </button>
      
      <Link href={productUrl} className="block w-full h-48 bg-gray-900 p-3 rounded-t-lg">
        <Image 
          src={product.image} 
          alt={product.name} 
          width={300} 
          height={300} 
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform"
        />
      </Link>
      
      <div className="p-3 text-center h-[120px] flex flex-col justify-center">
        {!isHovered ? (
          // --- DEFAULT VIEW (TEXT & PRICE) ---
          <div>
            <span className="text-xs text-gray-400">{product.category}</span>
            <Link href={productUrl}>
              <h3 className="text-sm font-semibold hover:text-blue-400 transition mt-1 h-10 overflow-hidden">
                {product.name}
              </h3>
            </Link>
            <p className="text-lg font-bold my-3">{priceDisplay}</p>
          </div>
        ) : (
          // --- HOVER VIEW (BUTTONS) ---
          <div className="animate-fadeIn">
            <button className="bg-blue-600 text-white w-full py-2 rounded-md font-bold mb-2 hover:bg-blue-700">
              Get a Quote
            </button>
            <div className="flex justify-center gap-4 text-sm">
  <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400">
    <HeartIcon className="w-4 h-4"/> Add to wishlist
  </button>
  <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400">
    <CompareIcon className="w-4 h-4"/> Compare
  </button>
</div>
          </div>
        )}
      </div>
    </div>
  );
};


const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const rangeWithDots: (string | number)[] = [];
  if (currentPage <= 3) {
    rangeWithDots.push(1, 2, 3, '...', totalPages);
  }
  else if (currentPage >= totalPages - 2) {
    rangeWithDots.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
  }
  else {
    rangeWithDots.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }
  return rangeWithDots;
};


const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  if (totalPages <= 1) return null;
  
  const pages = getPaginationItems(currentPage, totalPages);

  const baseButtonStyles = "w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors";
  const arrowButtonStyles = `${baseButtonStyles} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent`;
  const numberButtonStyles = `${baseButtonStyles} text-gray-700 hover:bg-gray-100`;
  const activeButtonStyles = `${baseButtonStyles} bg-blue-600 text-white shadow-md hover:bg-blue-700`;
  const dotsStyles = "w-10 h-10 flex items-center justify-center text-gray-500";

  return (
    <nav className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowButtonStyles}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      
      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? activeButtonStyles : numberButtonStyles}
            aria-label={page === currentPage ? `Current page, page ${page}` : `Go to page ${page}`}
          >
            {page}
          </button>
        ) : (
          <span
            key={`dots-${index}`}
            className={dotsStyles}
          >
            ...
          </span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowButtonStyles}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};


// --- MAIN CATEGORY PAGE COMPONENT ---
export default function CategoryDetailPage() {

  const params = useParams();
  const slug = params.slug as string;
  
  // --- LOGIC START ---
  const mainCategory = categoriesData.find(c => c.slug === slug);

  const dynamicCategoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const categoryName = mainCategory ? mainCategory.name : dynamicCategoryName;
  // --- LOGIC END ---
  
  const MAX_SLIDER_PRICE = 2500; 

  // --- Page State ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- Price Filter State ---
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_SLIDER_PRICE);
  
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(MAX_SLIDER_PRICE);

  const handleFilterClick = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setCurrentPage(1); 
  };

  useEffect(() => {
    // Update SEO metadata dynamically
    if (mainCategory) {
      document.title = mainCategory.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', mainCategory.metaDescription);
      }
    } else if (slug) {
      document.title = `Shop ${categoryName} | Starlite Linker`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Browse all ${categoryName} products available at Starlite Linker. Find the best IT solutions for your business.`);
      }
    } else {
      document.title = "Category | Starlite Linker";
    }
  }, [mainCategory, slug, categoryName]);

  // --- ================================== ---
  // --- THIS IS THE CORRECTED SEARCH LOGIC ---
  // --- ================================== ---
  const categoryProducts = allProducts.filter(product => {
    // Check for price match first
    const productPrice = typeof product.price === 'number' ? product.price : -1;
    const priceMatch = (productPrice === -1)
                      || (productPrice >= appliedMinPrice && productPrice <= appliedMaxPrice);
    
    if (!priceMatch) return false;

    // Now, check for category match
    if (mainCategory) {
      // This is a main category (e.g., "computers-and-laptops")
      // We match against the product's 'categorySlug'
      return product.categorySlug === slug;
    } else {
      // This is a dynamic slug (e.g., "dell" or "hp-laptops")
      // We create an array of search terms
      const searchTerms = slug.split('-'); // e.g., ["hp", "laptops"] or ["lenovo", "laptop"]
      
      // Combine the product's searchable fields into one string
      const searchableProductText = (product.name + ' ' + product.category).toLowerCase();
      
      // Check if ALL search terms are present in the product text
      // This handles the "laptop" vs "laptops" mismatch
      return searchTerms.every(term => {
          if (term === 'laptop') {
            return searchableProductText.includes('laptop') || searchableProductText.includes('laptops');
          }
          if (term === 'laptops') {
            return searchableProductText.includes('laptop') || searchableProductText.includes('laptops');
          }
          // For all other terms (e.g., "hp", "dell"), do a direct check
          return searchableProductText.includes(term);
      });
    }
  });
  // --- ================================== ---
  // ---  END OF CORRECTED LOGIC     ---
  // --- ================================== ---

  const sortedProducts = [...categoryProducts].sort((a, b) => {
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
  const totalPages = Math.ceil(totalProducts / perPage);
  const productsToShow = sortedProducts.slice(0, currentPage * perPage);
  



  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-8 py-10">
        <Breadcrumbs categoryName={categoryName} />
        
        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- THIS IS THE UPDATED ASIDE --- */}
          <aside className="w-full lg:w-1/4 space-y-8 lg:sticky top-10 self-start">
            <CategoriesSidebar />
            <FilterSidebar
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              maxSliderPrice={MAX_SLIDER_PRICE}
              onFilterClick={handleFilterClick}
            />
            <SpecialOfferSidebar />
            <LatestProductsSidebar />
          </aside>

          <div className="w-full lg:w-3/4">
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{categoryName}</h1>
            
            <SortToolbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              setSortBy={setSortBy}
              setPerPage={setPerPage}
              totalProducts={totalProducts}
              perPage={perPage}
              sortBy={sortBy}
            />

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'} gap-4`}>
              {productsToShow.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

           {productsToShow.length === 0 && (
              <div className="text-center text-gray-500 py-16 border border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="mt-2">No products were found for "{categoryName}" or match your current price filter.</p>
              </div>
            )}

            {/* --- LOAD MORE BUTTON --- */}
{productsToShow.length < totalProducts && (
  <div className="flex justify-center mt-10">
    <button
      onClick={() => setCurrentPage(prevPage => prevPage + 1)}
      className="bg-[#00001E] text-white font-medium py-3 px-8 rounded-md hover:bg-gray-800 transition"
    >
      Load More Products
    </button>
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