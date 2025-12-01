"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Your Order", href: "/track-your-order" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shop", href: "/shop" },
  { name: "Login", href: "/my-account" }, // We will conditionally render this
];

const menuVariants = {
  hidden: {
    x: "100%",
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    x: "0",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🟢 Auth State
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // 1. Check Login Status
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('customer_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Listen for login/logout events from other components
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  // 2. Logout Handler
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('customer_user');
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/my-account');
    router.refresh();
  };

  return (
    <nav className="fixed w-full z-[100] bg-[#00001E] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center pl-4">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logogif.gif" 
              alt="Starlight Linkers LLC Logo"
              width={50} 
              height={27} 
            />
            {/* Animated Text */}
            <div className="font-bold text-2xl tracking-wide text-white group-hover:text-blue-400 transition-colors leading-tight flex flex-col overflow-hidden w-[300px]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, -20] }}
                transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
              >
                Starlight
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, 15] }}
                transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                Linkers LLC
              </motion.span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            // 🟢 Conditional Rendering for Login Link
            if (link.name === "Login") {
              if (user) {
                return (
                  <div key="user-menu" className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-white hover:text-blue-400 transition-colors duration-200 font-bold flex items-center gap-1"
                    >
                      Hi, {user.firstName}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div 
                        className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-xl py-1 z-50 text-gray-800 border border-gray-200"
                        onMouseLeave={() => setIsDropdownOpen(false)}
                      >
                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                          Account Settings
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
            }
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-blue-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
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
            className="md:hidden bg-[#00001E] absolute w-full top-full left-0 shadow-lg border-t border-gray-800"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                // Mobile Login/User Logic
                if (link.name === "Login" && user) {
                  return (
                    <React.Fragment key="mobile-user">
                      <motion.li variants={linkVariants} className="px-4 py-2 text-blue-400 font-bold border-b border-gray-700">
                        Hi, {user.firstName}
                      </motion.li>
                      <motion.li variants={linkVariants}>
                        <button
                          onClick={() => { handleLogout(); setIsOpen(false); }}
                          className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </motion.li>
                    </React.Fragment>
                  );
                }

                // Hide "Login" link if user is logged in (handled above)
                if (link.name === "Login" && user) return null;

                return (
                  <motion.li key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}