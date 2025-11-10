"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // --- ADDED THIS IMPORT ---
import { allProducts } from '../lib/products'; // --- ADDED THIS IMPORT ---

// --- IMPORTS ---
import { HeaderSection } from '../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../components/SharedComponents';
import { GlobalProductHighlights } from '../components/GlobalProductHighlights';

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

const ArrowRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const HeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={`w-5 h-5 ${className}`}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// --- NEW Compare Icon ---
const CompareIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M18 4h-5.12V.68c0-.38-.31-.68-.69-.68h-4.38c-.38 0-.69.31-.69.68V4H2c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8-2h4v2h-4V2zm8 18H2V6h5.12V8.68c0 .38.31.68.69.68h4.38c.38 0 .69-.31.69-.68V6H18v14z"></path>
    <path d="M11 10h2v7h-2z"></path>
    <path d="M7 12h2v5H7z"></path>
    <path d="M15 14h2v3h-2z"></path>
  </svg>
);


// --- Carousel Arrow Icons ---
const ChevronLeftIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="m15 18-6-6 6-6"></path>
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);
// --- END: Carousel Arrow Icons ---

// --- NEW Slug Generation Function ---
/**
* Converts a string into a URL-friendly slug.
*/
const generateSlug = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/ & /g, '-and-')      // Replace " & " with "-and-"
    .replace(/[^\w\s-]/g, '')      // Remove special chars except word, space, hyphen
    .replace(/[\s_-]+/g, '-')      // Replace spaces and underscores with a hyphen
    .replace(/^-+|-+$/g, '');      // Trim hyphens from start/end
};

// --- NEW: Function to add slugs to mock data ---
const addSlugsToProducts = (products: any[]) => {
  return products.map(p => {
    // Try to find a matching product in the master list from lib/products.ts
    const masterProduct = allProducts.find(master => master.name === p.title);
    
    if (masterProduct && masterProduct.slug) {
      return { ...p, slug: masterProduct.slug };
    } else {
      // If not found, generate a slug from the title
      return { ...p, slug: generateSlug(p.title) };
    }
  });
};


// ===== HERO SLIDER =====

// 1. Define the data for each slide
const sliderData = [
  {
    id: 'laptops',
    preTitle: 'Laptops & Computers',
    title: 'Power Up With Our Top Laptops',
    description: 'Explore premium laptops tailored for every need. Performance style and value await.',
    img: '/about.jpg',
    alt: 'Two women working on a laptop in a stylized window',
    href: '/categories/laptops'
  },
  {
    id: 'printers',
    preTitle: 'Printing Solutions',
    title: 'High-Quality Prints',
    description: 'Experience crisp clear and vibrant print quality with ease.',
    img: '/images/hero-printer.png',
    alt: 'Epson Printer',
    href: '/categories/printers'
  },
  {
    id: 'routers',
    preTitle: 'Networking',
    title: 'Next-Gen Routers',
    description: 'Future-proof your network with advanced next-generation router technology.',
    img: '/images/hero-router.png',
    alt: 'Gaming Router',
    href: '/categories/networking'
  },
  {
    id: 'switches',
    preTitle: 'Networking',
    title: 'Network Boost & High Performance',
    description: 'Experience unmatched performance with Ciscos high-speed switch technology.',
    img: '/images/hero-switch.png',
    alt: 'Network Switches',
    href: '/categories/networking'
  }
];

