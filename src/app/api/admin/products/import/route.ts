import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper: Case-insensitive value finder (Handles 'Availibility' vs 'Availability' automatically)
const getRowValue = (row: any, keys: string[]) => {
  const rowKeys = Object.keys(row);
  for (const k of keys) {
    // Clean keys: remove spaces, lower case (e.g. "Short description" -> "shortdescription")
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
        // 🟢 1. MAP YOUR SPECIFIC HEADERS
        // We look for your preferred header first, but keep fallbacks just in case
        
        // Name <- 'Description' (Your product title)
        const name = getRowValue(row, ['Description', 'Name', 'Title']);
        
        // SKU <- 'SKU'
        const sku = getRowValue(row, ['SKU', 'Product No', 'sku']);
        
        // Price <- 'Price'
        const rawPrice = getRowValue(row, ['Price', 'RRP']);
        
        // Stock <- 'Availibility' (Note: Handles your spelling)
        const rawStock = getRowValue(row, ['Availibility', 'Availability', 'Stock']);
        
        // Category <- 'Category'
        const categoryRaw = getRowValue(row, ['Category', 'Product Group']);
        const category = categoryRaw || "Uncategorized";
        
        // Brand <- 'Brand'
        const brand = getRowValue(row, ['Brand', 'Manufacturer']);

        // Description Body <- 'Short description'
        const descriptionBody = getRowValue(row, ['Short description', 'Details']) || name;

        // Skip if critical data is missing
        if (!name || !sku) {
          console.log(`Skipping row: Missing Name (${name}) or SKU (${sku})`);
          results.errors++;
          continue;
        }

        // 🟢 2. FORMAT DATA
        // Slug
        let slug = getRowValue(row, ['Slug']);
        if (!slug) {
            slug = generateSlug(name);
            if (slug.length > 150) slug = slug.substring(0, 150);
        }

        // Price to Cents
        let priceCents = null;
        if (rawPrice !== undefined && rawPrice !== "") {
           const cleanPrice = String(rawPrice).replace(/[^0-9.]/g, '');
           priceCents = Math.round(parseFloat(cleanPrice) * 100);
        }

        // Stock Logic (Handles numbers or "In Stock" text)
        let stock = 0;
        if (rawStock !== undefined && rawStock !== "") {
            // Try parsing a number
            const parsed = parseInt(rawStock);
            if (!isNaN(parsed)) {
                stock = parsed;
            } else if (String(rawStock).toLowerCase().includes('in stock')) {
                // If CSV says "In Stock" but no number, default to 10
                stock = 10;
            }
        }

        const availability = stock > 0 ? "In Stock" : "Out of Stock";
        const finalCategory = brand ? `${brand}, ${category}` : category;

        // 🟢 3. SAVE TO DATABASE
        const existing = await prisma.product.findUnique({
          where: { slug: slug }
        });

        if (existing) {
          // UPDATE
          await prisma.product.update({
            where: { id: existing.id },
            data: {
              price: priceCents, 
              stock: stock,      
              sku: sku, 
              availability: availability,
              description: { overview: descriptionBody }, // Saves Short description
              category: finalCategory
            }
          });
          results.updated++;
        } else {
          // CREATE
          await prisma.product.create({
            data: {
              slug,
              name, // Uses 'Description' column as Name
              category: finalCategory,
              price: priceCents,
              image: "/logogif.gif",
              sku,
              stock,
              description: { overview: descriptionBody },
              availability
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