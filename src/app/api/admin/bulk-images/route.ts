import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import path from 'path';

export async function POST(request: Request) {
  const client = new ftp.Client();
  // client.ftp.verbose = true; // Debug mode

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files.length) return NextResponse.json({ success: false, message: "No files received" });

    // 1. Connect
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === 'true',
    });

    // 2. SAFE NAVIGATION (Walk into folders one by one)
    try {
      // Try to enter public_html. 
      // If the FTP user is ALREADY inside public_html (common), this might fail, so we catch it.
      await client.cd("public_html").catch(() => console.log("Already in public_html or root."));
      
      // Now enter uploads
      await client.ensureDir("uploads");
      await client.cd("uploads");

      // Now enter products
      await client.ensureDir("products");
      await client.cd("products");
      
    } catch (err) {
      throw new Error("Could not find 'uploads/products' folder. Please create it manually in cPanel inside public_html.");
    }

    const logs: string[] = [];
    let successCount = 0;

    for (const file of files) {
      const filename = file.name;
      const sku = path.parse(filename).name; 

      const product = await prisma.product.findFirst({
        where: { sku: { equals: sku, mode: 'insensitive' } }
      });

      if (product) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        // 3. UPLOAD (Since we are already inside the folder, we just use the filename)
        await client.uploadFrom(stream, filename);

        // 4. Update Database
        const publicUrl = `https://starlightlinkers.com/uploads/products/${filename}`;
        
        await prisma.product.update({
          where: { id: product.id },
          data: { image: publicUrl }
        });

        successCount++;
        logs.push(`✅ Uploaded: ${sku}`);
      } else {
        logs.push(`⚠️ Skipped: ${filename} (SKU not found)`);
      }
    }

    client.close();
    return NextResponse.json({ success: true, count: successCount, logs });

  } catch (error: any) {
    client.close();
    return NextResponse.json({ success: false, error: "FTP Error: " + error.message });
  }
}