"use client"; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Track Your Order', href: '/track-your-order' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shop', href: '/shop' },
    { name: 'Login', href: '/my-account' }
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.2 } 
    }
  };

  const line1Variants = {
    open: { rotate: 45, y: 8 },
    closed: { rotate: 0, y: 0 }
  };
  const line2Variants = {
    open: { opacity: 0 },
    closed: { opacity: 1 }
  };
  const line3Variants = {
    open: { rotate: -45, y: -8 },
    closed: { rotate: 0, y: 0 }
  };

  return (
    // --- FIX: Changed z-50 to z-[100] to ensure it sits above the HeaderSection ---
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-[#00001E] border-b border-gray-800">
      <div className="container mx-auto h-full flex justify-between items-center px-8">
        
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-extrabold text-blue-600">Starlight Linkers LLC</span>
          </Link>
        </div>

        {/* Right Side: Nav Links (Desktop) */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 font-medium hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            className="text-gray-300 hover:text-white w-6 h-6 relative focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            animate={isMobileMenuOpen ? "open" : "closed"}
          >
            <motion.span 
              className="block absolute h-0.5 w-full bg-current"
              style={{ top: '6px' }}
              variants={line1Variants}
            ></motion.span>
            <motion.span 
              className="block absolute h-0.5 w-full bg-current"
              style={{ top: '11px' }}
              variants={line2Variants}
            ></motion.span>
            <motion.span 
              className="block absolute h-0.5 w-full bg-current"
              style={{ top: '16px' }}
              variants={line3Variants}
            ></motion.span>
          </motion.button>
        </div>
      </div>

      {/* --- Animated Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-20 left-0 right-0 w-full bg-[#00001E] border-b border-gray-800 shadow-lg md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col space-y-1 px-8 py-4 pb-8">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.name}`}
                  href={link.href}
                  className="text-gray-300 font-medium hover:text-white w-full py-3 px-4 rounded-md transition-all duration-200 hover:bg-gray-800 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}