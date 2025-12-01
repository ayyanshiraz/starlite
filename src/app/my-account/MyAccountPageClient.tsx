"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Components ---

// A simple placeholder for the RIK dot logo
const RikLogoDots = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mb-2">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* This is a simplified representation */}
    <circle cx="50" cy="50" r="40" fill="url(#grad1)" opacity="0.1" />
    <circle cx="30" cy="30" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="40" cy="25" r="4" fill="rgb(59, 130, 246)" />
    <circle cx="50" cy="25" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="60" cy="30" r="3" fill="rgb(59, 130, 246)" />
    <circle cx="70" cy="38" r="5" fill="rgb(59, 130, 246)" />
    <circle cx="75" cy="50" r="4" fill="rgb(37, 99, 235)" />
    <circle cx="70" cy="62" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="60" cy="70" r="3" fill="rgb(37, 99, 235)" />
    <circle cx="50" cy="75" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="40" cy="75" r="4" fill="rgb(37, 99, 235)" />
    <circle cx="30" cy="68" r="5" fill="rgb(37, 99, 235)" />
    <circle cx="25" cy="58" r="3" fill="rgb(59, 130, 246)" />
    <circle cx="25" cy="42" r="4" fill="rgb(59, 130, 246)" />
  </svg>
);

const baseIconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  stroke: "currentColor",
  className: "w-5 h-5 text-gray-400",
};

const UserIcon = () => (
  <svg {...baseIconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const LockIcon = () => (
  <svg {...baseIconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

const EmailIcon = () => (
  <svg {...baseIconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const EyeIcon = () => (
  <svg {...baseIconProps} className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 10.224 7.29 6.75 12 6.75s8.577 3.474 9.964 4.933a1.012 1.012 0 0 1 0 .639C20.577 13.776 16.71 17.25 12 17.25s-8.577-3.474-9.964-4.933Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg {...baseIconProps} className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 14.334 7.21 17.25 12 17.25c.996 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.79 0 8.774 2.884 10.066 5.166A10.451 10.451 0 0 1 12 19.5c-.996 0-1.953-.138-2.863-.395m-4.028-4.028A3 3 0 0 1 9 9m4.058 4.058A3 3 0 0 1 9 9m-4.028-4.028" />
  </svg>
);


// --- Main Page Component ---
export default function MyAccountPageClient() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  const formVariants = {
    hidden: { opacity: 0, x: activeTab === 'login' ? -30 : 30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    exit: { opacity: 0, x: activeTab === 'login' ? 30 : -30, transition: { duration: 0.15 } }
  };

  return (
    <div className="bg-white text-gray-800 pt-12 pb-16 md:pb-24">
      <div className="container mx-auto max-w-2xl px-4">
        
        {/* Welcome Text */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Welcome to Starlight Linkers LLC 
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Please login or create an account to continue
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="relative bg-gray-100 p-1 rounded-lg grid grid-cols-2 max-w-sm mx-auto mb-8">
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-1/2 bg-blue-600 rounded-md"
            layoutId="tab-highlighter"
            animate={{ x: activeTab === 'login' ? '0%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setActiveTab('login')}
            className={`relative z-10 w-full py-3 text-lg font-bold rounded-md transition-colors ${
              activeTab === 'login' ? 'text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`relative z-10 w-full py-3 text-lg font-bold rounded-md transition-colors ${
              activeTab === 'signup' ? 'text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms Container */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SignUpForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Login Form ---
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
          Username or Email
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <UserIcon />
          </span>
          <input
            type="email"
            id="login-email"
            autoComplete="email"
            className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <LockIcon />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="login-password"
            autoComplete="current-password"
            className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Password"
          />
          <span 
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot Password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#00001E] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

// --- Sign Up Form ---
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-6">
      {/* MODIFICATION: First Name and Last Name fields are now at the top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <UserIcon />
            </span>
            <input
              type="text"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your First Name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <UserIcon />
            </span>
            <input
              type="text"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Last Name"
            />
          </div>
        </div>
      </div>

      {/* MODIFICATION: Email field is now after First Name and Last Name */}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <EmailIcon />
          </span>
          <input
            type="email"
            id="signup-email"
            autoComplete="email"
            className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <LockIcon />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="signup-password"
            autoComplete="new-password"
            className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Create a Password"
          />
          <span 
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <LockIcon />
          </span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            autoComplete="new-password"
            className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm Your Password"
          />
          <span 
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I accept the <a href="/terms-and-conditions" className="font-medium text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#00001E] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

// --- Footer Component ---
// (Assuming this is rendered below MyAccountPageClient in a parent layout)
const Footer = () => {
  return (
    <div className="mt-12 text-center py-8"> {/* Removed bg-[#00001E] */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Trusted Brands</h3>
      {/* Brand logos would go here */}
      <div className="flex justify-center items-center space-x-8">
        {/* Placeholder for brand logos */}
        <span className="text-gray-500">Brand 1</span>
        <span className="text-gray-500">Brand 2</span>
        <span className="text-gray-500">Brand 3</span>
      </div>
    </div>
  );
};