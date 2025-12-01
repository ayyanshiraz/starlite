import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products } = body; // Array of products from CSV

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const results = {
      created: 0,
      updated: 0,
      errors: 0
    };

    for (const p of products) {
      try {
        // 1. Normalize Data
        const slug = p.Slug || p.slug;
        const name = p.Name || p.name;
        
        if (!slug || !name) {
          results.errors++;
          continue; // Skip invalid rows
        }

        // 2. Check if product exists
        const existing = await prisma.product.findUnique({
          where: { slug: slug }
        });

        // 3. Prepare Data (Handle "Smart Overwrite")
        // Only include fields that are NOT empty in the CSV
        const dataToUpdate: any = {};
        if (p.Name) dataToUpdate.name = p.Name;
        if (p.Category) dataToUpdate.category = p.Category;
        if (p.Image) dataToUpdate.image = p.Image;
        if (p.SKU) dataToUpdate.sku = p.SKU;
        if (p.Availability) dataToUpdate.availability = p.Availability;
        if (p.Description) dataToUpdate.description = p.Description; // Only overwrite if CSV has it
        
        // Parse numbers
        if (p.Price !== undefined && p.Price !== "") {
            dataToUpdate.price = Math.round(parseFloat(p.Price) * 100); // Convert to cents
        }
        if (p.Stock !== undefined && p.Stock !== "") {
            dataToUpdate.stock = parseInt(p.Stock);
        }

        if (existing) {
          // UPDATE
          await prisma.product.update({
            where: { id: existing.id },
            data: dataToUpdate
          });
          results.updated++;
        } else {
          // CREATE (Need required fields)
          await prisma.product.create({
            data: {
              slug: slug,
              name: name,
              category: p.Category || "Uncategorized",
              price: dataToUpdate.price || null,
              image: p.Image || "/placeholder.png",
              sku: p.SKU || null,
              stock: dataToUpdate.stock || 0,
              description: p.Description || "No description",
              availability: p.Availability || "In Stock"
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