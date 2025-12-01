"use client";

import { useState, useEffect } from 'react';

const COMPARE_KEY = 'compareList';
const MAX_COMPARE = 4; // We will limit comparison to 4 items

/**
 * Hook to manage a product compare list in localStorage.
 * @param productSlug The slug of the product.
 */
export const useCompare = (productSlug: string) => {
  const [isInCompare, setIsInCompare] = useState(false);

  // Check initial state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) {
      try {
        const list: string[] = JSON.parse(stored);
        setIsInCompare(list.includes(productSlug));
      } catch (e) {
        console.error("Failed to parse compare list", e);
      }
    }
  }, [productSlug]);

  /**
   * Toggles an item in the compare list.
   * If the list is full (4 items), it removes the oldest item to add the new one.
   */
  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop link navigation
    e.stopPropagation(); // Stop parent click events

    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(COMPARE_KEY);
    let list: string[] = stored ? JSON.parse(stored) : [];

    if (list.includes(productSlug)) {
      // --- Remove Item ---
      list = list.filter((s) => s !== productSlug);
      setIsInCompare(false);
    } else {
      // --- Add Item ---
      if (list.length >= MAX_COMPARE) {
        // List is full, remove the first (oldest) item
        list.shift(); 
      }
      list.push(productSlug);
      setIsInCompare(true);
    }

    localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
    
    // Dispatch events so other components (like Header) can update
    window.dispatchEvent(new Event('compare-updated'));
    window.dispatchEvent(new Event('storage')); // Fire storage event for the compare page
  };

  return { isInCompare, toggleCompare };
};

/**
 * Helper function to get the current compare list count.
 */
export const getCompareCount = () => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(COMPARE_KEY);
  if (stored) {
    try {
      const list = JSON.parse(stored);
      return list.length;
    } catch (e) {
      return 0;
    }
  }
  return 0;
};