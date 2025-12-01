"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb'; // Import the breadcrumb component
import Link from 'next/link';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- Breadcrumb Data ---
const breadcrumbItems = [
  { name: 'Home', href: '/' }
];

// --- NEW: Slug Generation Function ---
/**
 * Converts a string into a URL-friendly slug.
 * Example: "Computers & Laptops" -> "computers-and-laptops"
 */
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ & /g, '-and-')     // Replace " & " with "-and-"
    .replace(/ /g, '-')          // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '');   // Remove all non-word or non-hyphen chars
};

// --- Directory Data (Split into 4 Columns) ---
// THIS DATA IS FROM YOUR SCREENSHOTS
interface SubCategory {
  name: string;
  href: string; // We will ignore this '#' href and generate our own
}

interface Category {
  name: string;
  href: string; // We will ignore this '#' href and generate our own
  subCategories?: SubCategory[];
}

// --- COLUMN 1 DATA ---
const column1Data: Category[] = [
  { name: 'Avaya', href: '#' },
  { name: 'Axis', href: '#' },
  { name: 'Dell', href: '#', subCategories: [
      { name: 'Dell Docking Station', href: '#' },
      { name: 'Dell Laptop', href: '#' },
      { name: 'Dell Workstation', href: '#' },
  ]},
  { name: 'Docking Station', href: '#' },
  { name: 'Hikvision', href: '#' },
  { name: 'HP', href: '#', subCategories: [
      { name: 'HP Displays', href: '#' },
      { name: 'HP Docking Station', href: '#' },
      { name: 'HP Keyboards & Keypads', href: '#' },
      { name: 'HP Laptops', href: '#' },
      { name: 'HP Printer', href: '#' },
      { name: 'HP Switches', href: '#' },
      { name: 'HP Workstation', href: '#' },
  ]},
  { name: 'Mikrotik', href: '#' },
  { name: 'MSI', href: '#' },
  { name: 'Rackmount', href: '#' },
  { name: 'Remote Maintenance Module', href: '#' },
  { name: 'Tablets', href: '#' },
  { name: 'Transceiver', href: '#' },
];

// --- COLUMN 2 DATA ---
const column2Data: Category[] = [
  { name: 'Access Point', href: '#' },
  { name: 'Asus', href: '#' },
  { name: 'Bridge', href: '#' },
  { name: 'D-Link', href: '#' },
  { name: 'Draytek', href: '#' },
  { name: 'Grandstream', href: '#' },
  { name: 'HPE', href: '#' },
  { name: 'Microsoft', href: '#', subCategories: [
      { name: 'Microsoft Docking Station', href: '#' },
      { name: 'Microsoft Laptop', href: '#' },
  ]},
  { name: 'Netgear', href: '#', subCategories: [
      { name: 'Netgear Access Point', href: '#' },
      { name: 'Netgear Switches', href: '#' },
  ]},
  { name: 'Printers', href: '#' },
  { name: 'Routers', href: '#' },
  { name: 'Ubiquiti', href: '#', subCategories: [
      { name: 'Ubiquiti Access Point', href: '#' },
      { name: 'Ubiquiti Router', href: '#' },
      { name: 'Ubiquiti Switches', href: '#' },
  ]},
];

// --- COLUMN 3 DATA ---
const column3Data: Category[] = [
  { name: 'Acer', href: '#' },
  { name: 'Aruba', href: '#' },
  { name: 'Brother', href: '#' },
  { name: 'Computers & Laptops', href: '#' },
  { name: 'Eaton', href: '#' },
  { name: 'Gateway', href: '#' },
  { name: 'Laptop', href: '#' },
  { name: 'Lindy', href: '#' },
  { name: 'Network Accessory', href: '#' },
  { name: 'Power Supply', href: '#' },
  { name: 'Seagate', href: '#' },
  { name: 'Switch', href: '#' },
  { name: 'Ubiquiti Networks', href: '#' },
  { name: 'Workstations', href: '#' },
];

