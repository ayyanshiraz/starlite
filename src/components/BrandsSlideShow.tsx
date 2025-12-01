'use client';

import React from 'react';
// --- FIX: Removed 'next/image' import as it was causing a build error ---
// import Image from 'next/image';

// --- SEO Friendly Brands Data ---
// I've set this up for 13 brands.
// Just update the src path and alt text for each of your 13 brands.
const brands = [
  { src: '/brands/acer.png', alt: 'SEO Friendly Brand Logo 1' },
  { src: '/brands/apc.png', alt: 'SEO Friendly Brand Logo 2' },
  { src: '/brands/Asus.png', alt: 'SEO Friendly Brand Logo 3' },
  { src: '/brands/Brother.png', alt: 'SEO Friendly Brand Logo 4' },
  { src: '/brands/Canon.png', alt: 'SEO Friendly Brand Logo 5' },
  { src: '/brands/Cisco.png', alt: 'SEO Friendly Brand Logo 6' },
  { src: '/brands/Dell.png', alt: 'SEO Friendly Brand Logo 7' },
  { src: '/brands/Epson.png', alt: 'SEO Friendly Brand Logo 8' },
  { src: '/brands/Fortinet.png', alt: 'SEO Friendly Brand Logo 9' },
  { src: '/brands/HP.png', alt: 'SEO Friendly Brand Logo 10' },
  { src: '/brands/Lenovo.png', alt: 'SEO Friendly Brand Logo 11' },
  { src: '/brands/Microsoft.png', alt: 'SEO Friendly Brand Logo 12' },
  { src: '/brands/ubiquiti.png', alt: 'SEO Friendly Brand Logo 13' },
];

export const BrandsSlideShow = () => {
  return (
    <section className="bg-white py-10 md:py-16 text-black overflow-hidden border-t border-gray-200">
      
      {/* This <style jsx> block contains the animation logic. */}
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        /* On mobile, we can speed it up slightly or keep it the same. 
           Since the track is shorter due to smaller items, 40s might feel slower, which is good. */
      `}</style>

      <div className="container mx-auto text-center">
        {/* Title responsive text size */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Our Trusted Brands</h2>
        
        {/* Container height responsive: h-20 on mobile, h-28 on desktop */}
        <div className="relative w-full h-20 md:h-28 overflow-hidden">
          <div className="absolute top-0 left-0 flex items-center animate-scroll h-full">
            
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={index} 
                // RESPONSIVE FIX: 
                // Mobile: w-32 (128px) and mx-4 (16px margin)
                // Desktop: w-48 (192px) and mx-8 (32px margin)
                className="flex-shrink-0 w-32 mx-4 md:w-48 md:mx-8 h-full flex items-center justify-center"
                title={brand.alt} 
              >
                <img 
                  src={brand.src} 
                  alt={brand.alt} 
                  // RESPONSIVE FIX: 
                  // Mobile: max-h-12 (48px)
                  // Desktop: max-h-20 (80px)
                  className="object-contain max-h-12 w-auto md:max-h-20" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};