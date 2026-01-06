import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, sku: true, image: true }
    });

    const brokenImages = [];

    for (const p of products) {
      // 1. If DB field is explicitly empty, it's missing
      if (!p.image || p.image === "" || p.image === "/placeholder.png") {
        brokenImages.push({ name: p.name, sku: p.sku, status: "No DB Entry" });
        continue;
      }

      // 2. If DB has a path, CHECK IF FILE EXISTS ON DISK
      // Remove leading slash for filesystem check
      const relativePath = p.image.startsWith('/') ? p.image.substring(1) : p.image;
      const fullPath = path.join(process.cwd(), 'public', relativePath);

      if (!fs.existsSync(fullPath)) {
        brokenImages.push({ 
          name: p.name, 
          sku: p.sku, 
          current_db_path: p.image,
          status: "File Missing on Disk" 
        });
      }
    }

    return NextResponse.json({
      count: brokenImages.length,
      instructions: "These products point to files that don't exist. Rename your images to [SKU].jpg and use Bulk Upload to fix them.",
      todo_list: brokenImages
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}