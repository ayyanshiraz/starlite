"use client";

import React, { useEffect, useState, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const hasRan = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    
    if (hasRan.current) return; 
    hasRan.current = true; 

    // 1. Clear the cart safely
    try {
      clearCart();
    } catch (e) {
      console.error("Cart clear error:", e);
    }

    // 2. Fetch order details
    fetch(`/api/orders/success?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setOrder(data);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setErrorMsg(err.message || "Failed to load order.");
      })
      .finally(() => setLoading(false));

  }, [sessionId]); // Empty dependency to run once per sessionID change

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl mx-auto p-6">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      {/* --- ORDER DETAILS BOX --- */}
      {order ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm text-left">
          
          {/* Header */}
          <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Order Number</p>
              {/* Safe Access with Optional Chaining */}
              <p className="text-lg font-mono font-bold text-blue-600">
                {order?.id ? `#${order.id.slice(-8).toUpperCase()}` : 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">
                ${order?.amountTotal ? (order.amountTotal / 100).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
          
          {/* Items List (Fixed Overlap with Flex-Wrap) */}
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold mb-2">Items Ordered</p>
            <ul className="divide-y divide-gray-100">
              {order?.items?.map((item: any, idx: number) => (
                <li key={idx} className="flex justify-between items-start py-3 gap-4">
                  {/* Product Name & Qty */}
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-semibold text-gray-900 leading-snug break-words">
                       {item.name}
                     </p>
                     <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  {/* Price */}
                  <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
                     ${item.price ? (item.price / 100).toFixed(2) : '0.00'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Shipping Details + Phone */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
             <p className="mb-1"><span className="font-bold text-gray-800">Shipping to:</span></p>
             <p>{order?.addressLine1 || ''}</p>
             <p>{order?.city || ''}, {order?.postalCode || ''}</p>
             <p>{order?.country || ''}</p>
             
             {/* 🟢 Phone Number Display */}
             {order?.customerPhone && (
               <p className="mt-2 pt-2 border-t border-gray-200">
                 <span className="font-bold text-gray-800">Phone:</span> {order.customerPhone}
               </p>
             )}
          </div>
        </div>
      ) : (
        // Error State
        <div className="p-6 bg-red-50 border border-red-100 rounded-lg mb-8 text-red-600 text-sm">
          <p className="font-bold">Order details could not be loaded.</p>
          <p>Please check your email for the confirmation.</p>
          {errorMsg && <p className="mt-2 text-xs opacity-75">Error: {errorMsg}</p>}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop" className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition text-center">
          Continue Shopping
        </Link>
        <Link href="/track-your-order" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition text-center shadow-md">
          Track Your Order
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
      <Suspense fallback={<p className="mt-10">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}