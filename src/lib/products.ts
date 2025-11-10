// src/lib/products.ts

// 1. DEFINE THE DESCRIPTION TYPE
export type ProductDescription = {
  overview: string;
  design: { title: string; formFactor: string };
  performance: { title: string; processor: string; memory: string; storage: string };
  display: { title: string; screen: string; graphics: string };
  connectivity: { title: string; ports: string[]; wireless: string[] };
  functionality: { title: string; versatility: string; connectivityOptions: string };
};

// 2. UPDATE THE MAIN PRODUCT TYPE
export type Product = {
  id: string;
  name: string;
  price: number | string;
  image: string;
  category: string; // The display category (e.g., "Laptops, HP")
  categorySlug: string; // The link (e.g., "computers-and-laptops")
  slug: string; // This is required
  description: ProductDescription; // This is now required
};

// 3. CREATE THE DETAILED DELL DESCRIPTION
// This is the one you provided
const dellDescription: ProductDescription = {
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
const placeholderDescription: ProductDescription = {
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
const hpLaserJetM501dnDescription: ProductDescription = {
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
export const allProducts: Product[] = [
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
    image: '/computerandlaptops/hp/hpp.png', 
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
    image: '/computerandlaptops/hp/hpp1.png', 
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
    image: '/computerandlaptops/hp/hpp2.png', 
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
    image: '/computerandlaptops/hp/hpp3.png', 
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
    image: '/computerandlaptops/hp/HP.png', 
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
    image: '/computerandlaptops/hp/hp1.jpg', 
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
    image: '/computerandlaptops/hp/hp2.png', 
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
    image: '/computerandlaptops/hp/hp3.png', 
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
    image: '/computerandlaptops/hp/hp4.png', 
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
    image: '/computerandlaptops/hp/hp5.png', 
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
    image: '/computerandlaptops/hp/hp6.png', 
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
    image: '/computerandlaptops/hp/hp7.png', 
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
    image: '/computerandlaptops/hp/hp8.png', 
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
    image: '/computerandlaptops/hp/hp9.png', 
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
    image: '/computerandlaptops/hp/hp10.png', 
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
    image: '/computerandlaptops/hp/hp11.png', 
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
    image: '/computerandlaptops/hp/hp12.png', 
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
    image: '/computerandlaptops/hp/hp13.png', 
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
    image: '/computerandlaptops/hp/hp14.png', 
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
    image: '/computerandlaptops/hp/hp15.png', 
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
    image: '/computerandlaptops/hp/hp16.png', 
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
    image: '/computerandlaptops/hp/hp17.png', 
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
    image: '/computerandlaptops/hp/hp18.png', 
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
    image: '/computerandlaptops/hp/hp19.png', 
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
    image: '/computerandlaptops/hp/hp20.png', 
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
    image: '/computerandlaptops/hp/hp21.png', 
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
    image: '/computerandlaptops/hp/hp22.png', 
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
    image: '/computerandlaptops/hp/hp23.png', 
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
    image: '/computerandlaptops/hp/hp24.png', 
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
    image: '/computerandlaptops/hp/hp25.png', 
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
    image: '/computerandlaptops/hp/hp26.png', 
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
    image: '/computerandlaptops/hp/hp27.png', 
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
    image: '/computerandlaptops/hp/hp28.jpg', 
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
    image: '/computerandlaptops/hp/hp29.png', 
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
    image: '/computerandlaptops/hp/hp30.png', 
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
    image: '/computerandlaptops/hp/hp31.png', 
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
    image: '/computerandlaptops/hp/hp32.png', 
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
    image: '/computerandlaptops/hp/hp33.png', 
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
    image: '/computerandlaptops/hp/hp34.png', 
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
    image: '/computerandlaptops/hp/hp35.png', 
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
    image: '/computerandlaptops/hp/hp36.png', 
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
    image: '/computerandlaptops/hp/hp37.png', 
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
    image: '/computerandlaptops/hp/hp38.png', 
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
    image: '/computerandlaptops/hp/hp39.png', 
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
    image: '/computerandlaptops/hp/hp40.png', 
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
    image: '/computerandlaptops/hp/hp41.png', 
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
    image: '/computerandlaptops/hp/hp42.png', 
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
    image: '/computerandlaptops/hp/hp43.png', 
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
    image: '/computerandlaptops/hp/hp44.png', 
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
    image: '/computerandlaptops/hp/hp45.png', 
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
    image: '/computerandlaptops/hp/hp47.png', 
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
    image: '/computerandlaptops/hp/hp48.png', 
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
    image: '/computerandlaptops/hp/hp49.png', 
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
    image: '/computerandlaptops/hp/hp50.png', 
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
    image: '/computerandlaptops/hp/hp51.png', 
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
    image: '/computerandlaptops/hp/hp52.png', 
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
    image: '/computerandlaptops/hp/hp53.png', 
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
    image: '/computerandlaptops/dell/dell2.png', 
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
    image: '/computerandlaptops/dell/dell3.png', 
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
    image: '/computerandlaptops/dell/dell4.png', 
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
    image: '/computerandlaptops/lenovo/l2.png', 
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
    image: '/computerandlaptops/lenovo/l3.png', 
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
    image: '/computerandlaptops/lenovo/l7.png', 
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
    image: '/computerandlaptops/lenovo/l8.png', 
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
    image: '/computerandlaptops/lenovo/l9.png', 
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
    image: '/computerandlaptops/lenovo/l12.png', 
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
    image: '/computerandlaptops/lenovo/l13.png', 
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
    image: '/computerandlaptops/lenovo/l14.png', 
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
    image: '/computerandlaptops/lenovo/l15.png', 
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
    image: '/computerandlaptops/lenovo/l16.png', 
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
    image: '/computerandlaptops/lenovo/l17.png', 
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
    image: '/computerandlaptops/lenovo/l18.jpg', 
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
    image: '/computerandlaptops/lenovo/l19.png', 
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
    image: '/computerandlaptops/lenovo/l20.png', 
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
    image: '/computerandlaptops/lenovo/l21.jpg', 
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
    image: '/computerandlaptops/lenovo/l21.png', 
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
    image: '/computerandlaptops/lenovo/l22.png', 
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
    image: '/computerandlaptops/lenovo/l23.png', 
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
    image: '/computerandlaptops/lenovo/l24.png', 
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
    image: '/computerandlaptops/lenovo/l25.png', 
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
    image: '/computerandlaptops/lenovo/l26.png', 
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
    image: '/computerandlaptops/lenovo/l27.png', 
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
    image: '/computerandlaptops/lenovo/l28.png', 
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
    image: '/computerandlaptops/lenovo/l29.png', 
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
    image: '/computerandlaptops/lenovo/l30.png', 
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
    image: '/computerandlaptops/lenovo/l31.png', 
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
    image: '/computerandlaptops/lenovo/l32.png', 
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
    image: '/computerandlaptops/lenovo/l33.png', 
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
    image: '/computerandlaptops/lenovo/l34.png', 
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
    image: '/computerandlaptops/lenovo/l35.png', 
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
    image: '/computerandlaptops/lenovo/l37.png', 
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
    image: '/computerandlaptops/lenovo/l38.png', 
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
    image: '/computerandlaptops/lenovo/l39.png', 
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
    image: '/computerandlaptops/lenovo/l40.png', 
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
    image: '/computerandlaptops/lenovo/l41.png', 
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
    image: '/computerandlaptops/lenovo/l42.jpg', 
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
    image: '/computerandlaptops/lenovo/l43.png', 
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
    image: '/computerandlaptops/lenovo/l44.png', 
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
    image: '/computerandlaptops/lenovo/l45.png', 
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
    image: '/computerandlaptops/lenovo/l46.png', 
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
    image: '/computerandlaptops/lenovo/l47.png', 
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
    image: '/computerandlaptops/lenovo/l48.jpg', 
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
    image: '/computerandlaptops/lenovo/l49.png', 
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
    image: '/computerandlaptops/lenovo/l50.png', 
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
    image: '/computerandlaptops/lenovo/l51.png', 
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
    image: '/computerandlaptops/lenovo/l52.png', 
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
    image: '/computerandlaptops/lenovo/l53.jpg', 
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
    image: '/computerandlaptops/lenovo/l54.png', 
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
    image: '/computerandlaptops/lenovo/l55.png', 
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
    image: '/computerandlaptops/lenovo/l56.png', 
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
    image: '/computerandlaptops/lenovo/l57.png', 
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
    image: '/computerandlaptops/lenovo/l58.png', 
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
    image: '/computerandlaptops/lenovo/l59.png', 
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
    image: '/computerandlaptops/lenovo/l60.png', 
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
    image: '/computerandlaptops/lenovo/l61.png', 
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
    image: '/computerandlaptops/lenovo/l62.png', 
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
    image: '/computerandlaptops/lenovo/l63.png', 
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
    image: '/computerandlaptops/lenovo/l64.png', 
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
    image: '/computerandlaptops/lenovo/l65.png', 
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
    image: '/computerandlaptops/lenovo/l66.png', 
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
    image: '/computerandlaptops/lenovo/l67.png', 
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
    image: '/computerandlaptops/lenovo/l68.jpg', 
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
    image: '/computerandlaptops/lenovo/l68.png', 
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
    image: '/computerandlaptops/lenovo/l69.png', 
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
    image: '/computerandlaptops/lenovo/l70.jpg', 
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
    image: '/computerandlaptops/lenovo/l71.png', 
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
    image: '/computerandlaptops/lenovo/l72.png', 
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
    image: '/computerandlaptops/lenovo/l73.png', 
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
    image: '/computerandlaptops/lenovo/l74.png', 
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
    image: '/computerandlaptops/lenovo/l75.png', 
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
    image: '/computerandlaptops/lenovo/l76.png', 
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
    image: '/computerandlaptops/lenovo/l77.png', 
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
    image: '/computerandlaptops/lenovo/l78.png', 
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
    image: '/computerandlaptops/lenovo/l79.png', 
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
    image: '/computerandlaptops/lenovo/l80.png', 
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
  { 
    id: "143", 
    name: 'Dell WD19S Docking station - USB-C', 
    price: "Get a Quote", 
    image: '/images/hero-printer.png', 
    category: 'Accessories, Dell', 
    categorySlug: 'accessories',
    slug: 'dell-wd19s-docking-station-usb-c',
    description: {
      overview: "Dell WD19S Docking Station Overview",
      design: { title: "Design", formFactor: "A powerful and modular USB-C docking station designed to declutter your workspace and provide extensive connectivity." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Supports multiple high-resolution displays (e.g., dual 4K) for maximum productivity.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB-C 3.2 Gen 2", "USB-A 3.2 Gen 1", "DisplayPort 1.4", "HDMI 2.0", "RJ-45 Ethernet"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Transform your laptop into a full desktop workstation with a single USB-C cable. Delivers power, data, and video.", connectivityOptions: "Modular design allows for easy upgrades and flexible setup." }
    }
  },
    // --- NEW DELL DOCKING STATIONS ---
{
  id: 'dell-da305u',
  slug: 'dell-6-in-1-multiport-adapter-da305u',
  name: 'Dell – 6-in-1 Multiport Adapter – DELL-DA305U',
  image: '/computerandlaptops/dell/dell-da305u.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell 6-in-1 USB-C Multiport Adapter - DA305U',
    design: {
      title: 'Compact 6-in-1 Design',
      formFactor: 'A compact and portable multiport adapter with a patented, twist-to-retract design. Features an integrated USB-C cable that stores neatly within the adapter.',
    },
    performance: {
      title: 'Versatile Performance',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
    },
    display: {
      title: 'Flexible Display Connectivity',
      screen: 'Supports one 4K display at 60Hz via DisplayPort or HDMI 2.0. Also includes a VGA port for legacy display support.',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Comprehensive Port Selection',
      ports: [
        '1x HDMI 2.0 (4K @ 60Hz)',
        '1x DisplayPort 1.4 (4K @ 60Hz)',
        '1x VGA',
        '1x USB-C 3.2 Gen 2 (10Gbps data & 90W Power Pass-through)',
        '2x USB-A 3.2 Gen 2 (10Gbps)',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'All-in-One Connectivity',
      versatility: 'Ideal for mobile professionals, this adapter provides 90W Power Pass-through (requires a separate USB-C power adapter) and fast 10Gbps data transfer.',
      connectivityOptions: 'The most comprehensive portable adapter, offering video, data, network, and power pass-through in a single device.',
    },
  }
},
{
  id: 'dell-wd19s-performance',
  slug: 'dell-performance-docking-station-wd19s',
  name: 'Dell – Performance – docking station – DELL-WD19DCS',
  image: '/computerandlaptops/dell/dell-wd19s-performance.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell Performance Dock - WD19SP (WD19S with 180W/240W Adapter)',
    design: {
      title: 'High-Performance Modular Design',
      formFactor: 'A modular docking station designed for power users. This is the WD19S base with a high-output power adapter (likely 180W or 240W) to deliver more power to your laptop.',
    },
    performance: {
      title: 'Performance-Focused Power',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
    },
    display: {
      title: 'Multi-Display Support',
      screen: 'Supports up to dual 4K displays at 60Hz or triple QHD displays. Performance depends on the host laptop (HBR2 vs HBR3).',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Extensive Pro-Level Ports',
      ports: [
        '1x USB-C 3.2 Gen 2',
        '1x USB-C Multifunction (DisplayPort over USB-C)',
        '3x USB-A 3.2 Gen 1 (5Gbps)',
        '2x DisplayPort 1.4',
        '1x HDMI 2.0b',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'Future-Proof and Upgradable',
      versatility: 'Delivers up to 130W of power (with 180W adapter) or 210W (with 240W adapter), ideal for workstations. The module is swappable for future upgrades.',
      connectivityOptions: 'Features Dell ExpressCharge for rapid battery charging and a single USB-C cable for data, display, and power.',
    },
  }
},
{
  id: 'dell-wd19s-150w',
  slug: 'dell-wd19s-docking-station-150w',
  name: 'Dell – WD19S – Docking station – DELL-WD19S130W',
  image: '/computerandlaptops/dell/dell-wd19s-pair.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell Docking Station - WD19S (with 150W/180W Adapter)',
    design: {
      title: 'Modern and Modular',
      formFactor: 'The industry-standard USB-C docking station. This model (WD19S) connects via a single USB-C cable and features a modular design for easy upgrades.',
    },
    performance: {
      title: 'Standard Business Performance',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
    },
    display: {
      title: 'Dual Display Capability',
      screen: 'Supports up to dual Full HD (1080p) displays or a single 4K display, making it perfect for standard business productivity.',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Essential Business Ports',
      ports: [
        '1x USB-C 3.2 Gen 2',
        '1x USB-C Multifunction (DisplayPort over USB-C)',
        '3x USB-A 3.2 Gen 1 (5Gbps)',
        '2x DisplayPort 1.4',
        '1x HDMI 2.0b',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'Streamlined Productivity',
      versatility: 'Delivers up to 90W of power (with 130W adapter) or 130W (with 180W adapter), charging your laptop while you work.',
      connectivityOptions: 'Connect all your peripherals—monitors, keyboard, mouse, and network—through a single cable.',
    },
  }
},
{
  id: 'dell-wd22tb4',
  slug: 'dell-thunderbolt-dock-wd22tb4',
  name: 'DELL Thunderbolt™ Dock – DELL-WD22TB4',
  image: '/computerandlaptops/dell/dell-wd22tb4.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell Thunderbolt 4 Dock - WD22TB4',
    design: {
      title: 'Next-Generation Thunderbolt 4',
      formFactor: 'A premium, high-performance docking station leveraging Thunderbolt 4 technology. Features a swappable module design for future-proofing.',
    },
    performance: {
      title: 'Ultimate Performance',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A (Thunderbolt 4 bandwidth: 40Gbps)',
    },
    display: {
      title: 'High-Resolution Display Support',
      screen: 'Supports up to dual 4K displays at 60Hz or a single 8K display at 60Hz (on supported hosts).',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Thunderbolt 4 and USB-C',
      ports: [
        '2x Thunderbolt 4 ports (one for host)',
        '1x USB-C 3.2 Gen 2 (with DisplayPort)',
        '1x USB-C 3.2 Gen 2',
        '4x USB-A 3.2 Gen 1 (5Gbps)',
        '2x DisplayPort 1.4',
        '1x HDMI 2.0',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'Maximum Productivity',
      versatility: 'Delivers up to 130W of power to Dell laptops (90W to non-Dell). The swappable module can be replaced with the WD19S module if needed.',
      connectivityOptions: 'The ultimate dock for creative professionals and power users who need maximum bandwidth for displays and data.',
    },
  }
},
{
  id: 'dell-wd19s-usbc-210',
  slug: 'dell-wd19s-docking-station-usb-c-210w',
  name: 'Dell WD19S – docking station – USB-C – 210-AZBG',
  image: '/computerandlaptops/dell/dell-wd19s-usbc-210.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell WD19S USB-C Docking Station (with 210W Adapter)',
    design: {
      title: 'High-Power USB-C Dock',
      formFactor: 'This is the WD19S docking station base, paired with a powerful 210W AC adapter for high-demand laptops.',
    },
    performance: {
      title: 'Enhanced Power Delivery',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
    },
    display: {
      title: 'Multi-Monitor Setup',
      screen: 'Supports multiple displays (e.g., dual 1080p or single QHD) via its DisplayPort and HDMI ports.',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Full Business Connectivity',
      ports: [
        '1x USB-C 3.2 Gen 2',
        '1x USB-C Multifunction (DisplayPort over USB-C)',
        '3x USB-A 3.2 Gen 1 (5Gbps)',
        '2x DisplayPort 1.4',
        '1x HDMI 2.0b',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'Power for Workstations',
      versatility: 'With a 210W adapter, this dock can deliver up to 180W of power to the connected laptop, making it suitable for mobile workstations.',
      connectivityOptions: 'Ideal for users who need more than the standard 90W or 130W, ensuring your workstation stays charged under heavy load.',
    },
  }
},
{
  id: 'dell-wd19s-180w',
  slug: 'dell-wired-usb-3-2-gen-2-dell-wd19s180w',
  name: 'DELL Wired USB 3.2 Gen 2 – DELL-WD19S180W',
  image: '/computerandlaptops/dell/dell-wd19s-180w.png', // You may need to update this image path
  category: 'Docking Station, Dell',
  categorySlug: 'accessories',
  price: 'Get a Quote',
  description: {
    overview: 'Dell Wired USB 3.2 Gen 2 Dock - WD19S (with 180W Adapter)',
    design: {
      title: 'Reliable Wired Docking',
      formFactor: 'The Dell WD19S is the enterprise workhorse, offering a single USB-C cable connection to your laptop in a durable, modular chassis.',
    },
    performance: {
      title: 'Robust Power Delivery',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
    },
    display: {
      title: 'Dual Display Ready',
      screen: 'Easily connects up to two Full HD monitors or a single 4K monitor, perfect for expanding your workspace.',
      graphics: 'N/A',
    },
    connectivity: {
      title: 'Essential Desktop Ports',
      ports: [
        '1x USB-C 3.2 Gen 2',
        '1x USB-C Multifunction (DisplayPort over USB-C)',
        '3x USB-A 3.2 Gen 1 (5Gbps)',
        '2x DisplayPort 1.4',
        '1x HDMI 2.0b',
        '1x RJ-45 Gigabit Ethernet',
      ],
      wireless: ['N/A'],
    },
    functionality: {
      title: 'Streamline Your Desk',
      versatility: 'The 180W adapter provides up to 130W of power to your Dell laptop, enough for most high-performance models. Also features Dell ExpressCharge.',
      connectivityOptions: 'Manage your dock with built-in features like MAC Address Pass-Through and PXE Boot. A single cable handles power, data, and video.',
    },
  }
},
// --- END OF NEW DELL DOCKING STATIONS ---


  // --- Switches ---
  { 
    id: "144", 
    name: 'Ubiquiti UniFi Switch Pro Max 24', 
    price: "Get a Quote", 
    image: '/images/hero-switch.png', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches',
    slug: 'ubiquiti-unifi-switch-pro-max-24',
    description: {
      overview: "Ubiquiti UniFi Switch Pro Max 24 Overview",
      design: { title: "Design", formFactor: "A 24-port, Layer 3 Etherlighting switch with a rack-mountable chassis and innovative lighting features." },
      performance: { title: "Performance", processor: "High-performance switching fabric for demanding enterprise networks.", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "1.3 inch LCM color touchscreen for status information.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["16x 2.5 GbE PoE++ ports", "8x GbE PoE++ ports", "2x 10G SFP+ uplinks"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides high-power PoE++ output for Wi-Fi 7 APs and advanced Layer 3 switching features.", connectivityOptions: "High-density 2.5 GbE ports and 10G uplinks for a future-proof network." }
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
  image: '/hp/2.webp',
  category: 'Printers, HP',
  categorySlug: 'printers',
  price: 'Get a Quote',
  description: hpLaserJetM501dnDescription, // <-- USES THE NEW DESCRIPTION
},
// --- END OF NEW PRODUCT ---


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
    id: 'tr1', 
    name: 'Ubiquiti UniFi Switch Ultra 210W', 
    price: 160.00, 
    image: '/ubiquiti/4.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches', 
    slug: 'ubiquiti-unifi-switch-ultra-210w', 
    description: {
      overview: "A compact, fanless 8-port Layer 2 Gigabit switch with a powerful 210W PoE++ budget, ideal for powering high-demand devices.",
      design: { title: "Design", formFactor: "A small, fanless, and versatile switch that can be desktop- or wall-mounted. Features a clean, white UniFi aesthetic." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "N/A (LED status indicators)", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["1x GbE PoE+ Input", "7x GbE PoE++ Output Ports"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "This switch is designed to be powered by another PoE switch (PoE in) and then distribute high-power PoE++ (up to 60W per port) to devices like Wi-Fi 6 APs and cameras.", connectivityOptions: "Offers unparalleled flexibility for network expansions where power outlets are scarce." }
    }
  },
  { 
    id: 'tr2', 
    name: 'Ubiquiti UniFi Switch Pro Max 24', 
    price: 315.11, 
    image: '/ubiquiti/5.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches', 
    slug: 'ubiquiti-unifi-switch-pro-max-24', 
    description: {
      overview: "A 24-port, Layer 3 Etherlighting switch with 2.5 GbE PoE ports and 10G SFP+ uplinks, designed for high-performance enterprise networks.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with innovative 'Etherlighting' ports that illuminate to show port status and location." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "1.3-inch LCM color touchscreen for status information.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["16x 2.5 GbE PoE++ ports", "8x GbE PoE++ ports", "2x 10G SFP+ uplinks"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "Provides high-power PoE++ output for Wi-Fi 7 APs and advanced Layer 3 switching features, all managed within the UniFi ecosystem.", connectivityOptions: "Future-proof your network with multi-gigabit ports and 10G fiber uplinks." }
    }
  },
  { 
    id: 'tr3', 
    name: 'Ubiquiti UniFi Switch USW-Enterprise-24-PoE', 
    price: 570.00, 
    image: '/ubiquiti/6.jpg', 
    category: 'Networking, Ubiquiti', 
    categorySlug: 'switches', 
    slug: 'ubiquiti-unifi-switch-usw-enterprise-24-poe', 
    description: {
      overview: "An enterprise-grade, 24-port Layer 3 switch featuring 2.5 GbE PoE+ ports and 10G SFP+ uplinks for high-speed, high-density networks.",
      design: { title: "Design", formFactor: "A 1U rack-mountable switch with a robust metal chassis and a 1.3-inch LCM color touchscreen." },
      performance: { title: "Performance", processor: "N/A", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "1.3-inch LCM color touchscreen for quick network insights.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["12x 2.5 GbE PoE+ ports", "12x Gigabit PoE+ ports", "2x 10G SFP+ uplinks"], wireless: ["N/A"] },
      functionality: { title: "Functionality", versatility: "A powerful switch for organizations needing multi-gigabit speeds and robust PoE+ capabilities. Features advanced Layer 3 routing.", connectivityOptions: "Managed and configured by the UniFi Network application for seamless integration." }
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
    image: '/apc/1.webp', 
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
    category: 'Workstations, Lenovo', 
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
  image: '/computerandlaptops/dell/dell-optiplex-7010-sff.png', // You may need to update this image path
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
  image: '/computerandlaptops/dell/dell-optiplex-7010-mt.png', // You may need to update this image path
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
  image: '/computerandlaptops/dell/dell-optiplex-7410-aio.png', // You may need to update this image path
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
    id: 'bd10', 
    name: 'Brother RJ-4250WB Rugged Mobile Label & Receipt Printer – RJ4250WBZ1', 
    price: "Get a Quote", 
    image: '/brother/3.jpg', 
    category: 'Printers, Brother', 
    categorySlug: 'printers', 
    slug: 'brother-rj-4250wb-rugged-mobile-label-receipt-printer-rj4250wbz1', 
    description: {
      overview: "A 4-inch rugged mobile printer designed for on-the-go printing of labels, receipts, and tags in tough environments like warehousing, field service, and retail.",
      design: { title: "Design", formFactor: "A compact, lightweight, and durable mobile printer with IP54 rating for dust/water resistance and 6.88-foot drop protection." },
      performance: { title: "Performance", processor: "N/A (Prints up to 5 inches per second)", memory: "N/A", storage: "N/A" },
      display: { title: "Display and Graphics", screen: "Backlit monochrome LCD display.", graphics: "N/A" },
      connectivity: { title: "Connectivity", ports: ["USB-C", "NFC"], wireless: ["Wi-Fi", "Bluetooth 4.2"] },
      functionality: { title: "Functionality", versatility: "Provides fast, reliable thermal printing anywhere. Features NFC for easy pairing and a rechargeable smart battery.", connectivityOptions: "Connects seamlessly to mobile devices, tablets, and laptops via Bluetooth or Wi-Fi." }
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
  }
  // --- End of HOMEPAGE PRODUCTS ---

];

// Create a dedicated list for the sidebar
// This will automatically show "Get a Quote"
export const latestProducts = allProducts.slice(0, 3);