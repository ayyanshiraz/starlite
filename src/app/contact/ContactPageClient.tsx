"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Icon Components ---
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

const MapPinIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// --- Reusable Contact Info Box Component ---
interface ContactInfoBoxProps {
  Icon: React.ElementType;
  title: string;
  text: React.ReactNode;
  delay: number;
  href?: string;
}

const ContactInfoBox: React.FC<ContactInfoBoxProps> = ({ Icon, title, text, delay, href }) => {
  const boxClasses = "bg-[#00001E] text-white p-4 rounded-lg flex flex-col items-center text-center shadow-lg cursor-pointer w-full h-full hover:bg-blue-900 transition-colors";
  
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: delay },
    whileHover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  if (href) {
    return (
      <motion.a 
        href={href}
        target={href.startsWith('tel:') ? undefined : "_blank"}
        rel={href.startsWith('tel:') ? undefined : "noopener noreferrer"}
        className={boxClasses}
        {...animationProps}
      >
        <Icon className="w-8 h-8 mb-3" />
        <h3 className="font-bold text-lg mb-1.5">{title}</h3>
        <div className="text-xs">{text}</div>
      </motion.a>
    );
  }

  return (
    <motion.div className={boxClasses} {...animationProps}>
      <Icon className="w-8 h-8 mb-3" />
      <h3 className="font-bold text-lg mb-1.5">{title}</h3>
      <div className="text-xs">{text}</div>
    </motion.div>
  );
};

// --- Main Contact Page Component ---
export default function ContactPageClient() {
  
  // 🟢 1. Form State
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    subject: '', 
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 2. Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-white text-gray-800">
      
      {/* --- Hero Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 bg-gray-900"
      >
        <img 
          src="/contact.webp" 
          alt="Contact center agent" 
          className="absolute inset-0 w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            We're Here To Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-gray-200 text-center"
          >
            For inquiries or assistance, contact us anytime. Your satisfaction is our priority.
          </motion.p>
        </div>
      </motion.section>

      {/* --- Main Content Section --- */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-[#00001E] mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-black max-w-xl mx-auto text-center"
          >
            Ready to go beyond the cart? Connect with our specialists to architect your complete IT solution.
          </motion.p>
        </div>

        {/* --- Two-Column Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* --- Left Column: Info + Map --- */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactInfoBox 
                Icon={MapPinIcon} 
                title="Our Address" 
                text={"1110 Summit AVE STE 7 Plano, TX 75074"}
                delay={0.5} 
              />
              <ContactInfoBox 
                Icon={PhoneIcon} 
                title="Call Us" 
                text={<span className="block">(972) 431 0905</span>}
                delay={0.55}
                href="tel:+19724310905" 
              />
              <ContactInfoBox 
                Icon={MailIcon} 
                title="Email Us" 
                text="sales@starlightlinkers.com"
                delay={0.6}
                href="mailto:sales@starlightlinkers.com"
              />
              <ContactInfoBox 
                Icon={WhatsAppIcon} 
                title="WhatsApp" 
                text="(972) 431 0606"
                delay={0.65}
              />
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://maps.google.com/maps?q=1110%20Summit%20AVE%20STE%207%20Plano%2C%20TX%2075074&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200 h-full flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            {/* 🟢 SUCCESS / ERROR MESSAGES */}
            {status === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 animate-in fade-in">
                    <strong className="font-bold">Message Sent!</strong>
                    <span className="block sm:inline"> We will get back to you soon.</span>
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-in fade-in">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> Failed to send message. Please try again later.</span>
                </div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6 flex flex-col h-full"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={formFieldVariants}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-[#00001E] focus:border-gray-400 text-gray-900"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-[#00001E] focus:border-gray-400 text-gray-900"
                  placeholder="you@example.com"
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-[#00001E] focus:border-gray-400 text-gray-900"
                  placeholder="Inquiry about..."
                />
              </motion.div>

              <motion.div variants={formFieldVariants} className="flex-grow flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-[#00001E] focus:border-gray-400 h-32 resize-none text-gray-900"
                  placeholder="Your message here..."
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#00001E] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00001E] transition-all ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}