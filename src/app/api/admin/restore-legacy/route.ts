import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Helper: Get all legacy files (Excluding brands/uploads)
function getLegacyFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    // ⛔️ STRICT IGNORE LIST
    if (file === 'brands' || file === 'uploads' || file === 'icons' || file === 'hero' || file === 'placeholders') {
      return; 
    }

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getLegacyFiles(fullPath, arrayOfFiles);
    } else {
      const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
      // Double check path doesn't contain brands
      if (!relativePath.toLowerCase().includes('brands')) {
        arrayOfFiles.push(relativePath);
      }
    }
  });

  return arrayOfFiles;
}

function simplify(str: string) {
  return str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
}

export async function GET() {
  try {
    const report: string[] = [];
    
    // 1. Get Clean List of Legacy Files
    const publicDir = path.join(process.cwd(), 'public');
    const validLegacyFiles = getLegacyFiles(publicDir);
    
    // 2. Get ALL Products
    const products = await prisma.product.findMany();
    
    let matchCount = 0;

    for (const p of products) {
      const simpleName = simplify(p.name);
      const simpleSlug = simplify(p.slug);
      const simpleSku = simplify(p.sku || '');

      // 3. Find match in Legacy Files
      const matchedFile = validLegacyFiles.find(filePath => {
        const fileName = path.basename(filePath); 
        const simpleFileName = simplify(fileName.split('.')[0]); 

        // Skip tiny filenames (like "1.jpg") to avoid bad matches
        if (simpleFileName.length < 3) return false;

        // A. SKU Match
        if (simpleSku.length > 3 && simpleFileName.includes(simpleSku)) return true;

        // B. Slug Match
        if (simpleSlug.includes(simpleFileName)) return true;

        // C. Name Match
        if (simpleName.includes(simpleFileName)) return true;
        
        return false;
      });

      // 4. FORCE UPDATE (Overwrite whatever is currently there)
      if (matchedFile) {
        // Only update if it's different
        if (p.image !== matchedFile) {
          await prisma.product.update({
            where: { id: p.id },
            data: { image: matchedFile } 
          });
          matchCount++;
          report.push(`✅ Restored: "${p.name}" -> ${matchedFile}`);
        }
      }
    }

    return NextResponse.json({
      message: "Force Restore Complete",
      scanned_legacy_files: validLegacyFiles.length,
      products_updated: matchCount,
      logs: report
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}