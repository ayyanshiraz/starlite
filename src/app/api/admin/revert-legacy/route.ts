import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// 1. Helper: Get Legacy Files (Local operation, fast)
function getLegacyFiles(dirPath: string, arrayOfFiles: string[] = []) {
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
      const fullPath = path.join(dirPath, file);
      if (file === 'uploads' || file === 'brands' || file === 'icons' || file === 'hero' || file === 'placeholders') return;
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getLegacyFiles(fullPath, arrayOfFiles);
      } else {
        const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
        if (!relativePath.toLowerCase().includes('brands')) arrayOfFiles.push(relativePath);
      }
    });
  } catch (e) {}
  return arrayOfFiles;
}

function simplify(str: string) {
  return str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const legacyFiles = getLegacyFiles(publicDir);
    
    // 2. Count Total Products
    const totalCount = await prisma.product.count();
    const BATCH_SIZE = 50; // Process 50 at a time (Safe for Neon DB)
    const logs: string[] = [];
    let revertedCount = 0;

    // 3. Loop through batches
    for (let i = 0; i < totalCount; i += BATCH_SIZE) {
      // Fetch just a small chunk
      const products = await prisma.product.findMany({
        skip: i,
        take: BATCH_SIZE,
      });

      const updates = [];

      for (const p of products) {
        const simpleName = simplify(p.name);
        const simpleSlug = simplify(p.slug);
        const simpleSku = simplify(p.sku || '');

        const matchedLegacyFile = legacyFiles.find(filePath => {
          const fileName = path.basename(filePath); 
          const simpleFileName = simplify(fileName.split('.')[0]); 
          if (simpleFileName.length < 3) return false;

          // Matching Logic
          if (simpleSku.length > 3 && simpleFileName.includes(simpleSku)) return true;
          if (simpleSlug.includes(simpleFileName)) return true;
          if (simpleName.includes(simpleFileName)) return true;
          return false;
        });

        // Add to update queue if found and different
        if (matchedLegacyFile && p.image !== matchedLegacyFile) {
          updates.push(
            prisma.product.update({
              where: { id: p.id },
              data: { image: matchedLegacyFile } 
            })
          );
          revertedCount++;
          // Only log first 10 to keep response small
          if (revertedCount <= 10) logs.push(`✅ Reverted: "${p.name}" -> ${matchedLegacyFile}`);
        }
      }

      // 4. Run Transaction for this Batch
      if (updates.length > 0) {
        await prisma.$transaction(updates);
      }
    }

    return NextResponse.json({
      message: "Safe Revert Complete",
      total_products_scanned: totalCount,
      products_reverted: revertedCount,
      sample_logs: logs
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}