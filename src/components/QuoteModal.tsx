"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any; // The product being quoted
}

export default function QuoteModal({ isOpen, onClose, product }: QuoteModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product: {
            name: product.name,
            image: product.image,
            category: product.category,
            sku: product.sku
          }
        }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
            onClose();
            setStatus('idle');
            setFormData({ name: '', email: '', phone: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
          >
            {/* Header */}
            <div className="bg-[#00001E] p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Request a Quote</h3>
                <p className="text-blue-200 text-sm mt-1">We will respond within 24 hours.</p>
              </div>
              <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
            </div>

            {/* Product Summary */}
            <div className="p-6 bg-gray-50 border-b flex gap-4 items-center">
                <div className="w-16 h-16 bg-white rounded border p-1 flex-shrink-0 relative">
                    <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-contain" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
            </div>

            {/* Form */}
            <div className="p-6">
                {status === 'success' ? (
                    <div className="text-center py-8 text-green-600">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl font-bold">Request Sent!</h3>
                        <p className="text-sm text-gray-500 mt-2">We have received your request and will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                            <input required type="text" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                            <input required type="email" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                            <input required type="tel" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                        </div>

                        {status === 'error' && <p className="text-red-500 text-xs text-center">Failed to send. Please try again.</p>}

                        <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
                            {status === 'loading' ? 'Sending...' : 'Submit Request'}
                        </button>
                    </form>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}