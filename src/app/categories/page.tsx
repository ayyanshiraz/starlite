import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { HeaderSection } from '@/components/Header';
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents';
// We import your existing data to re-use the nice images/descriptions you already set up
import { categoriesData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  // 1. Fetch all unique categories from the DB
  const products = await prisma.product.findMany({
    select: { category: true },
    where: { category: { not: null } }
  });

  // 2. Process tags (split by comma, trim whitespace, remove duplicates)
  const dbTags = new Set<string>();
  products.forEach(p => {
    if (p.category) {
      p.category.split(',').forEach(tag => dbTags.add(tag.trim()));
    }
  });

  // 3. Merge DB tags with Static Data (to get images)
  const displayCategories = Array.from(dbTags).map(tag => {
    // Try to find a match in your static data (case-insensitive)
    const staticInfo = categoriesData.find(c => 
      c.name.toLowerCase() === tag.toLowerCase() || 
      c.slug === tag.toLowerCase().replace(/\s+/g, '-')
    );

    return {
      name: tag,
      // Use existing slug or generate one
      slug: staticInfo?.slug || tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      
      // 🟢 UPDATED: Use Logo GIF as fallback if no specific image found
      imageUrl: staticInfo?.imageUrl || '/logogif.gif', 
      
      // Use existing description or generic one
      description: staticInfo?.description || `Explore our extensive collection of ${tag}.`,
      isStatic: !!staticInfo
    };
  }).sort((a, b) => {
    // Optional: Put "Static" (Pretty) categories first, then the rest alphabetically
    if (a.isStatic && !b.isStatic) return -1;
    if (!a.isStatic && b.isStatic) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />

      <div className="container mx-auto px-8 lg:px-32 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Categories</h1>
        <p className="text-gray-600 mb-10">
          Browse our catalog by category. We have {displayCategories.length} active categories in stock.
        </p>

        {displayCategories.length === 0 ? (
           <div className="py-20 text-center border border-dashed border-gray-200 rounded-xl">
             <p className="text-gray-500">No categories found in the database.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
            {displayCategories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="group flex flex-col rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white border border-gray-200 hover:border-blue-500 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full aspect-square bg-gray-50 border-b border-gray-100"> 
                  <Image
                    src={category.imageUrl} 
                    alt={category.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                  />
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-normal mb-4 line-clamp-2">
                    {category.description} 
                  </p>

                  <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors duration-200 mt-auto font-medium text-sm">
                    View Products
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}