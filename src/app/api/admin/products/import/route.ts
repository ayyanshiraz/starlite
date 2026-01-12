import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'; // 👈 Use shared connection to prevent limits

// Helper: Case-insensitive value finder
const getRowValue = (row: any, keys: string[]) => {
  const rowKeys = Object.keys(row);
  for (const k of keys) {
    const cleanTarget = k.toLowerCase().replace(/\s+/g, '');
    const foundKey = rowKeys.find(rk => 
      rk.toLowerCase().replace(/\s+/g, '') === cleanTarget
    );
    if (foundKey && row[foundKey]) return row[foundKey];
  }
  return null;
};

// Helper: Create URL slug
const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') 
    .replace(/^-+|-+$/g, '');   
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products } = body; 

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const results = { created: 0, updated: 0, errors: 0 };

    for (const row of products) {
      try {
        // 🟢 1. PRIORITY FIX: Look for Name FIRST
        const name = getRowValue(row, ['Name', 'Title', 'Product Name', 'Description']);
        
        // 🟢 2. SKU TRIM FIX: Remove hidden spaces
        let sku = getRowValue(row, ['SKU', 'Product No', 'Part Number']);
        if (sku) sku = String(sku).trim();

        const rawPrice = getRowValue(row, ['Price', 'RRP']);
        const rawStock = getRowValue(row, ['Stock', 'Availability', 'Availibility']);
        
        const categoryRaw = getRowValue(row, ['Category', 'Product Group']);
        const category = categoryRaw || "Uncategorized";
        
        const brand = getRowValue(row, ['Brand', 'Manufacturer']);

        // Description Body
        const descriptionBody = getRowValue(row, ['Short description', 'Details', 'Description']) || name;

        if (!name || !sku) {
          console.log(`Skipping row: Missing Name or SKU`);
          results.errors++;
          continue;
        }

        // 🟢 3. FORMAT DATA
        let slug = getRowValue(row, ['Slug']);
        if (!slug) {
            slug = generateSlug(name);
            if (slug.length > 150) slug = slug.substring(0, 150);
        }

        // Price formatting
        let priceCents = null;
        if (rawPrice !== undefined && rawPrice !== "") {
           const cleanPrice = String(rawPrice).replace(/[^0-9.]/g, '');
           priceCents = Math.round(parseFloat(cleanPrice) * 100);
        }

        // Stock formatting
        let stock = 0;
        if (rawStock !== undefined && rawStock !== "") {
            const parsed = parseInt(rawStock);
            if (!isNaN(parsed)) {
                stock = parsed;
            } else if (String(rawStock).toLowerCase().includes('in stock')) {
                stock = 10;
            }
        }

        const availability = stock > 0 ? "In Stock" : "Out of Stock";
        const finalCategory = brand ? `${brand}, ${category}` : category;

        // 🟢 4. DATABASE SYNC (Manual Check)
        // This fixes the TypeScript error by manually checking first
        const existingProduct = await prisma.product.findFirst({
          where: { sku: sku }
        });

        if (existingProduct) {
           // UPDATE Existing
           await prisma.product.update({
             where: { id: existingProduct.id }, // ID is always unique, so no error here
             data: {
                name: name,
                slug: slug,
                price: priceCents,
                stock: stock,
                availability: availability,
                description: { overview: descriptionBody },
                category: finalCategory
             }
           });
           results.updated++;
        } else {
           // CREATE New
           await prisma.product.create({
             data: {
                sku: sku,
                slug: slug,
                name: name,
                category: finalCategory,
                price: priceCents,
                image: "/placeholder.png",
                stock: stock,
                description: { overview: descriptionBody },
                availability: availability
             }
           });
           results.created++;
        }
        
      } catch (err) {
        console.error("Row Error:", err);
        results.errors++;
      }
    }

    return NextResponse.json({ success: true, stats: results });

  } catch (error) {
    console.error("Import Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}