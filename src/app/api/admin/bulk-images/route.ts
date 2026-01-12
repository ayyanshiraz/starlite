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

    const logs: string[] = [];
    logs.push(`🔌 Connected to ${process.env.FTP_HOST}`);
    
    // 2. DIAGNOSTIC NAVIGATION (The "Smart Walk")
    // This part figures out where we are before trying to upload.
    
    // Step A: Check where we started
    let currentDir = await client.pwd();
    logs.push(`📂 Started at: ${currentDir}`);

    // Step B: Look for public_html
    // Get list of folders in current directory
    const rootList = await client.list();
    const hasPublicHtml = rootList.some(f => f.name === "public_html");

    if (hasPublicHtml) {
      logs.push("⬇️ Found 'public_html'. Entering...");
      await client.cd("public_html");
    } else {
      logs.push("ℹ️ 'public_html' not found here. Assuming we are already inside it (or in a subfolder).");
    }

    // Step C: Look for uploads
    const currentList = await client.list();
    const hasUploads = currentList.some(f => f.name === "uploads");

    if (hasUploads) {
      logs.push("⬇️ Found 'uploads'. Entering...");
      await client.cd("uploads");
      
      // Step D: Look for products
      const uploadsList = await client.list();
      const hasProducts = uploadsList.some(f => f.name === "products");
      
      if (hasProducts) {
        logs.push("⬇️ Found 'products'. Entering...");
        await client.cd("products");
      } else {
        logs.push("✨ 'products' folder missing. Creating it...");
        await client.ensureDir("products");
        await client.cd("products");
      }

    } else {
      // If we can't find 'uploads', we might be lost. Try creating it.
      logs.push("✨ 'uploads' folder missing. Creating full path...");
      await client.ensureDir("uploads/products");
      await client.cd("uploads/products");
    }

    // Double check where we ended up
    const finalDir = await client.pwd();
    logs.push(`📍 Final Upload Destination: ${finalDir}`);

    // 3. START UPLOAD
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
            // Upload explicitly to the current folder
            await client.uploadFrom(stream, filename);

            const publicUrl = `https://starlightlinkers.com/uploads/products/${filename}`;
            
            await prisma.product.update({
                where: { id: product.id },
                data: { image: publicUrl }
            });

            successCount++;
            logs.push(`✅ Uploaded: ${sku}`);
        } catch (uploadErr: any) {
            logs.push(`❌ Upload Failed for ${sku}: ${uploadErr.message}`);
        }
      } else {
        logs.push(`⚠️ Skipped: ${filename} (SKU not found in DB)`);
      }
    }

    client.close();
    return NextResponse.json({ success: true, count: successCount, logs });

  } catch (error: any) {
    client.close();
    // Return the REAL error message this time
    return NextResponse.json({ success: false, error: "FTP Critical Error: " + error.message });
  }
}