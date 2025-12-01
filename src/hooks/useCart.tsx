"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of a Cart Item
export interface CartItem {
  id: string;
  slug: string;
  name: string;
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
  cartCount: number;
  cartTotal: number;
  
  // NEW: Popup State
  isPopupOpen: boolean;
  lastAddedItem: CartItem | null;
  closePopup: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // NEW: State for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // 1. Load Cart from LocalStorage
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

  // 2. Save Cart to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // --- Actions ---

  const addToCart = useCallback((product: any) => {
    let addedItem: CartItem;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.slug === product.slug);

      // Prepare the item data for the popup
      addedItem = {
        id: product.id || product.slug,
        slug: product.slug,
        name: product.name || product.title,
        price: typeof product.price === 'number' ? product.price : 0,
        image: product.image,
        quantity: 1, // This is just for display in popup
        brand: product.brand,
      };

      if (existingItem) {
        return prevItems.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...addedItem, quantity: 1 }];
      }
    });

    // TRIGGER THE POPUP INSTEAD OF ALERT
    // We use setTimeout to ensure state updates if adding multiple quickly, 
    // but primarily to grab the correct item data.
    const itemForPopup = {
        id: product.id || product.slug,
        slug: product.slug,
        name: product.name || product.title,
        price: typeof product.price === 'number' ? product.price : 0,
        image: product.image,
        quantity: 1,
        brand: product.brand,
    };
    
    setLastAddedItem(itemForPopup);
    setIsPopupOpen(true);
    
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

  // NEW: Close Popup Action
  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
        // Export popup values
        isPopupOpen,
        lastAddedItem,
        closePopup
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}