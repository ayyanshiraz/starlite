"use client";

"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { allProducts, type Product } from '../lib/products'; // Added Product type
import { useWishlist } from '../hooks/useWishlist';
import { useCompare } from '../hooks/useCompare';

// --- IMPORTS ---
// ... (rest of your imports)

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

// --- REPLACE HeartIcon WITH THIS ---
const HeartIcon = ({ className = "", fill = "none" }) => (
  <svg {...iconProps} fill={fill} className={`w-5 h-5 ${className}`}>
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
    .replace(/ & /g, '-and-')     // Replace " & " with "-and-"
    .replace(/[^\w\s-]/g, '')       // Remove special chars except word, space, hyphen
    .replace(/[\s_-]+/g, '-')       // Replace spaces and underscores with a hyphen
    .replace(/^-+|-+$/g, '');       // Trim hyphens from start/end
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
    href: '/category/computers-and-laptops'
  },
  {
    id: 'printers',
    preTitle: 'Printing Solutions',
    title: 'High-Quality Prints',
    description: 'Experience crisp clear and vibrant print quality with ease.',
    img: '/images/hero-printer.png',
    alt: 'Epson Printer',
    href: '/category/printers'
  },
  {
    id: 'routers',
    preTitle: 'Networking',
    title: 'Next-Gen Routers',
    description: 'Future-proof your network with advanced next-generation router technology.',
    img: '/images/hero-router.png',
    alt: 'Gaming Router',
    href: '/category/routers'
  },
  {
    id: 'switches',
    preTitle: 'Networking',
    title: 'Network Boost & High Performance',
    description: 'Experience unmatched performance with Ciscos high-speed switch technology.',
    img: '/images/hero-switch.png',
    alt: 'Network Switches',
    href: '/category/switches'
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

// --- UPDATED: Much Slower text animation ---
const textChildVariants = {
  hidden: { opacity: 0, y: 30 }, // Increased distance slightly for smoother long float
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 2.0, // Increased duration to 2 seconds
      ease: "easeOut" 
    } 
  }
};

