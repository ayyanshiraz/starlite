"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Icon Components (from lucide-react, similar style) ---
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "28",
  height: "28",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const HeadsetIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

const ShieldCheckIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const HeartIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);


// --- Main About Page Component ---
// RENAMED from AboutPage to AboutPageClient
export default function AboutPageClient() {
  
  // --- Animation Variants ---
  
  // For the main hero section container
  const heroContainerVariants = {
    initial: {},
    animate: {},
    hover: {}
  };

  // For the shapes
  const shape1Variants = {
    initial: { opacity: 0, x: -100, y: 100, backgroundColor: "#111827" }, // gray-900
    animate: { 
      opacity: 0.5, x: 0, y: 0, backgroundColor: "#111827",
      transition: { duration: 1, delay: 0.2 } 
    },
    hover: { 
      opacity: 1, backgroundColor: "#00001E", // brand color
      scale: 1.05,
      transition: { duration: 0.3 } 
    }
  };

  const shape2Variants = {
    initial: { opacity: 0, x: 100, y: 100, backgroundColor: "#111827" }, // gray-900
    animate: { 
      opacity: 0.5, x: 0, y: 0, backgroundColor: "#111827",
      transition: { duration: 1, delay: 0.4 } 
    },
    hover: { 
      opacity: 1, backgroundColor: "#00001E", // brand color
      scale: 1.05,
      transition: { duration: 0.3 } 
    }
  };

  const shape3Variants = {
    initial: { opacity: 0, y: -100, backgroundColor: "#111827" }, // gray-900
    animate: { 
      opacity: 0.5, y: 0, backgroundColor: "#111827",
      transition: { duration: 1, delay: 0.6 } 
    },
    hover: { 
      opacity: 0.7, backgroundColor: "#00001E", // brand color
      y: -10, // Add a slight upward move on hover
      scale: 1.05,
      transition: { duration: 0.3 } 
    }
  };

  // For the text
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } }
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.7 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } }
  };

  // For content sections
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white text-gray-800">
      
      {/* --- Hero Section (Animations Unchanged) --- */}
      <motion.section
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={heroContainerVariants}
        className="relative text-white h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <img
          src="/about.jpg"
          alt="Abstract background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Abstract Geometric Shapes */}
        <motion.div
          variants={shape1Variants}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full"
        />
        <motion.div
          variants={shape2Variants}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 aspect-square"
        />
          <motion.div
          variants={shape3Variants}
          className="absolute -top-1/4 -right-1/4 w-1/2 aspect-square"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} // CSS Triangle
        />

        {/* Hero Text Content */}
        <div className="relative z-10 text-center p-4 flex flex-col items-center justify-center w-full"> {/* ADDED flex, flex-col, items-center, justify-center, w-full */}
          <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            About Starlight <br /> Linkers LLC
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            className="max-w-2xl text-lg md:text-xl text-gray-300"
          >
            Your Unlimited Source for IT Products and Bespoke Solutions.
          </motion.p>
        </div>
      </motion.section>

      {/* --- Main Content Section (Animated on Scroll) --- */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={fadeIn} 
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        
        {/* "Who We Are" Section (MODIFIED FOR MOBILE) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* TEXT (First for mobile, order-last for desktop) */}
          <motion.div variants={fadeInUp} className="md:order-last">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00001E] mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Starlight Linkers LLC  is an all-in-one stop shop for your business IT requirements. In this changing era, all businesses are solely depending on tech. In a time where the race is fast and competition is high, the entrepreneurial puzzle gets resolved by Starlight Linkers LLC . As your trusted IT provider partner, we delve deep into your IT requirements and provide you with the best vision through our well-informed, free consultation.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We assist you in your business productivity by implementing tech with well-driven, meaningful results. We are the providers for the IT infrastructures you use during your work and ensure the best performability from it. The IP phone, laptop, and workstation you work on, the networking equipment which assures the smooth ability of your workflow, data storage, and its security are all made sure by the high-quality equipment provided by Starlight Linkers LLC  to enhance your business revenue.
            </p>
          </motion.div>
          {/* IMAGE (Second for mobile, order-first for desktop) */}
          <motion.div 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/about1.webp" 
              alt="Starlight Linkers LLC Team" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </motion.div>

        {/* "What we really do?" Section (MODIFIED FOR MOBILE) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* TEXT (First for mobile and desktop) */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00001E] mb-6">
              What we really do?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Starlight Linkers LLC  provides comprehensive IT solutions, including expert consultation, hardware procurement, and logistics. We streamline your tech needs to enhance productivity, ensuring reliable performance and secure delivery.
            </p>
          </motion.div>
          {/* IMAGE (Second for mobile and desktop) */}
          <motion.div 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/about2.webp" 
              alt="Our Process" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </motion.div>

        {/* "Our Vision" Section (MODIFIED FOR MOBILE) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* TEXT (First for mobile, order-last for desktop) */}
          <motion.div variants={fadeInUp} className="md:order-last">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00001E] mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Starlight Linkers LLC , our vision is to empower businesses with cutting-edge IT solutions that drive innovation and efficiency. We strive to be the trusted partner that simplifies technology, enabling our clients to focus on their core objectives and achieve sustained success in a rapidly evolving digital landscape.
            </p>
          </motion.div>
          {/* IMAGE (Second for mobile, order-first for desktop) */}
          <motion.div 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/about3.webp" 
              alt="Our Vision" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </motion.div>

        {/* --- History of the Company Section (Already correct) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* TEXT (First for mobile and desktop) */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00001E] mb-6">
              History of the Company
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Starlight Linkers LLC  began as a consultancy dedicated to 
              simplifying IT solutions for businesses. We quickly 
              expanded to offer comprehensive hardware procurement 
              and logistics services. Our commitment to innovation and 
              quality has established us as a trusted IT partner.
            </p>
          </motion.div>
          {/* IMAGE (Second for mobile and desktop) */}
          <motion.div 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/about4.webp" 
              alt="Company History" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </motion.div>

        {/* --- Cooperate with Us! Section (MODIFIED FOR MOBILE) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* TEXT (First for mobile, order-last for desktop) */}
          <motion.div variants={fadeInUp} className="md:order-last">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00001E] mb-6">
              Cooperate with Us!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Partner with Starlight Linkers LLC  to streamline your IT 
              needs and drive business success. Our expert solutions, 
              reliable hardware, and exceptional service ensure your 
              technology supports your goals. Lets work together to 
              achieve excellence in a rapidly evolving digital landscape.
            </p>
          </motion.div>
          {/* IMAGE (Second for mobile, order-first for desktop) */}
          <motion.div 
            variants={fadeIn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/about5.webp" 
              alt="Partner With Us" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </motion.div>


        {/* "What can we do for you?" Section (Animated on Scroll) */}
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-[#00001E] mb-4"
          >
            What can we do for you?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We provide more than just products. We deliver comprehensive solutions, unparalleled expertise, and a commitment to your success.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* CARD: Added whileTap */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 1.05, y: -10 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200 text-center"
          >
            <HeadsetIcon className="w-12 h-12 text-[#00001E] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Support 24/7</h3>
            <p className="text-gray-600">
              Our dedicated team is available 24/7 via phone, online chat, or email to address any issues and offer timely assistance.
            </p>
          </motion.div>

          {/* CARD: Added whileTap */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 1.05, y: -10 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200 text-center"
          >
            <ShieldCheckIcon className="w-12 h-12 text-[#00001E] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Quality</h3>
            <p className="text-gray-600">
              We are committed to delivering the highest quality IT solutions. We source top-tier hardware to ensure optimal performance.
            </p>
          </motion.div>

          {/* CARD: Added whileTap */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 1.05, y: -10 }} // ADDED FOR MOBILE
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200 text-center"
          >
            <HeartIcon className="w-12 h-12 text-[#00001E] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Care</h3>
            <p className="text-gray-600">
              Exceptional customer care is at the heart of what we do. We provide personalized support and attentive service.
            </p>
          </motion.div>
        </motion.div>
        
      </motion.section>
    </div>
  );
}