// --- COLUMN 4 DATA ---
const column4Data: Category[] = [
  { name: 'APC', href: '#' },
  { name: 'Apple', href: '#' },
  { name: 'Canon', href: '#' },
  { name: 'Cisco', href: '#', subCategories: [
      { name: 'Cisco SFP Module', href: '#' },
      { name: 'Cisco Switches', href: '#' },
  ]},
  { name: 'Epson', href: '#', subCategories: [
      { name: 'Epson Printer', href: '#' },
  ]},
  { name: 'Fortinet', href: '#', subCategories: [
      { name: 'Fortinet Firewall', href: '#' },
  ]},
  { name: 'Lenovo', href: '#', subCategories: [
      { name: 'Lenovo Docking Station', href: '#' },
      { name: 'Lenovo Laptop', href: '#' },
      { name: 'Lenovo Workstation', href: '#' },
  ]},
  { name: 'Lexmark', href: '#' },
  { name: 'Network Camera', href: '#' },
  { name: 'Other Network Equipment', href: '#' },
  { name: 'Server', href: '#' },
  { name: 'Storage server', href: '#' },
  { name: 'Uncategorized', href: '#' },
  { name: 'UPS', href: '#' },
];

// Helper component for rendering a single category block
const CategoryBlock: React.FC<{ category: Category }> = ({ category }) => {
  return (
    // "break-inside-avoid" prevents columns from breaking in the middle of a category
    <div className="mb-6 break-inside-avoid"> 
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link 
          href={`/category/${generateSlug(category.name)}`} 
          className="p-2 bg-[#00001E] rounded-md mb-2 block w-full text-center text-lg font-bold text-white hover:brightness-125 transition-all duration-200"
        >
          {category.name}
        </Link>
      </motion.div>
      
      {category.subCategories && (
        <ul className="relative mt-4 list-none space-y-3 before:absolute before:left-2 before:-top-2 before:bottom-2 before:w-px before:bg-gray-300">
          {category.subCategories.map((sub) => (
            <li key={sub.name} className="relative pl-7 before:absolute before:left-2 before:top-2.5 before:w-3 before:h-px before:bg-gray-300">
              <Link 
                href={`/category/${generateSlug(sub.name)}`} 
                className="text-sm text-gray-900 hover:text-gray-900 hover:underline transition-colors"
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- Main Page Component ---
export default function StoreDirectoryPageClient() {
  return (
    <div className="bg-white text-gray-900">
      
      {/* ===== BREADCRUMB SECTION (MODIFIED) ===== */}
            <div className="bg-white py-6">
              {/*
                MODIFICATION:
                Removed the "max-w-4xl mx-auto" wrapper. The breadcrumbs
                now sit directly in the "max-w-7xl" container,
                aligning them to the left of the page (same as the header).
              */}
             <div className="container mx-auto max-w-8xl px-8">
                <Breadcrumb items={breadcrumbItems} currentPage="Store Directory" />
              </div>
            </div>
            {/* ==================================== */}


      {/* --- Main Content Section (4-COLUMN GRID LAYOUT) --- */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        {/* This block centers the content */}
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <motion.h1 
            className="text-5xl font-bold text-gray-900 text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Store Directory
          </motion.h1>

          {/* Directory Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {/* Column 1 */}
            <div>
              {column1Data.map((category) => (
                <CategoryBlock key={category.name} category={category} />
              ))}
            </div>

            {/* Column 2 */}
            <div>
              {column2Data.map((category) => (
                <CategoryBlock key={category.name} category={category} />
              ))}
            </div>

            {/* Column 3 */}
            <div>
              {column3Data.map((category) => (
                <CategoryBlock key={category.name} category={category} />
              ))}
            </div>

            {/* Column 4 */}
            <div>
              {column4Data.map((category) => (
                <CategoryBlock key={category.name} category={category} />
              ))}
            </div>
            
          </motion.div>

        </div>
      </section>
    </div>
  );
}