import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads/products');
    if (!fs.existsSync(uploadDir)) return NextResponse.json({ count: 0 });

    const files = fs.readdirSync(uploadDir);
    let linkedCount = 0;

    for (const filename of files) {
      // Extract SKU (e.g. "DELL-5540.jpg" -> "DELL-5540")
      const sku = path.parse(filename).name;

      // Find product matching this SKU that DOESN'T have an image yet
      const product = await prisma.product.findFirst({
        where: {
          sku: { equals: sku, mode: 'insensitive' },
          OR: [ { image: null }, { image: "" }, { image: "/placeholder.png" } ]
        }
      });

      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: { image: `/uploads/products/${filename}` }
        });
        linkedCount++;
      }
    }

    return NextResponse.json({ success: true, count: linkedCount });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}