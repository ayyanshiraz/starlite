"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HeaderSection } from '../../components/Header'; // Adjust path if needed
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents'; // Adjust path if needed

// --- ICONS ---
const CheckCircleIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const FileTextIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ArrowRightIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// --- MAIN CONTENT COMPONENT ---
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  
  // Get data from URL parameters
  const type = searchParams.get('type'); // 'quote' or 'order'
  const email = searchParams.get('email');
  
  const isQuote = type === 'quote';

  useEffect(() => {
    // Generate a random Order ID for display purposes
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderId(`SL-${randomId}`);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-2xl w-full mx-4">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${isQuote ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
        {isQuote ? (
          <FileTextIcon className="w-12 h-12" />
        ) : (
          <CheckCircleIcon className="w-12 h-12" />
        )}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {isQuote ? 'Quote Request Received!' : 'Order Confirmed!'}
      </h1>
      
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        {isQuote 
          ? `Thank you for your interest. We have received your quote request and sent a confirmation email to ` 
          : `Thank you for your purchase. We have received your order and sent a confirmation email to `
        }
        <span className="font-semibold text-gray-900">{email || 'your email'}</span>.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              {isQuote ? 'Request Reference' : 'Order Number'}
            </span>
            <span className="text-xl font-bold text-gray-900">{orderId}</span>
          </div>
          <div className="text-center sm:text-right">
            <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Date</span>
            <span className="text-gray-900 font-medium">
              {new Date().toLocaleDateString('en-GB', { 
                day: 'numeric', month: 'long', year: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          {isQuote 
            ? "Our team will review your requirements and get back to you within 24 hours."
            : "We will notify you once your package has been shipped."
          }
        </p>

        <Link 
          href="/shop" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00001E] text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          Continue Shopping
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// --- PAGE WRAPPER ---
export default function OrderConfirmationPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <HeaderSection />
      
      <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[80vh]">
        <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}