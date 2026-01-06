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

    // 1. Ensure the new clean folder exists
    const uploadDir = path.join(process.cwd(), 'public/uploads/products');
    await mkdir(uploadDir, { recursive: true });

    const logs: string[] = [];
    let linkedCount = 0;

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // 2. Save the file physically
      // We rely on the user naming the file "SKU.jpg"
      const filename = file.name; 
      const savePath = path.join(uploadDir, filename);
      await writeFile(savePath, buffer);

      // 3. Extract SKU from filename (remove the extension)
      // Example: "DELL-5540.jpg" -> "DELL-5540"
      const skuFromFilename = path.parse(filename).name;

      // 4. Find the product with this SKU
      // We use findFirst to be safe, searching Case Insensitively
      const product = await prisma.product.findFirst({
        where: {
          sku: {
            equals: skuFromFilename,
            mode: 'insensitive', 
          }
        }
      });

      if (product) {
        // 5. Connect them!
        const publicUrl = `/uploads/products/${filename}`;
        
        await prisma.product.update({
          where: { id: product.id },
          data: { image: publicUrl }
        });

        linkedCount++;
        logs.push(`✅ Linked: SKU [${skuFromFilename}] -> ${filename}`);
      } else {
        logs.push(`⚠️ Uploaded ${filename}, but no Product found with SKU: "${skuFromFilename}". (Will auto-link if you create the product later)`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      count: linkedCount, 
      logs 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}