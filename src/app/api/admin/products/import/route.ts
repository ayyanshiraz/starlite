import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to create a URL-friendly slug
const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces/special chars with -
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing -
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
        // 🟢 1. MAP CSV COLUMNS (Based on your 'intec.csv' file)
        const name = row['Description'] || row['name'];
        const rawPrice = row['Price'] || row['price'];
        const rawStock = row['Availability'] || row['stock'];
        // 🟢 Use 'Manufacturer product no' as SKU
        const sku = row['Manufacturer product no'] || row['sku']; 
        const category = row['Product Group'] || row['category'] || "Uncategorized";
        const manufacturer = row['Manufacturer'] || "";

        // Skip if no name (Description) found
        if (!name) {
          results.errors++;
          continue;
        }

        // 🟢 2. GENERATE DATA
        // Auto-generate slug from Description/Name
        let slug = row['Slug'] || row['slug'];
        if (!slug) {
            slug = generateSlug(name);
            if (slug.length > 150) slug = slug.substring(0, 150);
        }

        // Convert Price to Cents (e.g., 12.30 -> 1230)
        let priceCents = null;
        if (rawPrice !== undefined && rawPrice !== "") {
           // Remove any currency symbols if present
           const cleanPrice = String(rawPrice).replace(/[^0-9.]/g, '');
           priceCents = Math.round(parseFloat(cleanPrice) * 100);
        }

        // Convert Stock (Availability)
        let stock = 0;
        if (rawStock !== undefined && rawStock !== "") {
            stock = parseInt(rawStock);
        }

        // Determine Availability Status
        let availability = "In Stock";
        if (stock <= 0) availability = "Out of Stock";

        // Combine Manufacturer + Group for better Category (Optional but recommended)
        const finalCategory = manufacturer ? `${manufacturer}, ${category}` : category;

        // 🟢 3. DATABASE UPSERT (Update if exists, Create if new)
        const existing = await prisma.product.findUnique({
          where: { slug: slug }
        });

        if (existing) {
          // UPDATE Existing Product
          await prisma.product.update({
            where: { id: existing.id },
            data: {
              price: priceCents, 
              stock: stock,      
              sku: sku, 
              availability: availability,
              // Uncomment below if you want to update Name/Category too
              // name: name, 
              // category: finalCategory
            }
          });
          results.updated++;
        } else {
          // CREATE New Product
          await prisma.product.create({
            data: {
              slug: slug,
              name: name,
              category: finalCategory,
              price: priceCents,
              image: "/logogif.gif", // Default image since CSV has none
              sku: sku,
              stock: stock,
              description: name, // Use Description as the text body
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