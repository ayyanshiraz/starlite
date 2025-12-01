"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';

// --- ICONS ---
const TrashIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const MinusIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const PlusIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const ArrowLeftIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const FileTextIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  // Logic: If total is 0, it's a Quote Request
  const isQuoteOrder = cartTotal === 0;

  if (cartItems.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link 
            href="/shop" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Shopping
          </Link>
        </div>
        <ChatButton />
        <CustomScrollbarStyles />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/shop" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isQuoteOrder ? 'Quote Request' : 'Shopping Cart'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT: CART ITEMS --- */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  /* FIX: Changed key from item.id to item.slug to ensure uniqueness */
                  <div key={item.slug} className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center">
                    
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg border border-gray-100 p-2 overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={80} 
                          height={80} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          <Link href={`/product/${item.slug}`} className="hover:text-blue-600 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        {item.brand && <p className="text-sm text-gray-500 mt-1">{item.brand}</p>}
                        <button 
                          onClick={() => removeFromCart(item.slug)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 mt-2 font-medium transition-colors"
                        >
                          <TrashIcon className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 flex sm:justify-center items-center mt-2 sm:mt-0">
                      <span className="sm:hidden text-gray-500 text-sm mr-2">Price: </span>
                      <span className="text-gray-900 font-medium">
                        {item.price > 0 ? `$${item.price.toFixed(2)}` : 'Quote'}
                      </span>
                    </div>

                    <div className="col-span-2 flex justify-center items-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-r-lg"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 flex sm:justify-end items-center mt-2 sm:mt-0">
                      <span className="sm:hidden text-gray-500 text-sm mr-2">Total: </span>
                      <span className="text-gray-900 font-bold">
                        {item.price > 0 ? `$${(item.price * item.quantity).toFixed(2)}` : '-'}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800 underline decoration-red-300 hover:decoration-red-800 underline-offset-2 transition-all"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* --- RIGHT: ORDER/QUOTE SUMMARY --- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                {isQuoteOrder ? 'Quote Summary' : 'Order Summary'}
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {isQuoteOrder ? 'To be quoted' : `$${cartTotal.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    {isQuoteOrder ? 'To be calculated' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">
                      {isQuoteOrder ? '-' : '$0.00'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {isQuoteOrder ? 'Quote Request' : `$${cartTotal.toFixed(2)}`}
                  </span>
                </div>
                {!isQuoteOrder && <p className="text-xs text-gray-400 mt-1 text-right">Includes VAT where applicable</p>}
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-[#00001E] text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2 group"
              >
                {isQuoteOrder ? (
                  <>
                    <FileTextIcon className="w-5 h-5" />
                    Request Quote
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <span className="text-xs">Secure {isQuoteOrder ? 'Submission' : 'Checkout'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}