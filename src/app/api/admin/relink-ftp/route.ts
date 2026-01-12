import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as ftp from 'basic-ftp';
import path from 'path';

export async function GET() {
  const client = new ftp.Client();

  try {
    // 1. Connect to cPanel
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === 'true',
    });

    // 2. Go to Images Folder
    await client.cd("public_html/uploads/products");

    // 3. List all files currently on the server
    const fileList = await client.list();
    const imageFiles = fileList.filter(f => f.name.match(/\.(jpg|jpeg|png|webp|gif)$/i));

    const logs: string[] = [];
    let linkedCount = 0;

    // 4. Match Files to Products
    for (const file of imageFiles) {
      const filename = file.name;
      const skuFromFile = path.parse(filename).name; // "abc123"

      // Find product with this SKU
      const product = await prisma.product.findFirst({
        where: { sku: { equals: skuFromFile, mode: 'insensitive' } }
      });

      if (product) {
        // Construct the correct URL
        const publicUrl = `https://starlightlinkers.com/uploads/products/${filename}`;

        // Only update if it's different
        if (product.image !== publicUrl) {
          await prisma.product.update({
            where: { id: product.id },
            data: { image: publicUrl }
          });
          linkedCount++;
          logs.push(`✅ Linked: SKU [${skuFromFile}] -> ${filename}`);
        }
      } else {
        logs.push(`⚠️ Unmatched File: ${filename} (No Product with SKU '${skuFromFile}')`);
      }
    }

    client.close();
    return NextResponse.json({ 
      success: true, 
      files_found_on_server: imageFiles.length,
      products_linked: linkedCount, 
      logs 
    });

  } catch (error: any) {
    client.close();
    return NextResponse.json({ success: false, error: error.message });
  }
}