// 3. The Hero Section component
function ModernHeroSection() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  const gridStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    zIndex: 20,
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
    backgroundSize: '4rem 4rem'
  };

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
    }, 6000); // Increased slide timer slightly to accommodate slower text
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
        // pointer-events-none removes the pause button interaction
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/herosection (1) (1).mp4" type="video/mp4" />
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
          <div className="relative z-30 container mx-auto px-4 sm:px-8 h-full flex items-center justify-center text-center">
            <div className="w-full max-w-4xl">
              <motion.div
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { 
                    transition: { 
                      staggerChildren: 0.6 // Increased delay between lines to 0.6s
                    } 
                  }
                }}
              >
                <motion.span
                  className="block text-gray-300 font-bold mb-4 text-base"
                  variants={textChildVariants}
                >
                  {slide.preTitle}
                </motion.span>

                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                  variants={textChildVariants}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  className="text-base text-gray-300 font-bold mb-10 mx-auto max-w-xl"
                  variants={textChildVariants}
                >
                  {slide.description}
                </motion.p>

                <motion.div variants={textChildVariants}>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center text-lg font-semibold py-3 px-8 border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-blue-700 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.4)] active:bg-gray-200 active:text-blue-800"
                  >
                    Know more
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
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
      href: '/category/computers-and-laptops',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'printers',
      title1: 'PRINTERS,',
      title2: 'AND MORE',
      title3: 'UP TO 10%',
      image: '/deal1.webp',
      alt: 'Printers and more',
      href: '/category/printers',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'switches',
      title1: 'SHOP THE',
      title2: 'HOTTEST',
      title3: 'PRODUCTS',
      image: '/deal3.webp',
      alt: 'Hottest networking products',
      href: '/category/switches',
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
      <div className="container mx-auto px-8 lg:px-24">
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
  { id: 'switch-smart-managed-layer2-5-port', brand: 'Ubiquiti Switches', title: 'Switch smart managed Layer2 5 Port', image: '/ubiquiti/4.avif', price: 160.00 },
  { id: 'ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Dream Machine Pro Managed Gigabit (UDM-Pro)', image: '/ubiquiti/5.png', price: 315.11 },
  { id: 'ubiquiti-edgerouter-6p-wired-router-gigabit-ethernet-er-6p', brand: 'Ubiquiti Switches', title: 'Ubiquiti EdgeRouter 6P wired router Gigabit Ethernet – ER-6P', image: '/ubiquiti/6.png', price: 570.00 },
  { id: 'tr4', brand: 'Access Point', title: 'Ubiquiti UniFi U6+', image: '/ubiquiti/7.jpg', price: 71.35 },
  { id: 'tr5', brand: 'Ubiquiti Access Point', title: 'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2', image: '/ubiquiti/8.jpg', price: 120.00 },
  { id: 'tr6', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant', image: '/computerandlaptops/lenovo2/3.jpg', price: 45.00 },
  { id: 'tr7', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga', image: '/computerandlaptops/lenovo2/4.jpg', price: 42.00 },
  { id: 'tr8', brand: 'Lenovo Laptop', title: 'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10', image: '/computerandlaptops/lenovo2/13.jpg', price: 42.00 },
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
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);

  return (
    <motion.div
      className="group relative border border-gray-200 bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col z-0"
      whileHover={{ y: -8, scale: 1.03, zIndex: 40, transition: { duration: 0.1, ease: "easeOut" } }}
    >
      <Link href={`/product/${product.slug}`} className="block relative w-full h-36 bg-white p-4">
        <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
      </Link>
      <div className="p-4 bg-white flex flex-col grow">
        <span className="block text-xs text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 h-10 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.title}</h3>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a href="#" className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md">Get a Quote</a>
          <div className="flex justify-between items-center pt-3">
            <button onClick={toggleWishlist} className={`flex items-center gap-1.5 text-sm transition-colors ${isInWishlist ? 'text-red-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}>
              <HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /><span>{isInWishlist ? 'Saved' : 'Save'}</span>
            </button>
            <button onClick={toggleCompare} className={`flex items-center gap-1.5 text-sm transition-colors ${isInCompare ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}>
              <CompareIcon className="w-4 h-4" /><span>{isInCompare ? 'Added' : 'Compare'}</span>
            </button>
          </div>
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

  // --- MOBILE DETECTION STATE ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check immediately
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine which products to display
  let displayedProducts;
  if (activeTab === 'featured') {
    displayedProducts = featuredProducts;
  } else if (activeTab === 'top-rated') {
    displayedProducts = topRatedProducts;
  } else {
    displayedProducts = featuredProducts;
  }

  // --- ANIMATION VARIANTS ---
  // --- 1. MODIFIED: Changed y: 50 to x: -100 and y: 0 to x: 0 ---
  const sectionSlideInVariants = {
    hidden: { opacity: 0, x: -100 }, // Slide from left
    visible: {
      opacity: 1,
      x: 0, // Slide to original position
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  // --- FIX FOR MOBILE VISIBILITY ---
  // On Mobile: We force 'initial="visible"' so it renders with opacity: 1 immediately.
  // On Desktop: We use 'initial="hidden"' and wait for 'whileInView'.
  const motionProps = isMobile
    ? {
      initial: "visible",   // <--- Force visible immediately
      animate: "visible",   // <--- Ensure it stays visible
      variants: sectionSlideInVariants
    }
    : {
      initial: "hidden",
      whileInView: "visible",
      // --- 2. MODIFIED: Changed once: true to once: false ---
      viewport: { once: false, amount: 0.2 }, // Animate every time
      variants: sectionSlideInVariants
    };

  return (
    <motion.section
      className="pt-16 pb-16 bg-white overflow-hidden"
      // Spread the conditional props here
      {...motionProps}
    >
      <div className="container mx-auto px-8">
        {/* Tab Navigation */}
        <nav className="flex justify-center gap-8 mb-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* --- Special Offer Box (Square on all devices) --- */}
          <Link
            href={`/product/${specialOffer.slug}`}
            className="group lg:col-span-1 border border-blue-500 rounded-lg shadow-sm
                       relative w-full aspect-square overflow-hidden"
          >
            <Image
              src={specialOffer.image}
              alt={specialOffer.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Products Grid (Right) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
              // Keep internal animation simple
              initial={{ opacity: 0 }}
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
    <section className="relative w-full h-[250px] text-white overflow-hidden bg-black">
      {/* --- Video Background --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src="/everything-banner (1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dark Overlay --- */}
      <div className="absolute inset-0 w-full h-full bg-black/50 z-10"></div>

      {/* --- Grid Overlay --- */}
      <div style={gridStyle}></div>

      {/* --- Content --- */}
      {/* FIX: Removed 'container mx-auto' so it can go full width. Added flex centering. */}
      <div className="relative z-20 w-full h-full flex justify-center items-center px-4">
        <motion.div
          // FIX:
          // 1. Changed 'max-w-2xl' to 'max-w-[90%] xl:max-w-[80%]' to act like full width.
          // 2. This gives the text room to spread out into 3 lines on desktop.
          className="w-full max-w-[95%] xl:max-w-[85%] text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: "easeOut" }
            }
          }}
        >
          {/* FIX: Adjusted font sizes for better balance on wide screens */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 leading-relaxed">
            Starlight Linkers LLC  empowers businesses by simplifying IT procurement with a wide range of cost-effective hardware, complemented by expert consultation and 24/7 support to craft tailored, complete technology solutions. They act as a trusted partner, guiding companies from product selection to comprehensive implementation.
          </p>
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
    image: '/apc/11.avif', // Placeholder, update path
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
    title: 'Brother ADS-2400N Desktop Document Scanner',
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
// --- CARD 2: BEST DEALS ITEM (Updated) ---
// --- CARD 2: BEST DEALS ITEM (Updated) ---
const BestDealItem = ({ product }: { product: any }) => {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug); // 1. Add Compare hook

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block relative w-full h-32 bg-white p-4 overflow-hidden">
        <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" className="group-hover:scale-105 transition-transform duration-300 ease-in-out" />
      </Link>
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className="block text-xs font-medium text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 h-10 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.title}</h3>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a href="#" className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md">Get a Quote</a>
          
          {/* 2. Add the buttons in a flex container */}
          <div className="flex justify-between items-center pt-3">
            <button 
              onClick={toggleWishlist} 
              className={`flex items-center gap-1 text-sm font-medium ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /> {isInWishlist ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={toggleCompare} 
              className={`flex items-center gap-1 text-sm font-medium ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <CompareIcon className="w-4 h-4" /> {isInCompare ? 'Added' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function BestDealsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const checkMobile = () => { setIsMobile(window.innerWidth < 768); }; checkMobile(); window.addEventListener('resize', checkMobile); return () => window.removeEventListener('resize', checkMobile); }, []);

  // --- START: MODIFIED FILTER LOGIC ---
  const allFilteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return bestDealsProducts;
    }
    const allProductsFormatted = allProducts.map(p => ({
      id: p.id,
      slug: p.slug,
      image: p.image,
      title: p.name,
      brand: p.category,
    }));
    if (activeCategory === 'lenovo-laptop') {
      return allProductsFormatted.filter(product => {
        const searchableText = (product.brand.toLowerCase() + ' ' + product.title.toLowerCase());
        return searchableText.includes('lenovo') &&
          (searchableText.includes('laptop') || searchableText.includes('laptops'));
      });
    }
    const searchTerms = activeCategory.split('-');
    return allProductsFormatted.filter(product => {
      const searchableText = (product.title.toLowerCase() + ' ' + product.brand.toLowerCase())
        .replace(/&/g, '');
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, [activeCategory]); // Rerun logic when activeCategory changes

  const productsToShow = activeCategory === 'all'
    ? allFilteredProducts
    : allFilteredProducts.slice(0, 5);

  const sectionStompVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const currentCategory = bestDealsCategories.find(c => c.id === activeCategory);
  const showViewAllButton =
    currentCategory &&
    activeCategory !== 'all' &&
    allFilteredProducts.length > 5;

  const motionProps = isMobile
    ? { initial: "visible", animate: "visible", variants: sectionStompVariant }
    : { variants: sectionStompVariant, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 } };

  return (
    <motion.section
      className="py-16 bg-white"
      {...motionProps}
    >
      <div className="container mx-auto px-8 lg:px-24">
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
          {bestDealsCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative pb-2 text-sm font-medium transition-colors duration-300
                ${activeCategory === category.id
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.title}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="best-deals-underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {productsToShow.map((product) => (
            // This now uses the correct component
            <BestDealItem key={product.id} product={product} />
          ))}
        </div>

        {/* Dynamic "View All" Button */}
        {showViewAllButton && (
          <div className="flex justify-center mt-10">
            <Link
              href={`/category/${currentCategory.id}`}
              className="inline-flex items-center text-lg font-semibold py-3 px-8 bg-blue-600 text-white rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-glow group"
            >
              View All {currentCategory.title}
              <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}
// --- END: NEW BEST DEALS SECTION ---

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
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);

  return (
    <div className="relative isolate border border-gray-200 rounded-lg overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-md">
      <Link href={`/product/${product.slug}`} className="block relative w-full h-52 bg-white p-4">
        <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" className="transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="p-3 bg-white">
        <span className="block text-xs text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.slug}`}><h3 className="text-sm font-semibold text-gray-900 mb-2 h-10 line-clamp-2 transition-colors group-hover:text-blue-600">{product.title}</h3></Link>
        <a href="#" className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md mt-2">Get a Quote</a>
        <div className="flex justify-between items-center mt-3 px-1">
          <button onClick={toggleWishlist} className={`flex items-center gap-1.5 text-sm font-medium ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /> {isInWishlist ? 'Saved' : 'Save'}
          </button>
          <button onClick={toggleCompare} className={`flex items-center gap-1.5 text-sm font-medium ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <CompareIcon className="w-4 h-4" /> {isInCompare ? 'Added' : 'Compare'}
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
    // opacity: 0, // <-- REMOVED
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 }
  }),
  animate: {
    x: 0,
    // opacity: 1, // <-- REMOVED
    zIndex: 1,
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 } // Smooth
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    // opacity: 0, // <-- REMOVED
    zIndex: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.7 } // Smooth
  })
};
// --- START: NEW BEST SELLERS SECTION ---
// --- THIS ENTIRE FUNCTION IS REPLACED ---
function BestSellersSection() {
  const [activeTab, setActiveTab] = useState('best-sellers');
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  // --- FIX: Define a type for the formatted product ---
  type FormattedProduct = {
    id: string;
    slug: string;
    image: string;
    title: string;
    brand: string;
    price: number | string;
  };

  // --- Mobile Detection ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is 'md' breakpoint
    };
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile); // Check on resize
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // --- END: Mobile Detection ---

  // --- START: MODIFIED FILTER LOGIC (Optimized) ---
  // --- FIX: Add useMemo and add types ---
  const allProductsFormatted: FormattedProduct[] = useMemo(() => {
    return allProducts.map((p: Product) => ({ // <-- Added Product type
      id: p.id,
      slug: p.slug,
      image: p.image,
      title: p.name,
      brand: p.category, // brand field now holds the category string
      price: p.price,
    }));
  }, [allProducts]); // FIX: Dependency array was empty, now correctly depends on allProducts

  // FIX: Wrapped all filtering logic in useMemo for performance
  const activeProductList = useMemo(() => {
    // 2. Handle which list to show based on the active tab
    if (activeTab === 'best-sellers') {
      // This tab uses the curated list
      return allBestSellers;
    }

    if (activeTab === 'workstations') {
      return allProductsFormatted.filter((product: FormattedProduct) => {
        const brandText = product.brand.toLowerCase();
        return brandText.includes('workstation');
      });
    }

    if (activeTab === 'ups') {
      return allProductsFormatted.filter((product: FormattedProduct) => {
        const brandText = product.brand.toLowerCase();
        return brandText.includes('ups');
      });
    }

    if (activeTab === 'ubiquiti-switches') {
      // --- THIS IS THE FIX ---
      // We check the category for "ubiquiti" AND the title for "switch"
      return allProductsFormatted.filter((product: FormattedProduct) => {
        const brandText = product.brand.toLowerCase();
        const titleText = product.title.toLowerCase();

        const isUbiquiti = brandText.includes('ubiquiti');
        const isSwitch = brandText.includes('switch') || titleText.includes('switch');

        return isUbiquiti && isSwitch;
      });
      // --- END OF FIX ---
    }

    // Fallback to best-sellers
    return allBestSellers;
  }, [activeTab, allProductsFormatted, allBestSellers]); // Dependencies
  // --- END: MODIFIED FILTER LOGIC ---

  const numPages = activeProductList.length;
  const centerIndex = page;

  const paginate = useCallback((newDirection: number) => {
    setPage(prev => {
      // --- FIX: Check for numPages being 0 ---
      if (numPages === 0) return [0, newDirection];
      const [currentPage, _] = prev;
      let newIndex = currentPage + newDirection;
      if (newIndex < 0) {
        newIndex = numPages - 1; // Loop to last
      } else if (newIndex >= numPages) {
        newIndex = 0; // Loop to first
      }
      return [newIndex, newDirection];
    });
  }, [numPages]);

  // --- Auto-scroll ---
  useEffect(() => {
    if (isHovered || numPages <= 1) return; // Don't auto-scroll if hovered or only one page
    const timer = setInterval(() => {
      paginate(1);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHovered, paginate, numPages]); // Added numPages dependency
  // --- END: Auto-scroll ---

  const sectionFadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // --- FIX: Reset pagination if numPages changes (e.g., on tab switch) ---
  useEffect(() => {
    setPage([0, 0]);
  }, [activeTab]);

  if (numPages === 0) {
    return (
      <motion.section
        className="py-16 bg-white"
        variants={sectionFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-24">
          {/* Category Tabs (still show them) */}
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-10">
            {bestSellersTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // setPage([0, 0]); // Not needed here, handled by useEffect
                }}
                className={`py-2 px-5 rounded-md text-lg font-semibold transition-colors duration-300
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="text-center text-gray-700 py-10" style={{ minHeight: '420px' }}>
            No products found for this category.
          </div>
        </div>
      </motion.section>
    );
  }

  // --- Conditional Product Display Logic ---
  let productsToRender: (FormattedProduct | typeof allBestSellers[0] | null)[] = [];

  if (isMobile) {
    if (numPages > 0) {
      productsToRender = [activeProductList[centerIndex]];
    }
  } else {
    if (numPages === 1) {
      productsToRender = [null, activeProductList[0], null];
    } else if (numPages === 2) {
      // --- FIX: Handle case with only 2 products ---
      if (centerIndex === 0) {
        productsToRender = [null, activeProductList[0], activeProductList[1]];
      } else { // centerIndex is 1
        productsToRender = [activeProductList[0], activeProductList[1], null];
      }
    } else { // 3 or more products
      const leftIndex = (centerIndex - 1 + numPages) % numPages;
      const rightIndex = (centerIndex + 1 + numPages) % numPages;
      productsToRender = [
        activeProductList[leftIndex],
        activeProductList[centerIndex],
        activeProductList[rightIndex]
      ];
    }
  }
  // --- END: Conditional Logic ---

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-24">
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-10">
          {bestSellersTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // setPage([0, 0]); // Removed, handled by useEffect
              }}
              className={`py-2 px-5 rounded-md text-lg font-semibold transition-colors duration-300
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={carouselVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={isMobile
                  ? "absolute w-full flex justify-center"
                  : "absolute w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
                }
              >
                {productsToRender.map((product: any, index: number) => (
                  product ? (
                    <div
                      key={product.id + '-' + centerIndex}
                      // --- FIX: Changed max-w-xs (320px) to max-w-[16rem] (256px) ---
                      // This makes the card narrower.
                      className={isMobile ? "w-full max-w-[16rem]" : ""}
                    >
                      <BestSellerProductCard
                        product={product}
                      />
                    </div>
                  ) : (
                    <div key={index} />
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Buttons (No changes needed, they will now sit in the empty space) */}
          {numPages > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute top-1/2 left-0 md:left-[-3rem] -translate-y-1/2 z-30 bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute top-1/2 right-0 md:right-[-3rem] -translate-y-1/2 z-30 bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-6 h-6" />
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
      <div className="container mx-auto px-8 lg:px-24">
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
  { id: 'switch-smart-managed-layer2-5-port', brand: 'Ubiquiti Switches', title: 'Switch smart managed Layer2 5 Port', price: '£160.00', image: '/ubiquiti/4.avif' },
  { id: 'ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro', brand: 'Ubiquiti Switches', title: 'Ubiquiti UniFi Dream Machine Pro Managed Gigabit (UDM-Pro)', price: '£315.11', image: '/ubiquiti/5.png' },
  { id: 'ubiquiti-edgerouter-6p-wired-router-gigabit-ethernet-er-6p', brand: 'Ubiquiti Switches', title: 'Ubiquiti EdgeRouter 6P wired router Gigabit Ethernet – ER-6P', price: '£570.00', image: '/ubiquiti/6.png' },
  { id: 'ra4', brand: 'Access Point', title: 'Ubiquiti UniFi U6+', price: '£71.35', image: '/ubiquiti/7.jpg' },
  // Page 2
  { id: 'ra5', brand: 'Ubiquiti Access Point', title: 'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2', price: '£65.21', image: '/ubiquiti/15.jpg' },
  { id: 'ra6', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant', price: '£44.90', image: '/computerandlaptops/lenovo2/3.jpg' },
  { id: 'ra7', brand: 'Lenovo Laptop', title: 'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga Gen6 ? Anti-Glare, Blue Light Reduction, 3M Nanolouvre Tech', price: '£46.02', image: '/computerandlaptops/lenovo2/4.jpg' },
  { id: 'ra8', brand: 'Lenovo Laptop', title: 'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10', price: '£44.90', image: '/computerandlaptops/lenovo2/13.jpg' },
  // Page 3
  { id: 'ra9', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P16v Gen 2 16″ Mobile Workstation ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 3000 Ada, WUXGA Display, Windows 11 Pro', price: '£540.24', image: '/computerandlaptops/lenovo2/13.jpg' },
  { id: 'ra10', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P1 Gen 7 16″ Laptop ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 2000, WQXGA Display, Windows 11 Pro', price: '£1,441.53', image: '/computerandlaptops/lenovo2/16.jpg' },
  { id: 'ra11', brand: 'Lenovo Laptop', title: 'ThinkPad Series 14 WUXGA R5-7530U | Powerful Laptop | AMD', price: '£1,275.20', image: '/computerandlaptops/lenovo2/2.jpg' },
  { id: 'ra12', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 Mobile Workstation – 14.5″ WQXGA, Intel Core Ultra 9, 32GB RAM, 1TB SSD, Intel Arc Graphics, Windows 11 Pro', price: '£1,164.32', image: '/computerandlaptops/lenovo2/19.jpg' },
  // Page 4
  { id: 'ra13', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 14.5″ Mobile Workstation – Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 500, WUXGA Display – Windows 11 Pro', price: '£1,242.55', image: '/computerandlaptops/lenovo2/12.jpg' },
  { id: 'ra14', brand: 'Lenovo Laptop', title: 'ThinkPad P16V1 R9-P7940HS | High-Performance Laptop with 32GB RAM, 1TB SSD, NVIDIA RTX 2000 | Windows 11 Pro', price: '£1,529.79', image: '/computerandlaptops/lenovo2/12.jpg' },
  { id: 'ra15', brand: 'Lenovo Laptop', title: 'ThinkPad L16 G1 AMD R7P-7735U 16-inch Laptop | 32GB RAM, 1TB SSD, NVIDIA RTX A1000 ? High Performance & Reliability', price: '£1,289.02', image: '/computerandlaptops/lenovo2/12.jpg' },
  { id: 'ra16', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad P14s Gen 5 – Ultra-Portable Rugged Workstation | 64GB RAM, RTX 500 Ada, 1TB SSD', price: '£1,378.82', image: '/computerandlaptops/lenovo2/12.jpg' },
  // Page 5
  { id: 'ra17', brand: 'Lenovo Laptop', title: 'Lenovo ThinkBook 16 G6 IRL – 16-inch Laptop with Intel Core i5, 8GB RAM, 256GB SSD, and 1920×1200 Display', price: '£1,984.64', image: '/computerandlaptops/lenovo/l18.jpg' },
  { id: 'ra18', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad X9-14 Gen 1 (21QA001KUK) 14″ WUXGA Laptop – Intel Core Ultra 7, 32GB RAM, 512GB SSD, Windows 11 Pro – Grey', price: '£2,128.16', image: '/computerandlaptops/lenovo/l18.jpg' },
  { id: 'ra19', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad T14s Gen 6 14″ Touchscreen Rugged Laptop – Qualcomm Snapdragon X Elite, 32GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', price: '£895.30', image: '/computerandlaptops/lenovo/l18.jpg' },
  // --- FIX: Corrected duplicate ID ---
  { id: 'ra20', brand: 'Lenovo Laptop', title: 'Lenovo ThinkPad T14s Gen 6 14″ Rugged Copilot+ Laptop – Qualcomm Snapdragon X Plus, 16GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', price: '£895.30', image: '/computerandlaptops/lenovo2/20.jpg' },
]);


// --- 2. New Product Card Component ---
function RecentlyAddedProductCard({ product }: { product: any }) {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
      <div className="p-4">
        <span className="block text-sm text-gray-500 mb-1">{product.brand}</span>
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-md font-semibold text-blue-600 mb-3 h-12 line-clamp-2">{product.title}</h3>
        </Link>
        <Link href={`/product/${product.slug}`} className="block relative w-full h-48 mb-4">
          <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
        </Link>
        <div className="mb-4">
          <a href="#" className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-md transition-all hover:bg-blue-700">Get a Quote</a>
        </div>
        <div className="flex justify-between items-center">
           <button onClick={toggleWishlist} className={`flex items-center gap-2 transition-colors ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}>
             <HeartIcon className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} /> <span className="text-sm font-medium">{isInWishlist ? 'Saved' : 'Add to wishlist'}</span>
           </button>
           <button onClick={toggleCompare} className={`flex items-center gap-2 transition-colors ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
             <CompareIcon className="w-5 h-5" /> <span className="text-sm font-medium">{isInCompare ? 'Added' : 'Compare'}</span>
           </button>
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
  const [isHovered, setIsHovered] = useState(false);

  // --- NEW: State for responsive chunking ---
  const [chunkSize, setChunkSize] = useState(4); // Default to desktop

  // --- NEW: useEffect to check window width and set chunk size ---
  useEffect(() => {
    const updateChunkSize = () => {
      const width = window.innerWidth;
      if (width < 768) { // Mobile (md breakpoint)
        setChunkSize(1);
      } else if (width < 1024) { // Tablet (lg breakpoint)
        setChunkSize(2);
      } else { // Desktop
        setChunkSize(4);
      }
    };

    updateChunkSize(); // Check on mount
    window.addEventListener('resize', updateChunkSize); // Re-check on resize

    // Cleanup listener
    return () => window.removeEventListener('resize', updateChunkSize);
  }, []); // Empty array ensures this runs only on client mount


  // --- UPDATED: Chunk products based on responsive chunkSize ---
  const productsByPage = [];
  for (let i = 0; i < recentlyAddedProducts.length; i += chunkSize) {
    productsByPage.push(recentlyAddedProducts.slice(i, i + chunkSize));
  }
  const numPages = productsByPage.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(prev => {
      // Prevent errors if numPages is 0
      if (numPages === 0) return [0, 0];

      const [currentPage, _] = prev;
      let newPage = currentPage + newDirection;

      if (newPage < 0) {
        newPage = numPages - 1; // Loop to end
      } else if (newPage >= numPages) {
        newPage = 0; // Loop to start
      }
      return [newPage, newDirection];
    });
  }, [numPages]); // numPages is now dynamic

  // --- Auto-scroll ---
  useEffect(() => {
    if (isHovered || numPages <= 1) return; // Don't scroll if hovering or only 1 page

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, paginate, numPages]);
  // --- END: Auto-scroll ---

  // --- NEW: Handle page index being out of bounds on resize ---
  useEffect(() => {
    if (page >= numPages) {
      setPage([Math.max(0, numPages - 1), 0]); // Go to the new last page
    }
  }, [page, numPages]);
  // --- END: Handle resize ---

  // --- NEW: Handle case where no products exist ---
  if (productsByPage.length === 0) {
    return (
      <section className="pt-8 pb-16 bg-white">
        <div className="container mx-auto px-8 lg:px-24">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-gray-600">No recently added products.</p>
        </div>
      </section>
    );
  }
  // --- END: Handle no products ---

  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="container mx-auto px-8 lg:px-24">

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
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '440px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page} // Key changes when page index changes
              custom={direction}
              variants={carouselSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* This now renders 1, 2, or 4 products */}
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