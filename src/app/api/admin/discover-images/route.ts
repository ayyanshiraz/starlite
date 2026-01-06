import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Helper: Recursively get all files from public folder
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'uploads') { // ⛔️ Ignore the uploads folder
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Store relative path: /computerandlaptops/hp/hp1.jpg
      const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
      arrayOfFiles.push(relativePath);
    }
  });

  return arrayOfFiles;
}

function simplify(str: string) {
  return str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const allFiles = getAllFiles(publicDir);
    const products = await prisma.product.findMany();
    
    const logs = [];
    let matchCount = 0;

    for (const p of products) {
      // Skip if product already has a valid image
      if (p.image && p.image.includes('/uploads/') && fs.existsSync(path.join(process.cwd(), 'public', p.image))) {
        continue;
      }

      const simpleName = simplify(p.name);
      const simpleSlug = simplify(p.slug);
      const simpleSku = simplify(p.sku || '');

      // Find the best matching file
      const matchedFile = allFiles.find(filePath => {
        const fileName = path.basename(filePath); // e.g., "hp-250.jpg"
        const simpleFileName = simplify(fileName.split('.')[0]); // e.g., "hp250"

        // Safety: Don't match short filenames like "1.jpg" or "hp.jpg" to avoid false positives
        if (simpleFileName.length < 4) return false;

        // 1. SKU Match (Strongest) - Does filename contain SKU?
        if (simpleSku.length > 3 && simpleFileName.includes(simpleSku)) return true;

        // 2. Reverse Match (Fuzzy) - Is the Filename inside the Product Slug?
        // Example: File="hp250.jpg", Slug="hp250g10laptop" -> MATCH
        if (simpleSlug.includes(simpleFileName)) return true;

        // 3. Name Match - Is the Filename inside the Product Name?
        if (simpleName.includes(simpleFileName)) return true;
        
        return false;
      });

      if (matchedFile) {
        await prisma.product.update({
          where: { id: p.id },
          data: { image: matchedFile } // Point to the existing file
        });
        matchCount++;
        logs.push(`✅ Smart-Link: "${p.name}" -> ${matchedFile}`);
      }
    }

    return NextResponse.json({
      message: "Smart Association Complete",
      matches_found: matchCount,
      logs: logs
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}