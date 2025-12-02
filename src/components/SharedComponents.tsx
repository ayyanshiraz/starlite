"use client";

import React from 'react';

// 🟢 FIX: We make this return NULL so the old button disappears everywhere
export const ChatButton = () => {
  return null; 
};

// --- Custom Scrollbar Styles ---
export const CustomScrollbarStyles = () => (
  <style jsx global>{`
    /* Target elements with the custom-scrollbar class */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a1a1a1;
    }
    
    .whitespace-pre-line {
      white-space: pre-line;
    }

    /* --- NEW ANIMATIONS --- */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-in-out forwards;
    }
  `}</style>
);