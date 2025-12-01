"use client";
import React from 'react';

// Base props for all Lucide-style icons
export const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Icon for breadcrumb separator
export const ChevronRightIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);
// ... (keep all your existing icons like iconProps and ChevronRightIcon)

// --- ADD THIS NEW ICON ---
export const TruckIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M10 17h4V5H2v12h3" />
    <path d="M10 5l4 4h7v8h-3" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M14 9h7" />
  </svg>
);