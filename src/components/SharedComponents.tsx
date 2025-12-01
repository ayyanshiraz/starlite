// src/app/components/SharedComponents.tsx
"use client";

import React from 'react';

// --- CHAT BUTTON ---
export function ChatButton() {
  return (
    <button className="fixed bottom-4 right-4 bg-black text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-gray-800 z-50">
      Click to open chat!
    </button>
  );
}

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