import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// 🛠️ Helper: Finds a column value regardless of casing or typos
const getRowValue = (row: any, keys: string[]) => {
  const rowKeys = Object.keys(row);
  for (const k of keys) {
    // We clean the key (remove spaces, lowercase) to match loosely
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
        // 🟢 1. INTELLIGENT MAPPING (SWAPPED)
        
        // SKU: (Unchanged)
        let sku = getRowValue(row, ['Manufacturer Part No', 'SKU', 'Product No', 'Part Number']);
        if (sku) sku = String(sku).trim(); 

        // NAME <- 'short Description'
        // We now look for 'short Description' FIRST to use as the Product Name
        const name = getRowValue(row, ['short Description', 'Short description', 'Name', 'Title']);
        
        // PRIMARY DESCRIPTION <- 'Description'
        // We now look for 'Description' to use as the Main Text Body
        const primaryDesc = getRowValue(row, ['Description', 'Long description', 'Details', 'Full Description']) || "";
        
        // CATEGORY
        const categoryRaw = getRowValue(row, ['Category', 'Product Group', 'Cat']);
        const category = categoryRaw || "Uncategorized";
        
        // BRAND
        const brand = getRowValue(row, ['Brand', 'Manufacturer']);

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

        // Price
        let priceCents = null;
        if (rawPrice !== undefined && rawPrice !== "") {
           const cleanPrice = String(rawPrice).replace(/[^0-9.]/g, '');
           priceCents = Math.round(parseFloat(cleanPrice) * 100);
        }

        // Stock
        let stock = 0;
        if (rawStock !== undefined && rawStock !== "") {
            const cleanStock = String(rawStock).toLowerCase().replace(/[^a-z0-9]/g, '');
            const parsed = parseInt(rawStock);
            
            if (!isNaN(parsed)) {
                stock = parsed;
            } else if (cleanStock.includes('instock') || cleanStock.includes('yes')) {
                stock = 10;
            }
        }

        const availability = stock > 0 ? "In Stock" : "Out of Stock";
        const finalCategory = brand ? `${brand}, ${category}` : category;

        // 🟢 3. SAVE TO DATABASE
        // We map the 'primaryDesc' (from your CSV 'Description' column) to the overview
        const descriptionData = {
            short: primaryDesc, 
            long: primaryDesc, 
            overview: primaryDesc 
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