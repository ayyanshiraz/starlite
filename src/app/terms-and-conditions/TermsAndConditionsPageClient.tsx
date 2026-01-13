"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb'; // Import the breadcrumb component

// --- Animation Variants ---
const heroFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- Helper Component for Text Sections ---
interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

// This helper component styles each section of your policy
const PolicySection: React.FC<PolicySectionProps> = ({ 
  title, 
  children, 
  className = "", 
  titleClassName = "text-xl font-bold text-gray-900 mb-4 text-center", // Centered title
  contentClassName = "text-gray-900" 
}) => (
  <motion.section 
    className={`mb-10 ${className}`} 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is visible
    variants={fadeInUp}
  >
    <h2 className={titleClassName}>
      {title}
    </h2>
    <div className={`space-y-4 ${contentClassName} leading-relaxed text-center max-w-3xl mx-auto`}>
      {children}
    </div>
  </motion.section>
);

// --- Breadcrumb Data ---
const breadcrumbItems = [
  { name: 'Home', href: '/' }
];

// --- Main Page Component ---
export default function TermsAndConditionsPageClient() {
  return (
    <div className="bg-white text-gray-900">
      
      {/* --- Hero Section --- */}
      <motion.div 
        className="relative bg-gray-100 py-20 text-gray-900 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroFadeIn}
      >
        <img
          src="/terms.webp" // Using a light placeholder
          alt="Terms and Conditions background" // Image Alt Text
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-4 text-black"
            variants={fadeInUp}
          >
            Terms and Conditions
          </motion.h1>
        </div>
      </motion.div>

      {/* ===== BREADCRUMB SECTION (MODIFIED) ===== */}
      <div className="bg-white py-6">
        {/*
          MODIFICATION:
          Removed the "max-w-4xl mx-auto" wrapper. The breadcrumbs
          now sit directly in the "max-w-7xl" container,
          aligning them to the left of the page (same as the header).
        */}
       <div className="container mx-auto max-w-8xl px-8">
          <Breadcrumb items={breadcrumbItems} currentPage="Terms and Conditions" />
        </div>
      </div>
      {/* ==================================== */}


      {/* --- Main Content Section --- */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        {/* This content block is still centered, as it should be */}
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction Paragraph */}
          <motion.p 
            className="text-center text-black text-lg mb-16 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            Any agreement for the purchase of goods from Starlight Linkers LLC  and the Customer shall be subject to these Business Policies, Terms and Conditions. By placing an order, customer consents to and agrees to abide by any and all of the following Terms and Conditions.
          </motion.p>

          <PolicySection title="PRICES">
            <p>
              Website prices are updated on a weekly basis (every Monday - holidays are excluded) and are current to the best of our knowledge when posted. However, because of the dynamic nature of the computer industry, some products, prices, manufacturer promotions or offers may change before we are able to update and post the information on this website. In the event of an unexpected cost increase or other change, we will contact you to determine whether you want to continue your order at the new price or cancel your order. We reserve the right to decline the acceptance of any orders.
            </p>
          </PolicySection>

          <PolicySection title="WARRANTY">
            <p>
              Starlight Linkers LLC makes no warranty of any kind with respect to the information posted on this website. While Starlight Linkers LLC makes every effort to ensure the accuracy of the data, this website could include typographical errors and technical inaccuracies. In addition, photos may not represent actual products.
            </p>
          </PolicySection>

          <PolicySection title="Manufacturer Warranties">
            <p>
              Manufacturer warranties apply to your purchase. Starlight Linkers LLC , disclaims all other warranties including but not limited to warranties of merchantability and fitness for a particular purpose.
            </p>
          </PolicySection>

          <PolicySection title="Liabilities">
            <p>
              In no event shall Starlight Linkers LLC be liable for any damages caused by any product or failure of such product to perform, whether or not advised of the possibility of such damage and regardless of the theory of liability pursuant to which such damages may be sought.
            </p>
          </PolicySection>

          <PolicySection title="Returns">
            <p>
              The Customer agrees to follow the Starlight Linkers LLC Policy to request a Return Merchandise Authorization Number (RMA#) from Starlight Linkers LLC before attempting to return any products. See Returning a Product for further details and to initiate return process.
            </p>
          </PolicySection>

          <PolicySection title="Claims">
            <p>
              If a Customer makes any claims against Starlight Linkers LLC , the Customer agrees that the venue for such claims will be TX, USA.
            </p>
          </PolicySection>

          <PolicySection title="Customer Credit Card Charges">
            <p>
              If necessary, the Customer authorizes Starlight Linkers LLC to charge their Credit Card for any Restocking, Over good, or other charges, in addition to the cost of the products to include shipping charges for any product returned.
            </p>
          </PolicySection>

        </div>
      </section>
    </div>
  );
}