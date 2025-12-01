'use client';

import React, { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const cookieName = 'starliteLinkerCookieConsent';
  const expires = 150;

  useEffect(() => {
    const consentValue = Cookies.get(cookieName);
    if (consentValue === undefined) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(cookieName, 'true', { expires });
    setIsVisible(false);
    console.log("Cookie consent accepted.");
  };

  const handleDecline = () => {
    Cookies.set(cookieName, 'false', { expires });
    setIsVisible(false);
    console.log("Cookie consent declined (or banner closed).");
  };

  if (!isVisible) {
    return null;
  }

  return (
    // @ts-ignore - This fixes a known type definition issue in the library
    <CookieConsent
      location="bottom"
      cookieName={cookieName}
      expires={expires}
      
      // --- Style for the MAIN BANNER (outer container) ---
      style={{
        background: "#FFFFFF",
        color: "#000000",
        paddingTop: "18px",
        paddingBottom: "18px",
        paddingLeft: "25px",
        paddingRight: "25px",
        fontSize: "15px",
        zIndex: 1000,
        boxSizing: "border-box",
        minHeight: "auto", 
        lineHeight: "1.4",
        borderTop: "1px solid #E0E0E0",
        width: "100%",
      }}
      
      // --- Style for the CONTENT (inner container) ---
      contentStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        margin: 0,
        padding: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
      
      // Hide library's buttons
      buttonText=""
      buttonStyle={{ display: 'none' }}
      declineButtonStyle={{ display: 'none' }}
      enableDeclineButton={false}
    >
      {/* --- Left Block (Text Only) --- */}
      {/* CHANGED: Replaced minWidth with a flexible 'flex' property */}
      <div style={{ flex: '1 1 300px' }}>
        <p style={{ margin: 0 }}>
          We use cookies to enhance your browsing experience and analyze our traffic. Read our{' '}
          <Link href="/privacy-policy" style={{ color: "#00001E", textDecoration: 'underline', fontWeight: 'bold' }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* --- Right Block (All Buttons) --- */}
      {/* CHANGED: Added flex: '1 1 auto' and justifyContent, kept 'nowrap' */}
      <div style={{
        display: 'flex',
        gap: '12px', 
        alignItems: 'center',
        flexWrap: 'nowrap', // Keeps all buttons in one line
        flex: '1 1 auto', // Ensures it grows/shrinks and takes full width when wrapped
        justifyContent: 'flex-end', // Aligns buttons to the right on desktop
      }}>
        {/* --- Accept All Button --- */}
        <button
          onClick={handleAccept}
          style={{
            background: "#00001E",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 14px",
            cursor: "pointer",
            border: "none",
            flexShrink: 1, // Allows button to shrink on mobile
          }}
        >
          Accept All Cookies
        </button>

        {/* --- Necessary Only Button --- */}
        <button
          onClick={handleDecline}
          style={{
            background: "#00001E",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 14px",
            cursor: "pointer",
            border: "none",
            flexShrink: 1, // Allows button to shrink on mobile
          }}
        >
          Necessary Cookies Only
        </button>

        {/* --- Close Button (Cross Sign) --- */}
        <div style={{ flexShrink: 0 }}>
          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            style={{
              background: "transparent",
              border: "none",
              color: "#000000",
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: "bold",
              padding: "0 5px",
              lineHeight: "1",
            }}
          >
            &times;
          </button>
        </div>
        
      </div>
    </CookieConsent>
  );
}