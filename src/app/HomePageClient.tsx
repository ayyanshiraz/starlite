"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Product } from '../lib/products';
import { useWishlist } from '../hooks/useWishlist';
import { useCompare } from '../hooks/useCompare';
import { useCart } from '../hooks/useCart';

// --- IMPORTS ---
import { HeaderSection } from '../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../components/SharedComponents';
import { GlobalProductHighlights } from '../components/GlobalProductHighlights';

// --- HELPER: Filter Products by Exact Names ---
const getProductsByNames = (allProducts: Product[], names: string[]) => {
  if (!allProducts) return [];
  return names.map(targetName => {
    return allProducts.find(p => p.name.toLowerCase().trim() === targetName.toLowerCase().trim());
  }).filter(Boolean) as Product[];
};

// --- SVG ICONS ---
const iconProps = { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ArrowRightIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>);
const HeartIcon = ({ className = "", fill = "none" }) => (<svg {...iconProps} fill={fill} className={`w-5 h-5 ${className}`}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const CompareIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="M18 4h-5.12V.68c0-.38-.31-.68-.69-.68h-4.38c-.38 0-.69.31-.69.68V4H2c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8-2h4v2h-4V2zm8 18H2V6h5.12V8.68c0 .38.31.68.69.68h4.38c.38 0 .69-.31.69-.68V6H18v14z"></path><path d="M11 10h2v7h-2z"></path><path d="M7 12h2v5H7z"></path><path d="M15 14h2v3h-2z"></path></svg>);
const ChevronLeftIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m15 18-6-6 6-6"></path></svg>);
const ChevronRightIcon = ({ className = "" }) => (<svg {...iconProps} className={className}><path d="m9 18 6-6-6-6"></path></svg>);

// ===== HERO SLIDER =====
const sliderData = [
  { id: 'laptops', preTitle: 'Laptops & Computers', title: 'Power Up With Our Top Laptops', description: 'Explore premium laptops tailored for every need. Performance style and value await.', img: '/about.jpg', href: '/category/computers-and-laptops' },
  { id: 'printers', preTitle: 'Printing Solutions', title: 'High-Quality Prints', description: 'Experience crisp clear and vibrant print quality with ease.', img: '/images/hero-printer.png', href: '/category/printers' },
  { id: 'routers', preTitle: 'Networking', title: 'Next-Gen Routers', description: 'Future-proof your network with advanced next-generation router technology.', img: '/images/hero-router.png', href: '/category/routers' },
  { id: 'switches', preTitle: 'Networking', title: 'Network Boost & High Performance', description: 'Experience unmatched performance with Ciscos high-speed switch technology.', img: '/images/hero-switch.png', href: '/category/switches' }
];

const slideVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeIn" } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const textChildVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: "easeOut" } }
};

