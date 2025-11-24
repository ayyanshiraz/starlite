"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- FIX: Use '@/' to point directly to src/ folder ---
import { HeaderSection } from '@/components/Header'; 
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents'; 
import { allProducts } from '@/lib/products';
import { productSkus } from '@/lib/sku-data'; 
import { categoriesData } from '@/lib/data';
import type { Product, StandardProductDescription, KeyFeatureProductDescription } from '@/lib/products';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { useCart } from '@/hooks/useCart';

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

const HeartIcon = ({ className = "", fill = "none" }) => (
  <svg {...iconProps} fill={fill} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>
);
const ChevronLeftIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="m15 18-6-6 6-6"></path></svg>
);
const CompareIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 3L4 7l4 4"/>
    <path d="M4 7h16"/>
    <path d="M16 21l4-4-4-4"/>
    <path d="M20 17H4"/>
  </svg>
);
const StarIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// --- UPDATED SIDEBAR DATA (From HomePage Recently Added) ---
// --- UPDATED SIDEBAR DATA ---


// --- SIDEBAR COMPONENTS ---
const CategoriesSidebar = ({ currentCategorySlug }: { currentCategorySlug?: string }) => {
  const categoryStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    categoriesData.forEach(cat => stats[cat.slug] = 0);
    allProducts.forEach(product => {
      if (product.categorySlug && stats[product.categorySlug] !== undefined) {
        stats[product.categorySlug]++;
      }
    });
    return stats;
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
      <Link 
        href="/categories" 
        className="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100 text-blue-600 hover:text-blue-800 transition-colors group"
      >
        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-semibold">Show All Categories</span>
      </Link>
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold text-gray-900">Browse Categories</h2>
      </div>
      <div className="flex flex-col pb-2">
        {categoriesData.map((category) => {
          const isActive = category.slug === currentCategorySlug;
          const count = categoryStats[category.slug] || 0;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`
                group relative flex items-center justify-between px-5 py-2.5 text-sm transition-all border-t border-gray-50
                ${isActive 
                  ? 'text-blue-700 font-semibold bg-blue-50/50 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                }
              `}
            >
              <span className="truncate pr-2">{category.name}</span>
              <span className={`text-xs py-0.5 px-2 rounded-full ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const LatestProductsSidebar = () => {
  // Define the products we want to show by their ID or Slug
  const sidebarIds = [
    'switch-smart-managed-layer2-5-port',
    'ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro',
    'ubiquiti-edgerouter-6p-wired-router-gigabit-ethernet-er-6p',
    'ubiquiti-unifi-u6',
    'ubiquiti-nanobeam-ac-gen2-nbe-5ac-gen2'
  ];

  // Get the live data from the master list
  const products = allProducts.filter(p => sidebarIds.includes(p.id) || sidebarIds.includes(p.slug));

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h3>
      <div className="space-y-6">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id} className="flex items-center gap-4 group">
            <div className="w-20 h-20 bg-gray-100 rounded-md shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={80} 
                height={80} 
                className="object-contain w-full h-full p-1 transition-transform group-hover:scale-105" 
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition line-clamp-2">{product.name}</h4>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wide">
                 {/* This now pulls the REAL price from sku-data.ts */}
                 {typeof product.price === 'number' ? `£${product.price.toFixed(2)}` : product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Breadcrumbs = ({ product }: { product: Product }) => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex flex-wrap">
      <li className="flex items-center">
        <Link href="/" className="hover:underline">Home</Link>
      </li>
      <li className="flex items-center mx-2"><ChevronRightIcon className="w-4 h-4" /></li>
      <li className="flex items-center">
        <Link href={`/category/${product.categorySlug}`} className="hover:underline">
          {product.category.split(',')[0]} 
        </Link>
      </li>
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
        <div 
          className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-center shadow-sm cursor-zoom-in relative group hover:shadow-md transition-shadow duration-300"
          onClick={() => setIsOpen(true)}
          title="Click to zoom image"
        >
          <Image
            src={product.image}
            alt={`[SEO Friendly] ${product.name}`}
            width={400} 
            height={400}
            className="max-w-full h-auto object-contain max-h-[300px] md:max-h-[400px] transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold shadow-lg text-gray-800 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              Click to Zoom
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2 z-50"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close Zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div 
            className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
             <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
             />
          </div>
        </div>
      )}
    </>
  );
};

const ProductInfo = ({ product }: { product: Product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const { addToCart } = useCart();
  
  // --- UPDATED LOGIC ---
  // Check if product has a numeric price. If string (e.g., "Get a Quote") or undefined, treat as Quote Only.
  const isQuoteOnly = typeof product.price !== 'number';

  const handleAction = (e: React.MouseEvent) => {
    if (!isQuoteOnly) {
      e.preventDefault();
      addToCart(product);
    }
  };

  return (
    <div className="w-full md:w-3/5">
      <div className="text-sm text-blue-600 font-medium space-x-2">
        {product.category.split(',').map((cat, index) => (
          <React.Fragment key={index}>
            <Link href={`/category/${product.categorySlug}`} className="hover:underline">
              {cat.trim()}
            </Link>
            {index < product.category.split(',').length - 1 && <span>,</span>}
          </React.Fragment>
        ))}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
      
      {/* Price Display Update */}
      {!isQuoteOnly ? (
        <p className="text-3xl font-bold text-gray-900 mb-6">£{product.price}</p>
      ) : (
        <p className="text-2xl font-bold text-blue-600 mb-6">Call For Pricing</p>
      )}
      
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
        <button 
          onClick={toggleWishlist} 
          className={`flex items-center gap-2 text-sm transition ${
            isInWishlist ? 'text-red-600 hover:text-red-700' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          <HeartIcon className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} />
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>

        <button 
          onClick={toggleCompare} 
          className={`flex items-center gap-2 text-sm transition ${
            isInCompare ? 'text-blue-600 hover:text-blue-700' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          <CompareIcon className="w-5 h-5" /> 
          {isInCompare ? 'Added to Compare' : 'Add to Compare'}
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Action Button Update */}
        {!isQuoteOnly ? (
          <button 
            onClick={handleAction}
            className="px-8 py-3 bg-[#1447E6] text-white font-bold rounded-md hover:bg-blue-700 transition w-full md:w-auto text-center shadow-md"
          >
            Add to Cart
          </button>
        ) : (
          <a 
            href="tel:9724310905" 
            className="px-8 py-3 bg-[#1447E6] text-white font-bold rounded-md hover:bg-blue-700 transition w-full md:w-auto text-center shadow-md block"
          >
            Get a Quote
          </a>
        )}
      </div>
    </div>
  );
};
// --- SPEC HELPER COMPONENTS ---
const SpecSection = ({ 
  title, children, bgColorClass = "", titleColorClass = "text-gray-900", borderColorClass = "border-gray-200"
}: { 
  title: string, children: React.ReactNode, bgColorClass?: string, titleColorClass?: string, borderColorClass?: string
}) => (
  <div className={`mb-8 ${bgColorClass} ${bgColorClass ? 'p-6 rounded-lg' : ''}`}>
    <h4 className={`text-lg font-semibold ${titleColorClass} mb-4 border-b ${borderColorClass} pb-2`}>{title}</h4>
    <dl className="space-y-4">{children}</dl>
  </div>
);

const SpecItem = ({ label, children, labelColorClass = "text-gray-900", valueColorClass = "text-gray-700" }: { label: string, children: React.ReactNode, labelColorClass?: string, valueColorClass?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
    <dt className={`font-medium ${labelColorClass}`}>{label}</dt>
    <dd className={`md:col-span-2 ${valueColorClass}`}>{children}</dd>
  </div>
);

// --- DESCRIPTION TAB ---
const DescriptionTab = ({ description }: { description: StandardProductDescription | KeyFeatureProductDescription }) => {
  if ('keyFeatures' in description) {
    return (
      <div className="text-gray-800 space-y-4">
        <SpecSection title="Key Features">
          {description.keyFeatures.map((section, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-gray-900">{section.title}:</p>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </SpecSection>
        <SpecSection title="Benefits">
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            {description.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </SpecSection>
        <p className="text-gray-700 pt-4">{description.summary}</p>
      </div>
    );
  } else {
    return (
      <div className="text-gray-800">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{description.overview}</h3>
        <SpecSection title={description.design.title}>
          <p className="text-gray-700">{description.design.formFactor}</p>
        </SpecSection>
        <SpecSection title={description.performance.title} bgColorClass="bg-gray-50">
          <SpecItem label="Processor">{description.performance.processor}</SpecItem>
          <SpecItem label="Memory">{description.performance.memory}</SpecItem>
          <SpecItem label="Storage">{description.performance.storage}</SpecItem>
        </SpecSection>
        <SpecSection title={description.display.title} bgColorClass="bg-gray-50">
          <SpecItem label="Screen">{description.display.screen}</SpecItem>
          <SpecItem label="Graphics">{description.display.graphics}</SpecItem>
        </SpecSection>
        <SpecSection title={description.connectivity.title} bgColorClass="bg-gray-50">
          <SpecItem label="Ports">
            <ul className="list-disc pl-5 space-y-1">
              {description.connectivity.ports.map((port, i) => <li key={i}>{port}</li>)}
            </ul>
          </SpecItem>
          <SpecItem label="Wireless">
            <ul className="list-disc pl-5 space-y-1">
              {description.connectivity.wireless.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </SpecItem>
        </SpecSection>
        <SpecSection title={description.functionality.title} bgColorClass="bg-gray-50">
          <SpecItem label="Versatility">{description.functionality.versatility}</SpecItem>
          <SpecItem label="Connectivity Options">{description.functionality.connectivityOptions}</SpecItem>
        </SpecSection>
      </div>
    );
  }
};

// --- REVIEW SECTION COMPONENTS ---
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={`cursor-pointer ${
            (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <StarIcon />
        </button>
      ))}
    </div>
  );
};

const ReviewSummary = () => (
  <div>
    <h3 className="text-lg font-medium text-gray-800 mb-2">Based on 0 reviews</h3>
    <p className="text-5xl font-bold text-gray-900">0.0</p>
    <p className="text-sm text-gray-600 mb-6">overall</p>
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => (
        <div key={stars} className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={i < stars ? 'text-yellow-400' : 'text-gray-300'} />
            ))}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400" style={{ width: '0%' }}></div>
          </div>
          <span className="text-sm font-medium text-gray-700 w-4 text-right">0</span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewForm = ({ productName }: { productName: string }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, review, name, email, saveInfo });
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">Be the first to review {productName}</h3>
      <form onSubmit={handleSubmit} className="space-y-5 mt-6">
        <div className="flex items-center gap-4">
          <label className="block text-sm font-medium text-gray-700">Your Rating</label>
          <StarRatingInput rating={rating} setRating={setRating} />
        </div>
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
          <textarea
            id="review" rows={5} value={review} onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
            placeholder="Your Review"
          ></textarea>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div className="flex items-center">
          <input
            id="saveInfo" type="checkbox" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        <div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors">
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewsTab = ({ productName }: { productName: string }) => (
  <div className="border border-gray-200 rounded-lg p-6 md:p-8 bg-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <ReviewSummary />
      <ReviewForm productName={productName} />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = allProducts ? allProducts.find(p => p.slug === slug) : undefined;
  const skuData = productSkus ? productSkus[slug] : undefined; 
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    if (product) {
      document.title = product.name;
    } else {
      document.title = "Product Not Found | Starlight Linkers LLC ";
    }
  }, [product, slug]);

  if (!product) {
    return (
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
        <HeaderSection />
        <div className="container mx-auto px-4 sm:px-16 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">Sorry, we could not find the product you were looking for.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Home</Link>
        </div>
        <ChatButton />
        <CustomScrollbarStyles />
      </main>
    );
  }

  if (!product.description) {
    return (
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
        <HeaderSection />
        <div className="container mx-auto px-4 sm:px-16 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Description Not Available</h1>
          <p className="text-gray-600">Sorry, the detailed description for {product.name} is not yet available.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Home</Link>
        </div>
        <ChatButton />
        <CustomScrollbarStyles />
      </main>
    );
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
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 px-2 font-medium text-lg whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === 'description'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 hover:text-gray-800 border-transparent hover:border-gray-300' 
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 px-2 font-medium text-lg whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 hover:text-gray-800 border-transparent hover:border-gray-300'
                    }`}
                  >
                    Reviews
                  </button>
                </nav>
              </div>
              <div>
                {activeTab === 'description' && (
                  <>
                    <DescriptionTab description={product.description} />
                    <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                      <span className="font-bold text-gray-900">SKU:</span> {skuData?.sku || 'N/A'}
                      <span className="mx-3 text-gray-300">/</span>
                      <span className="font-bold text-gray-900">Category:</span> {skuData?.category || product.category}
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