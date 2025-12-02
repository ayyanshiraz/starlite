"use client";

import { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {
    // Tawk.to Script Logic
    // @ts-ignore
    var Tawk_API = window.Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      // 🟢 YOUR SPECIFIC ID IS HERE
      s1.src = 'https://embed.tawk.to/692e9b61c48afb197ea14cf6/1jbf0tu26';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1,s0);
      }
    })();
  }, []);

  // This component renders nothing visually; it just injects the chat widget
  return null;
}