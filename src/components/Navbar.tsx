"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Your Order", href: "/track-your-order" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "Login", href: "/my-account" },
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
        {/* Logo Section */}
        <div className="flex items-center pl-4">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/logogif.gif" 
              alt="Starlight Linkers LLC Logo"
              width={50} 
              height={27} 
            />
            {/* Animated Text Container - Increased size to text-2xl */}
            <div className="font-bold text-2xl tracking-wide text-white group-hover:text-blue-400 transition-colors leading-tight flex flex-col overflow-hidden w-[300px]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, -20] }}
                transition={{
                  duration: 6, // Total cycle time
                  times: [0, 0.2, 0.8, 1], // 0-20% Enter, 20-80% Stay, 80-100% Exit
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Starlight
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, 15] }}
                transition={{
                  duration: 6,
                  times: [0, 0.2, 0.8, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2, // Staggered start
                }}
              >
                Linkers LLC
              </motion.span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              {link.name}
            </a>
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
                  <a
                    href={link.href}
                    className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}