"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { ArrowRight } from 'lucide-react';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
import { categoriesData } from '../../lib/data';

// --- CATEGORIES PAGE COMPONENT ---
export default function CategoriesPage() {
  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

     <div className="container mx-auto px-8 lg:px-32 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">

          {categoriesData.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              // --- 1. CHANGED: Card background and border ---
              className="group flex flex-col rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white border border-gray-200 hover:border-blue-500 transform hover:-translate-y-1"
              aria-label={`View all ${category.name}`}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-t-lg"> 
                <Image
                  src={category.imageUrl} 
                  alt={category.imgAltText || category.name}
                  layout="fill" 
                  objectFit="cover" 
                  className="group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                />
              </div>
              
              <div className="p-3 flex flex-col flex-grow">
                
                {/* --- 2. CHANGED: Title text color --- */}
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {category.name}
                </h3>

                {/* --- 3. CHANGED: Description text color --- */}
                <p className="text-sm text-gray-600 leading-normal mb-2 flex-grow">
                  {category.description} 
                </p>

                {/* --- 4. CHANGED: Link text color --- */}
                <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors duration-200 mt-auto">
                  <span className="text-xs font-medium">View Products</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}