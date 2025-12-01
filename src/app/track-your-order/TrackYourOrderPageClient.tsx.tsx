"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb'; // Import the breadcrumb component
import { TruckIcon } from '../../components/Icons'; // Import the new TruckIcon

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- Breadcrumb Data ---
const breadcrumbItems = [
  { name: 'Home', href: '/' }
];

// --- Main Page Component ---
export default function TrackYourOrderPageClient() {
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
                <Breadcrumb items={breadcrumbItems} currentPage="Track Your Order" />
              </div>
            </div>
            {/* ==================================== */}


      {/* --- Main Content Section (REDESIGNED) --- */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        
        {/*
          MODIFIED: Changed max-w-2xl to max-w-3xl for increased width.
        */}
        <motion.div 
          className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-gray-200 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex flex-col items-center text-center">
            
            {/* 1. ICON (MODIFIED: Using new TruckIcon) */}
            <TruckIcon className="w-16 h-16 text-blue-600 mb-4" />

            {/* 2. Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track your Order
            </h1>

            {/* 3. Description */}
            <p className="text-lg text-gray-700 mb-10">
              To track your order please enter your Order ID in the box below and press the Track button. This was given to you on your receipt and in the confirmation email you should have received.
            </p>
          </div>

          {/* 4. Form (Single Column) */}
          <form className="space-y-6">
            
            {/* Order ID Field */}
            <div>
              <label 
                htmlFor="order-id" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Order ID
              </label>
              <input
                type="text"
                name="order-id"
                id="order-id"
                className="block w-full rounded-md border-gray-300 shadow-sm p-4 text-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Found in your order confirmation email."
              />
            </div>

            {/* Billing Email Field */}
            <div>
              <label 
                htmlFor="billing-email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Billing Email
              </label>
              <input
                type="email"
                name="billing-email"
                id="billing-email"
                className="block w-full rounded-md border-gray-300 shadow-sm p-4 text-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email you used during checkout."
              />
            </div>

            {/* Track Button (Upgraded) */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#00001E] hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Track
              </button>
            </div>

          </form>

        </motion.div>
      </section>
    </div>
  );
}