// src/app/product/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HeaderSection } from '../../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../../components/SharedComponents';
import { allProducts } from '../../../lib/products';
import { categoriesData } from '../../../lib/data'; // --- IMPORT ADDED ---
// Import the types from your products.ts file
import type { Product, ProductDescription } from '../../../lib/products'; 

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
const HeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
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

// --- MOCK DATA FOR THIS PAGE ---
const latestProductsSidebarData = [
  { id: "lp1", name: "Ubiquiti UniFi Switch Ultra 210W", price: 160.00, image: "/placeholder-images/switch-ultra-210w.jpg", slug: "ubiquiti-unifi-switch-ultra-210w" },
  { id: "lp2", name: "Ubiquiti UniFi Switch Pro Max 24", price: 315.11, image: "/placeholder-images/switch-pro-max-24.jpg", slug: "ubiquiti-unifi-switch-pro-max-24" },
  { id: "lp3", name: "Ubiquiti UniFi Switch USW-Enterprise-24-PoE", price: 570.00, image: "/placeholder-images/switch-enterprise-24-poe.jpg", slug: "ubiquiti-unifi-switch-usw-enterprise-24-poe" },
  { id: "lp4", name: "Ubiquiti UniFi U6+", price: 71.35, image: "/placeholder-images/unifi-u6-plus.jpg", slug: "ubiquiti-unifi-u6-plus" },
  { id: "lp5", name: "Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2", price: 65.21, image: "/placeholder-images/nanobeam-ac-gen2.jpg", slug: "ubiquiti-nanobeam-ac-gen2-nbe-5ac-gen2" },
];

// --- Calculate Category Counts ---
const categoryCounts = categoriesData.reduce((acc, category) => {
  const count = allProducts.filter(product => product.categorySlug === category.slug).length;
  acc[category.slug] = count;
  return acc;
}, {} as { [key: string]: number });


// --- LEFT SIDEBAR SUB-COMPONENTS ---

// --- THIS IS THE UPDATED DYNAMIC COMPONENT ---
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
// --- END OF UPDATED COMPONENT ---

const AdSidebar = () => (
  <div className="rounded-lg overflow-hidden border border-gray-200">
    <Image
      src="https://via.placeholder.com/300x400.png?text=Ad+Placeholder"
      alt="Advertisement"
      width={300}
      height={400}
      className="w-full h-auto"
    />
  </div>
);

