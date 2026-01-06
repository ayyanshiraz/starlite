import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files received" });
    }

    // 1. Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads/products');
    await mkdir(uploadDir, { recursive: true });

    const report: string[] = [];
    let successCount = 0;

    for (const file of files) {
      // 2. Extract SKU from filename (e.g., "DELL-5540.jpg" -> "DELL-5540")
      const filename = file.name;
      const skuFromFilename = path.parse(filename).name; 

      // 3. Find the Product
      // We use 'findFirst' with insensitive mode to match "dell-5540" with "DELL-5540"
      const product = await prisma.product.findFirst({
        where: {
          sku: {
            equals: skuFromFilename,
            mode: 'insensitive', 
          }
        }
      });

      if (product) {
        // 4. Save the file ONLY if the product exists
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const savePath = path.join(uploadDir, filename);
        await writeFile(savePath, buffer);

        // 5. Update Database
        const publicUrl = `/uploads/products/${filename}`;
        await prisma.product.update({
          where: { id: product.id },
          data: { image: publicUrl }
        });

        report.push(`✅ Linked: ${filename} -> ${product.name}`);
        successCount++;
      } else {
        report.push(`⚠️ Skipped: ${filename} (No product found with SKU: "${skuFromFilename}")`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      count: successCount, 
      logs: report 
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}