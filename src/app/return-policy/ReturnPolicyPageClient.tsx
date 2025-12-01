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

// Helper component for text sections
interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ 
  title, 
  children, 
  className = "", 
  titleClassName = "text-xl font-bold text-gray-900 mb-4", // Changed title to gray-900
  contentClassName = "text-gray-900" 
}) => (
  <section className={`mb-8 ${className}`}>
    <h2 className={titleClassName}>
      {title}
    </h2>
    <div className={`space-y-4 ${contentClassName} leading-relaxed`}>
      {children}
    </div>
  </section>
);

// --- Breadcrumb Data ---
const breadcrumbItems = [
  { name: 'Home', href: '/' }
];

export default function ReturnPolicyPageClient() {
  return (
    <div className="bg-white text-gray-900">
      
      {/* --- Hero Section --- */}
      <motion.div 
        className="relative bg-gray-800 py-20 text-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroFadeIn}
      >
        <img
          src="/return-policy.webp" // Using a dark placeholder
          alt="Return Policy Hero"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Our Return Policy</h1>
          <p className="text-xl text-white">
            Ensuring your satisfaction with every purchase.
          </p>
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
                <Breadcrumb items={breadcrumbItems} currentPage="Return Policy" />
              </div>
            </div>
            {/* ==================================== */}
      

      {/* --- Main Content Section --- */}
      {/* Removed top padding (py-16) as it's now on the breadcrumb section */}
      <section 
        className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24"
      >
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection title="Return Policy">
              <p>
                Some of our best customer services begin after you buy from us. 100% Satisfaction is guaranteed on all in stock products! If you are not satisfied with a products performance or you have received incorrect goods you bought from Starlight Linkers LLC , we will refund the purchase price as per our return policy terms and conditions mentioned below. Make your request within 15 days of the invoice date and we will email you simple instructions for sending it back. Please be aware that any discrepancies between your order and the goods received must be flagged within 2 days of receipt of the items, failing which no return will be entertained by Starlight Linkers LLC . Please return the product immediately after receiving our email and make sure that the contents are complete and contained within the original manufacturers packaging. Note that shipping charges are not refundable.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection title="Non-faulty items returns policy">
              <p>
                Non-faulty items returns policy is on sole and absolute discretion of the Starlight Linkers LLC , Management. If we agree to accept the return for credit of unwanted products, the goods must be returned with our prior written agreement within 15 days of delivery. The Goods must be UNOPENED, with the manufacturers seal completely intact and in perfect condition. All non-faulty returns are liable to a 50% restocking fee, unless wrongly supplied by Starlight Linkers LLC . Such supplies must be returned in their original condition; accessories, manuals, software and warranties must be enclosed in their genuine packaging and be undamaged.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection title="Faulty items under warranty returns policy">
              <p>
                If you encounter a fault, please raise an RMA request by agreeing to our terms and conditions below. You will need to quote our order number, the date of purchase and the serial number of the faulty items. Once Starlight Linkers LLC  has confirmed that the faulty product is still under warranty, one of our engineers will try to resolve your problem over the phone or via remote access. If the problem persists, an RMA number will be issued, and you will need to follow our standard RMA procedure. Once the item has been returned, we will test it and fix the problem. If the item cannot be repaired, Starlight Linkers LLC  will send out a replacement of the goods. Replacement hardware may be either new or equivalent to new and be or with equivalent specifications.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection 
              title="Just follow these Easy Steps for an Easy Return"
              titleClassName="text-xl font-bold mb-6 text-center text-white"
              className="bg-[#00001E] p-8 rounded-lg border border-gray-200"
              contentClassName="text-white"
            >
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  Use a RETURN REQUEST FORM to obtain a Return Merchandise Authorization (RMA). Be sure to make your request within 15 days of the invoice date. Once your request has been received, you will be emailed an RMA number along with specific return instructions. Returns received without a valid RMA, or returns received more than 10 days after the RMA issue date will be refused. RMA numbers cannot be extended or reissued.
                </li>
                <li>
                  Pack the item you are returning within a strong shipping box to prevent damage. We recommend that you insure your return shipment against loss or damage, and use a carrier such as DHL, TNT, UPS or FedEx that can provide proof of delivery. You are responsible for all shipping charges on returned items and any damages in transit.
                </li>
                <li>
                  Prominently display the RMA number on the outside of the shipping box. Do not write on or apply any labels directly to manufacturer boxes or original product packaging surfaces. Doing so can void RMA process in case of manufacturer refusal to accept their damaged packing.
                </li>
                <li>
                  Ship the package to the address provided. When you receive your RMA email from us, you will be provided with an address to where your return package MUST be shipped. If you ship it to an address other than the one provided, it will cause severe delays in issuing your refund.
                </li>
              </ol>
              <p className="mt-4">
                That is all there is to it! Your refund will be issued once the returned product has been received and accepted.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection 
              title="Additional Return Notes"
              titleClassName="text-lg font-bold text-gray-900 mb-3"
            >
              <p>
                Damaged Shipments. If you receive a shipping carton that shows obvious damage and was. delivered from a recognized commercial carrier such as DHL, TNT, UPS or FedEx, etc., then refuse the shipment and email us immediately. If upon opening a carton you discover concealed damage, contact us right away to arrange for an inspection.
              </p>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection 
              title="Starlight Linkers LLC  Reserves the right to charge 50% Restocking Fee:"
              titleClassName="text-lg font-bold text-center text-white mb-4"
              className="bg-[#00001E] p-8 rounded-lg"
              contentClassName="text-white text-center"
            >
              <ul className="list-inside space-y-2 max-w-2xl mx-auto">
                <li>If there is any damage to Original packing.</li>
                <li>If product is opened or the manufacturer seal has been broken.</li>
                <li>There are missing components or accessories.</li>
              </ul>
            </PolicySection>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <PolicySection title="Unauthorized Returns">
              <p>
                Packages without an RMA number or returned products that are not acceptable for return will be shipped back to you at your expense.
              </p>
            </PolicySection>
          </motion.div>

        </div>
      </section>
    </div>
  );
}