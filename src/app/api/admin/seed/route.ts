import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// 👇 Import the "Final Merged List" from your products.ts file
import { allProducts } from '@/lib/products'; 

export async function GET() {
  try {
    const report = [];
    let addedCount = 0;
    let updatedCount = 0;

    for (const product of allProducts) {
      
      // 1. Prepare Price (Handle "Get a Quote")
      let dbPrice = null;
      if (typeof product.price === 'number') {
        dbPrice = product.price * 100; // Convert to cents
      } else if (typeof product.price === 'string' && !isNaN(parseFloat(product.price))) {
         // Handle string numbers like "199.99"
         dbPrice = parseFloat(product.price) * 100;
      }

      // 2. Check if product exists in DB
      const existing = await prisma.product.findUnique({
        where: { slug: product.slug }
      });

      const productData = {
        name: product.name,
        category: product.category,
        price: dbPrice,
        image: product.image,
        sku: product.sku || null,
        availability: product.availability || 'In Stock',
        description: product.description as any, // Cast to any to fit Prisma Json type
        stock: 50 // Default stock
      };

      if (!existing) {
        // CREATE
        await prisma.product.create({
          data: {
            slug: product.slug,
            ...productData
          }
        });
        report.push(`✅ Created: ${product.slug}`);
        addedCount++;
      } else {
        // UPDATE (Optional: Use this if you want to overwrite DB with file data)
        await prisma.product.update({
          where: { slug: product.slug },
          data: productData
        });
        report.push(`🔄 Updated: ${product.slug}`);
        updatedCount++;
      }
    }

    return NextResponse.json({ 
      message: "Sync Complete", 
      stats: { added: addedCount, updated: updatedCount, total: allProducts.length },
      details: report 
    });

  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}