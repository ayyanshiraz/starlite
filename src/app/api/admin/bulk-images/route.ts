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
    
    // 2. Navigation
    try {
        await client.cd("public_html").catch(() => {});
        await client.ensureDir("uploads");
        await client.cd("uploads");
        await client.ensureDir("products");
        await client.cd("products");
    } catch (e) {
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
        // 🟢 PRE-CHECK: Identify the OLD file (for cleanup)
        let oldFilename = "";
        if (product.image && product.image.includes('uploads/products/')) {
            // Extract "abc.png" from "http://.../uploads/products/abc.png?v=123"
            const urlParts = product.image.split('/');
            const lastPart = urlParts[urlParts.length - 1]; // "abc.png?v=123"
            oldFilename = lastPart.split('?')[0]; // "abc.png"
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        try {
            // 3. Upload the NEW file
            // (If names are identical, this overwrites the old one automatically)
            await client.uploadFrom(stream, filename);

            // 🟢 4. CLEANUP: Delete the OLD file if it was different
            // Example: Replacing "abc.png" with "abc.jpg" -> Delete "abc.png"
            if (oldFilename && oldFilename !== filename) {
                try {
                    await client.remove(oldFilename);
                    logs.push(`🗑️ Deleted old file: ${oldFilename}`);
                } catch (delErr) {
                    console.warn("Could not delete old file:", delErr);
                    // We don't stop the process if delete fails, just log it
                }
            }

            // 5. Update Database with Timestamp (Cache Busting)
            const timestamp = Date.now();
            const publicUrl = `http://images.starlightlinkers.com/uploads/products/${filename}?v=${timestamp}`;
            
            await prisma.product.update({
                where: { id: product.id },
                data: { image: publicUrl }
            });

            successCount++;
            logs.push(`✅ Updated: ${sku}`);
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