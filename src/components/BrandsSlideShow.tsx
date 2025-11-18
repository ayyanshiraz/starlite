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
    <section className="bg-white py-16 text-black overflow-hidden border-t border-gray-200">
      
      {/* This <style jsx> block contains the animation logic, 
        just like your demo code. 
        I have corrected the animation to use translateX(-50%) 
        for a perfect, seamless loop.
      */}
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          /* I've increased the time to 60s to account for 13 logos */
          animation: scroll 60s linear infinite;
        }
        
      `}</style>

      <div className="container mx-auto text-center">
        {/* Title without apostrophes, as requested */}
        <h2 className="text-3xl font-bold mb-12">Our Trusted Brands</h2>
        
        {/* This outer div clips the content. 
          The 'relative' and 'overflow-hidden' are important.
        */}
        <div className="relative w-full h-28 overflow-hidden">
          <div className="absolute top-0 left-0 flex items-center animate-scroll">
            
            {/* We duplicate the brands array to create the seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-48 mx-8 h-full flex items-center justify-center"
                title={brand.alt} // Good for accessibility
              >
                {/* --- FIX: Reverted from next/image to a standard <img> tag --- */}
                <img 
                  src={brand.src} 
                  alt={brand.alt} 
                  className="object-contain max-h-20 w-auto" // Tailwind classes for sizing
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