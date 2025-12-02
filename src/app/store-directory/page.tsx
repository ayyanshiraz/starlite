import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { HeaderSection } from '@/components/Header';
import { ChatButton, CustomScrollbarStyles } from '@/components/SharedComponents';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Store Directory',
  description: 'Browse the Starlight Linkers LLC store directory. Find all our IT product categories and brands like HP, Dell, Cisco, Lenovo, and more.',
};

export default async function StoreDirectoryPage() {
  // 1. Fetch all unique categories from the database
  const products = await prisma.product.findMany({
    select: { category: true },
    where: { category: { not: null } },
    distinct: ['category']
  });

  // 2. Build the A-Z Directory Map
  // We use a Set to avoid duplicates if "Dell" appears as "Dell" and "Dell, Laptops"
  const directory: Record<string, Set<string>> = {};
  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Initialize map with empty sets
  alphabet.forEach(char => directory[char] = new Set());

  products.forEach(p => {
    if (!p.category) return;
    
    // Split categories (e.g., "Laptops, Dell" -> ["Laptops", "Dell"])
    // This ensures the product appears under BOTH "L" and "D"
    const tags = p.category.split(',').map(t => t.trim());
    
    tags.forEach(tag => {
      const firstChar = tag.charAt(0).toUpperCase();
      
      if (/[A-Z]/.test(firstChar)) {
        directory[firstChar].add(tag);
      } else {
        // Numbers or symbols go to #
        directory['#'].add(tag);
      }
    });
  });

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />
      
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Directory</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            An A-Z index of all brands and product categories available in our store. 
            Click on a name to view all related products.
          </p>
        </div>
        
        {/* --- Alphabet Navigation Bar --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 bg-gray-50 p-4 rounded-xl border border-gray-200 sticky top-24 z-10 shadow-sm">
          {alphabet.map(letter => {
            const hasItems = directory[letter].size > 0;
            return (
              <a 
                key={letter} 
                href={hasItems ? `#section-${letter}` : undefined}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm transition-all
                  ${hasItems 
                    ? 'text-blue-600 bg-white border border-blue-100 hover:bg-blue-600 hover:text-white shadow-sm cursor-pointer' 
                    : 'text-gray-300 cursor-default'}`}
              >
                {letter}
              </a>
            );
          })}
        </div>

        {/* --- Directory Grid --- */}
        <div className="space-y-12 max-w-5xl mx-auto pb-20">
          {alphabet.map(letter => {
            // Convert Set to Array and Sort Alphabetically
            const items = Array.from(directory[letter]).sort();
            
            if (items.length === 0) return null;

            return (
              <div key={letter} id={`section-${letter}`} className="scroll-mt-40">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#00001E] text-white text-2xl font-bold rounded-xl shadow-md">
                    {letter}
                  </span>
                  <div className="h-px bg-gray-200 flex-grow"></div>
                </div>
                
                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(item => {
                    // Generate URL Slug
                    const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <Link 
                        key={item} 
                        href={`/category/${slug}`}
                        className="group flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg text-gray-700 hover:text-blue-600 hover:shadow-md transition-all text-sm font-medium"
                      >
                        <span>{item}</span>
                        {/* Tiny arrow on hover */}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}