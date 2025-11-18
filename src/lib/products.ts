// src/lib/products.ts
// 1. IMPORT THE SKU DATA
import { productSkus } from './sku-data';
// 1. DEFINE THE STANDARD DESCRIPTION TYPE (Original)
export type StandardProductDescription = {
  overview: string;
  design: { title: string; formFactor: string };
  performance: { title: string; processor: string; memory: string; storage: string };
  display: { title: string; screen: string; graphics: string };
  connectivity: { title: string; ports: string[]; wireless: string[] };
  functionality: { title: string; versatility: string; connectivityOptions: string };
};

// 2. DEFINE THE NEW KEY-FEATURE DESCRIPTION TYPE (For screenshot format)
export type KeyFeatureProductDescription = {
  keyFeatures: {
    title: string;
    items: string[];
  }[];
  benefits: string[];
  summary: string;
};

// 3. UPDATE THE MAIN PRODUCT TYPE TO ACCEPT EITHER STRUCTURE
export type Product = {
  id: string;
  name: string;
  price: number | string;
  image: string;
  category: string; // The display category (e.g., "Laptops, HP")
  categorySlug: string; // The link (e.g., "computers-and-laptops")
  slug: string; // This is required
  sku?: string; // <--- ADDED THIS FIELD
  description: StandardProductDescription | KeyFeatureProductDescription; // This allows both formats
};
// 3. CREATE THE DETAILED DELL DESCRIPTION
// This is the one you provided
const dellDescription: StandardProductDescription = {
  overview: "Dell 14 inch Latitude 7420 2-in-1 Touchscreen Notebook Overview",
  design: {
    title: "Design",
    formFactor: "Slim and versatility 2-in-1 design with a 360 degree hinge, enabling use as both a laptop and a tablet. This flexibility makes it ideal for various use cases, from professional work to casual media consumption."
  },
  performance: {
    title: "Performance",
    processor: "11th Gen Intel Core i5 processor running at 2.4 GHz, providing a balance of power and efficiency for everyday tasks and multitasking.",
    memory: "8 GB LPDDR4 RAM for smooth and efficient multitasking without lag.",
    storage: "256 GB SSD for fast data access and reliable storage, ensuring quick boot times and application launches."
  },
  display: {
    title: "Display and Graphics",
    screen: "14 inch touchscreen display with a resolution of 1920 x 1080, delivering clear and vibrant visuals with touch capability for interactive use.",
    graphics: "Integrated Intel Iris Xe Graphics for sharp and smooth visuals, suitable for both productivity tasks and media playback."
  },
  connectivity: {
    title: "Connectivity",
    ports: [
      "Two Thunderbolt 4 ports for high-speed data transfer (up to 40 Gb/s), device chaining, and support for external displays.",
      "One USB 3.2 Gen 1 Type-A port for connecting older peripherals.",
      "One HDMI 2.0 port for external display connectivity."
    ],
    wireless: [
      "Bluetooth 5.2: For connecting wireless peripherals with improved range and stability.",
      "Wi-Fi 6 (802.11ax): Provides fast and reliable internet connectivity with enhanced performance and efficiency."
    ]
  },
  functionality: {
    title: "Functionality",
    versatility: "Switch effortlessly between laptop and tablet modes, offering flexibility for different tasks and usage scenarios. Ideal for professionals who need both productivity and multimedia capabilities in a single device.",
    connectivityOptions: "Supports a range of devices and displays, enhancing productivity and presentation capabilities with multiple connectivity options."
  }
};
// 3. CREATE A GENERIC PLACEHOLDER DESCRIPTION
const placeholderDescription: StandardProductDescription = {
  overview: "Product overview is not yet available.",
  design: {
    title: "Design",
    formFactor: "Information not available."
  },
  performance: {
    title: "Performance",
    processor: "Information not available.",
    memory: "Information not available.",
    storage: "Information not available."
  },
  display: {
    title: "Display and Graphics",
    screen: "Information not available.",
    graphics: "Information not available."
  },
  connectivity: {
    title: "Connectivity",
    ports: ["Information not available."],
    wireless: ["Information not available."]
  },
  functionality: {
    title: "Functionality",
    versatility: "Information not available.",
    connectivityOptions: "Information not available."
  }
  
};
// --- NEW DESCRIPTION FOR HP M501dn ---
const hpLaserJetM501dnDescription: StandardProductDescription = {
  overview: 'HP LaserJet Pro M501dn Mono Laser Printer',
  design: {
    title: 'Compact and Efficient Design',
    formFactor: 'A robust and compact monochrome printer designed to fit in tight spaces. It features a 2-line backlit LCD text display and a numeric keypad for easy operation and PIN printing.',
  },
  performance: {
    title: 'High-Speed Performance and Productivity',
    processor: 'Features a powerful 1500 MHz processor to handle complex print jobs efficiently.',
    memory: 'Equipped with 256 MB of standard memory.',
    storage: 'Job storage available via optional USB drive for PIN printing.',
  },
  display: {
    title: 'Professional Monochrome Output',
    screen: 'Print speeds of up to 45 ppm (black) with a first page out as fast as 5.7 seconds. Features automatic duplex (two-sided) printing to save paper.',
    graphics: 'Delivers sharp text, bold blacks, and crisp graphics with precision black toner. Resolution up to 4800 x 600 enhanced dpi, with HP FastRes 1200 and HP ProRes 1200 technologies.',
  },
  connectivity: {
    title: 'Secure and Seamless Connectivity',
    ports: [
      '1 Hi-Speed USB 2.0 Host port',
      '1 Hi-Speed USB 2.0 Device port',
      '1 Gigabit Ethernet 10/100/1000Base-T network port',
    ],
    wireless: [
      'Mobile Printing via HP ePrint, Apple AirPrint, and Mopria-certified',
      'Standard (built-in Gigabit Ethernet)',
    ],
  },
  functionality: {
    title: 'Built for Business',
    versatility: 'Ideal for busy offices with a recommended monthly page volume of 1,500 to 6,000 pages and a duty cycle of up to 100,000 pages.',
    connectivityOptions: 'Standard 100-sheet multipurpose tray and 550-sheet main cassette for a 650-sheet total input capacity. Robust security features to help guard against threats.',
  },
};

// 4. MASTER LIST WITH UNIQUE DESCRIPTIONS
const rawProducts: Product[] = [
  // --- Computers & Laptops (141 Products) ---
  { 
    id: "1", 
    name: 'Dell 14″ Latitude 7420 2-in-1 Touchscreen – RGRW0', 
    price: "Get a Quote", 
    image: '/computerandlaptops/dell/dell1.png', 
    category: 'Laptops, Dell', 
    categorySlug: 'computers-and-laptops',
    slug: 'dell-14-latitude-7420-2-in-1-touchscreen-rgrw0',
    description: dellDescription // <-- USES THE REAL DESCRIPTION
    
  },
  { 
    id: "2", 
    name: 'HP 14″ EliteBook 640 G9 – 6C0Z3UT', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-14-elitebook-640-g9-6c0z3ut',
    description: {
      overview: "HP 14 inch EliteBook 640 G9 Overview",
      design: { title: "Design", formFactor: "A professional 14 inch laptop featuring a sleek and durable chassis built for business mobility and hybrid work." },
      performance: { title: "Performance", processor: "Powered by a reliable Intel processor, this EliteBook is designed for mainstream business productivity.", memory: "Equipped with fast memory for efficient multitasking.", storage: "Features a speedy SSD for quick boot times and application loading." },
      display: { title: "Display and Graphics", screen: "A 14 inch display that offers a balance of portability and viewing comfort.", graphics: "Integrated Intel graphics for business applications and media." },
      connectivity: { title: "Connectivity", ports: ["USB-C (Thunderbolt)", "USB-A", "HDMI", "Ethernet"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Features HP Wolf Security for Business, providing hardware-enforced, always-on defense.", connectivityOptions: "A wide array of ports supports docking and connection to multiple peripherals." }
    }
  },
  { 
    id: "3", 
    name: 'HP 14″ EliteBook 640 G9 – 6C0Z3UT#ABA', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-14-elitebook-640-g9-6c0z3ut-aba',
    description: {
      overview: "HP 14 inch EliteBook 640 G9 (6C0Z3UT#ABA) Overview",
      design: { title: "Design", formFactor: "This specific model of the 14 inch EliteBook 640 G9 features a robust design for professionals on the move." },
      performance: { title: "Performance", processor: "Driven by an Intel Core processor, this laptop is optimized for performance and collaboration.", memory: "Sufficient memory to handle multiple applications simultaneously.", storage: "Solid State Drive ensures rapid data access and system responsiveness." },
      display: { title: "Display and Graphics", screen: "14 inch narrow-bezel display for an immersive viewing experience.", graphics: "Integrated Intel graphics suitable for all standard business tasks." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A 3.2 Gen 1", "HDMI 2.0", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Ideal for hybrid work, featuring AI-based noise reduction and robust security.", connectivityOptions: "Comprehensive port selection eliminates the need for most dongles." }
    }
  },
  { 
    id: "4", 
    name: 'HP 250 G10 39.6 cm (15.6″) Notebook – 16 GB', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-250-g10-39-6-cm-15-6-notebook-16-gb',
    description: {
      overview: "HP 250 G10 15.6 inch Notebook with 16GB RAM Overview",
      design: { title: "Design", formFactor: "An essential business laptop with a 15.6 inch display, offering a large screen for productivity in a durable, lightweight package." },
      performance: { title: "Performance", processor: "Equipped with a modern Intel processor for dependable performance.", memory: "16GB of RAM ensures smooth multitasking across many applications.", storage: "Fast SSD storage for holding all your important files and quick startups." },
      display: { title: "Display and Graphics", screen: "A large 15.6 inch Full HD display provides ample space for spreadsheets and documents.", graphics: "Integrated Intel graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A budget-friendly and reliable workhorse for small businesses and students.", connectivityOptions: "Connect to all your peripherals with a full range of built-in ports." }
    }
  },
  { 
    id: "5", 
    name: 'HP 250 G10 Laptop: Intel i5, 16GB RAM, 256GB SSD, Full HD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/31.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-250-g10-laptop-intel-i5-16gb-ram-256gb-ssd-full-hd-win-11-pro',
    description: {
      overview: "HP 250 G10 Laptop (Intel i5, 16GB RAM, 256GB SSD) Overview",
      design: { title: "Design", formFactor: "The HP 250 G10 combines affordability with a professional look, featuring a 15.6 inch Full HD display and a slim chassis." },
      performance: { title: "Performance", processor: "Powered by an Intel Core i5 processor for a strong balance of power and efficiency.", memory: "16GB RAM allows for heavy multitasking without slowdowns.", storage: "A fast 256GB SSD provides quick boot-up and file access." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (1920 x 1080) anti-glare display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB Type-C", "2x USB Type-A", "HDMI", "Headphone/microphone combo"], wireless: ["Wi-Fi 6", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Comes with Windows 11 Pro, offering enhanced security and management features for business.", connectivityOptions: "Ready for all your peripherals and external displays." }
    }
  },
  { 
    id: "6", 
    name: 'HP 250 G10 Laptop: Intel i5, 16GB RAM, 512GB', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/32.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-250-g10-laptop-intel-i5-16gb-ram-512gb',
    description: {
      overview: "HP 250 G10 Laptop (Intel i5, 16GB RAM, 512GB SSD) Overview",
      design: { title: "Design", formFactor: "A reliable and cost-effective 15.6 inch laptop for everyday business tasks, featuring a durable build." },
      performance: { title: "Performance", processor: "Features a capable Intel Core i5 processor.", memory: "16GB of RAM for handling multiple browser tabs and applications.", storage: "A generous 512GB SSD for ample storage and fast performance." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB Type-C", "USB Type-A", "HDMI", "Audio Jack"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "This configuration offers a great balance of performance and storage for demanding users.", connectivityOptions: "Connect easily to your network and peripherals." }
    }
  },
  { 
    id: "7", 
    name: 'HP 250 G10 Laptop: Intel i5, 8GB RAM, 256GB SSD, 15.6″ FHD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/3.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-250-g10-laptop-intel-i5-8gb-ram-256gb-ssd-15-6-fhd-win-11-pro',
    description: {
      overview: "HP 250 G10 Laptop (Intel i5, 8GB RAM, 256GB SSD) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch essential business notebook with a thin and light design, ideal for professionals on the go." },
      performance: { title: "Performance", processor: "Features an Intel Core i5 processor for solid, reliable performance.", memory: "8GB RAM provides sufficient power for daily tasks and multitasking.", storage: "256GB SSD ensures fast boot and load times." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (FHD) display for clear, crisp visuals.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet"], wireless: ["Wi-Fi 6", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Equipped with Windows 11 Pro for advanced security and business management.", connectivityOptions: "A full suite of ports allows for easy connection to projectors and monitors." }
    }
  },
  { 
    id: "8", 
    name: 'HP Elite x360 830 G11 Convertible 2-in-1', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/24.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elite-x360-830-g11-convertible-2-in-1',
    description: {
      overview: "HP Elite x360 830 G11 2-in-1 Laptop Overview",
      design: { title: "Design", formFactor: "A premium 2-in-1 convertible laptop with a 360-degree hinge, crafted from lightweight aluminum for ultimate mobility." },
      performance: { title: "Performance", processor: "Powered by the latest Intel Core Ultra processor for AI-accelerated performance.", memory: "Next-generation memory for seamless multitasking.", storage: "Fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "A bright 13.3 inch display with touch and pen support, adapting to your work style.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4 with USB-C", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "Four versatility modes (laptop, tent, stand, tablet) and AI-powered features like HP Presence for enhanced collaboration.", connectivityOptions: "Supports high-speed accessories and multiple displays via Thunderbolt." }
    }
  },
  { 
    id: "9", 
    name: 'HP EliteBook 1040 G11 14″ Business Laptop – Intel Core Ultra 7, 16GB RAM, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/13.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-1040-g11-14-business-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd',
    description: {
      overview: "HP EliteBook 1040 G11 14 inch Laptop Overview",
      design: { title: "Design", formFactor: "A premium, thin, and light 14 inch business laptop designed for high-performance mobile professionals." },
      performance: { title: "Performance", processor: "Features a powerful Intel Core Ultra 7 processor with AI capabilities.", memory: "16GB of high-speed RAM for demanding applications.", storage: "A spacious 512GB SSD for all your files and projects." },
      display: { title: "Display and Graphics", screen: "A 14 inch high-resolution display, optimized for clarity and brightness.", graphics: "Advanced Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Enhanced by AI, this laptop optimizes performance, audio, and video for hybrid work.", connectivityOptions: "Top-tier connectivity for docking and accessories." }
    }
  },
  { 
    id: "10", 
    name: 'HP EliteBook 640 G10 – i5, 16GB, 512GB SSD, Win 11 Pro (9Y6S0AT#ABU)', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/18.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-640-g10-i5-16gb-512gb-ssd-win-11-pro-9y6s0at-abu',
    description: {
      overview: "HP EliteBook 640 G10 (i5, 16GB, 512GB SSD) Overview",
      design: { title: "Design", formFactor: "A 14 inch mainstream business laptop that balances performance, durability, and portability for everyday productivity." },
      performance: { title: "Performance", processor: "Equipped with a 13th Gen Intel Core i5 processor.", memory: "16GB RAM for efficient and smooth multitasking.", storage: "A 512GB SSD provides ample and fast storage." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and includes HP Wolf Security for robust protection.", connectivityOptions: "A wide array of ports including Ethernet for stable wired connections." }
    }
  },
  { 
    id: "11", 
    name: 'HP EliteBook 640 G11 35.6 cm (14″) Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/5.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-640-g11-35-6-cm-14-notebook',
    description: {
      overview: "HP EliteBook 640 G11 14 inch Notebook Overview",
      design: { title: "Design", formFactor: "The latest generation 14 inch business laptop, engineered for performance and collaboration in a durable, portable chassis." },
      performance: { title: "Performance", processor: "Features new Intel Core Ultra processors for AI-enhanced productivity.", memory: "Fast DDR5 memory for responsive performance.", storage: "Speedy NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "A 14 inch display with narrow bezels for an excellent viewing experience.", graphics: "Next-generation integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "AI-powered collaboration tools and multi-layered security make this ideal for hybrid work.", connectivityOptions: "Connect to everything you need with modern and legacy ports." }
    }
  },
  { 
    id: "12", 
    name: 'HP EliteBook 640 G11 Laptop 16GB DDR5 RAM, and 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/14.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-640-g11-laptop-16gb-ddr5-ram-and-512gb-ssd',
    description: {
      overview: "HP EliteBook 640 G11 (16GB RAM, 512GB SSD) Overview",
      design: { title: "Design", formFactor: "A 14 inch business notebook built for performance, featuring a modern design and robust build quality." },
      performance: { title: "Performance", processor: "Powered by an Intel Core Ultra processor.", memory: "16GB of high-speed DDR5 RAM for demanding tasks.", storage: "A 512GB SSD offers plenty of fast storage." },
      display: { title: "Display and Graphics", screen: "14 inch display with crisp visuals.", graphics: "Integrated Intel Graphics for smooth performance." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This configuration is perfect for power users needing strong performance and ample storage.", connectivityOptions: "A comprehensive port selection for all your connection needs." }
    }
  },
  { 
    id: "13", 
    name: 'HP EliteBook 650 G10: Powerful Business Laptop with Intel i5, 16GB RAM, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/6.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-650-g10-powerful-business-laptop-with-intel-i5-16gb-ram-512gb-ssd',
    description: {
      overview: "HP EliteBook 650 G10 15.6 inch Laptop Overview",
      design: { title: "Design", formFactor: "A 15.6 inch business laptop that combines performance with enterprise-grade features and a numeric keypad for productivity." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core i5 processor.", memory: "16GB RAM for handling complex spreadsheets and multiple applications.", storage: "A 512GB SSD ensures fast boot times and data access." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display, providing a large workspace.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Ideal for finance and data-heavy roles thanks to its large screen and numeric keypad.", connectivityOptions: "Extensive connectivity including Thunderbolt for high-speed data transfer." }
    }
  },
  { 
    id: "14", 
    name: 'HP EliteBook 660 G11 16″ Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/14.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-660-g11-16-notebook',
    description: {
      overview: "HP EliteBook 660 G11 16 inch Notebook Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a 16:10 aspect ratio display, offering more vertical screen space in a slim package." },
      performance: { title: "Performance", processor: "Powered by an Intel Core Ultra processor for next-level AI performance.", memory: "DDR5 memory for high-speed responsiveness.", storage: "NVMe SSD for fast storage solutions." },
      display: { title: "Display and Graphics", screen: "A 16 inch display with a 16:10 aspect ratio, perfect for viewing more data.", graphics: "Advanced Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Designed for the modern professional, balancing a large screen with portability and performance.", connectivityOptions: "Future-proof ports for all your accessories." }
    }
  },
  { 
    id: "15", 
    name: 'HP EliteBook 660 G11: 16″, 16GB RAM, 512GB SSD, 13.86H Battery', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/15.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-660-g11-16-16gb-ram-512gb-ssd-13-86h-battery',
    description: {
      overview: "HP EliteBook 660 G11 (16GB, 512GB SSD) Overview",
      design: { title: "Design", formFactor: "This 16 inch laptop is built for productivity, featuring a large screen and an extended-life battery in a portable chassis." },
      performance: { title: "Performance", processor: "Features a power-efficient Intel Core Ultra processor.", memory: "16GB of high-speed RAM.", storage: "A roomy 512GB SSD for all your files.",},
      display: { title: "Display and Graphics", screen: "16 inch 16:10 display for an expansive workspace.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "All-day battery life and a large screen make this a perfect mobile office.", connectivityOptions: "Connect to displays, docks, and more with ease." }
    }
  },
  { 
    id: "16", 
    name: 'HP EliteBook 665 G11 Laptop – 16″ WUXGA Display, AMD Ryzen? 7 7735U, 16GB DDR5, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/11.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-665-g11-laptop-16-wuxga-display-amd-ryzen-7-7735u-16gb-ddr5-512gb-ssd',
    description: {
      overview: "HP EliteBook 665 G11 (AMD Ryzen 7) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop powered by AMD, offering a large WUXGA display for enhanced productivity." },
      performance: { title: "Performance", processor: "Features the powerful AMD Ryzen 7 7735U processor with integrated Radeon graphics.", memory: "16GB of DDR5 RAM for high-speed performance.", storage: "512GB SSD for fast boot and file access." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 aspect ratio display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "An excellent choice for users needing a large screen and the power of AMD processing.", connectivityOptions: "Full port selection for comprehensive connectivity." }
    }
  },
  { 
    id: "17", 
    name: 'HP EliteBook 840 14 G11 Laptop – Intel Core Ultra 5 125U, 16GB DDR5, 256GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/15.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-14-g11-laptop-intel-core-ultra-5-125u-16gb-ddr5-256gb-ssd',
    description: {
      overview: "HP EliteBook 840 G11 (Ultra 5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A premium 14 inch business laptop, thin and light, powered by next-gen Intel AI processors." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 125U processor for efficient, AI-accelerated performance.", memory: "16GB of DDR5 RAM.", storage: "A 256GB SSD for essential storage and speed." },
      display: { title: "Display and Graphics", screen: "14 inch display with high clarity and brightness.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Optimized for hybrid work with AI noise reduction and advanced security features.", connectivityOptions: "High-speed ports for modern accessories and docking." }
    }
  },
  { 
    id: "18", 
    name: 'HP EliteBook 840 G10: 14″ Business Laptop, i5-1335U, 16GB, 512GB SSD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/32.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g10-14-business-laptop-i5-1335u-16gb-512gb-ssd-win-11-pro',
    description: {
      overview: "HP EliteBook 840 G10 (i5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch premium business laptop, balancing portability and performance with a sleek, durable design." },
      performance: { title: "Performance", processor: "Powered by a 13th Gen Intel Core i5-1335U processor.", memory: "16GB RAM for seamless multitasking.", storage: "A 512GB SSD for ample, fast storage." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display for crisp visuals.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["2x Thunderbolt 4", "2x USB-A", "HDMI 2.1"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and is packed with security and collaboration tools for the modern professional.", connectivityOptions: "Excellent port selection for a thin and light device." }
    }
  },
  { 
    id: "19", 
    name: 'HP EliteBook 840 G10: Powerful Business Laptop (9M4C0AT#ABU)', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/19.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g10-powerful-business-laptop-9m4c0at-abu',
    description: {
      overview: "HP EliteBook 840 G10 Business Laptop Overview",
      design: { title: "Design", formFactor: "A specific model (9M4C0AT#ABU) of the premium 14 inch EliteBook 840 G10, designed for enterprise-level performance." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core processor.", memory: "Equipped with substantial RAM for heavy workloads.", storage: "Fast SSD storage for high-speed operations." },
      display: { title: "Display and Graphics", screen: "14 inch high-resolution display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This model is built for power users who need top-tier security and performance.", connectivityOptions: "Full docking capabilities via Thunderbolt." }
    }
  },
  { 
    id: "20", 
    name: 'HP EliteBook 840 G11 – 14″ Business Laptop, Intel Core Ultra 5, 8GB RAM, 256GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/12.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g11-14-business-laptop-intel-core-ultra-5-8gb-ram-256gb-ssd',
    description: {
      overview: "HP EliteBook 840 G11 (Ultra 5, 8GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A premium 14 inch business laptop featuring the latest Intel AI processor in a thin, light, and durable chassis." },
      performance: { title: "Performance", processor: "Powered by the efficient Intel Core Ultra 5 processor.", memory: "8GB of DDR5 RAM for standard business tasks.", storage: "A 256GB SSD for essential storage needs." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A configuration focused on core performance and AI features for hybrid work.", connectivityOptions: "High-speed ports for modern productivity." }
    }
  },
  { 
    id: "21", 
    name: 'HP EliteBook 840 G11 14″ Notebook – AI-Powered Performance for Hybrid Workforces', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/13.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g11-14-notebook-ai-powered-performance-for-hybrid-workforces',
    description: {
      overview: "HP EliteBook 840 G11 14 inch AI Laptop Overview",
      design: { title: "Design", formFactor: "The 14 inch EliteBook 840 G11, engineered specifically for AI-powered performance to enhance collaboration for hybrid workforces." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor with a dedicated NPU (Neural Processing Unit) for AI tasks.", memory: "High-speed DDR5 RAM.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch display, optimized for video conferencing.", graphics: "Advanced Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Uses AI to optimize power consumption, background blur, and noise cancellation.", connectivityOptions: "Full connectivity for a mobile, AI-first workflow." }
    }
  },
  { 
    id: "22", 
    name: 'HP EliteBook 840 G11 35.6 cm (14″) Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/12.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g11-35-6-cm-14-notebook',
    description: {
      overview: "HP EliteBook 840 G11 14 inch Notebook Overview",
      design: { title: "Design", formFactor: "A general model of the 14 inch (35.6 cm) HP EliteBook 840 G11, featuring a premium thin and light design." },
      performance: { title: "Performance", processor: "Powered by Intel Core Ultra processors.", memory: "Configurable with high-speed DDR5 memory.", storage: "Configurable with fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "14 inch display with multiple panel options, including touch and privacy screens.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "A highly secure and manageable laptop for enterprise deployment.", connectivityOptions: "Supports modern docking and peripheral connections." }
    }
  },
  { 
    id: "23", 
    name: 'HP EliteBook 840 G11: 14″ Business Laptop, Intel Ultra 7, 16GB RAM, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/13.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g11-14-business-laptop-intel-ultra-7-16gb-ram-512gb-ssd',
    description: {
      overview: "HP EliteBook 840 G11 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A high-performance 14 inch business laptop from the premium EliteBook 800 series." },
      performance: { title: "Performance", processor: "Features the powerful Intel Core Ultra 7 processor for demanding AI and business tasks.", memory: "16GB of DDR5 RAM.", storage: "A spacious 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics for enhanced visual performance." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This powerful configuration is built for mobile power users and executives.", connectivityOptions: "Connect to 4K displays and high-speed storage via Thunderbolt." }
    }
  },
  { 
    id: "24", 
    name: 'HP EliteBook 840 G11: Power & Security for Business – 9G176ET#ABU', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/12.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-840-g11-power-security-for-business-9g176et-abu',
    description: {
      overview: "HP EliteBook 840 G11 (9G176ET#ABU) Overview",
      design: { title: "Design", formFactor: "A specific enterprise model of the 14 inch EliteBook 840 G11, focusing on power and security." },
      performance: { title: "Performance", processor: "Equipped with an Intel Core Ultra processor.", memory: "Ample DDR5 RAM for enterprise applications.", storage: "Fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "14 inch display with optional privacy screen to protect sensitive data.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Combines AI performance with HP Wolf Security for Business for a secure, powerful mobile experience.", connectivityOptions: "Supports advanced docking solutions." }
    }
  },
  { 
    id: "25", 
    name: 'HP EliteBook 860 G11 40.6 cm (16″) Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/12.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-860-g11-40-6-cm-16-notebook',
    description: {
      overview: "HP EliteBook 860 G11 16 inch Notebook Overview",
      design: { title: "Design", formFactor: "A premium 16 inch business laptop with a 16:10 display, offering a large screen for productivity in a thin and light design." },
      performance: { title: "Performance", processor: "Features the latest Intel Core Ultra processors for AI-powered performance.", memory: "Configurable with high-speed DDR5 memory.", storage: "Configurable with fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "A 16 inch 16:10 aspect ratio display for an expansive workspace.", graphics: "Advanced Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "Ideal for users who need a larger display without sacrificing portability and security.", connectivityOptions: "Full range of ports for a complete mobile workstation." }
    }
  },
  { 
    id: "26", 
    name: 'HP EliteBook Ultra G1i 35.6 cm (14″) Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/26.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-ultra-g1i-35-6-cm-14-notebook',
    description: {
      overview: "HP EliteBook Ultra G1i 14 inch Notebook Overview",
      design: { title: "Design", formFactor: "An ultra-premium, exceptionally thin and light 14 inch laptop, part of the new AI-powered EliteBook lineup." },
      performance: { title: "Performance", processor: "Powered by an Intel Core Ultra processor.", memory: "High-performance memory.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A stunning 14 inch display, likely with high resolution and brightness.", graphics: "Integrated Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "The pinnacle of the EliteBook line, offering maximum portability and AI features.", connectivityOptions: "Focused on high-speed wireless and Thunderbolt connectivity." }
    }
  },
  { 
    id: "27", 
    name: 'HP EliteBook Ultra G1i 35.6 cm (14″) Touchscreen Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/27.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-ultra-g1i-35-6-cm-14-touchscreen-notebook',
    description: {
      overview: "HP EliteBook Ultra G1i 14 inch Touchscreen Notebook Overview",
      design: { title: "Design", formFactor: "This model of the EliteBook Ultra G1i adds a responsive touchscreen to its ultra-thin and light chassis." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor for AI-driven performance.", memory: "High-speed RAM for fluid touch interaction.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A 14 inch (35.6 cm) touchscreen display for intuitive navigation and creativity.", graphics: "Integrated Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Combines the portability of the Ultra with the interactivity of a touchscreen.", connectivityOptions: "Streamlined ports for a sleek profile." }
    }
  },
  { 
    id: "28", 
    name: 'HP EliteBook Ultra G1q 35.6 cm (14″) Touchscreen Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/28.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-ultra-g1q-35-6-cm-14-touchscreen-notebook',
    description: {
      overview: "HP EliteBook Ultra G1q 14 inch Touchscreen Notebook Overview",
      design: { title: "Design", formFactor: "An ultra-premium 14 inch business laptop featuring a touchscreen and powered by a Qualcomm Snapdragon processor." },
      performance: { title: "Performance", processor: "Powered by a Snapdragon X Elite processor for extreme efficiency and instant-on performance.", memory: "16GB or 32GB of high-speed memory.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch (35.6 cm) touchscreen display.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C"], wireless: ["Wi-Fi 7", "Bluetooth 5.4", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "A Copilot+ PC designed for multi-day battery life, on-device AI, and elite portability.", connectivityOptions: "Next-generation wireless connectivity." }
    }
  },
  { 
    id: "29", 
    name: 'HP EliteBook Ultra G1q8 35.6 cm (14″) Notebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/29.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-ultra-g1q8-35-6-cm-14-notebook',
    description: {
      overview: "HP EliteBook Ultra G1q8 14 inch Notebook Overview",
      design: { title: "Design", formFactor: "A 14 inch (35.6 cm) ultra-thin laptop powered by Snapdragon, built for professionals needing extreme battery life." },
      performance: { title: "Performance", processor: "Features a Snapdragon X Elite processor for AI performance and efficiency.", memory: "High-speed unified memory.", storage: "Fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "A 14 inch non-touch display, optimized for battery life and clarity.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "This Copilot+ PC redefines mobile computing with unparalleled battery life and on-device AI processing.", connectivityOptions: "Focused on wireless connectivity for the modern worker." }
    }
  },
  { 
    id: "30", 
    name: 'HP EliteBook X Flip G1i Next Gen AI PC: Power Your Business with AI-Driven Performance', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/33.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-x-flip-g1i-next-gen-ai-pc-power-your-business-with-ai-driven-performance',
    description: {
      overview: "HP EliteBook X Flip G1i AI PC Overview",
      design: { title: "Design", formFactor: "A next-generation 2-in-1 convertible AI PC, designed to be exceptionally thin, light, and versatility." },
      performance: { title: "Performance", processor: "Powered by Intel Core Ultra processors with dedicated AI acceleration.", memory: "High-speed memory for fluid performance.", storage: "Fast SSD." },
      display: { title: "Display and Graphics", screen: "A premium touchscreen display that flips 360 degrees.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Combines 2-in-1 flexibility with powerful on-device AI for smarter, faster business operations.", connectivityOptions: "Streamlined, high-speed ports." }
    }
  },
  { 
    id: "31", 
    name: 'HP EliteBook X G1i Next Gen AI PC: Power, Efficiency, and AI-Driven Performance for Modern Business', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/30.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-elitebook-x-g1i-next-gen-ai-pc-power-efficiency-and-ai-driven-performance-for-modern-business',
    description: {
      overview: "HP EliteBook X G1i AI PC Overview",
      design: { title: "Design", formFactor: "A traditional clamshell laptop from the next-gen AI PC lineup, focusing on power, efficiency, and a slim profile." },
      performance: { title: "Performance", processor: "Features Intel Core Ultra processors for AI-driven performance in a business-class device.", memory: "High-speed memory.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A premium display with high clarity and brightness.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Delivers a potent combination of AI power and efficiency for modern business needs.", connectivityOptions: "Modern, high-speed connectivity." }
    }
  },
  { 
    id: "32", 
    name: 'HP Pro x360 435 G10: 13.3″ 2-in-1 Laptop, Ryzen 5, 16GB RAM, 512GB SSD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/34.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-pro-x360-435-g10-13-3-2-in-1-laptop-ryzen-5-16gb-ram-512gb-ssd-win-11-pro',
    description: {
      overview: "HP Pro x360 435 G10 2-in-1 Laptop Overview",
      design: { title: "Design", formFactor: "A versatility 13.3 inch 2-in-1 convertible laptop, offering flexibility for business and education with a 360-degree hinge." },
      performance: { title: "Performance", processor: "Powered by an AMD Ryzen 5 processor for strong multi-core performance.", memory: "16GB RAM for smooth multitasking.", storage: "A spacious 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch touchscreen display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and adapts to any task, from laptop to tablet mode.", connectivityOptions: "Flexible port selection for everyday use." }
    }
  },
  { 
    id: "33", 
    name: 'HP ProBook 440 G10: 14″ Business Laptop, i5 13th Gen, 8GB RAM, 256GB SSD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-440-g10-14-business-laptop-i5-13th-gen-8gb-ram-256gb-ssd-win-11-pro',
    description: {
      overview: "HP ProBook 440 G10 (i5, 8GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop with a durable chassis, designed for reliable performance in small to medium businesses." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core i5 processor.", memory: "8GB RAM for essential business productivity.", storage: "A fast 256GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Comes with Windows 11 Pro and a suite of security features for growing businesses.", connectivityOptions: "Includes an Ethernet port for reliable office connectivity." }
    }
  },
  { 
    id: "34", 
    name: 'HP ProBook 440 G10: 14″ Business Laptop, i5-1334U, 16GB RAM, 256GB SSD, Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/8.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-440-g10-14-business-laptop-i5-1334u-16gb-ram-256gb-ssd-win-11-pro',
    description: {
      overview: "HP ProBook 440 G10 (i5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop that offers a step-up in performance with more RAM." },
      performance: { title: "Performance", processor: "Powered by the efficient Intel Core i5-1334U processor.", memory: "16GB RAM to handle more demanding applications and multitasking.", storage: "A 256GB SSD for quick boot and app loads." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD anti-glare display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Windows 11 Pro and 16GB of RAM make this a solid performer for business power users.", connectivityOptions: "A full range of ports for docking and peripherals." }
    }
  },
  { 
    id: "35", 
    name: 'HP ProBook 440 G11: 14″ Business Laptop with Intel Ultra 5, 16GB RAM, 256GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/12.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-440-g11-14-business-laptop-with-intel-ultra-5-16gb-ram-256gb-ssd',
    description: {
      overview: "HP ProBook 440 G11 (Ultra 5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "The next generation 14 inch ProBook, now with AI-accelerated performance in a durable, business-ready design." },
      performance: { title: "Performance", processor: "Features the new Intel Core Ultra 5 processor.", memory: "16GB of fast DDR5 RAM.", storage: "A 256GB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Brings AI-enhanced features like background blur and noise reduction to the mainstream ProBook line.", connectivityOptions: "Full connectivity for a productive work environment." }
    }
  },
  { 
    id: "36", 
    name: 'HP ProBook 450 G10 15.6″ Notebook – Intel Core i5-1334U, 16GB RAM, 256GB SSD, Windows 11 Pro – Pike Silver', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/8.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-450-g10-15-6-notebook-intel-core-i5-1334u-16gb-ram-256gb-ssd-windows-11-pro-pike-silver',
    description: {
      overview: "HP ProBook 450 G10 15.6 inch Laptop (Pike Silver) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch business notebook in a stylish Pike Silver finish, featuring a large display and numeric keypad." },
      performance: { title: "Performance", processor: "Equipped with an Intel Core i5-1334U processor.", memory: "16GB RAM for robust multitasking.", storage: "A 256GB SSD for fast operations." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "An ideal desktop replacement with Windows 11 Pro, perfect for office or hybrid work.", connectivityOptions: "Comprehensive port selection for all business needs." }
    }
  },
  { 
    id: "37", 
    name: 'HP ProBook 450 G10: 15.6″ FHD Business Laptop with Intel i5, 8GB RAM, 256GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/7.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-450-g10-15-6-fhd-business-laptop-with-intel-i5-8gb-ram-256gb-ssd',
    description: {
      overview: "HP ProBook 450 G10 (i5, 8GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch business laptop offering a large screen and essential performance for growing businesses." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core i5 processor.", memory: "8GB RAM for everyday multitasking.", storage: "A 256GB SSD for fast boot-up." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (FHD) display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A solid, reliable laptop for core business functions, featuring a numeric keypad.", connectivityOptions: "Includes both modern and legacy ports for wide compatibility." }
    }
  },
  { 
    id: "38", 
    name: 'HP ProBook 455 G10 39.6 cm (15.6″) Notebook (9Y6R9AT#ABU)', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-455-g10-39-6-cm-15-6-notebook-9y6r9at-abu',
    description: {
      overview: "HP ProBook 455 G10 15.6 inch Notebook (AMD) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch (39.6 cm) business notebook powered by AMD, offering reliable performance and a durable build." },
      performance: { title: "Performance", processor: "Features an AMD Ryzen processor for efficient multitasking and strong graphics performance.", memory: "Configured with business-ready RAM.", storage: "Fast SSD storage." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A great choice for users who prefer an AMD platform for business applications.", connectivityOptions: "Full suite of ports for office productivity." }
    }
  },
  { 
    id: "39", 
    name: 'HP ProBook 460 G11 Laptop – 16″ WUXGA Display, Intel Core Ultra 5, 16GB DDR5, 256GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/10.png', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-probook-460-g11-laptop-16-wuxga-display-intel-core-ultra-5-16gb-ddr5-256gb-ssd',
    description: {
      overview: "HP ProBook 460 G11 16 inch Laptop Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a 16:10 WUXGA display, bringing AI-powered features to the ProBook series." },
      performance: { title: "Performance", processor: "Powered by the new Intel Core Ultra 5 processor.", memory: "16GB of high-speed DDR5 RAM.", storage: "A 256GB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "Large 16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Offers a large screen and AI-enhanced collaboration tools for a productive workday.", connectivityOptions: "Comprehensive ports for all peripherals." }
    }
  },
  { 
    id: "40", 
    name: 'HP ZBook Firefly G11 14″ Mobile Workstation (A3ZD3ET#ABU)', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/36.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-firefly-g11-14-mobile-workstation-a3zd3et-abu',
    description: {
      overview: "HP ZBook Firefly G11 14 inch Mobile Workstation Overview",
      design: { title: "Design", formFactor: "HPs thinnest and lightest 14 inch ZBook, blending pro-level performance with true mobility in a premium chassis." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor for high performance and AI tasks.", memory: "Fast, integrated memory.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch display, with options for high-resolution and DreamColor panels.", graphics: "Optional discrete NVIDIA RTX graphics for pro apps." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A true mobile workstation for users who need certified performance for apps like AutoCAD and SolidWorks on the go.", connectivityOptions: "High-speed ports for demanding workflows." }
    }
  },
  { 
    id: "41", 
    name: 'HP ZBook Firefly G11 16″ Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/38.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-firefly-g11-16-mobile-workstation',
    description: {
      overview: "HP ZBook Firefly G11 16 inch Mobile Workstation Overview",
      design: { title: "Design", formFactor: "A 16 inch version of the Firefly, offering a larger 16:10 display for creative and technical professionals." },
      performance: { title: "Performance", processor: "Powered by Intel Core Ultra processors.", memory: "Configurable with ample RAM for large projects.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A 16 inch 16:10 display, providing more vertical space for timelines and models.", graphics: "Optional discrete NVIDIA RTX A-series graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Balances a large screen with a thin and light design for pro-level performance anywhere.", connectivityOptions: "Connect to high-resolution displays and fast storage." }
    }
  },
  { 
    id: "42", 
    name: 'HP ZBook Firefly G11 40.6 cm (16″) Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/38.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-firefly-g11-40-6-cm-16-mobile-workstation',
    description: {
      overview: "HP ZBook Firefly G11 16 inch (40.6 cm) Mobile Workstation Overview",
      design: { title: "Design", formFactor: "The 16 inch (40.6 cm) ZBook Firefly, engineered for mobile professionals who need a large, color-accurate display." },
      performance: { title: "Performance", processor: "Features Intel Core Ultra H-series processors.", memory: "High-speed memory configuration.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 display, with optional DreamColor for color-critical work.", graphics: "Optional NVIDIA RTX A-series graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A sleek and powerful workstation for 2D and 3D workflows, certified for pro applications.", connectivityOptions: "Supports multiple 4K displays." }
    }
  },
  { 
    id: "43", 
    name: 'HP ZBook Firefly G11: 14″ Workstation, Ultra 7, 16GB, 1TB SSD, RTX A500', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/36.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-firefly-g11-14-workstation-ultra-7-16gb-1tb-ssd-rtx-a500',
    description: {
      overview: "HP ZBook Firefly G11 (Ultra 7, 16GB, 1TB, RTX A500) Overview",
      design: { title: "Design", formFactor: "A high-performance 14 inch mobile workstation, impressively thin and light." },
      performance: { title: "Performance", processor: "Features the powerful Intel Core Ultra 7 processor.", memory: "16GB RAM for pro applications.", storage: "A very large 1TB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch high-resolution display.", graphics: "Discrete NVIDIA RTX A500 professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This build is perfect for 3D modeling, CAD, and data analysis on the move.", connectivityOptions: "High-speed ports to power your creative workflow." }
    }
  },
  { 
    id: "44", 
    name: 'HP ZBook Fury G11 16″ Mobile Workstation – Ultimate Power for Professionals | 32GB RAM, 1TB SSD, Intel i7-14700HX, RTX 2000 Ada', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/35.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-fury-g11-16-mobile-workstation-ultimate-power-for-professionals-32gb-ram-1tb-ssd-intel-i7-14700hx-rtx-2000-ada',
    description: {
      overview: "HP ZBook Fury G11 (i7-14700HX, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation offering desktop-caliber performance in a portable form factor for ultimate professional power." },
      performance: { title: "Performance", processor: "Desktop-class Intel Core i7-14700HX processor.", memory: "32GB of high-performance RAM (upgradable).", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch high-resolution display.", graphics: "NVIDIA RTX 2000 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "Mini DisplayPort", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Built for data science, 3D rendering, and machine learning. A true desktop replacement.", connectivityOptions: "Massive port selection for complex setups." }
    }
  },
  { 
    id: "45", 
    name: 'HP ZBook Fury G11 16″ Mobile Workstation – Ultimate Power for Professionals | Intel i9, NVIDIA RTX 2000, 32GB RAM, 1TB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/40.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-fury-g11-16-mobile-workstation-ultimate-power-for-professionals-intel-i9-nvidia-rtx-2000-32gb-ram-1tb-ssd',
    description: {
      overview: "HP ZBook Fury G11 (i9, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "The ultimate 16 inch mobile workstation, configured for maximum performance." },
      performance: { title: "Performance", processor: "Features a top-of-the-line Intel Core i9 processor.", memory: "32GB of high-speed RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch display, likely a 4K or high-refresh panel.", graphics: "NVIDIA RTX 2000 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "Mini DisplayPort", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This machine is designed for the most demanding professional workflows without compromise.", connectivityOptions: "Unmatched connectivity for any scenario." }
    }
  },
  { 
    id: "46", 
    name: 'HP ZBook Fury G11 16″ Mobile Workstation ? Ultimate On-the-Go Power for Professionals', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/35.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-fury-g11-16-mobile-workstation-ultimate-on-the-go-power-for-professionals',
    description: {
      overview: "HP ZBook Fury G11 16 inch Mobile Workstation Overview",
      design: { title: "Design", formFactor: "The ZBook Fury G11 brings desktop-level power to a portable 16 inch workstation, designed for professionals who need power on the go." },
      performance: { title: "Performance", processor: "Configurable with desktop-class Intel Core processors (i7/i9).", memory: "Up to 128GB of upgradable RAM.", storage: "Multiple NVMe SSD slots." },
      display: { title: "Display and Graphics", screen: "16 inch display with various panel options, including DreamColor.", graphics: "Configurable with high-end NVIDIA RTX Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "Mini DisplayPort", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "The ultimate on-the-go workstation for 3D design, visual effects, and data science.", connectivityOptions: "Desktop-level connectivity." }
    }
  },
  { 
    id: "47", 
    name: 'HP ZBook Power G11 16″ Mobile Workstation – Intel Core Ultra 7, 32GB RAM, WUXGA Display, Eyesafe, WiFi 6', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/41.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-power-g11-16-mobile-workstation-intel-core-ultra-7-32gb-ram-wuxga-display-eyesafe-wifi-6',
    description: {
      overview: "HP ZBook Power G11 (Ultra 7, 32GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation that provides accessible power for creative professionals and students." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "A substantial 32GB of RAM for large projects.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) Eyesafe display for comfort during long sessions.", graphics: "NVIDIA RTX professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A workhorse workstation with a large screen and pro-certified graphics.", connectivityOptions: "A full set of ports for a complete workstation setup." }
    }
  },
  { 
    id: "48", 
    name: 'HP ZBook Power G11 16″ Mobile Workstation – Intel Core Ultra 9, 32GB RAM, WUXGA Display, Eyesafe, Webcam', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/41.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-power-g11-16-mobile-workstation-intel-core-ultra-9-32gb-ram-wuxga-display-eyesafe-webcam',
    description: {
      overview: "HP ZBook Power G11 (Ultra 9, 32GB) Overview",
      design: { title: "Design", formFactor: "A high-performance 16 inch mobile workstation configured for demanding users." },
      performance: { title: "Performance", processor: "Top-tier Intel Core Ultra 9 processor.", memory: "32GB of high-speed RAM.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) Eyesafe display with an integrated webcam.", graphics: "Powerful NVIDIA RTX professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This build is aimed at professionals running complex simulations, renderings, or data models.", connectivityOptions: "Robust connectivity for any workflow." }
    }
  },
  { 
    id: "49", 
    name: 'HP ZBook Power G11 16″ Mobile Workstation – Intel Ultra 9, 32GB RAM, 1TB SSD, RTX 3000 Ada, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/41.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-power-g11-16-mobile-workstation-intel-ultra-9-32gb-ram-1tb-ssd-rtx-3000-ada-windows-11-pro',
    description: {
      overview: "HP ZBook Power G11 (Ultra 9, 32GB, 1TB, RTX 3000) Overview",
      design: { title: "Design", formFactor: "A top-end configuration of the 16 inch ZBook Power, built for extreme performance." },
      performance: { title: "Performance", processor: "Powerful Intel Core Ultra 9 processor.", memory: "32GB of RAM.", storage: "A massive 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch high-resolution display.", graphics: "High-end NVIDIA RTX 3000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Ready for VR development, 8K video editing, and complex 3D rendering.", connectivityOptions: "Full-featured ports for a high-bandwidth setup." }
    }
  },
  { 
    id: "50", 
    name: 'HP ZBook Power G11 40.6 cm (16″) Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/41.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-power-g11-40-6-cm-16-mobile-workstation',
    description: {
      overview: "HP ZBook Power G11 16 inch (40.6 cm) Mobile Workstation Overview",
      design: { title: "Design", formFactor: "The 16 inch ZBook Power G11 provides accessible workstation performance with a large screen and ISV certifications." },
      performance: { title: "Performance", processor: "Configurable with Intel Core Ultra processors.", memory: "Upgradable memory.", storage: "NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 aspect ratio display.", graphics: "Configurable with NVIDIA RTX Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A durable and powerful workstation for technical students and professionals.", connectivityOptions: "All the ports needed for a productive desk setup." }
    }
  },
  { 
    id: "51", 
    name: 'HP ZBook Power G11: Ultra 7, 32GB, 1TB SSD, RTX A1000', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/41.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-power-g11-ultra-7-32gb-1tb-ssd-rtx-a1000',
    description: {
      overview: "HP ZBook Power G11 (Ultra 7, 32GB, 1TB, RTX A1000) Overview",
      design: { title: "Design", formFactor: "A well-balanced 16 inch mobile workstation for creative and technical professionals." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM for large projects.", storage: "A fast 1TB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch high-resolution display.", graphics: "NVIDIA RTX A1000 professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A strong configuration for 3D modeling, advanced video editing, and data visualization.", connectivityOptions: "Full port selection for a complete workstation." }
    }
  },
  { 
    id: "52", 
    name: 'HP ZBook Studio G11 16″ Mobile Workstation – Intel Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 2000 Ada', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/42.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-studio-g11-16-mobile-workstation-intel-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-2000-ada',
    description: {
      overview: "HP ZBook Studio G11 (Ultra 7, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation that combines a sleek, thin design with serious creative power." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of integrated high-speed RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 display, with options for OLED and DreamColor.", graphics: "NVIDIA RTX 2000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-C", "USB-A"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A premium machine for creative professionals who need performance and portability.", connectivityOptions: "Streamlined ports for a modern, sleek profile." }
    }
  },
  { 
    id: "53", 
    name: 'HP ZBook Studio G11 40.6 cm (16″) Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/42.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-studio-g11-40-6-cm-16-mobile-workstation',
    description: {
      overview: "HP ZBook Studio G11 16 inch (40.6 cm) Mobile Workstation Overview",
      design: { title: "Design", formFactor: "The 16 inch (40.6 cm) ZBook Studio G11, blending a sleek creative-focused design with professional workstation power." },
      performance: { title: "Performance", processor: "Configurable with Intel Core Ultra processors.", memory: "High-speed memory for creative workflows.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A 16 inch 16:10 display with options for touch, OLED, and DreamColor.", graphics: "Configurable with NVIDIA RTX Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-C", "USB-A"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Designed for architects, designers, and video editors needing power in a thin chassis.", connectivityOptions: "High-speed ports for creative peripherals." }
    }
  },
  { 
    id: "54", 
    name: 'HP ZBook Studio G11 40.6 cm (16″) Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/42.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'hp-zbook-studio-g11-40-6-cm-16-mobile-workstation-2',
    description: {
      overview: "HP ZBook Studio G11 16 inch (40.6 cm) Mobile Workstation Overview",
      design: { title: "Design", formFactor: "This 16 inch (40.6 cm) ZBook Studio G11 delivers pro-grade performance in a stunning, thin, and light package." },
      performance: { title: "Performance", processor: "Features Intel Core Ultra H-series processors.", memory: "High-speed memory for demanding applications.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 aspect ratio display.", graphics: "Up to NVIDIA RTX 3000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-C", "USB-A"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A perfect blend of performance and portability for on-the-go creative professionals.", connectivityOptions: "Modern ports for a high-speed workflow." }
    }
  },
  { 
    id: "55", 
    name: 'K12 PB455G10 R5-7530U | Powerful Laptop for Education | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/43.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'k12-pb455g10-r5-7530u-powerful-laptop-for-education-amd',
    description: {
      overview: "HP ProBook 455 G10 (Ryzen 5 7530U) for Education Overview",
      design: { title: "Design", formFactor: "A 15.6 inch laptop part of the K12 education bundle, featuring a durable ProBook 455 G10." },
      performance: { title: "Performance", processor: "Powered by the efficient AMD Ryzen 5 7530U processor.", memory: "Sized for educational needs.", storage: "SSD storage for quick access to learning materials." },
      display: { title: "Display and Graphics", screen: "15.6 inch display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A reliable and affordable laptop solution packaged for the education sector.", connectivityOptions: "Full ports for classroom and remote learning." }
    }
  },
  { 
    id: "56", 
    name: 'PB445G10 R5-7530U | High Performance Laptop | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'pb445g10-r5-7530u-high-performance-laptop-amd',
    description: {
      overview: "HP ProBook 445 G10 (Ryzen 5 7530U) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop featuring AMD power, designed for performance and reliability." },
      performance: { title: "Performance", processor: "Equipped with the AMD Ryzen 5 7530U processor.", memory: "Configurable RAM for business needs.", storage: "Fast SSD storage." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A high-performance AMD-based laptop for business professionals.", connectivityOptions: "Comprehensive port selection for office use." }
    }
  },
  { 
    id: "57", 
    name: 'ZBPG11A R7-8845HS | High Performance Computer Hardware | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/44.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'zbpg11a-r7-8845hs-high-performance-computer-hardware-amd',
    description: {
      overview: "HP ZBook Power G11 AMD (Ryzen 7 8845HS) Overview",
      design: { title: "Design", formFactor: "The 16 inch ZBook Power G11, now featuring a high-performance AMD Ryzen processor." },
      performance: { title: "Performance", processor: "Features the powerful AMD Ryzen 7 8845HS processor.", memory: "High-speed DDR5 RAM.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Professional NVIDIA RTX graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Brings AMDs high-performance computing to the ZBook Power workstation line.", connectivityOptions: "Full workstation-class connectivity." }
    }
  },
  { 
    id: "58", 
    name: 'ZFLY14G11A R7-8840HS | High Performance Computer Processor | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/hp2/1.jpg', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops',
    slug: 'zfly14g11a-r7-8840hs-high-performance-computer-processor-amd',
    description: {
      overview: "HP ZBook Firefly G11 AMD (Ryzen 7 8840HS) Overview",
      design: { title: "Design", formFactor: "The thin and light 14 inch ZBook Firefly, equipped with a powerful AMD Ryzen AI processor." },
      performance: { title: "Performance", processor: "Features the high-performance AMD Ryzen 7 8840HS processor.", memory: "Fast, integrated memory.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA display.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A mobile workstation that delivers strong AMD performance and AI capabilities in a highly portable chassis.", connectivityOptions: "Modern ports for a creative workflow." }
    }
  },
  
  { 
    id: "59", 
    name: 'Dell – Latitude 5540 – 15.6″ – Intel Core i5 1345U – YRYYW', 
    price: "Get a Quote", 
    image: '/computerandlaptops/dell/dell3.jpg', 
    category: 'Laptops, Dell', 
    categorySlug: 'computers-and-laptops',
    slug: 'dell-latitude-5540-15-6-intel-core-i5-1345u-yryyw',
    description: {
      overview: "Dell Latitude 5540 15.6 inch (i5-1345U) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch mainstream business laptop from Dells Latitude 5000 series, built with sustainable materials." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core i5-1345U processor with vPro.", memory: "Fast DDR4 or DDR5 RAM.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A reliable and scalable business laptop with advanced security and management features.", connectivityOptions: "Comprehensive ports for docking and legacy devices." }
    }
  },
  { 
    id: "60", 
    name: 'Dell – Latitude 5540 – 15.6″ – Intel Core i7 1365U – TPJJ4', 
    price: "Get a Quote", 
    image: '/computerandlaptops/dell/dell3.jpg', 
    category: 'Laptops, Dell', 
    categorySlug: 'computers-and-laptops',
    slug: 'dell-latitude-5540-15-6-intel-core-i7-1365u-tpjj4',
    description: {
      overview: "Dell Latitude 5540 15.6 inch (i7-1365U) Overview",
      design: { title: "Design", formFactor: "A high-performance 15.6 inch business laptop from the Latitude 5000 series, model TPJJ4." },
      performance: { title: "Performance", processor: "Powered by a 13th Gen Intel Core i7-1365U processor with vPro for demanding tasks.", memory: "Ample RAM for power users.", storage: "Fast NVMe SSD." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display, with options for touch.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3", "Optional 4G/5G"] },
      functionality: { title: "Functionality", versatility: "A top-tier configuration for users who need maximum performance and manageability.", connectivityOptions: "Extensive connectivity for any office environment." }
    }
  },
  { 
    id: "61", 
    name: 'Dell 15.6″ Latitude 5540 Notebook – X3VH2', 
    price: "Get a Quote", 
    image: '/computerandlaptops/dell/dell4.jpg', 
    category: 'Laptops, Dell', 
    categorySlug: 'computers-and-laptops',
    slug: 'dell-15-6-latitude-5540-notebook-x3vh2',
    description: {
      overview: "Dell 15.6 inch Latitude 5540 Notebook (X3VH2) Overview",
      design: { title: "Design", formFactor: "This 15.6 inch Latitude 5540 model (X3VH2) is a reliable and secure business laptop built for everyday productivity." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core processor.", memory: "Configured with fast memory for multitasking.", storage: "NVMe SSD for quick response times." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Intelligent Audio, ExpressConnect, and advanced security make this a smart choice for any business.", connectivityOptions: "A full array of ports for easy connections." }
    }
  },
  { 
    id: "62", 
    name: 'Lenovo 100e Chromebook Gen 4 82W00003UK 29.5 cm (11.6″) Chromebook', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l1.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-100e-chromebook-gen-4-82w00003uk-29-5-cm-11-6-chromebook',
    description: {
      overview: "Lenovo 100e Chromebook Gen 4 (11.6 inch) Overview",
      design: { title: "Design", formFactor: "A rugged 11.6 inch (29.5 cm) Chromebook built to withstand the rigors of the classroom, with a spill-resistant keyboard." },
      performance: { title: "Performance", processor: "An efficient processor designed for ChromeOS.", memory: "4GB or 8GB of RAM for educational apps.", storage: "32GB or 64GB eMMC flash storage." },
      display: { title: "Display and Graphics", screen: "11.6 inch HD anti-glare display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "MicroSD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "A lightweight, durable, and affordable laptop perfect for students and educators.", connectivityOptions: "versatility ports for classroom projectors and accessories." }
    }
  },
  { 
    id: "63", 
    name: 'Lenovo 14″ Privacy Screen Filter ? Blue Light Reduction, Nano Technology, Heat & Humidity Resistant', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-14-privacy-screen-filter-blue-light-reduction-nano-technology-heat-humidity-resistant',
    description: {
      overview: "Lenovo 14 inch Privacy Screen Filter Overview",
      design: { title: "Design", formFactor: "A 14 inch privacy filter that attaches to your laptop screen to prevent visual hacking." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Fits 14 inch laptop displays, blacks out the screen from side angles.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Reduces blue light, is anti-glare, and resistant to heat and humidity. Uses nano-louvre technology.", connectivityOptions: "Easy to attach and remove." }
    }
  },
  { 
    id: "64", 
    name: 'Lenovo 14″ Privacy Screen Filter (16:10) for X1 Yoga Gen6 ? Anti-Glare, Blue Light Reduction, 3M Nanolouvre Tech', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/4.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-14-privacy-screen-filter-16-10-for-x1-yoga-gen6-anti-glare-blue-light-reduction-3m-nanolouvre-tech',
    description: {
      overview: "Lenovo 14 inch (16:10) Privacy Filter for X1 Yoga Gen 6 Overview",
      design: { title: "Design", formFactor: "A custom-fit 14 inch 16:10 privacy filter designed specifically for the ThinkPad X1 Yoga Gen 6." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Fits 14 inch 16:10 aspect ratio screens.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Protects sensitive information using 3M Nanolouvre technology. Also features anti-glare and blue light reduction.", connectivityOptions: "Designed to integrate perfectly with the X1 Yoga Gen 6." }
    }
  },
  { 
    id: "65", 
    name: 'Lenovo 14e Chromebook Gen 3 – 14″ Full HD – Intel N200 – 8GB RAM – 128GB Storage', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l4.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-14e-chromebook-gen-3-14-full-hd-intel-n200-8gb-ram-128gb-storage',
    description: {
      overview: "Lenovo 14e Chromebook Gen 3 (Intel N200, 8GB, 128GB) Overview",
      design: { title: "Design", formFactor: "A durable 14 inch Chromebook built for the demands of students and teachers, with a large Full HD display." },
      performance: { title: "Performance", processor: "Features an Intel N200 processor, optimized for ChromeOS.", memory: "8GB of RAM for multitasking with educational apps.", storage: "128GB of storage for offline files." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD (1920x1080) display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "MicroSD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "A powerful and reliable Chromebook for the modern classroom, offering a large screen and ample storage.", connectivityOptions: "Connect to displays and accessories with ease." }
    }
  },
  { 
    id: "66", 
    name: 'Lenovo 300w Yoga Gen 4 2-in-1 Convertible Laptop – 11.6″ Touchscreen, Intel N100, 8GB RAM, 128GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l5.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-300w-yoga-gen-4-2-in-1-convertible-laptop-11-6-touchscreen-intel-n100-8gb-ram-128gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo 300w Yoga Gen 4 11.6 inch 2-in-1 Overview",
      design: { title: "Design", formFactor: "A rugged 11.6 inch 2-in-1 convertible laptop with a 360-degree hinge, built for flexibility in the classroom." },
      performance: { title: "Performance", processor: "Powered by an Intel N100 processor.", memory: "8GB RAM for smooth performance.", storage: "A 128GB SSD, faster than traditional eMMC storage." },
      display: { title: "Display and Graphics", screen: "11.6 inch HD touchscreen display with durable glass.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "MicroSD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and features four flexible modes (laptop, tablet, tent, stand) for versatility learning.", connectivityOptions: "Full port selection for classroom use." }
    }
  },
  { 
    id: "67", 
    name: 'Lenovo 500e Yoga Chromebook Gen 4 ? 12.2″ WUXGA Touchscreen 2-in-1 Convertible, Intel N100, 8GB RAM, 64GB Flash, ChromeOS', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l6.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-500e-yoga-chromebook-gen-4-12-2-wuxga-touchscreen-2-in-1-convertible-intel-n100-8gb-ram-64gb-flash-chromeos',
    description: {
      overview: "Lenovo 500e Yoga Chromebook Gen 4 (12.2 inch) Overview",
      design: { title: "Design", formFactor: "A 12.2 inch 2-in-1 convertible Chromebook with a 360-degree hinge and rugged design for education." },
      performance: { title: "Performance", processor: "Features an Intel N100 processor.", memory: "8GB RAM for multitasking on ChromeOS.", storage: "64GB eMMC flash storage." },
      display: { title: "Display and Graphics", screen: "12.2 inch WUXGA (1920x1200) 16:10 touchscreen display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "MicroSD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "The 16:10 display offers more vertical space for browsing and document editing. Includes a garaged stylus.", connectivityOptions: "Modern ports for a simple, fast setup." }
    }
  },
  { 
    id: "68", 
    name: 'Lenovo Privacy Screen Filter – For 33.8 cm (13.3″) Widescreen LCD 2 in 1 Notebook – 16:10', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/8.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-privacy-screen-filter-for-33-8-cm-13-3-widescreen-lcd-2-in-1-notebook-16-10',
    description: {
      overview: "Lenovo 13.3 inch (16:10) Privacy Filter Overview",
      design: { title: "Design", formFactor: "A 13.3 inch (33.8 cm) privacy filter with a 16:10 aspect ratio, designed for 2-in-1 convertible notebooks." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Fits 13.3 inch 16:10 widescreen displays.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Protects your screen from side-angle viewing, perfect for working in public spaces.", connectivityOptions: "Easily attachable and removable." }
    }
  },
  { 
    id: "70", 
    name: 'Lenovo Tab K11 LTE (Enhanced Edition) – 11″ WUXGA Display, MediaTek G88, 4GB RAM, 128GB Storage, 4G LTE, Android 13 Tablet', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/5.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-tab-k11-lte-enhanced-edition-11-wuxga-display-mediatek-g88-4gb-ram-128gb-storage-4g-lte-android-13-tablet',
    description: {
      overview: "Lenovo Tab K11 LTE (4GB RAM) Tablet Overview",
      design: { title: "Design", formFactor: "A slim and durable 11 inch Android 13 tablet designed for both work and entertainment." },
      performance: { title: "Performance", processor: "Powered by a MediaTek Helio G88 octa-core processor.", memory: "4GB of RAM for smooth app performance.", storage: "128GB of internal storage." },
      display: { title: "Display and Graphics", screen: "11 inch WUXGA (1920x1200) display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "Audio jack", "MicroSD card slot"], wireless: ["4G LTE", "Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "An enhanced edition tablet with 4G LTE connectivity, allowing you to stay connected anywhere.", connectivityOptions: "Expandable storage and cellular data." }
    }
  },
  { 
    id: "71", 
    name: 'Lenovo Tab K11 LTE (Enhanced Edition) – 11″ WUXGA Display, MediaTek Helio G88, 4GB RAM, 128GB Storage', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/6.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-tab-k11-lte-enhanced-edition-11-wuxga-display-mediatek-helio-g88-4gb-ram-128gb-storage',
    description: {
      overview: "Lenovo Tab K11 LTE (4GB RAM, 128GB) Tablet Overview",
      design: { title: "Design", formFactor: "A versatility 11 inch tablet with a premium metal design, offering a WUXGA display for crisp visuals." },
      performance: { title: "Performance", processor: "Features the MediaTek Helio G88 processor.", memory: "4GB RAM for efficient multitasking.", storage: "128GB storage for apps and media." },
      display: { title: "Display and Graphics", screen: "11 inch WUXGA (1920x1200) display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "Audio jack", "MicroSD card slot"], wireless: ["4G LTE", "Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "This enhanced edition includes 4G LTE, making it a perfect mobile companion for work or play.", connectivityOptions: "Stay connected on the go with cellular data." }
    }
  },
  { 
    id: "72", 
    name: 'Lenovo Tab K11 LTE (Enhanced Edition) – 11″ WUXGA Display, MediaTek Helio G88, 8GB RAM, 128GB Storage', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/6.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-tab-k11-lte-enhanced-edition-11-wuxga-display-mediatek-helio-g88-8gb-ram-128gb-storage',
    description: {
      overview: "Lenovo Tab K11 LTE (8GB RAM) Tablet Overview",
      design: { title: "Design", formFactor: "A high-performance 11 inch tablet with a WUXGA display and a slim, durable build." },
      performance: { title: "Performance", processor: "Powered by the MediaTek Helio G88 processor.", memory: "8GB of RAM for superior multitasking and demanding apps.", storage: "128GB of storage." },
      display: { title: "Display and Graphics", screen: "11 inch WUXGA (1920x1200) display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "Audio jack", "MicroSD card slot"], wireless: ["4G LTE", "Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "This 8GB RAM model is ideal for power users who need a responsive tablet with 4G LTE connectivity.", connectivityOptions: "Ample memory and storage for any task." }
    }
  },
  { 
    id: "73", 
    name: 'Lenovo Tab M9 Tablet – 9″ HD Display, MediaTek Helio G80, 4GB RAM, 64GB Storage, Android 12, Arctic Gray', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/5.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-tab-m9-tablet-9-hd-display-mediatek-helio-g80-4gb-ram-64gb-storage-android-12-arctic-gray',
    description: {
      overview: "Lenovo Tab M9 (4GB, 64GB) Tablet Overview",
      design: { title: "Design", formFactor: "A compact and stylish 9 inch tablet in Arctic Gray, featuring a premium metal dual-tone design." },
      performance: { title: "Performance", processor: "Features the MediaTek Helio G80 octa-core processor for smooth browsing and streaming.", memory: "4GB RAM.", storage: "64GB storage, expandable via MicroSD." },
      display: { title: "Display and Graphics", screen: "9 inch HD (1340x800) display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "Audio jack", "MicroSD card slot"], wireless: ["Wi-Fi", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "A perfect portable entertainment tablet with dual speakers, long battery life, and Android 12.", connectivityOptions: "Expandable storage and a modern USB-C port." }
    }
  },
  { 
    id: "74", 
    name: 'Lenovo ThinkBook 14 G7 ARP – 14″ WUXGA Laptop with AMD R5-7535HS, 8GB RAM, 256GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-14-g7-arp-14-wuxga-laptop-with-amd-r5-7535hs-8gb-ram-256gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 14 G7 (AMD Ryzen 5, 8GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop combining a stylish, modern design with the power of AMD." },
      performance: { title: "Performance", processor: "Features the AMD Ryzen 5 7535HS processor.", memory: "8GB RAM for essential business tasks.", storage: "A 256GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and offers smart features for small and medium businesses.", connectivityOptions: "A 16:10 display and AMD power make this a productivity-focused machine." }
    }
  },
  { 
    id: "75", 
    name: 'Lenovo ThinkBook 14 G7 IML – 14″ WUXGA Laptop with Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-14-g7-iml-14-wuxga-laptop-with-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 14 G7 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop featuring the new Intel Core Ultra processors for AI-powered performance." },
      performance: { title: "Performance", processor: "High-performance Intel Core Ultra 7 processor.", memory: "16GB of high-speed RAM.", storage: "A spacious 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Brings AI acceleration and powerful performance to the ThinkBook line, running Windows 11 Pro.", connectivityOptions: "Advanced connectivity with Thunderbolt 4." }
    }
  },
  { 
    id: "76", 
    name: 'Lenovo ThinkBook 16 G6 ABP ? 16″ AMD Ryzen 5 Business Laptop | 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g6-abp-16-amd-ryzen-5-business-laptop-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16 G6 (AMD Ryzen 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a large 16:10 display, powered by AMD Ryzen for strong performance." },
      performance: { title: "Performance", processor: "Features an AMD Ryzen 5 processor.", memory: "16GB RAM for smooth multitasking.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Ideal for users who need a large screen and solid performance for business applications. Runs Windows 11 Pro.", connectivityOptions: "A full range of ports for desktop-like productivity." }
    }
  },
  { 
    id: "77", 
    name: 'Lenovo ThinkBook 16 G6 ABP Laptop | AMD Ryzen 7, 16GB RAM, 512GB SSD, 16″ WUXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/7.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g6-abp-laptop-amd-ryzen-7-16gb-ram-512gb-ssd-16-wuxga-display-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16 G6 (AMD Ryzen 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A high-performance 16 inch business laptop with a WUXGA 16:10 display and AMD power." },
      performance: { title: "Performance", processor: "Powered by the strong AMD Ryzen 7 processor.", memory: "16GB RAM for demanding applications.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A great choice for users needing extra performance from the Ryzen 7 chip. Runs Windows 11 Pro.", connectivityOptions: "Excellent connectivity for a productive workflow." }
    }
  },
  { 
    id: "78", 
    name: 'Lenovo ThinkBook 16 G6 IRL – 16-inch Laptop with Intel Core i5, 8GB RAM, 256GB SSD, and 1920×1200 Display', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g6-irl-16-inch-laptop-with-intel-core-i5-8gb-ram-256gb-ssd-and-1920x1200-display',
    description: {
      overview: "Lenovo ThinkBook 16 G6 (i5, 8GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop designed for productivity with a large 16:10 display." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core i5 processor.", memory: "8GB RAM for essential multitasking.", storage: "A 256GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Iris Xe Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A solid, large-screen laptop for business professionals needing essential performance.", connectivityOptions: "Includes Thunderbolt 4 for high-speed accessories." }
    }
  },
  { 
    id: "79", 
    name: 'Lenovo ThinkBook 16 G7 IML (21MS005GUK) 16″ WUXGA IPS Laptop ? Intel Core Ultra 5, 16GB RAM, 256GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g7-iml-21ms005guk-16-wuxga-ips-laptop-intel-core-ultra-5-16gb-ram-256gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16 G7 (Ultra 5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop powered by new Intel Core Ultra processors for AI-enhanced performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB of high-speed RAM.", storage: "A 256GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) IPS display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Brings AI features to a large-screen format, ideal for productivity. Runs Windows 11 Pro.", connectivityOptions: "Modern connectivity including Thunderbolt 4." }
    }
  },
  { 
    id: "80", 
    name: 'Lenovo ThinkBook 16 G7 IML 21MS0049UK – 16″ WUXGA, Intel Core Ultra 7, 16GB RAM, 512GB SSD, Intel Arc Graphics, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g7-iml-21ms0049uk-16-wuxga-intel-core-ultra-7-16gb-ram-512gb-ssd-intel-arc-graphics-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16 G7 (Ultra 7, 16GB, 512GB, Arc) Overview",
      design: { title: "Design", formFactor: "A high-performance 16 inch business laptop with a WUXGA display and advanced graphics." },
      performance: { title: "Performance", processor: "Features the powerful Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A spacious 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics for enhanced visual performance." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A great choice for users who need a large screen and extra graphics power for light creative work. Runs Windows 11 Pro.", connectivityOptions: "Full port selection with Thunderbolt 4." }
    }
  },
  { 
    id: "81", 
    name: 'Lenovo ThinkBook 16 G7 QOY 21NH0004UK – 16″ WUXGA Business Laptop with Qualcomm Snapdragon X1P, 16GB RAM, 512GB SSD, and Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/20.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16-g7-qoy-21nh0004uk-16-wuxga-business-laptop-with-qualcomm-snapdragon-x1p-16gb-ram-512gb-ssd-and-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16 G7 (Snapdragon, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop, part of the new Copilot+ PC lineup, powered by Snapdragon for extreme battery life." },
      performance: { title: "Performance", processor: "Features the Qualcomm Snapdragon X Plus processor (typo in name, likely X Plus).", memory: "16GB of high-speed unified RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "A Copilot+ PC with on-device AI and multi-day battery life. Runs Windows 11 Pro.", connectivityOptions: "Next-generation wireless capabilities." }
    }
  },
  { 
    id: "82", 
    name: 'Lenovo ThinkBook 16p G5 IRX 16″ Laptop – Intel Core i7 14th Gen, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 4060, WQXGA, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/17.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkbook-16p-g5-irx-16-laptop-intel-core-i7-14th-gen-32gb-ram-1tb-ssd-nvidia-geforce-rtx-4060-wqxga-windows-11-pro',
    description: {
      overview: "Lenovo ThinkBook 16p G5 (i7, 32GB, 1TB, RTX 4060) Overview",
      design: { title: "Design", formFactor: "A 16 inch high-performance laptop for creative professionals, blending power with a sleek design." },
      performance: { title: "Performance", processor: "A 14th Gen Intel Core i7 processor.", memory: "32GB of RAM for heavy creative workflows.", storage: "A massive 1TB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WQXGA (2560x1600) high-resolution display.", graphics: "NVIDIA GeForce RTX 4060 laptop GPU." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerhouse for video editing, 3D design, and content creation. Runs Windows 11 Pro.", connectivityOptions: "Extensive ports for creative peripherals." }
    }
  },
  { 
    id: "83", 
    name: 'Lenovo ThinkPad E14 Gen 6 21M7002DUK 14″ WUXGA Laptop – Intel Core Ultra 5, 16GB RAM, 256GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-e14-gen-6-21m7002duk-14-wuxga-laptop-intel-core-ultra-5-16gb-ram-256gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad E14 Gen 6 (Ultra 5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "The 14 inch ThinkPad E14, updated with new AI processors and retaining its classic durability." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 256GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Brings AI features, ThinkPad security, and reliability to small businesses. Runs Windows 11 Pro.", connectivityOptions: "Includes Thunderbolt 4 and Ethernet." }
    }
  },
  { 
    id: "84", 
    name: 'Lenovo ThinkPad E16 G1 Laptop ? 16″ WUXGA Display, 16GB DDR5 RAM, 512GB SSD, Powerful Business Performance', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-e16-g1-laptop-16-wuxga-display-16gb-ddr5-ram-512gb-ssd-powerful-business-performance',
    description: {
      overview: "ThinkPad E16 Gen 1 (16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a large 16:10 display and numeric keypad, built with ThinkPad reliability." },
      performance: { title: "Performance", processor: "Powered by 13th Gen Intel Core or AMD Ryzen 7000 Series processors.", memory: "16GB of DDR5 RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A powerful business performer with a large screen for improved productivity.", connectivityOptions: "Full port selection for office use." }
    }
  },
  { 
    id: "85", 
    name: 'Lenovo ThinkPad E16 Gen 2 (21MA001WUK) | 16″ WUXGA | Intel Core Ultra 5 | 16GB RAM | 256GB SSD | Win 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-e16-gen-2-21ma001wuk-16-wuxga-intel-core-ultra-5-16gb-ram-256gb-ssd-win-11-pro',
    description: {
      overview: "ThinkPad E16 Gen 2 (Ultra 5, 16GB, 256GB) Overview",
      design: { title: "Design", formFactor: "The 16 inch ThinkPad E-series, updated with new Intel Core Ultra processors for AI capabilities." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 256GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A large-screen business laptop with AI features and Windows 11 Pro.", connectivityOptions: "Modern connectivity including Thunderbolt 4." }
    }
  },
  { 
    id: "86", 
    name: 'Lenovo ThinkPad L13 CLAM G5 T | 512GB SSD | 16GB RAM |', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/5.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l13-clam-g5-t-512gb-ssd-16gb-ram',
    description: {
      overview: "ThinkPad L13 Gen 5 (16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 13.3 inch clamshell (traditional laptop) from the durable ThinkPad L series." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A portable, secure, and durable business laptop for mobile professionals.", connectivityOptions: "Excellent port selection for its size." }
    }
  },
  { 
    id: "87", 
    name: 'Lenovo ThinkPad L13 Gen 5 | 13.3″ WUXGA IPS Laptop | Intel Core Ultra 5 125U | 16GB RAM | 512GB SSD | Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l13-gen-5-13-3-wuxga-ips-laptop-intel-core-ultra-5-125u-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad L13 Gen 5 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 13.3 inch clamshell laptop from the sustainable and durable L series." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 125U processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) IPS display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A portable business laptop with AI features and Windows 11 Pro.", connectivityOptions: "Modern ports for hybrid work." }
    }
  },
  { 
    id: "88", 
    name: 'Lenovo ThinkPad L13 Gen 5 13.3″ 2-in-1 Laptop – Intel Core Ultra 7, 16GB RAM, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l13-gen-5-13-3-2-in-1-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd',
    description: {
      overview: "ThinkPad L13 Yoga Gen 5 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 13.3 inch 2-in-1 convertible laptop from the ThinkPad L series, offering 360-degree flexibility." },
      performance: { title: "Performance", processor: "Powered by the high-performance Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) touchscreen display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful and flexible 2-in-1 for professionals who need performance and versatility.", connectivityOptions: "Includes a garaged pen." }
    }
  },
  { 
    id: "89", 
    name: 'Lenovo ThinkPad L13 Gen 5 13.3″ Convertible 2-in-1 Laptop – Intel Core Ultra 5, 16GB RAM, 512GB SSD, Touchscreen, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/15.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l13-gen-5-13-3-convertible-2-in-1-laptop-intel-core-ultra-5-16gb-ram-512gb-ssd-touchscreen-windows-11-pro',
    description: {
      overview: "ThinkPad L13 Yoga Gen 5 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 13.3 inch convertible 2-in-1 laptop, blending the durability of the L series with 360-degree flexibility." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) touchscreen display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A versatility business tool with Windows 11 Pro, AI features, and four usage modes.", connectivityOptions: "Modern ports and garaged stylus." }
    }
  },
  { 
    id: "90", 
    name: 'Lenovo ThinkPad L14 G5 T ULTRA – 14″ WUXGA, 16GB RAM, 512GB SSD | Powerful Business Laptop', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l14-g5-t-ultra-14-wuxga-16gb-ram-512gb-ssd-powerful-business-laptop',
    description: {
      overview: "ThinkPad L14 Gen 5 (Ultra, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop from the durable and sustainable L series, now with Intel Ultra power." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful, secure, and durable business laptop with AI capabilities.", connectivityOptions: "Full port selection for office environments." }
    }
  },
  { 
    id: "91", 
    name: 'Lenovo ThinkPad L14 Gen 5 – 14″ 16GB RAM, 512GB SSD, Ultra HD Display', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l14-gen-5-14-16gb-ram-512gb-ssd-ultra-hd-display',
    description: {
      overview: "ThinkPad L14 Gen 5 (16GB, 512GB, UHD) Overview",
      design: { title: "Design", formFactor: "A 14 inch business laptop from the ThinkPad L series, featuring a high-resolution display." },
      performance: { title: "Performance", processor: "Powered by an Intel Core Ultra processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch Ultra HD (UHD) display for exceptional clarity.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A great choice for users who need a sharp, high-resolution screen in a durable business laptop.", connectivityOptions: "Comprehensive connectivity." }
    }
  },
  { 
    id: "92", 
    name: 'Lenovo ThinkPad L14 Gen 5 14″ WUXGA Notebook | Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l14-gen-5-14-wuxga-notebook-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad L14 Gen 5 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A high-performance 14 inch business laptop from the durable ThinkPad L series." },
      performance: { title: "Performance", processor: "Features the powerful Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This laptop offers strong performance, AI features, and robust security. Runs Windows 11 Pro.", connectivityOptions: "A full set of ports for any business scenario." }
    }
  },
  { 
    id: "93", 
    name: 'Lenovo ThinkPad L16 G1 T ULTRA ? 16″ FHD+ Business Laptop | 16GB RAM, 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l16-g1-t-ultra-16-fhd-business-laptop-16gb-ram-512gb-ssd',
    description: {
      overview: "ThinkPad L16 Gen 1 (Ultra, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a 16:10 display, combining a large screen with ThinkPad durability." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch FHD+ (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful and secure large-screen laptop for business users.", connectivityOptions: "Comprehensive ports for a desktop-like experience." }
    }
  },
  { 
    id: "94", 
    name: 'Lenovo ThinkPad L16 Gen 1 16″ WUXGA Laptop | Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/8.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-l16-gen-1-16-wuxga-laptop-intel-core-ultra-5-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad L16 Gen 1 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop from the L series, offering a large WUXGA display and AI performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Runs Windows 11 Pro and provides a large, sustainable, and secure mobile workstation.", connectivityOptions: "Full port selection." }
    }
  },
  { 
    id: "95", 
    name: 'Lenovo ThinkPad P1 Gen 7 16″ Laptop – Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 2000, WQXGA Display – Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l36.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p1-gen-7-16-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-2000-wqxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad P1 Gen 7 (Ultra 7, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "A 16 inch thin and light mobile workstation, balancing a premium design with professional power." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of high-speed RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WQXGA (2560x1600) display.", graphics: "NVIDIA RTX 2000 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerhouse for 3D rendering and creative work in a highly portable chassis. Runs Windows 11 Pro.", connectivityOptions: "High-speed ports for creative workflows." }
    }
  },
  { 
    id: "96", 
    name: 'Lenovo ThinkPad P1 Gen 7 16″ Laptop ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 2000, WQXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l36.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p1-gen-7-16-laptop-intel-core-ultra-9-32gb-ram-1tb-ssd-nvidia-rtx-2000-wqxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad P1 Gen 7 (Ultra 9, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "The 16 inch ThinkPad P1, configured for maximum performance with an Ultra 9 processor." },
      performance: { title: "Performance", processor: "Top-of-the-line Intel Core Ultra 9 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WQXGA (2560x1600) display.", graphics: "NVIDIA RTX 2000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This machine offers elite performance for the most demanding creative and technical users. Runs Windows 11 Pro.", connectivityOptions: "Pro-grade connectivity." }
    }
  },
  { 
    id: "97", 
    name: 'Lenovo ThinkPad P1 Gen 7 16″ Rugged Laptop – Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 1000 Ada, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l36.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p1-gen-7-16-rugged-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-1000-ada-windows-11-pro',
    description: {
      overview: "ThinkPad P1 Gen 7 (Ultra 7, 32GB, 1TB, RTX 1000) Overview",
      design: { title: "Design", formFactor: "A rugged 16 inch thin and light mobile workstation, built to withstand harsh conditions." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch high-resolution display.", graphics: "NVIDIA RTX 1000 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Combines the portability of the P1 with rugged durability. Runs Windows 11 Pro.", connectivityOptions: "High-speed ports for field and office use." }
    }
  },
  { 
    id: "98", 
    name: 'Lenovo ThinkPad P1 Gen 7 16″ WQXGA Laptop – Intel Core Ultra 7, 32GB RAM, 1TB SSD, RTX 4070, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l36.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p1-gen-7-16-wqxga-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-rtx-4070-windows-11-pro',
    description: {
      overview: "ThinkPad P1 Gen 7 (Ultra 7, 32GB, 1TB, RTX 4070) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation configured for high-end creative and gaming performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WQXGA (2560x1600) display.", graphics: "Powerful NVIDIA GeForce RTX 4070 laptop GPU." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A laptop that excels at both professional creative work and high-end gaming. Runs Windows 11 Pro.", connectivityOptions: "Ports to support a full creator setup." }
    }
  },
  { 
    id: "99", 
    name: 'Lenovo ThinkPad P1 Gen 7 16″ WQXGA Laptop | Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 4060', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo/l36.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p1-gen-7-16-wqxga-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-geforce-rtx-4060',
    description: {
      overview: "ThinkPad P1 Gen 7 (Ultra 7, 32GB, 1TB, RTX 4060) Overview",
      design: { title: "Design", formFactor: "A 16 inch thin workstation with a WQXGA display, ideal for content creators." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WQXGA (2560x1600) display.", graphics: "NVIDIA GeForce RTX 4060 laptop GPU." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A strong choice for video editors and designers who need a balance of power and portability.", connectivityOptions: "High-speed ports for fast file transfers." }
    }
  },
  { 
    id: "100", 
    name: 'Lenovo ThinkPad P14s Gen 5 – Ultra-Portable Rugged Workstation | 64GB RAM, RTX 500 Ada, 1TB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p14s-gen-5-ultra-portable-rugged-workstation-64gb-ram-rtx-500-ada-1tb-ssd',
    description: {
      overview: "ThinkPad P14s Gen 5 (64GB, 1TB, RTX 500) Overview",
      design: { title: "Design", formFactor: "An ultra-portable 14.5 inch mobile workstation, balancing power and mobility with a rugged build." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "A massive 64GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14.5 inch 16:10 display.", graphics: "NVIDIA RTX 500 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerhouse configuration for users who run complex models or large datasets in a portable form factor.", connectivityOptions: "Full connectivity including Ethernet." }
    }
  },
  { 
    id: "101", 
    name: 'Lenovo ThinkPad P14s Gen 5 14.5″ Mobile Workstation – Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 500, WUXGA Display – Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p14s-gen-5-14-5-mobile-workstation-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-500-wuxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad P14s Gen 5 (Ultra 7, 32GB, 1TB, RTX 500) Overview",
      design: { title: "Design", formFactor: "A 14.5 inch mobile workstation that is thin, light, and powerful." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14.5 inch WUXGA (1920x1200) display.", graphics: "NVIDIA RTX 500 Ada Generation professional graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "The perfect blend of performance and portability for technical professionals. Runs Windows 11 Pro.", connectivityOptions: "A complete set of ports for all needs." }
    }
  },
  { 
    id: "102", 
    name: 'Lenovo ThinkPad P14s Gen 5 Mobile Workstation – 14.5″ WQXGA, Intel Core Ultra 9, 32GB RAM, 1TB SSD, Intel Arc Graphics, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/19.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p14s-gen-5-mobile-workstation-14-5-wqxga-intel-core-ultra-9-32gb-ram-1tb-ssd-intel-arc-graphics-windows-11-pro',
    description: {
      overview: "ThinkPad P14s Gen 5 (Ultra 9, 32GB, 1TB, Arc) Overview",
      design: { title: "Design", formFactor: "A high-performance 14.5 inch mobile workstation with a high-resolution display." },
      performance: { title: "Performance", processor: "Top-tier Intel Core Ultra 9 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14.5 inch WQXGA (2560x1600) display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A configuration for users who need maximum CPU power and a sharp display in a portable chassis. Runs Windows 11 Pro.", connectivityOptions: "Full connectivity." }
    }
  },
  { 
    id: "103", 
    name: 'Lenovo ThinkPad P16 Gen 2 21FA0005UK 40.6 cm (16″) Mobile Workstation', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/27.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16-gen-2-21fa0005uk-40-6-cm-16-mobile-workstation',
    description: {
      overview: "ThinkPad P16 Gen 2 16 inch (40.6 cm) Mobile Workstation Overview",
      design: { title: "Design", formFactor: "A 16 inch (40.6 cm) high-performance mobile workstation designed for the most demanding tasks." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core HX-series processor.", memory: "Upgradable high-speed RAM.", storage: "Multiple NVMe SSD slots." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 display with options up to 4K OLED.", graphics: "High-end NVIDIA RTX Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-C", "USB-A", "HDMI", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A true desktop replacement for engineers, data scientists, and animators.", connectivityOptions: "Unmatched performance and connectivity." }
    }
  },
  { 
    id: "104", 
    name: 'Lenovo ThinkPad P16s Gen 3 16″ WUXGA Laptop ? Intel Core Ultra 7 155H, 16GB DDR5, 512GB SSD, RTX 500 Ada 4GB, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16s-gen-3-16-wuxga-laptop-intel-core-ultra-7-155h-16gb-ddr5-512gb-ssd-rtx-500-ada-4gb-windows-11-pro',
    description: {
      overview: "ThinkPad P16s Gen 3 (Ultra 7, 16GB, 512GB, RTX 500) Overview",
      design: { title: "Design", formFactor: "A 16 inch thin and light mobile workstation, balancing power and portability." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 155H processor.", memory: "16GB of DDR5 RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "NVIDIA RTX 500 Ada Generation 4GB graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A great entry-level mobile workstation for CAD and technical work. Runs Windows 11 Pro.", connectivityOptions: "Full port selection." }
    }
  },
  { 
    id: "105", 
    name: 'Lenovo ThinkPad P16s Gen 3 21KS0004UK 16″ Laptop | Intel Core Ultra 7 | 32GB RAM | 1TB SSD | NVIDIA RTX 500 Ada Gen 4GB | Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16s-gen-3-21ks0004uk-16-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-500-ada-gen-4gb-windows-11-pro',
    description: {
      overview: "ThinkPad P16s Gen 3 (Ultra 7, 32GB, 1TB, RTX 500) Overview",
      design: { title: "Design", formFactor: "A 16 inch thin and light mobile workstation with a high-performance configuration." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "NVIDIA RTX 500 Ada Generation 4GB graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful, portable workstation for professionals. Runs Windows 11 Pro.", connectivityOptions: "Comprehensive connectivity." }
    }
  },
  { 
    id: "106", 
    name: 'Lenovo ThinkPad P16v Gen 2 16″ Mobile Workstation ? Intel Core Ultra 9, 32GB RAM, 1TB SSD, NVIDIA RTX 3000 Ada, WUXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/18.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16v-gen-2-16-mobile-workstation-intel-core-ultra-9-32gb-ram-1tb-ssd-nvidia-rtx-3000-ada-wuxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad P16v Gen 2 (Ultra 9, 32GB, 1TB, RTX 3000) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation that offers a step-up in power, bridging the gap to high-end rendering." },
      performance: { title: "Performance", processor: "Top-tier Intel Core Ultra 9 processor.", memory: "32GB RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "High-performance NVIDIA RTX 3000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Aimed at serious creative professionals and engineers who need powerful graphics. Runs Windows 11 Pro.", connectivityOptions: "Full workstation port selection." }
    }
  },
  { 
    id: "107", 
    name: 'Lenovo ThinkPad P16v Gen 2 Mobile Workstation – 16″ WUXGA, Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 500 Ada, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16v-gen-2-mobile-workstation-16-wuxga-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-500-ada-windows-11-pro',
    description: {
      overview: "ThinkPad P16v Gen 2 (Ultra 7, 32GB, 1TB, RTX 500) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation offering a blend of power and value." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "NVIDIA RTX 500 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A solid workstation for professional CAD users and designers. Runs Windows 11 Pro.", connectivityOptions: "Excellent connectivity for a full desk setup." }
    }
  },
  { 
    id: "108", 
    name: 'Lenovo ThinkPad P16v Gen 2 Mobile Workstation | 16″ WUXGA, Intel Core Ultra 7, 32GB RAM, 1TB SSD, NVIDIA RTX 1000 Ada Gen – Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-p16v-gen-2-mobile-workstation-16-wuxga-intel-core-ultra-7-32gb-ram-1tb-ssd-nvidia-rtx-1000-ada-gen-windows-11-pro',
    description: {
      overview: "ThinkPad P16v Gen 2 (Ultra 7, 32GB, 1TB, RTX 1000) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation with a step-up in graphics performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "NVIDIA RTX 1000 Ada Generation graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful choice for 3D modeling and advanced design work. Runs Windows 11 Pro.", connectivityOptions: "A full set of ports for pro users." }
    }
  },
  { 
    id: "109", 
    name: 'Lenovo ThinkPad T14 G5 T ULTRA ? 14″ WUXGA | 16GB DDR5 | 512GB SSD | Powerful Business Laptop', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/15.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14-g5-t-ultra-14-wuxga-16gb-ddr5-512gb-ssd-powerful-business-laptop',
    description: {
      overview: "ThinkPad T14 Gen 5 (Ultra, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "The 14 inch workhorse of the ThinkPad line, now with Intel Core Ultra processors." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "16GB of high-speed DDR5 RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful, durable, and secure business laptop for enterprise users.", connectivityOptions: "Full connectivity, including Ethernet." }
    }
  },
  { 
    id: "110", 
    name: 'Lenovo ThinkPad T14 Gen 5 (21ML0037UK) 14″ WUXGA IPS Laptop ? Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro, Black', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14-gen-5-21ml0037uk-14-wuxga-ips-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro-black',
    description: {
      overview: "ThinkPad T14 Gen 5 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch premium business laptop in classic ThinkPad black, built for high performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) IPS display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This high-performance T14 is ready for AI workloads and demanding multitasking. Runs Windows 11 Pro.", connectivityOptions: "A full set of ports for any environment." }
    }
  },
  { 
    id: "111", 
    name: 'Lenovo ThinkPad T14s Gen 6 (14″) AMD Ryzen AI 7 PRO, 32GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/20.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14s-gen-6-14-amd-ryzen-ai-7-pro-32gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad T14s Gen 6 (AMD Ryzen AI 7, 32GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A thin and light 14 inch premium business laptop powered by AMDs new Ryzen AI processors." },
      performance: { title: "Performance", processor: "Features the AMD Ryzen AI 7 PRO processor.", memory: "32GB of high-speed RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch 16:10 display, with optional OLED.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C (USB4)", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful, secure, and ultra-portable laptop for mobile professionals. Runs Windows 11 Pro.", connectivityOptions: "Streamlined ports for mobility." }
    }
  },
  { 
    id: "112", 
    name: 'Lenovo ThinkPad T14s Gen 6 (21N10007UK) 14″ WUXGA Laptop – Qualcomm Snapdragon X Elite, 32GB RAM, 1TB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/21.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14s-gen-6-21n10007uk-14-wuxga-laptop-qualcomm-snapdragon-x-elite-32gb-ram-1tb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad T14s Gen 6 (Snapdragon X Elite, 32GB, 1TB) Overview",
      design: { title: "Design", formFactor: "A 14 inch Copilot+ PC, this T14s is powered by Snapdragon for extreme battery life and on-device AI." },
      performance: { title: "Performance", processor: "Features the Qualcomm Snapdragon X Elite processor.", memory: "32GB of unified RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) low-power display.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A"], wireless: ["Wi-Fi 7", "Bluetooth 5.4", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "Delivers multi-day battery life and powerful AI features in a thin and light business laptop. Runs Windows 11 Pro.", connectivityOptions: "Next-gen wireless for ultimate mobility." }
    }
  },
  { 
    id: "113", 
    name: 'Lenovo ThinkPad T14s Gen 6 14″ Rugged Copilot+ Laptop – Qualcomm Snapdragon X Plus, 16GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/20.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14s-gen-6-14-rugged-copilot-laptop-qualcomm-snapdragon-x-plus-16gb-ram-512gb-ssd-wuxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad T14s Gen 6 (Snapdragon X Plus, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch rugged Copilot+ PC that balances performance and efficiency with ThinkPad durability." },
      performance: { title: "Performance", processor: "Features the Qualcomm Snapdragon X Plus processor.", memory: "16GB of unified RAM.", storage: "A 512GB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "An efficient and durable business laptop with powerful on-device AI. Runs Windows 11 Pro.", connectivityOptions: "Focused on mobility and next-gen wireless." }
    }
  },
  { 
    id: "114", 
    name: 'Lenovo ThinkPad T14s Gen 6 14″ Touchscreen Rugged Laptop – Qualcomm Snapdragon X Elite, 32GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t14s-gen-6-14-touchscreen-rugged-laptop-qualcomm-snapdragon-x-elite-32gb-ram-512gb-ssd-wuxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad T14s Gen 6 (Snapdragon X Elite, 32GB, 512GB, Touch) Overview",
      design: { title: "Design", formFactor: "A 14 inch rugged, thin and light Copilot+ PC with a touchscreen for added versatility." },
      performance: { title: "Performance", processor: "Top-tier Qualcomm Snapdragon X Elite processor.", memory: "32GB of unified RAM.", storage: "A 512GB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) touchscreen display.", graphics: "Integrated Qualcomm Adreno graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "The ultimate thin and light business laptop with touch, all-day battery, and on-device AI. Runs Windows 11 Pro.", connectivityOptions: "Next-gen wireless." }
    }
  },
  { 
    id: "115", 
    name: 'Lenovo ThinkPad T16 G3 T Ultra – Powerful Business Laptop with 16″ Display, 512GB SSD, and 16GB RAM', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t16-g3-t-ultra-powerful-business-laptop-with-16-display-512gb-ssd-and-16gb-ram',
    description: {
      overview: "ThinkPad T16 Gen 3 (Ultra, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business workhorse laptop, now with Intel Core Ultra processors." },
      performance: { title: "Performance", processor: "Features an Intel Core Ultra processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful and secure large-screen laptop for enterprise productivity.", connectivityOptions: "Full port selection for a desktop setup." }
    }
  },
  { 
    id: "116", 
    name: 'Lenovo ThinkPad T16 Gen 3 16″ WUXGA Laptop – Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-t16-gen-3-16-wuxga-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad T16 Gen 3 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a WUXGA display, configured for high performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A large-screen powerhouse with AI capabilities and Windows 11 Pro.", connectivityOptions: "All the ports needed for business." }
    }
  },
  { 
    id: "117", 
    name: 'Lenovo ThinkPad X1 CARBON G12', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-carbon-g12',
    description: {
      overview: "ThinkPad X1 Carbon Gen 12 Overview",
      design: { title: "Design", formFactor: "The 12th generation of the legendary 14 inch premium business laptop, now even thinner, lighter, and more powerful." },
      performance: { title: "Performance", processor: "Powered by Intel Core Ultra processors.", memory: "High-speed LPDDR5x RAM.", storage: "NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch 16:10 display with options up to 2.8K OLED.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3", "Optional 5G"] },
      functionality: { title: "Functionality", versatility: "The executive laptop, perfected. AI-powered, incredible battery life, and premium design.", connectivityOptions: "Streamlined ports for ultimate mobility." }
    }
  },
  { 
    id: "118", 
    name: 'Lenovo ThinkPad X1 Carbon G12 – Powerful, Durable, and Lightweight 14″ Laptop with 32GB RAM & 1TB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/23.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-carbon-g12-powerful-durable-and-lightweight-14-laptop-with-32gb-ram-1tb-ssd',
    description: {
      overview: "ThinkPad X1 Carbon Gen 12 (32GB, 1TB) Overview",
      design: { title: "Design", formFactor: "A high-end configuration of the 14 inch X1 Carbon, combining power and portability." },
      performance: { title: "Performance", processor: "Features a high-performance Intel Core Ultra processor.", memory: "32GB of RAM.", storage: "A massive 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch 16:10 high-resolution display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A no-compromise laptop for executives and mobile power users.", connectivityOptions: "Modern, high-speed ports." }
    }
  },
  { 
    id: "119", 
    name: 'Lenovo ThinkPad X1 Carbon Gen 12 14″ WUXGA Laptop – Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-carbon-gen-12-14-wuxga-laptop-intel-core-ultra-5-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X1 Carbon Gen 12 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch premium business laptop, this model (Gen 12) features the latest AI-powered processors." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB of LPDDR5x RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) IPS display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "The perfect balance of performance and portability for the mobile professional. Runs Windows 11 Pro.", connectivityOptions: "Streamlined for mobility." }
    }
  },
  { 
    id: "120", 
    name: 'Lenovo ThinkPad X1 Carbon Gen 13 (21NS0010UK) ? 14″ 2.8K Copilot+ PC, Intel Core Ultra 7, 32GB RAM, 1TB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-carbon-gen-13-21ns0010uk-14-2-8k-copilot-pc-intel-core-ultra-7-32gb-ram-1tb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X1 Carbon Gen 13 (Ultra 7, 32GB, 1TB, 2.8K) Overview",
      design: { title: "Design", formFactor: "A 14 inch Copilot+ PC, representing the next generation of the X1 Carbon with on-device AI." },
      performance: { title: "Performance", processor: "High-performance Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "A stunning 14 inch 2.8K display panel.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "A premium AI-powered laptop for executives who need the best display and performance. Runs Windows 11 Pro.", connectivityOptions: "Next-gen wireless and high-speed ports." }
    }
  },
  { 
    id: "121", 
    name: 'Lenovo ThinkPad X1 Gen 9 14″ 2-in-1 Touchscreen Laptop ? Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-gen-9-14-2-in-1-touchscreen-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X1 Yoga Gen 9 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch premium 2-in-1 convertible laptop, combining X1 Carbon's lightness with 360-degree flexibility." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch 16:10 touchscreen display with pen support.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "The ultimate flexible laptop for executives, with four modes and a garaged stylus. Runs Windows 11 Pro.", connectivityOptions: "High-speed ports for a versatility setup." }
    }
  },
  { 
    id: "122", 
    name: 'Lenovo ThinkPad X1 Gen 9 14″ Touchscreen 2-in-1 Laptop – Intel Core Ultra 7, 32GB RAM, 1TB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/26.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x1-gen-9-14-touchscreen-2-in-1-laptop-intel-core-ultra-7-32gb-ram-1tb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X1 Yoga Gen 9 (Ultra 7, 32GB, 1TB) Overview",
      design: { title: "Design", formFactor: "A high-performance 14 inch 2-in-1 convertible laptop, built for power and flexibility." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch 16:10 touchscreen display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A top-tier convertible for professionals who need maximum performance and storage. Runs Windows 11 Pro.", connectivityOptions: "Full ports for a flexible workflow." }
    }
  },
  { 
    id: "123", 
    name: 'Lenovo ThinkPad X13 Gen 5 – 13.3″ WUXGA, Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x13-gen-5-13-3-wuxga-intel-core-ultra-5-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X13 Gen 5 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "An ultra-portable 13.3 inch business laptop, blending power and mobility." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A compact and powerful laptop for professionals on the move. Runs Windows 11 Pro.", connectivityOptions: "Excellent connectivity for its size." }
    }
  },
  { 
    id: "124", 
    name: 'Lenovo ThinkPad X13 Gen 5 13.3″ Touchscreen 2-in-1 Laptop – Intel Core Ultra 5, 16GB RAM, 512GB SSD, WUXGA Display, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/17.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x13-gen-5-13-3-touchscreen-2-in-1-laptop-intel-core-ultra-5-16gb-ram-512gb-ssd-wuxga-display-windows-11-pro',
    description: {
      overview: "ThinkPad X13 Yoga Gen 5 (Ultra 5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 13.3 inch 2-in-1 convertible laptop, offering the flexibility of a Yoga with the power of the X13." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 5 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) touchscreen display.", graphics: "Integrated Intel Graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "An ultra-portable convertible for any work style, with a garaged pen. Runs Windows 11 Pro.", connectivityOptions: "Modern ports for maximum flexibility." }
    }
  },
  { 
    id: "125", 
    name: 'Lenovo ThinkPad X13 Gen 5 13.3″ Touchscreen 2-in-1 Laptop ? Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x13-gen-5-13-3-touchscreen-2-in-1-laptop-intel-core-ultra-7-16gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "ThinkPad X13 Yoga Gen 5 (Ultra 7, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A high-performance 13.3 inch 2-in-1 convertible laptop." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) touchscreen display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful and portable 2-in-1 for demanding users. Runs Windows 11 Pro.", connectivityOptions: "High-speed ports and garaged pen." }
    }
  },
  { 
    id: "126", 
    name: 'Lenovo ThinkPad X13 Gen 5 13.3″ WUXGA Laptop – Intel Core Ultra 7, 16GB RAM, 1TB SSD, Windows 11 Pro, IPS Display', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x13-gen-5-13-3-wuxga-laptop-intel-core-ultra-7-16gb-ram-1tb-ssd-windows-11-pro-ips-display',
    description: {
      overview: "ThinkPad X13 Gen 5 (Ultra 7, 16GB, 1TB) Overview",
      design: { title: "Design", formFactor: "An ultra-portable 13.3 inch clamshell laptop with a high-performance configuration." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "16GB RAM.", storage: "A large 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "13.3 inch WUXGA (1920x1200) IPS display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A compact powerhouse for mobile professionals needing speed and storage. Runs Windows 11 Pro.", connectivityOptions: "Full connectivity for on-the-go work." }
    }
  },
  { 
    id: "127", 
    name: 'Lenovo ThinkPad X9-14 Gen 1 (21QA001KUK) 14″ WUXGA Laptop – Intel Core Ultra 7, 32GB RAM, 512GB SSD, Windows 11 Pro – Grey', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/2.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x9-14-gen-1-21qa001kuk-14-wuxga-laptop-intel-core-ultra-7-32gb-ram-512gb-ssd-windows-11-pro-grey',
    description: {
      overview: "ThinkPad X9-14 Gen 1 (Ultra 7, 32GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch premium laptop, likely a typo for X1, in a modern Grey finish." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 512GB SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful and portable high-end business laptop. Runs Windows 11 Pro.", connectivityOptions: "Streamlined, modern ports." }
    }
  },
  { 
    id: "128", 
    name: 'Lenovo ThinkPad X9-14 Gen 1 Rugged Copilot+ Laptop – 14″ WUXGA Display, Intel Core Ultra 7, 32GB RAM, 1TB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/20.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-thinkpad-x9-14-gen-1-rugged-copilot-laptop-14-wuxga-display-intel-core-ultra-7-32gb-ram-1tb-ssd',
    description: {
      overview: "ThinkPad X9-14 Gen 1 (Ultra 7, 32GB, 1TB) Overview",
      design: { title: "Design", formFactor: "A rugged 14 inch Copilot+ PC, likely a typo for X1, built for durability and AI performance." },
      performance: { title: "Performance", processor: "Features the Intel Core Ultra 7 processor.", memory: "32GB of RAM.", storage: "A 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) display.", graphics: "Intel Arc graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A"], wireless: ["Wi-Fi 7", "Bluetooth 5.4"] },
      functionality: { title: "Functionality", versatility: "A high-spec, durable laptop with on-device AI for demanding mobile users.", connectivityOptions: "Next-gen wireless and high-speed ports." }
    }
  },
  { 
    id: "129", 
    name: 'Lenovo V15 G4 AMN Ryzen 5 | 82YU00U8UK Powerful Business Laptop | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-v15-g4-amn-ryzen-5-82yu00u8uk-powerful-business-laptop-amd',
    description: {
      overview: "Lenovo V15 G4 (AMD Ryzen 5) Overview",
      design: { title: "Design", formFactor: "A 15.6 inch budget-friendly business laptop, powered by AMD." },
      performance: { title: "Performance", processor: "Features an AMD Ryzen 5 processor.", memory: "Configured for essential business performance.", storage: "SSD storage." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD display.", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "RJ-45"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A powerful and affordable laptop for small business owners and students.", connectivityOptions: "Full range of ports for everyday use." }
    }
  },
  { 
    id: "130", 
    name: 'Lenovo V15 G4 IRU 15.6″ Full HD Laptop | Intel Core i5-13420H, 8GB RAM, 256GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-v15-g4-iru-15-6-full-hd-laptop-intel-core-i5-13420h-8gb-ram-256gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo V15 G4 IRU 15.6 inch Full HD Laptop Overview",
      design: { title: "Design", formFactor: "A 15.6 inch laptop built for business, featuring a Full HD display and a durable chassis designed for daily work." },
      performance: { title: "Performance", processor: "Features the Intel Core i5-13420H processor for powerful performance.", memory: "8GB RAM for essential multitasking.", storage: "256GB SSD for fast boot times and application loading." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (1920x1080) display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C 3.2 Gen 1", "USB 3.2 Gen 1", "USB 2.0", "HDMI 1.4b", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "Comes with Windows 11 Pro, offering robust security and management features for business.", connectivityOptions: "A full suite of ports including Ethernet for stable wired connections." }
    }
  },
  { 
    id: "131", 
    name: 'Lenovo V15 G4 IRU 83A1008YUK 15.6″ Full HD Laptop – Intel Core i5 13th Gen, 8GB RAM, 512GB SSD, Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-v15-g4-iru-83a1008yuk-15-6-full-hd-laptop-intel-core-i5-13th-gen-8gb-ram-512gb-ssd-windows-11-pro',
    description: {
      overview: "Lenovo V15 G4 IRU (512GB SSD) Overview",
      design: { title: "Design", formFactor: "This 15.6 inch Full HD laptop is a reliable tool for business, balancing a large screen with a portable design." },
      performance: { title: "Performance", processor: "Powered by a 13th Gen Intel Core i5 processor.", memory: "8GB RAM for everyday productivity and multitasking.", storage: "A generous 512GB SSD for ample file storage and fast performance." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (1920x1080) anti-glare display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C 3.2 Gen 1", "USB 3.2 Gen 1", "USB 2.0", "HDMI 1.4b", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "Equipped with Windows 11 Pro, this model is perfect for professionals needing extra storage.", connectivityOptions: "Wired and wireless connectivity to keep you productive anywhere." }
    }
  },
  { 
    id: "132", 
    name: 'Lenovo V15 G4 IRU 83A100H9UK 39.6 cm (15.6″) Notebook – Full HD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/20.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-v15-g4-iru-83a100h9uk-39-6-cm-15-6-notebook-full-hd',
    description: {
      overview: "Lenovo V15 G4 IRU 15.6 inch Full HD Notebook Overview",
      design: { title: "Design", formFactor: "A 15.6 inch notebook designed for productivity, featuring a Full HD display and a durable, professional build." },
      performance: { title: "Performance", processor: "Features a 13th Gen Intel Core processor.", memory: "Sufficient RAM for daily business applications.", storage: "Fast SSD storage for quick system responsiveness." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (1920x1080) display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet (RJ-45)"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A dependable and cost-effective laptop for everyday computing tasks in a business environment.", connectivityOptions: "Includes essential ports for peripherals and network access." }
    }
  },
  { 
    id: "133", 
    name: 'Lenovo V15 G4 IRU 83A100PNUK 15.6″ Notebook ? Intel Core i5 13th Gen, 8GB RAM, 512GB SSD, Full HD, Windows 11', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/18.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'lenovo-v15-g4-iru-83a100pnuk-15-6-notebook-intel-core-i5-13th-gen-8gb-ram-512gb-ssd-full-hd-windows-11',
    description: {
      overview: "Lenovo V15 G4 IRU (i5, 8GB, 512GB) Overview",
      design: { title: "Design", formFactor: "This 15.6 inch notebook offers a balance of performance and storage in a sleek, professional chassis." },
      performance: { title: "Performance", processor: "Powered by a 13th Gen Intel Core i5 processor.", memory: "8GB RAM for efficient multitasking.", storage: "A large 512GB SSD for storing all your important files." },
      display: { title: "Display and Graphics", screen: "15.6 inch Full HD (1920x1080) display.", graphics: "Integrated Intel UHD Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet"], wireless: ["Wi-Fi 6", "Bluetooth 5.1"] },
      functionality: { title: "Functionality", versatility: "Runs on Windows 11, providing a modern and secure user experience for business or personal use.", connectivityOptions: "Comprehensive ports for easy connection to peripherals." }
    }
  },
  { 
    id: "134", 
    name: 'ThinkBook 16 G7 ARP Laptop | AMD R5-7535HS | 16GB RAM | 512GB SSD | WUXGA Display', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkbook-16-g7-arp-laptop-amd-r5-7535hs-16gb-ram-512gb-ssd-wuxga-display',
    description: {
      overview: "ThinkBook 16 G7 ARP (AMD R5, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch business laptop with a 16:10 aspect ratio, combining a modern aluminum design with robust performance." },
      performance: { title: "Performance", processor: "Features the powerful AMD Ryzen 5 7535HS processor.", memory: "16GB of high-speed RAM for demanding applications.", storage: "A 512GB SSD for ample fast storage." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display for a large, immersive workspace.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C (USB4)", "USB-A", "HDMI 2.1", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "Built for modern professionals, this laptop offers strong performance for productivity and content creation.", connectivityOptions: "Advanced connectivity including USB4 for high-speed data transfer." }
    }
  },
  { 
    id: "135", 
    name: 'ThinkPad 14″ Laptop – 32GB RAM, 1TB SSD, & 1920×1200 Display for Seamless Performance and Storage', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-14-laptop-32gb-ram-1tb-ssd-1920x1200-display-for-seamless-performance-and-storage',
    description: {
      overview: "ThinkPad 14 inch Laptop (32GB RAM, 1TB SSD) Overview",
      design: { title: "Design", formFactor: "A 14 inch ThinkPad laptop, embodying the classic durable design with a focus on high performance and portability." },
      performance: { title: "Performance", processor: "Equipped with a high-performance Intel or AMD processor.", memory: "A massive 32GB of RAM for extreme multitasking and heavy workloads.", storage: "A super-fast 1TB SSD for vast storage and instant access." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display for enhanced productivity.", graphics: "Advanced integrated graphics." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4 / USB4", "USB-A", "HDMI"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "This is a power-user configuration, ideal for developers, data analysts, and professionals who cannot compromise on performance.", connectivityOptions: "Top-tier connectivity for a high-performance workflow." }
    }
  },
  { 
    id: "136", 
    name: 'ThinkPad L14 G5 AMD R7P-7735U | Business Laptop | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-l14-g5-amd-r7p-7735u-business-laptop-amd',
    description: {
      overview: "ThinkPad L14 G5 AMD (R7P-7735U) Overview",
      design: { title: "Design", formFactor: "A 14 inch mainstream business laptop from the durable L series, powered by AMD for excellent performance and value." },
      performance: { title: "Performance", processor: "Features the AMD Ryzen 7 PRO 7735U processor with integrated security features.", memory: "Fast DDR5 RAM for responsive multitasking.", storage: "NVMe SSD for quick data access." },
      display: { title: "Display and Graphics", screen: "14 inch Full HD or WUXGA display.", graphics: "Integrated AMD Radeon 680M graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6E", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A secure and manageable business laptop with AMD PRO technologies, ideal for enterprise deployment.", connectivityOptions: "A wide range of ports for docking and peripheral connection." }
    }
  },
  { 
    id: "137", 
    name: 'ThinkPad L16 G1 AMD R7P-7735U 16-inch Laptop | 32GB RAM, 1TB SSD, NVIDIA RTX A1000 ? High Performance & Reliability', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-l16-g1-amd-r7p-7735u-16-inch-laptop-32gb-ram-1tb-ssd-nvidia-rtx-a1000-high-performance-reliability',
    description: {
      overview: "ThinkPad L16 G1 (AMD R7P, 32GB, 1TB, RTX A1000) Overview",
      design: { title: "Design", formFactor: "A 16 inch high-performance business laptop, combining AMD processing power with a discrete NVIDIA GPU." },
      performance: { title: "Performance", processor: "Features the AMD Ryzen 7 PRO 7735U processor.", memory: "A massive 32GB of RAM for heavy workloads.", storage: "A 1TB SSD for vast and fast storage." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display.", graphics: "NVIDIA RTX A1000 discrete graphics for professional creative and technical applications." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI 2.1", "Ethernet"], wireless: ["Wi-Fi 6E", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A mobile workstation for professionals who need both CPU and GPU power, plus ThinkPad reliability.", connectivityOptions: "Extensive ports for a complete workstation setup." }
    }
  },
  { 
    id: "138", 
    name: 'ThinkPad P16V1 R9-P7940HS | High-Performance Laptop with 32GB RAM, 1TB SSD, NVIDIA RTX 2000 | Windows 11 Pro', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/12.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-p16v1-r9-p7940hs-high-performance-laptop-with-32gb-ram-1tb-ssd-nvidia-rtx-2000-windows-11-pro',
    description: {
      overview: "ThinkPad P16v G1 (AMD R9, 32GB, 1TB, RTX 2000) Overview",
      design: { title: "Design", formFactor: "A 16 inch mobile workstation designed to bridge the gap between entry-level and high-end, offering immense power." },
      performance: { title: "Performance", processor: "Equipped with the top-tier AMD Ryzen 9 PRO 7940HS processor.", memory: "32GB of high-speed RAM for complex simulations and rendering.", storage: "A 1TB NVMe SSD for large projects." },
      display: { title: "Display and Graphics", screen: "16 inch 16:10 display, likely WQXGA (2560x1600).", graphics: "NVIDIA RTX 2000 Ada Generation discrete GPU for professional workflows." },
      connectivity: { title: "Connectivity", ports: ["USB4", "USB-A", "HDMI 2.1", "SD card reader"], wireless: ["Wi-Fi 6E", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A true powerhouse for engineers, architects, and content creators needing desktop-level performance.", connectivityOptions: "ISV-certified with a full range of high-speed ports." }
    }
  },
  { 
    id: "139", 
    name: 'ThinkPad Series 14 WUXGA R5-7530U | Powerful Laptop | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/15.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-series-14-wuxga-r5-7530u-powerful-laptop-amd',
    description: {
      overview: "ThinkPad 14 inch (AMD R5-7530U) Overview",
      design: { title: "Design", formFactor: "A 14 inch ThinkPad, likely from the E or L series, offering a balance of performance and value with AMD processing." },
      performance: { title: "Performance", processor: "Features the efficient and powerful AMD Ryzen 5 7530U processor.", memory: "Ample RAM for business productivity.", storage: "Fast SSD storage." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A reliable and powerful laptop for everyday business use, featuring ThinkPad durability.", connectivityOptions: "Essential ports for a flexible work environment." }
    }
  },
  { 
    id: "140", 
    name: 'ThinkPad T16 Series T16G2A R7-P7840U | High-Performance Laptop | 16GB RAM & 512GB SSD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/9.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'thinkpad-t16-series-t16g2a-r7-p7840u-high-performance-laptop-16gb-ram-512gb-ssd',
    description: {
      overview: "ThinkPad T16 G2 AMD (R7-P7840U, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch premium business laptop from the T series, offering a large screen, numeric keypad, and robust performance." },
      performance: { title: "Performance", processor: "Powered by the high-performance AMD Ryzen 7 PRO 7840U processor.", memory: "16GB of fast RAM for demanding tasks.", storage: "A 512GB SSD for quick file access." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) 16:10 display, with low power options.", graphics: "Integrated AMD Radeon 780M graphics." },
      connectivity: { title: "Connectivity", ports: ["USB4", "USB-A", "HDMI 2.1", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6E", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "The workhorse of business laptops, ideal for professionals needing a large screen and top-tier performance.", connectivityOptions: "Includes high-speed USB4 and a full array of ports." }
    }
  },
  { 
    id: "141", 
    name: 'TP E14 AMD G6 T R7-7735HS 16GB | Powerful Laptop | AMD', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/13.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'tp-e14-amd-g6-t-r7-7735hs-16gb-powerful-laptop-amd',
    description: {
      overview: "ThinkPad E14 AMD G6 (R7-7735HS, 16GB) Overview",
      design: { title: "Design", formFactor: "A 14 inch laptop from the ThinkPad E series, updated with a powerful AMD Ryzen HS-series processor." },
      performance: { title: "Performance", processor: "Features the high-performance AMD Ryzen 7 7735HS processor.", memory: "16GB of RAM for smooth multitasking.", storage: "Fast NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "14 inch WUXGA (1920x1200) 16:10 display.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "A powerful and durable laptop for small businesses and students needing strong CPU performance.", connectivityOptions: "Comprehensive ports for all peripherals." }
    }
  },
  { 
    id: "142", 
    name: 'TP E16 AMD G2 Laptop with R5-7535HS Processor, 16GB RAM, 512GB SSD | 16″ Display', 
    price: "Get a Quote", 
    image: '/computerandlaptops/lenovo2/14.jpg', 
    category: 'Laptops, Lenovo', 
    categorySlug: 'computers-and-laptops',
    slug: 'tp-e16-amd-g2-laptop-with-r5-7535hs-processor-16gb-ram-512gb-ssd-16-display',
    description: {
      overview: "ThinkPad E16 AMD G2 (R5-7535HS, 16GB, 512GB) Overview",
      design: { title: "Design", formFactor: "A 16 inch ThinkPad E series laptop offering a large 16:10 display and numeric keypad for productivity." },
      performance: { title: "Performance", processor: "Powered by the AMD Ryzen 5 7535HS processor.", memory: "16GB RAM for efficient multitasking.", storage: "A 512GB SSD for ample storage and speed." },
      display: { title: "Display and Graphics", screen: "16 inch WUXGA (1920x1200) display.", graphics: "Integrated AMD Radeon graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB-A", "HDMI", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6", "Bluetooth 5.2"] },
      functionality: { title: "Functionality", versatility: "An excellent choice for data entry and spreadsheet work, thanks to its large screen and numpad.", connectivityOptions: "Full port selection for a complete office setup." }
    }
  },
  
  // --- End of Computers & Laptops ---

  // --- Accessories ---
  // --- UPDATED Dell WD19S Docking station (id: "143") ---
{ 
  id: "143", 
  name: 'Dell WD19S Docking station - USB-C', 
  price: "Get a Quote", 
  image: '/dell-docking-station/5.jpg', 
  category: 'Accessories, Dell', 
  categorySlug: 'accessories',
  slug: 'dell-wd19s-docking-station-usb-c',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'DisplayPort 1.4 (Dual): Provides connectivity for two modern displays.',
          'HDMI 2.0b: A versatile port for connecting monitors or TVs.',
          'USB-C Multifunction: Supports DisplayPort over USB-C.',
          'USB-C 3.2 Gen 2: A port for fast data transfer devices.',
          'USB-A 3.2 Gen 1 (Triple): Ample ports for your keyboard mouse and other accessories.',
          'Gigabit Ethernet (RJ-45): Delivers a reliable high-speed wired network connection.'
        ]
      },
      {
        title: 'Display Support',
        items: [
          'Supports multiple high-resolution displays (e.g. dual 4K) for maximum productivity.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          'Delivers power to your laptop through the USB-C cable (e.g. 90W or 130W depending on the adapter).'
        ]
      }
    ],
    benefits: [
      'Single-Cable Solution: Transform your laptop into a full desktop workstation with a single USB-C cable that handles power data and video.',
      'Modular Design: Features a modular design allowing for easy upgrades and flexible setup.',
      'Streamlined Productivity: Connect all your peripherals—monitors keyboard mouse and network—through one single device.'
    ],
    summary: 'The Dell WD19S is a powerful and modular USB-C docking station designed to declutter your workspace and provide extensive connectivity. It transforms your laptop into a full desktop workstation with a single cable.'
  }
},
// --- NEW DELL DOCKING STATIONS (AMENDED & CLEANED) ---
// --- Replace the old objects in your src/lib/products.ts file with these ---
{
  id: 'dell-da305u',
  slug: 'dell-6-in-1-multiport-adapter-da305u',
  name: 'Dell – 6-in-1 Multiport Adapter – DELL-DA305U',
  image: '/dell-docking-station/2.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'HDMI 2.0: Connect to a 4K display at 60Hz.',
          'DisplayPort 1.4: Supports high-resolution 4K video output at 60Hz.',
          'VGA: Provides connectivity for legacy display monitors.',
          'USB-C 3.2 Gen 2: Supports 10Gbps data transfer and 90W Power Pass-through.',
          'USB-A 3.2 Gen 2: Two ports for fast 10Gbps data transfer to peripherals.',
          'Gigabit Ethernet (RJ-45): Ensures a fast and reliable wired network connection.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          '90W Power Pass-through: Charge your laptop while using the adapter. This requires a separate USB-C power adapter.'
        ]
      },
      {
        title: 'Design',
        items: [
          'Compact and Portable: Features a patented twist-to-retract design with a neatly stored integrated USB-C cable.'
        ]
      }
    ],
    benefits: [
      'All-in-One Connectivity: Offers a comprehensive selection of video data network and power pass-through in one single device.',
      'High-Speed Data: Equipped with USB 3.2 Gen 2 ports for 10Gbps data transfer speeds.',
      'Flexible Display Options: Connect to modern 4K displays or older VGA monitors with ease.'
    ],
    summary: 'The Dell 6-in-1 USB-C Multiport Adapter DA305U is an essential tool for mobile professionals. It improves your laptop connectivity by supporting multiple interfaces and fast data transfer in a highly compact design.'
  }
},
{
  id: 'dell-wd19s-performance',
  slug: 'dell-performance-docking-station-wd19s',
  name: 'Dell – Performance – docking station – DELL-WD19DCS',
  image: '/dell-docking-station/5.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'DisplayPort 1.4 (Dual): Connect multiple high-resolution displays.',
          'HDMI 2.0b: An additional port for video and audio output.',
          'USB-C Multifunction: Supports DisplayPort over USB-C for more display options.',
          'USB-C 3.2 Gen 2: For high-speed data transfer.',
          'USB-A 3.2 Gen 1 (Triple): Connect a wide range of standard peripherals.',
          'Gigabit Ethernet (RJ-45): For stable and fast wired network access.'
        ]
      },
      {
        title: 'Display Support',
        items: [
          'Multi-Monitor Power: Supports up to dual 4K displays at 60Hz or triple QHD displays. Performance is host laptop dependent.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          'High-Performance Power: Delivers up to 130W (with 180W adapter) or 210W (with 240W adapter) to power high-demand workstations.'
        ]
      }
    ],
    benefits: [
      'Future-Proof Design: Features a modular design with swappable modules for easy future upgrades.',
      'Workstation Ready: Built for power users who need extensive port selection and high power delivery for demanding tasks.',
      'Rapid Charging: Includes Dell ExpressCharge technology for quickly charging your laptop battery.'
    ],
    summary: 'The Dell Performance Dock WD19S is a high-performance modular solution for power users. It simplifies your workspace with a single USB-C cable for data extensive multi-display support and powerful charging for workstations.'
  }
},
{
  id: 'dell-wd19s-150w',
  slug: 'dell-wd19s-docking-station-150w',
  name: 'Dell – WD19S – Docking station – DELL-WD19S130W',
  image: '/dell-docking-station/6.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'DisplayPort 1.4 (Dual): Provides connectivity for two modern displays.',
          'HDMI 2.0b: A versatile port for connecting monitors or TVs.',
          'USB-C Multifunction: Supports DisplayPort over USB-C.',
          'USB-C 3.2 Gen 2: A port for fast data transfer devices.',
          'USB-A 3.2 Gen 1 (Triple): Ample ports for your keyboard mouse and other accessories.',
          'Gigabit Ethernet (RJ-45): Delivers a reliable high-speed wired network connection.'
        ]
      },
      {
        title: 'Display Support',
        items: [
          'Dual Display: Easily supports up to dual Full HD (1080p) displays or a single 4K display.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          'Standard Business Power: Delivers up to 90W (with 130W adapter) or 130W (with 180W adapter) to keep your laptop charged.'
        ]
      }
    ],
    benefits: [
      'Streamlined Productivity: Connect all your peripherals—monitors keyboard mouse and network—through one single cable.',
      'Modular Design: The industry-standard dock features a modular design allowing for simple upgrades.',
      'Business Ready: Perfect for standard business productivity creating an efficient and clean desk setup.'
    ],
    summary: 'The Dell Docking Station WD19S is the modern modular solution for business environments. It provides essential connectivity for dual displays and peripherals all while charging your laptop through a single USB-C cable.'
  }
},
{
  id: 'dell-wd22tb4',
  slug: 'dell-thunderbolt-dock-wd22tb4',
  name: 'DELL Thunderbolt™ Dock – DELL-WD22TB4',
  image: '/dell-docking-station/5.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'Thunderbolt 4 (Dual): The ultimate high-speed connection (40Gbps) for host and peripherals.',
          'DisplayPort 1.4 (Dual): Connect multiple 4K displays.',
          'HDMI 2.0: An additional port for display flexibility.',
          'USB-C 3.2 Gen 2 (Dual): Multiple ports for fast data and DisplayPort support.',
          'USB-A 3.2 Gen 1 (Four): A large number of ports for all your standard devices.',
          'Gigabit Ethernet (RJ-45): For a stable wired internet connection.'
        ]
      },
      {
        title: 'Display Support',
        items: [
          'High-Resolution Power: Supports up to dual 4K displays at 60Hz or a single 8K display at 60Hz on supported hosts.'
        ]
      },
      {
        title: 'Technology',
        items: [
          'Thunderbolt 4: Leverages next-generation 40Gbps bandwidth for maximum performance.'
        ]
      }
    ],
    benefits: [
      'Ultimate Performance: The ideal dock for creative professionals and power users who need maximum bandwidth for displays and data.',
      'Future-Proof Modularity: Features a premium swappable module design for easy upgrades.',
      'Powerful Charging: Delivers up to 130W of power to Dell laptops (90W to non-Dell) to keep you productive.'
    ],
    summary: 'The Dell Thunderbolt 4 Dock WD22TB4 is a premium high-performance docking station. It offers next-generation connectivity for high-resolution displays and fast data transfer making it the ultimate solution for maximum productivity.'
  }
},
{
  id: 'dell-wd19s-usbc-210',
  slug: 'dell-wd19s-docking-station-usb-c-210w',
  name: 'Dell WD19S – docking station – USB-C – 210-AZBG',
  image: '/dell-docking-station/5.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'DisplayPort 1.4 (Dual): Connect to two monitors for an expanded workspace.',
          'HDMI 2.0b: A versatile port for an additional display.',
          'USB-C Multifunction: Supports DisplayPort over USB-C functionality.',
          'USB-C 3.2 Gen 2: A port for modern high-speed accessories.',
          'USB-A 3.2 Gen 1 (Triple): Connect your essential keyboard mouse and external drives.',
          'Gigabit Ethernet (RJ-45): Ensures a fast and stable wired network connection.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          'High-Power Charging: Paired with a 210W adapter this dock delivers up to 180W of power to the connected laptop.'
        ]
      },
      {
        title: 'Compatibility',
        items: [
          'Workstation Ready: Ideal for high-demand laptops and mobile workstations that require more than 130W of power.'
        ]
      }
    ],
    benefits: [
      'Power for Workstations: Ensures your high-performance laptop stays fully charged even under heavy workloads.',
      'Full Business Connectivity: Provides all the essential ports for a complete desktop setup.',
      'Single-Cable Convenience: Declutter your desk by connecting all devices and power through a single USB-C cable.'
    ],
    summary: 'The Dell WD19S USB-C Docking Station with a 210W adapter is built for power. It is the perfect solution for users with mobile workstations providing enhanced power delivery alongside full business connectivity.'
  }
},
{
  id: 'dell-wd19s-180w',
  slug: 'dell-wired-usb-3-2-gen-2-dell-wd19s180w',
  name: 'DELL Wired USB 3.2 Gen 2 – DELL-WD19S180W',
  image: '/dell-docking-station/1.jpg',
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    keyFeatures: [
      {
        title: 'Ports',
        items: [
          'DisplayPort 1.4 (Dual): Easily connect two Full HD or QHD monitors.',
          'HDMI 2.0b: An additional port for a third display or projector.',
          'USB-C Multifunction: A flexible port that supports DisplayPort over USB-C.',
          'USB-C 3.2 Gen 2: For high-speed data transfer peripherals.',
          'USB-A 3.2 Gen 1 (Triple): Connect your standard desktop accessories like keyboard mouse and headset.',
          'Gigabit Ethernet (RJ-45): For a reliable fast wired network connection.'
        ]
      },
      {
        title: 'Power Delivery',
        items: [
          'Robust Power: The 180W adapter provides up to 130W of power to your Dell laptop suitable for most high-performance models.'
        ]
      },
      {
        title: 'Manageability',
        items: [
          'Enterprise Features: Supports enterprise-level features like MAC Address Pass-Through and PXE Boot for easy management.'
        ]
      }
    ],
    benefits: [
      'Streamline Your Desk: This enterprise workhorse allows you to handle power data and video with a single USB-C cable.',
      'Rapid Charging: Features Dell ExpressCharge to quickly power your laptop and get you back to work.',
      'Reliable Docking: A durable and modular chassis makes this a dependable choice for any business environment.'
    ],
    summary: 'The Dell Wired USB 3.2 Gen 2 Dock WD19S with a 180W adapter is the enterprise standard for productivity. It streamlines your desk provides robust power for performance laptops and includes key manageability features.'
  }
},
// --- END OF AMENDED DELL DOCKING STATIONS ---


  // --- Switches ---
  {
  id: "ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro",
  slug: "ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro",
  name: "Ubiquiti UniFi Dream Machine Pro Managed Gigabit (UDM-Pro)",
  price: "Get a Quote",
  image: "/ubiquiti/5.png", // Update this path
  category: "Ubiquiti, Ubiquiti Routers, Security Gateways",
  categorySlug: "ubiquiti",
  description: {
    keyFeatures: [
      {
        title: "All-in-One Enterprise Console",
        items: [
          "Integrates a Security Gateway, Managed Switch, and Network Controller",
          "Pre-installed UniFi Network and UniFi Protect applications",
          "Powered by a fast 1.7 GHz Quad-Core Processor"
        ]
      },
      {
        title: "Advanced Networking",
        items: [
          "8 x Gigabit RJ45 LAN Ports",
          "1 x 10G SFP+ LAN Port for high-speed uplinks",
          "Dual WAN support: 1 x 10G SFP+ and 1 x Gigabit RJ45",
          "Full-featured Layer 2 managed switch capabilities"
        ]
      },
      {
        title: "Security & Surveillance",
        items: [
          "Advanced Firewall with IPS/IDS (Intrusion Prevention/Detection System)",
          "DPI (Deep Packet Inspection) for traffic analysis",
          "Integrated NVR with a 3.5\" HDD bay for UniFi Protect video storage"
        ]
      }
    ],
    benefits: [
      "Centralizes your entire network management into a single 1U rack-mountable device.",
      "Future-proof connectivity with 10G SFP+ ports for high-speed ISP connections.",
      "Seamlessly scalable—easily add more UniFi switches and APs as your business grows."
    ],
    summary: "The Ubiquiti UniFi Dream Machine Pro (UDM-Pro) is an enterprise-grade, rack-mount UniFi Cloud Gateway. It combines a robust security gateway, a 10G managed switch, and a network controller into one device. With a built-in HDD bay for video surveillance storage, it is the ultimate all-in-one networking appliance for scalable business networks."
  }
},
  { 
    id: "145", 
    name: 'Ubiquiti UniFi USW-Enterprise-24-PoE', 
    price: "Get a Quote", 
    image: '/contact.webp', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches',
    slug: 'ubiquiti-unifi-usw-enterprise-24-poe',
    description: {
      overview: "Ubiquiti UniFi USW-Enterprise-24-PoE Overview",
      design: { title: "Design", formFactor: "A 24-port, rack-mountable Layer 3 switch designed for high-speed enterprise networking." },
      performance: { title: "Performance", processor: "Enterprise-grade switch with a 400W PoE budget to power numerous devices.", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "1.3 inch LCM color touchscreen for quick network insights.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["12x 2.5 GbE PoE+ ports", "12x GbE PoE+ ports", "2x 10G SFP+ uplinks"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerful switch for organizations needing multi-gigabit speeds and robust PoE+ capabilities.", connectivityOptions: "Managed and configured by the UniFi Network application." }
    }
  },
  
  // --- Routers ---
  { 
    id: "146", 
    name: 'Ubiquiti UniFi U6+ Access Point', 
    price: "Get a Quote", 
    image: '/images/hero-router.png', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers',
    slug: 'ubiquiti-unifi-u6-access-point',
    description: {
      overview: "Ubiquiti UniFi U6+ Access Point Overview",
      design: { title: "Design", formFactor: "A compact, dual-band Wi-Fi 6 access point with a sleek, ceiling-mountable design." },
      performance: { title: "Performance", processor: "Provides 2x2 MIMO on both 5 GHz (Wi-Fi 6) and 2.4 GHz (Wi-Fi 4) bands.", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x GbE PoE input port"], wireless: ["Wi-Fi 6 (5 GHz)", "Wi-Fi 4 (2.4 GHz)"] },
      functionality: { title: "Functionality", versatility: "An affordable, high-performance AP for small-to-medium businesses and homes, supporting over 300 connected devices.", connectivityOptions: "Powered by PoE and managed centrally via the UniFi Network Controller." }
    }
  },
  // [Code from line 1 to 2567 is unchanged]
  // --- PASTE THE NEW PRODUCT OBJECT HERE ---
{
  id: 'hp-m501dn',
  slug: 'hp-laserjet-pro-m501dn-j8h61a-bgj',
  name: 'HP LaserJet Pro M501dn',
  image: '/hp-printers/3.jpg',
  category: 'Printers, HP',
  categorySlug: 'printers',
  price: 'Get a Quote',
  description: hpLaserJetM501dnDescription, // <-- USES THE NEW DESCRIPTION
},
// --- END OF NEW PRODUCT ---
// --- NEW: HP DISPLAYS (27 PRODUCTS) ---
  {
    id: "hp-d-1",
    slug: "hp-322pv-21-4-full-hd-led-monitor",
    name: "HP 322pv 21.4″ Full HD LED Monitor",
    image: "/hp-display/12.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An essential and budget-friendly 21.4-inch monitor, perfect for everyday office tasks and bulk deployments.",
      design: {
        title: "Design",
        formFactor: "A 21.4-inch Full HD (1920x1080) panel in a standard black chassis with a tilt-adjustable stand. VESA mount compatible."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "21.4-inch Full HD (1920x1080) LED display. Likely a VA panel for high contrast, ideal for text and spreadsheets.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A reliable workhorse monitor for call centers, admin tasks, or any role needing a clear, simple display.",
        connectivityOptions: "Essential ports for connecting to both modern and legacy computers."
      }
    }
  },
  {
    id: "hp-d-2",
    slug: "hp-324pf-23-8-fhd-ips-monitor-100hz",
    name: "HP 324pf 23.8″ FHD IPS Monitor ? 100Hz, 5ms, HDMI/DP/VGA ? Slim LED Backlight for Work & Gaming",
    image: "/hp-display/1.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A modern 23.8-inch Full HD monitor designed for a smooth, fluid user experience in the home or office.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch IPS panel with 3-sided micro-edge bezels for a seamless look. Includes a tilt-adjustable stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with a 100Hz refresh rate and 5ms response time for blur-free scrolling.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 100Hz refresh rate provides a noticeable step-up in smoothness for web browsing, video, and general productivity.",
        connectivityOptions: "Flexible connectivity for a variety of devices."
      }
    }
  },
  {
    id: "hp-d-3",
    slug: "hp-324pv-24-full-hd-va-monitor-100hz",
    name: "HP 324pv 24″ Full HD VA Monitor ? 100Hz, Eye Ease, 3000:1 Contrast ? Sleek & Flicker-Free",
    image: "/hp-display/11.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An affordable 24-inch monitor that combines a high-contrast VA panel with a smooth 100Hz refresh rate.",
      design: {
        title: "Design",
        formFactor: "A 24-inch panel in a standard business-black chassis with a tilt-adjustable stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "24-inch Full HD (1920x1080) VA panel, providing deep blacks and high contrast. Features a 100Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A great value-oriented choice for users who want smooth motion without sacrificing the deep blacks of a VA panel.",
        connectivityOptions: "Essential ports for standard computer connections."
      }
    }
  },
  {
    id: "hp-d-4",
    slug: "hp-524pu-23-8-fhd-ips-monitor-100hz-usb-c",
    name: "HP 524PU 23.8″ FHD IPS Monitor ? 100Hz, USB-C 100W, Borderless Design",
    image: "/hp-display/10.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 23.8-inch business monitor designed for the modern hybrid workspace, featuring single-cable USB-C connectivity and a 100Hz refresh rate.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch IPS display with 3-sided micro-edge bezels and a full ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS panel. 100Hz refresh rate provides smooth motion for all tasks.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (65W Power Delivery, DisplayPort Alt-Mode)", "1x HDMI", "1x DisplayPort", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Connect, charge, and display from your laptop with a single USB-C cable. The 100Hz refresh rate and ergonomic stand ensure comfort.",
        connectivityOptions: "A true docking monitor for a clean and productive desk setup."
      }
    }
  },
  {
    id: "hp-d-5",
    slug: "hp-7-pro-24-wuxga-ips-monitor-8x534aa",
    name: "HP 7 Pro 24″ WUXGA IPS Monitor – 8X534AA#ABU",
    image: "/hp-display/4.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 24-inch professional monitor from the HP 7 Pro series, featuring a 16:10 aspect ratio for enhanced productivity.",
      design: {
        title: "Design",
        formFactor: "A 24-inch 16:10 IPS panel with 4-sided micro-edge bezels and a premium silver/black ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "24-inch WUXGA (1920x1200) 16:10 IPS display. Factory calibrated for color accuracy (99% sRGB).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (100W Power Delivery)", "1x DisplayPort (In)", "1x DisplayPort (Out for daisy-chain)", "1x HDMI", "USB-A/C Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 16:10 aspect ratio provides more vertical screen space for code, documents, and timelines. A powerful 100W USB-C docking monitor.",
        connectivityOptions: "Single-cable docking and daisy-chaining to a second monitor."
      }
    }
  },
  {
    id: "hp-d-6",
    slug: "hp-p24h-g5-24-fhd-ips-monitor",
    name: "HP 724pf 23.8″ FHD IPS Monitor ? 100Hz, 99% sRGB, Factory Calibrated",
    image: "/hp-display/5.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch G5 business monitor that delivers essential performance, comfort, and connectivity for everyday productivity.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch Full HD IPS panel with 3-sided micro-edge bezels and a full ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with HP Eye Ease low blue light technology.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 'h' in P24h signifies its fully adjustable ergonomic stand, making it a comfortable workhorse for any office.",
        connectivityOptions: "A built-in USB hub and a wide range of video inputs (HDMI, DP, VGA) offer total flexibility."
      }
    }
  },
  {
    id: "hp-d-7",
    slug: "hp-p24h-g5-24-full-hd-ips-monitor-75hz",
    name: "HP 727pq 27″ Class WQHD LED Monitor – 16:9- 8J4D8AA#ABU",
    image: "/hp-display/6.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch G5 business monitor that combines ergonomic comfort with a smoother 75Hz refresh rate for everyday productivity.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch Full HD IPS panel with 3-sided micro-edge bezels and a fully adjustable ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with a 75Hz refresh rate and HP Eye Ease technology.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A fully ergonomic monitor with a 75Hz refresh rate that provides a slightly smoother visual experience than standard 60Hz monitors.",
        connectivityOptions: "Connect to any PC, new or old, with HDMI, DisplayPort, and VGA inputs."
      }
    }
  },
  {
    id: "hp-d-8",
    slug: "hp-p27-g5-27-fhd-ips-monitor-64x89aa",
    name: "HP 727pu 27″ WQHD IPS Black Monitor ? 120Hz, FreeSync Premium, HDR400, USB-C, KVM",
    image: "/hp-display/8.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An essential 27-inch G5 business monitor offering a large Full HD screen for multitasking.",
      design: {
        title: "Design",
        formFactor: "A 27-inch Full HD IPS panel with 3-sided micro-edge bezels and a simple, tilt-adjustable stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch Full HD (1920x1080) IPS display. 75Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A large-screen monitor perfect for viewing multiple documents side-by-side. VESA mount compatibility allows for custom setups.",
        connectivityOptions: "A full suite of video inputs ensures compatibility with virtually any business computer."
      }
    }
  },
  {
    id: "hp-d-9",
    slug: "hp-p27h-g5-27-fhd-ips-monitor-64w41aa",
    name: "HP B250 VESA 100×100 Mounting Bracket – 8RA46AA",
    image: "/hp-display/7.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A large, ergonomic 27-inch G5 business monitor designed for all-day comfort and productivity.",
      design: {
        title: "Design",
        formFactor: "A 27-inch Full HD IPS panel with 3-sided micro-edge bezels and a fully adjustable ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch Full HD (1920x1080) IPS display with 75Hz refresh rate and HP Eye Ease low blue light.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The fully ergonomic stand allows you to find the perfect viewing position, while the large screen is ideal for multitasking.",
        connectivityOptions: "Built-in USB hub and versatile video inputs (HDMI, DP, VGA) create a complete workstation."
      }
    }
  },
  {
    id: "hp-d-10",
    slug: "hp-series-7-pro-24-wuxga-monitor-724pn",
    name: "HP B550 Mounting Bracket for Monitor, Display, Desktop Computer, Chromebox",
    image: "/hp-display/14.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch monitor from the premium HP 7 Pro series, featuring a 16:10 aspect ratio for professionals who need to see more.",
      design: {
        title: "Design",
        formFactor: "A 24-inch 16:10 IPS panel with 4-sided micro-edge bezels and a premium silver/black ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "24-inch WUXGA (1920x1200) 16:10 IPS display. Factory calibrated for 99% sRGB color accuracy.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (100W Power Delivery)", "1x DisplayPort (In)", "1x DisplayPort (Out)", "1x HDMI", "USB-A/C Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 16:10 aspect ratio is perfect for programmers, designers, and office workers. A 100W USB-C port provides single-cable docking.",
        connectivityOptions: "Powers your laptop, connects to your network (via USB-C), and daisy-chains to a second monitor."
      }
    }
  },
  {
    id: "hp-d-11",
    slug: "hp-e22-g5-22-fhd-ips-monitor-6n4e8aa",
    name: "HP E22 G5 22″ FHD IPS Monitor – 6N4E8AA#ABU",
    image: "/hp-display/3.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 22-inch G5 EliteDisplay monitor, offering superior ergonomics and eye comfort in a compact size.",
      design: {
        title: "Design",
        formFactor: "A 21.5-inch Full HD IPS panel with 3-sided micro-edge bezels and a 4-way ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "21.5-inch Full HD (1920x1080) IPS display with 75Hz refresh rate and always-on HP Eye Ease low blue light filter.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "1x USB-B (upstream)", "4x USB-A 3.2 (downstream)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Part of the premium EliteDisplay series, this monitor is perfect for comfortable, all-day use in any business setting.",
        connectivityOptions: "A built-in 4-port USB hub and versatile video inputs make this a highly productive, ergonomic monitor."
      }
    }
  },
  {
    id: "hp-d-12",
    slug: "hp-e24i-g4-24-ips-monitor-1920x1200",
    name: "HP E24i G4 24″ IPS Monitor – 1920×1200, HDMI/DP, USB Hub",
    image: "/hp-display/13.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch G4 EliteDisplay monitor with a 16:10 aspect ratio, designed for professionals who need extra vertical screen space.",
      design: {
        title: "Design",
        formFactor: "A 24-inch WUXGA (1920x1200) IPS panel with 3-sided micro-edge bezels and a full 4-way ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "24-inch WUXGA (1920x1200) 16:10 IPS display. Features HP Eye Ease for comfortable viewing.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "1x USB-B (upstream)", "4x USB-A 3.2 (downstream)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 16:10 aspect ratio is ideal for programmers, data analysts, and designers. A built-in USB hub reduces cable clutter.",
        connectivityOptions: "Connect to any source with HDMI, DP, or VGA, and use the built-in hub for your peripherals."
      }
    }
  },
  {
    id: "hp-d-13",
    slug: "hp-e24mv-g4-24-fhd-ips-webcam-monitor",
    name: "HP E24mv G4 24″ FHD IPS Webcam Monitor – 169L0AA#ABU",
    image: "/hp-display/22.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch G4 EliteDisplay monitor purpose-built for video conferencing, featuring an integrated 5MP webcam, dual mics, and speakers.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch Full HD IPS panel with a 5MP pop-up webcam (Windows Hello compatible), built-in speakers, and an ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with 75Hz refresh rate and HP Eye Ease.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "1x USB-B (upstream)", "4x USB-A 3.2 (downstream)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The all-in-one solution for hybrid work. The pop-up webcam ensures privacy, and the built-in audio creates a clean setup.",
        connectivityOptions: "Connects to your PC via a single USB-B cable to activate the webcam, mic, speakers, and USB hub."
      }
    }
  },
  {
    id: "hp-d-14",
    slug: "hp-e27-g5-27-fhd-ips-monitor-6n4e2aa",
    name: "HP E27 G5 27″ FHD IPS Monitor – 6N4E2AA#ABU",
    image: "/hp-display/2.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 27-inch G5 EliteDisplay monitor, offering superior ergonomics and eye comfort for multitasking.",
      design: {
        title: "Design",
        formFactor: "A 27-inch Full HD IPS panel with 3-sided micro-edge bezels and a full 4-way ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch Full HD (1920x1080) IPS display with 75Hz refresh rate and always-on HP Eye Ease low blue light filter.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "1x USB-B (upstream)", "4x USB-A 3.2 (downstream)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A large, ergonomic display designed for comfortable, all-day use. The built-in USB hub simplifies your workspace.",
        connectivityOptions: "A full suite of video inputs and a 4-port USB hub make this a productivity powerhouse."
      }
    }
  },
  {
    id: "hp-d-15",
    slug: "hp-e27k-g5-27-4k-uhd-monitor-ips-usb-c",
    name: "HP E27k G5 27″ 4K UHD Monitor ? IPS Panel, USB-C 65W Charging, 99% sRGB, Ergonomic Design",
    image: "/hp-display/3.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 27-inch G5 EliteDisplay docking monitor with crystal-clear 4K resolution and single-cable USB-C connectivity.",
      design: {
        title: "Design",
        formFactor: "A 27-inch 4K IPS panel with 3-sided micro-edge bezels and a full 4-way ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch 4K UHD (3840x2160) IPS display with HP Eye Ease. Provides stunning clarity and detail.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (65W Power Delivery, DisplayPort Alt-Mode)", "1x HDMI", "1x DisplayPort", "USB-A Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The ultimate 4K docking monitor. Connect your laptop via one USB-C cable to get 4K video, power, and a wired network connection.",
        connectivityOptions: "A true single-cable solution for a clean and powerful workspace."
      }
    }
  },
  {
    id: "hp-d-16",
    slug: "hp-p22-g5-22-fhd-ips-monitor",
    name: "HP E27u G5 27″ QHD USB-C Monitor – 6N4D3AA#ABU",
    image: "/hp-display/10.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An essential 22-inch G5 business monitor offering Full HD resolution and an IPS panel for wide viewing angles.",
      design: {
        title: "Design",
        formFactor: "A 21.5-inch Full HD IPS panel with 3-sided micro-edge bezels and a tilt-adjustable stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "21.5-inch Full HD (1920x1080) IPS display. 75Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A compact, cost-effective monitor perfect for dual-screen setups or space-constrained desks. VESA mount compatible.",
        connectivityOptions: "Modern and legacy ports (HDMI, DP, VGA) ensure broad compatibility."
      }
    }
  },
  {
    id: "hp-d-17",
    slug: "hp-p22h-g5-22-fhd-ips-monitor",
    name: "HP M24m 24″ Class Webcam Full HD LED Monitor – 678U5AA#ABU",
    image: "/hp-display/23.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A compact 22-inch G5 business monitor featuring full ergonomic adjustment for all-day comfort.",
      design: {
        title: "Design",
        formFactor: "A 21.5-inch Full HD IPS panel with 3-sided micro-edge bezels and a 4-way ergonomic stand (height, tilt, swivel, pivot)."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "21.5-inch Full HD (1920x1080) IPS display with 75Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x DisplayPort", "1x VGA", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 'h' model provides full ergonomics, allowing users to find their perfect viewing angle, a key feature for employee wellness.",
        connectivityOptions: "A built-in USB hub and flexible video inputs make this a very practical choice."
      }
    }
  },
  {
    id: "hp-d-18",
    slug: "hp-p22v-g5-22-class-full-hd-lcd-monitor",
    name: "HP P22 G5 22″ Full HD IPS Monitor – 64X86AA#ABU",
    image: "/hp-display/24.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An entry-level 22-inch G5 monitor that provides reliable Full HD performance for everyday computing at an affordable price.",
      design: {
        title: "Design",
        formFactor: "A 21.5-inch Full HD panel in a standard chassis with a tilt-adjustable stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "21.5-inch Full HD (1920x1080) display. The 'v' suggests a VA panel, offering excellent contrast.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x HDMI", "1x VGA"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A no-frills, reliable monitor perfect for basic office applications, security stations, or large-scale deployments.",
        connectivityOptions: "Essential HDMI and VGA ports cover all basic connection needs."
      }
    }
  },
  {
    id: "hp-d-19",
    slug: "hp-e27u-g5-27-qhd-usb-c-monitor",
    name: "HP P22h G5 22″ FHD IPS Monitor – 64W30AA#ABU",
    image: "/hp-display/16.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 27-inch G5 EliteDisplay monitor that combines sharp QHD resolution with the simplicity of single-cable USB-C docking.",
      design: {
        title: "Design",
        formFactor: "A 27-inch QHD IPS panel with 3-sided micro-edge bezels and a full 4-way ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch QHD (2560x1440) IPS display with 75Hz refresh rate and HP Eye Ease low blue light.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (65W PD, DP Alt-Mode)", "1x HDMI", "1x DisplayPort (In)", "1x DisplayPort (Out)", "USB-A Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 'u' signifies it's a full docking station monitor. Connect your laptop via one USB-C cable to get QHD video, 65W power, a wired network connection, and access to all USB peripherals.",
        connectivityOptions: "The DisplayPort-out allows you to daisy-chain a second monitor for a clean, multi-display setup."
      }
    }
  },
  {
    id: "hp-d-20",
    slug: "hp-m24m-24-class-webcam-full-hd-led",
    name: "HP P22v G5 22″ Class Full HD LCD Monitor – 64V81AA#ABU",
    image: "/hp-display/20.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A 24-inch all-in-one monitor from the M-series, designed for the ultimate home office video conferencing experience.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch FHD IPS panel with a sleek, modern stand. Integrates a 5MP pop-up webcam, noise-canceling mics, and front-firing speakers."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with 75Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (65W Power Delivery, DP Alt-Mode)", "1x HDMI", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A complete solution for virtual meetings. The single-cable USB-C connection provides video, power, and webcam/audio access.",
        connectivityOptions: "Certified for Zoom and Windows Hello, it's built for seamless collaboration."
      }
    }
  },
  {
    id: "hp-d-21",
    slug: "hp-series-7-pro-31-5-4k-thunderbolt-4-monitor",
    name: "HP P24h G5 24″ FHD IPS Monitor – 64W34AA#ABU",
    image: "/hp-display/17.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An ultimate-performance 31.5-inch 4K monitor from the HP 7 Pro series, featuring an IPS Black panel and powerful Thunderbolt 4 docking.",
      design: {
        title: "Design",
        formFactor: "A 31.5-inch 4K panel with 4-sided micro-edge bezels and a premium, fully ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "31.5-inch 4K UHD (3840x2160) IPS Black panel. Delivers 2x the contrast of a standard IPS, with 98% DCI-P3 color accuracy.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x Thunderbolt 4 (100W PD, Daisy-Chain)", "1x Thunderbolt 4 (Downstream)", "1x HDMI 2.0", "1x DisplayPort", "USB-A/C Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A dream monitor for creative professionals and power users. The IPS Black panel provides stunning visuals, while Thunderbolt 4 offers a 40Gbps single-cable docking solution.",
        connectivityOptions: "The ultimate connectivity hub for a high-performance desk."
      }
    }
  },
  {
    id: "hp-d-22",
    slug: "hp-series-7-pro-37-5-wqhd-thunderbolt-4",
    name: "HP P24h G5 24″ Full HD IPS Monitor ? 75Hz, HDMI, DisplayPort | Slim Bezel Design",
    image: "/hp-display/18.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A massive 37.5-inch curved ultrawide monitor from the HP 7 Pro series, designed for immersive multitasking with Thunderbolt 4 docking.",
      design: {
        title: "Design",
        formFactor: "A 37.5-inch 21:9 curved IPS panel in a premium chassis with a fully ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "37.5-inch Ultrawide WQHD+ (3840x1600) curved IPS display. Factory color-calibrated for accuracy.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x Thunderbolt 4 (100W PD, Daisy-Chain)", "1x HDMI 2.0", "1x DisplayPort", "USB-A/C Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The ultrawide screen space is equivalent to multiple monitors, perfect for video editors, financial analysts, and developers. A full-featured Thunderbolt 4 hub powers your workflow.",
        connectivityOptions: "A single cable to your laptop unlocks this massive display, a wired network, and all your peripherals."
      }
    }
  },
  {
    id: "hp-d-23",
    slug: "hp-724pf-23-8-fhd-ips-monitor-100hz",
    name: "HP P27 G5 27″ FHD IPS Monitor – 64X69AA#ABU",
    image: "/hp-display/20.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 23.8-inch monitor from the HP 7 series, combining a color-accurate IPS panel with a fluid 100Hz refresh rate.",
      design: {
        title: "Design",
        formFactor: "A 23.8-inch IPS panel with 3-sided micro-edge bezels and a premium, fully ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "23.8-inch Full HD (1920x1080) IPS display with 100Hz refresh rate and 99% sRGB color gamut.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (65W PD)", "1x HDMI", "1x DisplayPort", "USB-A Hub"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A perfect monitor for the modern home office, providing vibrant colors, smooth motion, and single-cable USB-C docking.",
        connectivityOptions: "Connect, charge, and display from your laptop with a single USB-C cable."
      }
    }
  },
  {
    id: "hp-d-24",
    slug: "hp-727pq-27-class-wqhd-led-monitor",
    name: "HP P27h G5 27″ FHD IPS Monitor – 64W41AA#ABU",
    image: "/hp-display/19.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium 27-inch professional monitor from the HP 7 series, offering sharp QHD resolution and advanced connectivity.",
      design: {
        title: "Design",
        formFactor: "A 27-inch QHD IPS panel with 4-sided micro-edge bezels and a premium, fully ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch QHD (2560x1440) IPS display. Factory color-calibrated for 99% sRGB and 90% DCI-P3.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (100W PD)", "1x DisplayPort (In)", "1x DisplayPort (Out)", "1x HDMI", "USB-A/C Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A powerful QHD docking monitor for creative professionals and power users, featuring high color accuracy and daisy-chaining.",
        connectivityOptions: "A single 100W USB-C cable provides video, power, a wired network, and a full USB hub."
      }
    }
  },
  {
    id: "hp-d-25",
    slug: "hp-727pu-27-wqhd-ips-black-monitor-120hz",
    name: "HP Series 7 Pro 24″ WUXGA Monitor (724pn) ? 1920×1200, 16:10 Aspect Ratio, USB Hub, VESA Mount",
    image: "/hp-display/5.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A high-performance 27-inch monitor from the HP 7 series, featuring a stunning IPS Black panel and a super-smooth 120Hz refresh rate.",
      design: {
        title: "Design",
        formFactor: "A 27-inch QHD IPS Black panel with 4-sided micro-edge bezels and a premium ergonomic stand."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "27-inch QHD (2560x1440) IPS Black panel. Provides 2x the contrast of standard IPS panels. 120Hz refresh rate.",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (100W PD)", "1x HDMI 2.1", "1x DisplayPort", "USB-A/C Hub", "RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A perfect monitor for users who demand both exceptional color/contrast and fluid motion. Ideal for creative work and premium office use.",
        connectivityOptions: "A full-featured docking monitor with 100W USB-C and HDMI 2.1 for next-gen connectivity."
      }
    }
  },
  {
    id: "hp-d-26",
    slug: "hp-b250-vesa-100x100-mounting-bracket",
    name: "HP Series 7 Pro 31.5″ 4K Thunderbolt 4 Monitor",
    image: "/hp-display/10.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A VESA mounting bracket designed to attach specific HP Mini PCs or Thin Clients directly to the back of a VESA-compatible monitor stand or arm.",
      design: {
        title: "Design",
        formFactor: "A sturdy metal bracket with a 100x100mm VESA mounting pattern."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Creates an all-in-one-like solution by mounting your HP Mini PC to your monitor, saving desk space.",
        connectivityOptions: "Attaches to any 100x100mm VESA pattern."
      }
    }
  },
  {
    id: "hp-d-27",
    slug: "hp-b550-mounting-bracket-for-monitor",
    name: "HP Series 7 Pro 37.5 inch WQHD+ Thunderbolt 4 Monitor – 8K167AA#ABU",
    image: "/hp-display/6.jpg",
    category: "HP Displays",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An HP mounting bracket solution, likely used to mount an HP Mini PC, Thin Client, or Docking Station to an HP monitor or monitor stand.",
      design: {
        title: "Design",
        formFactor: "A custom-designed metal mounting bracket, compatible with specific HP products."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Integrates your HP compute device or dock seamlessly with your HP monitor, creating a clean, single-footprint solution.",
        connectivityOptions: "Designed for specific HP hardware pairings."
      }
    }
  },
  // --- END OF HP DISPLAYS ---

  // --- NEW: HP DOCKING STATIONS (4 PRODUCTS) ---
  {
    id: "hp-dock-1",
    slug: "hp-usb-c-dock-g5-5tw10aa",
    name: "HP Docking Station – D9Y32AA#ABA",
    image: "/hp-docking-station/3.jpg",
    category: "HP Docking Station",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A versatile USB-C dock designed for the modern workspace, providing video, data, and power over a single cable.",
      design: {
        title: "Design",
        formFactor: "A compact, rectangular docking station designed to sit on a desk, providing easy access to ports."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports up to three displays, including one 4K display, via DisplayPort and HDMI).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (host)", "1x USB-C (data/power out)", "4x USB-A 3.0", "2x DisplayPort", "1x HDMI 2.0", "1x RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Delivers up to 65W of power to your laptop. Compatible with HP and non-HP USB-C enabled notebooks.",
        connectivityOptions: "A single-cable solution to turn your laptop into a full desktop workstation."
      }
    }
  },
  {
    id: "hp-dock-2",
    slug: "hp-thunderbolt-dock-g4-280w-4j0a2aa",
    name: "HP THUNDERBOLT DOCK 120W G2",
    image: "/hp-docking-station/1.jpg",
    category: "HP Docking Station",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A high-performance Thunderbolt 4 dock designed for power users, offering high-speed data transfer, multi-display support, and 230W power delivery.",
      design: {
        title: "Design",
        formFactor: "A premium, sleek dock with a powerful 280W adapter, built for high-performance workstations."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Thunderbolt 4, 40Gbps)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports up to four 4K displays at 60Hz for an immersive and productive setup).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x Thunderbolt 4 (host)", "1x Thunderbolt 4 (downstream)", "1x USB-C", "4x USB-A 3.2", "2x DisplayPort 1.4", "1x HDMI 2.0", "1x RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 280W adapter provides up to 230W of power, enough for demanding mobile workstations like the HP ZBook.",
        connectivityOptions: "The ultimate docking solution for creators, engineers, and data analysts."
      }
    }
  },
  
  {
    id: "hp-dock-4",
    slug: "hp-usb-c-a-universal-dock-g2-5tw13aa",
    name: "HP USB-C/A Universal Dock G2 – 5TW13AA",
    image: "/hp-docking-station/1.jpg",
    category: "HP Docking Station",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A universal dock designed to work with both new (USB-C) and legacy (USB-A) laptops, ideal for mixed-device environments.",
      design: {
        title: "Design",
        formFactor: "A flat, rectangular dock with a unique swappable-tip cable that supports both USB-C and USB-A 3.0 host connections."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Uses DisplayLink technology)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports up to dual 4K displays via DisplayPort or HDMI, even on non-Thunderbolt laptops).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C/A (host)", "1x USB-C", "4x USB-A 3.0", "2x DisplayPort", "2x HDMI", "1x RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The perfect solution for 'hot desking' or offices where employees use different types of laptops (e.g., HP, Dell, Lenovo, MacBook).",
        connectivityOptions: "Provides 100W power delivery over USB-C and uses DisplayLink drivers for universal video compatibility."
      }
    }
  },
  // --- END OF HP DOCKING STATIONS ---

// --- NEW: HP KEYBOARDS & KEYPADS (22 PRODUCTS) ---
  {
    id: "hp-kb-1",
    slug: "hp-125-keyboard-cable-connectivity-usb-type",
    name: "HP 125 Keyboard – Cable Connectivity – USB Type A Interface – Notebook – PC, Windows",
    image: "/hp-keyboard-and-keypad/16.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A reliable, full-size wired keyboard designed for business-class productivity and all-day comfort.",
      design: {
        title: "Design",
        formFactor: "A full-size keyboard with a 3-zone layout including a numeric keypad. Features a durable, spill-resistant design and a standard USB-A cable."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB Type-A Cable"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A plug-and-play solution for any Windows PC or notebook. The full-size layout and numeric keypad are ideal for spreadsheet and data entry tasks.",
        connectivityOptions: "Simple wired USB-A connection ensures instant setup with no software required."
      }
    }
  },
  {
    id: "hp-kb-2",
    slug: "hp-125-keyboard-with-usb-cable-connectivity",
    name: "HP 125 Keyboard with USB Cable Connectivity for Windows",
    image: "/hp-keyboard-and-keypad/16.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "The HP 125 Keyboard is a standard, plug-and-play USB keyboard built for reliability and straightforward use with Windows computers.",
      design: {
        title: "Design",
        formFactor: "A classic full-size layout with tilt-adjustable legs for comfortable typing angles. Durable build for everyday use."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cable"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A dependable keyboard for any home or office desktop setup. The numeric keypad allows for fast data entry.",
        connectivityOptions: "Connects to any available USB port on your Windows PC or laptop."
      }
    }
  },
  {
    id: "hp-kb-3",
    slug: "hp-125-wired-usb-keyboard-french",
    name: "HP 125 Wired USB Keyboard – French Layout, Black, for PC and Mac",
    image: "/hp-keyboard-and-keypad/7.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A reliable, full-size wired keyboard featuring a standard French (AZERTY) layout for native typing.",
      design: {
        title: "Design",
        formFactor: "Full-size, 3-zone keyboard in black with a French AZERTY key layout. Features adjustable tilt legs."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cable"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The ideal plug-and-play solution for French-speaking users on both PC and Mac platforms.",
        connectivityOptions: "Simple USB-A wired connection provides instant power and compatibility."
      }
    }
  },
  {
    id: "hp-kb-4",
    slug: "hp-225-eco-friendly-wired-keyboard-and-mouse",
    name: "HP 225 Eco-Friendly Wired Keyboard and Mouse Combo – USB Type A",
    image: "/hp-keyboard-and-keypad/11.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A sustainable and reliable wired keyboard and mouse combo, made with recycled materials without sacrificing performance.",
      design: {
        title: "Design",
        formFactor: "Full-size keyboard and a comfortable ambidextrous mouse. Both are built using post-consumer recycled plastics."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB Type-A cables"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "An eco-friendly choice for businesses and individuals. Offers a plug-and-play setup for any desktop environment.",
        connectivityOptions: "Connects via standard USB Type-A ports."
      }
    }
  },
  {
    id: "hp-kb-5",
    slug: "hp-225-keyboard-mouse-usb-cable",
    name: "HP 225 Keyboard & Mouse – USB Cable Keyboard – USB Cable Mouse –",
    image: "/hp-keyboard-and-keypad/12.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A dependable wired keyboard and mouse set, providing a straightforward and reliable solution for everyday computing.",
      design: {
        title: "Design",
        formFactor: "A full-size, spill-resistant keyboard paired with a precision optical mouse. Both feature a durable black finish."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cable (Keyboard)", "USB-A Cable (Mouse)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "This combo is built for longevity and ease of use. Ideal for office, school, or home environments.",
        connectivityOptions: "Separate USB-A cables for both the keyboard and mouse ensure simple, driver-free setup."
      }
    }
  },
  {
    id: "hp-kb-6",
    slug: "hp-225-wireless-keyboard-with-numeric",
    name: "HP 225 Wireless Keyboard with Numeric Keypad – UK Layout",
    image: "/hp-keyboard-and-keypad/17.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A sleek, wireless keyboard designed for a clutter-free workspace, featuring a full numeric keypad and a UK layout.",
      design: {
        title: "Design",
        formFactor: "A full-size wireless keyboard with a standard UK (QWERTY) layout and an integrated numeric keypad."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Frees your desk from cables. The numeric keypad is essential for fast data entry in spreadsheets and financial applications.",
        connectivityOptions: "A single, tiny USB-A dongle provides a reliable 2.4GHz wireless connection."
      }
    }
  },
  {
    id: "hp-kb-7",
    slug: "hp-235-wireless-keyboard-mouse",
    name: "HP 235 Wireless Keyboard & Mouse Combo – Black, 1600 DPI, Long Battery Life",
    image: "/hp-keyboard-and-keypad/3.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A reliable wireless keyboard and mouse combo designed for freedom and productivity, featuring a high-precision mouse and long battery life.",
      design: {
        title: "Design",
        formFactor: "A full-size, spill-resistant keyboard with a comfortable, ambidextrous mouse. Both in a sleek black finish."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["2.4GHz RF via single USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The 1600 DPI mouse offers precise tracking, while the long battery life ensures you're always ready to work. Chiclet-style keys provide quiet typing.",
        connectivityOptions: "A single USB receiver connects both the keyboard and mouse, saving a USB port."
      }
    }
  },
  {
    id: "hp-kb-8",
    slug: "hp-320mk-keyboard-mouse-english-usb",
    name: "HP 320MK Keyboard & Mouse – English – USB Cable – USB Cable Mouse",
    image: "/hp-keyboard-and-keypad/11.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A professional-grade wired keyboard and mouse combo, specifically designed for reliability and ease of use in a business environment.",
      design: {
        title: "Design",
        formFactor: "A full-size, spill-resistant keyboard with a standard English layout, paired with a comfortable optical mouse."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cable (Keyboard)", "USB-A Cable (Mouse)"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A durable, no-nonsense combo that's perfect for commercial deployment, offering plug-and-play simplicity and reliability.",
        connectivityOptions: "Wired USB-A connections ensure a stable, lag-free experience with no batteries required."
      }
    }
  },
  {
    id: "hp-kb-9",
    slug: "hp-320mk-usb-wired-keyboard-mouse",
    name: "HP 320MK USB Wired Keyboard & Mouse Combo for Windows Notebooks – Ergonomic, Quiet & Optical",
    image: "/hp-keyboard-and-keypad/12.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "The HP 320MK combo provides a comfortable and quiet typing experience, making it an ideal companion for Windows notebooks in any office.",
      design: {
        title: "Design",
        formFactor: "An ergonomically designed full-size keyboard with quiet-touch keys, plus a precision optical mouse."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cables"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Designed for all-day use, this combo's quiet keys minimize distractions, while the optical mouse provides smooth, accurate tracking.",
        connectivityOptions: "A simple, wired USB setup for instant compatibility with Windows laptops and desktops."
      }
    }
  },
  {
    id: "hp-kb-10",
    slug: "hp-405-backlit-wired-keyboard-usb-a-usb",
    name: "HP 405 Backlit Wired Keyboard: USB-A & USB-C, LED Glow",
    image: "/hp-keyboard-and-keypad/13.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A modern, versatile wired keyboard featuring a subtle LED backlight and a dual USB-A/USB-C connector for universal compatibility.",
      design: {
        title: "Design",
        formFactor: "A slim, full-size keyboard with backlit keys that provide a soft 'LED glow' for low-light environments."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["Attached USB cable with both USB-A and USB-C connectors"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The dual-head connector makes this keyboard future-proof, allowing it to connect to any PC, whether it has traditional USB-A or modern USB-C ports.",
        connectivityOptions: "Backlighting and a flexible connector make this an ideal choice for any modern workstation."
      }
    }
  },
  {
    id: "hp-kb-11",
    slug: "hp-455-programmable-wl-kbd",
    name: "HP 455 PROGRAMMABLE WL KBD",
    image: "/hp-keyboard-and-keypad/6.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A full-size wireless keyboard designed for productivity, featuring customizable shortcut keys to streamline your workflow.",
      design: {
        title: "Design",
        formFactor: "A full-size wireless keyboard with a standard layout, plus a bank of programmable keys for macros and shortcuts."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Boost your efficiency by programming keys to launch apps, insert text, or execute complex commands with a single press.",
        connectivityOptions: "Connects wirelessly via a reliable 2.4GHz USB dongle."
      }
    }
  },
  {
    id: "hp-kb-12",
    slug: "hp-475-dual-mode-wireless-keyboard-jet",
    name: "HP 475 Dual-Mode Wireless Keyboard: Jet Black, Bluetooth, USB-A, Eco-Friendly Design",
    image: "/hp-keyboard-and-keypad/19.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A versatile, eco-friendly wireless keyboard that connects to multiple devices via Bluetooth or USB dongle.",
      design: {
        title: "Design",
        formFactor: "A slim, Jet Black keyboard made with recycled materials. Features a full-size layout in a compact footprint."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["Dual-Mode: Bluetooth 5.0 (supports 2 devices)", "2.4GHz RF via USB-A dongle (1 device)"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Connect to and easily switch between up to three devices (1 via USB, 2 via Bluetooth). An eco-friendly choice for a multi-device workflow.",
        connectivityOptions: "Flexible wireless connectivity for your laptop, tablet, and phone."
      }
    }
  },
  {
    id: "hp-kb-13",
    slug: "hp-4b5-keyboard-cable-connectivity-usb-type",
    name: "HP 485 Keyboard – Cable Connectivity – USB Type A Interface – English (UK)",
    image: "/hp-keyboard-and-keypad/10.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium, wired keyboard with an English (UK) layout, designed for a comfortable and responsive typing experience.",
      design: {
        title: "Design",
        formFactor: "A sleek, full-size keyboard with a durable chassis and quiet, low-profile keys. English (UK) layout."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB Type-A Cable"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A high-quality, reliable wired keyboard for professional environments, offering a premium feel and simple setup.",
        connectivityOptions: "Connects instantly to any PC or notebook via a standard USB-A port."
      }
    }
  },
  {
    id: "hp-kb-14",
    slug: "hp-655-keyboard-mouse-usb-type-a",
    name: "HP 655 Keyboard & Mouse – USB Type A Wireless RF Keyboard",
    image: "/hp-keyboard-and-keypad/5.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium wireless keyboard and mouse combo offering a comfortable design and reliable connectivity for a professional workspace.",
      design: {
        title: "Design",
        formFactor: "A full-size keyboard with quiet keys and an ergonomically designed mouse. Both connect via a single receiver."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["2.4GHz Wireless RF via USB Type-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "This combo provides a clutter-free desk with a single dongle for both devices, offering a comfortable and productive typing experience.",
        connectivityOptions: "The 2.4GHz RF connection ensures a stable, lag-free performance."
      }
    }
  },
  {
    id: "hp-kb-15",
    slug: "hp-655-wireless-keyboard-and-mouse",
    name: "HP 655 Wireless Keyboard and Mouse Combo: Comfort, Productivity, and Sustainability",
    image: "/hp-keyboard-and-keypad/3.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An eco-friendly wireless keyboard and mouse set, built with recycled materials and designed for all-day comfort and productivity.",
      design: {
        title: "Design",
        formFactor: "A full-size, quiet-key keyboard and an ergonomic mouse, both made with a significant percentage of post-consumer recycled plastics."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A sustainable and comfortable choice for any workspace. Features long battery life and a reliable wireless connection.",
        connectivityOptions: "A single USB-A dongle connects both devices to free up your computer's ports."
      }
    }
  },
  {
    id: "hp-kb-16",
    slug: "hp-685-comfort-dualmode-keyboard",
    name: "HP 685 Comfort DualMode Keyboard: Wireless & AI-Enhanced",
    image: "/hp-keyboard-and-keypad/10.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium, ergonomically designed wireless keyboard featuring dual-mode connectivity and AI-enhanced smart features.",
      design: {
        title: "Design",
        formFactor: "An ergonomic 'comfort' design, possibly split or curved, to promote a natural typing posture. Full-size layout."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["Dual-Mode: Bluetooth", "2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Designed for power users, this keyboard features AI-driven shortcuts and can switch between multiple devices (via Bluetooth and RF).",
        connectivityOptions: "Flexible dual-mode wireless connectivity for a seamless workflow across devices."
      }
    }
  },
  {
    id: "hp-kb-17",
    slug: "hp-6b5-keyboard-mouse-english-uk",
    name: "HP 685 Keyboard & Mouse – English (UK) – USB Type A Wireless Bluetooth/RF 2.40 GHz Keyboard",
    image: "/hp-keyboard-and-keypad/9.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium, dual-mode wireless keyboard and mouse combo with an English (UK) layout and AI-enhanced features.",
      design: {
        title: "Design",
        formFactor: "A full-size ergonomic 'comfort' keyboard (UK layout) paired with a precision mouse."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["Dual-Mode: Bluetooth", "2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The ultimate productivity combo for UK users, offering ergonomic comfort, multi-device switching, and smart, AI-driven shortcuts.",
        connectivityOptions: "Connect and switch between your PC, laptop, and tablet with ease."
      }
    }
  },
  {
    id: "hp-kb-18",
    slug: "hp-725-multi-device-rechargeable-wireless",
    name: "HP 725 Multi-Device Rechargeable Wireless Keyboard and Mouse Combo",
    image: "/hp-keyboard-and-keypad/1.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium, rechargeable wireless keyboard and mouse set, designed for power users who work across multiple devices.",
      design: {
        title: "Design",
        formFactor: "A sleek, slim, and compact keyboard paired with a sculpted mouse. Both are rechargeable via USB-C."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C (for charging)"],
        wireless: ["Multi-Device: Bluetooth (up to 3 devices)"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Seamlessly switch between your laptop, tablet, and smartphone with the press of a button. The rechargeable design eliminates battery waste.",
        connectivityOptions: "Connects to up to three devices simultaneously via Bluetooth."
      }
    }
  },
  {
    id: "hp-kb-19",
    slug: "hp-950mk-wireless-rechargeable-keyboard",
    name: "HP 950MK Wireless Rechargeable Keyboard and Mouse Combo",
    image: "/hp-keyboard-and-keypad/5.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "An executive-class wireless keyboard and mouse combo, featuring a premium build, rechargeable batteries, and smart, customizable features.",
      design: {
        title: "Design",
        formFactor: "A full-size, slim keyboard with a premium metallic finish and a matching rechargeable mouse with a precision scroll wheel."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C (for charging)"],
        wireless: ["Bluetooth", "2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A top-tier set for discerning professionals, offering multi-device connectivity, programmable keys, and a luxurious typing experience.",
        connectivityOptions: "Dual-mode wireless allows for flexible connections across multiple devices."
      }
    }
  },
  {
    id: "hp-kb-20",
    slug: "hp-975-rugged-keyboard-wireless",
    name: "HP 975 Rugged Keyboard: Wireless Bluetooth & RF Connectivity for PC and Mac",
    image: "/hp-keyboard-and-keypad/7.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A premium, rugged wireless keyboard designed for durability and multi-device productivity, compatible with both PC and Mac.",
      design: {
        title: "Design",
        formFactor: "A full-size keyboard with a ruggedized, spill-resistant chassis. Features customizable backlighting."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C (for charging)"],
        wireless: ["Dual-Mode: Bluetooth", "2.4GHz RF via USB-A dongle"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Combines rugged durability with premium features like rechargeable batteries, smart backlighting, and multi-device switching.",
        connectivityOptions: "Connect and switch between your PC, Mac, and tablet with dual-mode wireless."
      }
    }
  },
  {
    id: "hp-kb-21",
    slug: "hp-compact-355-rugged-keyboard-wireless",
    name: "HP Compact 355 Rugged Keyboard: Wireless Bluetooth Typing for Desktop, Laptop, and Mobile",
    image: "/hp-keyboard-and-keypad/8.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A durable and compact wireless keyboard, built to withstand spills and drops while offering flexible Bluetooth connectivity.",
      design: {
        title: "Design",
        formFactor: "A compact, tenkeyless (TKL) design that saves-desk space. Spill-resistant and ruggedized for durability."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["N/A"],
        wireless: ["Bluetooth"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A perfect keyboard for mobile professionals, field workers, or busy environments. Its compact, rugged design pairs easily with laptops and tablets.",
        connectivityOptions: "Connects wirelessly to any Bluetooth-enabled desktop, laptop, or mobile device."
      }
    }
  },
  {
    id: "hp-kb-22",
    slug: "hp-wired-desktop-320k-keyboard-usb",
    name: "HP Wired Desktop 320K Keyboard – USB Connectivity, English (UK) for Desktop Computers",
    image: "/hp-keyboard-and-keypad/13.jpg",
    category: "HP Keyboards & Keypads",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A reliable, full-size wired keyboard with an English (UK) layout, designed for straightforward business and desktop use.",
      design: {
        title: "Design",
        formFactor: "A full-size, spill-resistant keyboard with a standard English (UK) layout and integrated numeric keypad."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-A Cable"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A durable and cost-effective solution for any desktop computer. The plug-and-play USB connection ensures instant setup.",
        connectivityOptions: "Standard USB-A cable for universal compatibility with desktop computers."
      }
    }
  },
  // --- END OF HP KEYBOARDS & KEYPADS ---

  // --- NEW: HP PRINTERS (2 PRODUCTS) ---
  {
    id: "hp-print-1",
    slug: "hp-color-laserjet-pro-mfp-m183fw",
    name: "HP LaserJet Pro M501dn – J8H61A#BGJ",
    image: "/hp-printers/2.jpg",
    category: "HP Printer, Printers",
    categorySlug: "printers",
    price: "Get a Quote",
    description: {
      overview: "An efficient, wireless multifunction color laser printer designed for small businesses, offering print, copy, scan, and fax capabilities.",
      design: {
        title: "Design",
        formFactor: "A compact multifunction printer (MFP) with an automatic document feeder (ADF) and a simple LCD control panel."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "256 MB DDR",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "2-Line LCD with numeric keypad",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["Hi-Speed USB 2.0", "Fast Ethernet 10/100Base-TX", "Fax port"],
        wireless: ["Dual-band Wi-Fi 802.11n", "Wi-Fi Direct"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Provides high-quality color printing, scanning, and copying. The HP Smart app allows for easy mobile printing and scanning.",
        connectivityOptions: "Flexible connectivity with Ethernet, Wi-Fi, and Wi-Fi Direct for easy sharing."
      }
    }
  },
  {
    id: "hp-print-2",
    slug: "hp-officejet-200-mobile-printer-j8h61a",
    name: "HP Officejet 200 Mobile Printer, Color – CZ993A#BHC",
    image: "/hp-printers/1.jpg",
    category: "HP Printer, Printers",
    categorySlug: "printers",
    price: "Get a Quote",
    description: {
      overview: "A compact and portable printer that lets you print professional-quality documents on the go, directly from your laptop or mobile device.",
      design: {
        title: "Design",
        formFactor: "A lightweight, portable printer designed to fit in a backpack or suitcase. Features a long-lasting rechargeable battery."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "128 MB DDR3",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "2.0-inch Hi-Res Mono Graphic Display",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB 2.0"],
        wireless: ["Wi-Fi Direct", "802.11b/g/n"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Ideal for mobile professionals who need to print invoices, contracts, or presentations anywhere. Fast charging and quiet performance.",
        connectivityOptions: "Easily print from your laptop, smartphone, or tablet using Wi-Fi Direct, no network needed."
      }
    }
  },
  // --- END OF HP PRINTERS ---

  // --- NEW: HP WORKSTATIONS (14 PRODUCTS) ---
  {
    id: "hp-ws-1",
    slug: "hp-pro-290-g9-intel-core-i5-6z3w1et",
    name: "HP Pro 290 G9 Intel® Core™ i5 – 623W1ET#ABU",
    image: "/hp-workstation/1.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A reliable and affordable tower PC designed for essential business productivity, powered by an Intel Core i5 processor.",
      design: {
        title: "Design",
        formFactor: "A standard Microtower (MT) chassis in black, offering easy access to internals and room for expansion."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i5 processor for solid performance in everyday office tasks.",
        memory: "Configured with DDR4 RAM for efficient multitasking.",
        storage: "Fast NVMe SSD for quick boot times and application loading."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Connects to external monitors)",
        graphics: "Integrated Intel UHD Graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["HDMI", "VGA", "USB 3.1", "USB 2.0", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A cost-effective desktop for small businesses and enterprise deployments needing a dependable work PC.",
        connectivityOptions: "A mix of modern and legacy ports for broad peripheral compatibility."
      }
    }
  },
  {
    id: "hp-ws-2",
    slug: "hp-pro-400-g9-intel-core-i5",
    name: "HP Pro 400 G9 Intel® Core™ i5 – 623W9ET#ABU",
    image: "/hp-workstation/2.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A compact and powerful Mini PC designed for the modern workspace, delivering full-sized desktop performance in a tiny chassis.",
      design: {
        title: "Design",
        formFactor: "A sleek, Mini Form Factor (MFF) desktop that can be VESA mounted behind a monitor or placed discreetly on a desk."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i5 processor (likely 12th or 13th Gen) for robust business performance.",
        memory: "DDR4 SODIMM RAM.",
        storage: "Fast M.2 NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Connects to external monitors)",
        graphics: "Integrated Intel UHD or Iris Xe Graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB 3.2", "DisplayPort", "HDMI", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6", "Bluetooth"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Ideal for open offices, remote work, or digital signage. Runs quietly and efficiently while handling demanding tasks.",
        connectivityOptions: "A full suite of modern ports and fast wireless connectivity."
      }
    }
  },
  {
    id: "hp-ws-3",
    slug: "hp-tower-windows-11-pro-core-i9-14th-gen",
    name: "HP Tower Windows 11 Pro Core i9 14th Gen i9 – Intel W680 Chip-996Y7ET#ABU",
    image: "/hp-workstation/5.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A high-performance desktop tower solution, likely an HP Elite or Pro series, powered by a top-of-the-line 14th Gen Intel Core i9 processor.",
      design: {
        title: "Design",
        formFactor: "A collection of HP tower desktops, showcasing various sizes from Small Form Factor (SFF) to full-size Towers."
      },
      performance: {
        title: "Performance",
        processor: "14th Gen Intel Core i9 processor, delivering elite performance for the most demanding applications.",
        memory: "High-speed DDR5 RAM.",
        storage: "Fast NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "High-performance integrated or optional discrete graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C/Thunderbolt", "USB 3.2", "DisplayPort", "HDMI", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "This is a powerhouse desktop for power users, developers, and creatives. Comes with Windows 11 Pro for business.",
        connectivityOptions: "A comprehensive set of high-speed ports for a demanding workflow."
      }
    }
  },
  {
    id: "hp-ws-4",
    slug: "hp-z1-g9-desktop-computer-intel-core-i9",
    name: "HP Z1 G9 Desktop Computer Intel Core i9 14th Gen i9-14900 -996V8ET#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "The HP Z1 G9 is a powerful and affordable tower workstation, certified for professional apps and powered by an Intel Core i9 processor.",
      design: {
        title: "Design",
        formFactor: "A full-size Tower (TWR) chassis designed for performance, cooling, and expandability."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i9 processor for high-end computing and content creation.",
        memory: "Supports DDR5 RAM for fast, responsive performance.",
        storage: "Multiple bays for M.2 NVMe SSDs and traditional HDDs."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports professional discrete graphics cards (e.g., NVIDIA RTX A-series)."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB 3.2 Gen 2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "An accessible workstation for 3D design, photo/video editing, and advanced data analysis. ISV certified for reliability.",
        connectivityOptions: "Ample ports and internal expansion slots for growing workflows."
      }
    }
  },
  {
    id: "hp-ws-5",
    slug: "hp-z2-g9-workstation-core-i7-14th-gen",
    name: "HP Z2 G9 Workstation – 1 Core i7 14th Gen i7 – Intel i7-14700 – 996Y3ET#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A high-performance HP Z2 G9 Tower Workstation, equipped with a 14th Gen Intel Core i7 processor for demanding professional workflows.",
      design: {
        title: "Design",
        formFactor: "A robust Tower (TWR) workstation chassis, engineered for reliability, cooling, and tool-less access to components."
      },
      performance: {
        title: "Performance",
        processor: "14th Gen Intel Core i7 processor for blazing-fast performance in CAD, BIM, and rendering.",
        memory: "High-speed DDR5 ECC or non-ECC RAM.",
        storage: "Fast NVMe SSD storage for OS and applications."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports powerful professional NVIDIA or AMD discrete graphics cards."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB 3.2 Gen 2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The industry-standard workstation for architects, engineers, and product designers. ISV certified for reliability.",
        connectivityOptions: "Extensive I/O and expansion capabilities for professional-grade peripherals."
      }
    }
  },
  {
    id: "hp-ws-6",
    slug: "hp-z2-g9-workstation-i7-14700-16gb",
    name: "HP Z2 G9 Workstation ? Intel i7-14700, 16GB RAM, 1TB SSD – 8T1R4EA#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A well-balanced configuration of the HP Z2 G9 Tower Workstation, featuring the Intel Core i7-14700 processor and 16GB of RAM.",
      design: {
        title: "Design",
        formFactor: "A professional Tower (TWR) workstation designed for performance and expandability."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i7-14700 processor, offering a high core count for heavy multitasking.",
        memory: "16GB of DDR5 RAM for professional applications.",
        storage: "High-speed NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Configured with professional-grade discrete graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A great starting point for 2D/3D CAD and design, offering a powerful CPU and the ability to upgrade memory and graphics later.",
        connectivityOptions: "A full set of ports for a professional design or engineering setup."
      }
    }
  },
  {
    id: "hp-ws-7",
    slug: "hp-z2-g9-workstation-i7-14700-32gb",
    name: "HP Z2 G9 Workstation ? Intel i7-14700, 32GB RAM, 1TB SSD – 996Y2ET#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A powerful HP Z2 G9 Tower Workstation configuration, ideal for professionals running large models or multiple applications.",
      design: {
        title: "Design",
        formFactor: "The industry-leading Z2 Tower (TWR) chassis, providing excellent airflow and tool-less component access."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i7-14700 processor for high-frequency performance.",
        memory: "32GB of high-speed DDR5 RAM, perfect for large datasets and complex renders.",
        storage: "Fast NVMe SSD storage."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Equipped with a professional NVIDIA or AMD discrete graphics card."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "This 32GB configuration is aimed at serious professionals who need smooth performance in memory-intensive applications.",
        connectivityOptions: "ISV-certified reliability with extensive connectivity."
      }
    }
  },
  {
    id: "hp-ws-8",
    slug: "hp-z2-g9-workstation-intel-i7-14700",
    name: "HP Z2 G9 Workstation | Intel i7-14700 | 996V7ET#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A baseline HP Z2 G9 Tower Workstation featuring the powerful 14th Gen Intel Core i7-14700 processor.",
      design: {
        title: "Design",
        formFactor: "A durable and expandable Tower (TWR) workstation, the industry benchmark for reliability."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i7-14700 processor, providing a significant boost in multi-core performance.",
        memory: "Configurable with DDR5 RAM.",
        storage: "Configurable with M.2 NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports a wide range of professional discrete graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A highly customizable workstation for architects, engineers, and designers who demand ISV-certified performance.",
        connectivityOptions: "A platform built for expansion and pro-grade connectivity."
      }
    }
  },
  {
    id: "hp-ws-9",
    slug: "hp-z2-g9-workstation-intel-i7-14700k",
    name: "HP Z2 G9 Workstation | Intel i7-14700K | 996V4ET#ABU",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A high-frequency HP Z2 G9 Tower Workstation, equipped with an unlocked Intel Core i7-14700K processor for maximum single-thread performance.",
      design: {
        title: "Design",
        formFactor: "A Tower (TWR) workstation with enhanced cooling to handle the unlocked 'K' series processor."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i7-14700K processor, ideal for workflows that benefit from the highest clock speeds (e.g., 3D modeling, CAD).",
        memory: "High-speed DDR5 RAM.",
        storage: "Fast NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports high-end NVIDIA or AMD professional graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Engineered for designers, architects, and power users who need elite performance for frequency-bound applications.",
        connectivityOptions: "A robust platform for a high-end, reliable workstation."
      }
    }
  },
  {
    id: "hp-ws-10",
    slug: "hp-z2-g9-workstation-intel-i9-14900k-rtx",
    name: "HP Z2 G9 Workstation | Intel i9-14900K | RTX A2000 12GB | 32GB RAM | 1TB SSD",
    image: "/hp-workstation/4.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "The pinnacle of the Z2 G9 Tower series, this workstation combines the top-tier Intel Core i9-14900K processor with a powerful NVIDIA RTX graphics card.",
      design: {
        title: "Design",
        formFactor: "A Tower (TWR) workstation with a high-performance power supply and advanced thermal solution to manage the i9-14900K."
      },
      performance: {
        title: "Performance",
        processor: "Unlocked Intel Core i9-14900K, the ultimate processor for single- and multi-threaded performance.",
        memory: "32GB or more of high-speed DDR5 RAM.",
        storage: "Top-tier NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "A high-end professional NVIDIA RTX graphics card for real-time rendering and VR."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C/Thunderbolt", "USB-A 3.2 Gen 2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "An elite workstation for simulation, real-time ray tracing, and 8K video editing. Uncompromising performance.",
        connectivityOptions: "Maximum connectivity for the most demanding professional workflows."
      }
    }
  },
  {
    id: "hp-ws-11",
    slug: "hp-z2-g9-workstation-intel-w680-chip",
    name: "HP Z2 G9 Workstation | Intel W680 Chip | 996V6ET#ABU",
    image: "/hp-workstation/6.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A HP Z2 G9 Tower Workstation built on the Intel W680 chipset, enabling support for ECC (Error-Correcting Code) memory.",
      design: {
        title: "Design",
        formFactor: "The expandable and reliable Tower (TWR) chassis, configurable for enterprise-grade components."
      },
      performance: {
        title: "Performance",
        processor: "Supports Intel Core processors (12th/13th/14th Gen) and the W680 chipset.",
        memory: "Supports both DDR5 ECC and non-ECC memory for enhanced data integrity.",
        storage: "NVMe SSD and SATA HDD bays."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports professional discrete graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Optional Wi-Fi 6E"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Ideal for scientific computing, financial modeling, and critical tasks where data integrity is paramount, thanks to ECC memory support.",
        connectivityOptions: "A professional-grade, expandable, and ISV-certified platform."
      }
    }
  },
  {
    id: "hp-ws-12",
    slug: "hp-z2-mini-g9-workstation-1-core-i7",
    name: "HP Z2 Mini G9 Workstation – 1 Core i7 14th Gen i7-14700K – 996W9ET#ABU",
    image: "/hp-workstation/3.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "A remarkably powerful mini workstation that fits in the palm of your hand, featuring an Intel Core i7 processor and professional graphics.",
      design: {
        title: "Design",
        formFactor: "An ultra-compact Mini PC, VESA mountable to the back of a monitor. Designed for a completely hidden, zero-footprint setup."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i7 processor (desktop-class) for pro-level performance.",
        memory: "DDR5 SODIMM RAM.",
        storage: "Fast M.2 NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports low-profile professional NVIDIA RTX graphics for 3D modeling."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C/Thunderbolt", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The perfect workstation for CAD, architecture, or command centers where space is at a premium but performance is essential.",
        connectivityOptions: "Drives multiple 4K displays and provides high-speed I/O in a tiny package."
      }
    }
  },
  {
    id: "hp-ws-13",
    slug: "hp-z2-mini-g9-workstation-compact",
    name: "HP Z2 Mini G9 Workstation ? Compact Powerhouse for 3D & Pro Workflows",
    image: "/hp-workstation/3.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "The HP Z2 Mini G9 redefines the workstation by packing incredible performance into an impossibly small, compact, and versatile design.",
      design: {
        title: "Design",
        formFactor: "An extremely compact Mini workstation that can be VESA mounted, placed on a stand, or racked (with adapter)."
      },
      performance: {
        title: "Performance",
        processor: "Supports desktop-class Intel Core processors (up to i9).",
        memory: "Up to 64GB of DDR5 SODIMM RAM.",
        storage: "Up to 2 M.2 NVMe SSDs."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports low-profile NVIDIA RTX A-series graphics."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C/Thunderbolt", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A powerhouse for 3D design, trading floors, and OEM applications. ISV-certified for reliable performance.",
        connectivityOptions: "Drives multi-display setups with ease and offers high-speed Thunderbolt connectivity."
      }
    }
  },
  {
    id: "hp-ws-14",
    slug: "hp-z2-mini-g9-workstation-i9-14900k",
    name: "HP Z2 Mini G9 Workstation | i9-14900K, RTX A2000 12GB, 32GB RAM, 1TB SSD",
    image: "/hp-workstation/3.jpg",
    category: "HP Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "An elite-performance HP Z2 Mini G9 workstation, configured with a top-of-the-line Intel Core i9 processor (likely i9-14900).",
      design: {
        title: "Design",
        formFactor: "The ultimate compact workstation, VESA mountable and designed for extreme performance in tight spaces."
      },
      performance: {
        title: "Performance",
        processor: "Intel Core i9 processor (14th Gen) for maximum computing power in a mini form factor.",
        memory: "High-speed DDR5 SODIMM RAM (e.g., 32GB or 64GB).",
        storage: "High-speed M.2 NVMe SSD."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Paired with a low-profile NVIDIA RTX professional graphics card."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["USB-C/Thunderbolt", "USB-A 3.2", "DisplayPort", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "An uncompromising mini-workstation for high-end rendering, complex design, and power-hungry applications.",
        connectivityOptions: "The best-in-class performance and connectivity in a mini PC."
      }
    }
  },
  // --- END OF HP WORKSTATIONS ---

  // --- NEW: LENOVO DOCKING STATIONS (3 PRODUCTS) ---
  {
    id: "lenovo-dock-1",
    slug: "lenovo-thinkpad-universal-usb-c-dock-40ay0090us",
    name: "Lenovo laptop dock/port – 40AY0090US",
    image: "/lenovo-docking-station/1.jpg",
    category: "Lenovo, Docking Station,",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A universal USB-C dock designed to work with both ThinkPad and non-Lenovo laptops, providing a single-cable solution for video, data, and power.",
      design: {
        title: "Design",
        formFactor: "A compact, rectangular docking station (model 40AY0090US) that sits on the desk to provide easy port access."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Uses USB-C DisplayPort Alt-Mode)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports up to dual 4K displays or a single 5K display on compatible systems).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C (host)", "2x DisplayPort 1.4", "1x HDMI 2.0", "3x USB-A 3.1", "2x USB 2.0", "1x USB-C (data/power)", "1x RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Delivers up to 65W of power to charge your laptop while you work. Universally compatible with most USB-C laptops.",
        connectivityOptions: "A true one-cable workstation solution for a clean and productive desk."
      }
    }
  },
  {
    id: "lenovo-dock-2",
    slug: "lenovo-thinkpad-ultra-docking-station",
    name: "Lenovo laptop dock/port replicator Docking – 40AJ0135US",
    image: "/lenovo-docking-station/3.jpg",
    category: "Lenovo, Docking Station,",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A professional, side-connecting mechanical dock for compatible ThinkPad laptops, offering enterprise-grade connectivity and security.",
      design: {
        title: "Design",
        formFactor: "A 'slide-and-click' mechanical dock that the ThinkPad connects to directly. Features a key-lock for security."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Direct pass-through connection)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports multiple displays, often up to three 4K monitors, depending on the laptop's graphics).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["Multiple USB 3.1", "USB-C", "2x DisplayPort", "1x HDMI", "1x VGA", "1x RJ-45 Ethernet", "Stereo/Mic Combo Jack"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Provides instant, driver-free port replication and charging for compatible ThinkPad laptops. The security lock is ideal for open offices.",
        connectivityOptions: "A wide array of modern and legacy ports for total peripheral compatibility."
      }
    }
  },
  {
    id: "lenovo-dock-3",
    slug: "lenovo-thinkpad-hybrid-usb-c-with-usb-a-dock",
    name: "Lenovo ThinkPad Hybrid USB-C with USB-A Dock – 40AF0135US",
    image: "/lenovo-docking-station/2.jpg",
    category: "Lenovo, Docking Station",
    categorySlug: "accessories",
    price: "Get a Quote",
    description: {
      overview: "A truly universal dock designed for any organization with a mixed-laptop environment, supporting both new USB-C and older USB-A laptops.",
      design: {
        title: "Design",
        formFactor: "A compact rectangular dock with a unique split-tip cable that has both a USB-C and a USB-A connector."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Uses DisplayLink technology for universal compatibility)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Supports up to dual 4K displays, regardless of the laptop's native graphics capabilities, thanks to DisplayLink).",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["1x USB-C/A (host)", "1x USB-C", "3x USB-A 3.1", "2x USB 2.0", "2x DisplayPort", "2x HDMI", "1x RJ-45 Ethernet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The perfect 'hot desking' solution. Any user can connect and get a dual-monitor setup, whether they have a new MacBook or an older PC.",
        connectivityOptions: "Provides power over USB-C and uses DisplayLink drivers for universal video support."
      }
    }
  },
  // --- END OF LENOVO DOCKING STATIONS ---

  // --- NEW: LENOVO WORKSTATIONS (3 PRODUCTS) ---
  {
    id: "lenovo-ws-1",
    slug: "lenovo-thinkstation-p3-tiny-workstation",
    name: "Lenovo ThinkCentre M70a Gen 3 Intel® – 11VL001MUK",
    image: "/lenovo-workstation/1.jpg",
    category: "Lenovo, Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "An astonishingly small 1L workstation, the ThinkStation P3 Tiny delivers professional-grade performance in a chassis 96% smaller than a traditional desktop.",
      design: {
        title: "Design",
        formFactor: "A 1-liter 'Tiny' form factor that can be VESA mounted, placed on a desk, or hidden away for a zero-footprint solution."
      },
      performance: {
        title: "Performance",
        processor: "Supports desktop-class Intel Core processors (e.g., i7, i9) for powerful performance.",
        memory: "Up to 64GB of high-speed DDR5 SODIMM RAM.",
        storage: "Dual M.2 NVMe SSD slots for fast, high-capacity storage."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A (Connects to external monitors)",
        graphics: "Supports professional discrete graphics, such as the NVIDIA T400 or T1000, for CAD and 3D modeling."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["Thunderbolt 4 / USB-C", "USB-A 3.2", "DisplayPort", "HDMI", "RJ-45 Ethernet"],
        wireless: ["Wi-Fi 6E", "Bluetooth 5.3"]
      },
      functionality: {
        title: "Functionality",
        versatility: "The world's smallest ISV-certified workstation, perfect for architecture, finance, and OEM solutions where space is critical.",
        connectivityOptions: "Drives multiple 4K displays and offers robust I/O despite its miniature size."
      }
    }
  },
  {
    id: "lenovo-ws-3",
    slug: "lenovo-thinkstation-p620-amd-threadripper-pro",
    name: "Lenovo ThinkCentre neo 50q Intel® – 12LN000AUK",
    image: "/lenovo-workstation/3.jpg",
    category: "Lenovo, Workstation",
    categorySlug: "workstations",
    price: "Get a Quote",
    description: {
      overview: "The world's first AMD Ryzen Threadripper PRO workstation, delivering the ultimate in performance with up to 64 cores for unrivaled multitasking and rendering.",
      design: {
        title: "Design",
        formFactor: "A premium, full-size tower workstation with an advanced thermal design to cool the Threadripper PRO CPU."
      },
      performance: {
        title: "Performance",
        processor: "AMD Ryzen Threadripper PRO (up to 64 cores and 128 threads) for extreme processing power.",
        memory: "Up to 1TB of 8-channel RDIMM ECC memory.",
        storage: "Massive storage potential with multiple M.2 and 3.5-inch drive bays."
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "Supports up to two high-end NVIDIA RTX A6000 or GeForce RTX 4090 graphics cards."
      },
      connectivity: {
        title: "Connectivity",
        ports: ["PCIe Gen 4 slots", "10GbE built-in Ethernet", "USB 3.2 Gen 2 (Type-A and Type-C)"],
        wireless: ["Optional Wi-Fi 6"]
      },
      functionality: {
        title: "Functionality",
        versatility: "An elite workstation for media & entertainment (8K editing), data science, and complex simulations that require maximum core count.",
        connectivityOptions: "Unmatched performance and connectivity, including built-in 10 Gigabit Ethernet."
      }
    }
  },
  // --- END OF LENOVO WORKSTATIONS ---

  // --- NEW: HP SWITCHES (10 PRODUCTS) ---
  {
    id: "hp-sw-1",
    slug: "aruba-2930m-48g-poe-1-slot-managed-l3",
    name: "Aruba 2930M 48G PoE+ 1-slot Managed L3 – JL322A",
    image: "/hp-switches/8.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A powerful and scalable Layer 3 access switch from the Aruba 2930M series, designed for high-performance enterprise networks.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch with 48x Gigabit PoE+ ports and a 1-slot for uplink modules (e.g., SFP+ or Multi-Gigabit)."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Features Virtual Switching Framework - VSF - stacking)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["48x 10/100/1000 PoE+ ports", "1x Uplink Module Slot", "1x Stacking Module Slot"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A high-performance switch with advanced Layer 3 routing, VSF stacking, and a modular uplink slot for flexible, high-speed connections.",
        connectivityOptions: "Ideal for enterprise edge, supporting robust PoE+ and modular 10G or 40G uplinks."
      }
    }
  },
  {
    id: "hp-sw-2",
    slug: "aruba-6100-48g-class4-poe-4sfp-370w",
    name: "Aruba 6100 48G Class4 PoE 4SFP+ 370W Managed – JL675A",
    image: "/hp-switches/5.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "An entry-level Layer 2 switch series from Aruba CX, providing reliable and simple access for small businesses and branch offices.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch with 48x Gigabit ports, 4x SFP+ 10G uplink ports, and a 370W PoE budget."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["48x 10/100/1000 PoE+ (Class 4) ports", "4x 1/10G SFP+ uplink ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A cost-effective switch for connecting APs, cameras, and IoT devices. The 370W PoE budget provides ample power.",
        connectivityOptions: "Features 10G SFP+ uplinks for high-speed connection to a network core."
      }
    }
  },
  {
    id: "hp-sw-3",
    slug: "aruba-cx-6300m-managed-l3-black",
    name: "Aruba CX 6300M Managed L3 Black – JL658A",
    image: "/hp-switches/4.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A high-performance, stackable Layer 3 switch from the Aruba CX 6300M series, offering advanced features and high-speed uplinks.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch, often with 24 or 48 ports and modular power supplies. Pictured in black."
      },
      performance: {
        title: "Performance",
        processor: "N/A (High-performance VSF stacking for up to 10 switches)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["Models available with Multi-Gigabit ports", "SFP+ (10G) or SFP28 (25G) uplink ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A powerful switch for enterprise campus and data center access, running the modern AOS-CX operating system.",
        connectivityOptions: "Supports high-speed 10G, 25G, and even 50G (via breakout) uplinks for a future-proof network."
      }
    }
  },
  {
    id: "hp-sw-4",
    slug: "aruba-instant-on-1960-48g-2xgt-2sfp",
    name: "Aruba Instant On 1960 48G 2XGT 2SFP+ – JL808A#ABA",
    image: "/hp-switches/6.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A smart-managed, stackable switch from the Instant On series, designed for high-bandwidth small businesses.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch with 48 Gigabit ports and a mix of copper and fiber high-speed uplinks."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Supports 4-high stacking)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["48x 10/100/1000 ports", "2x 10G-BaseT (Copper) ports", "2x 10G SFP+ (Fiber) ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Manageable via a simple mobile app or cloud portal. The mix of 10G copper and fiber uplinks provides flexible, high-speed connections.",
        connectivityOptions: "True stacking allows you to manage up to four switches as a single unit."
      }
    }
  },
  {
    id: "hp-sw-5",
    slug: "aruba-instant-on-1960-48g-40p-class4-8p",
    name: "Aruba Instant On 1960 48G 40p Class4 8p Class6 – JL809A#ABA",
    image: "/hp-switches/7.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A 48-port smart-managed, stackable switch with a mix of PoE+ (Class 4) and high-power PoE++ (Class 6) ports.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch with 48 Gigabit ports and high-speed uplink ports."
      },
      performance: {
        title: "Performance",
        processor: "N/A (High PoE budget)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["40x Gigabit PoE+ (Class 4) ports", "8x Gigabit PoE++ (Class 6) ports", "2x 10G-BaseT", "2x 10G SFP+"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Ideal for powering a mix of devices, from standard APs and phones (PoE+) to high-power pan-tilt-zoom cameras (PoE++).",
        connectivityOptions: "Features 10G copper and fiber uplinks, plus cloud-stacking capabilities."
      }
    }
  },
  {
    id: "hp-sw-6",
    slug: "hewlett-packard-enterprise-network-power-supply",
    name: "Hewlett Packard Enterprise network switch – JL087A",
    image: "/hp-switches/1.jpg",
    category: "HP Switches, Power Supply",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A modular power supply unit (PSU) for Hewlett Packard Enterprise (HPE) and Aruba network switches.",
      design: {
        title: "Design",
        formFactor: "A hot-swappable power supply unit designed to fit into the chassis of modular HPE/Aruba switches."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A (Provides AC power input)"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["AC Power Inlet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Provides primary or redundant power to an enterprise switch, ensuring network uptime and high availability.",
        connectivityOptions: "Allows for power redundancy by installing two units in a compatible switch."
      }
    }
  },
  {
    id: "hp-sw-7",
    slug: "hp-2930f-24g-poe-4sfp-managed-l3",
    name: "HP 2930F 24G PoE+ 4SFP – Managed – L3 – Gigabit – JL261A",
    image: "/hp-switches/2.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "The Aruba 2930F is a high-performance Layer 3 access switch with 24 Gigabit PoE+ ports and 1G SFP uplinks.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable, fanless switch (in this 24-port model) for silent operation in office spaces."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Supports VSF stacking)",
        memory: "N/A",
        storage: "N/A"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["24x 10/100/1000 PoE+ ports", "4x 1G SFP uplink ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "A workhorse for the enterprise edge, providing PoE+ for devices and Layer 3 static/RIP routing. Manageable via Aruba Central.",
        connectivityOptions: "4 SFP ports provide fiber uplink options for connecting to other network closets."
      }
    }
  },
  {
    id: "hp-sw-8",
    slug: "hp-2930f-48g-poe-4sfp-switch-fiber-optic",
    name: "HP 2930F 48G PoE+ 4SFP Switch – Fiber Optic – JL262A",
    image: "/hp-switches/3.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A Layer 3 managed switch with 48 Gigabit PoE+ ports and 4 SFP fiber optic uplink ports, built for the enterprise edge.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch with 48 ports, designed for high-density wiring closets."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Supports VSF stacking)",
        memory: "N/A",
        storage: "N/A (370W PoE budget)"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["48x 10/100/1000 PoE+ ports", "4x 1G SFP uplink ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Provides robust power and connectivity for a full office, supporting APs, phones, and cameras. Features Layer 3 routing.",
        connectivityOptions: "4 SFP ports allow for multiple fiber optic uplinks for redundancy or connecting to other buildings."
      }
    }
  },
  {
    id: "hp-sw-9",
    slug: "hp-aruba-2930f-48g-poe-4sfp-plus-managed-l3",
    name: "HP Aruba 2930F 48G PoE+ 4SFP+ Managed L3 – JL256A",
    image: "/hp-switches/3.jpg",
    category: "HP Switches, Switches",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "A powerful Layer 3 access switch with 48 Gigabit PoE+ ports and high-speed 10G SFP+ uplinks for a non-blocking network.",
      design: {
        title: "Design",
        formFactor: "A 1U rack-mountable switch designed for high-density, high-performance enterprise networks."
      },
      performance: {
        title: "Performance",
        processor: "N/A (Supports VSF stacking)",
        memory: "N/A",
        storage: "N/A (370W PoE budget)"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["48x 10/100/1000 PoE+ ports", "4x 1/10G SFP+ uplink ports"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "This is a future-proof switch. The 48 PoE+ ports power all edge devices, while the 10G uplinks prevent bottlenecks to the network core.",
        connectivityOptions: "Features Layer 3 routing, QoS, and cloud management via Aruba Central."
      }
    }
  },
  {
    id: "hp-sw-10",
    slug: "power-supply-jl088a",
    name: "Power Supply – JL086A",
    image: "/hp-switches/1.jpg",
    category: "HP Switches, Power Supply",
    categorySlug: "switches",
    price: "Get a Quote",
    description: {
      overview: "The HPE JL088A is a modular power supply unit, specifically the X372 54VDC 680W 100-240VAC Power Supply.",
      design: {
        title: "Design",
        formFactor: "A hot-swappable power supply unit designed for the Aruba 3810M and 2930M series switches."
      },
      performance: {
        title: "Performance",
        processor: "N/A",
        memory: "N/A",
        storage: "N/A (Provides 680W of power)"
      },
      display: {
        title: "Display and Graphics",
        screen: "N/A",
        graphics: "N/A"
      },
      connectivity: {
        title: "Connectivity",
        ports: ["AC Power Inlet"],
        wireless: ["N/A"]
      },
      functionality: {
        title: "Functionality",
        versatility: "Used to provide primary power or redundant N+1 power to a compatible switch, increasing its PoE budget and reliability.",
        connectivityOptions: "Allows for power supply redundancy, a critical feature for enterprise-grade network uptime."
      }
    }
  },
  // --- END OF HP SWITCHES ---
  // --- HOMEPAGE PRODUCTS (Added to fix "Not Found" error) ---

  // --- From Featured Products ---
  { 
    id: "hp-special-offer", 
    name: 'HP 14" EliteBook 640 G9 - 6C0Z3UT', 
    price: "Get a Quote", 
    image: '/images/products/hp-laptop.png', 
    category: 'Laptops, HP', 
    categorySlug: 'computers-and-laptops', 
    slug: 'hp-14-elitebook-640-g9-6c0z3ut', 
    description: {
      overview: "HP 14 inch EliteBook 640 G9 Overview",
      design: { title: "Design", formFactor: "A professional 14-inch laptop featuring a sleek, durable chassis built for business mobility and hybrid work." },
      performance: { title: "Performance", processor: "Powered by a 12th Gen Intel Core processor, this EliteBook is designed for mainstream business productivity.", memory: "Equipped with 8GB or 16GB of fast DDR4 memory for efficient multitasking.", storage: "Features a speedy NVMe SSD (e.g., 256GB or 512GB) for quick boot times." },
      display: { title: "Display and Graphics", screen: "A 14-inch diagonal Full HD (1920x1080) anti-glare display.", graphics: "Integrated Intel Iris Xe Graphics for business applications and media." },
      connectivity: { title: "Connectivity", ports: ["1x Thunderbolt 4 with USB-C", "2x USB-A 3.2 Gen 1", "1x HDMI 2.0", "1x Ethernet (RJ-45)"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "Ideal for hybrid work, featuring HP Wolf Security for Business, AI-based noise reduction, and a long-life battery.", connectivityOptions: "Comprehensive port selection for docking and peripherals, including wired network access." }
    }
  },
  { 
    id: 'fp1', 
    name: 'D-Link DWA-X1850 AX1800 Wi-Fi 6 USB Adapter', 
    price: 39.62, 
    image: '/dlink/0.jpg', 
    category: 'Accessories, D-Link', 
    categorySlug: 'accessories', 
    slug: 'd-link-dwa-x1850-ax1800-wi-fi-6-usb-adapter', 
    description: {
      overview: "A compact USB adapter that instantly upgrades any desktop or laptop to the latest Wi-Fi 6 technology.",
      design: { title: "Design", formFactor: "A small, portable USB 3.0 dongle with a sleek, black chassis and an internal antenna." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB 3.2 Gen 1 (Type-A)"], wireless: ["Wi-Fi 6 (802.11ax)", "AX1800 speeds (up to 1200 Mbps on 5GHz, 574 Mbps on 2.4GHz)"] },
      functionality: { title: "Functionality", versatility: "Provides a simple, plug-and-play solution to add high-speed, low-latency Wi-Fi 6 to older computers. Features WPA3 security, OFDMA, and MU-MIMO.", connectivityOptions: "Connects via any standard USB port, offering a significant wireless performance boost for streaming, gaming, and large file downloads." }
    }
  },
  { 
    id: 'fp2', 
    name: 'D-Link DAP-X2850 Nuclias Connect AX3600 Wi-Fi 6 PoE Access Point', 
    price: 236.46, 
    image: '/dlink/2.jpg', 
    category: 'Networking, D-Link', 
    categorySlug: 'switches', 
    slug: 'd-link-dap-x2850-nuclias-connect-ax3600-wi-fi-6-poe-access-point', 
    description: {
      overview: "A high-performance Wi-Fi 6 access point designed for business environments, offering AX3600 speeds and central management via Nuclias Connect.",
      design: { title: "Design", formFactor: "A sleek, ceiling- or wall-mountable unit with a white, plenum-rated chassis to blend into office environments." },
      performance: { title: "Performance", processor: "N/A (features powerful 4x4 internal radios)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 2.5 GbE PoE+ Port", "1x 1 GbE Port", "1x Console Port"], wireless: ["Wi-Fi 6 (802.11ax)", "AX3600 (4x4 MIMO)", "Band steering", "WPA3 Enterprise"] },
      functionality: { title: "Functionality", versatility: "Ideal for high-density environments like offices, schools, and retail. Can be managed locally or remotely with Nuclias Connect software.", connectivityOptions: "The 2.5 GbE PoE+ port allows for high-speed data uplink and power over a single cable, eliminating bottlenecks." }
    }
  },
  { 
    id: 'fp3', 
    name: 'Ubiquiti Networks UniFi 5 x Switch 8 Managed Gigabit', 
    price: 495.00, 
    image: '/ubiquiti/1.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches', 
    slug: 'ubiquiti-networks-unifi-5-x-switch-8-managed-gigabit', 
    description: {
      overview: "A bundle of five Ubiquiti UniFi 8-port managed Gigabit switches. These are compact, fanless switches ideal for expanding a UniFi network.",
      design: { title: "Design", formFactor: "A small, desktop-mountable switch with a durable metal chassis. This bundle contains five individual units." },
      performance: { title: "Performance", processor: "N/A (features a non-blocking switching fabric)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["(Per Switch) 8x Gigabit Ethernet (GbE) Ports", "1x PoE Passthrough Port (on specific models)"], wireless: ["N/A (Wired Switch)"] },
      functionality: { title: "Functionality", versatility: "Integrates seamlessly with the UniFi Network Controller for central management, VLAN configuration, and network insights.", connectivityOptions: "Ideal for expanding a wired network in small offices or homes, providing reliable Gigabit speeds to multiple devices." }
    }
  },
  { 
    id: 'fp4', 
    name: 'Ubiquiti Networks UA-SK-EU security access control system White', 
    price: 450.00, 
    image: '/ubiquiti/2.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'accessories', 
    slug: 'ubiquiti-networks-ua-sk-eu-security-access-control-system-white', 
    description: {
      overview: "The Ubiquiti UniFi Access (UA) Starter Kit (EU) is an all-in-one solution for a modern, touchless access control system.",
      design: { title: "Design", formFactor: "Includes a UA-Hub, UA-Pro (with touchscreen), and UA-Lite, all with a sleek, minimalist white design." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "The UA-Pro features a color touchscreen for video, PIN entry, and user interaction.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["PoE inputs", "Relays for electric locks", "Inputs for motion sensors"], wireless: ["NFC", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Manages door access via NFC cards, the UniFi Access mobile app, PIN codes, or doorbell. Fully managed by the UniFi Access Controller.", connectivityOptions: "Provides a complete, secure, and modern door access system for any business." }
    }
  },
  { 
    id: 'fp5', 
    name: 'Ubiquiti AmpliFi AFI-HD-UK Mesh Whole Home WiFi Router System', 
    price: 356.00, 
    image: '/ubiquiti/3.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers', 
    slug: 'ubiquiti-amplifi-afi-hd-uk-mesh-whole-home-wifi-router-system', 
    description: {
      overview: "The AmpliFi HD (AFI-HD) is a whole-home mesh Wi-Fi system designed to provide complete, high-speed wireless coverage by eliminating dead spots.",
      design: { title: "Design", formFactor: "Includes a central router 'Cube' with a smart LCD touchscreen and two wireless 'MeshPoints' that plug directly into wall outlets." },
      performance: { title: "Performance", processor: "N/A (features powerful 802.11ac 3x3 MIMO radios)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "The router cube features a full-color touchscreen for easy setup and status monitoring.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["(Router) 1x Gigabit WAN", "4x Gigabit LAN", "(MeshPoints) None"], wireless: ["Wi-Fi 5 (802.11ac)", "Self-healing mesh technology"] },
      functionality: { title: "Functionality", versatility: "Provides a robust and seamless mesh network, ideal for large homes or offices with coverage issues. Simple setup via a mobile app.", connectivityOptions: "The MeshPoints use a magnetic connector for easy antenna positioning to optimize the signal." }
    }
  },
  { 
    id: 'fp6', 
    name: 'Lexmark CX730de Laser A4 1200 x 1200 DPI 40 ppm', 
    price: 1120.00, 
    image: '/lexmark/1.jpg', 
    category: 'Printers, Lexmark', 
    categorySlug: 'printers', 
    slug: 'lexmark-cx730de-laser-a4-1200-x-1200-dpi-40-ppm', 
    description: {
      overview: "A high-performance A4 color multifunction (MFP) laser printer designed for mid-to-large workgroups, offering printing, copying, scanning, and faxing.",
      design: { title: "Design", formFactor: "A robust, floor-standing or desktop-sized multifunction printer with a large 7-inch touchscreen for easy operation." },
      performance: { title: "Performance", processor: "Quad-core processor", memory: "2GB RAM", storage: "Optional Hard Drive" },
      display: { title: "Display and Graphics", screen: "A 7-inch (17.8 cm) e-Task color touchscreen.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB 2.0", "Gigabit Ethernet"], wireless: ["Optional Wi-Fi"] },
      functionality: { title: "Functionality", versatility: "Prints up to 40 pages per minute (ppm), supports duplex (2-sided) scanning, and features advanced security with Lexmark's full-spectrum security." , connectivityOptions: "Network-ready with high-speed USB and Ethernet for easy integration into any office environment." }
    }
  },
  { 
    id: 'fp7', 
    name: 'Acer Predator UM.KX3EE.P08 LED display', 
    price: 495.00, 
    image: '/acer/1.jpg', 
    category: 'Accessories, Acer', 
    categorySlug: 'accessories', 
    slug: 'acer-predator-um-kx3ee-p08-led-display', 
    description: {
      overview: "A high-performance gaming monitor from Acer's Predator series, designed for competitive gamers seeking high refresh rates and low response times.",
      design: { title: "Design", formFactor: "A gaming monitor with aggressive 'Predator' styling, thin bezels, and an ergonomic stand with tilt, swivel, pivot, and height adjustment." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Likely a 27-inch QHD (2560x1440) or 24-inch FHD (1920x1080) panel with a high refresh rate (e.g., 144Hz+) and fast 1ms response time.", graphics: "Supports NVIDIA G-Sync or AMD FreeSync Premium." },
      connectivity: { title: "Connectivity", ports: ["HDMI", "DisplayPort", "USB Hub"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides a smooth, tear-free, and responsive gaming experience. Features like Dark Boost and various game modes enhance visibility.", connectivityOptions: "Multiple ports allow connection to a PC and consoles simultaneously." }
    }
  },
  { 
    id: 'fp8', 
    name: 'Apple Magic Keyboard for iPad Pro', 
    price: 320.00, 
    image: '/apple/1.jpg', 
    category: 'Accessories, Apple', 
    categorySlug: 'accessories', 
    slug: 'apple-magic-keyboard-for-ipad-pro', 
    description: {
      overview: "The Magic Keyboard is an amazing companion for iPad Pro, providing a full-size backlit keyboard and a trackpad in a sleek, protective case.",
      design: { title: "Design", formFactor: "A floating cantilever design allows the iPad Pro to attach magnetically and be adjusted to the perfect viewing angle. Folds into a case to protect front and back." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB-C port for pass-through charging"], wireless: ["Connects via Smart Connector (no Bluetooth)"] },
      functionality: { title: "Functionality", versatility: "Features a full-size keyboard with backlit keys and a scissor mechanism. The trackpad opens up new ways to work with iPadOS.", connectivityOptions: "The Smart Connector provides power and data instantly, while the USB-C port frees up the iPad's port for accessories." }
    }
  },

  // --- From Top Rated ---
  {
  id: "switch-smart-managed-layer2-5-port",
  slug: "switch-smart-managed-layer2-5-port",
  name: "Switch Smart Managed Layer2 5 Port (USW-Flex-Mini)",
  price: "Get a Quote",
  image: "/ubiquiti/4.avif", // Update with your actual image path
  category: "Ubiquiti, Ubiquiti Switches",
  categorySlug: "ubiquiti",
  description: {
    keyFeatures: [
      {
        title: "Compact Performance",
        items: [
          "5 x Gigabit RJ45 Ethernet ports for high-speed connectivity",
          "Layer 2 switching capabilities",
          "Non-blocking throughput: 5 Gbps",
          "Switching capacity: 10 Gbps"
        ]
      },
      {
        title: "Versatile Power Options",
        items: [
          "Powered by 802.3af/at PoE (Port 1)",
          "Alternative power via 5V, 1A USB-C adapter (included in single pack)",
          "Low power consumption: Max 2.5W"
        ]
      },
      {
        title: "Smart Management",
        items: [
          "Managed via the UniFi Network Controller",
          "Remote firmware upgrades and configuration",
          "Guest portal/hotspot support and VLAN configuration"
        ]
      }
    ],
    benefits: [
      "Extremely compact design fits on any desktop or discreetly behind AV equipment.",
      "Cost-effective solution for expanding network connections to entertainment systems or office desks.",
      "Plug-and-play integration into existing UniFi networks."
    ],
    summary: "The Switch Smart Managed Layer2 5 Port (USW-Flex-Mini) is a smart managed Gigabit switch that offers high performance and intelligent switching for your growing network. Ideal for the home office or entertainment center, it can be powered via PoE or USB-C, making deployment effortless."
  }
},
  {
  id: "ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro",
  slug: "ubiquiti-unifi-dream-machine-pro-managed-gigabit-udm-pro",
  name: "Ubiquiti UniFi Dream Machine Pro Managed Gigabit (UDM-Pro)",
  price: "Get a Quote",
  image: "/ubiquiti/5.png", // Update this path
  category: "Ubiquiti, Ubiquiti Routers, Security Gateways",
  categorySlug: "ubiquiti",
  description: {
    keyFeatures: [
      {
        title: "All-in-One Enterprise Console",
        items: [
          "Integrates a Security Gateway, Managed Switch, and Network Controller",
          "Pre-installed UniFi Network and UniFi Protect applications",
          "Powered by a fast 1.7 GHz Quad-Core Processor"
        ]
      },
      {
        title: "Advanced Networking",
        items: [
          "8 x Gigabit RJ45 LAN Ports",
          "1 x 10G SFP+ LAN Port for high-speed uplinks",
          "Dual WAN support: 1 x 10G SFP+ and 1 x Gigabit RJ45",
          "Full-featured Layer 2 managed switch capabilities"
        ]
      },
      {
        title: "Security & Surveillance",
        items: [
          "Advanced Firewall with IPS/IDS (Intrusion Prevention/Detection System)",
          "DPI (Deep Packet Inspection) for traffic analysis",
          "Integrated NVR with a 3.5\" HDD bay for UniFi Protect video storage"
        ]
      }
    ],
    benefits: [
      "Centralizes your entire network management into a single 1U rack-mountable device.",
      "Future-proof connectivity with 10G SFP+ ports for high-speed ISP connections.",
      "Seamlessly scalable—easily add more UniFi switches and APs as your business grows."
    ],
    summary: "The Ubiquiti UniFi Dream Machine Pro (UDM-Pro) is an enterprise-grade, rack-mount UniFi Cloud Gateway. It combines a robust security gateway, a 10G managed switch, and a network controller into one device. With a built-in HDD bay for video surveillance storage, it is the ultimate all-in-one networking appliance for scalable business networks."
  }
},
  {
  id: "ubiquiti-edgerouter-6p-wired-router-gigabit-ethernet-er-6p",
  slug: "ubiquiti-edgerouter-6p-wired-router-gigabit-ethernet-er-6p",
  name: "Ubiquiti EdgeRouter 6P Wired Router Gigabit Ethernet (ER-6P)",
  price: "Get a Quote",
  image: "/ubiquiti/6.png", // Update this path
  category: "Ubiquiti, Ubiquiti Router",
  categorySlug: "ubiquiti",
  description: {
    keyFeatures: [
      {
        title: "High-Performance Routing",
        items: [
          "Capable of routing up to 3.4 million packets per second (64-byte packets)",
          "6 Gbps line rate for packets 256 bytes or larger",
          "Powered by a 4-Core 1 GHz MIPS64 Processor"
        ]
      },
      {
        title: "Versatile Connectivity",
        items: [
          "5 x Gigabit RJ45 Ports with configurable 24V Passive PoE support",
          "1 x Gigabit SFP Port for fiber backhaul applications",
          "1 x RJ45 Serial Console Port for management"
        ]
      },
      {
        title: "Advanced EdgeOS Management",
        items: [
          "Intuitive graphical user interface for easy configuration",
          "Powerful Command Line Interface (CLI) for advanced users",
          "Supported by UNMS (Ubiquiti Network Management System) for remote management"
        ]
      }
    ],
    benefits: [
      "Delivers carrier-class reliability and price-to-performance value.",
      "Flexible PoE support allows you to power airMAX® devices directly from the router.",
      "Compact, durable metal form factor suitable for various deployment environments."
    ],
    summary: "The Ubiquiti EdgeRouter 6P (ER-6P) combines reliable carrier-class performance with enterprise-level features in a compact unit. With five Gigabit PoE ports and an SFP port for fiber connectivity, it provides the flexibility and speed needed for WISP (Wireless Internet Service Provider) and enterprise edge networks."
  }
},
  { 
    id: 'tr4', 
    name: 'Ubiquiti UniFi U6+', 
    price: 71.35, 
    image: '/ubiquiti/7.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers', 
    slug: 'ubiquiti-unifi-u6', 
    description: {
      overview: "A compact, dual-band Wi-Fi 6 access point designed for high-performance wireless coverage in homes and small businesses.",
      design: { title: "Design", formFactor: "A sleek, discreet ceiling-mountable access point with a minimalist white design." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status ring)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit PoE Input"], wireless: ["Wi-Fi 6 (802.11ax)", "2x2 MIMO on 5GHz and 2.4GHz", "3.0 Gbps aggregate throughput"] },
      functionality: { title: "Functionality", versatility: "An affordable entry into the UniFi Wi-Fi 6 ecosystem, supporting over 300 connected devices and managed via the UniFi Network Controller.", connectivityOptions: "Powered simply by a single PoE (Power over Ethernet) cable." }
    }
  },
  { 
    id: 'tr5', 
    name: 'Ubiquiti NanoBeam AC GEN2 NBE-5AC-GEN2', 
    price: 120.00, 
    image: '/ubiquiti/8.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers', 
    slug: 'ubiquiti-nanobeam-ac-gen2-nbe-5ac-gen2', 
    description: {
      overview: "A high-performance airMAX ac bridge for creating point-to-point (PtP) or point-to-multipoint (PtMP) wireless links over long distances.",
      design: { title: "Design", formFactor: "A compact, outdoor-rated dish antenna and radio all-in-one. Features an innovative ball-joint mount for easy aiming." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit PoE Port"], wireless: ["airMAX 802.11ac", "5 GHz frequency", "Up to 450+ Mbps throughput"] },
      functionality: { title: "Functionality", versatility: "Ideal for connecting buildings, providing internet to a remote location, or for WISP (Wireless ISP) deployments. A dedicated 2.4GHz management radio makes setup easy.", connectivityOptions: "Mounts on a pole or wall and is powered via passive PoE." }
    }
  },

  // --- From Best Deals ---
  { 
    id: 'bd1', 
    name: 'Brother HL-L6410DW Laser Printer – 1200 DPI, Wi-Fi, Duplex Printing', 
    price: "Get a Quote", 
    image: '/brother/1.png', 
    category: 'Printers, Brother', 
    categorySlug: 'printers', 
    slug: 'brother-hl-l6410dw-laser-printer-1200-dpi-wi-fi-duplex-printing', 
    description: {
      overview: "A high-speed monochrome laser printer built for busy offices and large workgroups, offering enterprise-level security and reliability.",
      design: { title: "Design", formFactor: "A robust desktop laser printer with a large paper capacity and an intuitive LCD display." },
      performance: { title: "Performance", processor: "1.2 GHz processor", memory: "1 GB RAM", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Color touchscreen for easy navigation.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Gigabit Ethernet", "High-Speed USB 2.0"], wireless: ["802.11b/g/n Wi-Fi", "Wi-Fi Direct"] },
      functionality: { title: "Functionality", versatility: "Prints at up to 52 ppm, features automatic duplex (2-sided) printing, and a 520-sheet paper tray. Advanced security features protect sensitive documents.", connectivityOptions: "Flexible connectivity with Wi-Fi, Ethernet, and mobile printing support (AirPrint, Mopria)." }
    }
  },
  { 
    id: 'bd2', 
    name: 'APC Smart-UPS On-Line uninterruptible power supply (UPS) – SRT5KXLI', 
    price: "Get a Quote", 
    image: '/apc/11.avif', 
    category: 'UPS, APC', 
    categorySlug: 'ups', 
    slug: 'apc-smart-ups-on-line-uninterruptible-power-supply-ups-srt5kxli', 
    description: {
      overview: "A high-density, double-conversion on-line UPS (SRT5KXLI) designed to provide clean, reliable power for critical servers, networks, and medical labs.",
      design: { title: "Design", formFactor: "A convertible rack/tower unit, allowing flexible installation in a server rack or as a standalone tower." },
      performance: { title: "Performance", processor: "N/A (Power Capacity: 5000 VA / 4500 W)", memory: "N/A", storage: "N/A (Double-Conversion Topology)" },
      display: { title: "Display and Graphics", screen: "Multi-function LCD status and control console.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Multiple C13 and C19 outlets", "USB", "Serial (RJ-45)", "SmartSlot for network card"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides pure sine wave output and zero transfer time to battery, protecting the most sensitive equipment from any power disturbance.", connectivityOptions: "Network-manageable via the SmartSlot, allowing for remote monitoring and graceful shutdowns." }
    }
  },
  { 
    id: 'bd3', 
    name: 'Ubiquiti UniFi nanoHD 1733 Mbit/s – UAP-NANOHD-US', 
    price: "Get a Quote", 
    image: '/ubiquiti/9.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers', 
    slug: 'ubiquiti-unifi-nanohd-1733-mbit-s-uap-nanohd-us', 
    description: {
      overview: "A compact, low-profile Wi-Fi 5 (802.11ac) Wave 2 access point designed for high-density environments, supporting MU-MIMO technology.",
      design: { title: "Design", formFactor: "A small, discreet ceiling-mountable AP with interchangeable skins to match any decor. (UAP-NANOHD-US is the US single-pack version)." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status ring)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit PoE Port"], wireless: ["Wi-Fi 5 (802.11ac Wave 2)", "4x4 MU-MIMO on 5GHz (1733 Mbps)", "2x2 MIMO on 2.4GHz (300 Mbps)"] },
      functionality: { title: "Functionality", versatility: "The nanoHD is ideal for offices and venues with many connected clients, providing reliable, high-speed wireless in a small footprint.", connectivityOptions: "Powered by 802.3af PoE and managed by the UniFi Network Controller." }
    }
  },
  { 
    id: 'bd4', 
    name: 'Mikrotik CSS106-1G-4P-1S network switch', 
    price: "Get a Quote", 
    image: '/Mikrotik/1.jpg', 
    category: 'Networking, Mikrotik', 
    categorySlug: 'switches', 
    slug: 'mikrotik-css106-1g-4p-1s-network-switch', 
    description: {
      overview: "A very compact and affordable smart switch from Mikrotik (CSS106-1G-4P-1S), featuring 4 PoE-out ports and an SFP port for fiber connectivity.",
      design: { title: "Design", formFactor: "A small, durable plastic case, perfect for desktop use or mounting in a tight space." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit Ethernet (PoE-in)", "4x Gigabit Ethernet (PoE-out)", "1x SFP Port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "This switch can be powered by PoE and then power up to four other PoE devices (like cameras or APs). It runs SwOS for basic management.", connectivityOptions: "The SFP port allows for a fiber optic uplink, making it a great small-scale fiber-to-copper converter." }
    }
  },
  { 
    id: 'bd5', 
    name: 'DELL X-Series X1026P Managed', 
    price: "Get a Quote", 
    image: '/dell/1.jpg', 
    category: 'Networking, Dell', 
    categorySlug: 'switches', 
    slug: 'dell-x-series-x1026p-managed', 
    description: {
      overview: "The Dell X1026P is a 26-port smart managed Gigabit switch with 24 PoE+ ports, designed for small to medium businesses.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with a fan for cooling, designed for network closets." },
      performance: { title: "Performance", processor: "N/A (PoE Budget: 369W)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x Gigabit PoE+ Ports", "2x 1G SFP Uplink Ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features an intuitive GUI for easy management, VLAN setup, and QoS. The 369W PoE budget can power numerous APs, phones, and cameras.", connectivityOptions: "Provides 24 copper ports for devices and 2 fiber SFP ports for high-speed uplinks to a core switch." }
    }
  },
  { 
    id: 'bd6', 
    name: 'HP Aruba 2930F 48G PoE+ 4SFP+ Managed L3 – JL256A', 
    price: "Get a Quote", 
    image: '/hp/1.jpg', 
    category: 'Networking, HP', 
    categorySlug: 'switches', 
    slug: 'hp-aruba-2930f-48g-poe-4sfp-managed-l3-jl256a', 
    description: {
      overview: "A high-performance, stackable Layer 3 access switch (JL256A) from the Aruba 2930F series, offering 48 PoE+ ports and 10G uplinks.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch designed for enterprise campus, branch, and SME networks." },
      performance: { title: "Performance", processor: "Dual-Core ARM Coretex A9", memory: "1 GB DDR3", storage: "4 GB eMMC" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["48x Gigabit PoE+ Ports", "4x 10G SFP+ Uplink Ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Supports static, RIP, and OSPF routing, virtual stacking (VSF), and can be managed via Aruba Central (cloud) or AirWave. 370W PoE budget.", connectivityOptions: "A workhorse switch for building a robust enterprise network, with 10G uplinks to prevent bottlenecks." }
    }
  },
  { 
    id: 'bd7', 
    name: 'Lenovo ThinkCentre M75s Gen 2 – 11R8002QUK', 
    price: "Get a Quote", 
    image: '/lenovo/1.png', 
    category: 'Lenovo, Workstations', 
    categorySlug: 'workstations', 
    slug: 'lenovo-thinkcentre-m75s-gen-2-11r8002quk', 
    description: {
      overview: "The Lenovo ThinkCentre M75s Gen 2 is a compact, small form factor (SFF) desktop PC designed for business productivity and security.",
      design: { title: "Design", formFactor: "A space-saving Small Form Factor (SFF) chassis that can fit easily on or under a desk." },
      performance: { title: "Performance", processor: "Powered by an AMD Ryzen PRO processor for enterprise-grade performance and manageability.", memory: "Upgradable DDR4 RAM.", storage: "Fast M.2 NVMe SSD storage." },
      display: { title: "Display and Graphics", screen: "N/A (Connects to external monitors)", graphics: "Integrated AMD Radeon Graphics." },
      connectivity: { title: "Connectivity", ports: ["USB-C", "USB 3.2 Gen 1", "DisplayPort", "HDMI", "Serial port (optional)"], wireless: ["Optional Wi-Fi"] },
      functionality: { title: "Functionality", versatility: "A reliable and secure workhorse for any office, featuring AMD PRO technologies and ThinkShield security.", connectivityOptions: "Supports multiple displays and offers a full range of ports for all business peripherals." }
    }
  },
// --- NEW DELL WORKSTATIONS ---
{
  id: 'dell-optiplex-7010-7k8h1',
  slug: 'dell-optiplex-7010-intel-core-i5-7k8h1',
  name: 'DELL OptiPlex 7010 Intel® Core™ i5 – 7K8H11',
  image: '/dell-workstation/1.jpg', // You may need to update this image path
  category: 'Workstation, Dell',
  categorySlug: 'workstations',
  price: 'Get a Quote',
  description: {
    overview: 'DELL OptiPlex 7010 Small Form Factor (SFF) Desktop',
    design: {
      title: 'Compact and Sustainable Design',
      formFactor: 'A Small Form Factor (SFF) desktop with a compact, space-saving chassis. Built with up to 60% post-consumer recycled plastics, it is designed for flexible deployment in any workspace.',
    },
    performance: {
      title: 'Reliable Business Performance',
      processor: 'Powered by a 13th Gen Intel Core i5 processor, delivering the performance needed for everyday business tasks.',
      memory: 'Equipped with DDR4 memory (e.g., 8GB or 16GB) for efficient multitasking.',
      storage: 'Features a fast M.2 NVMe SSD (e.g., 256GB or 512GB) for quick boot-up and file access.',
    },
    display: {
      title: 'Versatile Display Support',
      screen: 'N/A (Connects to external monitors). Capable of driving multiple high-resolution displays.',
      graphics: 'Integrated Intel UHD Graphics 770, supporting 4K resolution.',
    },
    connectivity: {
      title: 'Modern and Legacy Ports',
      ports: [
        'USB 3.2 Gen 2 ports',
        'USB 2.0 ports (with Smart Power On)',
        'DisplayPort 1.4a',
        'HDMI 1.4b port',
        'RJ-45 Gigabit Ethernet',
        'Universal audio jack',
      ],
      wireless: ['Optional Wi-Fi 6E and Bluetooth 5.3'],
    },
    functionality: {
      title: 'Secure and Manageable',
      versatility: 'Ideal for call centers, office productivity, and kiosk use. Features built-in security like TPM 2.0 and a lockable chassis.',
      connectivityOptions: 'A wide range of ports on the front and back allows for easy connection to all essential peripherals.',
    },
  }
},
{
  id: 'dell-optiplex-7010-9cvpx',
  slug: 'dell-optiplex-7010-intel-core-i5-9cvpx',
  name: 'DELL OptiPlex 7010 Intel® Core™ i5 – 9CVPX',
  image: '/dell-workstation/3.jpg', // You may need to update this image path
  category: 'Workstation, Dell',
  categorySlug: 'workstations',
  price: 'Get a Quote',
  description: {
    overview: 'DELL OptiPlex 7010 Micro Form Factor (MFF) Desktop',
    design: {
      title: 'Ultra-Compact Micro Design',
      formFactor: 'An ultra-compact Micro Form Factor (MFF) desktop that can be mounted virtually anywhere—behind a monitor, under a desk, or in a kiosk.',
    },
    performance: {
      title: 'Efficient Core Performance',
      processor: 'Features a 13th Gen Intel Core i5 T-series (low power) processor, balancing performance and efficiency.',
      memory: 'DDR4 SODIMM memory for responsive multitasking in a tiny footprint.',
      storage: 'M.2 NVMe SSD for fast and reliable storage.',
    },
    display: {
      title: 'Multi-Monitor Ready',
      screen: 'N/A (Connects to external monitors).',
      graphics: 'Integrated Intel UHD Graphics 770, capable of supporting up to four native displays.',
    },
    connectivity: {
      title: 'Full-Sized Connectivity',
      ports: [
        'USB 3.2 Gen 2 ports',
        'USB 2.0 ports',
        'DisplayPort 1.4a',
        'HDMI 1.4b port',
        'RJ-45 Gigabit Ethernet',
        'Universal audio jack',
      ],
      wireless: ['Integrated Wi-Fi 6E and Bluetooth 5.3'],
    },
    functionality: {
      title: 'Versatile and Intelligent',
      versatility: 'Perfect for digital signage, conference rooms, or space-constrained workspaces. Runs quietly and efficiently.',
      connectivityOptions: 'Despite its size, it offers a full range of ports and the latest wireless connectivity for a cable-free setup.',
    },
  }
},
{
  id: 'dell-optiplex-plus-7410-hj6vr',
  slug: 'dell-optiplex-plus-7410-intel-core-i5-hj6vr',
  name: 'DELL OptiPlex Plus 7410 Intel® Core™ i5 – HJ6VR',
  image: '/dell-workstation/2.jpg', // You may need to update this image path
  category: 'Workstation, Dell',
  categorySlug: 'workstations',
  price: 'Get a Quote',
  description: {
    overview: 'DELL OptiPlex Plus 7410 All-in-One (AIO) Desktop',
    design: {
      title: 'Elegant All-in-One Design',
      formFactor: 'A premium 24-inch All-in-One desktop that integrates the PC into the monitor stand for a sleek, clutter-free workspace.',
    },
    performance: {
      title: 'Powerful Integrated Performance',
      processor: 'Powered by a 13th Gen Intel Core i5 H-class processor for high-performance computing.',
      memory: 'Fast DDR5 memory (up to 64GB) for demanding applications and heavy multitasking.',
      storage: 'Dual M.2 SSD storage options for maximum speed and capacity.',
    },
    display: {
      title: 'Stunning 24-inch Display',
      screen: 'A 23.8-inch Full HD (1920x1080) IPS display with anti-glare coating and optional touch functionality. Features a pop-up 5MP IR webcam for Windows Hello.',
      graphics: 'Integrated Intel Iris Xe Graphics. Optional NVIDIA discrete graphics for creative tasks.',
    },
    connectivity: {
      title: 'Comprehensive Collaboration Hub',
      ports: [
        'Side: USB-C 3.2 Gen 2x2 (20Gbps), USB-A 3.2, Universal audio jack',
        'Rear: DisplayPort 1.4a, HDMI-In, HDMI-Out, RJ-45, USB 3.2 Gen 2, USB 2.0',
      ],
      wireless: ['Intel Wi-Fi 6E (AX211) and Bluetooth 5.3'],
    },
    functionality: {
      title: 'The Ultimate Collaboration Tool',
      versatility: 'An ideal workstation for video conferencing and productivity. The HDMI-In port allows it to be used as a second monitor.',
      connectivityOptions: 'Packed with high-speed ports, including a 20Gbps USB-C port and the latest Wi-Fi 6E for unparalleled connectivity.',
    },
  }
},
// --- END OF NEW DELL WORKSTATIONS ---
  { 
    id: 'bd8', 
    name: 'NETGEAR 26-Port PoE Gigabit Ethernet – GS724TPP-100NAS', 
    price: "Get a Quote", 
    image: '/netgear/1.jpg', 
    category: 'Networking, Netgear', 
    categorySlug: 'switches', 
    slug: 'netgear-26-port-poe-gigabit-ethernet-gs724tpp-100nas', 
    description: {
      overview: "The NETGEAR GS724TPP is a 26-port smart managed switch with 24 PoE+ ports and a 380W power budget, ideal for dense deployments.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with a quiet-fan design, suitable for network closets or open office spaces." },
      performance: { title: "Performance", processor: "N/A (PoE Budget: 380W)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x Gigabit PoE+ Ports", "2x 1G SFP Uplink Ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A high-capacity PoE+ switch that can power a full deployment of APs, phones, and cameras. Managed via the NETGEAR Insight platform.", connectivityOptions: "Features 24 copper ports and 2 dedicated fiber SFP ports for flexible, high-speed uplinks." }
    }
  },
  { 
    id: 'bd9', 
    name: 'Brother QL-810W label printer', 
    price: "Get a Quote", 
    image: '/brother/2.jpg', 
    category: 'Printers, Brother', 
    categorySlug: 'printers', 
    slug: 'brother-ql-810w-label-printer', 
    description: {
      overview: "A high-speed professional label printer with wireless connectivity, perfect for office use, mail rooms, and retail.",
      design: { title: "Design", formFactor: "A compact desktop label printer with a sleek black-and-red design. Features an automatic cutter." },
      performance: { title: "Performance", processor: "N/A (Prints up to 110 labels per minute)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status lights)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB 2.0"], wireless: ["Wi-Fi (802.11b/g/n)"] },
      functionality: { title: "Functionality", versatility: "Prints high-resolution (300x600 dpi) labels and unique two-color (black/red) labels. Supports mobile printing via AirPrint and Brother iPrint&Label.", connectivityOptions: "Connect via USB to a single PC or wirelessly to share across a network." }
 }
  },
 {
  id: "brother-ads-2400n-scanner",
  slug: "brother-ads-2400n-scanner",
  name: "Brother ADS-2400N Desktop Document Scanner",
  price: "Get a Quote", // Update if you have a specific price
  image: "/brother/3.jpg", // Make sure to update this path to your actual image
  category: "Brother, Scanners, Document Scanners",
  categorySlug: "brother",
  description: {
    keyFeatures: [
      {
        title: "High-Speed Scanning",
        items: [
          "Fast 30 pages per minute (ppm) single-sided scanning",
          "60 images per minute (ipm) duplex (double-sided) scanning",
          "50-sheet Automatic Document Feeder (ADF) for bulk jobs"
        ]
      },
      {
        title: "Network & Connectivity",
        items: [
          "Built-in Gigabit Ethernet for fast network sharing across the office",
          "Hi-Speed USB 2.0 interface for direct PC connection",
          "Scan directly to USB host, Network, FTP/SFTP, and Microsoft SharePoint"
        ]
      },
      {
        title: "Image Processing",
        items: [
          "Up to 600 x 600 dpi optical resolution",
          "Includes advanced image processing features via Kofax VRS compatibility",
          "Supports TWAIN, WIA, ICA, and ISIS drivers for broad software integration"
        ]
      }
    ],
    benefits: [
      "Time-saving single-pass duplex scanning captures both sides of a document at once.",
      "Programmable buttons allow for one-touch scanning to frequently used destinations.",
      "Handles a wide range of media weights from 27 to 413 gsm, including plastic ID cards."
    ],
    summary: "The Brother ADS-2400N is a robust network desktop scanner designed for the small to medium business. With Gigabit Ethernet connectivity, it allows your entire team to capture and archive documents efficiently. Its reliable paper handling and fast 30ppm speed ensure your workflow remains uninterrupted, while professional driver support ensures compatibility with your existing document management systems."
  }
},

  // --- From Best Sellers ---
  { 
    id: 'bs1', 
    name: 'Acer V246HL 24″ 1920 x 1080 pixels Full HD LED Black', 
    price: 120.00, 
    image: '/acer/2.jpg', 
    category: 'Accessories, Acer', 
    categorySlug: 'accessories', 
    slug: 'acer-v246hl-24-1920-x-1080-pixels-full-hd-led-black', 
    description: {
      overview: "An affordable and reliable 24-inch Full HD monitor, ideal for everyday office tasks and home use.",
      design: { title: "Design", formFactor: "A 24-inch widescreen monitor with a simple, black chassis and a stable stand. It is VESA mount compatible." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "24-inch Full HD (1920x1080) LED-backlit display with a 5ms response time.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["VGA", "DVI"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features Acer ComfyView to reduce glare and Adaptive Contrast Management for brighter whites and darker blacks.", connectivityOptions: "Provides essential connectivity for legacy and standard computers via VGA and DVI." }
    }
  },
  { 
    id: 'bs2', 
    name: 'ACER V227Qbip Full HD 21.5″ IPS LCD Monitor – Black', 
    price: 109.00, 
    image: '/acer/3.jpg', 
    category: 'Accessories, Acer', 
    categorySlug: 'accessories', 
    slug: 'acer-v227qbip-full-hd-21-5-ips-lcd-monitor-black', 
    description: {
      overview: "A 21.5-inch Full HD monitor with an IPS panel, offering excellent color accuracy and wide viewing angles in a compact, professional design.",
      design: { title: "Design", formFactor: "A 21.5-inch monitor with a 'ZeroFrame' (thin-bezel) design, perfect for multi-monitor setups. VESA mount compatible." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "21.5-inch Full HD (1920x1080) IPS panel with 178-degree viewing angles.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["HDMI", "DisplayPort", "VGA"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "The IPS panel provides consistent, vibrant colors. Acer ComfyView and BlueLightShield reduce eye strain.", connectivityOptions: "Offers a range of modern (HDMI, DisplayPort) and legacy (VGA) ports for wide compatibility." }

    }
  },
  { 
    id: 'bs4', 
    name: 'Lexmark 62D2H0E (622H) Toner black, 25K pages', 
    price: 150.00, 
    image: '/lexmark/2.jpg', 
    category: 'Printers, Lexmark', 
    categorySlug: 'printers', 
    slug: 'lexmark-62d2h0e-622h-toner-black-25k-pages', 
    description: {
      overview: "A high-yield black toner cartridge (62D2H0E) for Lexmark laser printers, offering a 25,000-page yield for high-volume printing.",
      design: { title: "Design", formFactor: "A genuine Lexmark 622H high-yield toner cartridge, part of the Lexmark Return Program." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A (Page Yield: 25,000 pages)" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Delivers outstanding image quality and long-life reliability. The high yield reduces printing costs and user interventions.", connectivityOptions: "Installs easily into compatible Lexmark printers." }
    }
  },
  { 
    id: 'bs5', 
    name: 'Aruba JL683A#ABA Instant On 1930', 
    price: 300.00, 
    image: '/aruba/1.jpg', 
    category: 'Networking, Aruba', 
    categorySlug: 'switches', 
    slug: 'aruba-jl683a-aba-instant-on-1930', 
    description: {
      overview: "The Aruba Instant On 1930 (JL683A) is a 24-port managed Gigabit switch with 4 SFP/SFP+ 10G uplink ports, designed for small businesses.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with a clean, professional look. This model is non-PoE." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x Gigabit Ethernet Ports", "4x 10G SFP+ Uplink Ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A smart-managed switch that is easy to deploy and manage via the Instant On mobile app or cloud portal. Supports Layer 2+ features like VLANs.", connectivityOptions: "The 10G SFP+ uplinks are ideal for high-speed connections to servers or a network core, preventing bottlenecks." }
    }
  },
  { 
    id: 'bs6', 
    name: 'HPE Aruba AP-303P (US)', 
    price: 250.00, 
    image: '/aruba/2.jpg', 
    category: 'Networking, Aruba', 
    categorySlug: 'routers', 
    slug: 'hpe-aruba-ap-303p-us', 
    description: {
      overview: "The Aruba AP-303P (US) is a high-performance Wi-Fi 5 (802.11ac Wave 2) access point designed for cost-effective, high-density deployments.",
      design: { title: "Design", formFactor: "A compact, ceiling-mountable access point. The 'P' model (AP-303P) has flexible power options." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit PoE Port"], wireless: ["Wi-Fi 5 (802.11ac Wave 2)", "2x2 MU-MIMO", "1.2 Gbps aggregate throughput"] },
      functionality: { title: "Functionality", versatility: "Features unified AP mode (controller-managed) and Instant AP mode (controller-less). Built-in Bluetooth Low Energy (BLE) beacon for location services.", connectivityOptions: "Can be powered by 802.3af PoE, making deployment simple and cost-effective." }
    }
  },
  { 
    id: 'bs7', 
    name: 'Apc Netshelter Sx 24u Freestanding Rack Black', 
    price: 1255.00, 
    image: '/apc/2.jpg', 
    category: 'Accessories, APC', 
    categorySlug: 'accessories', 
    slug: 'apc-netshelter-sx-24u-freestanding-rack-black', 
    description: {
      overview: "An enterprise-class 24U server rack from APC's NetShelter SX line, designed for housing servers, networking equipment, and UPS systems.",
      design: { title: "Design", formFactor: "A 24U height, 19-inch wide, freestanding enclosure with perforated front and rear doors for optimal airflow. Black finish." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A (Static Load Capacity: e.g., 3000 lbs)" },
     display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A (Features cable management channels)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides a secure, organized, and properly ventilated environment for IT equipment. Features include adjustable mounting rails and quick-release side panels.", connectivityOptions: "Roof and base slots for easy cable access and management." }
    }
  },
  { 
    id: 'bs8', 
    name: 'APC NetShelter SX 48U 600mm Wide x 1070mm', 
    price: 1525.00, 
    image: '/apc/3.jpg', 
    category: 'Accessories, APC', 
    categorySlug: 'accessories', 
    slug: 'apc-netshelter-sx-48u-600mm-wide-x-1070mm', 
    description: {
      overview: "A full-height 48U server rack from the APC NetShelter SX line, 600mm wide and 1070mm deep, designed for high-density data centers.",
      design: { title: "Design", formFactor: "A 48U height, 19-inch wide, 1070mm deep enclosure with perforated doors for maximum front-to-back airflow." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A (Static Load Capacity: e.g., 3750 lbs)" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A (Integrates with APC cable management)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "The industry-standard rack for housing servers and networking gear. Its 1070mm depth accommodates deep servers and cable managers.", connectivityOptions: "Optimized for cable management and power distribution, with toolless accessory mounting." }
    }
  },
  { 
    id: 'bs9', 
    name: 'APC Easy UPS Line-Interactive', 
    price: 172.00, 
    image: '/apc/4.jpg', 
    category: 'UPS, APC', 
    categorySlug: 'ups', 
    slug: 'apc-easy-ups-line-interactive', 
    description: {
      overview: "An APC Easy UPS providing line-interactive battery backup and surge protection for PCs, electronics, and small business equipment.",
      design: { title: "Design", formFactor: "A compact tower UPS with multiple outlets on the back (some battery-backed, some surge-only)." },
      performance: { title: "Performance", processor: "N/A (Features Automatic Voltage Regulation - AVR)", memory: "N/A", storage: "N/A (Battery backup)" },
      display: { title: "Display and Graphics", screen: "N/A (LED status indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Multiple NEMA or C13 outlets", "USB management port (on some models)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Protects equipment from power outages, surges, and sags. AVR (Boost and Trim) stabilizes voltage, preserving battery life.", connectivityOptions: "Simple plug-and-play protection for critical home and office devices." }
    }
  },
  { 
    id: 'bs10', 
    name: 'Ubiquiti U6-PRO UniFi Wifi 6 Access Point', 
    price: 130.00, 
    image: '/ubiquiti/10.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'routers', 
    slug: 'ubiquiti-u6-pro-unifi-wifi-6-access-point', 
    description: {
      overview: "A high-performance, dual-band Wi-Fi 6 (802.11ax) access point designed for demanding, high-density networks in offices and homes.",
      design: { title: "Design", formFactor: "A sleek, ceiling-mountable access point with an IP54-rating for partial outdoor (soffit) mounting." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status ring)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit PoE+ Port"], wireless: ["Wi-Fi 6 (802.11ax)", "4x4 MU-MIMO on 5GHz", "2x2 MIMO on 2.4GHz", "5.3 Gbps aggregate throughput"] },
      functionality: { title: "Functionality", versatility: "The U6-PRO is a workhorse AP that supports over 300 clients, provides 160 MHz channel width, and is fully managed by the UniFi Network Controller.", connectivityOptions: "Powered by 802.3at PoE+ for simple, single-cable installation." }
   }
  },
  { 
    id: 'bs11', 
    name: 'MSI Cyborg 15 AI A1VFK-001UK', 
    price: 999.00, 
    image: '/msi/1.jpg', 
    category: 'Laptops, MSI', 
    categorySlug: 'computers-and-laptops', 
    slug: 'msi-cyborg-15-ai-a1vfk-001uk', 
    description: {
      overview: "A 15.6-inch gaming laptop from MSI, featuring a futuristic translucent design and powered by new Intel Core Ultra processors with AI capabilities.",
      design: { title: "Design", formFactor: "A 15.6-inch laptop with a unique, lightweight, translucent chassis design that sets it apart from other gaming laptops." },
      performance: { title: "Performance", processor: "Intel Core Ultra 7 processor with a dedicated NPU for AI tasks.", memory: "16GB DDR5 RAM.", storage: "Fast 1TB NVMe SSD." },
      display: { title: "Display and Graphics", screen: "15.6-inch Full HD (1920x1080) 144Hz IPS-level display.", graphics: "NVIDIA GeForce RTX 4060 Laptop GPU." },
      connectivity: { title: "Connectivity", ports: ["1x USB-C (with DisplayPort)", "2x USB-A 3.2", "1x HDMI 2.1", "1x Ethernet (RJ-45)"], wireless: ["Wi-Fi 6E", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "A powerful gaming and productivity machine that uses AI to optimize performance. Features a blue-backlit gaming keyboard.", connectivityOptions: "A full suite of ports for gaming peripherals, external monitors, and wired internet." }
    }
  },
  { 
    id: 'bs12', 
    name: 'MSI PRO H610M-E motherboard Intel H610 LGA 1700 micro ATX', 
    price: 85.00, 
    image: '/msi/2.jpg', 
    category: 'Accessories, MSI', 
    categorySlug: 'accessories', 
    slug: 'msi-pro-h610m-e-motherboard-intel-h610-lga-1700-micro-atx', 
    description: {
      overview: "A micro-ATX motherboard from MSI's PRO series, designed for 12th/13th Gen Intel Core processors (LGA 1700) for stable and efficient builds.",
      design: { title: "Design", formFactor: "A Micro-ATX motherboard, ideal for compact PC builds. Features a business-professional aesthetic." },
      performance: { title: "Performance", processor: "Supports 12th/13th Gen Intel CPUs", memory: "Supports Dual Channel DDR5 RAM", storage: "1x M.2 Slot (PCIe 3.0), 4x SATA 6Gb/s" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A (Supports integrated graphics via CPU)" },
      connectivity: { title: "Connectivity", ports: ["HDMI", "VGA", "USB 3.2 Gen 1", "USB 2.0", "LAN Port", "Audio Jacks"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable and cost-effective motherboard for office, home, or budget gaming builds. Features MSI's Core Boost and Memory Boost technology.", connectivityOptions: "Provides all the essential ports for a modern desktop PC." }
    }
  },
  { 
    id: 'bs13', 
    name: 'Ubiquiti UniFi Cloud Gateway Max (UCG-MAX) – 512GB', 
    price: 232.00, 
    image: '/ubiquiti/11.jpg', 
    category: 'Networking, Ubiquiti', 
     categorySlug: 'routers', 
    slug: 'ubiquiti-unifi-cloud-gateway-max-ucg-max-512gb', 
    description: {
      overview: "A powerful, rack-mountable UniFi gateway that runs the UniFi Network Controller and features a 2.5 GbE WAN port and 512GB of SSD storage.",
      design: { title: "Design", formFactor: "A compact, 1U half-depth rack-mountable unit with a sleek UniFi design and a small status display." },
      performance: { title: "Performance", processor: "Upgraded processor for high-speed routing (up to 2.5 Gbps) with IDS/IPS.", memory: "N/A", storage: "512GB internal SSD for controller data and recordings." },
      display: { title: "Display and Graphics", screen: "Small status display for basic info.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 2.5 GbE WAN", "4x 2.5 GbE LAN (1 PoE+ out)", "1x 10G SFP+ LAN"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "An all-in-one device that routes your network, manages all your UniFi devices (APs, switches, cameras), and provides multi-gigabit performance.", connectivityOptions: "The 10G SFP+ LAN port is perfect for a high-speed backbone connection to a core switch." }
    }
  },
  { 
    id: 'bs14', 
    name: 'Alcatel-Lucent network transceiver module – SFP-10G-LR', 
    price: 2610.00, 
    image: '/cisco/1.jpg', 
    category: 'Networking, Cisco', 
    categorySlug: 'switches', 
    slug: 'alcatel-lucent-network-transceiver-module-sfp-10g-lr', 
    description: {
      overview: "An SFP+ transceiver module (SFP-10G-LR) designed for 10 Gigabit Ethernet, providing long-range (LR) connectivity over single-mode fiber.",
      design: { title: "Design", formFactor: "A standard SFP+ hot-swappable module with a duplex LC connector, compatible with Alcatel-Lucent/Nokia equipment." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Duplex LC Connector"], wireless: ["N/A (Fiber Optic)"] },
      functionality: { title: "Functionality", versatility: "Transmits 10Gbps data over single-mode fiber optic cable up to 10 kilometers. Ideal for long-distance network backbones.", connectivityOptions: "Plugs into any SFP+ compatible port on a switch or router to enable 10G fiber connectivity." }
    }
  },
  { 
    id: 'bs15', 
    name: 'Epson C13S050691/0691 Toner-kit black return program, 10K pages for Epson Workforce AL-M 300', 
    price: 120.00, 
    image: '/epson/1.jpg', 
    category: 'Printers, Epson', 
    categorySlug: 'printers', 
    slug: 'epson-c13s050691-0691-toner-kit-black-return-program-10k-pages-for-epson-workforce-al-m-300', 
    description: {
      overview: "A genuine Epson black return program toner cartridge (C13S050691) for the Workforce AL-M 300 series printers, with a 10,000-page yield.",
      design: { title: "Design", formFactor: "A high-yield black toner cartridge, designed for easy installation and reliable performance." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A (Page Yield: 10,000 pages)" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["N/A"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Part of Epson's return program, offering a lower upfront cost in exchange for returning the empty cartridge. Delivers sharp black text.", connectivityOptions: "Ensures optimal performance and print quality for your Epson AL-M 300 printer." }
    }
  },
  { 
    id: 'bs16', 
    name: 'Avaya Routing Switch 4524GT-PWR – switch – 24 ports', 
    price: 450.00, 
    image: '/avaya/1.jpg', 
    category: 'Networking, Avaya', 
    categorySlug: 'switches', 
    slug: 'avaya-routing-switch-4524gt-pwr-switch-24-ports', 
    description: {
      overview: "An Avaya (formerly Nortel) 24-port managed Gigabit switch with PoE (Power over Ethernet) and Layer 3 routing capabilities.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with a durable metal chassis, designed for enterprise network closets." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x Gigabit PoE Ports", "4x SFP Uplink Ports (shared)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable switch for converged networks, providing power to IP phones and APs. Supports Layer 3 routing protocols for network segmentation.", connectivityOptions: "Provides 24 copper ports for devices and 4 shared SFP ports for fiber uplinks." }
    }
  },
  { 
    id: 'bs17', 
    name: 'Avaya J189 IP Phone Grey Led Wi-Fi 700512396', 
    price: 210.00, 
    image: '/avaya/2.jpg', 
    category: 'Accessories, Avaya', 
    categorySlug: 'accessories', 
    slug: 'avaya-j189-ip-phone-grey-led-wi-fi-700512396', 
    description: {
      overview: "A high-performance executive IP phone from Avaya (700512396) featuring two color displays, Wi-Fi, and Bluetooth connectivity.",
      design: { title: "Design", formFactor: "A modern, grey desk phone with a primary color display for calls and a secondary color display for contacts or feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Two color displays.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet Ports (PC pass-through)"], wireless: ["Integrated Wi-Fi", "Integrated Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Designed for power users who need advanced features. Supports 96 feature keys/contacts, HD audio, and can connect to a wireless network.", connectivityOptions: "Bluetooth support for wireless headsets and Wi-Fi support for deployment without a network cable." }
    }
  },
  { 
    id: 'bs18', 
    name: 'Acer Predator PH18-72 Intel? Core? i9', 
    price: 2500.00, 
    image: '/acer/4.jpg', 
    category: 'Laptops, Acer', 
    categorySlug: 'computers-and-laptops', 
    slug: 'acer-predator-ph18-72-intel-core-i9', 
    description: {
      overview: "The Acer Predator Helios 18 (PH18-72) is a massive 18-inch gaming laptop, offering desktop-replacement performance with a high-end Intel i9 processor.",
      design: { title: "Design", formFactor: "An 18-inch gaming laptop with an aggressive design, RGB lighting, and an advanced cooling system with 5th Gen AeroBlade fans." },
      performance: { title: "Performance", processor: "Intel Core i9 processor (e.g., 14th Gen HX-series).", memory: "32GB+ of DDR5 RAM.", storage: "High-speed NVMe SSD (e.g., 1TB or 2TB)." },
      display: { title: "Display and Graphics", screen: "18-inch display with high resolution (e.g., QHD+) and a high refresh rate (e.g., 240Hz).", graphics: "High-end NVIDIA GeForce RTX 40-series GPU (e.g., RTX 4080 or 4090)." },
      connectivity: { title: "Connectivity", ports: ["Thunderbolt 4", "USB-A 3.2", "HDMI 2.1", "Ethernet (RJ-45)"], wireless: ["Wi-Fi 6E or 7", "Bluetooth 5.3"] },
      functionality: { title: "Functionality", versatility: "An ultimate gaming machine designed for maximum performance, with a large, immersive screen and top-tier components.", connectivityOptions: "A full suite of ports to power a complete gaming desktop setup." }
    }
  },
  // --- End of HOMEPAGE PRODUCTS ---
// --- NEW: AVAYA & NORTEL PRODUCTS (78 Total) ---
  {
    id: "avaya-1",
    name: "Avaya 1403DigitalTelephone700469927",
    price: "Get a Quote",
    image: "/avaya/3.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-1403-digital-telephone-700469927",
    description: {
      overview: "Avaya 1403 Digital Telephone Overview",
      design: { title: "Design", formFactor: "A cost-effective digital deskphone designed for common areas and walk-up users. Features a simple 2-line display and 3 programmable feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2-line x 16 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Handset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Ideal for basic communication needs in lobbies, stockrooms, or guest rooms. Provides essential call handling features.", connectivityOptions: "Connects to Avaya IP Office systems." }
    }
  },
  {
    id: "avaya-2",
    name: "Avaya 1416Phone-700469869",
    price: "Get a Quote",
    image: "/avaya/4.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-1416-phone-700469869",
    description: {
      overview: "Avaya 1416 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "A professional digital phone for receptionists and power users. Features a 4-line backlit display and 16 programmable line/feature keys with dual LEDs (red/green)." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line adjustable graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Supports up to 3 Avaya DBM32 expansion modules, making it ideal for managing a high volume of calls and lines.", connectivityOptions: "Connects to Avaya IP Office systems." }
    }
  },
  {
    id: "avaya-3",
    name: "Avaya 1603SWIPPhone700458508",
    price: "Get a Quote",
    image: "/avaya/5.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1603sw-ip-phone-700458508",
    description: {
      overview: "Avaya 1603SW IP Deskphone Overview",
      design: { title: "Design", formFactor: "An entry-level IP phone designed for common areas like lobbies, break rooms, and waiting areas. Features a simple 2-line display and 3 line appearances." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2-line x 16 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports (one for PC pass-through)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides essential VoIP functionality with a built-in 2-port switch. A cost-effective solution for basic IP telephony needs.", connectivityOptions: "Supports PoE (Power over Ethernet) or an optional local power adapter." }
    }
  },
  {
    id: "avaya-4",
    name: "Avaya 9404DigitalTelephone(700500204)",
    price: "Get a Quote",
    image: "/avaya/6.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-9404-digital-telephone-700500204",
    description: {
      overview: "Avaya 9404 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "A modern, professional digital phone for everyday users. Features a 4-line graphical display, 12 programmable feature keys, and a high-quality speakerphone." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line x 32 character white backlit graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A smart, reliable phone for users who handle moderate call volumes and need one-touch access to features.", connectivityOptions: "Designed for Avaya Aura systems." }
    }
  },
  {
    id: "avaya-5",
    name: "Avaya 9408DigitalTelephone(700500205)",
    price: "Get a Quote",
    image: "/avaya/6.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-9408-digital-telephone-700500205",
    description: {
      overview: "Avaya 9408 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "An advanced digital phone for executives and receptionists. Features a large 8-line display and 24 programmable feature/line keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "8-line x 32 character white backlit graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerhouse for managing high call volumes. Supports up to three 12-button expansion modules for extensive line appearances.", connectivityOptions: "Designed for Avaya Aura systems." }
    }
  },
  {
    id: "avaya-6",
    name: "Avaya 9504TELSETFORIPOICO",
    price: "Get a Quote",
    image: "/avaya/7.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-9504-telset-for-ip-oico",
    description: {
      overview: "Avaya 9504 Digital Deskphone for IP Office",
      design: { title: "Design", formFactor: "A sleek, modern digital phone with a 4-line display, designed for everyday users in an Avaya IP Office environment." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line x 32 character white backlit graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features 12 programmable feature keys with dual LEDs, a high-quality speakerphone, and an intuitive interface.", connectivityOptions: "Specifically designed for and compatible with Avaya IP Office systems." }
    }
  },
  {
    id: "avaya-7",
    name: "Avaya 9508IPphoneCharcoal,GreyWiredhandset LCD",
    price: "Get a Quote",
    image: "/avaya/8.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-9508-ip-phone-charcoal-grey-wired-handset-lcd",
    description: {
      overview: "Avaya 9508 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "A charcoal grey digital phone for executives and managers. Features a large 8-line display and 24 programmable feature keys (8 keys with 3 levels)." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "8-line x 32 character white backlit graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Supports a 32-button expansion module, making it ideal for receptionists or users managing many lines. Features a full-duplex speakerphone.", connectivityOptions: "Designed for Avaya IP Office systems." }
    }
  },
  {
    id: "avaya-8",
    name: "Avaya 9601(700506783)SIPIPPhone",
    price: "Get a Quote",
    image: "/avaya/9.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-9601-700506783-sip-ip-phone",
    description: {
      overview: "Avaya 9601 SIP IP Phone Overview",
      design: { title: "Design", formFactor: "A cost-effective, entry-level SIP phone for common areas and basic user needs. Features a simple 2-line display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2-line monochrome display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 10/100 Ethernet port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides basic SIP telephony features in a simple, no-frills package. Ideal for lobbies, hallways, and guest rooms.", connectivityOptions: "Powered by PoE (Power over Ethernet) only." }
    }
  },
  {
    id: "avaya-9",
    name: "Avaya B159Analog/DECTtelephoneBlack",
    price: "Get a Quote",
    image: "/avaya/10.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b159-analog-dect-telephone-black",
    description: {
      overview: "Avaya B159 Analog Conference Phone Overview",
      design: { title: "Design", formFactor: "A powerful analog conference phone in black, designed for medium to large meeting rooms. Features a simple keypad and LCD display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Analog (RJ11) connection", "Expansion microphone ports", "DECT 6.0 (for accessory connection)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features Avaya's OmniSound technology for crystal-clear audio. Can be expanded with extra microphones for larger rooms and supports an SD card for call recording.", connectivityOptions: "Connects to a standard analog phone line or analog PBX port." }
    }
  },
  {
    id: "avaya-10",
    name: "Avaya H229TRIMLINEIPPHONEGLOBAL",
    price: "Get a Quote",
    image: "/avaya/11.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-h229-trimline-ip-phone-global",
    description: {
      overview: "Avaya H229 Trimline IP Phone Overview",
      design: { title: "Design", formFactor: "A slim, 'trimline' phone designed for wall mounting or tight spaces. Ideal for hospitality, elevators, or courtesy phone needs." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "No display, features a standard 12-button keypad.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 10/100 Ethernet port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A simple, durable, and cost-effective IP phone for basic communication. Features programmable keys and is PoE powered.", connectivityOptions: "Connects to a standard IP network and is powered via PoE." }
    }
  },
  {
    id: "avaya-11",
    name: "Avaya H239CordedSIPPhone700513933",
    price: "Get a Quote",
    image: "/avaya/12.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-h239-corded-sip-phone-700513933",
    description: {
      overview: "Avaya H239 Corded SIP Phone Overview",
      design: { title: "Design", formFactor: "An entry-level SIP phone with a 2.8-inch color display and 6 programmable soft keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2.8-inch (320x240) color LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A cost-effective phone for business users with a color display, HD audio, and 6-way audio conferencing support.", connectivityOptions: "PoE support and a built-in 2-port switch for PC pass-through." }
    }
  },
  {
    id: "avaya-12",
    name: "Avaya H249CORDEDSIPPHONEW/DISPLAY",
    price: "Get a Quote",
    image: "/avaya/13.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-h249-corded-sip-phone-with-display",
    description: {
      overview: "Avaya H249 Corded SIP Phone Overview",
      design: { title: "Design", formFactor: "A high-end corded SIP phone featuring a large 5-inch color display and programmable DSS keys for power users." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "5-inch (800x480) color LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB 2.0 port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Designed for receptionists and executives. Features 10 physical DSS keys (5 levels) for 50 programmable functions. Supports 6-way audio conferencing and HD audio.", connectivityOptions: "Gigabit Ethernet for high-speed pass-through and PoE support." }
    }
  },
  {
    id: "avaya-13",
    name: "Avaya J129IPPHONENOPWRSUPP",
    price: "Get a Quote",
    image: "/avaya/14.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-j129-ip-phone-no-power-supply",
    description: {
      overview: "Avaya J129 IP Phone (No Power Supply) Overview",
      design: { title: "Design", formFactor: "A cost-effective, single-line IP phone for basic communication needs in common areas or desktops. This model ships without a power supply." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Monochrome graphical display (128x32).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Ideal for users with basic communication needs. Supports one line, two concurrent calls, and three softkeys.", connectivityOptions: "Designed to be powered by PoE (Power over Ethernet). A separate power supply must be purchased if PoE is not available." }
    }
  },
  {
    id: "avaya-14",
    name: "Avaya 1 PORT 10GBase-SR XFP Transceiver",
    price: "Get a Quote",
    image: "/avaya/15.jpg",
    category: "Avaya, Transceiver",
    categorySlug: "switches",
    slug: "avaya-1-port-10gbase-sr-xfp-transceiver-dupe",
    description: {
      overview: "Avaya 1-Port 10GBase-SR XFP Transceiver Overview",
      design: { title: "Design", formFactor: "An XFP (10 Gigabit Small Form Factor Pluggable) optical transceiver module for high-speed network connections." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Duplex LC connector"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides a 10 Gigabit 'Short Range' (SR) connection over multimode fiber, typically up to 300 meters.", connectivityOptions: "Plugs into XFP-compatible ports on Avaya switches and routers." }
    }
  },
  {
    id: "avaya-15",
    name: "Avaya 1000BASE-LX, SFP network transceiver module 1000 Mbit/s",
    price: "Get a Quote",
    image: "/avaya/16.jpg",
    category: "Avaya, Transceiver, SFP",
    categorySlug: "switches",
    slug: "avaya-1000base-lx-sfp-network-transceiver-module-1000-mbit-s",
    description: {
      overview: "Avaya 1000BASE-LX SFP Transceiver Overview",
      design: { title: "Design", formFactor: "A standard SFP (Small Form-factor Pluggable) module for 1 Gigabit Ethernet connectivity." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Duplex LC connector"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides a 1 Gbps 'Long Range' (LX) connection over single-mode fiber, with a reach of up to 10 kilometers.", connectivityOptions: "Hot-swappable module for SFP-compatible ports on Avaya networking equipment." }
    }
  },
  {
    id: "avaya-16",
    name: "Avaya 1120E IP PHONE GRAPHITE – NO PSU",
    price: "Get a Quote",
    image: "/avaya/17.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1120e-ip-phone-graphite-no-psu-dupe",
    description: {
      overview: "Avaya 1120E IP Phone (Graphite, No PSU) Overview",
      design: { title: "Design", formFactor: "A professional, multi-line IP phone in a graphite finish. Features a large high-resolution graphical display and 4 softkeys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "High-resolution, backlit grayscale display (240x80 pixels).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A flexible phone for knowledge workers, supporting up to 4 line/feature keys. The USB port supports peripherals. Ships without a power supply, intended for PoE.", connectivityOptions: "Gigabit Ethernet pass-through and PoE support." }
    }
  },
  {
    id: "avaya-17",
    name: "Avaya 1120SA – VoIP phone",
    price: "Get a Quote",
    image: "/avaya/17.jpg",
    category: "Avaya, VoIP Phone",
    categorySlug: "accessories",
    slug: "avaya-1120sa-voip-phone-dupe",
    description: {
      overview: "Avaya 1120SA VoIP Phone Overview",
      design: { title: "Design", formFactor: "A secure, multi-line IP phone, likely a variant of the 1120E with specific security or software enhancements." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "High-resolution, backlit grayscale display (240x80 pixels).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides secure, reliable VoIP communications for business users. Features high-quality audio and a built-in Ethernet switch.", connectivityOptions: "Supports PoE and Gigabit Ethernet." }
    }
  },
  {
    id: "avaya-19",
    name: "Avaya 1140E IP Deskphone",
    price: "Get a Quote",
    image: "/avaya/18.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1140e-ip-deskphone-dupe",
    description: {
      overview: "Avaya 1140E IP Deskphone Overview",
      design: { title: "Design", formFactor: "An executive-class, multi-line IP phone with a high-resolution graphical display, designed for managers and power users." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "High-resolution, backlit grayscale display (240x160 pixels).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["Bluetooth (with adapter)"] },
      functionality: { title: "Functionality", versatility: "Supports up to 12 line/feature keys and features a USB port for expansion and Bluetooth headset support (via optional adapter).", connectivityOptions: "Gigabit Ethernet and PoE support." }
    }
  },
  {
    id: "avaya-21",
    name: "Avaya 1151B1 POWER SUPPLY",
    price: "Get a Quote",
    image: "/avaya/19.jpg",
    category: "Avaya, Power Supply",
    categorySlug: "accessories",
    slug: "avaya-1151b1-power-supply-dupe",
    description: {
      overview: "Avaya 1151B1 Power Supply Overview",
      design: { title: "Design", formFactor: "A local AC power adapter (power brick) designed to provide power to Avaya IP phones when PoE is not available." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["AC power input", "DC power output (to phone)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides reliable, local power to a single Avaya deskphone. A necessary accessory for non-PoE network drops.", connectivityOptions: "Compatible with various Avaya 1600, 9600, and other IP phone series." }
    }
  },
  {
    id: "avaya-22",
    name: "Avaya 1408IPphoneBlackWired",
    price: "Get a Quote",
    image: "/avaya/20.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1408-ip-phone-black-wired",
    description: {
      overview: "Avaya 1408 IP Deskphone Overview",
      design: { title: "Design", formFactor: "A digital phone for everyday users, featuring a 3-line display and 8 programmable line/feature keys with dual LEDs." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "3-line x 24 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable digital phone with a high-quality speakerphone and context-sensitive softkeys. Ideal for users who manage a moderate number of calls.", connectivityOptions: "Connects to Avaya IP Office systems." }
    }
  },
  {
    id: "avaya-23",
    name: "Avaya 1416 DIGITAL PHONE BLK",
    price: "Get a Quote",
    image: "/avaya/21.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-1416-digital-phone-blk-dupe",
    description: {
      overview: "Avaya 1416 Digital Deskphone (Black) Overview",
      design: { title: "Design", formFactor: "A black digital phone for receptionists and power users. Features 16 programmable line/feature keys and a 4-line backlit display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line adjustable graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Supports up to 3 DBM32 expansion modules, providing a total of 112 programmable keys for high-volume call handling.", connectivityOptions: "Designed for Avaya IP Office." }
    }
  },
  {
    id: "avaya-24",
    name: "Avaya 1608-I IP DESKPHONE ICON ONLY",
    price: "Get a Quote",
    image: "/avaya/22.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1608-i-ip-deskphone-icon-only-700415557",
    description: {
      overview: "Avaya 1608-I IP Deskphone Overview",
      design: { title: "Design", formFactor: "A multi-line IP phone for everyday users, featuring a 3-line display and 8 programmable line/feature keys with dual LEDs. 'Icon Only' version." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "3-line x 24 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable workhorse for users who need one-touch access to features and lines. Supports a full-duplex speakerphone.", connectivityOptions: "PoE support and a PC pass-through port." }
    }
  },
  {
    id: "avaya-25",
    name: "Avaya 1608IPPhone(700415557)",
    price: "Get a Quote",
    image: "/avaya/23.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1608ipphone-700415557",
    description: {
      overview: "Avaya 1608 IP Phone (700415557) Overview",
      design: { title: "Design", formFactor: "A standard 8-line IP deskphone for everyday users, featuring a 3-line backlit display and 8 programmable keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "3-line x 24 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides all essential IP telephony features, including a speakerphone and headset support, for moderate call volumes.", connectivityOptions: "Powered via PoE or optional local power supply." }
    }
  },
  {
    id: "avaya-26",
    name: "Avaya 1616-I IP phone Black 16 lines",
    price: "Get a Quote",
    image: "/avaya/24.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1616-i-ip-phone-black-16-lines",
    description: {
      overview: "Avaya 1616-I IP Deskphone Overview",
      design: { title: "Design", formFactor: "A high-volume IP phone for receptionists and power users. Features 16 programmable line/feature keys and a 4-line display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line adjustable backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Designed for call-intensive environments. Supports a 32-button expansion module (BM32) to add even more programmable keys.", connectivityOptions: "PoE support and a PC pass-through port." }
    }
  },
  {
    id: "avaya-27",
    name: "Avaya 1616IPPhone(700415565)",
    price: "Get a Quote",
    image: "/avaya/25.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1616ipphone-700415565",
    description: {
      overview: "Avaya 1616 IP Phone (700415565) Overview",
      design: { title: "Design", formFactor: "A 16-line IP deskphone designed for users who answer and transfer calls frequently. Features 16 physical keys with dual LEDs." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Adjustable 4-line backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "An ideal solution for receptionists and assistants. Supports the BM32 expansion module for a total of 48 feature keys.", connectivityOptions: "Full-duplex speakerphone and PoE support." }
  }
},
  {
    id: "avaya-28",
    name: "Avaya 3735 IP phone Black LCD 700513192",
    price: "Get a Quote",
    image: "/avaya/26.jpg",
    category: "Avaya, DECT Phone",
    categorySlug: "accessories",
    slug: "avaya-3735-ip-phone-black-lcd-700513192-dupe",
    description: {
      overview: "Avaya 3735 DECT Handset Overview",
      design: { title: "Design", formFactor: "A rugged DECT wireless handset designed for demanding environments like healthcare and manufacturing. Features a color display and Bluetooth." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Color LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Headset port"], wireless: ["DECT", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Provides secure, high-quality wireless voice communication. Features include a built-in speakerphone and Bluetooth for wireless headsets.", connectivityOptions: "Connects to Avaya IP Office or Aura via a DECT base station." }
    }
  },
  {
    id: "avaya-29",
    name: "Avaya 3745 IP phone Black LCD 700510284",
    price: "Get a Quote",
    image: "/avaya/27.jpg",
    category: "Avaya, DECT Phone",
    categorySlug: "accessories",
    slug: "avaya-3745-ip-phone-black-lcd-700510284-dupe",
    description: {
      overview: "Avaya 3745 DECT Handset Overview",
      design: { title: "Design", formFactor: "A ruggedized, enterprise-grade DECT handset for industrial environments. Features a backlit color display and keypad, and IP65 rating for water/dust resistance." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Color LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Headset port"], wireless: ["DECT", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Built for tough conditions, offering secure wireless communication with long battery life, speakerphone, and Bluetooth headset support.", connectivityOptions: "Integrates with Avaya Aura and IP Office DECT systems." }
    }
  },
  {
    id: "avaya-30",
    name: "Avaya 3901 Headsets",
    price: "Get a Quote",
    image: "/avaya/28.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-3901-headsets-dupe",
    description: {
      overview: "Avaya 3901 Headset Overview",
      design: { title: "Design", formFactor: "An entry-level, over-the-head single-ear (monaural) headset with a noise-canceling microphone." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Quick Disconnect (QD) or RJ9 port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A cost-effective solution for call centers or office users who need a basic, reliable wired headset for hands-free communication.", connectivityOptions: "Connects to compatible Avaya digital or IP phones via an RJ9 or QD cable." }
    }
  },
  {
    id: "avaya-31",
    name: "Avaya 3904 Digital Deskphone",
    price: "Get a Quote",
    image: "/avaya/29.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-3904-digital-deskphone-dupe",
    description: {
      overview: "Avaya (Nortel) M3904 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "A professional, multi-line digital phone for managers and power users. Features a large 5-line graphical display and 6 programmable feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "5-line x 24 character graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A versatile phone that supports an expansion module and a PC utility for easy programming. Features a high-quality speakerphone.", connectivityOptions: "Designed for Nortel/Avaya Meridian and CS 1000 systems." }
    }
  },
  {
    id: "avaya-32",
    name: "Avaya 3905 Digital Deskphone",
    price: "Get a Quote",
    image: "/avaya/30.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-3905-digital-deskphone-dupe",
    description: {
      overview: "Avaya (Nortel) M3905 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "An advanced digital phone for call center agents and receptionists. Features a large display and 8 programmable line/feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Large 8-line graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "2x Headset ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A call center workhorse with a direct-connect headset jack and features tailored for agent productivity.", connectivityOptions: "Connects to Nortel/Avaya Meridian and CS 1000 systems." }
    }
  },
  {
    id: "avaya-33",
    name: "Avaya 4550T WITH 48 10/100 BASETX",
    price: "Get a Quote",
    image: "/avaya/31.jpg",
    category: "Avaya, Switch",
    categorySlug: "switches",
    slug: "avaya-4550t-with-48-10-100-basetx-dupe",
    description: {
      overview: "Avaya 4550T 48-Port 10/100 Switch Overview",
      design: { title: "Design", formFactor: "A 48-port, 1U rack-mountable Ethernet Routing Switch. Features 48 10/100 Fast Ethernet ports and uplink ports." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["48x 10/100Base-TX ports", "2x SFP/1000Base-T combo ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A stackable Layer 3 switch for the network edge, providing reliable connectivity and routing features for enterprise networks.", connectivityOptions: "Offers high-density Fast Ethernet ports and Gigabit uplinks for aggregation." }
    }
  },
  {
    id: "avaya-34",
    name: "Avaya 5520-48T-PWR with 48 10/100/1000",
    price: "Get a Quote",
    image: "/avaya/32.jpg",
    category: "Avaya, Switch",
    categorySlug: "switches",
    slug: "avaya-5520-48t-pwr-with-48-10-100-1000-dupe",
    description: {
      overview: "Avaya 5520-48T-PWR 48-Port Gigabit Switch Overview",
      design: { title: "Design", formFactor: "A 48-port, 1U rack-mountable Gigabit Ethernet Routing Switch with PoE (Power over Ethernet) capability." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["48x 10/100/1000 PoE ports", "4x SFP uplink ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A high-density, stackable Layer 3 switch for the network edge, providing Gigabit speeds and power to devices like IP phones and access points.", connectivityOptions: "Supports stacking and SFP uplinks for a scalable and resilient network." }
    }
  },
  {
    id: "avaya-35",
    name: "Avaya 6416D+M Digital Telephone",
    price: "Get a Quote",
    image: "/avaya/33.jpg",
    category: "Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "avaya-6416d-m-digital-telephone-dupe",
    description: {
      overview: "Avaya 6416D+M Digital Telephone Overview",
      design: { title: "Design", formFactor: "A professional multi-line digital phone with a 2-line display and 16 programmable keys. The '+M' indicates it has a built-in speakerphone." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2-line x 24 character LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable digital phone for users with high call volumes. Features 16 programmable keys for lines, features, or speed dials.", connectivityOptions: "Connects to Avaya Definity and Communication Manager systems." }
    }
  },
  {
    id: "avaya-36",
    name: "Avaya 700466253 mobile device charger Black Indoor",
    price: "Get a Quote",
    image: "/avaya/7004806253.jpg",
    category: "Avaya, Charger",
    categorySlug: "accessories",
    slug: "avaya-700466253-mobile-device-charger-black-indoor",
    description: {
      overview: "Avaya 700466253 Mobile Device Charger Overview",
      design: { title: "Design", formFactor: "A charging cradle or base station designed to charge Avaya mobile devices, such as DECT handsets." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["DC power input"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides a stable, indoor charging solution to ensure Avaya wireless handsets are always ready for use.", connectivityOptions: "Specific to compatible Avaya mobile devices." }
    }
  },
  {
    id: "avaya-38",
    name: "Avaya 700513569 J179 IP phone Wired handset",
    price: "Get a Quote",
    image: "/avaya/J179.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-700513569-j179-ip-phone-wired-handset-dupe",
    description: {
      overview: "Avaya J179 IP Phone (700513569) Overview",
      design: { title: "Design", formFactor: "A high-performance IP phone for power users. Features a large color display, 8 programmable keys with dual LEDs, and a wired handset." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2.8-inch (320x240) color display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["Wi-Fi (via optional J100 module)"] },
      functionality: { title: "Functionality", versatility: "Supports Avaya's SIP and H.323 protocols. Can be expanded with up to three 24-button expansion modules. Supports HD audio.", connectivityOptions: "Gigabit Ethernet, PoE, and optional Wi-Fi/Bluetooth." }
    }
  },
  {
    id: "avaya-39",
    name: "Avaya 700513905 Vantage K175 IP phone Black,Grey Wi-Fi",
    price: "Get a Quote",
    image: "/avaya/K175.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-700513905-vantage-k175-ip-phone-black-grey-wi-fi",
    description: {
      overview: "Avaya Vantage K175 IP Phone Overview",
      design: { title: "Design", formFactor: "A premium, all-glass touchscreen deskphone. Features a large 8-inch color touchscreen and an optional wired or wireless handset." },
      performance: { title: "Performance", processor: "Runs on a powerful Android-based OS", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "8-inch capacitive touchscreen (1280x800).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB-C"], wireless: ["Integrated Wi-Fi", "Integrated Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A next-generation collaboration device. Runs third-party apps, supports video conferencing (with optional camera), and provides a rich, intuitive user experience.", connectivityOptions: "Full connectivity with Gigabit Ethernet, PoE, Wi-Fi, and Bluetooth." }
    }
  },
  {
    id: "avaya-40",
    name: "Avaya 700513916 J139 IP phone Wired handset",
    price: "Get a Quote",
    image: "/avaya/J139.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-700513916-j139-ip-phone-wired-handset",
    description: {
      overview: "Avaya J139 IP Phone (700513916) Overview",
      design: { title: "Design", formFactor: "An entry-level IP phone for everyday users. Features a 2.8-inch color display and 4 programmable softkeys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2.8-inch (320x240) color display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A cost-effective choice for users who need basic telephony on a modern, color-display IP phone. Supports 4 line appearances.", connectivityOptions: "Gigabit Ethernet and PoE support." }
    }
  },
  {
    id: "avaya-41",
    name: "Avaya 9611G IP phone",
    price: "Get a Quote",
    image: "/avaya/9611G.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-9611g-ip-phone",
    description: {
      overview: "Avaya 9611G IP Deskphone Overview",
      design: { title: "Design", formFactor: "A professional, multi-line IP phone with a 2.8-inch color display and 8 programmable line/feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2.8-inch (320x240) color display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerful phone for essential users. Features wideband audio, a full-duplex speakerphone, and support for a 12-button expansion module.", connectivityOptions: "Gigabit Ethernet, PoE, and a built-in USB port." }
    }
  },
  {
    id: "avaya-42",
    name: "Avaya 9641 IP phone Wired handset LCD 5 lines",
    price: "Get a Quote",
    image: "/avaya/9641.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-9641-ip-phone-wired-handset-lcd-5-lines",
    description: {
      overview: "Avaya 9641G IP Deskphone Overview",
      design: { title: "Design", formFactor: "An executive-class IP phone with a large 5-inch color touchscreen, designed for power users and navigators." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "5-inch (480x272) color touchscreen.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["Integrated Bluetooth"] },
      functionality: { title: "Functionality", versatility: "A premium phone with wideband audio, a full-duplex speakerphone, and integrated Bluetooth for wireless headsets.", connectivityOptions: "Gigabit Ethernet, PoE, and USB support." }
    }
  },
  {
    id: "avaya-43",
    name: "Avaya B100 Expansion Microphones-700501539",
    price: "Get a Quote",
    image: "/avaya/B100-mics.jpg",
    category: "Avaya, Conference Phone, Accessory",
    categorySlug: "accessories",
    slug: "avaya-b100-expansion-microphones-700501539-dupe",
    description: {
      overview: "Avaya B100 Expansion Microphones Overview",
      design: { title: "Design", formFactor: "A pair of expansion microphones designed to extend the audio pickup range of Avaya B100-series conference phones." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Proprietary connection cables"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Increases the voice pickup range, making them ideal for larger conference rooms. Features mute buttons on each microphone pod.", connectivityOptions: "Plug-and-play connection to compatible Avaya conference phones (e.g., B149, B159, B179)." }
    }
  },
  {
    id: "avaya-44",
    name: "Avaya B109 Conference Phone",
    price: "Get a Quote",
    image: "/avaya/B109.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b109-conference-phone-dupe",
    description: {
      overview: "Avaya B109 Conference Phone Overview",
      design: { title: "Design", formFactor: "A compact, portable conference phone designed for small meeting rooms and huddle spaces. Fits easily in a briefcase." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Small LCD display for call information.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB 2.0"], wireless: ["Bluetooth with NFC", "Headset port (3.5mm)"] },
      functionality: { title: "Functionality", versatility: "A highly flexible device. Connects to a PC via USB for VoIP calls or to a mobile phone/tablet via Bluetooth. Features OmniSound audio and a built-in rechargeable battery.", connectivityOptions: "Connects to laptops, smartphones, and tablets." }
    }
  },
  {
    id: "avaya-45",
    name: "Avaya B149 Conference Phone",
    price: "Get a Quote",
    image: "/avaya/B149.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b149-conference-phone-dupe",
    description: {
      overview: "Avaya B149 Analog Conference Phone Overview",
      design: { title: "Design", formFactor: "An analog conference phone for small to mid-sized rooms. Features a simple keypad and backlit LCD display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Analog (RJ11) connection", "Expansion microphone ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features OmniSound 2.0 for superior audio quality. Can be supplemented with expansion microphones for larger groups.", connectivityOptions: "Connects to any standard analog phone line or PBX port." }
    }
  },
  {
    id: "avaya-46",
    name: "Avaya B159 Conference Phone",
    price: "Get a Quote",
    image: "/avaya/B159-alt.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b159-conference-phone-dupe",
    description: {
      overview: "Avaya B159 Analog Conference Phone Overview",
      design: { title: "Design", formFactor: "A powerful analog conference phone for medium to large rooms. Features an alphanumeric keypad and graphical display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Analog (RJ11) connection", "Expansion microphone ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Features OmniSound technology and supports call recording to an SD card. Can be expanded with microphones for larger tables.", connectivityOptions: "Connects to a standard analog phone line." }
    }
  },
  {
    id: "avaya-47",
    name: "Avaya B169 Wireless Conference Phone",
    price: "Get a Quote",
    image: "/avaya/B169.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b169-wireless-conference-phone-dupe",
    description: {
      overview: "Avaya B169 Wireless Conference Phone Overview",
      design: { title: "Design", formFactor: "A wireless conference phone that runs on a rechargeable battery, allowing for a cable-free meeting table. Connects via a DECT base station." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB port", "Charging pins"], wireless: ["DECT 6.0"] },
      functionality: { title: "Functionality", versatility: "Provides the freedom of a wireless connection with OmniSound audio quality. Can record calls to an SD card. Long-lasting battery.", connectivityOptions: "The DECT base station connects to an analog phone line or PBX." }
    }
  },
  {
    id: "avaya-48",
    name: "Avaya B169IPconferencephone",
    price: "Get a Quote",
    image: "/avaya/B169.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b169-ip-conference-phone",
    description: {
      overview: "Avaya B169 Wireless Conference Phone Overview",
      design: { title: "Design", formFactor: "A wireless DECT conference phone, providing a clean, cable-free solution for meeting rooms. Includes a charging base and rechargeable battery." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB port (on phone)", "Analog (RJ11) (on base)"], wireless: ["DECT 6.0"] },
      functionality: { title: "Functionality", versatility: "Features OmniSound HD audio, SD card recording, and a long battery life for all-day meetings.", connectivityOptions: "The base station connects to an analog line, while the phone unit is completely wireless." }
    }
  },
  {
    id: "avaya-49",
    name: "Avaya B169WIRELESSCONFERENCEPHONE",
    price: "Get a Quote",
    image: "/avaya/B169.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b169-wireless-conference-phone-dupe-2",
    description: {
      overview: "Avaya B169 Wireless Conference Phone Overview",
      design: { title: "Design", formFactor: "A wireless DECT conference phone designed for flexible meeting spaces. Includes main unit, charging cradle, and DECT base station." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB", "Analog (on base)"], wireless: ["DECT"] },
      functionality: { title: "Functionality", versatility: "Allows for cable-free conferencing with OmniSound HD audio and a built-in battery. Supports SD card recording.", connectivityOptions: "Base connects to an analog phone line; unit is wireless." }
    }
  },
  {
    id: "avaya-50",
    name: "Avaya B179 Conference VoIP phone",
    price: "Get a Quote",
    image: "/avaya/B179.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b179-conference-voip-phone-dupe",
    description: {
      overview: "Avaya B179 SIP Conference Phone Overview",
      design: { title: "Design", formFactor: "A powerful, network-connected SIP conference phone for medium to large rooms. Features a backlit graphical display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 10/100 Ethernet port (PoE)", "Expansion microphone ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Connects directly to your IP network (SIP). Features OmniSound HD audio, SD card recording, and can be expanded with microphones.", connectivityOptions: "Powered via PoE or optional local power supply." }
    }
  },
  {
    id: "avaya-51",
    name: "Avaya B179 CONFERENCE PHONE",
    price: "Get a Quote",
    image: "/avaya/B179-alt.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b179-conference-phone",
    description: {
      overview: "Avaya B179 SIP Conference Phone Overview",
      design: { title: "Design", formFactor: "A versatile SIP-based conference phone designed for IP networks. Features OmniSound HD audio and a backlit display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit graphical LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 10/100 Ethernet port (PoE)", "Expansion microphone ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Ideal for boardrooms, this phone supports SD card recording, expansion microphones, and integrates with Avaya Aura and IP Office.", connectivityOptions: "Connects to your network via Ethernet and is powered by PoE." }
    }
  },
  {
    id: "avaya-52",
    name: "Avaya B189 IP Conference Phone",
    price: "Get a Quote",
    image: "/avaya/B189.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b189-ip-conference-phone-dupe",
    description: {
      overview: "Avaya B189 IP Conference Phone Overview",
      design: { title: "Design", formFactor: "An executive IP conference phone with a large 5-inch color touchscreen and a sleek, modern profile." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "5-inch color touchscreen display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit Ethernet port (PoE)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Delivers exceptional audio clarity with OmniSound technology. The intuitive touchscreen makes call management and setup easy.", connectivityOptions: "Connects to Avaya Aura systems. Powered via PoE." }
    }
  },
  {
    id: "avaya-53",
    name: "Avaya B199 IP conference phone 700514246",
    price: "Get a Quote",
    image: "/avaya/B199-alt.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-b199-ip-conference-phone-700514246",
    description: {
      overview: "Avaya B199 IP Conference Phone Overview",
      design: { title: "Design", formFactor: "A next-generation SIP conference phone with a 4.3-inch color touchscreen and a modern, modular design." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4.3-inch color touchscreen.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x Gigabit Ethernet port (PoE)", "USB 3.0", "Expansion ports"], wireless: ["Bluetooth", "NFC"] },
      functionality: { title: "Functionality", versatility: "Features Avaya OmniSound with HD audio. Can be daisy-chained with other B199 units or expansion microphones for very large rooms.", connectivityOptions: "Connects via Gigabit PoE, USB, or Bluetooth to mobile devices." }
    }
  },
  {
    id: "avaya-54",
    name: "Avaya Conference Phone B199",
    price: "Get a Quote",
    image: "/avaya/B199.jpg",
    category: "Avaya, Conference Phone",
    categorySlug: "accessories",
    slug: "avaya-conference-phone-b199-dupe",
    description: {
      overview: "Avaya B199 IP Conference Phone Overview",
      design: { title: "Design", formFactor: "A modular, SIP-based conference phone with a 4.3-inch color touchscreen for intuitive call control." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4.3-inch color touchscreen.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Gigabit Ethernet (PoE)", "USB 3.0", "Expansion ports"], wireless: ["Bluetooth", "NFC"] },
      functionality: { title: "Functionality", versatility: "Delivers exceptional audio quality with OmniSound. Highly scalable, allowing connection of expansion mics or daisy-chaining multiple B199 units.", connectivityOptions: "A future-proof solution with SIP, USB, and Bluetooth connectivity." }
    }
  },
  {
    id: "avaya-55",
    name: "AVAYA CU360 HUDDLE ROOM DEVICE 700513892 – NEW",
    price: "Get a Quote",
    image: "/avaya/room-device.jpg",
    category: "Avaya, Video Conference",
    categorySlug: "accessories",
    slug: "avaya-cu360-huddle-room-device-700513892-new",
    description: {
      overview: "Avaya CU360 Collaboration Unit Overview",
      design: { title: "Design", formFactor: "An all-in-one, camera-top video conferencing system designed for huddle rooms. Features an integrated 4K camera and microphone array." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (Connects to TV/Monitor)", graphics: "4K camera sensor" },
      connectivity: { title: "Connectivity", ports: ["HDMI output", "HDMI input", "USB", "Ethernet"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "Turns any display into a video collaboration system. Integrates with cloud video services (like Zoom, Teams) and Avaya Spaces. Supports screen sharing.", connectivityOptions: "Easy to set up, connects to your network via Wi-Fi or Ethernet." }
    }
  },
  {
    id: "avaya-56",
    name: "Avaya DECT 3730 DECT telephone handset Caller",
    price: "Get a Quote",
    image: "/avaya/3730.jpg",
    category: "Avaya, DECT Phone",
    categorySlug: "accessories",
    slug: "avaya-dect-3730-telephone-handset-caller-dupe",
    description: {
      overview: "Avaya DECT 3730 Handset Overview",
      design: { title: "Design", formFactor: "A reliable DECT wireless handset for general office use. Features a monochrome backlit display and speakerphone." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Monochrome backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Headset port (2.5mm)"], wireless: ["DECT"] },
      functionality: { title: "Functionality", versatility: "Provides high-quality wireless voice communication for mobile employees in an office environment. Supports messaging and a local phonebook.", connectivityOptions: "Connects to Avaya IP Office or Aura via a DECT base station system." }
    }
  },
  {
    id: "avaya-57",
    name: "Avaya ETHERNET ROUTING SWITCH 4526T WITH",
    price: "Get a Quote",
    image: "/avaya/4526T.jpg",
    category: "Avaya, Switch",
    categorySlug: "switches",
    slug: "avaya-ethernet-routing-switch-4526t-with",
    description: {
      overview: "Avaya Ethernet Routing Switch 4526T Overview",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with 24 10/100 Fast Ethernet ports and 2 combo Gigabit SFP/T ports." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x 10/100Base-TX ports", "2x Combo Gigabit SFP/T ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A stackable Layer 3 switch for the network edge, providing reliable connectivity and basic routing for small to mid-sized networks.", connectivityOptions: "Supports stacking and offers fiber/copper Gigabit uplinks." }
    }
  },
  {
    id: "avaya-58",
    name: "Avaya GLOBAL SNGL PT POE INJECTOR KIT",
    price: "Get a Quote",
    image: "/avaya/poe-injector.jpg",
    category: "Avaya, PoE Injector",
    categorySlug: "accessories",
    slug: "avaya-global-sngl-pt-poe-injector-kit-dupe",
    description: {
      overview: "Avaya Single Port PoE Injector Kit Overview",
      design: { title: "Design", formFactor: "A compact, single-port Power over Ethernet (PoE) injector, used to power a single IP device." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x RJ45 Data In", "1x RJ45 Data & Power Out", "AC power input"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Adds PoE capability to a non-PoE network switch port. Used to power a single IP phone, access point, or camera.", connectivityOptions: "Provides power and data over a single Ethernet cable to the end device." }
    }
  },
  {
    id: "avaya-59",
    name: "Avaya H175VIDEOCOLLABSTN",
    price: "Get a Quote",
    image: "/avaya/H175.jpg",
    category: "Avaya, Video Conference",
    categorySlug: "accessories",
    slug: "avaya-h175-video-collab-stn-dupe",
    description: {
      overview: "Avaya H175 Video Collaboration Station Overview",
      design: { title: "Design", formFactor: "An executive video phone with a 7-inch touchscreen, 1080p camera, and a detachable wireless handset." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "7-inch capacitive touchscreen.", graphics: "1080p HD camera" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "HDMI output", "USB"], wireless: ["Wi-Fi", "Bluetooth"] },
      functionality: { title: "Functionality", versatility: "An all-in-one desktop device for voice, video, and collaboration. Runs on Android and supports Avaya communication platforms.", connectivityOptions: "Full connectivity with Gigabit Ethernet, PoE, Wi-Fi, and Bluetooth." }
    }
  },
  {
    id: "avaya-60",
    name: "Avaya IP PHONE 1616-I BLK",
    price: "Get a Quote",
    image: "/avaya/1616-blk.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-ip-phone-1616-i-blk-dupe",
    description: {
      overview: "Avaya 1616-I IP Deskphone (Black) Overview",
      design: { title: "Design", formFactor: "A black 16-line IP phone for receptionists. Features 16 programmable keys, an adjustable 4-line display, and an expansion port." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "4-line adjustable backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x 10/100 Ethernet ports", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Designed for high-volume call handling, supporting the BM32 expansion module for up to 48 programmable keys.", connectivityOptions: "PoE support and a PC pass-through port." }
    }
  },
  {
    id: "avaya-61",
    name: "Avaya IP PHONE 9611G ICON ONLY",
    price: "Get a Quote",
    image: "/avaya/9611G.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-ip-phone-9611g-icon-only-dupe",
    description: {
      overview: "Avaya 9611G IP Deskphone (Icon Only) Overview",
      design: { title: "Design", formFactor: "A multi-line Gigabit IP phone with a 2.8-inch color display and 8 programmable keys. 'Icon Only' version uses universal icons on keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2.8-inch (320x240) color display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerful phone for essential users. Features wideband audio and a full-duplex speakerphone. Supports an expansion module.", connectivityOptions: "Gigabit Ethernet for high-speed pass-through and PoE support." }
    }
  },
  {
    id: "avaya-62",
    name: "Avaya J159 IP phone LED Wi-Fi",
    price: "Get a Quote",
    image: "/avaya/J159.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-j159-ip-phone-led-wi-fi-dupe",
    description: {
      overview: "Avaya J159 IP Phone Overview",
      design: { title: "Design", formFactor: "An advanced IP phone with two color displays, 10 programmable keys, and LED indicators. Designed for power users." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Primary 2.8-inch color display and secondary 2.4-inch color display for programmable keys.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["Wi-Fi (via optional J100 module)"] },
      functionality: { title: "Functionality", versatility: "A high-performance phone with 10 physical keys (5 levels) for 50 feature/line appearances. Supports HD audio.", connectivityOptions: "Gigabit Ethernet, PoE, and optional Wi-Fi." }
    }
  },
  {
    id: "avaya-63",
    name: "Avaya J169 Ip Phone Black Wired Handset",
    price: "Get a Quote",
    image: "/avaya/J169.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-j169-ip-phone-black-wired-handset-dupe",
    description: {
      overview: "Avaya J169 IP Phone Overview",
      design: { title: "Design", formFactor: "A mid-range IP phone with a sleek, modern design. Features a grayscale graphical display and 8 programmable keys with dual LEDs." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "3.5-inch grayscale display (160x320).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A perfect choice for users who need a high-quality phone with multiple line appearances and feature keys. Supports HD audio.", connectivityOptions: "Gigabit Ethernet and PoE support." }
    }
  },
  {
    id: "avaya-64",
    name: "Avaya JEM24 Expansion Module 700514337 for",
    price: "Get a Quote",
    image: "/avaya/JEM24.jpg",
    category: "Avaya, Expansion Module",
    categorySlug: "accessories",
    slug: "avaya-jem24-expansion-module-700514337-dupe",
    description: {
      overview: "Avaya JEM24 Expansion Module Overview",
      design: { title: "Design", formFactor: "An add-on module for Avaya J169 and J179 phones. Provides 24 additional programmable keys with dual-color LEDs." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Grayscale display for button labels.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Connects directly to the side of the host phone"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Expands the capabilities of a J169/J179 phone, making it ideal for receptionists and admins. Up to three modules can be connected.", connectivityOptions: "Powered by the host phone." }
    }
  },
  {
    id: "avaya-65",
    name: "Avaya L119 Headset Quick",
    price: "Get a Quote",
    image: "/avaya/L119.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-l119-headset-quick-dupe",
    description: {
      overview: "Avaya L119 Headset Overview",
      design: { title: "Design", formFactor: "An entry-level, over-the-head single-ear (monaural) headset with a flexible boom mic and Quick Disconnect (QD)." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Quick Disconnect (QD)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A cost-effective headset for call centers, featuring a noise-canceling microphone. The QD allows users to unplug without removing the headset.", connectivityOptions: "Requires a separate QD-to-RJ9/USB adapter cable." }
    }
  },
  {
    id: "avaya-66",
    name: "Avaya L129 Headset",
    price: "Get a Quote",
    image: "/avaya/L129.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-l129-headset-dupe",
    description: {
      overview: "Avaya L129 Headset Overview",
      design: { title: "Design", formFactor: "A single-ear (monaural) wired headset with a noise-canceling microphone and an RJ9 connector." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["RJ9 connector"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "An entry-level headset designed for users who need a simple, reliable hands-free solution for their desk phone.", connectivityOptions: "Plugs directly into the headset port of most Avaya phones." }
    }
  },
  {
    id: "avaya-67",
    name: "Avaya L139 QD Mono Headset",
    price: "Get a Quote",
    image: "/avaya/L139.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-l139-qd-mono-headset-dupe",
    description: {
      overview: "Avaya L139 Monaural Headset Overview",
      design: { title: "Design", formFactor: "A professional, over-the-head single-ear (monaural) headset with a flexible noise-canceling boom mic." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Quick Disconnect (QD)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A durable headset for call-intensive environments. The noise-canceling mic filters background noise. QD provides walkaway convenience.", connectivityOptions: "Requires a compatible QD adapter cable for your phone or PC." }
    }
  },
  {
    id: "avaya-68",
    name: "Avaya L149 Headset",
    price: "Get a Quote",
    image: "/avaya/L149.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-l149-headset-dupe",
    description: {
      overview: "Avaya L149 Binaural Headset Overview",
      design: { title: "Design", formFactor: "A professional, over-the-head dual-ear (binaural) headset with a noise-canceling boom mic." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Quick Disconnect (QD)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Ideal for noisy environments, the dual speakers block out distractions, allowing for better focus. Features a noise-canceling mic.", connectivityOptions: "Connects via a Quick Disconnect (QD) adapter cable." }
    }
  },
  {
    id: "avaya-69",
    name: "Avaya L159 Headset",
    price: "Get a Quote",
    image: "/avaya/L159.jpg",
    category: "Avaya, Headset",
    categorySlug: "accessories",
    slug: "avaya-l159-headset-dupe",
    description: {
      overview: "Avaya L159 Binaural Headset Overview",
      design: { title: "Design", formFactor: "A premium, dual-ear (binaural) headset with a 360-degree boom mic and leatherette ear cushions for all-day comfort." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Quick Disconnect (QD)"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A top-tier headset for call center professionals and remote workers needing superior audio quality and noise isolation.", connectivityOptions: "Quick Disconnect (QD) for multi-device flexibility (with different adapters)." }
    }
  },
  {
    id: "avaya-70",
    name: "Avaya NTYS03AFE61120EIPDeskphone",
    price: "Get a Quote",
    image: "/avaya/NTYS03.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-ntys03afe61120eipdeskphone",
    description: {
      overview: "Avaya (Nortel) 1120E IP Deskphone Overview",
      design: { title: "Design", formFactor: "A multi-line IP phone with a large high-resolution graphical display, 4 softkeys, and a built-in USB port." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "High-resolution, backlit grayscale display (240x80 pixels).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A flexible phone for knowledge workers, supporting up to 4 line/feature keys. The USB port supports peripherals.", connectivityOptions: "Gigabit Ethernet pass-through and PoE support." }
    }
  },
  {
    id: "avaya-71",
    name: "Avaya Room System XT4300",
    price: "Get a Quote",
    image: "/avaya/XT4300.jpg",
    category: "Avaya, Video Conference",
    categorySlug: "accessories",
    slug: "avaya-room-system-xt4300-dupe",
    description: {
      overview: "Avaya Scopia XT4300 Room System Overview",
      design: { title: "Design", formFactor: "A compact, all-in-one video conferencing system for small to mid-sized rooms. Includes a main codec/camera unit and a microphone pod." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (Connects to TV)", graphics: "Supports 1080p 60fps video and content sharing." },
      connectivity: { title: "Connectivity", ports: ["HDMI in/out", "Ethernet", "USB"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerful and cost-effective room system offering dual 1080p/60fps video, H.264 High Profile, and Scalable Video Coding (SVC).", connectivityOptions: "Integrates with Avaya's video conferencing infrastructure." }
    }
  },
  {
    id: "avaya-72",
    name: "Avaya Room System XT5000",
    price: "Get a Quote",
    image: "/avaya/XT5000.jpg",
    category: "Avaya, Video Conference",
    categorySlug: "accessories",
    slug: "avaya-room-system-xt5000-dupe",
    description: {
      overview: "Avaya Scopia XT5000 Room System Overview",
      design: { title: "Design", formFactor: "A high-performance video conferencing system for large meeting rooms. Includes a powerful codec, a PTZ (pan-tilt-zoom) camera, and a microphone pod." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (Connects to TV)", graphics: "Supports dual 1080p 60fps video streams (live video & content)." },
      connectivity: { title: "Connectivity", ports: ["HDMI in/out", "DVI-I", "Ethernet", "USB"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "The flagship room system, offering exceptional video and audio performance. Supports 9-way multi-party conferencing (embedded MCU).", connectivityOptions: "A highly flexible system for complex collaboration needs." }
    }
  },
  {
    id: "avaya-73",
    name: "Avaya Room System XT7100",
    price: "Get a Quote",
     image: "/avaya/XT7100.jpg",
    category: "Avaya, Video Conference",
    categorySlug: "accessories",
    slug: "avaya-room-system-xt7100-dupe",
    description: {
      overview: "Avaya Scopia XT7100 Room System Overview",
      design: { title: "Design", formFactor: "An elite, all-in-one video conferencing system with an integrated 4K camera and codec, designed for simplicity and power." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (Connects to TV)", graphics: "Supports 4K video and content sharing." },
      connectivity: { title: "Connectivity", ports: ["HDMI in/out", "Ethernet", "USB 3.0"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Delivers an ultra-HD 4K experience. Features H.265 (HEVC) for high-efficiency video, saving bandwidth.", connectivityOptions: "A top-of-the-line system for executive boardrooms." }
    }
  },
  {
    id: "avaya-74",
    name: "Avaya Routing Switch 4524GT-PWR – switch – 24 ports",
    price: "Get a Quote",
    image: "/avaya/4524GT-PWR.jpg",
    category: "Avaya, Switch",
    categorySlug: "switches",
    slug: "avaya-routing-switch-4524gt-pwr-switch-24-ports",
    description: {
      overview: "Avaya 4524GT-PWR 24-Port Switch Overview",
      design: { title: "Design", formFactor: "A 24-port, 1U rack-mountable Gigabit Ethernet Routing Switch with PoE (Power over Ethernet)." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["24x 10/100/1000 PoE ports", "4x SFP combo uplink ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A stackable Layer 3 switch for the network edge, providing Gigabit speeds and power to IP phones, APs, and cameras.", connectivityOptions: "Features 4 SFP combo ports for flexible fiber or copper uplinks." }
    }
  },
  {
    id: "avaya-75",
    name: "Avaya1 603IPPhone(700415540)",
    price: "Get a Quote",
    image: "/avaya/1603.jpg",
    category: "Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "avaya-1603-ip-phone-700415540",
    description: {
      overview: "Avaya 1603 IP Phone (700415540) Overview",
      design: { title: "Design", formFactor: "An entry-level IP phone for common area use. Features a 2-line display and 3 programmable feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "2-line x 16 character backlit display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x 10/100 Ethernet port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A simple, cost-effective phone for basic VoIP communication, ideal for lobbies or guest rooms. Does not have a PC pass-through port.", connectivityOptions: "Powered by PoE or optional local power supply." }
    }
  },
  {
    id: "avaya-76",
    name: "Nortel IPPhone1140E(NTYS05)",
    price: "Get a Quote",
    image: "/avaya/Nortel-1140E.jpg",
    category: "Nortel, Avaya, IP Phone",
    categorySlug: "accessories",
    slug: "nortel-ip-phone-1140e-ntys05",
    description: {
      overview: "Nortel (Avaya) 1140E IP Deskphone Overview",
      design: { title: "Design", formFactor: "An executive-class, multi-line IP phone with a high-resolution graphical display, designed for managers and power users." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "High-resolution, backlit grayscale display (240x160 pixels).", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["2x Gigabit Ethernet ports", "Headset port", "USB port"], wireless: ["Bluetooth (with adapter)"] },
      functionality: { title: "Functionality", versatility: "Supports up to 12 line/feature keys and features a USB port for expansion and Bluetooth headset support (via optional adapter).", connectivityOptions: "Gigabit Ethernet and PoE support." }
    }
  },
  {
    id: "avaya-77",
    name: "Nortel M3902DigitalPhone(NTMN32)",
    price: "Get a Quote",
    image: "/avaya/Nortel-M3902.jpg",
    category: "Nortel, Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "nortel-m3902-digital-phone-ntmn32",
    description: {
      overview: "Nortel (Avaya) M3902 Digital Phone Overview",
      design: { title: "Design", formFactor: "An economical, single-line digital phone for common areas or users with light call volume. Features a simple display." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "1-line x 24 character display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A reliable, basic digital phone for Nortel/Avaya Meridian and CS 1000 systems. Features 6 fixed feature keys.", connectivityOptions: "Connects to a digital station port." }
    }
  },
  {
    id: "avaya-78",
    name: "Nortel M3904DigitalPhone(NTMN34)",
    price: "Get a Quote",
    image: "/avaya/Nortel-M3904.jpg",
    category: "Nortel, Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "nortel-m3904-digital-phone-ntmn34",
    description: {
      overview: "Nortel (Avaya) M3904 Digital Phone Overview",
      design: { title: "Design", formFactor: "A professional, multi-line digital phone for managers and power users. Features a large 5-line graphical display and 6 programmable feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "5-line x 24 character graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "Headset port", "Expansion module port"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A versatile phone that supports an expansion module and a PC utility for easy programming. Features a high-quality speakerphone.", connectivityOptions: "Designed for Nortel/Avaya Meridian and CS 1000 systems." }
    }
  },
  {
    id: "avaya-79",
    name: "Nortel M3905DigitalPhone(NTMN35)",
    price: "Get a Quote",
    image: "/avaya/Nortel-M3905.jpg",
    category: "Nortel, Avaya, Digital Phone",
    categorySlug: "accessories",
    slug: "nortel-m3905-digital-phone-ntmn35",
     description: {
      overview: "Nortel (Avaya) M3905 Digital Deskphone Overview",
      design: { title: "Design", formFactor: "An advanced digital phone for call center agents and receptionists. Features a large display and 8 programmable line/feature keys." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Large 8-line graphical display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface", "2x Headset ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A call center workhorse with a direct-connect headset jack and features tailored for agent productivity.", connectivityOptions: "Connects to Nortel/Avaya Meridian and CS 1000 systems." }
    }
  },
  {
    id: "avaya-80",
    name: "Nortel NTMN31MeridianM3901CharcoalSingle-Line",
    price: "Get a Quote",
    image: "/avaya/Nortel-M3901.jpg",
    category: "Nortel, Avaya, Digital Phone",
    categorySlug: "accessories",
     slug: "nortel-ntmn31-meridian-m3901-charcoal-single-line",
    description: {
      overview: "Nortel (Avaya) M3901 Digital Phone Overview",
      design: { title: "Design", formFactor: "An entry-level, single-line digital phone in a charcoal finish. Designed for common areas or low-call-volume users." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "No display. Features fixed keys for essential functions.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["Digital line interface"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A simple and reliable phone for basic call needs on a Meridian or CS 1000 system.", connectivityOptions: "Connects directly to a digital station port." }
    }
  },
// --- END: AVAYA & NORTEL (78 Total) ---

// --- NEW: AXIS PRODUCTS (1 Total) ---
  {
    id: "axis-1",
    name: "Axis 5801-352 network switch",
    price: "Get a Quote",
    image: "/axis/axis-5801-352.jpg",
    category: "Axis, Network Switch",
    categorySlug: "switches",
    slug: "axis-5801-352-network-switch",
    description: {
      overview: "Axis 5801-352 Network Switch Overview",
      design: { 
        title: "Design", 
        formFactor: "A compact, unmanaged network switch, likely designed for use with Axis network video products and other IP devices." 
      },
      performance: { 
        title: "Performance", 
        processor: "N/A", 
        memory: "N/A", 
        storage: "N/A" 
      },
      display: { 
        title: "Display and Graphics", 
        screen: "N/A (LED indicators for power and port activity)", 
        graphics: "N/A" 
      },
      connectivity: { 
        title: "Connectivity", 
        ports: ["Multiple Ethernet ports (e.g., 5 or 8 ports)", "Likely 10/100/1000 Gigabit speeds"], 
        wireless: ["N/A"] 
      },
      functionality: { 
        title: "Functionality", 
        versatility: "A simple, plug-and-play solution for expanding a network, ideal for small-scale IP camera installations or connecting a group of networked devices.", 
        connectivityOptions: "Provides straightforward network connectivity without the need for complex configuration." 
      }
    }
  },
// --- END: AXIS PRODUCTS ---

// --- NEW: MICROSOFT DOCKING STATION (1 Total) ---
  {
    id: "microsoft-1",
    name: "Microsoft Surface Dock mobile device – PF3-00005",
    price: "Get a Quote",
    image: "/microsoft/surface-dock-pf3.jpg",
    category: "Docking Station, Microsoft",
    categorySlug: "accessories",
    slug: "microsoft-surface-dock-mobile-device-pf3",
    description: {
      overview: "Microsoft Surface Dock Overview",
      design: { 
        title: "Design", 
        formFactor: "A compact and sleek docking station designed specifically for Microsoft Surface devices, turning your portable Surface into a powerful desktop workstation." 
      },
      performance: { 
        title: "Performance", 
        processor: "N/A", 
        memory: "N/A", 
        storage: "N/A" 
      },
      display: { 
        title: "Display and Graphics", 
        screen: "N/A (Supports multiple external displays via Mini DisplayPort)", 
        graphics: "N/A" 
      },
      connectivity: { 
        title: "Connectivity", 
        ports: ["Proprietary Surface Connect cable", "Multiple USB 3.0 ports", "Gigabit Ethernet port", "Audio out port", "Mini DisplayPort outputs"], 
        wireless: ["N/A"] 
      },
      functionality: { 
        title: "Functionality", 
        versatility: "Provides power, data, and external display connectivity to a compatible Surface device through a single magnetic Surface Connect cable.", 
        connectivityOptions: "Instantly adds multiple USB ports, a wired network connection, and multi-monitor support to your Surface Pro, Surface Laptop, or Surface Book." 
      }
    }
  },
// --- END: MICROSOFT DOCKING STATION ---

// --- NEW: HIKVISION PRODUCTS (95 Total) ---
  {
    id: "hik-1",
    name: "Hikvision 6MP IP Bullet camera IP66 H.265+",
    price: "Get a Quote",
    image: "/hikvision/6mp-bullet-ip66.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-6mp-ip-bullet-camera-ip66-h265-plus",
    description: placeholderDescription
  },
  {
    id: "hik-2",
    name: "Hikvision DeepinView DS-2TD2617B-6/PA",
    price: "Get a Quote",
    image: "/hikvision/ds-2td2617b-6-pa.jpg",
    category: "Hikvision, Thermal Camera",
    categorySlug: "accessories",
    slug: "hikvision-deepinview-ds-2td2617b-6-pa",
    description: placeholderDescription
  },
  {
    id: "hik-3",
    name: "Hikvision Digital Technology 2.0 MP CMOS Vari-Focal Network Bullet Camera – IPC-B620-Z",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-2mp.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-2mp-bullet",
    description: placeholderDescription
  },
  {
    id: "hik-4",
    name: "Hikvision Digital Technology 2CD2747G2-LZS(3.6-9mm) (C) IPC",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-2cd2747g2.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-2cd2747g2",
    description: placeholderDescription
  },
  {
    id: "hik-5",
    name: "Hikvision Digital Technology 4.0 MP CMOS Network Turret Camera – IPC-T640-Z",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-4mp.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-4mp-dome",
    description: placeholderDescription
  },
  {
    id: "hik-6",
    name: "Hikvision Digital Technology AcuSense Dome",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-acusense.jpg",
    category: "Hikvision, Network Camera, AcuSense",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-acusense-dome",
    description: placeholderDescription
  },
  {
    id: "hik-7",
    name: "Hikvision Digital Technology Bullet",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-bullet",
    description: placeholderDescription
  },
  {
    id: "hik-8",
    name: "Hikvision Digital Technology Bullet IR DS-2CD2T86G2-2I(2.8mm)(C) 8MP – Network Camera",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-ir.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-bullet-ir-ds",
    description: placeholderDescription
  },
  {
    id: "hik-9",
    name: "Hikvision Digital Technology Dome IR DS-2CD2746G2-IZS 2.8-12mm C 4M",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-ir.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-dome-ir-ds",
    description: placeholderDescription
  },
  {
    id: "hik-10",
    name: "Hikvision Digital Technology DS-2AE4215T-D3(C)",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-1.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-1",
    description: placeholderDescription
  },
  {
    id: "hik-11",
    name: "Hikvision Digital Technology DS-2AE5225TI-A(E)",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-2.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-2",
    description: placeholderDescription
  },
  {
    id: "hik-12",
    name: "Hikvision Digital Technology DS-2CD2025FWD-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-3",
    description: placeholderDescription
  },
  {
    id: "hik-13",
    name: "Hikvision Digital Technology DS-2CD2047G2-LU",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-4.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-4",
    description: placeholderDescription
  },
  {
    id: "hik-14",
    name: "Hikvision Digital Technology DS-2CD2125G0-IMS",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-5.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-5",
    description: placeholderDescription
  },
  {
    id: "hik-15",
    name: "Hikvision Digital Technology DS-2CD2143G0-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-6.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-6",
    description: placeholderDescription
  },
  {
    id: "hik-16",
    name: "Hikvision Digital Technology DS-2CD2145FWD-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-7.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-7",
    description: placeholderDescription
  },
  {
    id: "hik-17",
    name: "Hikvision Digital Technology DS-2CD2145FWD-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-8.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-8",
    description: placeholderDescription
  },
  {
    id: "hik-18",
    name: "Hikvision Digital Technology DS-2CD2146G2-ISU",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-9.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-9",
    description: placeholderDescription
  },
  {
    id: "hik-19",
    name: "Hikvision Digital Technology DS-2CD2146G2-ISU IP security camera Outdoor Dome Ceiling/wall 2592 x 19",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-p2.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-p2",
    description: placeholderDescription
  },
  {
    id: "hik-20",
    name: "Hikvision Digital Technology DS-2CD2163G0-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-1-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-1-p3",
    description: placeholderDescription
  },
  {
    id: "hik-21",
    name: "Hikvision Digital Technology DS-2CD2323G0-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-2-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-2-p3",
    description: placeholderDescription
  },
  {
    id: "hik-22",
    name: "Hikvision Digital Technology DS-2CD2346G1-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-turret-1-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-turret-1-p3",
    description: placeholderDescription
  },
  {
    id: "hik-23",
    name: "Hikvision Digital Technology DS-2CD2347G1-LU",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-1-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-1-p3",
    description: placeholderDescription
  },
  {
    id: "hik-24",
    name: "Hikvision Digital Technology DS-2CD2347G1-LU",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-3-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-3-p3",
    description: placeholderDescription
  },
  {
    id: "hik-25",
    name: "Hikvision Digital Technology DS-2CD2347G2-LU",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-ptz-1-p3.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-ptz-1-p3",
    description: placeholderDescription
  },
  {
    id: "hik-26",
    name: "Hikvision Digital Technology DS-2CD2383G0-I",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-ptz-2-p3.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-ptz-2-p3",
    description: placeholderDescription
  },
  {
    id: "hik-27",
    name: "Hikvision Digital Technology DS-2CD2386G2-ISU/SL(2.8mm)(C)",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-ptz-3-p3.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-ptz-3-p3",
    description: placeholderDescription
  },
  {
    id: "hik-28",
    name: "Hikvision Digital Technology DS-2CD2386G2-IU(2.8MM) 8MP TUURET AUDIO",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-4-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-4-p3",
    description: placeholderDescription
  },
  {
    id: "hik-29",
    name: "Hikvision Digital Technology DS-2CD2387G2P-LSU/SL(4MM)(C)",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-bullet-5-p3.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-bullet-5-p3",
    description: placeholderDescription
  },
  {
    id: "hik-30",
    name: "Hikvision Digital Technology DS-2CD2623G0-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-small-switch.jpg",
    category: "Hikvision, Switch",
    categorySlug: "switches",
    slug: "hikvision-digital-technology-ds-small-switch",
    description: placeholderDescription
  },
  {
    id: "hik-31",
    name: "Hikvision Digital Technology DS-2CD2645FWD-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-nvr-1-p4.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-nvr-1-p4",
    description: placeholderDescription
  },
  {
    id: "hik-32",
    name: "Hikvision Digital Technology DS-2CD2686G2-IZS security camera IP",
    price: "Get a Quote",
    image: "/hikvision/ds-nvr-2-p4.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-nvr-2-p4",
    description: placeholderDescription
  },
  {
    id: "hik-33",
    name: "Hikvision Digital Technology DS-2CD2745FWD-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-nvr-3-p4.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-nvr-3-p4",
    description: placeholderDescription
  },
  {
    id: "hik-34",
    name: "Hikvision Digital Technology DS-2CD2786G2-IZS(2.8-12MM)(C)( O-STD)",
    price: "Get a Quote",
    image: "/hikvision/ds-7608ni.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-7608ni",
    description: placeholderDescription
  },
  {
    id: "hik-35",
    name: "Hikvision Digital Technology DS-2CD2T43G0-I5",
    price: "Get a Quote",
    image: "/hikvision/ds-7616ni.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-7616ni",
    description: placeholderDescription
  },
  {
    id: "hik-36",
    name: "Hikvision Digital Technology DS-2CD2T47G2-L",
    price: "Get a Quote",
    image: "/hikvision/ds-7732ni.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-7732ni",
    description: placeholderDescription
  },
  {
    id: "hik-37",
    name: "Hikvision Digital Technology DS-2CD2T87G2-L(4MM)(C)",
    price: "Get a Quote",
    image: "/hikvision/ds-kh6320.jpg",
    category: "Hikvision, Intercom",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-kh6320",
    description: placeholderDescription
  },
  {
    id: "hik-38",
    name: "Hikvision Digital Technology DS-2CD6924F-IS",
    price: "Get a Quote",
    image: "/hikvision/ds-kis603-left.jpg",
    category: "Hikvision, Intercom",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-kis603-left",
    description: placeholderDescription
  },
  {
    id: "hik-39",
    name: "Hikvision Digital Technology DS-2CE56H0T-IT3E",
    price: "Get a Quote",
    image: "/hikvision/ds-kis603-right.jpg",
    category: "Hikvision, Intercom",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-kis603-right",
    description: placeholderDescription
  },
  {
    id: "hik-40",
    name: "Hikvision Digital Technology DS-2CE56H0T-ITME",
    price: "Get a Quote",
    image: "/hikvision/ds-2af4215t-d3c.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2af4215t-d3c",
    description: placeholderDescription
  },
  {
    id: "hik-41",
    name: "Hikvision Digital Technology DS-2DE5425IW-AE(T5)",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2065g1-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2065g1-i",
    description: placeholderDescription
  },
  {
    id: "hik-42",
    name: "Hikvision Digital Technology DS-2DE7225IW-AE",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2123g0-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2123g0-i",
    description: placeholderDescription
  },
  {
    id: "hik-43",
    name: "Hikvision Digital Technology DS-2DF6225X-AEL",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2143g0-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2143g0-i",
    description: placeholderDescription
  },
  {
    id: "hik-44",
    name: "Hikvision Digital Technology DS-2TD2617-3/V1",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2143g0-is.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2143g0-is",
    description: placeholderDescription
  },
  {
    id: "hik-45",
    name: "Hikvision Digital Technology DS-2TD2636B-15/P",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2145fwd-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2145fwd-i",
    description: placeholderDescription
  },
  {
    id: "hik-46",
    name: "Hikvision Digital Technology DS-3E0310HP-E network switch",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2163g0-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2163g0-i",
    description: placeholderDescription
  },
  {
    id: "hik-47",
    name: "Hikvision Digital Technology DS-7204HUHI-K1/P digital video recorder (DVR) Black",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2183g0-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2183g0-i",
    description: placeholderDescription
  },
  {
    id: "hik-48",
    name: "Hikvision Digital Technology DS-7208HQHI-K2/P digital video recorder (DVR) Black",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2345fwd-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2345fwd-i",
    description: placeholderDescription
  },
  {
    id: "hik-49",
    name: "Hikvision Digital Technology DS-7216HUHI-K2/P digital video recorder (DVR) Black",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2346g1-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2346g1-i",
    description: placeholderDescription
  },
  {
    id: "hik-50",
    name: "Hikvision Digital Technology DS-7608NI-K1/8P(C)",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2346g2.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2346g2",
    description: placeholderDescription
  },
  {
    id: "hik-51",
    name: "Hikvision Digital Technology DS-7616NI-I2/16P",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2347g1-lu.jpg",
    category: "Hikvision, Network Camera, ColorVu",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2347g1-lu",
    description: placeholderDescription
  },
  {
    id: "hik-52",
    name: "Hikvision Digital Technology DS-7732NI-I4/KB/CVBS",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2355fwd-ib.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2355fwd-ib",
    description: placeholderDescription
  },
  {
    id: "hik-53",
    name: "Hikvision Digital Technology DS-KH6320-WTE1 INDOOR STAT 7inch TOUCH",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2363g0-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2363g0-i",
    description: placeholderDescription
  },
  {
    id: "hik-54",
    name: "Hikvision Digital Technology DS-KIS603-P",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2365g1-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2365g1-i",
    description: placeholderDescription
  },
  {
    id: "hik-55",
    name: "Hikvision Digital Technology DS-KIS603-P intercom system accessory",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2385g1-i.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2385g1-i",
     description: placeholderDescription
  },
  {
    id: "hik-56",
    name: "Hikvision DS-2AE4215T-D3(C)",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2512f-is.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2512f-is",
    description: placeholderDescription
  },
  {
    id: "hik-57",
    name: "Hikvision DS-2CD2065G1-I",
    price: "Get a Quote",
    image: "/hikvision/2cd2623g0-izs.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-2cd2623g0-izs",
  description: placeholderDescription
  },
  {
    id: "hik-58",
    name: "Hikvision DS-2CD2123G0-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2646g2-izs-4mp.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2646g2-izs-4mp",
    description: placeholderDescription
  },
  {
    id: "hik-59",
    name: "Hikvision DS-2CD2143G0-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2745fwd-izs.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2745fwd-izs",
    description: placeholderDescription
  },
  {
    id: "hik-60",
    name: "Hikvision DS-2CD2143G0-IS",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2785g0-izs.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2785g0-izs",
    description: placeholderDescription
  },
  {
    id: "hik-61",
    name: "Hikvision DS-2CD2145FWD-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2h45fwd-izs.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2h45fwd-izs",
    description: placeholderDescription
  },
  {
    id: "hik-62",
    name: "Hikvision DS-2CD2163G0-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2t43g0-is.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2t43g0-is",
    description: placeholderDescription
  },
  {
    id: "hik-63",
    name: "Hikvision DS-2CD2183G0-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd2t63g0-is.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd2t63g0-is",
    description: placeholderDescription
  },
  {
    id: "hik-64",
    name: "Hikvision DS-2CD2345FWD-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2cd6924f-is.jpg",
    category: "Hikvision, PanoVu Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2cd6924f-is",
    description: placeholderDescription
  },
  {
    id: "hik-65",
    name: "Hikvision DS-2CD2346G1-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2ce16d8t-it3ze.jpg",
    category: "Hikvision, Turbo HD Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2ce16d8t-it3ze-2-8-12mm",
    description: placeholderDescription
  },
  {
    id: "hik-66",
    name: "Hikvision DS-2CD2346G2-IU(2.8MM)4MP ACU AUDIO TUR",
    price: "Get a Quote",
    image: "/hikvision/ds-2ce37u8t-a.jpg",
    category: "Hikvision, Turbo HD Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2ce37u8t-a-security-camera-box",
    description: placeholderDescription
  },
  {
    id: "hik-67",
    name: "Hikvision DS-2CD2347G1-LU",
    price: "Get a Quote",
    image: "/hikvision/ds-2ce72kf3t-le.jpg",
    category: "Hikvision, Turbo HD Camera, ColorVu",
    categorySlug: "accessories",
    slug: "hikvision-ds-2ce72kf3t-le-2-8mm",
    description: placeholderDescription
  },
  {
    id: "hik-68",
    name: "Hikvision DS-2CD2355FWD-IB",
    price: "Get a Quote",
    image: "/hikvision/ds-2de5225w-ae.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2de5225w-ae",
    description: placeholderDescription
  },
  {
    id: "hik-69",
    name: "Hikvision DS-2CD2363G0-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2de5330w-ae.jpg",
    category: "Hikvision, PTZ Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2de5330w-ae",
    description: placeholderDescription
  },
  {
    id: "hik-70",
    name: "Hikvision DS-2CD2365G1-I",
    price: "Get a Quote",
    image: "/hikvision/ds-2td2628-3-qa.jpg",
    category: "Hikvision, Thermal Camera",
    categorySlug: "accessories",
    slug: "hikvision-ds-2td2628-3-qa",
    description: placeholderDescription
  },
  {
    id: "hik-71",
    name: "Hikvision DS-2CD2385G1-I",
    price: "Get a Quote",
    image: "/hikvision/ds-3e0109p-ec.jpg",
    category: "Hikvision, PoE Switch",
    categorySlug: "switches",
    slug: "hikvision-ds-3e0109p-e-c-8ch-100mbps-poe",
  description: placeholderDescription
  },
  {
    id: "hik-72",
    name: "Hikvision DS-2CD2512F-IS",
    price: "Get a Quote",
    image: "/hikvision/ds-3e1318p-e.jpg",
    category: "Hikvision, PoE Switch",
    categorySlug: "switches",
    slug: "hikvision-ds-3e1318p-e-network-switch-managed",
    description: placeholderDescription
  },
  {
    id: "hik-73",
    name: "Hikvision DS-2CD2623G0-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-3e1326p-e.jpg",
    category: "Hikvision, PoE Switch",
    categorySlug: "switches",
    slug: "hikvision-ds-3e1326p-e-network-switch-managed",
    description: placeholderDescription
  },
  {
    id: "hik-74",
    name: "Hikvision DS-2CD2646G2-IZS 4MP ACUSENSE BULLET",
    price: "Get a Quote",
    image: "/hikvision/ds-7316hqhi-k4.jpg",
    category: "Hikvision, DVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7316hqhi-k4-digital-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-75",
    name: "Hikvision DS-2CD2745FWD-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-7604ni-k1.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7604ni-k1-network-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-76",
    name: "Hikvision DS-2CD2785G0-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-7608ni-k2.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7608ni-k2-network-video-recorder",
   description: placeholderDescription
  },
  {
    id: "hik-77",
    name: "Hikvision DS-2CD2H45FWD-IZS",
    price: "Get a Quote",
    image: "/hikvision/ds-7608ni-m2-8p.jpg",
    category: "Hikvision, NVR, PoE",
    categorySlug: "accessories",
    slug: "hikvision-ds-7608ni-m2-8p",
    description: placeholderDescription
  },
  {
    id: "hik-78",
    name: "Hikvision DS-2CD2T43G0-I5",
    price: "Get a Quote",
    image: "/hikvision/ds-7616ni-i2.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7616ni-i2-network-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-79",
    name: "Hikvision DS-2CD2T63G0-I5",
    price: "Get a Quote",
    image: "/hikvision/ds-7616ni-k2.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7616ni-k2-network-video-recorder",
   description: placeholderDescription
  },
  {
    id: "hik-80",
    name: "Hikvision DS-2CD6924F-IS",
    price: "Get a Quote",
    image: "/hikvision/ds-7616ni-m2-16p.jpg",
    category: "Hikvision, NVR, PoE",
    categorySlug: "accessories",
    slug: "hikvision-ds-7616ni-m2-16p",
    description: placeholderDescription
  },
  {
    id: "hik-81",
    name: "Hikvision DS-2CE16D8T-IT3ZE (2.8-12MM)",
    price: "Get a Quote",
    image: "/hikvision/ds-7632ni-i2.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7632ni-i2-network-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-82",
    name: "Hikvision DS-2CE37U8T-A security camera Box 3840 x 2160 pixels",
    price: "Get a Quote",
    image: "/hikvision/ds-7716ni-k4.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7716ni-k4-network-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-83",
    name: "Hikvision DS-2CE72KF3T-LE(2.8MM)",
    price: "Get a Quote",
    image: "/hikvision/ds-7732ni-k4.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7732ni-k4-network-video-recorder",
    description: placeholderDescription
  },
  {
    id: "hik-84",
    name: "Hikvision DS-2DE5225W-AE",
    price: "Get a Quote",
    image: "/hikvision/ds-7732ni-m4-16p.jpg",
    category: "Hikvision, NVR, PoE",
    categorySlug: "accessories",
    slug: "hikvision-ds-7732ni-m4-16p",
   description: placeholderDescription
  },
  {
    id: "hik-85",
    name: "Hikvision DS-2DE5330W-AE",
    price: "Get a Quote",
    image: "/hikvision/ds-9664ni-m8.jpg",
    category: "Hikvision, NVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-9664ni-m8",
    description: placeholderDescription
  },
  {
    id: "hik-86",
    name: "Hikvision DS-2TD2628-3/QA",
    price: "Get a Quote",
    image: "/hikvision/ds-d5022fn-c.jpg",
    category: "Hikvision, Monitor",
    categorySlug: "accessories",
    slug: "hikvision-ds-d5022fn-c",
    description: placeholderDescription
  },
  {
    id: "hik-87",
    name: "Hikvision DS-3E0109P-E(C) 8CH 100MBPS POE SWITCH",
    price: "Get a Quote",
    image: "/hikvision/ds-k1t201mf.jpg",
    category: "Hikvision, Access Control",
    categorySlug: "accessories",
    slug: "hikvision-ds-k1t201mf-access-control-reader",
   description: placeholderDescription
  },
  {
    id: "hik-88",
    name: "Hikvision DS-3E1318P-E network switch Managed",
    price: "Get a Quote",
    image: "/hikvision/ds-k1t500s.jpg",
    category: "Hikvision, Access Control",
    categorySlug: "accessories",
    slug: "hikvision-ds-k1t500s-access-control-reader",
  description: placeholderDescription
  },
  {
    id: "hik-89",
    name: "Hikvision DS-3E1326P-E network switch Managed",
    price: "Get a Quote",
    image: "/hikvision/ds-k1t501sf.jpg",
    category: "Hikvision, Access Control",
    categorySlug: "accessories",
    slug: "hikvision-ds-k1t501sf-access-control-reader",
    description: placeholderDescription
  },
  {
    id: "hik-90",
    name: "Hikvision DS-7316HQHI-K4 digital video recorder (DVR) Black",
    price: "Get a Quote",
    image: "/hikvision/ds-k1t804ef-1.jpg",
    category: "Hikvision, Access Control",
    categorySlug: "accessories",
    slug: "hikvision-ds-k1t804ef-1-access-control-reader",
   description: placeholderDescription 
  },
  { 
    id: "hik-91",
    name: "Hikvision DS-7604NI-K1 network video recorder 1U Black",
    price: "Get a Quote",
    image: "/hikvision/ds-k1t804mf-1.jpg",
    category: "Hikvision, Access Control",
    categorySlug: "accessories",
    slug: "hikvision-ds-k1t804mf-1-access-control-reader",
     description: placeholderDescription
  },
  {
    id: "hik-92",
    name: "Hikvision DS-7608NI-K2 network video recorder 1U Black",
    price: "Get a Quote",
    image: "/hikvision/ds-kis203.jpg",
    category: "Hikvision, Intercom",
    categorySlug: "accessories",
    slug: "hikvision-ds-kis203-video-intercom-system",
    description: placeholderDescription
  },
  {
    id: "hik-93",
    name: "Hikvision DS-7608NI-M2/8P",
   price: "Get a Quote",
    image: "/hikvision/ds-7208hqhi-k1-4s.jpg",
    category: "Hikvision, DVR",
    categorySlug: "accessories",
    slug: "hikvision-ds-7208hqhi-k1-4s",
    description: placeholderDescription
  },
  {
    id: "hik-94",
    name: "Hikvision DS-7616NI-I2 network video recorder Black,Silver",
    price: "Get a Quote",
    image: "/hikvision/ds-7316hqhi-m4-s.jpg",
   category: "Hikvision, DVR",
    categorySlug: "accessories",
     slug: "hikvision-ds-7316hqhi-m4-s",
    description: placeholderDescription
  },
  {
    id: "hik-95",
    name: "Hikvision DS-7616NI-K2 network video recorder 1U Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-96",
    name: "Hikvision DS-7616NI-M2/16P",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-97",
    name: "Hikvision DS-7632NI-I2 network video recorder 1U Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-98",
    name: "Hikvision DS-7716NI-K4 network video recorder 1.5U Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-99",
    name: "Hikvision DS-7732NI-K4 network video recorder 1.5U Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-100",
    name: "Hikvision DS-7732NI-M4/16P",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-101",
    name: "Hikvision DS-9664NI-M8",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-102",
    name: "Hikvision DS-D5022FN-C",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-103",
    name: "Hikvision DS-K1201MF access control reader",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-104",
    name: "Hikvision DS-K1T500S access control reader Black,Silver",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-105",
    name: "Hikvision DS-K1T501SF access control reader Basic access control reader Grey",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-106",
    name: "Hikvision DS-K1T804EF-1 access control reader Basic access control reader Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-107",
    name: "Hikvision DS-K1T804MF-1 access control reader Basic access control reader Black",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-108",
    name: "Hikvision DS-KIS203 video intercom system 17.8 cm (7″) Grey,White",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },{
    id: "hik-109",
    name: "Hikvision IDS-7208HQHI-K1/4S",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
{
    id: "hik-110",
    name: "Hikvision IDS-7316HQHI-M4/S",
    price: "Get a Quote",
    image: "/hikvision/digital-tech-dome-10.jpg",
    category: "Hikvision, Network Camera",
    categorySlug: "accessories",
    slug: "hikvision-digital-technology-ds-dome-10",
    description: placeholderDescription
  },
// --- END: HIKVISION PRODUCTS (110 Total) ---

];

/// 5. EXPORT THE FINAL MERGED LIST
// This maps over your raw list and injects the SKU/Category from sku-data.ts if a match is found
export const allProducts: Product[] = rawProducts.map(product => {
  // Look up the SKU data using the product slug
  const extraData = productSkus[product.slug];

  if (extraData) {
    return {
      ...product,
      sku: extraData.sku || product.sku, // Use SKU from file, or keep existing if matched file is empty
      category: extraData.category || product.category, // Overwrite category if exists in file
    };
  }

  // Return original product if no mapping found
  return product;
});

// Create a dedicated list for the sidebar
export const latestProducts = allProducts.slice(0, 3);