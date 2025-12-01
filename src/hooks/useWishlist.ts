"use client";

import { useState, useEffect } from 'react';

export const useWishlist = (productSlug: string) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check initial state from localStorage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        try {
          const list = JSON.parse(stored);
          setIsInWishlist(list.includes(productSlug));
        } catch (e) {
          console.error('Error parsing wishlist', e);
        }
      }
    }
  }, [productSlug]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent clicking the parent Link
    e.stopPropagation(); // Stop event bubbling

    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('wishlist');
    let list: string[] = stored ? JSON.parse(stored) : [];

    if (list.includes(productSlug)) {
      // Remove
      list = list.filter((s) => s !== productSlug);
      setIsInWishlist(false);
    } else {
      // Add
      list.push(productSlug);
      setIsInWishlist(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(list));
    
    // Optional: Dispatch event if you want to update a header counter instantly
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  return { isInWishlist, toggleWishlist };
};