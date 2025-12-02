"use client";

import React from 'react';
import Image from 'next/image'; // Import Image component for optimized images

// --- Icon Components ---

// A simple placeholder for the RIK dot logo (Preserved but unused)
const RikLogoDots = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mb-2">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#grad1)" opacity="0.1" />
    <circle cx="30" cy="30" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="40" cy="25" r="4" fill="rgb(59, 130, 246)" />
    <circle cx="50" cy="25" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="60" cy="30" r="3" fill="rgb(59, 130, 246)" />
    <circle cx="70" cy="38" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="75" cy="50" r="4" fill="rgb(37, 99, 235)" />
    <circle cx="70" cy="62" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="60" cy="70" r="3" fill="rgb(37, 99, 235)" />
    <circle cx="50" cy="75" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="40" cy="75" r="4" fill="rgb(37, 99, 235)" />
    <circle cx="30" cy="68" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="25" cy="58" r="3" fill="rgb(59, 130, 246)" />
    <circle cx="25" cy="42" r="4" fill="rgb(59, 130, 246)" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-.184-5.25-2.6-5.433-5.433l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
  </svg>
);

const AddressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
);
const PinterestIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.938 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.61 2.164 1.777 2.164 2.137 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.354c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.887-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.49 3.146 1.124.34 2.31.517 3.554.517 6.627 0 12-5.373 12-12s-5.373-12-12-12z" /></svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 2H16C19.3 2 22 4.7 22 8V16C22 19.3 19.3 22 16 22H8C4.7 22 2 19.3 2 16V8C2 4.7 4.7 2 8 2ZM12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7ZM12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9ZM16.5 4.5C17.3 4.5 18 5.2 18 6C18 6.8 17.3 7.5 16.5 7.5C15.7 7.5 15 6.8 15 6C15 5.2 15.7 4.5 16.5 4.5Z" /></svg>
);
const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" /></svg>
);
const RssIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 11a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6v-3zm0-5a14 14 0 0 1 14 14h-3a11 11 0 0 0-11-11v-3zm0-5a19 19 0 0 1 19 19h-3a16 16 0 0 0-16-16v-3z" /></svg>
);

// --- FIXED: WhatsApp Icon (Standard filled version to match others) ---


const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-gray-500 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);


export default function Footer() {
  const findItFastLinks = [
    { name: "Computers & Laptops", href: "/category/computers-and-laptops" },
    { name: "Accessories", href: "/category/accessories" },
    { name: "Switches", href: "/category/switches" },
    { name: "Printers", href: "/category/printers" },
    { name: "Workstations", href: "/category/workstations" },
    { name: "Routers", href: "/category/routers" },
    { name: "UPS", href: "/category/ups" },
    { name: "Brands", href: "/product" }
  ];

  const aboutLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Compare", href: "/compare" },
    { name: "Store Directory", href: "/store-directory" },
  ];

  const customerCareLinks = [
    { name: "My Account", href: "/my-account" },
    { name: "Track Your Order", href: "/track-your-order" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="bg-[#00001E] border-t border-gray-800 text-gray-300">
      {/* --- Main Footer Section --- */}
      <div className="container mx-auto px-8 lg:pl-20 lg:pr-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Logo (Image), Contact, Social */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              {/* Logo Image Component */}
              <Image 
                src="/starlightlogowhite.jpg" 
                alt="Starlight Linkers LLC Logo"
                width={200} 
                height={80} 
                className="mb-2"
              />
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-start">
                <AddressIcon />
                <p className="text-sm">1110 Summit AVE STE 7 Plano, TX 75074</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon />
                <p className="text-sm">(972) 431 0905</p>
              </div>
              
              {/* --- Opening Hours --- */}
              <div className="flex items-start">
                <ClockIcon />
                <div>
                  <p className="text-sm font-semibold text-white">Opening Hours</p>
                  <p className="text-sm text-gray-400">Monday to Friday: 9am-6pm</p>
                </div>
              </div>
              {/* --- END: Opening Hours --- */}

            </div>

            <div className="flex space-x-4 text-gray-300">
              <a href="#" className="hover:text-white"><FacebookIcon /></a>
              <a href="#" className="hover:text-white"><PinterestIcon /></a>
              <a href="#" className="hover:text-white"><InstagramIcon /></a>
              <a href="#" className="hover:text-white"><YouTubeIcon /></a>
              <a href="#" className="hover:text-white"><RssIcon /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-bold text-white mb-4">Quick Links</h5>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white flex items-center pr-2 pl-0">
                    <ChevronRightIcon /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All Categories */}
          <div>
            <h5 className="text-lg font-bold text-white mb-4">All Categories</h5>
            <ul className="space-y-3">
              {findItFastLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white flex items-center pr-2 pl-0">
                    <ChevronRightIcon /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div>
            <h5 className="text-lg font-bold text-white mb-4">Customer Care</h5>
            <ul className="space-y-3">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white flex items-center pr-2 pl-0">
                    <ChevronRightIcon /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="bg-black/50 py-6">
        <div className="container mx-auto px-8 lg:pl-20 lg:pr-6 flex flex-col md:flex-row justify-center items-center text-sm">
          <p className="text-white mb-4 md:mb-0">
            ©2025 Starlight Linkers LLC  - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}