"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';

export default function CartPopup() {
  const { isPopupOpen, closePopup, lastAddedItem } = useCart();

  // Variants for the animation (Pop up effect)
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: 10 },
  };

  if (!lastAddedItem) return null;

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          
          {/* Dark Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closePopup}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button (Top Right) */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-5/12 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
               <div className="relative w-full aspect-[3/4] max-h-64 md:max-h-full">
                  <Image
                    src={lastAddedItem.image}
                    alt={lastAddedItem.name}
                    fill
                    className="object-contain mix-blend-multiply"
                  />
               </div>
            </div>

            {/* Right: Content & Buttons */}
            <div className="w-full md:w-7/12 p-8 flex flex-col justify-center text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-2">
                {lastAddedItem.name}
              </h3>
              <p className="text-gray-600 mb-8 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Successfully added to your bag!
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={closePopup}
                  className="w-full py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors uppercase tracking-wider text-sm"
                >
                  Continue Shopping
                </button>
                <Link
                  href="/checkout"
                  onClick={closePopup}
                  className="w-full py-3 px-6 bg-[#00001E] border border-[#00001E] rounded-lg text-white font-semibold hover:bg-blue-900 transition-colors text-center uppercase tracking-wider text-sm shadow-md"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}