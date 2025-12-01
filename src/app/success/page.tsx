"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HeaderSection } from '../../components/Header';
import { useCart } from '../../hooks/useCart';

// Icons
const CheckCircleIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear cart
    clearCart();

    if (sessionId) {
      fetch(`/api/order-details?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching order:", err);
          setLoading(false);
        });
    }
  }, [sessionId, clearCart]);

  if (!sessionId) return null;

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderSection />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
          </div>

          {loading ? (
            <div className="text-center py-8 text-blue-600 animate-pulse">
               Loading Receipt...
            </div>
          ) : orderData ? (
            <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-4">
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{orderData.orderId}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Customer:</span>
                <span className="font-bold text-gray-900">{orderData.name}</span>
              </div>

              {/* Items Section - Fixed Colors */}
              <div className="bg-gray-100 rounded-lg p-4 space-y-3 mt-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Items</p>
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    {/* Added text-gray-900 explicitly here 👇 */}
                    <span className="text-gray-900 font-medium">
                      {item.quantity}x {item.description}
                    </span>
                    <span className="font-bold text-gray-900">
                      ${(item.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Section - Fixed Colors */}
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-100 mt-4">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">${(orderData.amount_total / 100).toFixed(2)}</span>
              </div>

            </div>
          ) : (
             <div className="text-red-500 text-center py-4">Receipt could not be loaded.</div>
          )}

          <Link 
            href="/shop" 
            className="block w-full bg-[#00001E] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 text-center transition-colors"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    </main>
  );
}