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
    <CookieConsent
      location="bottom"
      cookieName={cookieName}
      expires={expires}
      
      // --- MAIN BANNER CONTAINER ---
      style={{
        background: "#FFFFFF",
        color: "#000000",
        padding: "15px", 
        fontSize: "14px", 
        zIndex: 1000,
        boxSizing: "border-box",
        lineHeight: "1.5",
        borderTop: "1px solid #E0E0E0",
        width: "100%",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
      }}
      
      // --- INNER CONTENT WRAPPER ---
      contentStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // 'wrap' allows it to stack on mobile, but stay in row on desktop
        flexWrap: "wrap", 
        gap: "15px",
        margin: "0 auto",
        padding: 0,
        width: "100%",
        maxWidth: "1200px", 
      }}
      
      // Hide default library buttons
      buttonText=""
      buttonStyle={{ display: 'none' }}
      declineButtonStyle={{ display: 'none' }}
      enableDeclineButton={false}
    >
      {/* --- Left Block (Text) --- */}
      {/* FIX: Changed flex-basis from 100% to 300px. 
          Desktop: Text (300px) + Buttons fit on one line -> Row layout.
          Mobile: Text (300px) + Buttons don't fit -> Wrap layout. 
      */}
      <div style={{ flex: "1 1 300px", minWidth: "200px" }}>
        <p style={{ margin: 0 }}>
          We use cookies to enhance your browsing experience and analyze our traffic. Read our{' '}
          <Link href="/privacy-policy" style={{ color: "#00001E", textDecoration: 'underline', fontWeight: 'bold' }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* --- Right Block (Buttons) --- */}
      <div style={{
        display: 'flex',
        gap: '10px', 
        flexShrink: 0,
        alignItems: 'center',
        flexWrap: 'wrap',
        // Allow buttons to be auto-width
        flex: "0 1 auto", 
      }}>
        {/* --- Accept All Button --- */}
        <button
          onClick={handleAccept}
          style={{
            background: "#00001E",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "10px 16px",
            cursor: "pointer",
            border: "none",
            whiteSpace: 'nowrap',
            flexGrow: 1, 
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
            fontSize: "13px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "10px 16px",
            cursor: "pointer",
            border: "none",
            whiteSpace: 'nowrap',
            flexGrow: 1,
          }}
        >
          Necessary Cookies Only
        </button>

        {/* --- Close Button --- */}
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          style={{
            background: "transparent",
            border: "none",
            color: "#000000",
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "0 8px",
            lineHeight: "1",
            marginLeft: "5px",
            display: "flex",
            alignItems: "center"
          }}
        >
          &times;
        </button>
        
      </div>
    </CookieConsent>
  );
}