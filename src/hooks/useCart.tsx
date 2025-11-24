"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of a Cart Item (extends your basic Product structure)
export interface CartItem {
  id: string;
  slug: string;
  name: string; // matches 'name' or 'title' from your product data
  price: number;
  image: string;
  quantity: number;
  brand?: string;
  category?: string;
}

// Define the Context State
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number; // Total number of items (sum of quantities)
  cartTotal: number; // Total price
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load Cart from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('shopping-cart');
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Failed to parse cart data:", error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // 2. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // --- Actions ---

  const addToCart = useCallback((product: any) => {
    setCartItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.slug === product.slug);

      if (existingItem) {
        // If exists, increment quantity
        return prevItems.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add to array with quantity 1
        // Normalize data structure just in case product uses 'title' instead of 'name'
        const newItem: CartItem = {
          id: product.id || product.slug,
          slug: product.slug,
          name: product.name || product.title, 
          price: typeof product.price === 'number' ? product.price : 0,
          image: product.image,
          quantity: 1,
          brand: product.brand,
          category: product.category,
        };
        return [...prevItems, newItem];
      }
    });
    
    // --- VISUAL FEEDBACK ENABLED HERE ---
    alert(`${product.name || product.title} added to cart!`); 
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.slug !== slug);
      }
      return prevItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // --- Derived State ---
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// --- Hook Export ---
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}