// 2. Define animation variants for the slide transitions
const slideVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeIn"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Animation for text elements
const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// 3. The Hero Section component (Video Background, NO Dots)
function ModernHeroSection() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  // --- PERMANENT GRID FIX ---
  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    zIndex: 20,
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
    backgroundSize: '4rem 4rem'
  };
  // --- END OF FIX ---

  const changeSlide = (newDirection: number) => {
    let newSlideIndex = currentSlide + newDirection;
    if (newSlideIndex < 0) {
      newSlideIndex = sliderData.length - 1;
    } else if (newSlideIndex >= sliderData.length) {
      newSlideIndex = 0;
    }
    setSlide([newSlideIndex, newDirection]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      changeSlide(1);
    }, 5000); // This is for the hero section
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = sliderData[currentSlide];

  return (
    <section className="relative w-full h-[600px] text-white overflow-hidden">
      {/* --- Video Background --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/herosection.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="absolute inset-0 w-full h-full bg-black/70 z-10"></div>

      {/* --- Grid Overlay --- */}
      <div style={gridStyle}></div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* --- Centered content --- */}
          <div className="relative z-30 container mx-auto px-8 h-full flex items-center justify-center text-center">
            <div className="w-full max-w-4xl"> {/* Container for centered text */}

              {/* Text Content Container */}
              <motion.div
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                  <div className="px-4">
                    <motion.span
                      // --- UPDATED: Added font-bold ---
                      className="block text-gray-300 font-bold mb-4 text-base"
                      variants={textChildVariants}
                    >
                      {slide.preTitle}
                    </motion.span>

                    <motion.h1
                      // --- Title style (Kept) ---
                      className="text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                      variants={textChildVariants}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      // --- UPDATED: Added font-bold ---
                      className="text-base text-gray-300 font-bold mb-10 mx-auto max-w-xl"
                      variants={textChildVariants}
                    >
                      {slide.description}
                    </motion.p>

                    {/* --- Button style (Kept) --- */}
                    <motion.div variants={textChildVariants}>
                      <Link
                        href={slide.href}
                        className="inline-flex items-center text-lg font-semibold py-3 px-8 border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-blue-700 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.4)]"
                      >
                        Know more
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// --- DEALS SECTION ---
function DealsSection() {
  // These are category links, not product links, so we leave them as-is.
  const deals = [
    {
      id: 'laptops',
      title1: 'CATCH BIG',
      title2: 'DEALS',
      title3: 'ON THE LAPTOPS',
      image: '/deal.webp',
      alt: 'Laptops on sale with new design',
      href: '/shop/laptops',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'printers',
      title1: 'PRINTERS,',
      title2: 'AND MORE',
      title3: 'UP TO 10%',
      image: '/deal1.webp',
      alt: 'Printers and more',
      href: '/shop/all-deals',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'switches',
      title1: 'SHOP THE',
      title2: 'HOTTEST',
      title3: 'PRODUCTS',
      image: '/deal3.webp',
      alt: 'Hottest networking products',
      href: '/shop/networking',
      bgColor: 'bg-gray-100'
    }
  ];

  // --- Animation Variants for Staggering ---
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each card animates 0.2s after the previous one
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start faded out and 50px down
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  // --- End of Animation Variants ---

  return (
    // This outer section triggers the animation when it comes into view
    <motion.section
      className="pt-16 bg-white" // Changed from py-16 to pt-16
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Triggers when 30% is in view
    >
      <div className="container mx-auto px-24">
        {/* This grid container applies the stagger animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariants}
        >
          {deals.map((deal) => (
            // --- CHANGED: Replaced motion.a with motion.div and Link ---
            <motion.div
              key={deal.id}
              variants={cardVariants}
            >
              <Link
                href={deal.href}
                className="group flex bg-gray-50 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl h-44"
              >
                {/* --- UPDATED: Removed centering/padding, added overflow-hidden --- */}
                <div className={`w-1/2 relative overflow-hidden ${deal.bgColor}`}>
                  <Image
                    src={deal.image}
                    alt={deal.alt}
                    // --- UPDATED: Replaced width/height with layout="fill" and objectFit="cover" ---
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="w-1/2 p-6 flex flex-col justify-center">
                  <span className="block text-gray-600 font-medium text-sm">{deal.title1}</span>
                  <span className="block text-gray-900 text-2xl font-bold my-1 leading-tight">{deal.title2}</span>
                  <span className="block text-gray-600 font-medium text-sm">{deal.title3}</span>
                  <div className="flex items-center text-blue-600 font-semibold mt-4">
                    <span>Shop now</span>
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// --- START: NEW FEATURED PRODUCTS SECTION ---

// ---
// --- !!! ATTENTION !!!
// --- THIS IS THE VARIABLE YOU NEED TO CHECK
// --- MAKE SURE 'image:' HAS THE CORRECT PATH TO YOUR LAPTOP IMAGE
// ---
// --- Mock Data (Replace with your actual data) ---
const specialOffer = {
  title: 'HP 14" EliteBook 640 G9 - 6C0Z3UT',
  image: '/sidebanner.gif', // <-- CHECK THIS PATH!
  slug: 'hp-14-elitebook-640-g9-6c0z3ut' // --- ADDED SLUG ---
};

// --- "Featured" products list ---
// --- UPDATED: Added slug field to all products ---
const featuredProducts = addSlugsToProducts([
  { id: '1', brand: 'D-Link', title: 'D-Link DWA-X1850 AX1800 Wi-Fi 6 USB Adapter', image: '/dlink/0.jpg', price: 39.62 },
  { id: '2', brand: 'D-Link', title: 'D-Link DAP-X2850 Nuclias Connect AX3600 Wi-Fi 6 PoE Access Point', image: '/dlink/2.jpg', price: 236.46 },
  { id: '3', brand: 'Ubiquiti', title: 'Ubiquiti Networks UniFi 5 x Switch 8 Managed Gigabit', image: '/ubiquiti/1.jpg', price: 495.00, oldPrice: 515.00 },
  { id: '4', brand: 'Ubiquiti', title: 'Ubiquiti Networks UA-SK-EU security access control system White', image: '/ubiquiti/2.jpg', price: 450.00 },
  { id: '5', brand: 'Ubiquiti', title: 'Ubiquiti AmpliFi AFI-HD-UK Mesh Whole Home WiFi Router System', image: '/ubiquiti/3.jpg', price: 356.00 },
  { id: '6', brand: 'Lexmark', title: 'Lexmark CX730de Laser A4 1200 x 1200 DPI 40 ppm', image: '/lexmark/1.jpg', price: 1120.00 },
  { id: '7', brand: 'Acer', title: 'Acer Predator UM.KX3EE.P08 LED display', image: '/acer/1.jpg', price: 495.00, oldPrice: 515.00 },
  { id: '8', brand: 'Apple', title: 'Apple Magic Keyboard for iPad Pro', image: '/apple/1.jpg', price: 320.00 },
]);

// --- "Top Rated" products list ---
// --- UPDATED: Added slug field to all products ---
const topRatedProducts = addSlugsToProducts([
  { id: 'tr1', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch Ultra 210W', image: '/ubiquiti/4.jpg', price: 160.00 },
  { id: 'tr2', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch Pro Max 24', image: '/ubiquiti/5.jpg', price: 315.11 },
  { id: 'tr3', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch USW-Enterprise-24-PoE', image: '/ubiquiti/6.jpg', price: 570.00 },
  { id: 'tr4', brand: 'Access Point', title: 'Ubiquiti UniFi U6+', image: '/ubiquiti/7.jpg', price: 71.35 },
  { id: 'tr5', brand: 'Ubiquiti Access Point', title: 'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2', image: '/ubiquiti/8.jpg', price: 120.00 },
  { id: 'tr6', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant', image: '/computerandlaptops/lenovo/l2.png', price: 45.00 },
  { id: 'tr7', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga', image: '/computerandlaptops/lenovo/l3.png', price: 42.00 },
  { id: 'tr8', brand: 'Lenovo Laptop', title: 'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10', image: '/computerandlaptops/lenovo/l7.png', price: 42.00 },
]);
// --- End of Mock Data ---

// Helper component for tabs
const TabButton = ({ title, isActive, onClick }: { title: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-xl font-semibold pb-2 transition-all duration-300
      ${isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-900'
      }
    `}
  >
    {title}
  </button>
);

// Helper component for Product Cards
function ProductCard({ product }: { product: any }) {
  return (
    <motion.div
      className="group relative border border-gray-700 bg-[#00001E] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col z-0"
      whileHover={{
        y: -8,
        scale: 1.03,
        zIndex: 40,
        // Made transition faster
        transition: { duration: 0.1, ease: "easeOut" }
      }}
    >
      {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
      <Link href={`/product/${product.slug}`} className="block relative w-full h-36 bg-white p-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </Link>

      {/* Restructured card content to match BestDealsSection */}
      <div className="p-4 bg-[#00001E] flex flex-col grow">
        <span className="block text-xs text-gray-400 mb-1">{product.brand}</span>
        {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-white mb-3 h-10 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* NEW Action Area (replaces old text and button) */}
        <div className="mt-auto pt-4 border-t border-gray-700"> {/* Border for separation */}
          <a
            href="#" // This should ideally be a quote link
            className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            Get a Quote
          </a>
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors w-full justify-center mt-3">
            <HeartIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Add to Wishlist</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}


// ---
// --- !!! ATTENTION !!!
// --- THIS IS THE SECTION WITH THE SQUARE IMAGE BOX
// --- IT USES THE 'specialOffer' VARIABLE FROM ABOVE
// ---
function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState('featured');

  // Determine which products to display based on the active tab
  let displayedProducts;
  if (activeTab === 'featured') {
    displayedProducts = featuredProducts;
  } else if (activeTab === 'top-rated') {
    displayedProducts = topRatedProducts;
  } else {
    // Fallback in case activeTab is somehow invalid
    displayedProducts = featuredProducts;
  }

  // --- Animation Variants for the Section ---
  const sectionSlideInVariants = {
    hidden: { opacity: 0, x: -300 }, // Start further off-screen to the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" } // Increased duration
    }
  };
  // --- End Animation Variants ---

  return (
    <motion.section
      className="pt-16 pb-16 bg-white overflow-hidden" // Added pb-16 for bottom padding
      variants={sectionSlideInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Triggers animation every time
    >
      <div className="container mx-auto px-8">
        {/* Tab Navigation */}
        <nav
          className="flex justify-center gap-8 mb-10"
        >
          <TabButton
            title="Featured"
            isActive={activeTab === 'featured'}
            onClick={() => setActiveTab('featured')}
          />
          <TabButton
            title="Top Rated"
            isActive={activeTab === 'top-rated'}
            onClick={() => setActiveTab('top-rated')}
          />
        </nav>

        {/* Main Content Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* --- UPDATED: This is the square image box --- */}
          <Link
            href={`/product/${specialOffer.slug}`}
            // This class makes it a square on large screens
            className="group lg:col-span-1 border border-blue-500 rounded-lg shadow-sm
                       relative w-full h-64 lg:h-auto lg:aspect-square overflow-hidden"
          >
            <Image
              src={specialOffer.image} // This line adds your image
              alt={specialOffer.title}
              layout="fill"
              objectFit="cover" // This makes it fill the box
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          {/* --- END OF IMAGE BOX --- */}


          {/* Products Grid (Right) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // This forces re-animation on tab change
              className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }} // Simple fade in
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
// --- END: NEW FEATURED PRODUCTS SECTION ---


// --- START: NEW 'A LITTLE BIT OF EVERYTHING' BANNER (NOW A VIDEO) ---
function EverythingBannerSection() {
  // --- Grid overlay for consistent styling ---
  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    zIndex: 15, // Below content, above overlay
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
    backgroundSize: '4rem 4rem'
  };

  return (
    <section className="relative w-full h-[250px] text-white overflow-hidden bg-black"> {/* --- UPDATED: Decreased height to h-[250px] --- */}
      {/* --- Video Background --- */}
      {/* NOTE: You must add a video to /public/videos/everything-banner.mp4 or update the path */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src="/everything-banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="absolute inset-0 w-full h-full bg-black/50 z-10"></div>

      {/* --- Grid Overlay --- */}
      <div style={gridStyle}></div>

      {/* --- Content (Re-added with right alignment) --- */}
      <div className="relative z-20 container mx-auto px-8 h-full flex justify-end items-center">
        <motion.div
          className="max-w-2xl text-right" // --- UPDATED: max-w-4xl to max-w-2xl ---
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 }, // Animate from the right
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.9, ease: "easeOut" } // Slightly longer duration
            }
          }}
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-100 leading-snug"> {/* --- UPDATED: text-3xl md:text-4xl to text-xl md:text-2xl --- */}
            Starlite Linker empowers businesses by simplifying IT procurement with a wide range of cost-effective hardware, complemented by expert consultation and 24/7 support to craft tailored, complete technology solutions. They act as a trusted partner, guiding companies from product selection to comprehensive implementation.         </p>
        </motion.div>
      </div>
    </section>
  );
}
// --- END: NEW 'A LITTLE BIT OF EVERYTHING' BANNER (NOW A VIDEO) ---
// --- START: NEW BEST DEALS SECTION ---

// --- UPDATED: Added slug field to all products ---
const bestDealsProducts = addSlugsToProducts([
  {
    id: 'bd1',
    brand: 'Brother, Printers',
    title: 'Brother HL-L6410DW Laser Printer – 1200 DPI, Wi-Fi, Duplex Printing',
    image: '/brother/1.png', // Placeholder, update path
  },
  {
    id: 'bd2',
    brand: 'APC, UPS',
    title: 'APC Smart-UPS On-Line uninterruptible power supply (UPS) – SRT5KXLI',
    image: '/apc/1.webp', // Placeholder, update path
  },
  {
    id: 'bd3',
    brand: 'Ubiquiti, Ubiquiti Access Point',
    title: 'Ubiquiti UniFi nanoHD 1733 Mbit/s – UAP-NANOHD-US',
    image: '/ubiquiti/9.jpg', // Placeholder, update path
  },
  {
    id: 'bd4',
    brand: 'Mikrotik',
    title: 'Mikrotik CSS106-1G-4P-1S network switch',
    image: '/Mikrotik/1.jpg', // Placeholder, update path
  },
  {
    id: 'bd5',
    brand: 'Dell',
    title: 'DELL X-Series X1026P Managed',
    image: '/dell/1.jpg', // Placeholder, update path
  },
  {
    id: 'bd6',
    brand: 'HP, Switches, Switches',
    title: 'HP Aruba 2930F 48G PoE+ 4SFP+ Managed L3 – JL256A',
    image: '/hp/1.jpg', // Placeholder, update path
  },
  {
    id: 'bd7',
    brand: 'Lenovo, Laptop',
    title: 'Lenovo ThinkCentre M75s Gen 2 – 11R8002QUK',
    image: '/lenovo/1.png', // Placeholder, update path
  },
  {
    id: 'bd8',
    brand: 'Netgear, Netgear Switches',
    title: 'NETGEAR 26-Port PoE Gigabit Ethernet – GS724TPP-100NAS',
    image: '/netgear/1.jpg', // Placeholder, update path
  },
  {
    id: 'bd9',
    brand: 'Brother',
    title: 'Brother QL-810W label printer',
    image: '/brother/2.jpg', // Placeholder, update path
  },
  {
    id: 'bd10',
    brand: 'Brother',
    title: 'Brother RJ-4250WB Rugged Mobile Label & Receipt Printer – RJ4250WBZ1',
    image: '/brother/3.jpg',
  },
]);

const bestDealsCategories = [
  { id: 'all', title: 'Best Deals' },
  { id: 'lenovo-laptop', title: 'Lenovo Laptop' },
  { id: 'hp-keyboards-keypads', title: 'HP Keyboards & Keypads' },
  { id: 'hp-displays', title: 'HP Displays' },
  { id: 'transceiver', title: 'Transceiver' },
  { id: 'storage-server', title: 'Storage server' },
  { id: 'server', title: 'Server' },
  { id: 'remote-maintenance-module', title: 'Remote Maintenance Module' },
];

function BestDealsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on activeCategory (simple example, would be more complex with real data)
  const filteredProducts = activeCategory === 'all'
    ? bestDealsProducts
    : bestDealsProducts.filter(product => product.brand.toLowerCase().includes(activeCategory.replace('-', ' '))); // Basic filtering

  // Variant for the entire section "stomp"
  const sectionStompVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className="py-16 bg-white"
      key={activeCategory}
      variants={sectionStompVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-24"> {/* Increased horizontal padding */}
        {/* Category Tabs (styled for white background) */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
          {bestDealsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`pb-2 text-sm font-medium transition-colors duration-300
                ${activeCategory === category.id
                  ? 'text-blue-600 border-b-2 border-blue-600' // Active tab color
                  : 'text-gray-700 hover:text-blue-600' // Inactive tab color
                }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#00001E] rounded-lg border border-gray-700 hover:border-blue-700 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
            >
              {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
              <Link href={`/product/${product.slug}`} className="block relative w-full h-32 bg-white p-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </Link>

              {/* --- Style Update: Content area is DARK, text is LIGHT --- */}
              <div className="p-4 flex flex-col flex-grow bg-[#00001E]"> {/* Content background is DARK */}
                {/* --- Style Update: Brand color is LIGHT BLUE --- */}
                <span className="block text-xs font-medium text-blue-400 mb-1">{product.brand}</span>
                {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
                <Link href={`/product/${product.slug}`} className="flex-grow">
                  <h3 className="text-sm font-semibold text-white mb-3 h-10 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* --- NEW Action Area --- */}
                <div className="mt-auto pt-4 border-t border-gray-700"> {/* Border is DARK */}
                  <a
                    href="#" // This should ideally be a quote link
                    className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                  >
                    Get a Quote
                  </a>
                  {/* --- Style Update: Wishlist text is LIGHT GRAY --- */}
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors w-full justify-center mt-3">
                    <HeartIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Add to Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
// --- END: NEW BEST DEALS SECTION ---
// --- START: NEW LENOVO LAPTOP SECTION ---

// 1. Filter the data from allProducts
const lenovoLaptops = allProducts.filter(product => {
  const searchableText = (product.name + ' ' + product.category).toLowerCase();
  return searchableText.includes('lenovo') && (searchableText.includes('laptop') || searchableText.includes('laptops'));
}).slice(0, 5); // Get the first 5 Lenovo Laptops

// 2. Create the Section Component
function LenovoLaptopSection() {
  
  // Re-using the animation from BestDealsSection
  const sectionStompVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Map data to the format ProductCard expects
  const formattedLenovoProducts = lenovoLaptops.map(p => ({
    id: p.id,
    slug: p.slug,
    image: p.image,
    title: p.name, // ProductCard (line 603) expects 'title'
    brand: p.category, // ProductCard (line 603) expects 'brand'
  }));


  return (
    <motion.section
      className="py-16 bg-white" // White background to match BestDeals
      variants={sectionStompVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-24">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900">Lenovo Laptops</h2>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600 rounded-full"></div>
          </div>
          
          <Link
            href="/category/lenovo-laptop"
            className="flex items-center text-blue-600 font-semibold group"
          >
            <span>View All</span>
            <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {formattedLenovoProducts.map((product) => (
            // Using the dark ProductCard component defined around line 603
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
// --- END: NEW LENOVO LAPTOP SECTION ---


// --- START: MOCK DATA FOR BEST SELLERS ---
// --- UPDATED: Added slug field to all products ---
const bestSellersTabs = [
  { id: 'best-sellers', title: 'Best Sellers' },
  { id: 'workstations', title: 'Workstations' },
  { id: 'ups', title: 'UPS' },
  { id: 'ubiquiti-switches', title: 'Ubiquiti Switches' },
];

const allBestSellers = addSlugsToProducts([
  { id: 'bs1', brand: 'Acer', title: 'Acer V246HL 24″ 1920 x 1080 pixels Full HD LED Black', image: '/acer/2.jpg', price: '£120.00' },
  { id: 'bs2', brand: 'Acer', title: 'ACER V227Qbip Full HD 21.5″ IPS LCD Monitor – Black', image: '/acer/3.jpg', price: '£109.00' },
  { id: 'bs3', brand: 'Lexmark', title: 'Lexmark CX730de Laser A4 1200 x 1200 DPI 40 ppm', image: '/lexmark/1.jpg', price: '£1,120.00' },
  { id: 'bs4', brand: 'Lexmark', title: 'Lexmark 62D2H0E (622H) Toner black, 25K pages', image: '/lexmark/2.jpg', price: '£150.00' },
  { id: 'bs5', brand: 'Aruba', title: 'Aruba JL683A#ABA Instant On 1930', image: '/aruba/1.jpg', price: '£300.00' },
  { id: 'bs6', brand: 'HPE', title: 'HPE Aruba AP-303P (US)', image: '/aruba/2.jpg', price: '£250.00' },
  { id: 'bs7', brand: 'APC', title: 'Apc Netshelter Sx 24u Freestanding Rack Black', image: '/apc/2.jpg', price: '£1,255.00' },
  { id: 'bs8', brand: 'APC', title: 'APC NetShelter SX 48U 600mm Wide x 1070mm', image: '/apc/3.jpg', price: '£1,525.00' },
  { id: 'bs9', brand: 'APC', title: 'APC Easy UPS Line-Interactive', image: '/apc/4.jpg', price: '£172.00' },
  { id: 'bs10', brand: 'Ubiquiti', title: 'Ubiquiti U6-PRO UniFi Wifi 6 Access Point', image: '/ubiquiti/10.jpg', price: '£130.00' },
  { id: 'bs11', brand: 'MSI', title: 'MSI Cyborg 15 AI A1VFK-001UK', image: '/msi/1.jpg', price: '£999.00' },
  { id: 'bs12', brand: 'MSI', title: 'MSI PRO H610M-E motherboard Intel H610 LGA 1700 micro ATX', image: '/msi/2.jpg', price: '£85.00' },
  // --- Start of Slide 2 ---
  { id: 'bs13', brand: 'Ubiquiti Router', title: 'Ubiquiti UniFi Cloud Gateway Max (UCG-MAX) – 512GB', image: '/ubiquiti/11.jpg', price: '£232.00' },
  { id: 'bs14', brand: 'Cisco, Cisco SFP Module', title: 'Alcatel-Lucent network transceiver module – SFP-10G-LR', image: '/cisco/1.jpg', price: '£2,610.00' },
  { id: 'bs15', brand: 'Epson', title: 'Epson C13S050691/0691 Toner-kit black return program, 10K pages for Epson Workforce AL-M 300', image: '/epson/1.jpg', price: '£120.00' },
  { id: 'bs16', brand: 'Avaya', title: 'Avaya Routing Switch 4524GT-PWR – switch – 24 ports', image: '/avaya/1.jpg', price: '£450.00' },
  { id: 'bs17', brand: 'Avaya', title: 'Avaya J189 IP Phone Grey Led Wi-Fi 700512396', image: '/avaya/2.jpg', price: '£210.00' },
  { id: 'bs18', brand: 'Acer', title: 'Acer Predator PH18-72 Intel? Core? i9', image: '/acer/4.jpg', price: '£2,500.00' },
]);
// --- END: MOCK DATA FOR BEST SELLERS ---


// --- START: BEST SELLER PRODUCT CARD (White Card) ---
function BestSellerProductCard({ product }: { product: any }) {

  const cardClasses = `
    relative isolate border border-gray-200 rounded-lg overflow-hidden bg-white 
    transition-all duration-300 ease-in-out shadow-md
  `;

  return (
    <div className={cardClasses}>
      {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
      <Link href={`/product/${product.slug}`} className="block relative w-full h-52 bg-white p-4">
        <Image
          src={product.image}
          alt={`${product.title} [SEO Friendly]`}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      {/* Content container changed to 'bg-white' */}
      <div className="p-3 bg-white">
        <span className="block text-xs text-gray-500 mb-1">{product.brand}</span>
        {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 h-10 line-clamp-2 transition-colors group-hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        <a
          href="#" // This should ideally be a quote link
          className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md mt-2"
        >
          Get a Quote
        </a>

        <div className="flex justify-center items-center mt-3">
          <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
            <HeartIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
}
// --- END: BEST SELLER PRODUCT CARD ---

// --- Animation Variants for BestSellers Carousel ---
const carouselVariants = {
  initial: (direction: number) => ({
    x: direction === 0 ? 0 : (direction > 0 ? '100%' : '-100%'),
    opacity: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 }
  }),
  animate: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 } // Smooth
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    zIndex: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 } // Smooth
  })
};

// --- START: NEW BEST SELLERS SECTION ---
function BestSellersSection() {
  const [activeTab, setActiveTab] = useState('best-sellers');

  const [[page, direction], setPage] = useState([0, 0]);

  let activeProductList = allBestSellers;
  if (activeTab !== 'best-sellers') {
    const filtered = allBestSellers.filter(p =>
      p.brand.toLowerCase().includes(activeTab.replace('-', ' ')) ||
      p.title.toLowerCase().includes(activeTab.replace('-', ' '))
    );
    activeProductList = filtered.length > 0 ? filtered : allBestSellers;
  }

  const numPages = activeProductList.length;
  const centerIndex = page; 

  const paginate = (newDirection: number) => {
    let newIndex = page + newDirection;
    if (newIndex < 0) {
      newIndex = numPages - 1; // Loop to last
    } else if (newIndex >= numPages) {
      newIndex = 0; // Loop to first
    }
    setPage([newIndex, newDirection]);
  };

  // Auto-scroll removed

  if (numPages === 0) {
    return (
      <section className="py-16 bg-[#00001E]">
        <div className="container mx-auto px-24 text-center text-gray-400">
          No products found for this category.
        </div>
      </section>
    );
  }

  let displayProducts = [];
  if (numPages === 1) {
    displayProducts = [null, activeProductList[0], null];
  } else {
    const leftIndex = (centerIndex - 1 + numPages) % numPages;
    const rightIndex = (centerIndex + 1) % numPages;
    displayProducts = [
      activeProductList[leftIndex],
      activeProductList[centerIndex],
      activeProductList[rightIndex]
    ];
  }

  return (
    <section className="py-16 bg-[#00001E]">
      <div className="container mx-auto px-24">
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-10">
          {bestSellersTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPage([0, 0]); // Reset slider on tab change
              }}
              className={`py-2 px-5 rounded-md text-lg font-semibold transition-colors duration-300
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page} 
                custom={direction}
                variants={carouselVariants} 
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
              >
                {displayProducts.map((product: any, index: number) => (
                  product ? (
                    <BestSellerProductCard
                      key={product.id + '-' + centerIndex} 
                      product={product}
                    />
                  ) : (
                    <div key={index} /> // Empty placeholder
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Buttons */}
          {numPages > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute top-1/2 left-[-3rem] -translate-y-1/2 z-30 bg-white/70 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute top-1/2 right-[-3rem] -translate-y-1/2 z-30 bg-white/70 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg transition-all"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-900" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
// --- END: NEW BEST SELLERS SECTION ---


// --- START: NEW BIG DEALS BANNER SECTION ---
// This is a category/shop link, so it remains as-is.
function BigDealsBannerSection() {

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <a 
            href="/shop" 
            className="block relative w-full" 
            style={{ paddingBottom: '15%' }} // <-- CHANGED from '20%' to '15%' for a shorter banner
          >
            <Image
              src="/banner4.webp" // <-- UPDATE THIS PATH
              alt="Big deals banner" // <-- UPDATE THIS ALT TEXT
              layout="fill"
              objectFit="cover" // Use 'cover' to fill the space
              className="w-full h-full"
              priority 
            />
          </a>
        </div>
      </div>
    </section>
  );
}
// --- END: NEW BIG DEALS BANNER SECTION ---

// --- START: NEW RECENTLY ADDED SECTION ---

// --- UPDATED: Added slug field to all products ---
const recentlyAddedProducts = addSlugsToProducts([
  // Page 1
  { id: 'ra1', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch Ultra 210W', price: '£160.00', image: '/ubiquiti/12.jpg' },
  { id: 'ra2', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch Pro Max 24', price: '£315.11', image: '/ubiquiti/13.jpg' },
  { id: 'ra3', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Switch USW-Enterprise-24-PoE', price: '£570.00', image: '/ubiquiti/14.jpg' },
  { id: 'ra4', brand: 'Access Point', title: 'Ubiquiti UniFi U6+', price: '£71.35', image: '/ubiquiti/7.jpg' },
  // Page 2
  { id: 'ra5', brand: 'Ubiquiti Access Point', title: 'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2', price: '£65.21', image: '/ubiquiti/15.jpg' },
  { id: 'ra6', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant', price: '£44.90', image: '/computerandlaptops/lenovo/l2.png' },
  { id: 'ra7', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga Gen6 ? Anti-Glare, Blue Light Reduction, 3M Nanolouvre Tech', price: '£46.02', image: '/computerandlaptops/lenovo/l3.png' },
  { id: 'ra8', brand: 'Lenovo Laptop', title: 'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10', price: '£44.90', image: '/computerandlaptops/lenovo/l7.png' },
  // Page 3
  { id: 'ra9', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P16v Gen 2 16″ Mobile Workstation ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 3000 Ada, WUXGA Display, Windows 11 Pro', price: '£540.24', image: '/computerandlaptops/lenovo/l45.png' },
  { id: 'ra10', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P1 Gen 7 16″ Laptop ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 2000, WQXGA Display, Windows 11 Pro', price: '£1,441.53', image: '/computerandlaptops/lenovo/l35.png' },
  { id: 'ra11', brand: 'Lenovo Laptop', title: 'ThinkPad Series 14 WUXGA R5-7530U | Powerful Laptop | AMD', price: '£1,275.20', image: '/computerandlaptops/lenovo/l77.png' },
  { id: 'ra12', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 Mobile Workstation – 14.5″ WQXGA, Intel Core Ultra 9, 32GB RAM, 1TB SSD, Intel Arc Graphics, Windows 11 Pro', price: '£1,164.32', image: '/computerandlaptops/lenovo/l41.png' },
  // Page 4
  { id: 'ra13', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 14.5″ Mobile Workstation – Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 500, WUXGA Display – Windows 11 Pro', price: '£1,242.55', image: '/computerandlaptops/lenovo/l14.png' },
  { id: 'ra14', brand: 'Lenovo Laptop', title: 'ThinkPad P16V1 R9-P7940HS | High-Performance Laptop with 32GB RAM, 1TB SSD, NVIDIA RTX 2000 | Windows 11 Pro', price: '£1,529.79', image: '/computerandlaptops/lenovo/l14.png' },
  { id: 'ra15', brand: 'Lenovo Laptop', title: 'ThinkPad L16 G1 AMD R7P-7735U 16-inch Laptop | 32GB RAM, 1TB SSD, NVIDIA RTX A1000 ? High Performance & Reliability', price: '£1,289.02', image: '/computerandlaptops/lenovo/l14.png' },
  { id: 'ra16', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 – Ultra-Portable Rugged Workstation | 64GB RAM, RTX 500 Ada, 1TB SSD', price: '£1,378.82', image: '/computerandlZ/lenovo/l14.png' },
  // Page 5
  { id: 'ra17', brand: 'Lenovo Laptop', title: 'Lenovo ThinkBook 16 G6 IRL – 16-inch Laptop with Intel Core i5, 8GB RAM, 256GB SSD, and 1920×1200 Display', price: '£1,984.64', image: '/computerandlaptops/lenovo/l18.jpg' },
  { id: 'ra18', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad X9-14 Gen 1 (21QA001KUK) 14″ WUXGA Laptop – Intel Core Ultra 7, 32GB RAM, 512GB SSD, Windows 11 Pro – Grey', price: '£2,128.16', image: '/computerandlaptops/lenovo/l18.jpg' },
  { id: 'ra19', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad T14s Gen 6 14″ Touchscreen Rugged Laptop – Qualcomm Snapdragon X Elite, 32GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', price: '£895.30', image: '/computerandlaptops/lenovo/l18.jpg' },
  // --- FIX: Corrected duplicate ID ---
  { id: 'ra20', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad T14s Gen 6 14″ Rugged Copilot+ Laptop – Qualcomm Snapdragon X Plus, 16GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', price: '£895.30', image: '/computerandlaptops/lenovo/l52.png' },
]);


// --- 2. New Product Card Component ---
function RecentlyAddedProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
      <div className="p-4">
        <span className="block text-sm text-gray-500 mb-1">{product.brand}</span>
        {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-md font-semibold text-blue-600 mb-3 h-12 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
        <Link href={`/product/${product.slug}`} className="block relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={`${product.title} [SEO Friendly]`}
            layout="fill"
            objectFit="contain"
          />
        </Link>

        {/* --- CHANGE: Replaced price with "Get a Quote" button --- */}
        <div className="mb-4">
          <a 
            href="#" // Placeholder link for quote
            className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-md transition-all hover:bg-blue-700"
          >
            Get a Quote
          </a>
        </div>

        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <HeartIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Add to wishlist</span>
          </button>
          
          {/* --- CHANGE: Converted <a> to <Link> and used product.slug --- */}
          <Link 
            href={`/product/${product.slug}`} // Link to product page
            className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full transition-all hover:bg-blue-600 group"
          >
            <ArrowRightIcon className="w-5 h-5 text-gray-700 transition-all group-hover:text-white" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}
// --- 3. Carousel Animation Variants ---
const carouselSlideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween", // Use tween for a smooth slide
      ease: "easeInOut", // Smoother easing
      duration: 0.7 // Set a longer duration
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      type: "tween", // Use tween for a smooth slide
      ease: "easeInOut", // Smoother easing
      duration: 0.7 // Set a longer duration
    },
  }),
};

// --- 4. Main Recently Added Section Component ---
function RecentlyAddedSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Chunk products into pages of 4
  const productsByPage = [];
  const chunkSize = 4;
  for (let i = 0; i < recentlyAddedProducts.length; i += chunkSize) {
    productsByPage.push(recentlyAddedProducts.slice(i, i + chunkSize));
  }
  const numPages = productsByPage.length;

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = numPages - 1;
    } else if (newPage >= numPages) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };

  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="container mx-auto px-24">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600 rounded-full"></div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-blue-600 hover:text-white"
              aria-label="Previous products"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-blue-600 hover:text-white"
              aria-label="Next products"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden" style={{ minHeight: '440px' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={carouselSlideVariants} // This will now use the new smooth animation
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {productsByPage[page].map((product) => (
                <RecentlyAddedProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {productsByPage.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > page ? 1 : -1])}
              className={`w-3 h-3 rounded-full transition-all
                ${page === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}
              `}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// --- END: NEW RECENTLY ADDED SECTION ---

// --- Main Page Component ---
export default function HomePageClient() {
  return (
    <>
      <HeaderSection />
      <ModernHeroSection />
      <DealsSection />
      <FeaturedProductsSection />
      {/* The EverythingBannerSection now contains the video content */}
      <EverythingBannerSection />
      {/* NEW: BestDealsSection added here */}
      <BestDealsSection />
      <LenovoLaptopSection />
      {/* NEW: BestSellersSection added after BestDeals */}
      <BestSellersSection />
      
      {/* --- ALL NEW SECTIONS ADDED BELOW --- */}

      <BigDealsBannerSection />
      <RecentlyAddedSection />

      {/* --- END OF NEW SECTIONS --- */}
      <GlobalProductHighlights />
      <ChatButton />
      <CustomScrollbarStyles />
    </>
  );
}