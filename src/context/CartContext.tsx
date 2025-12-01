// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../lib/products'; // Check this path matches your file structure

// Define what a Cart Item looks like (Product + quantity)
export type CartItem = Product & {
  quantity: number;
};

// Define the functions available to the rest of the app
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Load Cart from LocalStorage on startup
  useEffect(() => {
    const storedCart = localStorage.getItem('starlight-cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);

  // 2. Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('starlight-cart', JSON.stringify(cart));
  }, [cart]);

  // --- Actions ---

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If item exists, just increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new item, add it with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Optional: Simple alert to confirm (You can replace this with a Toast later)
    alert(`${product.name} has been added to your cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart easily
export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}