import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Get all products that have images
    const products = await prisma.product.findMany({
      where: {
        image: { not: null }
      }
    });

    const report = [];
    let successCount = 0;
    let failCount = 0;

    // 2. Define the new clean home for images
    const targetDir = path.join(process.cwd(), 'public/uploads/products');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const p of products) {
      if (!p.image || !p.sku) {
        report.push(`⚠️ Skipped (No Image or SKU): ${p.name}`);
        continue;
      }

      // Current "Old" Path (Remove the leading slash if present)
      // e.g., "/computerandlaptops/dell/dell3.jpg" -> "computerandlaptops/dell/dell3.jpg"
      const oldPathRelative = p.image.startsWith('/') ? p.image.substring(1) : p.image;
      const oldFullPath = path.join(process.cwd(), 'public', oldPathRelative);

      // Check if the old file actually exists
      if (fs.existsSync(oldFullPath)) {
        
        // Get the extension (e.g., .jpg or .png)
        const ext = path.extname(oldFullPath);
        
        // Create NEW Filename based on SKU (Sanitize it just in case)
        const newFilename = `${p.sku.replace(/[^a-zA-Z0-9-_]/g, '')}${ext}`;
        const newFullPath = path.join(targetDir, newFilename);
        const newDbPath = `/uploads/products/${newFilename}`;

        // COPY the file to the new location (Safest option)
        fs.copyFileSync(oldFullPath, newFullPath);

        // Update Database to point to new file
        await prisma.product.update({
          where: { id: p.id },
          data: { image: newDbPath }
        });

        report.push(`✅ Normalized: ${p.sku} -> ${newFilename}`);
        successCount++;
      } else {
        report.push(`❌ File Not Found: ${p.sku} (Looked at: ${oldPathRelative})`);
        failCount++;
      }
    }

    return NextResponse.json({
      message: "Normalization Complete",
      stats: { success: successCount, failed: failCount },
      logs: report
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}