"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from './Icons'; // Import from our new icon file

// Define the shape of a single breadcrumb link
export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string; // The text for the current, non-linked page
}

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        
        {/* Render all the "items" as links */}
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-black mx-1" />
            )}
            <Link 
              href={item.href} 
              className="text-sm font-medium text-black hover:text-blue-600"
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* Render the current page as plain text */}
        <li className="inline-flex items-center">
          <ChevronRightIcon className="w-4 h-4 text-gray-700 mx-1" />
          <span 
            aria-current="page"
            className="text-sm font-medium text-black"
          >
            {currentPage}
          </span>
        </li>

      </ol>
    </nav>
  );
}