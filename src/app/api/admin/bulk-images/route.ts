import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import path from 'path';

export async function POST(request: Request) {
  const client = new ftp.Client();
  // client.ftp.verbose = true; // Uncomment if you need to debug connection issues

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files.length) return NextResponse.json({ success: false, message: "No files received" });

    // 1. Connect to your Namecheap Server
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === 'true',
      // If secure connection fails, try setting secure: false
    });

    // 2. Prepare the destination folder
    // On cPanel, your live site usually lives in 'public_html'
    const uploadPath = 'public_html/uploads/products';
    await client.ensureDir(uploadPath);

    const logs: string[] = [];
    let successCount = 0;

    for (const file of files) {
      const filename = file.name;
      // Extract SKU: "DELL-5540.jpg" -> "DELL-5540"
      const sku = path.parse(filename).name; 

      // 3. Find the Product
      const product = await prisma.product.findFirst({
        where: { sku: { equals: sku, mode: 'insensitive' } }
      });

      if (product) {
        // 4. Upload File via Stream
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        await client.uploadFrom(stream, `${uploadPath}/${filename}`);

        // 5. Generate the Public URL
        // Since you uploaded to public_html/uploads/products, the URL is:
        const publicUrl = `https://starlightlinkers.com/uploads/products/${filename}`;

        // 6. Save URL to Database
        await prisma.product.update({
          where: { id: product.id },
          data: { image: publicUrl }
        });

        successCount++;
        logs.push(`✅ Uploaded & Linked: ${sku}`);
      } else {
        logs.push(`⚠️ Skipped: ${filename} (Product SKU not found)`);
      }
    }

    client.close();
    return NextResponse.json({ success: true, count: successCount, logs });

  } catch (error: any) {
    client.close();
    console.error("FTP Error:", error);
    return NextResponse.json({ success: false, error: "FTP Error: " + error.message });
  }
}