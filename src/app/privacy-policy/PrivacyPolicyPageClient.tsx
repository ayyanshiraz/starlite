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
  titleClassName = "text-2xl font-bold text-gray-900 mb-4", // Made title slightly larger
  contentClassName = "text-gray-900" 
}) => (
  <motion.section 
    className={`mb-8 ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is visible
    variants={fadeInUp}
  >
    <h2 className={titleClassName}>
      {title}
    </h2>
    <div className={`space-y-4 ${contentClassName} leading-relaxed`}>
      {children}
    </div>
  </motion.section>
);

// Helper for list items
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="relative pl-6">
    <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
    {children}
  </li>
);

// --- Breadcrumb Data ---
const breadcrumbItems = [
  { name: 'Home', href: '/' }
];

export default function PrivacyPolicyPageClient() {
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
          src="/privacy-policy.webp" // Using a dark placeholder
          alt="Privacy Policy Hero"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
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
                <Breadcrumb items={breadcrumbItems} currentPage="Privacy Policy" />
              </div>
            </div>
            {/* ==================================== */}
      

      {/* --- Main Content Section --- */}
      {/* Removed top padding (py-16) as it's now on the breadcrumb section */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          
          <PolicySection title="Starlight Linkers LLC  - Privacy Policy">
            <p>
              At Starlight Linkers LLC  we take our customers and suppliers privacy seriously, therefore this privacy policy document outlines which personal data and information we gather from you and from people who visit our website and how we use it.
            </p>
          </PolicySection>

          <PolicySection title="Who are we?">
            <p>
              Starlight Linkers LLC  is a registered company (Company Registration # SC818387) and VAT # GB 476913747 with our registered office address at 1110 Summit AVE STE 7 Plano, TX 75074.
            </p>
          </PolicySection>

          <PolicySection title="What type of personal data and information do we gather?">
            <p>
              The personal data we gather may include your name, address, email address, IP address, and information regarding which pages you access on this website and when.
            </p>
          </PolicySection>

          <PolicySection title="When do we collect data and information from you?">
            <ul className="space-y-2">
              <Li>When you make an inquiry via our website or via the telephone</Li>
              <Li>When you use our website</Li>
              <Li>When you enquire about a job opportunity</Li>
              <Li>When you work for or with our business</Li>
              <Li>When you exchange business cards with a member of our business</Li>
            </ul>
          </PolicySection>

          <PolicySection title="How is your information used?">
            <p>
              We gather your personal data and information to run our business effectively and supply you with the best information on our products and assorted services.
            </p>
          </PolicySection>

          <PolicySection title="We may use your information to:">
            <ul className="space-y-2">
              <Li>To provide new retail hardware equipment to you.</Li>
              <Li>To answer inquiries that you make before you agree to any transaction or contract.</Li>
              <Li>To keep you updated about our services.</Li>
              <Li>To process a job application</Li>
              <Li>To fulfill our obligations as an employer</Li>
              <Li>To maintain the security of our offices and IT infrastructure</Li>
              <Li>To invoice you, and to track payments you make or payments made to you</Li>
            </ul>
          </PolicySection>

          <PolicySection title="">
            <p>
              We believe that all these intentions and purposes are justified on the basis of our legitimate interests in operating and growing our business, our contractual obligations to provide the agreed services to you, and our legal requirements, both as a business and dependable and responsible employer. If you would like to find out more details, please see below:
            </p>
            <ul className="space-y-2">
              <Li>Customers</Li>
              <Li>Prospective Customers</Li>
              <Li>Job Applicants, Our Current and Former Employees</Li>
              <Li>Business Partners</Li>
              <Li>Suppliers/Vendors</Li>
            </ul>
          </PolicySection>

        </div>
      </section>
    </div>
  );
}