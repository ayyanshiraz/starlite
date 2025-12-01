import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderSection } from '../../components/Header';
import { ChatButton, CustomScrollbarStyles } from '../../components/SharedComponents';
// 🟢 1. Import the DB Search Function instead of the static list
import { searchProducts } from '../../lib/products';

// 🟢 2. Force dynamic rendering so search results are always fresh
export const dynamic = 'force-dynamic';

// 🟢 3. Convert to Async Server Component
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // Next.js 15 params type
}) {
  // 4. Get the query from the URL
  const params = await searchParams;
  const query = params.q || '';

  // 5. Fetch results from Database
  const filteredProducts = query ? await searchProducts(query) : [];

  return (
    <main className="bg-white min-h-screen">
      <HeaderSection />
      
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results
          </h1>
          <p className="text-gray-600 mt-2">
            {query 
              ? `Found ${filteredProducts.length} results for "${query}"`
              : "Please enter a search term"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.slug}`}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
              >
                {/* Image Container */}
                <div className="h-64 bg-gray-50 p-4 relative flex items-center justify-center border-b border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain max-h-full w-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                    {product.category.split(',')[0]}
                  </div>
                  
                  <h2 className="text-gray-900 font-medium text-sm leading-snug mb-2 line-clamp-2 flex-grow">
                    {product.name}
                  </h2>
                  
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-bold text-blue-700">
                      {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Go back to Home
            </Link>
          </div>
        )}
      </div>

      <ChatButton />
      <CustomScrollbarStyles />
    </main>
  );
}