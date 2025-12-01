// src/components/CategoryIcons.tsx
import React from 'react';

// Base props for all Lucide-style icons
const iconProps = {
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

// --- Icons for Categories ---
export const CategoryLaptopIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.98-1.45L4 16Z"/>
  </svg>
);
export const CategoryAccessoriesIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
    <path d="M12 12v4h4"/>
    <path d="m15 15-1-1"/>
    <path d="M16 16v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/>
  </svg>
);
export const CategorySwitchesIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <rect width="18" height="12" x="3" y="6" rx="2"/>
    <line x1="3" x2="21" y1="12" y2="12"/>
    <line x1="16" x2="16" y1="16" y2="16"/>
    <line x1="8" x2="8" y1="16" y2="16"/>
  </svg>
);
export const CategoryPrinterIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M6 9V2h12v7"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <path d="M6 14h12v8H6z"/>
  </svg>
);
export const CategoryWorkstationIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
  </svg>
);
export const CategoryRouterIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <rect width="20" height="8" x="2" y="14" rx="2"/>
    <path d="M6.01 18H6"/>
    <path d="M10.01 18H10"/>
    <path d="M15 10v.01"/>
    <path d="M18 10v.01"/>
    <path d="M12 10v.01"/>
    <path d="M2.49 10.5A2.5 2.5 0 0 1 4 8h16a2.5 2.5 0 0 1 1.51 4.5"/>
  </svg>
);
export const CategoryUpsIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M7 7h10"/>
    <path d="M7 11h10"/>
    <path d="M7 15h10"/>
    <path d="M11 7v8"/>
  </svg>
);
export const CategoryBrandsIcon = ({ className = "" }) => (
  <svg {...iconProps} className={className}>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.414 2.414 0 0 0 3.414 0l7.172-7.172a2.414 2.414 0 0 0 0-3.414l-8.704-8.704Z"/>
    <circle cx="8" cy="8" r="1"/>
  </svg>
);