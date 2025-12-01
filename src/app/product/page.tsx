import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import { ArrowRight } from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Shop by Brand | Starlight Linkers LLC',
  description: 'Browse our extensive catalog of high performance IT hardware by top brands. Find products from Dell HP Lenovo Cisco Ubiquiti Avaya Fortinet and more.',
  keywords: [
    'IT Brands', 'Dell', 'HP', 'Lenovo', 'Cisco', 'Ubiquiti', 'Avaya', 'Fortinet', 
    'Network Hardware', 'Business Laptops', 'Server Racks', 'Power Supply'
  ],
  openGraph: {
    title: 'Shop by Brand | Starlight Linkers LLC',
    description: 'Browse our extensive catalog of high performance IT hardware by top brands.',
    url: 'https://www.starlitelinker.com/product',
    siteName: 'Starlight Linkers LLC',
    type: 'website',
  },
};

// --- BRAND DATA ---
// Complete list based on Store Directory Page
const brands = [
  { name: 'Acer', description: 'Monitors, Laptops & Desktops', slug: 'acer' },
  { name: 'APC', description: 'UPS Battery Backup & Server Racks', slug: 'apc' },
  { name: 'Apple', description: 'iPads, MacBooks & Accessories', slug: 'apple' },
  { name: 'Aruba', description: 'Enterprise Networking & Instant On Switches', slug: 'aruba' },
  { name: 'Asus', description: 'Laptops, Monitors & Networking Components', slug: 'asus' },
  { name: 'Avaya', description: 'Unified Communications, IP Phones & Headsets', slug: 'avaya' },
  { name: 'Axis', description: 'Network Cameras & Surveillance Systems', slug: 'axis' },
  { name: 'Brother', description: 'Laser Printers, Label Printers & Scanners', slug: 'brother' },
  { name: 'Canon', description: 'Printers & Imaging Solutions', slug: 'canon' },
  { name: 'Cisco', description: 'Enterprise Switches, Routers & Modules', slug: 'cisco' },
  { name: 'Dell', description: 'Laptops, Workstations, Servers & Monitors', slug: 'dell' },
  { name: 'D-Link', description: 'Networking Solutions for Home & Business', slug: 'd-link' },
  { name: 'Draytek', description: 'Vigor Routers, Firewalls & Networking', slug: 'draytek' },
  { name: 'Eaton', description: 'Power Management & Uninterruptible Power Supplies', slug: 'eaton' },
  { name: 'Epson', description: 'Printers, Projectors & Scanners', slug: 'epson' },
  { name: 'Fortinet', description: 'Cybersecurity, Firewalls & Security Fabric', slug: 'fortinet' },
  { name: 'Gateway', description: 'Laptops & Computing Solutions', slug: 'gateway' },
  { name: 'Grandstream', description: 'IP Voice, Video Telephony & Gateways', slug: 'grandstream' },
  { name: 'Hikvision', description: 'Security Cameras, NVRs & Surveillance', slug: 'hikvision' },
  { name: 'HP', description: 'EliteBooks, ProBooks, ZBooks & Printers', slug: 'hp' },
  { name: 'HPE', description: 'Enterprise Servers, Storage & Networking', slug: 'hpe' },
  { name: 'Lenovo', description: 'ThinkPad, ThinkCentre, Workstations & Tablets', slug: 'lenovo' },
  { name: 'Lexmark', description: 'High Volume Laser Printers & Imaging', slug: 'lexmark' },
  { name: 'Lindy', description: 'Cables, Adapters & Connectivity Solutions', slug: 'lindy' },
  { name: 'Microsoft', description: 'Surface Devices, Docks & Accessories', slug: 'microsoft' },
  { name: 'Mikrotik', description: 'Routers, Switches & Wireless Systems', slug: 'mikrotik' },
  { name: 'MSI', description: 'Gaming Laptops, Motherboards & Peripherals', slug: 'msi' },
  { name: 'Netgear', description: 'ProSafe Switches, WiFi & Networking', slug: 'netgear' },
  { name: 'Nortel', description: 'Digital Phones & Legacy Communication', slug: 'nortel' },
  { name: 'Seagate', description: 'Hard Drives, SSDs & Data Storage', slug: 'seagate' },
  { name: 'Ubiquiti', description: 'UniFi Access Points, Switches & Gateways', slug: 'ubiquiti' },
];

export default function ProductBrandIndexPage() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderSection />

      <div className="flex-grow container mx-auto px-4 sm:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted Brands
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We partner with the worlds leading technology manufacturers to bring you reliable, high performance hardware. Select a brand below to explore our inventory.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link 
              key={brand.name} 
              href={`/category/${brand.slug}`} // Changed to link to specific category/brand page
              className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 flex-grow">
                  {brand.description}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:underline">
                    View Products
                  </span>
                </div>
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Looking for something specific?
          </h3>
          <p className="text-gray-600 mb-8">
            Browse our full catalog to find exactly what you need for your business or home office.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#00001E] rounded-md hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}