function ModernHeroSection() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const gridStyle: React.CSSProperties = { position: 'absolute', inset: '0', zIndex: 20, backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '4rem 4rem' };

  useEffect(() => {
    const timer = setTimeout(() => { 
       setSlide([currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1, 1]); 
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = sliderData[currentSlide];

  return (
    <section className="relative w-full h-[600px] text-white overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
        <source src="/herosection (1) (1).mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 w-full h-full bg-black/70 z-10"></div>
      <div style={gridStyle}></div>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div 
          key={currentSlide} custom={direction} 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          transition={{ duration: 0.8 }} 
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative z-30 container mx-auto px-4 sm:px-8 h-full flex items-center justify-center text-center">
            <div className="w-full max-w-4xl">
              <motion.div className="w-full" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.6 } } }}>
                <motion.span className="block text-gray-300 font-bold mb-4 text-base" variants={textChildVariants}>{slide.preTitle}</motion.span>
                <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight" variants={textChildVariants}>{slide.title}</motion.h1>
                <motion.p className="text-base text-gray-300 font-bold mb-10 mx-auto max-w-xl" variants={textChildVariants}>{slide.description}</motion.p>
                <motion.div variants={textChildVariants}>
                  <Link href={slide.href} className="inline-flex items-center text-lg font-semibold py-3 px-8 border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-blue-700 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.4)] active:bg-gray-200 active:text-blue-800">
                    Know more <ArrowRightIcon className="w-5 h-5 ml-2" />
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
  const deals = [
    { id: 'laptops', title1: 'CATCH BIG', title2: 'DEALS', title3: 'ON THE LAPTOPS', image: '/deal.webp', alt: 'Laptops on sale', href: '/category/computers-and-laptops', bgColor: 'bg-blue-50' },
    { id: 'printers', title1: 'PRINTERS,', title2: 'AND MORE', title3: 'UP TO 10%', image: '/deal1.webp', alt: 'Printers and more', href: '/category/printers', bgColor: 'bg-indigo-50' },
    { id: 'switches', title1: 'SHOP THE', title2: 'HOTTEST', title3: 'PRODUCTS', image: '/deal3.webp', alt: 'Networking products', href: '/category/switches', bgColor: 'bg-gray-100' }
  ];

  const gridVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <motion.section className="pt-16 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <div className="container mx-auto px-8 lg:px-24">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={gridVariants}>
          {deals.map((deal) => (
            <motion.div key={deal.id} variants={cardVariants}>
              <Link href={deal.href} className="group flex bg-gray-50 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl h-44">
                <div className={`w-1/2 relative overflow-hidden ${deal.bgColor}`}>
                  <Image src={deal.image} alt={deal.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="w-1/2 p-6 flex flex-col justify-center">
                  <span className="block text-gray-600 font-medium text-sm">{deal.title1}</span>
                  <span className="block text-gray-900 text-2xl font-bold my-1 leading-tight">{deal.title2}</span>
                  <span className="block text-gray-600 font-medium text-sm">{deal.title3}</span>
                  <div className="flex items-center text-blue-600 font-semibold mt-4">
                    <span>Shop now</span> <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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

// --- HELPER: Tab Button ---
const TabButton = ({ title, isActive, onClick }: { title: string, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`text-xl font-semibold pb-2 transition-all duration-300 ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{title}</button>
);

// --- HELPER: Product Card ---
function ProductCard({ product }: { product: any }) {
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => { e.preventDefault(); addToCart(product); };
  const showAddToCart = product.price && product.price !== 'Get a Quote';

  return (
    <motion.div className="group relative border border-gray-200 bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col z-0" whileHover={{ y: -8, scale: 1.03, zIndex: 40, transition: { duration: 0.1, ease: "easeOut" } }}>
      <Link href={`/product/${product.slug}`} className="block relative w-full h-36 bg-white p-4">
        <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" />
      </Link>
      <div className="p-4 bg-white flex flex-col grow">
        <span className="block text-xs text-gray-500 mb-1">{product.category.split(',')[0]}</span>
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 h-10 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-md font-bold text-gray-900 mb-3">
          {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button onClick={handleAddToCart} className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md">
            {showAddToCart ? 'Add to Cart' : 'Get a Quote'}
          </button>
          <div className="flex justify-between items-center pt-3">
            <button onClick={toggleWishlist} className={`flex items-center gap-1.5 text-sm transition-colors ${isInWishlist ? 'text-red-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}>
              <HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /><span>Save</span>
            </button>
            <button onClick={toggleCompare} className={`flex items-center gap-1.5 text-sm transition-colors ${isInCompare ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}>
              <CompareIcon className="w-4 h-4" /><span>Compare</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- FEATURED PRODUCTS SECTION ---
function FeaturedProductsSection({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('featured');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth < 768); };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const safeProducts = products || [];

  // 🟢 FEATURED TAB (Exact Items)
  const featuredNames = [
    'D-Link DWA-X1850 AX1800 Wi-Fi 6 USB Adapter',
    'D-Link DAP-X2850 Nuclias Connect AX3600 Wi-Fi 6 PoE Access Point',
    'Ubiquiti Networks UniFi 5 x Switch 8 Managed Gigabit',
    'Ubiquiti Networks UA-SK-EU security access control system White',
    'Ubiquiti AmpliFi AFI-HD-UK Mesh Whole Home WiFi Router System',
    'Lexmark CX730de Laser A4 1200 x 1200 DPI 40 ppm',
    'Acer Predator UM.KX3EE.P08 LED display',
    'Apple Magic Keyboard for iPad Pro'
  ];
  const featuredList = getProductsByNames(safeProducts, featuredNames);

  // 🟢 TOP RATED TAB (Exact Items)
  const topRatedNames = [
    'Switch smart managed Layer2 5 Port',
    'Ubiquiti UniFi Dream Machine Pro Managed Gigabit (UDM-Pro)',
    'Ubiquiti EdgeRouter 6P wired router Gigabit Ethernet – ER-6P',
    'Ubiquiti UniFi U6+',
    'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2',
    'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant',
    'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga Gen6 ? Anti-Glare, Blue Light Reduction, 3M Nanolouvre Tech',
    'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10'
  ];
  const topRatedList = getProductsByNames(safeProducts, topRatedNames);

  const displayedProducts = activeTab === 'featured' ? featuredList : topRatedList;
  const specialOffer = safeProducts.find(p => p.name.includes('HP 14″ EliteBook 640 G9')) || { name: 'HP EliteBook', image: '/sidebanner.gif', slug: '#' };

  const sectionSlideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const motionProps = isMobile
    ? { initial: "visible", animate: "visible", variants: sectionSlideInVariants }
    : { initial: "hidden", whileInView: "visible", viewport: { once: false, amount: 0.2 }, variants: sectionSlideInVariants };

  return (
    <motion.section className="pt-16 pb-16 bg-white overflow-hidden" {...motionProps}>
      <div className="container mx-auto px-8">
        <nav className="flex justify-center gap-8 mb-10">
          <TabButton title="Featured" isActive={activeTab === 'featured'} onClick={() => setActiveTab('featured')} />
          <TabButton title="Top Rated" isActive={activeTab === 'top-rated'} onClick={() => setActiveTab('top-rated')} />
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Link href={`/product/${specialOffer.slug}`} className="group lg:col-span-1 border border-blue-500 rounded-lg shadow-sm relative w-full aspect-square overflow-hidden">
            <Image src="/sidebanner.gif" alt={specialOffer.name || 'Offer'} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
          </Link>
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
             {displayedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// --- EVERYTHING BANNER ---
function EverythingBannerSection() {
  const gridStyle: React.CSSProperties = { position: 'absolute', inset: '0', zIndex: 15, backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '4rem 4rem' };
  return (
    <section className="relative w-full h-[250px] text-white overflow-hidden bg-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
        <source src="/everything-banner (1).mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 w-full h-full bg-black/50 z-10"></div>
      <div style={gridStyle}></div>
      <div className="relative z-20 w-full h-full flex justify-center items-center px-4">
        <div className="w-full max-w-[95%] xl:max-w-[85%] text-center">
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 leading-relaxed">
            Starlight Linkers LLC empowers businesses by simplifying IT procurement with a wide range of cost-effective hardware, complemented by expert consultation and 24/7 support.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- BEST DEALS ITEM ---
const BestDealItem = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist(product.slug);
  const { isInCompare, toggleCompare } = useCompare(product.slug);
  const showAddToCart = product.price && product.price !== 'Get a Quote';

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block relative w-full h-32 bg-white p-4 overflow-hidden">
        <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" className="group-hover:scale-105 transition-transform duration-300 ease-in-out" />
      </Link>
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className="block text-xs font-medium text-gray-500 mb-1">{product.category.split(',')[0]}</span>
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 h-10 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-md text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md">
            {showAddToCart ? 'Add to Cart' : 'Get a Quote'}
          </button>
          <div className="flex justify-between items-center pt-3">
            <button onClick={toggleWishlist} className={`flex items-center gap-1 text-sm font-medium ${isInWishlist ? 'text-red-600' : 'text-gray-600 hover:text-blue-600'}`}><HeartIcon className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} /> Save</button>
            <button onClick={toggleCompare} className={`flex items-center gap-1 text-sm font-medium ${isInCompare ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}><CompareIcon className="w-4 h-4" /> Compare</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BEST DEALS SECTION (Auto-Switching) ---
function BestDealsSection({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const safeProducts = products || [];

  const allDealsNames = [
    'Brother HL-L6410DW Laser Printer – 1200 DPI, Wi-Fi, Duplex Printing',
    'APC Smart-UPS On-Line uninterruptible power supply (UPS) – SRT5KXLI',
    'Ubiquiti UniFi nanoHD 1733 Mbit/s – UAP-NANOHD-US',
    'Mikrotik CSS106-1G-4P-1S network switch',
    'DELL X-Series X1026P Managed',
    'HP Aruba 2930F 48G PoE+ 4SFP+ Managed L3 – JL256A',
    'Lenovo ThinkCentre M75s Gen 2 – 11R8002QUK',
    'NETGEAR 26-Port PoE Gigabit Ethernet – GS724TPP-100NAS',
    'Brother QL-810W label printer',
    'Brother ADS-2400N Desktop Document Scanner'
  ];

  const lenovoNames = [
    'Lenovo 100e Chromebook Gen 4 82W00003UK 29.5 cm (11.6″) Chromebook',
    'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant',
    'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga Gen6 ? Anti-Glare, Blue Light Reduction, 3M Nanolouvre Tech',
    'Lenovo 14e Chromebook Gen 3 – 14″ Full HD – Intel N200 – 8GB RAM – 128GB Storage',
    'Lenovo 300w Yoga Gen 4 2-in-1 Convertible Laptop – 11.6″ Touchscreen, Intel N100, 8GB RAM, 128GB SSD, Windows 11 Pro'
  ];

  const hpKeyboardsNames = [
    'HP 125 Keyboard – Cable Connectivity – USB Type A Interface – Notebook – PC, Windows',
    'HP 125 Keyboard with USB Cable Connectivity for Windows',
    'HP 125 Wired USB Keyboard – French Layout, Black, for PC and Mac',
    'HP 225 Eco-Friendly Wired Keyboard and Mouse Combo – USB Type A',
    'HP 225 Keyboard & Mouse – USB Cable Keyboard – USB Cable Mouse –'
  ];

  // 🟢 NEW: HP Displays Tab
  const hpDisplayNames = [
    'HP 322pv 21.4″ Full HD LED Monitor',
    'HP 324pf 23.8″ FHD IPS Monitor ? 100Hz, 5ms, HDMI/DP/VGA ? Slim LED Backlight for Work & Gaming',
    'HP 324pv 24″ Full HD VA Monitor ? 100Hz, Eye Ease, 3000:1 Contrast ? Sleek & Flicker-Free',
    'HP 524PU 23.8″ FHD IPS Monitor ? 100Hz, USB-C 100W, Borderless Design',
    'HP 7 Pro 24″ WUXGA IPS Monitor – 8X534AA#ABU'
  ];

  // 🟢 NEW: Transceiver Tab
  const transceiverNames = [
    'Alcatel-Lucent network transceiver module – SFP-10G-LR',
    'Avaya 1 PORT 10GBase-SR XFP Transceiver',
    'Avaya 1000BASE-LX, SFP network transceiver module 1000 Mbit/s'
  ];

  const categories = [
      { id: 'all', title: 'Best Deals' },
      { id: 'lenovo', title: 'Lenovo Laptop' },
      { id: 'hp-keyboards', title: 'HP Keyboards & Keypads' },
      { id: 'hp-displays', title: 'HP Displays' },
      { id: 'transceiver', title: 'Transceiver' }
  ];

  // 🟢 AUTO-SWITCH LOGIC
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCategory(prev => {
        const currentIndex = categories.findIndex(c => c.id === prev);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex].id;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, categories]);

  const productsToShow = useMemo(() => {
      if (activeCategory === 'lenovo') return getProductsByNames(safeProducts, lenovoNames);
      if (activeCategory === 'hp-keyboards') return getProductsByNames(safeProducts, hpKeyboardsNames);
      if (activeCategory === 'hp-displays') return getProductsByNames(safeProducts, hpDisplayNames);
      if (activeCategory === 'transceiver') return getProductsByNames(safeProducts, transceiverNames);
      return getProductsByNames(safeProducts, allDealsNames);
  }, [activeCategory, safeProducts]);

  return (
    <section className="py-16 bg-white" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container mx-auto px-8 lg:px-24">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`pb-2 text-sm font-medium transition-colors duration-300 ${activeCategory === cat.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              {cat.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 min-h-[350px]">
            <AnimatePresence mode="wait">
                {productsToShow.map(product => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                        <BestDealItem product={product} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- BEST SELLERS SECTION (Carousel 3-per-line + Shuffle) ---
function BestSellersSection({ products }: { products: Product[] }) {
    const [activeTab, setActiveTab] = useState('best-sellers');
    const [page, setPage] = useState(0);
    const safeProducts = products || [];

    // 🟢 Shuffle All Products for "Best Sellers" tab
    const allShuffled = useMemo(() => [...safeProducts].sort(() => 0.5 - Math.random()), [safeProducts]);

    // 🟢 Filter for other tabs
    const displayedProducts = useMemo(() => {
        if (activeTab === 'best-sellers') return allShuffled;
        if (activeTab === 'workstations') return safeProducts.filter(p => p.category.toLowerCase().includes('workstation') || p.name.toLowerCase().includes('workstation'));
        if (activeTab === 'ups') return safeProducts.filter(p => p.category.toLowerCase().includes('ups') || p.name.toLowerCase().includes('ups'));
        if (activeTab === 'ubiquiti-switches') return safeProducts.filter(p => p.category.toLowerCase().includes('ubiquiti') && (p.category.toLowerCase().includes('switch') || p.name.toLowerCase().includes('switch')));
        return [];
    }, [activeTab, safeProducts, allShuffled]);

    // 🟢 Carousel Logic (3 per page)
    const itemsPerPage = 3;
    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
    const productsToRender = displayedProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

    // Reset page when tab changes
    useEffect(() => setPage(0), [activeTab]);

    const tabs = [
        { id: 'best-sellers', title: 'Best Sellers' },
        { id: 'workstations', title: 'Workstations' },
        { id: 'ups', title: 'UPS' },
        { id: 'ubiquiti-switches', title: 'Ubiquiti Switches' },
    ];

    return (
        <section className="py-16 bg-white relative">
             <div className="container mx-auto px-4 sm:px-8 lg:px-24">
                 <div className="flex justify-center gap-6 mb-8 flex-wrap">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {tab.title}
                        </button>
                    ))}
                 </div>
                 
                 <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[380px]">
                        <AnimatePresence mode="wait">
                            {productsToRender.map(p => (
                                <motion.div key={`${p.id}-${page}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                                    <BestDealItem product={p} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {/* Arrows */}
                    {displayedProducts.length > itemsPerPage && (
                        <>
                            <button onClick={prevPage} className="absolute top-1/2 -left-12 -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition"><ChevronLeftIcon className="w-6 h-6"/></button>
                            <button onClick={nextPage} className="absolute top-1/2 -right-12 -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition"><ChevronRightIcon className="w-6 h-6"/></button>
                        </>
                    )}
                 </div>
             </div>
        </section>
    );
}

// --- RECENTLY ADDED SECTION ---
function RecentlyAddedSection({ products }: { products: Product[] }) {
    const safeProducts = products || [];
    const recent = safeProducts.slice(0, 8); 

    return (
        <section className="pt-8 pb-16 bg-white">
             <div className="container mx-auto px-8 lg:px-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Added</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recent.map(p => (
                        <div key={p.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4 hover:shadow-lg transition-shadow">
                             <Link href={`/product/${p.slug}`} className="block relative w-full h-48 mb-4">
                                <Image src={p.image} alt={p.name} layout="fill" objectFit="contain" />
                             </Link>
                             <Link href={`/product/${p.slug}`}>
                                <h3 className="text-md font-semibold text-blue-600 mb-3 h-12 line-clamp-2">{p.name}</h3>
                             </Link>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function HomePageClient({ products }: { products: Product[] }) {
  const safeProducts = products || [];

  return (
    <>
      <HeaderSection />
      <ModernHeroSection />
      <DealsSection />
      <FeaturedProductsSection products={safeProducts} />
      <EverythingBannerSection />
      <BestDealsSection products={safeProducts} />
      <BestSellersSection products={safeProducts} />
      <RecentlyAddedSection products={safeProducts} />
      <GlobalProductHighlights products={safeProducts} />
      <ChatButton />
      <CustomScrollbarStyles />
    </>
  );
}