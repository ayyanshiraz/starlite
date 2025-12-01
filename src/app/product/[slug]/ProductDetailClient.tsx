"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- IMPORTS ---
import { HeaderSection } from '@/components/Header'; 
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents'; 
import { categoriesData } from '@/lib/data';
import type { Product, StandardProductDescription, KeyFeatureProductDescription } from '@/lib/products';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { useCart } from '@/hooks/useCart';

// --- ICONS ---
const iconProps = { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const HeartIcon = ({ className = "", fill = "none" }) => (<svg {...iconProps} fill={fill} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const ChevronRightIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>);
const ChevronLeftIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m15 18-6-6 6-6"></path></svg>);
const CompareIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>);
const StarIcon = ({ className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const CheckCircleIcon = ({ className = "" }) => (<svg {...iconProps} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const XCircleIcon = ({ className = "" }) => (<svg {...iconProps} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>);

// --- SIDEBAR COMPONENTS (Fixed to not rely on allProducts) ---
const CategoriesSidebar = ({ currentCategorySlug }: { currentCategorySlug?: string }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
      <Link href="/categories" className="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100 text-blue-600 hover:text-blue-800 transition-colors group">
        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-semibold">Show All Categories</span>
      </Link>
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold text-gray-900">Browse Categories</h2>
      </div>
      <div className="flex flex-col pb-2">
        {categoriesData.map((category) => {
          const isActive = category.slug === currentCategorySlug;
          return (
            <Link
              key={category.slug}
              href={`/shop?category=${category.name}`} // Updated to point to shop filter
              className={`group relative flex items-center justify-between px-5 py-2.5 text-sm transition-all border-t border-gray-50 ${isActive ? 'text-blue-700 font-semibold bg-blue-50/50 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}
            >
              <span className="truncate pr-2">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Simplified sidebar (Since we don't have global data here anymore)
const LatestProductsSidebar = () => (
  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Shop More</h3>
    <p className="text-sm text-gray-500">Check our shop page for the latest additions.</p>
    <Link href="/shop" className="mt-4 inline-block text-blue-600 font-bold hover:underline">Go to Shop →</Link>
  </div>
);

const Breadcrumbs = ({ product }: { product: Product }) => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex flex-wrap">
      <li className="flex items-center"><Link href="/" className="hover:underline">Home</Link></li>
      <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
      <li className="flex items-center"><Link href="/shop" className="hover:underline">Shop</Link></li>
      <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
      <li className="text-gray-900 font-medium truncate max-w-[150px] md:max-w-none">{product.name}</li>
    </ol>
  </nav>
);

// --- PRODUCT GALLERY ---
const ProductGallery = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full md:w-2/5"> 
        <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-center shadow-sm cursor-zoom-in relative group hover:shadow-md transition-shadow duration-300" onClick={() => setIsOpen(true)} title="Click to zoom image">
          <Image src={product.image} alt={product.name} width={400} height={400} className="max-w-full h-auto object-contain max-h-[300px] md:max-h-[400px] transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold shadow-lg text-gray-800 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Click to Zoom</div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200" onClick={() => setIsOpen(false)}>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <Image src={product.image} alt={product.name} fill className="object-contain" sizes="100vw" priority />
          </div>
        </div>
      )}
    </>
  );
};

// --- PRODUCT INFO ---
const ProductInfo = ({ product }: { product: Product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const { addToCart } = useCart();
  
  const isQuoteOnly = typeof product.price !== 'number';
  const availabilityText = product.availability || 'In Stock';
  const isOutOfStock = availabilityText.toLowerCase().includes('out') || availabilityText.toLowerCase().includes('sold');

  const handleAction = (e: React.MouseEvent) => {
    if (!isQuoteOnly && !isOutOfStock) {
      e.preventDefault();
      addToCart(product);
    }
  };

  return (
    <div className="w-full md:w-3/5">
      <div className="text-sm text-blue-600 font-medium space-x-2">{product.category}</div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {isOutOfStock ? <XCircleIcon className="w-4 h-4 mr-2" /> : <CheckCircleIcon className="w-4 h-4 mr-2" />}
          {availabilityText}
        </span>
      </div>
      
      {!isQuoteOnly ? (
        <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
      ) : (
        <p className="text-2xl font-bold text-blue-600 mb-6">Call For Pricing</p>
      )}
      
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
        <button onClick={toggleWishlist} className={`flex items-center gap-2 text-sm transition ${isInWishlist ? 'text-red-600' : 'text-gray-700 hover:text-blue-600'}`}>
          <HeartIcon className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} /> {isInWishlist ? 'Saved' : 'Add to Wishlist'}
        </button>
        <button onClick={toggleCompare} className={`flex items-center gap-2 text-sm transition ${isInCompare ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
          <CompareIcon className="w-5 h-5" /> {isInCompare ? 'Added' : 'Add to Compare'}
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        {!isQuoteOnly ? (
          <button onClick={handleAction} disabled={isOutOfStock} className={`px-8 py-3 font-bold rounded-md transition w-full md:w-auto text-center shadow-md flex justify-center items-center ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1447E6] text-white hover:bg-blue-700'}`}>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        ) : (
          <a href="tel:9724310905" className="px-8 py-3 bg-[#1447E6] text-white font-bold rounded-md hover:bg-blue-700 transition w-full md:w-auto text-center shadow-md block">
            Get a Quote
          </a>
        )}
      </div>
    </div>
  );
};

// --- SPEC SECTION ---
const SpecSection = ({ title, children, bgColorClass = "" }: { title: string, children: React.ReactNode, bgColorClass?: string }) => (
  <div className={`mb-8 ${bgColorClass} ${bgColorClass ? 'p-6 rounded-lg' : ''}`}>
    <h4 className={`text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2`}>{title}</h4>
    <dl className="space-y-4">{children}</dl>
  </div>
);

const SpecItem = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
    <dt className="font-medium text-gray-900">{label}</dt>
    <dd className="md:col-span-2 text-gray-700">{children}</dd>
  </div>
);

// --- DESCRIPTION TAB ---
const DescriptionTab = ({ description }: { description: StandardProductDescription | KeyFeatureProductDescription | string }) => {
  // 1. Handle Simple String Description (from Admin plain text)
  if (typeof description === 'string') {
    return <div className="text-gray-800 whitespace-pre-line">{description}</div>;
  }

  // 2. Handle Key Features (Legacy/Screenshot format)
  if ('keyFeatures' in description) {
    return (
      <div className="text-gray-800 space-y-4">
        <SpecSection title="Key Features">
          {description.keyFeatures.map((section, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-gray-900">{section.title}:</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                {section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
              </ul>
            </div>
          ))}
        </SpecSection>
        <SpecSection title="Benefits">
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            {description.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
          </ul>
        </SpecSection>
        <p className="text-gray-700 pt-4">{description.summary}</p>
      </div>
    );
  } 
  
  // 3. Handle Standard Object Description (Admin Panel JSON)
  // We use optional chaining (?.) to be safe if fields are missing
  else {
    return (
      <div className="text-gray-800">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{description.overview}</h3>
        {description.design && (
           <SpecSection title={description.design.title || "Design"}>
             <p className="text-gray-700">{description.design.formFactor}</p>
           </SpecSection>
        )}
        {description.performance && (
            <SpecSection title={description.performance.title || "Performance"} bgColorClass="bg-gray-50">
            <SpecItem label="Processor">{description.performance.processor}</SpecItem>
            <SpecItem label="Memory">{description.performance.memory}</SpecItem>
            <SpecItem label="Storage">{description.performance.storage}</SpecItem>
            </SpecSection>
        )}
        {description.display && (
            <SpecSection title={description.display.title || "Display"} bgColorClass="bg-gray-50">
            <SpecItem label="Screen">{description.display.screen}</SpecItem>
            <SpecItem label="Graphics">{description.display.graphics}</SpecItem>
            </SpecSection>
        )}
        {description.connectivity && (
            <SpecSection title={description.connectivity.title || "Connectivity"} bgColorClass="bg-gray-50">
            <SpecItem label="Ports">
                <ul className="list-disc pl-5 space-y-1">
                {description.connectivity.ports?.map((port, i) => <li key={i}>{port}</li>)}
                </ul>
            </SpecItem>
            <SpecItem label="Wireless">
                <ul className="list-disc pl-5 space-y-1">
                {description.connectivity.wireless?.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </SpecItem>
            </SpecSection>
        )}
        {description.functionality && (
            <SpecSection title={description.functionality.title || "Functionality"} bgColorClass="bg-gray-50">
            <SpecItem label="Versatility">{description.functionality.versatility}</SpecItem>
            <SpecItem label="Connectivity Options">{description.functionality.connectivityOptions}</SpecItem>
            </SpecSection>
        )}
      </div>
    );
  }
};

// --- REVIEW FORM (Mock) ---
const ReviewForm = ({ productName }: { productName: string }) => {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">Be the first to review {productName}</h3>
      <p className="text-sm text-gray-500 mb-4">Your email address will not be published.</p>
      <div className="flex items-center gap-1 mb-4">
         <span className="text-sm font-bold mr-2">Your Rating:</span>
         {[1, 2, 3, 4, 5].map(s => <button key={s} onClick={()=>setRating(s)} type="button" className={rating >= s ? "text-yellow-400" : "text-gray-300"}><StarIcon/></button>)}
      </div>
      {/* Simplified form for visual purposes */}
      <textarea className="w-full border p-2 rounded mb-4" rows={4} placeholder="Your Review"></textarea>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit Review</button>
    </div>
  );
};

const ReviewsTab = ({ productName }: { productName: string }) => (
  <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <ReviewForm productName={productName} />
  </div>
);

// --- MAIN CLIENT COMPONENT ---
export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Starlight Linkers`;
    }
  }, [product]);

  if (!product) {
    return <div className="p-20 text-center">Product Not Found</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen w-full overflow-x-hidden font-sans">
      <HeaderSection />
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <Breadcrumbs product={product} />
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-8 lg:sticky top-24 self-start z-10">
            <CategoriesSidebar currentCategorySlug={product.categorySlug} />
            <LatestProductsSidebar />
          </aside>
          <div className="w-full flex-1 min-w-0">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <ProductGallery product={product} />
              <ProductInfo product={product} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-8 -mb-px flex-wrap">
                  <button onClick={() => setActiveTab('description')} className={`pb-4 px-2 font-medium text-lg border-b-2 transition-colors ${activeTab === 'description' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}>Description</button>
                  <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-2 font-medium text-lg border-b-2 transition-colors ${activeTab === 'reviews' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}>Reviews</button>
                </nav>
              </div>
              <div>
                {activeTab === 'description' && (
                  <>
                    <DescriptionTab description={product.description} />
                    <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                      <span className="font-bold text-gray-900">SKU:</span> {product.sku || 'N/A'}
                      <span className="mx-3 text-gray-300">/</span>
                      <span className="font-bold text-gray-900">Category:</span> {product.category}
                    </div>
                  </>
                )}
                {activeTab === 'reviews' && <ReviewsTab productName={product.name} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}