const LatestProductsSidebar = () => (
  <div className="border border-gray-200 rounded-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h3>
    <div className="space-y-6">
      {latestProductsSidebarData.map((product) => (
        <Link href={`/product/${product.slug}`} key={product.id} className="flex items-center gap-4 group">
          <div className="w-20 h-20 bg-gray-100 rounded-md shrink-0 border border-gray-200">
            <Image src={product.image} alt={product.name} width={80} height={80} className="w-full h-full object-contain p-1" />
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
// --- END LEFT SIDEBAR ---

// --- MAIN CONTENT SUB-COMPONENTS ---

// MODIFIED: This component now receives the full product object to get category info
const Breadcrumbs = ({ product }: { product: Product }) => (
  <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex">
      <li className="flex items-center">
        <Link href="/" className="hover:underline">Home</Link>
      </li>
      <li className="flex items-center mx-2">
        <ChevronRightIcon className="w-4 h-4" />
      </li>
      <li className="flex items-center">
        {/* DYNAMIC LINK: Uses data from the product object */}
        <Link href={`/category/${product.categorySlug}`} className="hover:underline">
          {/* This splits "Laptops, HP" and shows just "Laptops" */}
          {product.category.split(',')[0]} 
        </Link>
      </li>
      <li className="flex items-center mx-2">
        <ChevronRightIcon className="w-4 h-4" />
      </li>
      {/* DYNAMIC NAME */}
      <li className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">{product.name}</li>
    </ol>
  </nav>
);

const ProductGallery = ({ product }: { product: Product }) => (
  <div className="w-full md:w-1/2">
    <div className="border border-gray-200 rounded-lg p-4">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="w-full h-auto object-cover"
      />
    </div>
    {/* Add thumbnail gallery here if needed */}
  </div>
);

// MODIFIED: This component now receives the full product object
const ProductInfo = ({ product }: { product: Product }) => (
  <div className="w-full md:w-1/2">
    <div className="text-sm text-blue-600 font-medium space-x-2">
      {/* DYNAMIC CATEGORY LINKS */}
      {product.category.split(',').map((cat, index) => (
        <React.Fragment key={index}>
          <Link href={`/category/${product.categorySlug}`} className="hover:underline">
            {cat.trim()}
          </Link>
          {index < product.category.split(',').length - 1 && <span>,</span>}
        </React.Fragment>
      ))}
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
    
    <div className="flex items-center gap-6 mb-6">
  <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition">
    <HeartIcon className="w-5 h-5" /> Add to wishlist
  </button>
  <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition">
    <CompareIcon className="w-5 h-5" /> Compare
  </button>
</div>
    
    <div className="flex items-center gap-3">
      <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-100 transition">
        Compare
      </button>
      <button className="px-5 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition">
        Get a quote
      </button>
    </div>
  </div>
);

// --- SPEC HELPER COMPONENTS ---
// (These are unchanged)
const SpecSection = ({ 
  title, 
  children, 
  bgColorClass = "",
  titleColorClass = "text-gray-900",
  borderColorClass = "border-gray-200"
}: { 
  title: string, 
  children: React.ReactNode, 
  bgColorClass?: string,
  titleColorClass?: string,
  borderColorClass?: string
}) => (
  <div className={`mb-8 ${bgColorClass} ${bgColorClass ? 'p-6 rounded-lg' : ''}`}>
    <h4 className={`text-lg font-semibold ${titleColorClass} mb-4 border-b ${borderColorClass} pb-2`}>
      {title}
    </h4>
    <dl className="space-y-4">
      {children}
    </dl>
  </div>
);

const SpecItem = ({ label, children, labelColorClass = "text-gray-900", valueColorClass = "text-gray-700" }: { label: string, children: React.ReactNode, labelColorClass?: string, valueColorClass?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
    <dt className={`font-medium ${labelColorClass}`}>{label}</dt>
    <dd className={`md:col-span-2 ${valueColorClass}`}>{children}</dd>
  </div>
);


// --- DESCRIPTION TAB ---
// MODIFIED: This component now receives 'description' as a prop
const DescriptionTab = ({ description }: { description: ProductDescription }) => (
  <div className="text-gray-800">
    {/* DYNAMIC DATA IS USED BELOW */}
    <h3 className="text-2xl font-bold text-gray-900 mb-6">
      {description.overview}
    </h3>
    
    <SpecSection title={description.design.title}>
      <p className="text-gray-700">{description.design.formFactor}</p>
    </SpecSection>

    <SpecSection 
      title={description.performance.title} 
      bgColorClass="bg-gradient-to-br from-[#00001E] to-[#1a1a3a]"
      titleColorClass="text-white"
      borderColorClass="border-gray-500"
    >
      <SpecItem label="Processor" labelColorClass="text-white" valueColorClass="text-gray-200">
        {description.performance.processor}
      </SpecItem>
      <SpecItem label="Memory" labelColorClass="text-white" valueColorClass="text-gray-200">
        {description.performance.memory}
      </SpecItem>
      <SpecItem label="Storage" labelColorClass="text-white" valueColorClass="text-gray-200">
        {description.performance.storage}
      </SpecItem>
    </SpecSection>

    <SpecSection 
      title={description.display.title}
      bgColorClass="bg-gray-100"
      titleColorClass="text-gray-900"
      borderColorClass="border-gray-300"
    >
      <SpecItem label="Screen" labelColorClass="text-gray-900" valueColorClass="text-gray-700">
        {description.display.screen}
      </SpecItem>
      <SpecItem label="Graphics" labelColorClass="text-gray-900" valueColorClass="text-gray-700">
        {description.display.graphics}
      </SpecItem>
    </SpecSection>

    <SpecSection 
      title={description.connectivity.title} 
      bgColorClass="bg-gradient-to-br from-[#00001E] to-[#1a1a3a]"
      titleColorClass="text-white"
      borderColorClass="border-gray-500"
    >
      <SpecItem label="Ports" labelColorClass="text-white" valueColorClass="text-gray-200">
        <ul className="list-disc pl-5 space-y-1">
          {description.connectivity.ports.map((port, i) => (
            <li key={i}>{port}</li>
          ))}
        </ul>
      </SpecItem>
      <SpecItem label="Wireless" labelColorClass="text-white" valueColorClass="text-gray-200">
        <ul className="list-disc pl-5 space-y-1">
          {description.connectivity.wireless.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </SpecItem>
    </SpecSection>

    <SpecSection 
      title={description.functionality.title}
      bgColorClass="bg-gray-100"
      titleColorClass="text-gray-900"
      borderColorClass="border-gray-300"
    >
      <SpecItem label="Versatility" labelColorClass="text-gray-900" valueColorClass="text-gray-700">
        {description.functionality.versatility}
      </SpecItem>
      <SpecItem label="Connectivity Options" labelColorClass="text-gray-900" valueColorClass="text-gray-700">
        {description.functionality.connectivityOptions}
      </SpecItem>
    </SpecSection>
  </div>
);

// --- REVIEW SECTION COMPONENTS ---
// (These components are unchanged)
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={`cursor-pointer ${
            (hoverRating || rating) >= star
              ? 'text-yellow-400'
              : 'text-gray-300'
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
              <StarIcon
                key={i}
                className={i < stars ? 'text-yellow-400' : 'text-gray-300'}
              />
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
    // In a real app, you would submit this data to your backend
    console.log({ rating, review, name, email, saveInfo });
    alert('Review submitted! (Check console for data)');
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">
        Be the first to review “{productName}”
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 mt-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Your Rating</label>
          <StarRatingInput rating={rating} setRating={setRating} />
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="review"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
            placeholder="Your Review"
          ></textarea>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="flex items-center">
          <input
            id="saveInfo"
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewsTab = ({ productName }: { productName: string }) => (
  <div className="border border-gray-200 rounded-lg p-6 md:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <ReviewSummary />
      <ReviewForm productName={productName} />
    </div>
  </div>
);
// --- END REVIEW SECTION ---

// --- MAIN PAGE COMPONENT ---
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the product dynamically based on the slug from the URL
  const product = allProducts.find(p => p.slug === slug);

  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    if (product) {
      document.title = product.name;
    } else {
      document.title = "Product Not Found | Starlite Linker";
    }
  }, [product, slug]);

  // This is the "Product Not Found" page. It is correct.
  if (!product) {
    return (
      <main className="bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-16 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">Sorry, we could not find the product you were looking for.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
        <ChatButton />
        <CustomScrollbarStyles />
      </main>
    );
  }

  // This is a safety check for products you have not written a description for.
  // It uses the placeholder description from products.ts
  if (!product.description) {
     return (
       <main className="bg-white min-h-screen">
         <HeaderSection />
         <div className="container mx-auto px-16 py-10">
           <h1 className="text-4xl font-bold text-gray-900 mb-4">
             Product Description Not Available
           </h1>
           <p className="text-gray-600">Sorry, the detailed description for {product.name} is not yet available.</p>
           <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
             Return to Home
           </Link>
         </div>
         <ChatButton />
         <CustomScrollbarStyles />
       </main>
    );
  }

  // --- This is the main product page render ---
  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-8 py-10">
        {/* MODIFIED: Pass the full product object */}
        <Breadcrumbs product={product} />
        
        <div className="flex flex-col lg:flex-row gap-10">

          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 lg:sticky top-10 self-start">
            <CategoriesSidebar />
            <AdSidebar />
            <LatestProductsSidebar />
          </aside>

          {/* Main Content */}
          <div className="w-full flex-1 min-w-0">
            
            {/* These components are now dynamic */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <ProductGallery product={product} />
              <ProductInfo product={product} />
            </div>

            {/* Product Tabs Section */}
            <div>
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-6 -mb-px">
                  {/* --- THIS IS THE FIXED BLOCK --- */}
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-3 px-1 font-medium text-lg ${
                      activeTab === 'description'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900' 
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-3 px-1 font-medium text-lg ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Reviews
                  </button>
                  {/* --- END OF FIXED BLOCK --- */}
                </nav>
              </div>
              
              <div>
                {/* --- THIS IS THE MAIN FIX ---
                    We now pass the product's specific description to the DescriptionTab
                */}
                {activeTab === 'description' && <DescriptionTab description={product.description} />}
                
                {/* This part remains the same */}
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