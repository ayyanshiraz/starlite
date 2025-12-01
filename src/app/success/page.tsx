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
  
  // 🟢 CRITICAL FIX: This ref ensures we only run the logic ONCE
  const hasRan = useRef(false);

  useEffect(() => {
    if (!sessionId) return;
    if (hasRan.current) return; // Stop if already ran

    hasRan.current = true; // Mark as done immediately

    // 1. Clear the cart safely
    clearCart();

    // 2. Fetch order details
    fetch(`/api/orders/success?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setOrder(data);
        }
      })
      .catch(err => console.error("Failed to fetch order", err))
      .finally(() => setLoading(false));

  }, [sessionId]); // Removed 'clearCart' from dependencies to stop loop

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
      {loading ? (
        <div className="p-6 bg-gray-50 rounded-lg mb-8 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      ) : order ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm text-left">
          
          {/* Header: Order # and Total */}
          <div className="flex justify-between border-b pb-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Order Number</p>
              <p className="text-lg font-mono font-bold text-blue-600">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold">Total Amount</p>
              <p className="text-lg font-bold">${(order.amountTotal / 100).toFixed(2)}</p>
            </div>
          </div>
          
          {/* Items List (Fixed Overlap) */}
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold mb-2">Items Ordered</p>
            <ul className="divide-y divide-gray-100">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="flex justify-between items-start py-3 gap-4">
                  {/* Product Name & Qty */}
                  <div className="flex-1">
                     <p className="text-sm font-semibold text-gray-900 leading-snug">{item.name}</p>
                     <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  {/* Price (Fixed width so it doesn't wrap weirdly) */}
                  <div className="text-sm font-bold text-gray-900 whitespace-nowrap">
                     ${(item.price / 100).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Shipping Details + Phone */}
          <div className="mt-6 pt-4 border-t text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
             <p className="mb-1"><span className="font-bold">Shipping to:</span> {order.addressLine1}, {order.city}</p>
             <p className="mb-1">{order.country}, {order.postalCode}</p>
             {/* 🟢 Added Phone Number */}
             {order.customerPhone && (
               <p><span className="font-bold">Phone:</span> {order.customerPhone}</p>
             )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-red-50 border border-red-100 rounded-lg mb-6 text-red-600">
          Unable to load order details. Please check your email for confirmation.
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
      <Suspense fallback={<p>Processing...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}