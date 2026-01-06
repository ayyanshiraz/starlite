import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

function getLegacyFiles(dirPath: string, arrayOfFiles: string[] = []) {
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
      const fullPath = path.join(dirPath, file);
      if (file === 'brands' || file === 'uploads' || file === 'icons' || file === 'placeholders') return;
      
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getLegacyFiles(fullPath, arrayOfFiles);
      } else {
        // Store relative path (e.g. /computerandlaptops/hp/hp1.jpg)
        const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
        arrayOfFiles.push(relativePath);
      }
    });
  } catch (e) {
    // Ignore errors for system folders
  }
  return arrayOfFiles;
}

function simplify(str: string) {
  return str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
}

export async function GET() {
  try {
    // 1. Get 5 "Broken" Products
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { image: { contains: 'brands' } }, // Check for 'brands' without slash
          { image: { contains: '/brands/' } },
          { image: '/placeholder.png' },
          { image: null }
        ]
      },
      take: 5 // Only look at 5
    });

    // 2. Get Files
    const publicDir = path.join(process.cwd(), 'public');
    const files = getLegacyFiles(publicDir);
    const sampleFiles = files.slice(0, 10); // Show first 10 files found

    // 3. Test Match Logic
    const debugLogs = products.map(p => {
      const sName = simplify(p.name);
      
      // Try to find a match manually
      const potentialMatch = files.find(f => {
        const fName = path.basename(f);
        const sFile = simplify(fName.split('.')[0]);
        
        // The Logic we used before:
        if (sFile.length >= 3 && sName.includes(sFile)) {
          return true;
        }
        return false;
      });

      return {
        product: p.name,
        current_image: p.image,
        simplified_name: sName,
        did_we_find_match: potentialMatch ? "YES" : "NO",
        match_would_be: potentialMatch || "None"
      };
    });

    return NextResponse.json({
      info: "Debug Report",
      broken_products_found: products.length,
      total_files_scanned: files.length,
      sample_files_found: sampleFiles,
      match_tests: debugLogs
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}