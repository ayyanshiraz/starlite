"use client";

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { CheckCircleIcon } from 'lucide-react'; // Or use your SVG component if you prefer

// 🟢 1. Create a Sub-Component for the Logic
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  
  // Get Stripe/Payment Session ID
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // If we have a session ID, it means payment worked. Clear the cart.
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-10 h-10 text-green-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Payment Successful!
      </h1>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
        {sessionId && <span className="block text-xs text-gray-400 mt-2">Transaction ID: {sessionId.slice(-8)}</span>}
      </p>

      <div className="space-x-4">
        <Link 
          href="/shop"
          className="inline-block bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition"
        >
          Continue Shopping
        </Link>
        <Link 
          href="/track-your-order"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
}

// 🟢 2. Main Page Component (Wraps Content in Suspense)
export default function SuccessPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
      {/* Suspense is required for build when using useSearchParams */}
      <Suspense fallback={<p>Loading order details...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}