// src/lib/data.ts

// --- UPDATED ---
// Icon imports are no longer needed for this file
/*
import {
  CategoryLaptopIcon,
  CategoryAccessoriesIcon,
  CategorySwitchesIcon,
  CategoryPrinterIcon,
  CategoryWorkstationIcon,
  CategoryRouterIcon,
  CategoryUpsIcon,
  CategoryBrandsIcon
} from '../components/CategoryIcons';
*/

export const categoriesData = [
  { 
    slug: 'computers-and-laptops', 
    name: 'Computers & Laptops', 
    // Icon: CategoryLaptopIcon, // <-- REMOVED
    imageUrl: '/c1.webp', // <-- ADDED
    description: 'Latest laptops, desktops, and business computers.', // <-- ADDED
    seoTitle: 'Shop Computers & Laptops | Starlight Linkers LLC ',
    metaDescription: 'Find the best deals on business computers, gaming laptops, and workstations from top brands at Starlight Linkers LLC .',
    focusKeyphrase: 'Computers & Laptops',
    seoKeywords: ['Computers', 'Laptops', 'Business IT', 'Workstations'],
    imgAltText: 'A modern laptop and desktop computer setup' // <-- UPDATED Alt Text
  },
  { 
    slug: 'accessories', 
    name: 'Accessories', 
    // Icon: CategoryAccessoriesIcon, // <-- REMOVED
    imageUrl: '/c2.webp', // <-- ADDED
    description: 'Keyboards, mice, docking stations, and more.', // <-- ADDED
    seoTitle: 'IT Accessories for Business | Starlight Linkers LLC ',
    metaDescription: 'Discover computer accessories, docking stations, keyboards, mice, and more for your office setup.',
    focusKeyphrase: 'IT Accessories',
    seoKeywords: ['Accessories', 'Docking Station', 'Keyboards', 'Mice'],
    imgAltText: 'A collection of computer accessories like a mouse and keyboard' // <-- UPDATED Alt Text
  },
  { 
    slug: 'switches', 
    name: 'Switches', 
    // Icon: CategorySwitchesIcon, // <-- REMOVED
    imageUrl: '/c3.webp', // <-- ADDED
    description: 'Managed and unmanaged network switches.', // <-- ADDED
    seoTitle: 'Network Switches (Cisco, Ubiquiti) | Starlight Linkers LLC ',
    metaDescription: 'Shop high-performance managed and unmanaged network switches from Cisco, Ubiquiti, Netgear, and more.',
    focusKeyphrase: 'Network Switches',
    seoKeywords: ['Network Switches', 'Cisco Switches', 'Ubiquiti Switches'],
    imgAltText: 'A high-performance network switch with many ports' // <-- UPDATED Alt Text
  },
  { 
    slug: 'printers', 
    name: 'Printers', 
    // Icon: CategoryPrinterIcon, // <-- REMOVED
    imageUrl: '/c4.webp', // <-- ADDED
    description: 'Reliable laser, inkjet, and all-in-one printers.', // <-- ADDED
    seoTitle: 'Business Printers & Scanners | Starlight Linkers LLC ',
    metaDescription: 'Find reliable laser printers, inkjet printers, and all-in-one scanners for your business from HP, Brother, and Epson.',
    focusKeyphrase: 'Business Printers',
    seoKeywords: ['Printers', 'Laser Printers', 'Scanners', 'Business Printers'],
    imgAltText: 'A modern business laser printer' // <-- UPDATED Alt Text
  },
  { 
    slug: 'workstations', 
    name: 'Workstations', 
    // Icon: CategoryWorkstationIcon, // <-- REMOVED
    imageUrl: '/c5.webp', // <-- ADDED
    description: 'Powerful workstations for creative professionals.', // <-- ADDED
    seoTitle: 'High-Performance Workstations | Starlight Linkers LLC ',
    metaDescription: 'Powerful and reliable desktop workstations from Dell, HP, and Lenovo, built for professional creative and technical work.',
    focusKeyphrase: 'Desktop Workstations',
    seoKeywords: ['Workstations', 'Dell Workstations', 'HP Workstations'],
    imgAltText: 'A powerful desktop workstation computer' // <-- UPDATED Alt Text
  },
  { 
    slug: 'routers', 
    name: 'Routers', 
    // Icon: CategoryRouterIcon, // <-- REMOVED
    imageUrl: '/c6.webp', // <-- ADDED
    description: 'Secure wireless routers for home and business.', // <-- ADDED
    seoTitle: 'Business & Home Routers | Starlight Linkers LLC ',
    metaDescription: 'Secure and fast wireless routers for your home and business network from brands like Cisco, Netgear, and Ubiquiti.',
    focusKeyphrase: 'Wireless Routers',
    seoKeywords: ['Routers', 'Wireless Routers', 'Networking'],
    imgAltText: 'A fast wireless internet router' // <-- UPDATED Alt Text
  },
  { 
    slug: 'ups', 
    name: 'UPS', 
    // Icon: CategoryUpsIcon, // <-- REMOVED
    imageUrl: '/c7.webp', // <-- ADDED
    description: 'Protect your tech with battery backup systems.', // <-- ADDED
    seoTitle: 'Uninterruptible Power Supply (UPS) | Starlight Linkers LLC ',
    metaDescription: 'Protect your critical equipment with reliable UPS systems from APC and other leading brands. Find the right battery backup.',
    focusKeyphrase: 'UPS Power Supply',
    seoKeywords: ['UPS', 'Uninterruptible Power Supply', 'Battery Backup', 'APC'],
    imgAltText: 'An uninterruptible power supply (UPS) unit' // <-- UPDATED Alt Text
  },
  { 
    slug: 'brands', 
    name: 'Brands', 
    // Icon: CategoryBrandsIcon, // <-- REMOVED
    imageUrl: '/c8.webp', // <-- ADDED
    description: 'Shop all top IT brands in one place.', // <-- ADDED
    seoTitle: 'Shop All Brands | Starlight Linkers LLC ',
    metaDescription: 'Browse all top IT brands at Starlight Linkers LLC , including Dell, HP, Cisco, Microsoft, Lenovo, and more.',
    focusKeyphrase: 'All Brands',
    seoKeywords: ['Brands', 'Dell', 'HP', 'Cisco', 'Lenovo'],
    imgAltText: 'A collage of top IT brand logos' // <-- UPDATED Alt Text
  },
];