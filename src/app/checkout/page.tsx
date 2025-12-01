"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Added useRouter
import { HeaderSection } from '../../components/Header';
import { useCart } from '../../hooks/useCart';
import { CustomScrollbarStyles } from '../../components/SharedComponents';
import { countries } from '../../lib/countries';

// --- ICONS ---
const LockIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const FileTextIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const ChevronDown = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const SearchIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Initialize router
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Logic: Determine if this is a Quote Request
  const isQuoteOrder = cartTotal === 0;

  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // --- DROPDOWN STATE ---
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState(""); 
  const countryRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', 
    country: 'United Kingdom', 
    countryCode: 'GB' 
  });

  useEffect(() => {
    setIsClient(true);
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (name: string, code: string) => {
    setFormData({ ...formData, country: name, countryCode: code });
    setIsCountryOpen(false);
    setCountrySearch(""); // Reset search
  };

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true); // Disable button while working

    // 1. Handle Quote Request (No Payment)
    if (isQuoteOrder) {
      const type = 'quote';
      clearCart();
      router.push(`/order-confirmation?type=${type}&email=${encodeURIComponent(formData.email)}`);
      return;
    }

    // 2. Handle Payment (Stripe)
    try {
      // We send the 'slug' as the 'id' because that matches the keys in sku-data.ts
      const cartPayload = cartItems.map(item => ({
        id: item.slug, 
        quantity: item.quantity
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cartPayload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }

      // Redirect to the Stripe hosted page
      if (data.url) {
        window.location.href = data.url;
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong with the payment gateway. Please try again.");
      setIsProcessing(false); // Re-enable button if error
    }
  };

  if (!isClient) return null;

  if (cartItems.length === 0) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <HeaderSection />
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-blue-600 hover:underline font-medium">
            Return to Shop to add items
          </Link>
        </div>
      </main>
    );
  }

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <main className="bg-gray-50 min-h-screen">
      <HeaderSection />
      
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
          <Link href="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{isQuoteOrder ? 'Request Quote' : 'Checkout'}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isQuoteOrder ? 'Request a Quote' : 'Checkout'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 pb-20">
          
          {/* --- LEFT: FORM --- */}
          <div className="w-full lg:w-2/3 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Contact Info (Z-Index 40) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 relative z-40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required name="email" type="email" onChange={handleInputChange} className={inputClasses} placeholder="you@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required name="phone" type="tel" onChange={handleInputChange} className={inputClasses} placeholder="+44 7700 900000" />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address (Z-Index 30 & Overflow Visible) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 relative z-30 overflow-visible">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">2</span>
                  {isQuoteOrder ? 'Shipping / Company Details' : 'Shipping Address'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required name="firstName" type="text" onChange={handleInputChange} className={inputClasses} placeholder="e.g. John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required name="lastName" type="text" onChange={handleInputChange} className={inputClasses} placeholder="e.g. Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input required name="address" type="text" onChange={handleInputChange} className={inputClasses} placeholder="Street address, apartment, suite, unit, etc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input required name="city" type="text" onChange={handleInputChange} className={inputClasses} placeholder="e.g. London" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                    <input required name="zip" type="text" onChange={handleInputChange} className={inputClasses} placeholder="e.g. SW1A 1AA" />
                  </div>
                  
                  {/* --- SEARCHABLE COUNTRY DROPDOWN --- */}
                  <div className="md:col-span-2 relative" ref={countryRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    
                    <div 
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://flagcdn.com/w40/${formData.countryCode.toLowerCase()}.png`} 
                          alt={formData.countryCode}
                          className="w-6 h-auto shadow-sm object-cover rounded-sm"
                        />
                        <span className="text-gray-900 font-medium">{formData.country}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isCountryOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-72 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                        
                        {/* Search Bar inside dropdown */}
                        <div className="p-2 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                          <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type="text"
                              autoFocus
                              placeholder="Search country..."
                              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Scrollable List */}
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div 
                                key={country.code}
                                onClick={() => handleCountrySelect(country.name, country.code)}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                                  formData.countryCode === country.code 
                                    ? 'bg-blue-100 text-blue-900' 
                                    : 'hover:bg-blue-50 text-gray-900'
                                }`}
                              >
                                <img 
                                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                  alt={country.name}
                                  className="w-6 h-auto shadow-sm rounded-sm"
                                  loading="lazy"
                                />
                                <span className="text-sm font-medium">{country.name}</span>
                                {formData.countryCode === country.code && (
                                  <span className="ml-auto text-blue-600 font-bold text-xs">Selected</span>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-sm text-gray-500">No countries found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* --- END DROPDOWN --- */}

                </div>
              </div>

              {/* 3. Payment Method (Z-Index 10) */}
              {!isQuoteOrder && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 relative z-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">3</span>
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-all border ${
                        paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                      </div>
                      <span className="font-medium text-gray-900">Credit Card (Stripe/PayPal Mock)</span>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('bank')}
                      className={`rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-all border ${
                        paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'bank' ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                      </div>
                      <span className="font-medium text-gray-900">Bank Transfer</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* --- RIGHT: ORDER/QUOTE SUMMARY --- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24 z-20">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isQuoteOrder ? 'Quote Summary' : 'Order Summary'}
              </h2>
              
              <div className="max-h-80 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.slug} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-md border border-gray-100 flex-shrink-0 p-1 relative">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-contain"
                        />
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                          {item.quantity}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{item.name}</p>
                      {item.brand && <p className="text-xs text-gray-500 mt-1">{item.brand}</p>}
                    </div>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      {item.price ? `$${(item.price * item.quantity).toFixed(2)}` : 'Quote'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {isQuoteOrder ? 'To be quoted' : `$${cartTotal.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    {isQuoteOrder ? 'To be calculated' : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (VAT)</span>
                  <span className="font-medium text-gray-900">
                    {isQuoteOrder ? '-' : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">
                    {isQuoteOrder ? 'Total' : 'Total'}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {isQuoteOrder ? 'Quote Request' : `$${cartTotal.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing} // Disable when loading
                className={`w-full text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 
                  ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00001E] hover:bg-blue-900'}`}
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : isQuoteOrder ? (
                  <>
                    <FileTextIcon className="w-5 h-5" />
                    Submit Quote Request
                  </>
                ) : (
                  <>
                    <LockIcon className="w-4 h-4" />
                    Pay ${cartTotal.toFixed(2)}
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                <LockIcon className="w-3 h-3" /> Secure {isQuoteOrder ? 'Submission' : 'Encrypted Checkout'}
              </p>
            </div>
          </div>

        </div>
      </div>
      <CustomScrollbarStyles />
    </main>
  );
}