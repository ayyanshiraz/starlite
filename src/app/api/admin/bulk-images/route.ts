import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import path from 'path';

export async function POST(request: Request) {
  const client = new ftp.Client();

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files.length) return NextResponse.json({ success: false, message: "No files received" });

    // 1. Connect to Namecheap
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === 'true',
    });

    const logs: string[] = [];
    
    // 2. Navigation (Force path to avoid 553 errors)
    try {
        await client.cd("public_html").catch(() => {});
        await client.ensureDir("uploads");
        await client.cd("uploads");
        await client.ensureDir("products");
        await client.cd("products");
    } catch (e) {
        // Fallback absolute path
        await client.cd("/public_html/uploads/products").catch(() => {});
    }

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

        try {
            await client.uploadFrom(stream, filename);

            // 🟢 THE FIX: Use your new Subdomain
            // This points to 198.54.116.74 (Namecheap) via the DNS record you added in Vercel
            const publicUrl = `http://images.starlightlinkers.com/uploads/products/${filename}`;
            
            await prisma.product.update({
                where: { id: product.id },
                data: { image: publicUrl }
            });

            successCount++;
            logs.push(`✅ Uploaded & Linked: ${publicUrl}`);
        } catch (uploadErr: any) {
            logs.push(`❌ Upload Failed ${sku}: ${uploadErr.message}`);
        }
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