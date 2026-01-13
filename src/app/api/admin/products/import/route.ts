import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// 🛠️ Helper: Finds a column value regardless of casing or typos
const getRowValue = (row: any, keys: string[]) => {
  const rowKeys = Object.keys(row);
  for (const k of keys) {
    // We clean the key (remove spaces, lowercase) to match loosely
    // Example: "Manufacturer Part No" becomes "manufacturerpartno"
    const cleanTarget = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const foundKey = rowKeys.find(rk => 
      rk.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanTarget
    );
    
    if (foundKey && row[foundKey]) {
        return typeof row[foundKey] === 'string' ? row[foundKey].trim() : row[foundKey];
    }
  }
  return null;
};

// 🛠️ Helper: Create URL slug
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
        // 🟢 1. INTELLIGENT MAPPING
        
        // SKU: Added 'Manufacturer Part No' to the list
        let sku = getRowValue(row, ['Manufacturer Part No', 'SKU', 'Product No', 'Part Number']);
        if (sku) sku = String(sku).trim(); 

        // NAME: 'Description' column is your Product Name
        const name = getRowValue(row, ['Description', 'Name', 'Title', 'Product Name']);
        
        // CATEGORY
        const categoryRaw = getRowValue(row, ['Category', 'Product Group', 'Cat']);
        const category = categoryRaw || "Uncategorized";
        
        // BRAND
        const brand = getRowValue(row, ['Brand', 'Manufacturer']);

        // SHORT DESCRIPTION: Added 'short Description' explicitly
        const shortDesc = getRowValue(row, ['short Description', 'Short description', 'Overview', 'Summary']) || "";

        // LONG DESCRIPTION (Optional if you have it later)
        const longDesc = getRowValue(row, ['descrption', 'Long description', 'Details', 'Full Description']) || "";

        // PRICE & STOCK
        const rawPrice = getRowValue(row, ['Price', 'RRP', 'Cost']);
        const rawStock = getRowValue(row, ['Availability', 'Availibility', 'Stock', 'Qty']);

        // SKIP INVALID ROWS
        if (!name || !sku) {
          console.log(`⚠️ Skipping row: Missing Name (${name}) or SKU (${sku})`);
          results.errors++;
          continue;
        }

        // 🟢 2. DATA FORMATTING
        
        // Slug Generation
        let slug = getRowValue(row, ['Slug']);
        if (!slug) {
            slug = generateSlug(name);
            if (slug.length > 150) slug = slug.substring(0, 150);
        }

        // Price (Handles commas like "1,371.57" -> 137157 cents)
        let priceCents = null;
        if (rawPrice !== undefined && rawPrice !== "") {
           const cleanPrice = String(rawPrice).replace(/[^0-9.]/g, '');
           priceCents = Math.round(parseFloat(cleanPrice) * 100);
        }

        // Stock (Handle "InStock" text or integers)
        let stock = 0;
        if (rawStock !== undefined && rawStock !== "") {
            const cleanStock = String(rawStock).toLowerCase().replace(/[^a-z0-9]/g, '');
            const parsed = parseInt(rawStock);
            
            if (!isNaN(parsed)) {
                stock = parsed;
            } else if (cleanStock.includes('instock') || cleanStock.includes('yes')) {
                stock = 10; // Default stock if CSV says "InStock"
            }
        }

        const availability = stock > 0 ? "In Stock" : "Out of Stock";
        // Combine Brand + Category (e.g., "CYBERPOWER SYSTEMS, UPS - Mini Tower")
        const finalCategory = brand ? `${brand}, ${category}` : category;

        // 🟢 3. SAVE TO DATABASE
        const descriptionData = {
            short: shortDesc,
            long: longDesc, 
            overview: shortDesc // Using short description as primary overview
        };

        const existingProduct = await prisma.product.findFirst({
          where: { sku: sku }
        });

        if (existingProduct) {
           // UPDATE
           await prisma.product.update({
             where: { id: existingProduct.id },
             data: {
                name: name,
                slug: slug,
                price: priceCents,
                stock: stock,
                availability: availability,
                description: descriptionData,
                category: finalCategory
             }
           });
           results.updated++;
        } else {
           // CREATE
           await prisma.product.create({
             data: {
                sku: sku,
                slug: slug,
                name: name,
                category: finalCategory,
                price: priceCents,
                image: "/placeholder.png",
                stock: stock,
                description: descriptionData,
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