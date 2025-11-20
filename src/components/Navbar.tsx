"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Import Image component

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Your Order", href: "/track-your-order" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "Login", href: "/login" },
];

const menuVariants = {
  hidden: {
    x: "100%",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    x: "0",
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-[100] bg-[#00001E] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section - Replaced text with Image component */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/starlightlogowhite.jpg" // <--- IMPORTANT: Update this path to your actual logo image file
              alt="Starlight Linkers LLC Logo"
              width={180} // Adjust width as needed
              height={50} // Adjust height as needed
              priority // Prioritize loading for LCP
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-[#00001E] absolute w-full top-full left-0 shadow-lg"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}