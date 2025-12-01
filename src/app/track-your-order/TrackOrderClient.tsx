"use client";

import React, { useState } from 'react';
import { HeaderSection } from '@/components/Header';
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents';
import Link from 'next/link';

// --- ICONS ---
const SearchIcon = ({ className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const BoxIcon = ({ className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);

// --- HELPER: BUSINESS DAY CALCULATOR ---
function addBusinessDays(startDate: Date, days: number) {
  let count = 0;
  const curDate = new Date(startDate);
  while (count < days) {
    curDate.setDate(curDate.getDate() + 1);
    const dayOfWeek = curDate.getDay(); // 0 = Sun, 6 = Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++; // Only count Mon-Fri
    }
  }
  return curDate;
}

function getRemainingBusinessDays(targetDate: Date) {
  const today = new Date();
  let count = 0;
  const curDate = new Date(today);
  
  // Reset times for accurate day calc
  curDate.setHours(0,0,0,0);
  const end = new Date(targetDate);
  end.setHours(0,0,0,0);

  if (curDate >= end) return 0;

  while (curDate < end) {
    curDate.setDate(curDate.getDate() + 1);
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
  }
  return count;
}

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch order');
      }
      setOrderData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER STATUS COMPONENT ---
  const renderStatus = () => {
    if (!orderData) return null;

    const status = orderData.status.toLowerCase();
    const orderDate = new Date(orderData.createdAt);
    
    // Calculate Delivery Window (5-7 Business Days)
    const minDeliveryDate = addBusinessDays(orderDate, 5);
    const maxDeliveryDate = addBusinessDays(orderDate, 7);
    
    const remainingDays = getRemainingBusinessDays(maxDeliveryDate);

    // Formatter
    const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // 1. PENDING / PROCESSING
    if (status === 'pending' || status === 'processing') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2">
             Processing Order
          </h3>
          <p className="text-gray-700 mb-4">
            Your order was placed on <strong>{formatDate(orderDate)}</strong>.
          </p>
          
          <div className="bg-white p-4 rounded-lg border border-yellow-100 shadow-sm">
            <p className="text-sm text-gray-500 uppercase font-bold tracking-wide mb-1">Estimated Delivery</p>
            <p className="text-lg font-medium text-gray-900">
              {formatDate(minDeliveryDate)} — {formatDate(maxDeliveryDate)}
            </p>
            <p className="text-sm text-blue-600 mt-2 font-medium">
              {remainingDays > 0 
                ? `Expected to arrive in next ${remainingDays} working days.` 
                : "Arriving very soon!"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              (Standard delivery is 5-7 business days)
            </p>
          </div>
        </div>
      );
    }

    // 2. DELIVERED
    if (status === 'delivered') {
      return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-green-800 mb-2">Order Delivered!</h3>
          <p className="text-gray-700">
            Your package has been delivered to the address below:
          </p>
          <div className="mt-4 bg-white p-4 rounded-lg border border-green-100">
             <p className="font-bold text-gray-900">{orderData.addressLine1}</p>
             <p className="text-gray-700">{orderData.city}, {orderData.postalCode}</p>
             <p className="text-gray-700">{orderData.country}</p>
          </div>
        </div>
      );
    }

    // 3. CANCELLED
    if (status === 'cancelled') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-red-800 mb-2">Order Cancelled</h3>
          <p className="text-gray-700">
            This order has been cancelled. If you did not request this, please contact support.
          </p>
        </div>
      );
    }

    // 4. REFUNDED
    if (status === 'refunded') {
      return (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-purple-800 mb-2">Payment Refunded</h3>
          <p className="text-gray-700">
            A refund of <strong>${(orderData.amountTotal / 100).toFixed(2)}</strong> has been processed to your original payment method.
          </p>
        </div>
      );
    }

    return <p>Status: {status}</p>;
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Track Your Order</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
              <input 
                type="text" 
                required
                placeholder="e.g. cmifygdxb..."
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Found in your confirmation email.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Searching...' : <><SearchIcon className="w-5 h-5" /> Track Order</>}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
              {error}
            </div>
          )}

          {/* STATUS DISPLAY */}
          {renderStatus()}

        </div>
        
        <div className="text-center mt-8">
           <Link href="/shop" className="text-blue-600 hover:underline font-medium">
             Continue Shopping
           </Link>
        </div>

      </div>
      
      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}